import { useGameStore } from "../../store/useGameStore";
import { STAGES } from "../../game/stages";
import StageNode from "./StageNode";
import { Map } from "../../assets";

export default function StageMap() {
  const currentStage = useGameStore((s) => s.currentStage);
  const goToStage = useGameStore((s) => s.goToStage);

  return (
    <div className="relative flex w-full flex-1 flex-col overflow-y-auto">
      <img
        src={Map}
        alt="map"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 grid h-full w-full grid-rows-4">
        {STAGES.map((stage) => {
          const status =
            stage.id < currentStage
              ? "cleared"
              : stage.id === currentStage
                ? "current"
                : "locked";

          return (
            <section
              key={stage.id}
              className="relative flex w-full items-center justify-center"
            >
              <span className="absolute left-3 top-3 bg-[#1a1108]/80 px-2 py-0.5 text-[10px] tracking-widest text-[#e8b86b]">
                {stage.areaLabel}
              </span>

              <StageNode
                stage={stage}
                status={status}
                onClick={() => goToStage(stage.id)}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
