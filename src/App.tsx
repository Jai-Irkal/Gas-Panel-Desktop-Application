"use client";

import React, { useEffect, useRef, useState } from 'react';
// import GasPanelUI from './components/GasPanelUI';
import PanelLayout from './Layouts/PanelLayout';
import { useZoneLedState } from './hooks/useZoneLedState';
import { useStatusLedState } from './hooks/useLedState';
import { zoneInitialSnapshot } from './types/zoneIntialSnapshot';
import { statusInitialSnapshot } from './types/statusInitialSnapshot';
import type { ControllerUpdate } from './types/controller';

const App: React.FC = () => {

    const [isOn, setIsOn] = useState(true);
    const [disableStatusState, setDisableStatusState] = useState<number>(0);
    const [testStatusState, setTestStatusState] = useState<number>(0);
    const [delayStatusState, setDelayStatusState] = useState<number>(0);
    const [sounderStatusState, setSounderStatusState] = useState<number>(0);
    const [routingStatusState, setRoutingStatusState] = useState<number>(0);
    const [generalFaultStatusState, setGeneralFaultStatusState] = useState<number>(0);
    const [systemFaultStatusState, setSystemFaultStatusState] = useState<number>(0);
    const [moreAlarmState, setMoreAlarmState] = useState<number>(0);
    const [fireState, setFireState] = useState<number>(0);
    const [evacuationDisabled, setEvacuationDisabled] = useState<number>(0);
    const [screen, setScreen] = useState({ level: 0, page: "INITIALIZING" });
    const [isBuzzerSilenced, setIsBuzzerSilenced] = useState(false);
    const [lampTestActive, setLampTestActive] = useState(false);
    const [systemMessage, setSystemMessage] = useState("SYSTEM IN NORMAL");
    const [releaseMode, setReleaseMode] = useState<"manual" | "auto">("auto");

    React.useEffect(() => {
        if (systemMessage === "SYSTEM IN NORMAL") return;

        const timeout = window.setTimeout(() => {
            setSystemMessage("SYSTEM IN NORMAL");
        }, 5000);

        return () => window.clearTimeout(timeout);
    }, [systemMessage]);

    const {
        zoneLedState,
        applyZoneChanges,
    } = useZoneLedState();

    const {
        statusLedState,
        applyStatusChanges,
        resetStatusLedState,
    } = useStatusLedState();

    const beepAudioRef = useRef<HTMLAudioElement | null>(null);
    const fireActive = fireState > 0 || Object.values(zoneLedState).some((value) => Number(value) === 2);

    useEffect(() => {
        const beepAudio = beepAudioRef.current ?? new Audio("/audio/beep.mp3");
        beepAudio.loop = true;
        beepAudioRef.current = beepAudio;

        if (fireActive && !isBuzzerSilenced) {
            beepAudio.play().catch((error) => console.error("Unable to play fire alarm:", error));
        } else {
            beepAudio.pause();
            beepAudio.currentTime = 0;
        }

        return () => {
            beepAudio.pause();
            beepAudio.currentTime = 0;
        };
    }, [fireActive, isBuzzerSilenced]);

    React.useEffect(() => {
        return window.electronAPI?.onControllerUpdate((update: ControllerUpdate) => {
            if (update.status) {
                applyStatusChanges(update.status);
                if (typeof update.status.system_on === "number") {
                    setIsOn(true);
                }
                if (typeof update.status.silenced_led === "number") {
                    setIsBuzzerSilenced(update.status.silenced_led === 1);
                }
            }
            if (update.zones) applyZoneChanges(update.zones);
        });
    }, [applyStatusChanges, applyZoneChanges]);



    const setPanelOnOff = () => {
        setIsOn(true);
    }

    const panelResetFunction = async () => {
        setLampTestActive(false);
        setIsOn(true);
        setIsBuzzerSilenced(false);
        setDisableStatusState(0);
        setTestStatusState(0);
        setDelayStatusState(0);
        setSounderStatusState(0);
        setRoutingStatusState(0);
        setGeneralFaultStatusState(0);
        setSystemFaultStatusState(0);
        setMoreAlarmState(0);
        setFireState(0);
        setEvacuationDisabled(0);
        resetStatusLedState();
        applyStatusChanges(statusInitialSnapshot);
        const normalStatus = { ...statusInitialSnapshot, system_on: 1 };
        const normalZones = Object.keys(zoneInitialSnapshot).reduce<Partial<typeof zoneInitialSnapshot>>((zones, key) => {
            zones[key as keyof typeof zoneInitialSnapshot] = 32;
            return zones;
        }, {});
        applyZoneChanges(normalZones);
        window.electronAPI?.sendControllerUpdate({ status: normalStatus, zones: normalZones });
    };

    const lampTestFunction = () => {
        setLampTestActive(true);
        const allStatusLedsOn = Object.keys(statusInitialSnapshot).reduce<Partial<typeof statusInitialSnapshot>>((statuses, key) => {
            statuses[key as keyof typeof statusInitialSnapshot] = 1;
            return statuses;
        }, {});
        applyStatusChanges(allStatusLedsOn);
        window.electronAPI?.sendControllerUpdate({ status: allStatusLedsOn });
        setSystemMessage("SYSTEM IN LAMP TEST");
    };

    const logMoreAlarmFunction = () => {
    }

    const resoundAlarm = async () => {
        // await sendSilenceBuzzerSounderCommand()
    }

    const evacuateFunction = async () => {
        if (!isOn) return;

        // await sendEvacuateCommand()
        if (fireState) {
            setMoreAlarmState(0);
            setEvacuationDisabled(0)
        } else if (!fireState) {
            setFireState(0);
            setEvacuationDisabled(0)
        }
    }

    const silenceBuzzerFunction = async () => {
        if (!isOn) return;
        setIsBuzzerSilenced(true);

        // await sendMuteBuzzerCommand()
        if (fireState) {
            setMoreAlarmState(0);
            setEvacuationDisabled(0)
        } else if (!fireState) {
            setFireState(0);
            setEvacuationDisabled(0)
        }
    }

    return (
        <div className="w-screen h-screen bg-gray-900 overflow-hidden">
            <PanelLayout
                isBuzzerSilenced={isBuzzerSilenced}
                systemMessage={systemMessage}
                setSystemMessage={setSystemMessage}
                releaseMode={releaseMode}
                setReleaseMode={setReleaseMode}
                zoneLedState={zoneLedState}
                statusLedState={statusLedState}
                applyZoneLedSocketChanges={applyZoneChanges}
                applyStatusLedSocketChanges={applyStatusChanges}
                panelReset={panelResetFunction}
                lampTestActive={lampTestActive}
                lampTest={lampTestFunction}
                isOn={isOn}
                setIsOn={setPanelOnOff}
                setDisableStatus={setDisableStatusState}
                setTestStatus={setTestStatusState}
                setDelayStatus={setDelayStatusState}
                setSounderStatus={setSounderStatusState}
                setRoutingStatus={setRoutingStatusState}
                setGeneralFaultStatus={setGeneralFaultStatusState}
                setSystemFaultStatus={setSystemFaultStatusState}
                setFireStatus={setFireState}
                logMoreAlarm={logMoreAlarmFunction}
                setMoreAlarmStatus={setMoreAlarmState}
                setEvacuationDisabled={setEvacuationDisabled}
                evacuateFunction={evacuateFunction}
                screen={screen}
                setScreen={setScreen}
                silenceBuzzerFunction={silenceBuzzerFunction}
                resoundAlarmFunction={resoundAlarm}
            />
        </div>
    );
};

export default App;