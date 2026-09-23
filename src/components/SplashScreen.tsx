import React from "react";
import { getAssetUrl } from "../util/assetPath";

const nfcLogo = getAssetUrl("icon/nfc_logo.png");

const SplashScreen: React.FC = () => {
    return (
        <main className="flex h-screen w-screen items-center justify-center overflow-hidden bg-white">
            <img
                src={nfcLogo}
                alt="EMCUS Technology Solutions"
                className="h-[clamp(220px,38vw,360px)] w-[clamp(220px,38vw,360px)] object-contain"
            />
        </main>
    );
};

export default SplashScreen;