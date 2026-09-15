import { useState, useCallback } from "react";
import { zoneInitialSnapshot } from "../types/zoneIntialSnapshot";

export function useZoneLedState() {

    const [zoneLedState, setZoneLedState] =
        useState<typeof zoneInitialSnapshot>(zoneInitialSnapshot);

    function applyZoneChanges(payload: Partial<typeof zoneInitialSnapshot>) {
        setZoneLedState(prev => ({
            ...prev,
            ...payload,
        }));
    }

    const resetZoneLedState = useCallback(() => {
        setZoneLedState(zoneInitialSnapshot);
    }, []);

    return {
        zoneLedState,
        applyZoneChanges,
        resetZoneLedState
    };
}
