export type Device = {
    id: number;
    device_index: string;
    device_type: string;
    device_text: string;
    device_address: string;
    zone_number: string;
    commission_status: boolean;
    device_status: string;
    battery_A_status: string;
    battery_B_status: string;
    device_tamper_status: string;
    link_status: string;
    fault_led_status: string;
    communication_led_status: string;
    firmware_version: string;
    production_lot: string;
    analog_value: string;
    unique_id: string;
}

export type LOGS = {
  u16_event_id: number;
  log_num: number;
  au8_device_text: string;
  u8_zone_number: number;
  u8_node_address: number;
  u8_device_address: number;
  u8_device_type: number;
  u8_device_sub_type: number;
  u8_date: number;
  u8_month: number;
  u8_year: number;
  u8_hours: number;
  u8_minutes: number;
  u8_seconds: number;
  u8_logbitoffset: number;
  source: string;
  u8_serialNumber: number;
  u16_crc: number;
}