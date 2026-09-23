import React from 'react'
const level2icon = "/ui-elements/two-level-panel-icon.svg";

interface LevelAccesMenuComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const LevelAccessMenuComponent: React.FC<LevelAccesMenuComponentProps> = ({screen, setScreen}) => {
    return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-50">
                <h5>SELECT USER LEVEL</h5>
            </div>
            <div className="px-8 text-[#324200FF] font-bold flex justify-around mt-[15px]">
                <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: 1, page: "ENTER_PASSWORD" })}
                    >
                        <img
                            src={level2icon}
                            alt="Caution Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Level 2</h5>
                </div>
                {/* <div className="flex items-center gap-3">
                    <button
                        className="
                                        bg-[#324200FF] h-10 w-10 rounded flex items-center justify-center
                                        hover:bg-[#2a3600ff] transition duration-200
                                    "
                        onClick={() => setScreen({ level: 3, page: "ENTER_PASSWORD" })}
                    >
                        <img
                            src="/ui-elements/three-level-panel-icon.svg"
                            alt="Fire Icon"
                            className="inline-block w-7 h-7"
                        />
                    </button>
                    <h5>Level 3</h5>
                </div> */}
            </div>
            <div className="px-8 text-[#A0BD49FF] font-bold flex justify-center mt-5">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: 1, page: "MENU" })}
                >
                    BACK
                </button>
            </div>
        </>
    )
}

export default LevelAccessMenuComponent