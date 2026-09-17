import React from 'react'
// import { io, Socket } from 'socket.io-client';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};

interface HomeScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
    systemMessage: string;
    releaseMode: "auto" | "manual";
}

const HomeScreenComponent: React.FC<HomeScreenComponentProps> = ({ screen, setScreen, systemMessage, releaseMode }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = formatDate(new Date());
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
            <div className="relative flex justify-between gap-25 px-8 py-5 font-bold text-[#324200FF]">
                <h5>{time}</h5>
                {screen.level === 2 && (
                    <h5 className="absolute left-1/2 -translate-x-1/2">Level 2</h5>
                )}
                <h5>{date}</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold text-center 2xl:mt-[-10px] -mt-[18px]">
                <h5>
                    {systemMessage !== "SYSTEM IN NORMAL"
                        ? systemMessage
                        : `SYSTEM IN ${releaseMode === "auto" ? "AUTOMATIC MODE" : "MANUAL MODE"}`}
                </h5>
                {/* <h5>IN-LEVEL - {screen.level}</h5> */}
            </div>
            <div className="px-8 text-[#324200FF] font-bold text-center mt-[10px]">
                <h5>Agent Release Panel</h5>
            </div>
            <div className="px-8 text-[#A0BD49FF] font-semibold 2xl:font-bold flex justify-center mt-6">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: screen.level, page: "MENU" })}
                >
                    MENU
                </button>
            </div>
        </>
    )
}

export default HomeScreenComponent