import type { Ending, EndingId, GameStats } from "../types/game";

export const ENDINGS: Record<EndingId, Ending> = {
  sage: {
    id: "sage",
    name: "현자의 길",
    subtitle: "당신은 신뢰형 상인입니다",
    icon: "🏛️",
    message:
      "당신은 신뢰를 무기로 도시 최고의 상인이 되었습니다. 누구도 당신을 속이려 들지 않고, 누구도 당신과의 거래를 마다하지 않습니다. — 그것이 상인의 법칙이었다.",
  },
  raider: {
    id: "raider",
    name: "약탈자의 길",
    subtitle: "단기엔 부유했으나...",
    icon: "💀",
    message:
      "단기엔 부유했으나, 아무도 당신과 거래하지 않습니다. 골드는 쌓였지만 거리는 텅 비었습니다. 당신의 이름은 두려움과 함께 기억되었다.",
  },
  naive: {
    id: "naive",
    name: "순진한 자의 길",
    subtitle: "착했지만 너무 자주 당했습니다",
    icon: "🌾",
    message:
      "착했지만 너무 자주 당했습니다. 가게는 늘 비어있죠. 미소만 남은 텅 빈 좌판, 당신의 친절은 결국 누군가의 양식이 되었다.",
  },
  lunatic: {
    id: "lunatic",
    name: "광인의 길",
    subtitle: "예측 불가능한 당신",
    icon: "🎭",
    message:
      "예측 불가능한 당신, 도시는 당신을 두려워합니다. 어떤 거래도 약속이 되지 못했고, 당신은 누구의 친구도 적도 되지 못했다.",
  },
};

export const ENDING_ORDER: EndingId[] = ["sage", "raider", "naive", "lunatic"];

// 게임 통계로부터 엔딩 판정 (우선순위 순으로 첫 매치)
export function evaluateEnding(stats: GameStats): EndingId {
  const totalRounds = stats.coopCount + stats.defectCount;
  if (totalRounds === 0) return "lunatic";

  const coopRate = stats.coopCount / totalRounds;
  const defectRate = stats.defectCount / totalRounds;
  const guessAccuracy =
    stats.guessAttempts === 0 ? 0 : stats.guessCorrect / stats.guessAttempts;

  // 1. 현자: 협력률 60%↑ + 평판 70↑ + 추리 정확도 100%
  if (
    coopRate >= 0.6 &&
    stats.finalReputation >= 70 &&
    stats.guessAttempts > 0 &&
    guessAccuracy === 1
  ) {
    return "sage";
  }

  // 2. 약탈자: 배신률 60%↑
  if (defectRate >= 0.6) return "raider";

  // 3. 순진: 협력률 90%↑
  if (coopRate >= 0.9) return "naive";

  // 4. 광인 (기본값)
  return "lunatic";
}
