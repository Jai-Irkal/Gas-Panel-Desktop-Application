import React, { useState } from "react";
import type { ControllerStatusKey } from "../types/controller";

const API_BASE_URL = "http://localhost:3000/api"

const systemControls: Array<{
    key: ControllerStatusKey;
    label: string;
    color: string;
    eventId: number;
}> = [
        { key: "system_on", label: "System On", color: "#22b51c", eventId: 3001 },
        { key: "silenced_led", label: "Silenced", color: "#f4d21a", eventId: 3001 },
        { key: "mains_fault_led", label: "Mains Fault", color: "#f4d21a", eventId: 2001 },
        { key: "battery_fault_led", label: "Battery Fault", color: "#f4d21a", eventId: 2001 },
        { key: "system_fault", label: "System Fault", color: "#f4d21a", eventId: 2001 },
        { key: "NAC_fault", label: "NAC Fault", color: "#f4d21a", eventId: 2001 },
        { key: "manual_release", label: "Manual Release", color: "#f4d21a", eventId: 3002 },
        { key: "pre_release", label: "Pre Release", color: "#f4d21a", eventId: 3002 },
        { key: "released_led", label: "Released", color: "#f04432", eventId: 3001 },
        { key: "abort_led", label: "Abort", color: "#f4d21a", eventId: 3001 },
        { key: "pressure_fault_led", label: "Pressure Fault", color: "#f4d21a", eventId: 2001 },
        { key: "RAC_fault_led", label: "RAC Fault", color: "#f4d21a", eventId: 2001 },
        { key: "earth_fault_led", label: "Earth Fault", color: "#f4d21a", eventId: 2001 },
        { key: "maintenance_led", label: "Maintenance", color: "#f4d21a", eventId: 3001 },
    ];

const zoneCount = 4;
const normalZoneValue = 32;
const fireZoneValue = 2;
const faultZoneValue = 1;

type LogPayload = {
    u16_event_id: number;
    u8_device_text: string;
    u8_zone_text?: string;
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
    part_number?: string;
    u8_spare_bytes?: number[];
    u8_serialNumber: number;
    u16_crc: number;
    source: string;
    createdAt: string;
};

