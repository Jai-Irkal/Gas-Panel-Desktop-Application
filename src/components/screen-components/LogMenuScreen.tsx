import React from 'react'
import { getAssetUrl } from '../../util/assetPath';

const cautionIcon = getAssetUrl("ui-elements/caution-panel-icon.svg");
const fireIcon = getAssetUrl("ui-elements/fire-panel-icon.svg");
const bothIcon = getAssetUrl("ui-elements/both-panel-icon.svg");

interface LogMenuScreenProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const LogMenuScreen: React.FC<LogMenuScreenProps> = ({screen, setScreen}) => {
    console.log("Level from log menu", screen.level)
    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-28 2xl:gap-56">
                {/* <h5>LEVEL-{screen.level}</h5> */}
                <h5>LOG MENU</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold flex justify-around -mt-[2px]">
                <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: screen.level, page: "FAULT" })}
                    >
                        <img
                            src={cautionIcon}
                            alt="Caution Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Fault</h5>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: screen.level, page: "FIRE" })}
                    >
                        <img
                            src={fireIcon}
                            alt="Fire Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Fire</h5>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: screen.level, page: "ALL" })}
                    >
                        <img
                            src={bothIcon}
                            alt="Fire Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Fire & Fault</h5>
                </div>
            </div>
            <div className="px-8 text-[#A0BD49FF] font-bold flex justify-center mt-8">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: screen.level, page: "MENU" })}
                >
                    BACK
                </button>
            </div>
        </>
    )
}

export default LogMenuScreen