// import { set } from 'lodash';
import React, { useState, useRef, useEffect } from 'react';

interface EnterPasswordScreenProps {
  screen: { level: number; page: string };
  setScreen: (screen: { level: number; page: string }) => void;
}

const EnterPasswordScreen: React.FC<EnterPasswordScreenProps> = ({ screen, setScreen }) => {

  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const CORRECT_PASSWORD_lEVEL_1="111111"
  const CORRECT_PASSWORD_lEVEL_2 = "222222"
  const CORRECT_PASSWORD_lEVEL_3 = "333333"

  useEffect(() => {
    if (values.every(val => val !== "")) {
      const entered = values.join("");

      if (screen.level === 1 && entered === CORRECT_PASSWORD_lEVEL_2) {
        setValues(["", "", "", "", "", ""]);
        setScreen({ level: 2, page: "PASSWORD_SUCCESS" });

      } else if (screen.level === 2 && entered === CORRECT_PASSWORD_lEVEL_1) {
        setValues(["", "", "", "", "", ""]);
        setScreen({ level: 2, page: "PASSWORD_SUCCESS" });

      } else {
        setValues(["", "", "", "", "", ""]);
        setScreen({ level: screen.level, page: "PASSWORD_FAILURE" });
      }
    }
  }, [values, screen.level]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newValues = [...values];
    if (val) {
      newValues[index] = val[0];
      setValues(newValues);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newValues[index - 1] = "";
        setValues(newValues);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <label className="text-[#324200FF] font-bold text-lg mb-6 tracking-widest">
        ENTER PASSWORD:
      </label>
      <div className="flex flex-row gap-4">
        {values.map((val, idx) => (
          <input
            key={idx}
            ref={el => { inputsRef.current[idx] = el; }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={e => handleChange(idx, e)}
            onKeyDown={e => handleKeyDown(idx, e)}
            className="w-8 h-12 text-center text-2xl font-bold border-b-2 border-[#324200FF] bg-transparent outline-none"
            style={{ letterSpacing: "2px", color: '#324200FF' }}
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
};

export default EnterPasswordScreen;