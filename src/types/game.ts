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