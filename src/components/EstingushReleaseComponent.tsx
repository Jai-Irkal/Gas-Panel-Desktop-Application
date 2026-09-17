"use client";

import React, { useState } from "react";

interface ExtinguishantReleaseProps {
  variant?: "pull-down" | "rectangular";
  onPress?: (pressed: boolean) => void;
}

const ExtinguishantRelease = ({
  variant = "pull-down",
  onPress,
}: ExtinguishantReleaseProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleHover = (pressed: boolean) => {
    setIsPressed(pressed);
    onPress?.(pressed);
  };

  const isRectangular = variant === "rectangular";

  return (
    <div className="flex w-full flex-col items-center">
      <button
        type="button"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        aria-pressed={isPressed}
        aria-label={isPressed ? "Close extinguishant release" : "Open extinguishant release"}
          className={`
          group
          relative
          w-full
          max-w-[540px]
          aspect-[1.6/1]
          border-0
          p-0
          cursor-pointer
          outline-none
          transition-all
          duration-150
            [clip-path:polygon(4%_0%,96%_0%,100%_5%,100%_37%,97%_42%,97%_58%,100%_63%,100%_95%,96%_100%,4%_100%,0%_95%,0%_63%,3%_58%,3%_42%,0%_37%,0%_5%)]
          ${
            isRectangular && !isPressed
              ? `
                rounded-[10px]
                bg-gradient-to-b
                from-[#ffe51c]
                via-[#ffd400]
                to-[#e9b900]
              `
              : `
                bg-[#FFD900]
                [clip-path:polygon(4%_0%,96%_0%,100%_5%,100%_37%,97%_42%,97%_58%,100%_63%,100%_95%,96%_100%,4%_100%,0%_95%,0%_63%,3%_58%,3%_42%,0%_37%,0%_5%)]
              `
          }

          shadow-[inset_0_2px_2px_rgba(255,255,255,0.65),inset_0_-4px_6px_rgba(150,100,0,0.28),0_12px_25px_rgba(0,0,0,0.35)]

          active:brightness-95
        `}
      >

        {/* ==========================================
            YELLOW ENCLOSURE HIGHLIGHT
        =========================================== */}
        <span
          className="
            pointer-events-none
            absolute
            inset-[4px]
            bg-linear-to-b
            from-white/15
            via-transparent
            to-black/5
          "
        />

        {/* ==========================================
            TOP PULL TAB
        =========================================== */}
        {!isRectangular && (
          <span
            className={`
              absolute
              left-1/2
              top-[8%]
              z-20
              h-[10%]
              w-[12%]
              -translate-x-1/2
              rounded-[5px]
              border-2
              border-[#b88c00]/50
              bg-linear-to-b
              from-[#FFE936]
              via-[#FFD500]
              to-[#E7B900]
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.25)]
              transition-transform
              duration-150
              ${isPressed ? "translate-y-[2px]" : ""}
            `}
          />
        )}

        {/* ==========================================
            INNER BUTTON
        =========================================== */}
        <span
          className={`
            absolute
            z-10
            flex
            flex-col
            items-center
            justify-center
            text-center
            transition-all
            duration-150

            ${
              isRectangular
                ? `
                  left-[12%]
                  right-[12%]
                  top-[10%]
                  bottom-[10%]

                  rounded-[12px]

                  bg-linear-to-br
                  from-[#161C20]
                  via-[#202A2F]
                  to-[#101619]

                  shadow-[inset_0_2px_3px_rgba(255,255,255,0.08),inset_0_-5px_8px_rgba(0,0,0,0.55),0_4px_8px_rgba(0,0,0,0.35)]

                  ${
                        isPressed
                          ? "left-[10%] right-[10%] top-[8%] bottom-[8%] rounded-[12px] border-2 border-[#101010] bg-gradient-to-br from-[#161c20] via-[#202a2f] to-[#101619] translate-y-0 shadow-[inset_0_2px_3px_rgba(255,255,255,0.08),inset_0_-5px_8px_rgba(0,0,0,0.55),0_4px_8px_rgba(0,0,0,0.35)]"
                      : ""
                  }
                `
                : `
                  left-[12%]
                  right-[12%]
                  top-[29%]
                  bottom-[12%]

                  rounded-[22px]
                  border-[4px]
                  border-[#101010]

                  bg-linear-to-b
                  from-[#FFDF12]
                  via-[#FFD500]
                  to-[#F5C900]

                  shadow-[inset_0_1px_3px_rgba(255,255,255,0.5),inset_0_-4px_5px_rgba(160,100,0,0.18),0_3px_5px_rgba(0,0,0,0.25)]

                  ${
                    isPressed
                      ? "left-[13%] right-[13%] top-[34%] bottom-[7%] border-[6px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.32),inset_0_-1px_2px_rgba(255,255,255,0.25)]"
                      : ""
                  }
                `
            }
          `}
        >
          {/* ========================================
              TITLE
          ========================================= */}
          <span
            className={`
              font-[Arial,Helvetica,sans-serif]
              text-center
              leading-[1.25]

              ${
                isRectangular
                  ? `
                    rounded-[5px]
                    border
                    ${isPressed ? "border-white text-[clamp(11px,1.8vw,5px)]" : "border-black text-[clamp(11px,1.8vw,5px)]"}
                    px-2
                    py-1
                    text-[clamp(11px,1.8vw,18px)]
                    font-semibold
                    ${isPressed ? "text-white " : "text-[#333333]"}
                  `
                  : `
                    text-[clamp(20px,4.1vw,38px)]
                    font-sm
                    text-[#080808]
                  `
              }
            `}
          >
            {isRectangular ? (
              isPressed ? "RELEASE ESTINGUISHMENT" : "ESTINGUISHMENT RELEASE"
            ) : (
              <>
                EXTINGUISHANT
                <br />
                RELEASE
              </>
            )}
          </span>
        </span>
      </button>
    </div>
  );
};

export default ExtinguishantRelease;