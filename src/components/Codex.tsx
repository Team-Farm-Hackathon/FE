import { useState } from "react";
import Header from "./common/Header";
import { useGameStore } from "../store/useGameStore";
import { NPC_ORDER } from "../constants/npcs";
import { ENDING_ORDER } from "../constants/endings";
import type { EndingId, NpcId } from "../types/game";
import CodexHeader from "./codex/CodexHeader";
import EndingGrid from "./codex/EndingGrid";
import NpcGrid from "./codex/NpcGrid";
import EndingDetailModal from "./codex/EndingDetailModal";
import NpcDetailModal from "./codex/NpcDetailModal";

export default function Codex() {
  const metNpcs = useGameStore((s) => s.metNpcs);
  const unlockedEndings = useGameStore((s) => s.unlockedEndings);

  const [selectedEnding, setSelectedEnding] = useState<EndingId | null>(null);
  const [selectedNpc, setSelectedNpc] = useState<NpcId | null>(null);

  const npcUnlockedCount = NPC_ORDER.filter((id) =>
    metNpcs.includes(id),
  ).length;

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
        <CodexHeader
          endingsUnlocked={unlockedEndings.length}
          endingsTotal={ENDING_ORDER.length}
          npcsUnlocked={npcUnlockedCount}
          npcsTotal={NPC_ORDER.length}
        />

        <EndingGrid
          unlockedEndings={unlockedEndings}
          onSelect={setSelectedEnding}
        />

        <NpcGrid metNpcs={metNpcs} onSelect={setSelectedNpc} />
      </div>

      <EndingDetailModal
        endingId={selectedEnding}
        unlocked={
          selectedEnding ? unlockedEndings.includes(selectedEnding) : false
        }
        onClose={() => setSelectedEnding(null)}
      />

      <NpcDetailModal
        npcId={selectedNpc}
        unlocked={selectedNpc ? metNpcs.includes(selectedNpc) : false}
        onClose={() => setSelectedNpc(null)}
      />
    </>
  );
}
