import { useState, useCallback } from "react";
import { statusInitialSnapshot } from "../types/statusInitialSnapshot";

export function useStatusLedState() {

    const [statusLedState, setStatusLedState] =
        useState<typeof statusInitialSnapshot>(statusInitialSnapshot);

    function applyStatusChanges(payload: Partial<typeof statusInitialSnapshot>) {
        setStatusLedState(prev => ({
            ...prev,
            ...payload,
        }));
    }

    const resetStatusLedState = useCallback(() => {
        setStatusLedState(statusInitialSnapshot);
    }, []);

    return {
        statusLedState,
        applyStatusChanges,
        resetStatusLedState
    };
}
