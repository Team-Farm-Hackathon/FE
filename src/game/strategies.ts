import { CHOICE, type Choice, type Round, type Strategy } from "../types/game";

export function decideOppMove(
  strategy: Strategy,
  history: Round[],
): Choice {
  const last = history[history.length - 1];

  switch (strategy) {
    case "alwaysCooperate":
      return CHOICE.COOPERATE;

    case "alwaysDefect":
      return CHOICE.DEFECT;

    case "titForTat":
      return last ? last.myChoice : CHOICE.COOPERATE;

    case "grudger":
      return history.some((r) => r.myChoice === CHOICE.DEFECT)
        ? CHOICE.DEFECT
        : CHOICE.COOPERATE;

    case "random":
      return Math.random() < 0.5 ? CHOICE.COOPERATE : CHOICE.DEFECT;

    case "pavlov": {
      if (!last) return CHOICE.COOPERATE;
      const won =
        last.oppChoice === CHOICE.DEFECT ||
        (last.myChoice === CHOICE.COOPERATE && last.oppChoice === CHOICE.COOPERATE);
      return won ? last.oppChoice : flip(last.oppChoice);
    }

    case "generousTitForTat":
      // titForTat 변형: 상대 직전 수를 따라하되, 상대가 배신했어도 20% 확률로 용서하고 협력
      if (!last) return CHOICE.COOPERATE;
      if (last.myChoice === CHOICE.DEFECT && Math.random() < 0.2) {
        return CHOICE.COOPERATE;
      }
      return last.myChoice;

    case "hardGrudger": {
      // grudger 강화판: 누적 배신 2회 이상이면 영원히 배신
      const defectCount = history.filter(
        (r) => r.myChoice === CHOICE.DEFECT,
      ).length;
      return defectCount >= 2 ? CHOICE.DEFECT : CHOICE.COOPERATE;
    }
  }
}

function flip(c: Choice): Choice {
  return c === CHOICE.COOPERATE ? CHOICE.DEFECT : CHOICE.COOPERATE;
}
