// import { Device } from '@/types/device';
import React from 'react'

interface MenuScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const TestMenuScreen:React.FC<MenuScreenComponentProps> = ({screen, setScreen}) => {

    // const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    
  return (
        <div className="flex h-full flex-col">
            <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-45">
                <h5>Test Menu</h5>
            </div>
            <div className='flex flex-1 items-center justify-center gap-8 overflow-y-auto px-8 py-1 scrollbar-hide -mt-8'>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "ZONE_TEST" })}
                >
                    <h5>Zone Test</h5>
                </div>
                <div
                    className="cursor-pointer rounded bg-[#658602FF] px-2 py-1 text-center font-bold text-[#324200FF] transition duration-200 hover:bg-green-800 hover:text-[#A0BD49FF]"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "NAC_TEST" })}
                >
                    <h5>NAC Test</h5>
                </div>
            </div>
            <div className="mt-auto px-8 pb-4 text-[#A0BD49FF] font-bold flex justify-center">
                <button
                    className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                    onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "MENU" })}
                >
                    BACK
                </button>
            </div>
        </div>
    )
}

export default TestMenuScreen