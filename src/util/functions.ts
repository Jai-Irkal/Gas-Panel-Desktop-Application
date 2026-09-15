export const eventTitles: string[][] = [
  [
    "FIRE",
    "RELAY ACTIVE",
    "EVACUATE",
    "OUTPUTS ACTIVATED",
    "ALARM VERIFICATION",
    "ZONE FIRE",
    "ONBOARD INPUT FIRE"
  ],
  [
    "FAULT",                       // 2001
    "PSU MAINS FAULT",                     // 2002
    "PSU BATTERY MISSING",                 // 2003
    "PSU BATTERY CHARGER FAULT",           // 2004
    "PSU UART COMMUNICATION FAILURE",      // 2005
    "PSU SKA FOR FAULT",                   // 2006
    "PSU APS EARLY FAULT",                 // 2007
    "PSU APS PATH FAULT",                  // 2008
    "PSU LOCKOUT",                         // 2009
    "PSU RS232 TX LOAD ERROR",             // 2010
    "PSU APS FAULT",                       // 2011
    "PSU DDP HIGH",                        // 2012
    "PSU THERMISTOR FAULT",                // 2013
    "PSU MAINS FAIL OLD",                  // 2014
    "PSU OUTPUT VOLTAGE FAULT",            // 2015
    "PSU VERSION MISMATCH",                // 2016
    "PANEL TAMPER",                        // 2017
    "CORRUPTED LOG",                       // 2018
    "NO LOGS FOUND",                       // 2019
    "ONBOARD INPUT 1 OPEN CIRCUIT",        // 2020
    "ONBOARD INPUT 2 OPEN CIRCUIT",        // 2021
    "GSM NOT PRESENT",                     // 2022
    "ONBOARD INPUT 1 SHORT CIRCUIT",       // 2023
    "ONBOARD INPUT 2 SHORT CIRCUIT",       // 2024
    "ROUTING FAILED",                      // 2025
    "RTC BATTERY FAULT",                   // 2026
    "BLE BATTERY MISSING",                 // 2027

    "GENERAL FAULT CLEAR",                 // 2028
    "PSU MAINS FAULT CLEAR",               // 2029
    "PSU BATTERY MISSING CLEAR",           // 2030
    "PSU BATTERY CHARGER FAULT CLEAR",     // 2031
    "PSU UART COMMUNICATION FAILURE CLEAR",// 2032
    "PSU SKA FOR FAULT CLEAR",             // 2033
    "PSU APS EARLY FAULT CLEAR",           // 2034
    "PSU APS PATH FAULT CLEAR",            // 2035
    "PSU LOCKOUT CLEAR",                   // 2036
    "PSU RS232 TX LOAD ERROR CLEAR",       // 2037
    "PSU APS FAULT CLEAR",                 // 2038
    "PSU DDP HIGH CLEAR",                  // 2039
    "PSU THERMISTOR FAULT CLEAR",          // 2040
    "PSU MAINS FAIL OLD CLEAR",            // 2041
    "PSU OUTPUT VOLTAGE FAULT CLEAR",      // 2042

    "BLE MALFUNCTION FAULT",               // 2043
    "FIRMWARE UPGRADE FAILED",             // 2044
    "RF COMMUNICATION FAILURE",            // 2045
    "CONFIGURATION MISMATCH RF MCU",       // 2046
    "PANEL CONFIGURATION CORRUPTED",       // 2047
    "RF NET MCU INCOMPATIBLE",             // 2048
    "GSM COMMUNICATION FAULT",             // 2049

    "FAULT",                               // 2050

    "EXPANDER SUBSTITUTION ATTEMPT",       // 2051
    "EXPANDER TAMPER FAULT",               // 2052
    "EXPANDER MAINS FAULT",                // 2053
    "EXPANDER BATTERY FAULT",              // 2054
    "EXPANDER CHARGING FAULT",             // 2055
    "EXPANDER BATTERY OPEN CIRCUIT",       // 2056
    "EXPANDER LINK FAULT",                 // 2057
    "EXPANDER NOT COMMISSIONED",           // 2058

    "DEVICE LINK TIMEOUT",                 // 2059
    "DEVICE SUBSTITUTION ATTEMPT",         // 2060
    "RELAY FAULT",                         // 2061
    "TAMPER FAULT",                        // 2062
    "DEVICE BATTERY LOW",                  // 2063
    "SECONDARY BATTERY LOW",               // 2064

    "INPUT OPEN CIRCUIT",                  // 2065
    "INPUT SHORT CIRCUIT",                 // 2066
    "INPUT MODULE NOT COMMISSIONED",       // 2067

    "OUTPUT OPEN CIRCUIT",                 // 2068
    "OUTPUT SHORT CIRCUIT",                // 2069
    "RELAY OPEN CIRCUIT",                  // 2070
    "RELAY SHORT CIRCUIT",                 // 2071
    "OUTPUT MODULE NOT COMMISSIONED",      // 2072

    "MAGNET TEST",                         // 2073
    "FATAL FAULT",                         // 2074
    "CONTAMINATION",                       // 2075
    "DETECTOR NOT COMMISSIONED",           // 2076

    "CALLPOINT NOT COMMISSIONED",          // 2077

    "SOUNDER NOT COMMISSIONED",            // 2078

    "ROUTING FAULT",                       // 2079
    "ONBOARD INPUT FAULT",                 // 2080
    "SOUNDER FAULT",                       // 2081
    "DEVICE PROPERTY CORRUPTED",           // 2082
    "ZONE FAULT",                          // 2083
    "DIAGNOSTICS CORRUPTED"                // 2084
  ],
  [
    //"ROUTING ACTIVATED",                  // 3001
    "GENERAL EVENT",
    "PANEL DATE CHANGED",                 // 3002
    "DEVICE DISABLED",                    // 3003
    "DEVICE ENABLED",                     // 3004
    "ROUTING ENABLED",                    // 3005
    "ROUTING DISABLED",                   // 3006
    "WALK TEST MODE",                     // 3007
    "ZONE TEST",                          // 3008
    "DEVICE TEST",                        // 3009
    "PANEL RESET",                        // 3010
    "PANEL SILENCE",                      // 3011
    "PANEL RE-SOUND",                     // 3012
    "EARTH FAULT",                    // 3013
    "USER LEVEL CHANGE",                  // 3014
    "ZONE DISABLE",                       // 3015
    "ZONE ENABLE",                        // 3016
    "PANEL TIME CHANGED",                 // 3017
    "SERVICE DATE CHANGED",               // 3018
    "LCD BACKLIGHT ENABLED",              // 3019
    "LCD BACKLIGHT DISABLED",             // 3020
    "TYPE CHANGE",                        // 3021
    "LOCATE DEVICE",                      // 3022
    "BLE ENABLE",                         // 3023
    "BLE DISABLE",                        // 3024
    "GSM ENABLE",                         // 3025
    "GSM DISABLE",                        // 3026
    "PANEL CONFIGURATION UPLOADED",       // 3027
    "FIRMWARE UPGRADED RF MCU",           // 3028
    "FIRMWARE UPGRADED RF NET MCU",       // 3029
    "PANEL FIRMWARE UPGRADED",            // 3030
    "HALO SETTINGS ENABLED",              // 3031
    "HALO SETTINGS DISABLED",             // 3032
    "EXPANDER PROPERTY CHANGED",          // 3033
    "ENTERED USER LEVEL 2",               // 3034
    "ENTERED USER LEVEL 3",               // 3035
    "MOBILE APP CONNECTED",               // 3036
    "MOBILE APP DISCONNECTED",            // 3037
    "DEVICE LOW SIGNAL",                  // 3038
    "DEVICE ADDED",                       // 3039
    "DEVICE REMOVED",                     // 3040
    "DEVICE REPLACED",                    // 3041
    "WALK TEST ENTERED",                  // 3042
    "WALK TEST COMPLETED",                // 3043
    "DEVICE ADDRESS CHANGED",             // 3044
    "DEVICE PROPERTY CHANGED",            // 3045
    "RF MCU FIRMWARE UPDATED",            // 3046
    "NET MCU FIRMWARE UPDATED",           // 3047
    "MAIN MCU FIRMWARE UPDATED",          // 3048
    "DAYLIGHT SAVING STARTED",            // 3049
    "DAYLIGHT SAVING ENDED",              // 3050
    "FUNCTION KEY LAMP TEST",             // 3051
    "PRE-ALARM",                          // 3052
    "CONTROL SIGNAL",                     // 3053
    "SUPERVISORY SIGNAL",                 // 3054
    "HUSH BUTTON PRESSED",                // 3055
    "KEY SWITCH ENABLED",                 // 3056
    "OUTPUT DELAY CANCELLED",             // 3057  <-- MISSING
    "ACK KEY PRESSED",                    // 3058
    "FUNCTION KEY DISABLE ALL ZONES",     // 3059
    "FUNCTION KEY ENABLE ALL ZONES",      // 3060  <-- MISSING
    "ONBOARD INPUT CONTROL",              // 3061
    "ONBOARD INPUT SUPERVISORY",          // 3062
    "FUNCTION KEY CONTROL SIGNAL",        // 3063
    "LAMP TEST RUN",                      // 3064
    "PANEL BOOTUP",                       // 3065
    "SERVICE DUE",                        // 3066
    "PASSWORD RECOVERED",                 // 3067

    "DEVICE LINK FAULT CLEARED",          // 3068
    "DEVICE SUBSTITUTION CLEARED",        // 3069
    "DEVICE TAMPER CLEARED",              // 3070
    "DEVICE BATTERY FAULT CLEARED",       // 3071

    "EXPANDER SUBSTITUTION CLEARED",      // 3072
    "EXPANDER TAMPER CLEARED",            // 3073
    "EXPANDER MAINS FAULT CLEARED",       // 3074
    "EXPANDER BATTERY FAULT CLEARED",     // 3075
    "EXPANDER CHARGING FAULT CLEARED",    // 3076
    "EXPANDER BATTERY OC CLEARED",        // 3077
    "EXPANDER LINK FAULT CLEARED",        // 3078
    "EXPANDER NOT COMMISSIONED CLEARED",  // 3079

    "DETECTOR MAGNET TEST CLEARED",       // 3080
    "DETECTOR FATAL FAULT CLEARED",       // 3081
    "DETECTOR CONTAMINATION CLEARED",     // 3082
    "DETECTOR COMMISSIONED",              // 3083
    "CALLPOINT COMMISSIONED",             // 3084

    "INPUT OPEN CIRCUIT CLEARED",         // 3085
    "INPUT SHORT CIRCUIT CLEARED",        // 3086
    "INPUT MODULE COMMISSIONED",          // 3087

    "SOUNDER COMMISSIONED",               // 3088

    "OUTPUT OPEN CIRCUIT CLEARED",        // 3089
    "OUTPUT SHORT CIRCUIT CLEARED",       // 3090
    "OUTPUT RELAY OPEN CLEARED",          // 3091
    "OUTPUT RELAY SHORT CLEARED",         // 3092
    "OUTPUT MODULE COMMISSIONED",         // 3093

    "PSU FAULT CLEARED",                  // 3094
    "MAINS FAULT CLEARED",                // 3095
    "BATTERY MISSING CLEARED",            // 3096
    "BATTERY CHARGER FAULT CLEARED",      // 3097
    "BATTERY HIGH IMPEDANCE CLEARED",     // 3098
    "PSU COMMUNICATION FAILURE CLEARED",  // 3099
    "GENERAL FAULT CLEARED",              // 3100
    "PSU SKA FAULT CLEARED",              // 3101
    "PSU APS EARLY FAULT CLEARED",        // 3102
    "PSU APS PATH FAULT CLEARED",         // 3103
    "PSU LOCKOUT CLEARED",                // 3104
    "PSU RS232 TX LOAD ERROR CLEARED",    // 3105
    "PSU APS FAULT CLEARED",              // 3106
    "PSU DDP HIGH CLEARED",               // 3107
    "PSU THERMISTOR FAULT CLEARED",       // 3108
    "PSU MAINS FAIL OLD CLEARED",         // 3109
    "PSU OUTPUT VOLTAGE FAULT CLEARED",   // 3110
    "PANEL TAMPER CLEARED",               // 3111

    "MANUAL EVACUATION",                  // 3112
    "DUTCH RESET PRESSED",                // 3113
    "DUTCH ENABLE PRESSED",               // 3114
    "TURN OFF AV SOUNDERS",               // 3115
    "AV FUNCTIONALITY DISABLED",          // 3116
    "AV FUNCTIONALITY ENABLED",           // 3117

    "GSM PANEL RESET",                    // 3118
    "LOG ERASED",                         // 3119
    "CONFIGURATION ERASED",               // 3120
    "DIAGNOSTICS ERASED",                 // 3121
    "DELAY EXTENDED",                     // 3122
    "OUTPUT DELAY STARTED"                // 3123
  ]
];

