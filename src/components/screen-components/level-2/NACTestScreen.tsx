import { Zone } from 'src/types/zone';
import React from 'react'

interface InfoScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

type NAC = {
    id:number;
    NAC:string;
    NAC_status:string;
}

const NACTestScreen: React.FC<InfoScreenComponentProps> = ({screen, setScreen}) => {

    const [nac, setNAC] = React.useState<NAC[]>([
        {
            id: 1,
            NAC: "NAC 01",
            NAC_status: "-"
        },
        {
            id: 2,
            NAC: "NAC 02",
            NAC_status: "-"
        },
        {
            id: 3,
            NAC: "NAC 03",
            NAC_status: "-"
        },
        {
            id: 4,
            NAC: "NAC 04",
            NAC_status: "-"
        },
    ]);;

    const toggleDeviceStatus = (id: number) => {
        setNAC(nac =>
            nac.map(na =>
                na.id === id
                    ? {
                        ...na,
                        NAC_status: na.NAC_status === "-" ? "Test" : "-"
                    }
                    : na
            )
        );
    };

      return (
          <>
              <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-48">
                  <h5>NAC Test</h5>
              </div>
              <div className="h-[65%] w-full flex flex-col items-center justify-center text-[#324200FF] mt-[-28px]">
                  <div className="w-[80%] flex flex-col justify-center h-[70%]">
                      <div className="grid grid-cols-[1fr_1.5fr] mb-2 text-center font-bold text-[#324200FF]">
                          <div>NAC#</div>
                          <div>NAC Status</div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto text-center scrollbar-hide">
                          {nac.map((zone) => (
                              <div
                                  key={zone.id}
                                  className="grid grid-cols-[1fr_1.5fr] items-center font-medium px-2"
                              >
                                  <h5>{zone.NAC}</h5>
                                  <button
                                    className={`w-full rounded px-3 py-1 text-center font-bold transition duration-200
                                        ${zone.NAC_status === "-"
                                            ? "bg-transparent text-[#324200FF]"
                                            : "bg-transparent text-[#324200FF]"
                                        }`}
                                    onClick={() => toggleDeviceStatus(zone.id)}
                                >
                                    {zone.NAC_status}
                                </button>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="px-8 text-[#A0BD49FF] font-bold flex justify-center -mt-4">
                  <button
                      className="px-4 py-1 rounded-xl bg-[#324200FF] w-full hover:bg-[#2a3600ff] transition duration-200"
                      onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "TEST_MENU" })}
                  >
                      BACK
                  </button>
              </div>
          </>
      )
}

export default NACTestScreen;