export type ControllerStatusKey =
    | "system_on"
    | "silenced_led"
    | "mains_fault_led"
    | "battery_fault_led"
    | "system_fault"
    | "NAC_fault"
    | "manual_release"
    | "pre_release"
    | "released_led"
    | "abort_led"
    | "pressure_fault_led"
    | "RAC_fault_led"
    | "earth_fault_led"
    | "maintenance_led";

export type ControllerStatusUpdate = Partial<Record<ControllerStatusKey, number>>;
export type ControllerZoneUpdate = Partial<Record<`zone${number}_led_sts`, number>>;

export type ControllerUpdate = {
    status?: ControllerStatusUpdate;
    zones?: ControllerZoneUpdate;
};