export enum DEVICE_TYPE_SUBTYPE_TEXT {
    BASE_SOUNDER = "BASE SND",
    SOUNDER_VAD_BASE_RED_BEACON = "SND RED",
    SOUNDER_VAD_BASE_WHITE_BEACON = "SND WHITE",
    CALLPOINT = "CALL POINT",
    INPUT_MODULE = "INPUT MODULE",
    OUTPUT_MODULE = "OUTPUT MODULE",
    EXPANDER_MODULE = "EXPANDER",
    OPTICAL_DETECTOR = "OPTICAL",
    MULTISENSOR = "MULTI-SENSOR",
    THERMAL_DETECTOR_HIGH_TEMP = "HEAT-BS",
    THERMAL_DETECTOR_ROR = "HEAT-A1R",
    WALL_SOUNDER = "WALL SND",
    WALL_SOUDER_WITH_BEACON = "WALL SND/VAD",
    REMOTE_INDICATOR = "REMOTE LED",
    HUSH_BUTTON = "HUSH BUTTON",
    KEY_SWITCH = "KEY SWITCH",
    DOOR_HOLDER = "DOOR HOLDER",
    AURA_CONTROL_PANEL = "PANEL",
}

export function getDeviceTypeSubtypeText(type: number, subtype: number): string {
    if (type === 6 && subtype === 5) {
        return DEVICE_TYPE_SUBTYPE_TEXT.BASE_SOUNDER;
    }
    else if (type === 6 && subtype === 6) {
        return DEVICE_TYPE_SUBTYPE_TEXT.SOUNDER_VAD_BASE_RED_BEACON;
    }
    else if (type === 6 && subtype === 7) {
        return DEVICE_TYPE_SUBTYPE_TEXT.SOUNDER_VAD_BASE_WHITE_BEACON;
    }
    else if (type === 4 && subtype === 1) {
        return DEVICE_TYPE_SUBTYPE_TEXT.CALLPOINT;
    }
    else if (type === 5 && subtype === 1) {
        return DEVICE_TYPE_SUBTYPE_TEXT.INPUT_MODULE;
    }
    else if (type === 8 && subtype === 1) {
        return DEVICE_TYPE_SUBTYPE_TEXT.OUTPUT_MODULE;
    }
    else if (type === 3 && subtype === 1) {
        return DEVICE_TYPE_SUBTYPE_TEXT.OPTICAL_DETECTOR;
    }
    else if (type === 1 && subtype === 2) {
        return DEVICE_TYPE_SUBTYPE_TEXT.EXPANDER_MODULE;
    }
    else if (type === 3 && subtype === 3) {
        return DEVICE_TYPE_SUBTYPE_TEXT.MULTISENSOR;
    }
    else if (type === 3 && subtype === 7) {
        return DEVICE_TYPE_SUBTYPE_TEXT.THERMAL_DETECTOR_HIGH_TEMP;
    }
    else if (type === 3 && subtype === 5) {
        return DEVICE_TYPE_SUBTYPE_TEXT.THERMAL_DETECTOR_ROR;
    }
    else if (type === 6 && subtype === 2) {
        return DEVICE_TYPE_SUBTYPE_TEXT.WALL_SOUNDER;
    }
    else if (type === 6 && subtype === 3) {
        return DEVICE_TYPE_SUBTYPE_TEXT.WALL_SOUDER_WITH_BEACON;
    }
    else if (type === 8 && subtype === 3) {
        return DEVICE_TYPE_SUBTYPE_TEXT.REMOTE_INDICATOR;
    }
    else if (type === 5 && subtype === 254) {
        return DEVICE_TYPE_SUBTYPE_TEXT.HUSH_BUTTON;
    }
    else if (type === 5 && subtype === 253) {
        return DEVICE_TYPE_SUBTYPE_TEXT.KEY_SWITCH;
    }
    else if (type === 8 && subtype === 4) {
        return DEVICE_TYPE_SUBTYPE_TEXT.DOOR_HOLDER;
    }
    else if (type === 16 && subtype === 2) {
        return DEVICE_TYPE_SUBTYPE_TEXT.AURA_CONTROL_PANEL;
    }
    else{
        return "PANEL CONTROLLER";
    }
}

