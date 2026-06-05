import { motion } from "motion/react";
import { Player } from "../../assets";
import type { Stage } from "../../constants/stages";

export default function ContinueCard({
  stage,
  currentStage,
  totalStages,
  onContinue,
  onRestart,
}: {
  stage: Stage;
  currentStage: number;
  totalStages: number;
  onContinue: () => void;
  onRestart: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-72 overflow-hidden rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10"
    >
      <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
        이어 하기 · STAGE {currentStage} / {totalStages}
      </p>
      <h2 className="mt-3 text-2xl text-[#e8b86b] md:text-3xl">{stage.name}</h2>
      <p className="mt-3 max-w-[60%] text-xs leading-relaxed text-[#a88a5a] md:max-w-xs md:text-sm">
        {stage.areaLabel}의 거래. 라운드 1 / {stage.rounds}.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8 md:gap-3">
        <button
          onClick={onContinue}
          className="border-2 border-[#1a1108] bg-[#6a8a4a] px-4 py-2 text-xs tracking-widest text-[#1a1108] transition-transform hover:bg-[#7a9a5a] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 md:px-6 md:py-3 md:text-sm"
        >
          여 정 잇 기
        </button>
        <button
          onClick={onRestart}
          className="border border-[#5a4a2a] px-4 py-2 text-xs text-[#c89a5a] transition-colors hover:border-[#e8b86b] hover:text-[#e8b86b] md:px-5 md:py-3 md:text-sm"
        >
          초기화
        </button>
      </div>

      <motion.img
        src={Player}
        alt="player"
        initial={{ opacity: 0, x: 30, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        className="absolute right-4 bottom-4 size-28 rounded-md bg-[#1a1208]/40 object-contain p-2 md:right-6 md:bottom-6 md:size-40 lg:right-8 lg:bottom-8 lg:size-50"
      />
    </motion.section>
  );
}
