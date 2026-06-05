import type { NpcType } from "../../types/game";

export type GuessResult = "correct" | "wrong" | null;

export const TYPE_ORDER: NpcType[] = [
  "naiveType",
  "cheaterType",
  "avengerType",
  "jokerType",
];

export const TYPE_HINT: Record<NpcType, string> = {
  naiveType: "한 번도 배신하지 않는다",
  cheaterType: "협력의 흔적이 없다",
  avengerType: "내 행동을 거울처럼 따라온다",
  jokerType: "패턴이 없다",
};