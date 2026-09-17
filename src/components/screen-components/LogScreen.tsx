import { io, Socket } from "socket.io-client";
import {
    convertEventIdToText,
    getDeviceTypeSubtypeText,
} from "../../util/functions";
import React, { useCallback, useEffect, useState } from "react";
import backIcon from '../../../public/ui-elements/back-arrow-panel-icon.svg';

interface LogScreenProps {
    screen: {
        level: number;
        page: string;
    };

    setScreen: (screen: {
        level: number;
        page: string;
    }) => void;
}

type Log = {
    id: number;
    u16_event_id: number;
    log_num: number;
    u8_device_text: string;
    u8_zone_text?: string | null;
    u8_zone_number: number;
    u8_node_address: number;
    u8_device_address: number;
    u8_device_type: number;
    u8_device_sub_type: number;
    u8_date: number;
    u8_month: number;
    u8_year: number;
    u8_hours: number;
    u8_minutes: number;
    u8_seconds: number;
    u8_logbitoffset: number;
    part_number?: string | null;
    u8_spare_bytes?: number[] | null;
    u8_serialNumber: number;
    u16_crc: number;
    source: string;
    createdAt: string;
    company: number;
};

type LogsState = {
    all: Log[];
    fire: Log[];
    fault: Log[];
};

type LoadingState = {
    initialLoad: boolean;
    websocketConnected: boolean;
};

const API_BASE_URL = "http://ec2-54-234-189-184.compute-1.amazonaws.com/api";

const SOCKET_URL = "http://ec2-54-234-189-184.compute-1.amazonaws.com/device-logs";

