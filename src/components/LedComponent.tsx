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

function LedComponent({ color, label, status, isBuzzerSilenced, blinkStart }: LedProps) {

    // const [isFault, setIsFault] = useState(false);
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


    return (
            label.includes("Power") ? (
                <div className="flex items-center gap-2">
                    <div
                        className="h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full"
                        style={{ backgroundColor: status ? "#00B427FF" : "#A5A5A5FF" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>

            ) : isZone && (status === 32 || status === "32" )? (
                <div className="flex items-center gap-2">
                    <div
                        className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                        style={{ backgroundColor: "#A5A5A5FF" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>

            ) : status === '4' || status === 4 ? (
                <div className="flex items-center gap-2">
                    <div
                        className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                        style={{ backgroundColor: "#FD8E0E" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>
            ) : status === '5' || status === 5 ? (
                <div className="flex items-center gap-2">
                    <div
                        className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full animate-led-blink`}
                        style={{ backgroundColor: "#FD8E0E" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>
            ) : status === '2' || status === 2 ? (
                <div className="flex items-center gap-2">
                    <div
                        className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                        style={{ backgroundColor: "#FF2020" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>
            ) : status === '0' ? (
                <div className="flex items-center gap-2">
                    <div
                        className="h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full relative"
                    >
                        {/* Grey background (always visible) */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: "#FD8E0E" }}
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
            ) : status === '1' || status === 1 ? (
                <div className="flex items-center gap-2">
                    <div
                        className={`h-[10px] w-[10px] 2xl:h-[10px] flex-shrink-0 rounded-full`}
                        style={{ backgroundColor: "#FD8E0E" }}
                    ></div>
                    <span className='text-white text-sm text-[12px]'>{label}</span>
                </div>
            )
                :  (
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

export default LedComponent