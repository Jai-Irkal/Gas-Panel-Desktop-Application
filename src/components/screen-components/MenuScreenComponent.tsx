import React from 'react';
import userLockIcon from "../../../public/ui-elements/user-lock-icon.svg";
import panelIcon from "../../../public/ui-elements/log-panel-icon.svg";

interface MenuScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const MenuScreenComponent: React.FC<MenuScreenComponentProps> = ({ screen, setScreen }) => {
    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-30 2xl:gap-50">
                {/* <h5>LEVEL-{screen.level}</h5> */}
                <h5>MENU SCREEN</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold flex justify-around 2xl:mt-[10px] -mt-2">
                <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: 1, page: "ACCESS_LEVEL" })}
                    >
                        <img
                            src={userLockIcon}
                            alt="User Icon"
                            className="inline-block w-7 h-7 ml-1"
                        />
                    </button>
                    <h5>User Level</h5>
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <button
                        className="bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center hover:bg-[#2a3600ff] transition duration-200"
                        onClick={() => setScreen({ level: 1, page: "ACCESS_LOGS" })}
                    >
                        <img
                            src={panelIcon}
                            alt="User Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Events</h5>
                </div>
            </div>
            <div className="px-8 text-[#A0BD49FF] font-bold flex justify-center mt-5">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: 1, page: "HOME" })}
                >
                    BACK
                </button>
            </div>
        </>
    )
}

export default MenuScreenComponent