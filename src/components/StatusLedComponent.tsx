// import { set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'

type LedProps = {
    color: string;
    label: string;
    status: number | string | boolean;
    isBuzzerSilenced: boolean;
    blinkStart?: number;
};

let FLAG = false;

function StatusLedComponent({ color, label, status, isBuzzerSilenced, blinkStart }: LedProps) {

    const [isFault, setIsFault] = useState(false);
    const isZone = !isNaN(Number(label));
    const zoneNumber = Number(label);

    // useEffect(() => {
    //     const syncBlink = () => {
    //         FLAG = !FLAG;
    //     };

    //     syncBlink(); // initial sync
    //     const interval = setInterval(syncBlink, 3000);

    //     return () => clearInterval(interval);
    // }, []);




    // useEffect(() => {
    //     if (!audioRef.current) return;

    //     if (isBuzzerSilenced) {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0;
    //         return;
    //     }

    //     if (status && label.includes("Fault")) {
    //         audioRef.current.loop = true; // repeat continuously
    //         audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    //     } else {
    //         audioRef.current.pause();
    //         audioRef.current.currentTime = 0; // reset to start
    //     }

    // }, [status, isBuzzerSilenced]);

    return (
        label.includes("Fire") ? (
            <div className="flex items-center gap-2">
                <div className="border border-gray-400 rounded-sm p-[2px]">
                    <div
                        className="h-[10px] w-[15px] 2xl:h-[10px] rounded-[2px]"
                        style={{
                            backgroundColor:
                                status === "1" || status === 1
                                    ? "#E90606"
                                    : "#A5A5A5"
                        }}
                    />
                </div>
                <span className='text-white text-sm text-[12px]'>{label}</span>
            </div>
        )
            : label.includes("Alarm Routing") ? (
                <div className="flex items-center gap-2">
                    <div className="border border-gray-400 rounded-sm p-[2px]">
                        <div
                            className="h-[10px] w-[15px] 2xl:h-[10px] rounded-[2px]"
                            style={{
                                backgroundColor:
                                    status === "1" || status === 1
                                        ? "#E90606"
                                        : "#A5A5A5"
                            }}
                        />
                    </div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>
            ) :
                label.includes("Power") ? (
                    <div className="flex items-center gap-2">
                        <div
                            className="h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full"
                            style={{ backgroundColor: status ? "#00B427FF" : "#A5A5A5FF" }}
                        ></div>
                        <span className='text-white text-sm text-[12px]'>{label}</span>
                    </div>

                ) : !label.includes("Fire") && status === '1' || status === 1 ? (
                    <div className="flex items-center gap-2">
                        <div
                            className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                            style={{ backgroundColor: "#FD8E0E" }}
                        ></div>
                        <span className='text-white text-sm text-[12px]'>{label}</span>
                    </div>
                ) : status === '3' || status === 3 ? (
                    <div className="flex items-center gap-2">
                        <div
                            className="h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full relative"
                        >
                            {/* Grey background (always visible) */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: "#A5A5A5FF" }}
                            />
                            {/* Colored overlay that fades in/out */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    backgroundColor: color,
                                    opacity: "var(--blink-opacity, 1)"
                                }}
                            />
                        </div>
                        <span className="text-white text-sm text-[12px]">{label}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div
                            className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                            style={{ backgroundColor: status ? color : "#A5A5A5FF" }}
                        ></div>
                        <span className='text-white text-sm text-[12px]'>{label}</span>
                    </div>
                )
    );
}

export default StatusLedComponent