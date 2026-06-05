import {
  CHOICE,
  type Choice,
  type EventId,
  type GameEvent,
  type PayoffResult,
} from "../types/game";

const REP_ON_COOPERATE = 2;
const REP_ON_DEFECT = -3;

// 기본 골드 페이오프 테이블 (나 기준)
function baseGold(myChoice: Choice, oppChoice: Choice): number {
  if (myChoice === CHOICE.COOPERATE) {
    return oppChoice === CHOICE.COOPERATE ? 2 : -1;
  } else {
    return oppChoice === CHOICE.COOPERATE ? 3 : 0;
  }
}

export function calcPayoff(
  myChoice: Choice,
  oppChoice: Choice,
  event: GameEvent | null = null,
): PayoffResult {
  let goldDelta = baseGold(myChoice, oppChoice);
  let repDelta =
    myChoice === CHOICE.COOPERATE ? REP_ON_COOPERATE : REP_ON_DEFECT;

  if (event) {
    switch (event.id) {
      case "plague":
        // 역병: 협력+협력 시 골드 2배
        if (myChoice === CHOICE.COOPERATE && oppChoice === CHOICE.COOPERATE) {
          goldDelta *= 2;
        }
        break;
      case "kingsTax":
        // 왕의 세금: 배신 시 골드 절반 압류
        if (myChoice === CHOICE.DEFECT) {
          goldDelta = Math.floor(goldDelta * 0.5);
        }
        break;
      case "festival":
        // 축제: 평판 보너스 2배
        repDelta *= 2;
        break;
      case "harvest":
        // 흉작: 협력 시에도 보상 감소
        if (myChoice === CHOICE.COOPERATE) {
          goldDelta -= 1;
        }
        break;
      case "bandits":
        // 도적단: 양쪽 모두 배신 시 추가 골드 손실
        if (myChoice === CHOICE.DEFECT && oppChoice === CHOICE.DEFECT) {
          goldDelta -= 2;
        }
        break;
    }
  }

  return { goldDelta, repDelta };
}

const EVENT_POOL: EventId[] = [
  "plague",
  "kingsTax",
  "festival",
  "harvest",
  "bandits",
];

// 매 라운드 무작위 이벤트 카드 1장 추첨
export function drawEvent(): GameEvent {
  const id = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
  return { id };
}

export const EVENT_INFO: Record<EventId, { name: string; icon: string; desc: string }> = {
  plague: { name: "역병", icon: "🦠", desc: "이번 라운드 협력 보상 ×2" },
  kingsTax: { name: "왕의 세금", icon: "👑", desc: "배신 시 골드 일부 압류" },
  festival: { name: "축제", icon: "🏰", desc: "평판 보너스 ×2" },
  harvest: { name: "흉작", icon: "🌾", desc: "협력 시 골드 -1" },
  bandits: { name: "도적단", icon: "⚔", desc: "양쪽 모두 배신 시 추가 골드 손실" },
};
