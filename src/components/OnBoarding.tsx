import { motion } from "motion/react";
import { SunSet } from "../assets";

type OnboardingProps = {
  onStart?: () => void;
  endingsCleared?: number;
  endingsTotal?: number;
};

export default function Onboarding({
  onStart,
  endingsCleared = 0,
  endingsTotal = 4,
}: OnboardingProps) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-[#1a1108]">
      <motion.img
        src={SunSet}
        alt="sunset"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-8 pb-6">
        <motion.p
          className="text-[10px] tracking-[0.4em] text-[#8a6a3d] italic md:text-xs md:tracking-[0.6em]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A·GAME·THEORY·STORY
        </motion.p>

        <motion.h1
          className="mt-6 text-4xl text-[#e8b86b] md:mt-8 md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 16, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
          transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
        >
          상인의 법칙
        </motion.h1>
        <motion.p
          className="mt-3 text-sm text-[#c89a5a] italic md:mt-4 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          The Merchant's Code
        </motion.p>

        <motion.div
          className="mt-8 text-center text-sm text-[#d9c9a8] md:mt-10 md:text-base lg:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <p>중세 교역 도시.</p>
          <p>협력과 배신 사이, 누가 살아남을 것인가?</p>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full max-w-xs flex-col gap-3 font-medium md:mt-12 md:max-w-md"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97, y: 2 }}
            className="border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm text-[#2a1d11] md:py-4 md:text-base"
          >
            ▶ 시 작 하 다
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute right-0 bottom-0 left-0 flex justify-between px-6 pb-4 text-xs text-[#6a4e2d] md:px-8 md:pb-6 md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.6 }}
        >
          <span>
            ENDINGS {endingsCleared}/{endingsTotal}
          </span>
          <span> GAME THEORY 10s</span>
        </motion.div>
      </div>
    </div>
  );
}
