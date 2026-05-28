import Header from "./common/Header";
import { useGameStore } from "../store/useGameStore";
import { NPCS, NPC_ICON } from "../game/npcs";
import { ENDINGS, ENDING_ORDER } from "../game/endings";
import type { NpcId } from "../types/game";

const NPC_TIER: Record<NpcId, "I" | "II" | "III"> = {
  naive: "I",
  jester: "I",
  cheater: "II",
  baker: "II",
  mentor: "III",
  wanderer: "III",
  grudger: "III",
  avenger: "III",
};

const NPC_ORDER: NpcId[] = [
  "naive",
  "jester",
  "cheater",
  "baker",
  "mentor",
  "wanderer",
  "grudger",
  "avenger",
];

export default function Codex() {
  const guessedTypes = useGameStore((s) => s.guessedTypes);
  const unlockedEndings = useGameStore((s) => s.unlockedEndings);

  const npcUnlockedCount = NPC_ORDER.filter((id) =>
    guessedTypes.includes(NPCS[id].type),
  ).length;

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 p-6">
        {/* 도감 헤더 */}
        <div className="relative overflow-hidden rounded-lg border border-[#3a2a1c] bg-gradient-to-br from-[#2a1d11] to-[#1a1208] p-8">
          <p className="text-xs tracking-[0.4em] text-[#8a6a3d]">
            COLLECTION · 도감
          </p>
          <h1 className="mt-3 text-4xl text-[#e8b86b]">상인의 기록</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#a88a5a]">
            거래의 흔적은 사라지지 않는다. 마주친 자들과 걸어온 길이 이곳에
            쌓인다.
          </p>

          <div className="mt-6 flex gap-8 text-xs tracking-[0.3em] text-[#8a6a3d]">
            <span>
              ENDINGS · {unlockedEndings.length} / {ENDING_ORDER.length}
            </span>
            <span>
              NPC · {npcUnlockedCount} / {NPC_ORDER.length}
            </span>
          </div>
        </div>

        {/* 엔딩 섹션 */}
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
                ENDINGS
              </p>
              <h2 className="mt-2 text-2xl text-[#e8b86b]">걸어온 길</h2>
            </div>
            <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
              {unlockedEndings.length} / {ENDING_ORDER.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ENDING_ORDER.map((id) => {
              const ending = ENDINGS[id];
              const unlocked = unlockedEndings.includes(id);

              return (
                <div
                  key={id}
                  className={`relative flex flex-col rounded-md border-2 p-5 transition-colors ${
                    unlocked
                      ? "border-[#8a6a3d] bg-[#1a1208]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <div className="flex h-40 w-full items-center justify-center">
                    <span
                      className={`text-6xl ${unlocked ? "" : "opacity-30 grayscale"}`}
                    >
                      {unlocked ? ending.icon : "🔒"}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-[#3a2a1c] pt-3">
                    <p
                      className={`text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? ending.name : "???"}
                    </p>
                    <p
                      className={`mt-1 text-[10px] leading-relaxed ${
                        unlocked ? "text-[#a88a5a]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? ending.subtitle : "아직 걷지 않은 길."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* NPC 섹션 */}
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
                CHARACTERS
              </p>
              <h2 className="mt-2 text-2xl text-[#e8b86b]">마주친 자들</h2>
            </div>
            <p className="text-xs tracking-[0.3em] text-[#6a4e2d]">
              {npcUnlockedCount} / {NPC_ORDER.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {NPC_ORDER.map((npcId) => {
              const npc = NPCS[npcId];
              const unlocked = guessedTypes.includes(npc.type);
              const tier = NPC_TIER[npcId];

              return (
                <div
                  key={npcId}
                  className={`relative flex flex-col rounded-md border p-5 transition-colors ${
                    unlocked
                      ? "border-[#3a2a1c] bg-[#1a1208] hover:border-[#8a6a3d]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <span className="absolute top-3 right-3 text-[9px] tracking-widest text-[#6a4e2d]">
                    TIER {tier}
                  </span>

                  <div className="flex h-48 w-full items-center justify-center">
                    {unlocked ? (
                      <img
                        src={NPC_ICON[npcId]}
                        alt={npc.name}
                        className="h-40 w-40 object-contain"
                      />
                    ) : (
                      <span className="text-5xl text-[#5a4a2a]">🔒</span>
                    )}
                  </div>

                  <div className="mt-3 border-t border-[#3a2a1c] pt-3">
                    <p
                      className={`text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? npc.name : "???"}
                    </p>
                    <p
                      className={`mt-1 text-[10px] leading-relaxed ${
                        unlocked ? "text-[#a88a5a]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? npc.title : "아직 만나지 않은 자."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
