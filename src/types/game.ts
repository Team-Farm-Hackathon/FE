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
  | "baker"
  | "bard"
  | "mercenary"
  | "guildmaster"
  | "king"
  | "noblewoman";

// 추리 게임용 전략 유형 카테고리 (NPC 8명을 4분류로 묶음)
export type NpcType = "naiveType" | "cheaterType" | "avengerType" | "jokerType";

export type Npc = {
  id: NpcId;
  name: string;
  title: string;
  // 인트로 대사 (여러 줄)
  intro: string[];
  strategy: Strategy;
  // 추리 카드에서 정답으로 묶이는 유형
  type: NpcType;
  // 라운드 결과별 반응 대사 (CC: 둘 다 협력, CD: 나 협력/상대 배신, DC: 나 배신/상대 협력, DD: 둘 다 배신)
  reactions: {
    CC: string;
    CD: string;
    DC: string;
    DD: string;
  };
};

export type NpcTypeInfo = {
  id: NpcType;
  name: string;
  description: string;
  icon: string;
};

export type EndingId =
  | "sage"
  | "observer"
  | "outcast"
  | "raider"
  | "naive"
  | "tightrope"
  | "lunatic"
  | "ordinary";

export type Ending = {
  id: EndingId;
  name: string;
  subtitle: string;
  icon: string;
  // 결말 메시지
  message: string;
};

export type GameStats = {
  finalGold: number;
  finalReputation: number;
  coopCount: number;
  defectCount: number;
  guessAttempts: number;
  guessCorrect: number;
};

export type Round = {
  turn: number;
  myChoice: Choice;
  oppChoice: Choice;
};