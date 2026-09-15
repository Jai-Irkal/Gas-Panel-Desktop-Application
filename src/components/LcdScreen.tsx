// import { set } from "lodash";
import React, { useEffect, useState } from "react";
import HomeScreenComponent from "./screen-components/HomeScreenComponent";
import MenuScreenComponent from "./screen-components/MenuScreenComponent";
// import LevelAccessMenuComponent from "./screen components/level-1/LevelAccessMenuComponent";
import LogMenuScreen from "./screen-components/LogMenuScreen";
import LogScreen from "./screen-components/LogScreen";
// import EnterPasswordScreen from "./screen components/common-screens/EnterPasswordScreen";
// import PasswordSuccessScreen from "./screen components/common-screens/PasswordSuccessScreen";
// import PasswordFailureScreen from "./screen components/common-screens/PasswordFailureScreen";
// import MenuScreenLevel2 from "./screen components/level-2/MenuScreenLevel2";
// import UserLevelMenu from "./screen components/level-2/menu-pages/UserLevelMenu";
// import EventLogMenu from "./screen components/level-2/menu-pages/EventLogsMenu";
// import LogScreenLevel2 from "./screen components/level-2/LogScreenLevel2";
// import ViewMenu from "./screen components/level-2/menu-pages/ViewMenu";
// import EnableDisableMenu from "./screen components/level-2/menu-pages/EnableDisableMenu";
// import DeviceListScreen from "./screen components/level-2/info-screens/DeviceListScreen";
// import DeviceInfoScreen from "./screen components/level-2/info-screens/DeviceInfoScreen";
import { Device } from "src/types/device";
// import PanelInfoScreen from "./screen components/level-2/info-screens/PanelInfoScreen";
import { Panel } from "src/types/panel";
import LevelAccessMenuComponent from "./screen-components/LevelAccessMenuComponent";
import EnterPasswordScreen from "./screen-components/EnterPasswordScreen";
import PasswordSuccessScreen from "./screen-components/PasswordSuccessScreen";
import PasswordFailureScreen from "./screen-components/PasswordFailureScreen";
import ManuaReleaseScreenComponent from "./screen-components/ManualReleaseScreen";
import ReleaseAbortedScreen from "./screen-components/ReleaseAbortedScreen";
import GasReleasedScreen from "./screen-components/GasReleasedScreen";
import MenuScreenTwo from "./screen-components/level-2/MenuScreenTwo";
// import DeviceEnableDisable from "./screen components/level-2/info-screens/DeviceEnableDisable";
// import ZoneEnableDisable from "./screen components/level-2/info-screens/ZoneEnableDisable";
// import ZoneInfoScreen from "./screen components/level-2/info-screens/ZoneInfoScreen";
// import MenuScreenLevel3 from "./screen components/level-3/MenuScreenLevel3";
// import RoutingEnableDisable from "./screen components/level-3/RoutingEnableDisable";
// import WalkTestScreen from "./screen components/level-3/WalkTestScreen";
// import ZoneWalkTestScreen from "./screen components/level-3/ZoneWalkTestScreen";
// import DeviceAnalogScreen from "./screen components/level-2/DeviceAnalogScreen";

interface LcdScreenProps {
    isOn: boolean;
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>,
    screen: {
        level: number,
        page: string
    }; // Add more as needed
    setScreen: (screen: { level: number, page: string }) => void;
    systemMessage: string;
}

const AnimatedDots = ({ onFinish }: { onFinish: () => void }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= 12) { // 4 steps per cycle * 3 cycles = 12
            onFinish();
            return;
        }
        const interval = setInterval(() => {
            setStep((prev) => prev + 1);
        }, 300); // 0.3s per dot, adjust as needed
        return () => clearInterval(interval);
    }, [step, onFinish]);

    const dots = ["", ".", "..", "..."];
    return <span className="inline-block ml-1">{dots[step % 4]}</span>;
};

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};

