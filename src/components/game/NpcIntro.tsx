import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { STAGES } from "../../game/stages";
import { NPCS, NPC_ICON } from "../../game/npcs";
import Header from "../common/Header";

export default function NpcIntro() {
  const currentStage = useGameStore((s) => s.currentStage);
  const currentNpcId = useGameStore((s) => s.currentNpcId);
  const setScreen = useGameStore((s) => s.setScreen);

  const [lineIdx, setLineIdx] = useState(0);

  const stage = STAGES.find((s) => s.id === currentStage);
  if (!stage || !currentNpcId) return null;

  const npc = NPCS[currentNpcId];
  const icon = NPC_ICON[currentNpcId];
  const isLastLine = lineIdx === npc.intro.length - 1;

  const handleNext = () => {
    if (isLastLine) {
      setScreen("battle");
    } else {
      setLineIdx((i) => i + 1);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#1A1208]">
      <Header />

      <div className="relative flex flex-1 flex-col items-center">
        <div className="flex h-60 w-full items-center justify-center bg-linear-to-b from-[#8a9aa8] to-[#3d2818]">
          <img src={icon} alt={npc.name} className="h-40 w-40 object-contain" />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <span className="text-xs tracking-[0.4em] text-[#8a6a3d]">
            STAGE {stage.id}
          </span>
          <h2 className="mt-2 text-3xl tracking-widest text-[#e8b86b] drop-shadow-[2px_2px_0_#000]">
            {stage.name}
          </h2>
        </div>

        <div className="mt-20 w-full px-5 pb-5">
          

          <div className="relative flex min-h-32 w-full flex-col gap-2 overflow-hidden rounded border-2 border-[#8a6a3d] bg-[#f5e6c8] p-4">
            <div className="flex gap-1">
              {npc.intro.map((_, i) => (
                <span
                  key={i}
                  className={`h-4 w-4  transition-colors duration-300 ${
                    i <= lineIdx ? "bg-black" : "bg-white"
                  }`}
                />
              ))}
            </div>
            <p
              key={lineIdx}
              className="animate-slide-in-right text-sm leading-relaxed text-[#2a1d11]"
            >
              "{npc.intro[lineIdx]}"
            </p>
          </div>

          <button
            onClick={handleNext}
            className="mt-3 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
          >
            {isLastLine ? "거 래 시 작 ▶" : "계 속 ▶"}
          </button>
        </div>
      </div>
    </div>
  );
}
