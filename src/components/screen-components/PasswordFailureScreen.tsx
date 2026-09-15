import React, { useEffect } from 'react'

interface PasswordFailureScreenProps {
    screen: { level: number; page: string };
    setScreen: (screen: { level: number; page: string }) => void;
}

const PasswordFailureScreen: React.FC<PasswordFailureScreenProps> = ({screen, setScreen}) => {

  useEffect(() => {
          const timer = setTimeout(() => {
              if (screen.level === 1) {
                  setScreen({ level: 1, page: "HOME" });
              } else if (screen.level === 2) {
                  setScreen({ level: 2, page: "HOME_LEVEL_2" });
              }
          }, 2000);
  
          return () => clearTimeout(timer);
      }, [screen.level, setScreen]);
      
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h5 className="text-[#324200FF] font-bold text-lg mb-6">
        PASSWORD FAILURE
      </h5>
    </div>
  );
}

export default PasswordFailureScreen