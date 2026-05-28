import type { Stage } from "../../game/stages";

type NodeStatus = "locked" | "current" | "cleared";

type StageNodeProps = {
  stage: Stage;
  status: NodeStatus;
  onClick: () => void;
};

export default function StageNode({ stage, status, onClick }: StageNodeProps) {
  const disabled = status === "locked";

  const boxClass =
    status === "current"
      ? "bg-[#f5e6c8] border-[#3d2818]"
      : status === "cleared"
        ? "bg-[#d9c9a8] border-[#3d2818]"
        : "bg-[#2a1d11] border-[#1a1108] opacity-60";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center gap-2 disabled:cursor-not-allowed"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center border-4 ${boxClass} shadow-[3px_3px_0_#000]`}
      >
        <span className="text-3xl">{disabled ? "🔒" : stage.icon}</span>
      </div>
      <div className="bg-[#1a1108] px-2 py-0.5 text-[10px] tracking-wider text-[#e8b86b]">
        STAGE {stage.id} {status === "cleared" ? "완료" : stage.name}
      </div>
    </button>
  );
}
