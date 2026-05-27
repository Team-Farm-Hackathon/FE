export const CHOICE = {
  COOPERATE: 'cooperate',  // 협력
  DEFECT: 'defect',   /// 배신
} as const;

export type Choice = (typeof CHOICE)[keyof typeof CHOICE];

export type EventId = 'plague' | 'kingsTax' | 'festival' | 'harvest' | 'bandits';

export type GameEvent = {
  id: EventId;
  [key: string]: unknown;
};

export type PayoffResult = {
  goldDelta: number;
  repDelta: number;
};

export type Strategy =
  | "alwaysCooperate"      // 항상 협력
  | "alwaysDefect"         // 항상 배신
  | "titForTat"            // 첫 턴 협력, 이후 상대 직전 수 따라함
  | "grudger"              // 한 번이라도 배신당하면 영원히 배신
  | "random"               // 50/50 무작위
  | "pavlov"               // 직전 라운드에서 이겼으면 같은 수, 졌으면 반대
  | "generousTitForTat"    // titForTat + 가끔(20%) 배신당해도 협력으로 용서
  | "hardGrudger";         // 누적 배신 2회 이상이면 영원히 배신

export type NpcId =
  | "naive"
  | "cheater"
  | "mentor"
  | "grudger"
  | "avenger"
  | "jester"
  | "wanderer"
  | "baker";

export type Npc = {
  id: NpcId;
  name: string;
  title: string;
  // 인트로 대사 (여러 줄)
  intro: string[];
  strategy: Strategy;
};

export type Round = {
  turn: number;
  myChoice: Choice;
  oppChoice: Choice;
};