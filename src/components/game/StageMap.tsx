import { motion } from "motion/react";
import { useGameStore } from "../../store/useGameStore";
import { STAGES } from "../../constants/stages";
import StageNode from "./StageNode";
import { Map } from "../../assets";

export default function StageMap() {
  const unlockedStage = useGameStore((s) => s.unlockedStage);
  const selectStage = useGameStore((s) => s.selectStage);

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <motion.img
        src={Map}
        alt="map"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div className="relative z-10 grid h-full w-full grid-cols-4">
        {[...STAGES]
          .sort((a, b) => a.id - b.id)
          .map((stage, sIdx) => {
            const status =
              stage.id < unlockedStage
                ? "cleared"
                : stage.id === unlockedStage
                  ? "current"
                  : "locked";

            return (
              <section
                key={stage.id}
                className="relative flex h-full flex-col items-center justify-center gap-6 md:gap-20"
              >
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + sIdx * 0.08, duration: 0.4 }}
                  className="absolute top-3 left-3 bg-[#1a1108]/80 px-2 py-0.5 text-[10px] tracking-widest text-[#e8b86b]"
                >
                  {stage.areaLabel}
                </motion.span>

                {Array.from({ length: stage.nodeCount }).map((_, idx) => (
                  <StageNode
                    key={idx}
                    stage={stage}
                    status={status}
                    index={sIdx * 2 + idx}
                    onClick={() => selectStage(stage.id)}
                  />
                ))}
              </section>
            );
          })}
      </div>
    </div>
  );
}
