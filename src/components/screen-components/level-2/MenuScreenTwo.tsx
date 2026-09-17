// import { Device } from '@/types/device';
import React from 'react'

interface MenuScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const MenuScreenTwo:React.FC<MenuScreenComponentProps> = ({screen, setScreen}) => {

    // const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    
  return (
        <>
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-45">
                <h5>LEVEL {screen.level} Menu</h5>
            </div>
            <div className='grid grid-cols-3 gap-2 overflow-y-auto px-8 py-1 h-[90px] scrollbar-hide -mt-6'>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "ACCESS_LOGS" })}
                >
                    <h5>Events</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "ZONE_ENABLE_DISABLE" })}
                >
                    <h5>Zones</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "TEST_MENU" })}
                >
                    <h5>Test</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "HOME_LEVEL_2" })}
                >
                    <h5>Input Prog</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "HOME_LEVEL_2" })}
                >
                    <h5>Auto Mode timer</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:1, page: "ENTER_PASSWORD" })}
                >
                    <h5>User Level</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:1, page: "HOME_LEVEL_2" })}
                >
                    <h5>Relay Prog</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:1, page: "HOME_LEVEL_2" })}
                >
                    <h5>Co-Relation</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:1, page: "HOME_LEVEL_2" })}
                >
                    <h5>Settings</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:1, page: "ABOUT" })}
                >
                    <h5>About</h5>
                </div>
            </div>
            <div className="px-8 text-[#A0BD49FF] font-bold flex justify-center mt-2">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "HOME_LEVEL_2" })}
                >
                    BACK
                </button>
            </div>
        </>
    )
}

export default MenuScreenTwo