const LcdScreen: React.FC<LcdScreenProps> = ({ screen, setScreen, isOn, setIsOn, systemMessage }) => {

    const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [date, setDate] = useState(() => formatDate(new Date()));
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [withOutput, setWithOutput] = useState<boolean>(false);
    const selectedPanel: Panel = {
        id: 1,
        panel_name: "Main Panel",
        panel_address: "D200",
        software_version: "v1.0.0",
        verify_mode: "Mode A",
        service_due: "01-Jan-25",
        system_code: "SYS12345",
        network_channel_pair: "NCP001",
        field_channel_pair: "FCP001",
        routing_status: "ENABLED"
    }


    useEffect(() => {
        if (isOn && screen.level === 1 && screen.page === "HOME") {
            const interval = setInterval(() => {
                const now = new Date();
                setDate(formatDate(now));
                setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                setDate(formatDate(now));
            }, 60000); // update every minute

            // Set immediately in case the minute just changed
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDate(formatDate(now));

            return () => clearInterval(interval);
        }
    }, [isOn, screen]);

    useEffect(() => {
        if (screen.page === "INITIALIZING") {
            const timeout = setTimeout(() => {
                setScreen({ level: 1, page: "HOME" });
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [screen.page]);

    // Level1 Routing
    if (isOn) {
        console.log(screen);
        if (screen.page === "INITIALIZING") {
            const nextScreen = { level: 1, page: "HOME" };
            return (
                <div className="flex items-center justify-center h-full w-full">
                    <span className="text-[#324200FF] text-l font-bold">
                        INITIALIZING SYSTEM
                        <AnimatedDots onFinish={() => setScreen(nextScreen)} />
                    </span>
                </div>
            );
        }
        // if (screen.page === "ENTER_PASSWORD") {
        //     return (
        //         <EnterPasswordScreen screen={screen} setScreen={setScreen} />
        //     )
        // }
        // if (screen.page === "PASSWORD_SUCCESS") {
        //     return (
        //         <PasswordSuccessScreen screen={screen} setScreen={setScreen} />
        //     )
        // }
        // if (screen.page === "PASSWORD_FAILURE") {
        //     return (
        //         <PasswordFailureScreen screen={screen} setScreen={setScreen} />
        //     )
        // }
        if (screen.level === 1) {
            if (screen.page === "HOME") {
                return (
                    <HomeScreenComponent screen={screen} setScreen={setScreen} systemMessage={systemMessage} />
                )
            } else if (screen.page === "MENU") {
                return (
                    <MenuScreenComponent screen={screen} setScreen={setScreen} />
                )
            } else if (screen.page === "ACCESS_LOGS") {
                return (
                    <LogMenuScreen screen={screen} setScreen={setScreen} />
                )
            } else if (screen.page === "ACCESS_LEVEL") {
                return (
                    <LevelAccessMenuComponent screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "ENTER_PASSWORD") {
                return (
                    <EnterPasswordScreen screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "PASSWORD_SUCCESS") {
                return (
                    <PasswordSuccessScreen screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "PASSWORD_FAILURE") {
                return (
                    <PasswordFailureScreen screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "FIRE") {
                return (
                    <LogScreen screen={{ level: screen.level, page: "FIRE" }} setScreen={setScreen} />
                );
            } else if (screen.page === "FAULT") {
                return (
                    <LogScreen screen={{ level: screen.level, page: "FAULT" }} setScreen={setScreen} />
                )
            } else if (screen.page === "ALL") {
                return (
                    <LogScreen screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
                )
            } else if (screen.page === "MANUAL_RELEASE") {
                return (
                    <ManuaReleaseScreenComponent screen={{ level: screen.level, page: "MANUAL_RELEASE" }} setScreen={setScreen} />
                )
            } else if (screen.page === "RELEASE_ABORTED") {
                return (
                    <ReleaseAbortedScreen screen={{ level: screen.level, page: "RELEASE_ABORTED" }} setScreen={setScreen} />
                )
            } else if (screen.page === "GAS_RELEASED") {
                return (
                    <GasReleasedScreen screen={{ level: screen.level, page: "GAS_RELEASED" }} setScreen={setScreen} />
                )
            }

        } else if (screen.level === 2) {
            if (screen.page === "HOME_LEVEL_2") {
                return (
                    <HomeScreenComponent screen={screen} setScreen={setScreen} systemMessage={systemMessage} />
                )
            }
            else if (screen.page === "ENTER_PASSWORD") {
                return (
                    <EnterPasswordScreen screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "PASSWORD_SUCCESS") {
                return (
                    <PasswordSuccessScreen screen={screen} setScreen={setScreen} />
                )
            }
            else if (screen.page === "PASSWORD_FAILURE") {
                return (
                    <PasswordFailureScreen screen={screen} setScreen={setScreen} />
                )
            } else if (screen.page === "MANUAL_RELEASE") {
                return (
                    <ManuaReleaseScreenComponent screen={{ level: screen.level, page: "MANUAL_RELEASE" }} setScreen={setScreen} />
                )
            } else if (screen.page === "RELEASE_ABORTED") {
                return (
                    <ReleaseAbortedScreen screen={{ level: screen.level, page: "RELEASE_ABORTED" }} setScreen={setScreen} />
                )
            } else if (screen.page === "GAS_RELEASED") {
                return (
                    <GasReleasedScreen screen={{ level: screen.level, page: "GAS_RELEASED" }} setScreen={setScreen} />
                )
            }
            else if (screen.page === "MENU") {
                return (
                    <MenuScreenTwo screen={{ level: screen.level, page: "MENU" }} setScreen={setScreen} />
                )
            }
            //else if (screen.page === "MENU") {
            //         return (
            //             <MenuScreenLevel2 screen={screen} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "USER_LEVEL_MENU") {
            //         return (
            //             <UserLevelMenu screen={screen} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "EVENT_LOG_MENU") {
            //         return (
            //             <EventLogMenu screen={screen} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "FIRE") {
            //         return (
            //             <LogScreenLevel2 screen={{ level: screen.level, page: "FIRE" }} setScreen={setScreen} />
            //         );
            //     } else if (screen.page === "FAULT") {
            //         return (
            //             <LogScreenLevel2 screen={{ level: screen.level, page: "FAULT" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "ALL EVENT") {
            //         return (
            //             <LogScreenLevel2 screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "VIEW_MENU") {
            //         return (
            //             <ViewMenu screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "ENABLE_DISABLE_MENU") {
            //         return (
            //             <EnableDisableMenu screen={{ level: screen.level, page: "ENABLE_DISABLE_MENU" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "DEVICE_ANALOG_VALUES") {
            //         return (
            //             <DeviceAnalogScreen
            //                 screen={{ level: screen.level, page: "DEVICE_ANALOG_VALUES" }}
            //                 setScreen={setScreen}
            //             />
            //         )
            //     } else if (screen.page === "DEVICE_LIST") {
            //         return (
            //             <DeviceListScreen screen={{ level: screen.level, page: "DEVICE_LIST" }} setScreen={setScreen} setSelectedDevice={setSelectedDevice} />
            //         )
            //     } else if (screen.page === "DEVICE_INFO") {
            //         return (
            //             <DeviceInfoScreen screen={{ level: screen.level, page: "DEVICE_LIST" }} setScreen={setScreen} device={selectedDevice} />
            //         )
            //     } else if (screen.page === "ZONE_INFO") {
            //         return (
            //             <ZoneInfoScreen screen={{ level: screen.level, page: "ZONE_INFO" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "PANEL_INFO") {
            //         return (
            //             <PanelInfoScreen screen={{ level: screen.level, page: "PANEL_INFO" }} setScreen={setScreen} panel={selectedPanel} />
            //         )
            //     } else if (screen.page === "ENABLE_DISABLE_DEVICE") {
            //         return (
            //             <DeviceEnableDisable screen={{ level: screen.level, page: "ENABLE_DISABLE_DEVICE" }} setScreen={setScreen} />
            //         )
            //     } else if (screen.page === "ENABLE_DISABLE_ZONE") {
            //         return (
            //             <ZoneEnableDisable screen={{ level: screen.level, page: "ENABLE_DISABLE_ZONE" }} setScreen={setScreen} />
            //         )
            //     }
        }// else if (screen.level === 3) {
        //     if (screen.page === "HOME") {
        //         return (
        //             <>
        //                 <HomeScreenComponent screen={screen} setScreen={setScreen} />
        //             </>
        //         )
        //     } else if (screen.page === "MENU") {
        //         return (
        //             <>
        //                 <MenuScreenLevel3 screen={screen} setScreen={setScreen} />
        //             </>
        //         )
        //     } else if (screen.page === "USER_LEVEL_MENU") {
        //         return (
        //             <UserLevelMenu screen={screen} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "EVENT_LOG_MENU") {
        //         return (
        //             <EventLogMenu screen={screen} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "FIRE") {
        //         return (
        //             <LogScreenLevel2 screen={{ level: screen.level, page: "FIRE" }} setScreen={setScreen} />
        //         );
        //     } else if (screen.page === "FAULT") {
        //         return (
        //             <LogScreenLevel2 screen={{ level: screen.level, page: "FAULT" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ALL EVENT") {
        //         return (
        //             <LogScreenLevel2 screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "VIEW_MENU") {
        //         return (
        //             <ViewMenu screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "DEVICE_ANALOG_VALUES") {
        //         return (
        //             <DeviceAnalogScreen screen={{ level: screen.level, page: "DEVICE_ANALOG_VALUES" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ENABLE_DISABLE_MENU") {
        //         return (
        //             <EnableDisableMenu screen={{ level: screen.level, page: "ENABLE_DISABLE_MENU" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "VIEW_MENU") {
        //         return (
        //             <ViewMenu screen={{ level: screen.level, page: "ALL" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ENABLE_DISABLE_MENU") {
        //         return (
        //             <EnableDisableMenu screen={{ level: screen.level, page: "ENABLE_DISABLE_MENU" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "DEVICE_LIST") {
        //         return (
        //             <DeviceListScreen screen={{ level: screen.level, page: "DEVICE_LIST" }} setScreen={setScreen} setSelectedDevice={setSelectedDevice} />
        //         )
        //     } else if (screen.page === "DEVICE_INFO") {
        //         return (
        //             <DeviceInfoScreen screen={{ level: screen.level, page: "DEVICE_LIST" }} setScreen={setScreen} device={selectedDevice} />
        //         )
        //     } else if (screen.page === "ZONE_INFO") {
        //         return (
        //             <ZoneInfoScreen screen={{ level: screen.level, page: "ZONE_INFO" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "PANEL_INFO") {
        //         return (
        //             <PanelInfoScreen screen={{ level: screen.level, page: "PANEL_INFO" }} setScreen={setScreen} panel={selectedPanel} />
        //         )
        //     } else if (screen.page === "ENABLE_DISABLE_DEVICE") {
        //         return (
        //             <DeviceEnableDisable screen={{ level: screen.level, page: "ENABLE_DISABLE_DEVICE" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ENABLE_DISABLE_ZONE") {
        //         return (
        //             <ZoneEnableDisable screen={{ level: screen.level, page: "ENABLE_DISABLE_ZONE" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ENABLE_DISABLE_ROUTING") {
        //         return (
        //             <RoutingEnableDisable screen={{ level: screen.level, page: "ENABLE_DISABLE_ROUTING" }} setScreen={setScreen} panel={selectedPanel} />
        //         )
        //     } else if (screen.page === "WALK_TEST") {
        //         return (
        //             <WalkTestScreen screen={{ level: screen.level, page: "WALK_TEST" }} setScreen={setScreen} />
        //         )
        //     } else if (screen.page === "ZONE_WALK_TEST") {
        //         return (
        //             <ZoneWalkTestScreen screen={{ level: screen.level, page: "ZONE_WALK_TEST" }} setScreen={setScreen} withOutput={withOutput} />
        //         )
        //     } else if (screen.page === "ZONE_WALK_TEST_WITHOUT_OUTPUT") {
        //         setWithOutput(false);
        //         return (
        //             <ZoneWalkTestScreen screen={{ level: screen.level, page: "ZONE_WALK_TEST" }} setScreen={setScreen} withOutput={withOutput} />
        //         )
        //     } else if (screen.page === "ZONE_WALK_TEST_WITH_OUTPUT") {
        //         setWithOutput(true);
        //         return (
        //             <ZoneWalkTestScreen screen={{ level: screen.level, page: "ZONE_WALK_TEST" }} setScreen={setScreen} withOutput={withOutput} />
        //         )
        //     }
    }
};

export default LcdScreen;