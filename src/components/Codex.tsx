import Header from "./common/Header";
import { useGameStore } from "../store/useGameStore";
import { NPCS, NPC_ICON } from "../game/npcs";
import { ENDINGS, ENDING_ORDER } from "../game/endings";
import type { NpcId } from "../types/game";

const NPC_TIER: Record<NpcId, "I" | "II" | "III" | "IV"> = {
  naive: "I",
  bard: "II",
  baker: "II",
  jester: "II",
  wanderer: "II",
  mercenary: "III",
  guildmaster: "III",
  mentor: "III",
  cheater: "III",
  grudger: "III",
  avenger: "III",
  king: "IV",
  noblewoman: "IV",
};

const NPC_ORDER: NpcId[] = [
  // STAGE 1
  "naive",
  // STAGE 2
  "bard",
  "baker",
  "jester",
  "wanderer",
  // STAGE 3
  "mercenary",
  "guildmaster",
  "mentor",
  "cheater",
  "grudger",
  "avenger",
  // STAGE 4
  "king",
  "noblewoman",
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
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
        {/* 도감 헤더 */}
        <div className="relative overflow-hidden rounded-lg border border-[#3a2a1c] bg-linear-to-br from-[#2a1d11] to-[#1a1208] p-6 md:p-8">
          <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d] md:text-xs">
            COLLECTION · 도감
          </p>
          <h1 className="mt-3 text-3xl text-[#e8b86b] md:text-4xl">
            상인의 기록
          </h1>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#a88a5a] md:text-sm">
            거래의 흔적은 사라지지 않는다. 마주친 자들과 걸어온 길이 이곳에
            쌓인다.
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-[10px] tracking-[0.3em] text-[#8a6a3d] md:mt-6 md:gap-8 md:text-xs">
            <span>
              ENDINGS · {unlockedEndings.length} / {ENDING_ORDER.length}
            </span>
            <span>
              NPC · {npcUnlockedCount} / {NPC_ORDER.length}
            </span>
          </div>
        </div>

        {/* 엔딩 섹션 */}
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:p-8">
          <div className="mb-5 flex items-end justify-between md:mb-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
                ENDINGS
              </p>
              <h2 className="mt-2 text-xl text-[#e8b86b] md:text-2xl">
                걸어온 길
              </h2>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
              {unlockedEndings.length} / {ENDING_ORDER.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {ENDING_ORDER.map((id) => {
              const ending = ENDINGS[id];
              const unlocked = unlockedEndings.includes(id);

              return (
                <div
                  key={id}
                  className={`relative flex flex-col rounded-md border-2 p-3 transition-colors md:p-5 ${
                    unlocked
                      ? "border-[#8a6a3d] bg-[#1a1208]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <div className="flex h-24 w-full items-center justify-center md:h-32 lg:h-40">
                    <span
                      className={`text-4xl md:text-5xl lg:text-6xl ${unlocked ? "" : "opacity-30 grayscale"}`}
                    >
                      {unlocked ? ending.icon : "🔒"}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-[#3a2a1c] pt-3">
                    <p
                      className={`text-xs md:text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? ending.name : "???"}
                    </p>
                    <p
                      className={`mt-1 text-[9px] leading-relaxed md:text-[10px] ${
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
        <section className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:p-8">
          <div className="mb-5 flex items-end justify-between md:mb-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
                CHARACTERS
              </p>
              <h2 className="mt-2 text-xl text-[#e8b86b] md:text-2xl">
                마주친 자들
              </h2>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
              {npcUnlockedCount} / {NPC_ORDER.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {NPC_ORDER.map((npcId) => {
              const npc = NPCS[npcId];
              const unlocked = guessedTypes.includes(npc.type);
              const tier = NPC_TIER[npcId];

              return (
                <div
                  key={npcId}
                  className={`relative flex flex-col rounded-md border p-3 transition-colors md:p-5 ${
                    unlocked
                      ? "border-[#3a2a1c] bg-[#1a1208] hover:border-[#8a6a3d]"
                      : "border-[#2a1f12] bg-[#1a1208]/60"
                  }`}
                >
                  <span className="absolute top-2 right-2 text-[8px] tracking-widest text-[#6a4e2d] md:top-3 md:right-3 md:text-[9px]">
                    TIER {tier}
                  </span>

                  <div className="flex h-28 w-full items-center justify-center md:h-40 lg:h-48">
                    {unlocked ? (
                      <img
                        src={NPC_ICON[npcId]}
                        alt={npc.name}
                        className="h-24 w-24 object-contain md:h-32 md:w-32 lg:h-40 lg:w-40"
                      />
                    ) : (
                      <span className="text-4xl text-[#5a4a2a] md:text-5xl">
                        🔒
                      </span>
                    )}
                  </div>

                  <div className="mt-3 border-t border-[#3a2a1c] pt-3">
                    <p
                      className={`text-xs md:text-sm ${
                        unlocked ? "text-[#e8b86b]" : "text-[#5a4a2a]"
                      }`}
                    >
                      {unlocked ? npc.name : "???"}
                    </p>
                    <p
                      className={`mt-1 text-[9px] leading-relaxed md:text-[10px] ${
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
