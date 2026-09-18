import React from "react";
import AbortComponent from "../components/AbortComponent";
import LcdScreen from "../components/LcdScreen";
import ExtinguishantRelease from "../components/EstingushReleaseComponent";
import EmcusLogo from "../../public/logo/emcus-logo.png";

type PanelLayoutProps = {
    readonly zoneLedState: Record<string, number | string | boolean>;
    readonly statusLedState: Record<string, number | string | boolean>;
    readonly isBuzzerSilenced: boolean;
    readonly systemMessage: string;
    readonly setSystemMessage: React.Dispatch<React.SetStateAction<string>>;
    readonly releaseMode: "auto" | "manual";
    readonly setReleaseMode: React.Dispatch<React.SetStateAction<"auto" | "manual">>;
    readonly isOn: boolean;
    readonly setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
    readonly panelReset: () => void;
    readonly lampTestActive: boolean;
    readonly lampTest: () => void;
    readonly setFireStatus: React.Dispatch<React.SetStateAction<number>>;
    readonly screen: { level: number; page: string };
    readonly setScreen: React.Dispatch<React.SetStateAction<{ level: number; page: string }>>;
    readonly evacuateFunction: () => void;
    readonly silenceBuzzerFunction: () => void;
    readonly resoundAlarmFunction: () => void;
    readonly [key: string]: unknown;
};

export const initialLedSnapshot = {
    system_on: 1,
    silenced_led: 0,
    mains_fault_led: 0,
    battery_fault_led: 0,
    system_fault: 0,
    NAC_fault: 0,
    manual_release: 0,
    pre_release: 0,
    released_led: 0,
    abort_led: 0,
    pressure_fault_led: 0,
    RAC_fault_led: 0,
    earth_fault_led: 0,
    maintenance_led: 0,
};

type IndicatorProps = {
    readonly label: string;
    readonly status: number | string | boolean;
    readonly activeColor?: string;
    readonly square?: boolean;
};

function Indicator({ label, status, activeColor = "#f4d21a", square = true }: IndicatorProps) {
    const active = Boolean(status) && status !== "0";

    return (
        <div className="flex items-center gap-2 text-[16px] leading-none text-[#263022]">
            <span
                className={`h-2.5 w-5 shrink-0 border border-[#1d1d1d] ${square ? "rounded-sm" : "rounded-full"}`}
                style={{ backgroundColor: active ? activeColor : "#f2f2f2" }}
            />
            <span>{label}</span>
        </div>
    );
}

