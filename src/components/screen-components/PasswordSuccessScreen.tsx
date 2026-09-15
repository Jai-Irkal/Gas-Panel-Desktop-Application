import React, { useEffect } from 'react'

interface PasswordSuccessScreenProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const PasswordSuccessScreen: React.FC<PasswordSuccessScreenProps> = ({ screen, setScreen }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            if (screen.level === 1) {
                setScreen({ level: 2, page: "HOME_LEVEL_2" });
            } else if (screen.level === 2) {
                setScreen({ level: 1, page: "HOME" });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [screen.level, setScreen]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h5 className="text-[#324200FF] font-bold text-lg mb-6 tracking-widest">
                PASSWORD SUCCESS
            </h5>
        </div>
    );
}

export default PasswordSuccessScreen