import { Zone } from 'src/types/zone';
import React from 'react'

interface InfoScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const ZoneTestScreen: React.FC<InfoScreenComponentProps> = ({screen, setScreen}) => {

    const [zones, setZones] = React.useState<Zone[]>([
        {
            id: 1,
            zone_number: "Z1",
            zone_text: "Main Lobby",
            zone_status: "-"
        },
        {
            id: 2,
            zone_number: "Z2",
            zone_text: "Main Entrance",
            zone_status: "-"
        },
        {
            id: 3,
            zone_number: "Z3",
            zone_text: "Side Entrance",
            zone_status: "-"
        },
        {
            id: 4,
            zone_number: "Z4",
            zone_text: "Side Entrance",
            zone_status: "-"
        },
    ]);;

    const toggleDeviceStatus = (id: number) => {
        setZones(zones =>
            zones.map(zone =>
                zone.id === id
                    ? {
                        ...zone,
                        zone_status: zone.zone_status === "-" ? "Test" : "-"
                    }
                    : zone
            )
        );
    };

      return (
          <>
              <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-48">
                  <h5>Zone Test</h5>
              </div>
              <div className="h-[65%] w-full flex flex-col items-center justify-center text-[#324200FF] mt-[-28px]">
                  <div className="w-[80%] flex flex-col justify-center h-[70%]">
                      <div className="grid grid-cols-[1fr_1.5fr_1fr] mb-2 text-center font-bold text-[#324200FF]">
                          <div>Zone Number</div>
                          <div>Zone Name</div>
                          <div>Zone Status</div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto text-center scrollbar-hide">
                          {zones.map((zone) => (
                              <div
                                  key={zone.id}
                                  className="grid grid-cols-[1fr_1.5fr_1fr] items-center font-medium px-2"
                              >
                                  <h5>{zone.zone_number}</h5>
                                  <h5>{zone.zone_text}</h5>
                                  <button
                                    className={`w-full rounded px-3 py-1 text-center font-bold transition duration-200
                                        ${zone.zone_status === "-"
                                            ? "bg-transparent text-[#324200FF]"
                                            : "bg-transparent text-[#324200FF]"
                                        }`}
                                    onClick={() => toggleDeviceStatus(zone.id)}
                                >
                                    {zone.zone_status}
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

export default ZoneTestScreen;