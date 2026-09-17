import React, { useEffect } from 'react'
// import { io, Socket } from 'socket.io-client';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};

interface GasReleasedScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const AboutScreen: React.FC<GasReleasedScreenComponentProps> = ({ screen, setScreen }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = formatDate(new Date());

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setScreen({
                level: screen.level,
                page: "MENU",
            });
        }, 3000);

        return () => window.clearTimeout(timer);
    }, [screen.level, setScreen]);

    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-between gap-25">
                <h5>{time}</h5>
                <h5>{date}</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold text-center mt-[10px]">
                <h5>Model GP EC 400 R</h5>
                <h5>Version 1.0.0</h5>
            </div>
        </>
    )
}

export default AboutScreen;