const LogScreen: React.FC<LogScreenProps> = ({
    screen,
    setScreen,
}) => {
    const [logs, setLogs] = useState<LogsState>({
        all: [],
        fire: [],
        fault: [],
    });

    const [loading, setLoading] = useState<LoadingState>({
        initialLoad: true,
        websocketConnected: false,
    });

    const [error, setError] = useState<string | null>(null);

    /**
     * Check whether the log is a fire log.
     */
    const isFireLog = useCallback((log: Log) => {
        return (
            log.u16_event_id >= 1001 &&
            log.u16_event_id <= 1007
        );
    }, []);

    /**
     * Check whether the log is a fault log.
     */
    const isFaultLog = useCallback((log: Log) => {
        return (
            log.u16_event_id >= 2000 &&
            log.u16_event_id <= 3000
        );
    }, []);

    /**
     * Load all logs from the backend.
     *
     * PostgreSQL/API is the source of truth.
     */
    const loadLogs = useCallback(async () => {
        try {
            console.log("Loading logs from API...");

            setLoading((prev) => ({
                ...prev,
                initialLoad: true,
            }));

            setError(null);

            const response = await fetch(
                `${API_BASE_URL}/device-logs`
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data: Log[] = await response.json();

            console.log(
                "Logs loaded from API:",
                data
            );

            const fireLogs = data.filter(isFireLog);

            const faultLogs = data.filter(isFaultLog);

            setLogs({
                all: data,
                fire: fireLogs,
                fault: faultLogs,
            });
        } catch (error) {
            console.error(
                "Error fetching logs:",
                error
            );

            setError(
                "Failed to load logs. Please try again."
            );
        } finally {
            setLoading((prev) => ({
                ...prev,
                initialLoad: false,
            }));
        }
    }, [isFireLog, isFaultLog]);

    /**
     * Add a newly received WebSocket log.
     *
     * Prevents duplicate logs using the database ID.
     */
    const addRealtimeLog = useCallback(
        (log: Log) => {
            console.log(
                "New log received from WebSocket:",
                log
            );

            setLogs((prev) => {
                /**
                 * Check whether this log already exists.
                 */
                const alreadyExists = prev.all.some(
                    (existingLog) =>
                        existingLog.id === log.id
                );

                if (alreadyExists) {
                    console.log(
                        "Log already exists:",
                        log.id
                    );

                    return prev;
                }

                const fire = isFireLog(log);

                const fault = isFaultLog(log);

                return {
                    all: [
                        log,
                        ...prev.all,
                    ],

                    fire: fire
                        ? [
                              log,
                              ...prev.fire,
                          ]
                        : prev.fire,

                    fault: fault
                        ? [
                              log,
                              ...prev.fault,
                          ]
                        : prev.fault,
                };
            });
        },
        [isFireLog, isFaultLog]
    );

    /**
     * Initial API load.
     */
    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    /**
     * WebSocket connection.
     */
    useEffect(() => {
        console.log(
            "Creating Device Logs WebSocket..."
        );

        const socket: Socket = io(SOCKET_URL, {
            transports: ["websocket"],

            /**
             * Automatically reconnect if connection drops.
             */
            reconnection: true,

            /**
             * Keep trying indefinitely.
             */
            reconnectionAttempts: Infinity,

            /**
             * First reconnect after 1 second.
             */
            reconnectionDelay: 1000,

            /**
             * Maximum reconnect delay.
             */
            reconnectionDelayMax: 5000,
        });

        /**
         * WebSocket connected.
         */
        socket.on("connect", async () => {
            console.log(
                "Device Logs WebSocket connected:",
                socket.id
            );

            setLoading((prev) => ({
                ...prev,
                websocketConnected: true,
            }));

            /**
             * IMPORTANT:
             *
             * Reload logs from the API whenever the
             * WebSocket connects/reconnects.
             *
             * This prevents missing logs when a log was
             * created while the socket was disconnected.
             */
            await loadLogs();
        });

        /**
         * WebSocket connection error.
         */
        socket.on(
            "connect_error",
            (error) => {
                console.error(
                    "Device Logs WebSocket connection error:",
                    error
                );

                setLoading((prev) => ({
                    ...prev,
                    websocketConnected: false,
                }));
            }
        );

        /**
         * New log received from backend.
         */
        socket.on(
            "newLog",
            (log: Log) => {
                addRealtimeLog(log);
            }
        );

        /**
         * WebSocket disconnected.
         */
        socket.on(
            "disconnect",
            (reason) => {
                console.log(
                    "Device Logs WebSocket disconnected:",
                    reason
                );

                setLoading((prev) => ({
                    ...prev,
                    websocketConnected: false,
                }));
            }
        );

        /**
         * Cleanup when LogScreen unmounts.
         */
        return () => {
            console.log(
                "Cleaning up Device Logs WebSocket"
            );

            socket.removeAllListeners();

            socket.disconnect();
        };
    }, [loadLogs, addRealtimeLog]);

    /**
     * Get logs according to the current screen.
     */
    const getCurrentLogs = (): Log[] => {
        switch (screen.page) {
            case "FIRE":
                return logs.fire;

            case "FAULT":
                return logs.fault;

            case "ALL":
                return logs.all;

            default:
                return [];
        }
    };

    const currentLogs = getCurrentLogs();

    const hasLogs = currentLogs.length > 0;

    const isInitialLoading =
        loading.initialLoad && !hasLogs;

    const showNoLogsMessage =
        !loading.initialLoad &&
        !hasLogs &&
        !error;

    return (
        <div className="h-full w-full flex flex-col">

            {/* Header */}
            <div className="px-8 text-[#7FA802FF] font-bold flex bg-[#324200FF] h-15 items-center gap-8">

                <div className="h-10 w-10">

                    <button
                        type="button"
                        className="
                            bg-[#425702FF]
                            h-10
                            w-10
                            rounded
                            flex
                            items-center
                            justify-center
                            hover:bg-[#2a3600ff]
                            transition
                            duration-200
                        "
                        onClick={() =>
                            setScreen({
                                level: screen.level,
                                page: "ACCESS_LOGS",
                            })
                        }
                    >
                        <img
                            src={backIcon}
                            alt="Back"
                            className="inline-block w-7 h-7"
                        />
                    </button>

                </div>

                <h5>
                    {screen.page} LOGS
                </h5>

            </div>

            {/* Logs Container */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-0 pb-2">

                {/* Loading */}
                {isInitialLoading && (
                    <div className="flex items-center justify-center h-full">

                        <div className="text-center">

                            <div
                                className="
                                    inline-block
                                    animate-spin
                                    rounded-full
                                    h-8
                                    w-8
                                    border-b-2
                                    border-[#324200FF]
                                    mb-4
                                "
                            />

                            <h5 className="text-[#324200FF] font-bold">
                                LOADING LOGS...
                            </h5>

                        </div>

                    </div>
                )}

                {/* Error */}
                {error && !loading.initialLoad && (
                    <div className="flex items-center justify-center h-full">

                        <div className="text-center">

                            <div className="text-red-600 mb-4">
                                ⚠️
                            </div>

                            <h5 className="text-[#324200FF] font-bold">
                                {error}
                            </h5>

                            <button
                                type="button"
                                onClick={loadLogs}
                                className="
                                    mt-4
                                    px-4
                                    py-2
                                    bg-[#425702FF]
                                    text-white
                                    rounded
                                    hover:bg-[#2a3600ff]
                                    transition
                                "
                            >
                                Retry
                            </button>

                        </div>

                    </div>
                )}

                {/* No Logs */}
                {showNoLogsMessage && (
                    <div className="flex items-center justify-center h-full">

                        <div className="text-center">

                            <h5 className="text-[#324200FF] font-bold">
                                NO LOGS FOUND
                            </h5>

                            <p className="text-[#324200FF] mt-2">
                                Logs will appear here as they are generated
                            </p>

                        </div>

                    </div>
                )}

                {/* Logs */}
                {!loading.initialLoad && hasLogs && (
                    <div className="flex flex-col gap-4">

                        {currentLogs.map((log) => (

                            <div
                                key={log.id}
                                className="mt-0 border-green-800 border-t-6 pt-3"
                            >

                                {/* Log Number + Time */}
                                <div className="px-8 text-[#324200FF] font-bold flex justify-between mt-[2px]">

                                    <h5>
                                        LOG NO:{" "}
                                        {String(
                                            log.id
                                        ).padStart(4, "0")}
                                    </h5>

                                    <h5>
                                        {String(
                                            log.u8_hours
                                        ).padStart(2, "0")}
                                        :
                                        {String(
                                            log.u8_minutes
                                        ).padStart(2, "0")}
                                        :
                                        {String(
                                            log.u8_seconds
                                        ).padStart(2, "0")}
                                    </h5>

                                </div>

                                {/* Zone + Date */}
                                <div className="px-8 text-[#324200FF] font-bold flex justify-between mt-[2px]">

                                    <h5>
                                        Z:{" "}
                                        {String(
                                            log.u8_zone_number
                                        ).padStart(3, "0")}
                                    </h5>

                                    <h5>
                                        {String(
                                            log.u8_date
                                        ).padStart(2, "0")}
                                        -
                                        {String(
                                            log.u8_month
                                        ).padStart(2, "0")}
                                        -
                                        {log.u8_year}
                                    </h5>

                                </div>

                                {/* Device + Type */}
                                <div className="px-8 text-[#324200FF] font-bold flex justify-between mt-[2px]">

                                    <h5>
                                        {log.u8_device_text}
                                    </h5>

                                    <h5>
                                        {getDeviceTypeSubtypeText(
                                            log.u8_device_type,
                                            log.u8_device_sub_type
                                        )}
                                    </h5>

                                </div>

                                {/* Event */}
                                <div className="px-8 text-[#324200FF] font-bold flex justify-between mt-[2px]">

                                    <h5>
                                        {convertEventIdToText(
                                            log.u16_event_id,
                                            "UNKNOWN EVENT"
                                        )}
                                    </h5>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default LogScreen;