export function convertEventIdToText(
  eventId: number,
  defaultText: string
): string {
  let titleText = defaultText;

  try {
    if (eventId !== 2018 && eventId !== 0) {
      console.log("Event ID:", eventId);

      const eventType = Math.floor(eventId / 1000);
      const eventIndex = eventId % (1000 * eventType) - 1;

      const eventTitle =
        eventTitles[eventType - 1]?.[eventIndex];

      if (eventTitle) {
        titleText = eventTitle;
      }
    }
  } catch (e) {
    console.error("Error converting event ID to text:", e);
    return titleText;
  }

  return titleText;
}


export function buildInitialLedState(raw: Record<string, number>) {
  const zones: Record<number, number> = {};

  for (let i = 1; i <= 32; i++) {
    zones[i] = raw[`zone${i}_led_sts`] ?? 0;
  }

  return {
    zones,
    system: {
      disabled_led: raw.disabled_led ?? 0,
      test_led: raw.test_led ?? 0,
      delay_led: raw.delay_led ?? 0,
      fire: raw.fire ?? 0,
      general_fault: raw.general_fault ?? 0,
      system_fault: raw.system_fault ?? 0,
      sounder_dis_fau: raw.sounder_dis_fau ?? 0,
      routing_fau_dis: raw.routing_fau_dis ?? 0,
      alarm_routing: raw.alarm_routing ?? 0,
    },
  };
}