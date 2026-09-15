import type { ControllerUpdate } from "./controller";

declare global {
    interface Window {
        electronAPI?: {
            sendControllerUpdate: (update: ControllerUpdate) => void;
            onControllerUpdate: (listener: (update: ControllerUpdate) => void) => () => void;
        };
    }
}

export {};
