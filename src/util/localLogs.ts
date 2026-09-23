export type LocalLog = {
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

const LOGS_STORAGE_KEY = "gas-panel-local-logs";
const LOGS_UPDATED_EVENT = "gas-panel-local-logs-updated";

const createDefaultLog = (
    id: number,
    eventId: number,
    deviceText: string,
    zoneNumber: number,
    date: Date,
): LocalLog => ({
    id,
    log_num: id,
    u16_event_id: eventId,
    u8_device_text: deviceText,
    u8_zone_text: zoneNumber > 0 ? `Zone ${zoneNumber}` : "System",
    u8_zone_number: zoneNumber,
    u8_node_address: 1,
    u8_device_address: zoneNumber,
    u8_device_type: zoneNumber > 0 ? 1 : 0,
    u8_device_sub_type: zoneNumber > 0 ? 1 : 0,
    u8_date: date.getDate(),
    u8_month: date.getMonth() + 1,
    u8_year: date.getFullYear(),
    u8_hours: date.getHours(),
    u8_minutes: date.getMinutes(),
    u8_seconds: date.getSeconds(),
    u8_logbitoffset: 0,
    part_number: "XYZ",
    u8_spare_bytes: [0, 0, 0],
    u8_serialNumber: zoneNumber > 0 ? 10000 + zoneNumber : 10000,
    u16_crc: 0,
    source: "LOCAL_STORAGE",
    createdAt: date.toISOString(),
    company: 0,
});

const defaultLogs: LocalLog[] = [
    createDefaultLog(2, 2001, "Battery Fault", 0, new Date(2026, 0, 15, 9, 42, 11)),
    createDefaultLog(1, 1001, "Smoke Detector", 1, new Date(2026, 0, 15, 9, 40, 5)),
];

const notifyLogsUpdated = () => {
    window.dispatchEvent(new CustomEvent(LOGS_UPDATED_EVENT));
};

export const getLocalLogs = (): LocalLog[] => {
    const storedLogs = window.localStorage.getItem(LOGS_STORAGE_KEY);

    if (!storedLogs) {
        window.localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(defaultLogs));
        return defaultLogs;
    }

    try {
        return JSON.parse(storedLogs) as LocalLog[];
    } catch {
        window.localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(defaultLogs));
        return defaultLogs;
    }
};

export const addLocalLog = (log: Omit<LocalLog, "id" | "log_num">): LocalLog => {
    const logs = getLocalLogs();
    const nextId = logs.reduce((highestId, currentLog) => Math.max(highestId, currentLog.id), 0) + 1;
    const savedLog = { ...log, id: nextId, log_num: nextId };

    window.localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify([savedLog, ...logs]));
    notifyLogsUpdated();

    return savedLog;
};

export const subscribeToLocalLogs = (listener: () => void) => {
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === LOGS_STORAGE_KEY) {
            listener();
        }
    };
    const handleLocalUpdate = () => listener();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(LOGS_UPDATED_EVENT, handleLocalUpdate);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(LOGS_UPDATED_EVENT, handleLocalUpdate);
    };
};