import { motion } from "motion/react";
import type { Ending } from "../../../types/game";

export default function EndingCard({ ending }: { ending: Ending }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: "backOut" }}
        className="relative w-full max-w-sm overflow-hidden rounded-md border-2 border-[#e8b86b] bg-linear-to-b from-[#1a1108] to-[#0a0805] p-10 shadow-[0_0_40px_rgba(232,184,107,0.35)]"
      >
        {/* 코너 장식 */}
        {[
          "top-3 left-3",
          "top-3 right-3",
          "bottom-3 left-3",
          "right-3 bottom-3",
        ].map((pos, i) => (
          <motion.span
            key={pos}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
            className={`absolute ${pos} text-xs text-[#e8b86b]`}
          >
            ✦
          </motion.span>
        ))}

        <div className="flex aspect-square items-center justify-center">
          <motion.span
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{ delay: 0.3, duration: 0.8, ease: "backOut" }}
            className="text-9xl drop-shadow-[0_0_20px_rgba(232,184,107,0.5)]"
          >
            {ending.icon}
          </motion.span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-6 text-[10px] tracking-[0.4em] text-[#8a6a3d]"
      >
        YOUR PATH
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 14, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
        transition={{ delay: 1.0, duration: 0.9, ease: "easeOut" }}
        className="mt-2 text-5xl text-[#e8b86b] drop-shadow-[2px_2px_0_#000] md:text-6xl"
      >
        {ending.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-3 text-sm text-[#a88a5a] italic"
      >
        {ending.subtitle}
      </motion.p>
    </div>
  );
}
