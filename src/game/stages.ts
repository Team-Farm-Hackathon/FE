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
  // 한 스테이지 안의 분기 노드 개수. 플레이어는 그 중 1개를 선택하여 진행한다.
  nodeCount: number;
};

export const STAGES: Stage[] = [
  // 보스 · 노드 1
  {
    id: 4,
    name: "왕의 알현",
    area: "city",
    areaLabel: "궁전",
    icon: "👑",
    npcPool: ["king", "noblewoman", "jester"],
    rounds: 7,
    nodeCount: 1,
  },
  // 어려움 · 노드 3
  {
    id: 3,
    name: "장터의 흥정",
    area: "outskirts",
    areaLabel: "도시",
    icon: "🛒",
    npcPool: ["mercenary", "guildmaster", "mentor", "grudger", "avenger"],
    rounds: 5,
    nodeCount: 3,
  },
  // 보통 · 노드 2
  {
    id: 2,
    name: "마을에서의 거래",
    area: "village",
    areaLabel: "마을",
    icon: "🪙",
    npcPool: ["bard", "baker", "wanderer", "cheater"],
    rounds: 5,
    nodeCount: 2,
  },
  // 튜토리얼 · 노드 1
  {
    id: 1,
    name: "첫 거래",
    area: "country",
    areaLabel: "시골",
    icon: "🌱",
    npcPool: ["naive"],
    rounds: 3,
    nodeCount: 1,
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