function ActionButton({ label, onClick }: { readonly label: string; readonly onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-end gap-3 text-[12px] font-semibold uppercase leading-none text-[#263022] sm:text-base"
        >
            <span className="w-[140px] text-right text-[14px]">{label}</span>
            <span className="h-10 w-10 shrink-0 rounded-full border-2 border-[#202020] bg-black hover:bg-[#444444] shadow-[inset_0_0_0_2px_#929394] transition-transform active:scale-90" />
        </button>
    );
}

type NavigationDirection = "up" | "left" | "right" | "down" | "enter";

function NavigationButton({ direction }: { readonly direction: NavigationDirection }) {
    const arrowPaths = {
        up: "M12 19V5m0 0 6 6m-6-6-6 6",
        left: "M19 12H5m0 0 6-6m-6 6 6 6",
        right: "M5 12h14m0 0-6-6m6 6-6 6",
        down: "M12 5v14m0 0 6-6m-6 6-6-6",
        enter: "M16 5v7H5m0 0 5-5m-5 5 5 5",
    } as const;

    return (
        <button
            type="button"
            aria-label={direction === "enter" ? "Select" : `${direction} navigation`}
            onClick={() => undefined}
            className="flex h-9 min-w-0 items-center justify-center rounded-md border-2 border-[#222] bg-black px-2 text-[10px] font-bold uppercase text-[#222] shadow-sm transition-transform active:scale-95"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-[#f2f2f2]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={arrowPaths[direction]} />
            </svg>
        </button>
    );
}

export default function PanelLayout({
    zoneLedState,
    statusLedState,
    isBuzzerSilenced,
    systemMessage,
    setSystemMessage,
    releaseMode,
    setReleaseMode,
    isOn,
    setIsOn,
    screen,
    setScreen,
    panelReset,
    lampTestActive,
    lampTest,
    evacuateFunction,
    silenceBuzzerFunction,
    resoundAlarmFunction,
    setFireStatus,
}: PanelLayoutProps) {
    const statusIndicators = [
        ["SYSTEM ON", isOn, "#22b51c"],
        ["SILENCED", isOn && (statusLedState.silenced_led || isBuzzerSilenced), undefined],
        ["MAINS FAULT", isOn && statusLedState.mains_fault_led, undefined],
        ["BATTERY FAULT", isOn && statusLedState.battery_fault_led, "#f4d21a"],
        ["SYSTEM FAULT", isOn && statusLedState.system_fault, "#f4d21a"],
        ["NAC FAULT", isOn && statusLedState.NAC_fault, undefined],
        ["MANUAL RELEASE", isOn && statusLedState.manual_release, undefined],
        ["PRE RELEASE", isOn && statusLedState.pre_release, undefined],
        ["RELEASED", isOn && statusLedState.released_led, undefined],
        ["ABORT", isOn && statusLedState.abort_led, undefined],
        ["PRESSURE FAULT", isOn && statusLedState.pressure_fault_led, undefined],
        ["RAC FAULT", isOn && statusLedState.RAC_fault_led, undefined],
        ["EARTH FAULT", isOn && statusLedState.earth_fault_led, undefined],
        ["MAINTENANCE", isOn && statusLedState.maintenance_led, undefined],
    ] as const;

    return (
        <main className="h-full w-full overflow-auto bg-[#202938] p-3 sm:p-6 scrollbar-hide 2xl:flex 2xl:items-center 2xl:justify-center">
            <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1440px] flex-col gap-4 sm:min-h-[calc(100vh-3rem)] lg:flex-row lg:gap-10 2xl:mx-0 2xl:h-[608px] 2xl:min-h-0 2xl:max-w-[1280px]">
                <section className="flex min-h-0 min-w-0 flex-1 flex-col rounded-[28px] border-2 border-[#202938] bg-[#C4C5C5] p-3 shadow-[0_5px_14px_rgba(0,0,0,0.25)] sm:p-5 lg:rounded-[42px] lg:p-6">
                    <div className="grid flex-1 grid-cols-2 gap-5 lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:gap-7">
                        <aside className="order-2 flex min-w-0 flex-col gap-5 lg:order-1 border-2 border-black rounded-xl">
                            <div className="rounded-2xl bg-transparent p-3">
                                <div className="grid grid-cols-2 gap-x-3 gap-y-[22px] lg:grid-cols-1">
                                    {statusIndicators.map(([label, status, activeColor]) => (
                                        <Indicator key={label} label={label} status={lampTestActive ? 1 : status} activeColor={activeColor} />
                                    ))}
                                </div>
                            </div>
                            {/* <div className="rounded-2xl border-2 border-[#222] bg-white p-3 shadow-sm">
                            <h2 className="mb-3 border-b border-[#555] pb-2 text-[11px] font-bold uppercase text-[#242424]">Zones 1-32</h2>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {Array.from({ length: 32 }, (_, index) => {
                                    const zone = index + 1;
                                    return <Indicator key={zone} label={String(zone)} status={zoneLedState[`zone${zone}_led_sts`]} />;
                                })}
                            </div>
                        </div> */}
                        </aside>

                        <div className="order-1 col-span-2 flex min-w-0 flex-col items-center gap-5 lg:order-2 lg:col-span-1">
                            <header className="flex w-full max-w-[660px] items-center justify-end px-[5px] text-[#222]">
                                {/* <span className="text-lg font-bold tracking-wide sm:text-2xl">EMCUS</span> */}
                                <div className="text-right">
                                    <h1 className="text-sm font-bold uppercase sm:text-lg">GP-400 R Gas Release Panel</h1>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider">UL/FM Approved</p>
                                </div>
                            </header>

                            <div className="w-full max-w-[660px]">
                                <div className="h-[190px] overflow-hidden rounded-xl border-4 border-[#333333] bg-[#658602]">
                                    <LcdScreen isOn={isOn} setIsOn={setIsOn} screen={screen} setScreen={setScreen} systemMessage={systemMessage} releaseMode={releaseMode} />
                                </div>
                            </div>

                            <div className="flex w-full max-w-[660px] flex-wrap items-center justify-between gap-3">
                                <div className="w-40 shrink-0">
                                    <AbortComponent
                                        variant="rectangular"
                                        onClick={() => setScreen({ level: screen.level, page: "RELEASE_ABORTED" })}
                                    />
                                </div>

                                <div className="w-40 shrink-0">
                                    <ExtinguishantRelease
                                        variant="rectangular"
                                        onClick={() => setScreen({ level: screen.level, page: "MANUAL_RELEASE" })}
                                    />
                                </div>

                                <div className="grid w-[132px] grid-cols-3 grid-rows-3 gap-1" aria-label="LCD navigation">
                                    <span />
                                    <NavigationButton direction="up" />
                                    <span />
                                    <NavigationButton direction="left" />
                                    <NavigationButton direction="enter" />
                                    <NavigationButton direction="right" />
                                    <span />
                                    <NavigationButton direction="down" />
                                    <span />
                                </div>

                            </div>

                            <div className="flex w-full max-w-[660px] flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:justify-between">
                                <div className="grid h-[145px] w-full max-w-[360px] grid-cols-[92px_repeat(4,minmax(26px,1fr))] items-center gap-x-3 gap-y-3 rounded-md border-2 border-[#333333] bg-white p-3 text-[14px] text-[#222] sm:p-4">
                                    <span>Zone</span>
                                    {[1, 2, 3, 4].map((zone) => (
                                        <span key={zone} className="text-center">{zone}</span>
                                    ))}

                                    <span className="col-span-5 border-t-2 border-[#333333]" aria-hidden="true" />
                                    <span>Fire</span>
                                    {[1, 2, 3, 4].map((zone) => {
                                        const status = zoneLedState[`zone${zone}_led_sts`];
                                        const isFire = lampTestActive || status === 2 || status === "2";
                                        return <span key={`fire-${zone}`} className={`mx-auto h-2.5 w-5 rounded-sm border border-[#222] ${isFire ? "bg-[#f04432]" : "bg-[#f2f2f2]"}`} />;
                                    })}

                                    <span className="col-span-5 border-t-2 border-[#333333]" aria-hidden="true" />
                                    <span>Fault/Dis/Test</span>
                                    {[1, 2, 3, 4].map((zone) => {
                                        const status = zoneLedState[`zone${zone}_led_sts`];
                                        const isFault = lampTestActive || ["1", "4", "5"].includes(String(status));
                                        return <span key={`fault-${zone}`} className={`mx-auto h-2.5 w-5 rounded-sm border border-[#222] ${isFault ? "bg-[#f4d21a]" : "bg-[#f2f2f2]"}`} />;
                                    })}
                                </div>
                                {/* <button
                                    type="button"
                                    onClick={() => {
                                        setScreen({ level: 1, page: "MANUAL_RELEASE" });
                                    }}
                                    className="flex h-12 w-40 shrink-0 items-center justify-center self-center rounded-full border-2 border-[#222] bg-[#f4ed4b] px-2 text-[10px] font-bold uppercase text-[#222] shadow-sm transition-transform active:scale-95 sm:self-center"
                                >
                                    Manual Release
                                </button> */}
                            </div>
                        </div>

                        <aside className="order-3 col-span-1 flex w-full max-w-[190px] min-w-0 flex-col items-center justify-top gap-5 justify-self-center lg:order-3">
                            <div className="flex w-full flex-col gap-3 border-2 px-3 py-3 border-black rounded-xl ">
                                <ActionButton label="Acknowledge" onClick={() => setSystemMessage("SYSTEM ACKNOWLEDGED")} />
                                <ActionButton label="Silence" onClick={silenceBuzzerFunction} />
                                <ActionButton label="Reset" onClick={() => { panelReset(); setSystemMessage("SYSTEM IN RESET"); }} />
                                <ActionButton label="Lamp Test" onClick={lampTest} />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-[10px] mt-14 font-semibold text-[#222]">
                                <div className="flex items-center gap-16">
                                    {(["auto", "manual"] as const).map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setReleaseMode(mode)}
                                            className="flex flex-col items-center gap-1"
                                        >
                                            <span className={`h-2.5 w-5 rounded-sm border border-[#222] ${releaseMode === mode ? "bg-[#f4d21a]" : "bg-[#f2f2f2]"}`} />
                                            <span className="whitespace-nowrap capitalize">{mode}</span>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    aria-label={`Switch to ${releaseMode === "auto" ? "manual" : "automatic"} mode`}
                                    onClick={() => setReleaseMode((mode) => mode === "auto" ? "manual" : "auto")}
                                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#222] bg-white shadow-inner transition-transform active:scale-90"
                                >
                                    <span className={`block h-11 w-3 rounded-full border-2 border-[#777] bg-[#ddd] transition-transform duration-300 ${releaseMode === "auto" ? "rotate-[-45deg]" : "rotate-[45deg]"}`} />
                                </button>
                                <div className="bg-white rounded-md p-1 mt-[90px]">
                                    <img
                                        src={EmcusLogo}
                                    />
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
                <aside className="flex w-full shrink-0 flex-col items-center justify-center gap-4 rounded-[28px] border-2 bg-transparent p-4 lg:w-8 lg:rounded-[32px] lg:border-0 lg:p-2 2xl:ml-14 lg:mr-6 2xl:mr-0">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            type="button"
                            aria-label="Power"
                            onClick={() => setIsOn(true)}
                            disabled
                            className="flex h-16 w-16 cursor-default items-center justify-center rounded-full border-2 border-[#222] bg-white shadow-inner"
                        >
                            <span className={`mx-auto block h-11 w-3 rounded-full border-2 border-[#777] bg-[#ddd] transition-transform duration-300 ${isOn ? "rotate-[-45deg]" : "rotate-[45deg]"}`} />
                        </button>
                        {/* <span className="text-center text-[10px] font-bold uppercase text-[#222]">On / Off</span> */}
                    </div>
                </aside>
            </div>
        </main>
    );
}