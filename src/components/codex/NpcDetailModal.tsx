import Modal from "../common/Modal";
import {
  NPCS,
  NPC_ICON,
  NPC_TIER,
  NPC_TYPES,
  STRATEGY_LABEL,
} from "../../constants/npcs";
import type { NpcId } from "../../types/game";

export default function NpcDetailModal({
  npcId,
  unlocked,
  onClose,
}: {
  npcId: NpcId | null;
  unlocked: boolean;
  onClose: () => void;
}) {
  const npc = npcId ? NPCS[npcId] : null;

  return (
    <Modal open={npcId !== null} onClose={onClose}>
      {npcId && npc && (
        <>
          <div className="flex items-center gap-4">
            {unlocked ? (
              <img
                src={NPC_ICON[npcId]}
                alt={npc.name}
                className="h-24 w-24 object-contain md:h-28 md:w-28"
              />
            ) : (
              <span className="flex h-24 w-24 items-center justify-center text-5xl md:h-28 md:w-28 md:text-6xl">
                🔒
              </span>
            )}
            <div>
              <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">
                CHARACTER · TIER {NPC_TIER[npcId]}
              </p>
              <h2 className="mt-1 text-2xl text-[#e8b86b] md:text-3xl">
                {unlocked ? npc.name : "???"}
              </h2>
              <p className="mt-1 text-xs text-[#a88a5a] italic md:text-sm">
                {unlocked ? npc.title : "아직 만나지 않은 자."}
              </p>
            </div>
          </div>

          <hr className="my-5 border-[#3a2a1c]" />

          {unlocked ? (
            <>
              <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d]">
                유형
              </p>
              <p className="mt-1 text-sm text-[#d9c9a8] md:text-base">
                {NPC_TYPES[npc.type].icon} {NPC_TYPES[npc.type].name} —{" "}
                {NPC_TYPES[npc.type].description}
              </p>

              <p className="mt-4 text-[10px] tracking-[0.3em] text-[#6a4e2d]">
                전략
              </p>
              <p className="mt-1 text-sm text-[#e8b86b] md:text-base">
                {STRATEGY_LABEL[npc.strategy].name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#a88a5a] md:text-sm">
                {STRATEGY_LABEL[npc.strategy].desc}
              </p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-[#8a6a3d] italic md:text-base">
              아직 마주치지 않은 자다. 여정을 이어가다 보면 어느 길목에서
              만나게 될 것이다.
            </p>
          )}
        </>
      )}
    </Modal>
  );
}
