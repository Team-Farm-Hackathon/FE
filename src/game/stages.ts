import type { NpcId } from "../types/game";

export type StageArea = "city" | "outskirts" | "village" | "country";

export type Stage = {
  id: number;
  name: string;
  area: StageArea;
  areaLabel: string;
  icon: string;
  // 진입 시 이 풀에서 1명이 무작위로 호출됨 (재플레이성)
  npcPool: NpcId[];
  rounds: number;
};

export const STAGES: Stage[] = [
  // 고난도
  {
    id: 4,
    name: "왕의 알현",
    area: "city",
    areaLabel: "대도시",
    icon: "👑",
    npcPool: ["grudger", "avenger"],
    rounds: 8,
  },
  // 어려움
  {
    id: 3,
    name: "장터의 흥정",
    area: "outskirts",
    areaLabel: "변두리",
    icon: "🛒",
    npcPool: ["mentor", "wanderer"],
    rounds: 6,
  },
  // 보통
  {
    id: 2,
    name: "농민과의 거래",
    area: "village",
    areaLabel: "마을",
    icon: "🪙",
    npcPool: ["cheater", "baker"],
    rounds: 5,
  },
  // 쉬움
  {
    id: 1,
    name: "첫 거래",
    area: "country",
    areaLabel: "시골",
    icon: "🌱",
    npcPool: ["naive", "jester"],
    rounds: 5,
  },
];

// 풀에서 NPC 1명 무작위 선택
export function pickNpcFromStage(stage: Stage): NpcId {
  return stage.npcPool[Math.floor(Math.random() * stage.npcPool.length)];
}

export const AREA_BG: Record<StageArea, string> = {
  city: "bg-gradient-to-b from-[#2a1f4a] to-[#7a4a6a]",
  outskirts: "bg-gradient-to-b from-[#7a4a6a] to-[#c97a3a]",
  village: "bg-gradient-to-b from-[#c97a3a] to-[#6a8a4a]",
  country: "bg-gradient-to-b from-[#6a8a4a] to-[#4a7a3a]",
};
