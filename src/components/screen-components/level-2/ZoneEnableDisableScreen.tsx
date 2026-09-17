import { Zone } from 'src/types/zone';
import React from 'react'

interface InfoScreenComponentProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const ZoneEnableDisable: React.FC<InfoScreenComponentProps> = ({screen, setScreen}) => {

    const [zones, setZones] = React.useState<Zone[]>([
        {
            id: 1,
            zone_number: "Z1",
            zone_text: "Main Lobby",
            zone_status: "ENABLED"
        },
        {
            id: 2,
            zone_number: "Z2",
            zone_text: "Main Entrance",
            zone_status: "ENABLED"
        },
        {
            id: 3,
            zone_number: "Z3",
            zone_text: "Side Entrance",
            zone_status: "DISABLED"
        },
        {
            id: 4,
            zone_number: "Z4",
            zone_text: "Side Entrance",
            zone_status: "DISABLED"
        },
    ]);;

    const toggleDeviceStatus = (id: number) => {
        setZones(zones =>
            zones.map(zone =>
                zone.id === id
                    ? {
                        ...zone,
                        zone_status: zone.zone_status === "ENABLED" ? "DISABLED" : "ENABLED"
                    }
                    : zone
            )
        );
    };

      return (
          <>
              <div className="px-8 py-5 text-[#324200FF] font-bold flex justify-center gap-48">
                  <h5>ZONE ENABLE / DISABLE</h5>
              </div>
              <div className="h-[60%] w-full flex flex-col items-center justify-center text-[#324200FF] mt-[-15px]">
                  <div className="w-[80%] flex flex-col justify-center h-[70%]">
                      <div className="grid grid-cols-3 font-bold text-[#324200FF] mb-2">
                          <div>Zone Number</div>
                          <div>Zone Name</div>
                          <div>Zone Status</div>
                      </div>
                      <div className="flex-1 overflow-y-auto flex flex-col gap-2 scrollbar-hide">
                          {zones.map((zone) => (
                              <div
                                  key={zone.id}
                                  className="grid grid-cols-3 font-medium px-2"
                              >
                                  <h5>{zone.zone_number}</h5>
                                  <h5>{zone.zone_text}</h5>
                                  <button
                                    className={`px-3 py-1 rounded transition duration-200 font-bold
                                        ${zone.zone_status === "ENABLED"
                                            ? "bg-green-700 text-[#9DCA15FF] hover:bg-green-800"
                                            : "bg-[#A70101] text-white hover:bg-[#800202]"
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
                      onClick={() => setScreen({ level: screen.level == 2? 2:3, page: "MENU" })}
                  >
                      BACK
                  </button>
              </div>
          </>
      )
}

export default ZoneEnableDisable