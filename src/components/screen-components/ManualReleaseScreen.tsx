import React, { useEffect, useState } from 'react'
// import { io, Socket } from 'socket.io-client';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};

interface ManualReleaseScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const ManuaReleaseScreenComponent: React.FC<ManualReleaseScreenComponentProps> = ({ screen, setScreen }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = formatDate(new Date());
    const [timerCount, setTimerCount] = useState(10);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setTimerCount((currentCount) => {
                return Math.max(currentCount - 1, 0);
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [screen.level, setScreen]);

    useEffect(() => {
        if (timerCount === 0) {
            setScreen({ level: screen.level, page: "GAS_RELEASED" });
        }
    }, [screen.level, setScreen, timerCount]);

    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-between gap-25">
                <h5>{time}</h5>
                <h5>{date}</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold text-center mt-[10px]">
                <h5>Timer Count: {timerCount} sec</h5>
            </div>
        </>
    )
}

export default ManuaReleaseScreenComponent;