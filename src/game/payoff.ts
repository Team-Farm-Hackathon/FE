import { CHOICE, type Choice, type GameEvent, type PayoffResult } from "../types/game";


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
      case 'plague': 
        if (myChoice === CHOICE.COOPERATE && oppChoice === CHOICE.COOPERATE) {
          goldDelta *= 2;
        }
        break;
      case 'kingsTax': 
        if (myChoice === CHOICE.DEFECT) {
          goldDelta = Math.floor(goldDelta * 0.5);
        }
        break;
      case 'festival': 
        repDelta *= 2;
        break;
      default:
        break;
    }
  }

  return { goldDelta, repDelta };
}
