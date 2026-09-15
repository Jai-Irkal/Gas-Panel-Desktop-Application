import React, { useEffect } from 'react'
// import { io, Socket } from 'socket.io-client';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};

interface ReleaseAbortedScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const ReleaseAbortedScreen: React.FC<ReleaseAbortedScreenComponentProps> = ({ screen, setScreen }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = formatDate(new Date());

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setScreen({
                level: screen.level,
                page: screen.level === 2 ? "HOME_LEVEL_2" : "HOME",
            });
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [screen.level, setScreen]);
    // const {
    //         statusLedState,
    //         applyStatusChanges,
    //         resetStatusLedState
    //     } = useStatusLedState();

    //     const socketRef = useRef<Socket | null>(null);

    // useEffect(() => {
    //     const socket = io(
    //         "https://cloud-panel.api.emcus.co.in/ledSocket",
    //         { transports: ["websocket"] }
    //     );

    //     socketRef.current = socket;

    //     socket.on("led-status-init", payload => {
    //         console.log("🧠 FULL STATE", payload.data);
    //         applyStatusChanges(payload.data);
    //         console.log("After Updating Zone LEDs: ", statusLedState)
    //     });

    //     // 2️⃣ Incremental updates
    //     socket.on("led-status-changed", payload => {
    //         console.log("🔁 DELTA", payload.data);
    //         applyStatusChanges(payload.data);
    //         console.log("After Updating Status LEDs: ", statusLedState)
    //     });

    //     socket.on("disconnect", () => {
    //         console.log("🔌 LED socket disconnected");
    //     });

    //     // ✅ cleanup must return void
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [statusLedState]);
    

    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-between gap-25">
                <h5>{time}</h5>
                <h5>{date}</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold text-center mt-[10px]">
                <h5>Release Aborted</h5>
            </div>
        </>
    )
}

export default ReleaseAbortedScreen;