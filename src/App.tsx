"use client";

import React, { useState } from 'react';
// import GasPanelUI from './components/GasPanelUI';
import PanelLayout from './Layouts/PanelLayout';
import { useZoneLedState } from './hooks/useZoneLedState';
import { useStatusLedState } from './hooks/useLedState';
import { zoneInitialSnapshot } from './types/zoneIntialSnapshot';
import type { ControllerUpdate } from './types/controller';

const App: React.FC = () => {

    const [isOn, setIsOn] = useState(false);
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
    } = useStatusLedState();

    React.useEffect(() => {
        return window.electronAPI?.onControllerUpdate((update: ControllerUpdate) => {
            if (update.status) {
                applyStatusChanges(update.status);
                if (typeof update.status.system_on === "number") {
                    setIsOn(update.status.system_on === 1);
                }
                if (typeof update.status.silenced_led === "number") {
                    setIsBuzzerSilenced(update.status.silenced_led === 1);
                }
            }
            if (update.zones) applyZoneChanges(update.zones);
        });
    }, [applyStatusChanges, applyZoneChanges]);



    const setPanelOnOff = () => {
        setIsOn(prev => {
            const next = !prev;

            if (!next) {

                // resetLedState();
                setIsBuzzerSilenced(false);
            }
            // resetLedState();
            return next;
        });
    }

    // Function to reset all statuses
    const panelResetFunction = async () => {

        // await sendPanelResetCommand()
        // resetZoneLedState();
        // resetStatusLedState();
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
        const fireZoneReset: Partial<typeof zoneInitialSnapshot> = {};
        Object.entries(zoneLedState).forEach(([key, value]) => {
            if (String(value) === "2") {
                fireZoneReset[key as keyof typeof zoneInitialSnapshot] = 32;
            }
        });
        applyZoneChanges(fireZoneReset);
        window.electronAPI?.sendControllerUpdate({ zones: fireZoneReset });
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