export default function ControllerApp() {
    const [activeStatuses, setActiveStatuses] = useState<Partial<Record<ControllerStatusKey, number>>>({});
    const [zoneValues, setZoneValues] = useState<Record<number, number>>({});

    const sendStatus = (key: ControllerStatusKey, eventId: number, label: string,) => {
        const nextValue = activeStatuses[key] ? 0 : 1;
        setActiveStatuses((current) => ({ ...current, [key]: nextValue, }),);
        window.electronAPI?.sendControllerUpdate({ status: { [key]: nextValue, }, });
        if (nextValue === 1) {
            postLog(eventId, label, 0,);
        }
    };

    const sendZone = (zone: number, requestedValue: number,) => {
        const nextValue = zoneValues[zone] === requestedValue ? normalZoneValue : requestedValue;
        setZoneValues((current) => ({ ...current, [zone]: nextValue, }),);
        window.electronAPI?.sendControllerUpdate({ zones: { [`zone${zone}_led_sts`]: nextValue, }, });
        if (nextValue === fireZoneValue) {
            postLog(1001, "Smoke Detector", zone,);
        }
        if (nextValue === faultZoneValue) {
            postLog(2001, "Smoke Detector", zone,);
        }
    };

    const createLog = (eventId: number, deviceText: string, zoneNumber: number,): LogPayload => {
        const now = new Date();
        const log: LogPayload = {
            u16_event_id: eventId,
            u8_device_text: deviceText,
            u8_zone_text: zoneNumber > 0 ? `Zone ${zoneNumber}` : "System",
            u8_zone_number: zoneNumber,
            u8_node_address: 1,
            u8_device_address: zoneNumber > 0 ? zoneNumber : 0,
            u8_device_type: zoneNumber > 0 ? 1 : 0,
            u8_device_sub_type: zoneNumber > 0 ? 1 : 0,
            u8_date: now.getDate(),
            u8_month: now.getMonth() + 1,
            u8_year: now.getFullYear(),
            u8_hours: now.getHours(),
            u8_minutes: now.getMinutes(),
            u8_seconds: now.getSeconds(),
            u8_logbitoffset: 0,
            part_number: "XYZ",
            u8_spare_bytes: [0, 0, 0],
            u8_serialNumber: zoneNumber > 0 ? 10000 + zoneNumber : 10000,
            u16_crc: 0,
            source: "DESKTOP_CONTROLLER",
            createdAt: now.toISOString(),
        };
        return log;
    };

    const postLog = async (eventId: number, deviceText: string, zoneNumber: number,) => {
        try {
            const log = createLog(eventId, deviceText, zoneNumber,);
            console.log("Posting log:", log);
            const response = await fetch(`${API_BASE_URL}/device-logs`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify(log),
                },);
            if (!response.ok) {
                throw new Error(`Failed to post log: HTTP ${response.status}`,);
            }
            const savedLog = await response.json();
            console.log("Log created successfully:", savedLog,);
            return savedLog;
        } catch (error) {
            console.error("Error posting log:", error,);
        }
    };

    return (
        <main className="h-screen overflow-y-auto bg-[#202938] p-3 text-white">
            <div className="mx-auto w-full max-w-[360px]">
                <header className="mb-3 flex items-center justify-between border-b border-[#5f6b7a] pb-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#aab5c4]">EMCUS GP-400 R</p>
                        <h1 className="text-xl font-bold">Panel Controller</h1>
                    </div>
                    <span className="rounded-full bg-[#334154] px-2 py-1 text-[10px] text-[#d5dbe3]">Live</span>
                </header>

                <section className="mb-3 rounded-lg border border-[#536174] bg-[#293548] p-3">
                    <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#d5dbe3]">System statuses</h2>
                    <div className="grid grid-cols-2 gap-1.5">
                        {systemControls.map(({ key, label, color, eventId }) => {
                            const active = Boolean(activeStatuses[key]);
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => sendStatus(key, eventId, label)}
                                    className={`flex min-h-9 items-center justify-between rounded-md border px-2 py-1.5 text-left text-xs transition-colors ${active ? "border-white bg-[#3c4d63]" : "border-[#536174] bg-[#202938]"}`}
                                >
                                    <span>{label}</span>
                                    <span className="h-3 w-3 rounded-full border border-[#111]" style={{ backgroundColor: active ? color : "#6f7883" }} />
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-lg border border-[#536174] bg-[#293548] p-3">
                    <div className="mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#d5dbe3]">Zone controls</h2>
                        <p className="mt-1 text-[10px] text-[#aab5c4]">Trigger fire or fault for any zone</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        {Array.from({ length: zoneCount }, (_, index) => {
                            const zone = index + 1;
                            const value = zoneValues[zone] ?? normalZoneValue;
                            const fireActive = value === fireZoneValue;
                            const faultActive = value === faultZoneValue;
                            return (
                                <div
                                    key={zone}
                                    className="flex items-center justify-between gap-1 rounded-md border border-[#536174] bg-[#202938] px-1.5 py-1"
                                >
                                    <span className="pl-1 text-xs font-semibold">Zone {zone}</span>
                                    <span className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => sendZone(zone, fireZoneValue)}
                                            className={`rounded px-1.5 py-1 text-[10px] font-bold ${fireActive ? "bg-[#f04432] text-white" : "bg-[#4a3035] text-[#ffaaa1]"}`}
                                        >
                                            Fire
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => sendZone(zone, faultZoneValue)}
                                            className={`rounded px-1.5 py-1 text-[10px] font-bold ${faultActive ? "bg-[#f4d21a] text-[#202938]" : "bg-[#4a4525] text-[#f4d21a]"}`}
                                        >
                                            Fault
                                        </button>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
