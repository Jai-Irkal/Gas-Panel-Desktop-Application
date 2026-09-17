import type { ForgeConfig } from "@electron-forge/shared-types";
import path from 'path';

import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerWix } from "@electron-forge/maker-wix";

import { VitePlugin } from "@electron-forge/plugin-vite";
import { FusesPlugin } from "@electron-forge/plugin-fuses";

import { FuseV1Options, FuseVersion } from "@electron/fuses";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,

    // Application name
    name: "GasPanel",

    // Windows executable name
    executableName: "GasPanel",
  },

  rebuildConfig: {},

  makers: [
    // Windows Squirrel installer
    new MakerSquirrel({}),

    // Windows MSI installer
    new MakerWix({
      name: "GasPanel",
      manufacturer: "EMCUS Technology Solutions Pvt Ltd",
      icon: path.resolve(__dirname, "public/icon/favicon.ico"),
    }),

    // macOS ZIP
    new MakerZIP({}, ["darwin"]),

    // Linux RPM
    new MakerRpm({}),

    // Linux DEB
    new MakerDeb({}),
  ],

  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "src/main.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],

      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),

    new FusesPlugin({
      version: FuseVersion.V1,

      [FuseV1Options.RunAsNode]: false,

      [FuseV1Options.EnableCookieEncryption]: true,

      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,

      [FuseV1Options.EnableNodeCliInspectArguments]: false,

      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,

      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;