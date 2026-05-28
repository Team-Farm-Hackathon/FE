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
  observer: {
    id: "observer",
    name: "관찰자의 길",
    subtitle: "거래보다 관찰을 택한 자",
    icon: "🔍",
    message:
      "당신은 흥정보다 관찰을 택했습니다. 모든 가면 너머의 얼굴을 읽어냈고, 누구도 당신 앞에서 자신을 숨길 수 없었다. — 도시는 당신을 '읽는 자'라 불렀다.",
  },
  tightrope: {
    id: "tightrope",
    name: "줄타기꾼의 길",
    subtitle: "협력도 배신도 아닌 그 사이",
    icon: "🎪",
    message:
      "협력도 배신도 아닌, 그 사이에서 균형을 찾았습니다. 당신은 어느 편에도 서지 않았지만, 어느 편도 당신을 적으로 두지 않았다. — 줄 위를 걷는 자의 평온.",
  },
  outcast: {
    id: "outcast",
    name: "추방자의 길",
    subtitle: "도시는 당신을 기억에서 지웠다",
    icon: "🚪",
    message:
      "쌓아온 신뢰는 모래처럼 흩어졌습니다. 골드도 칼도 남지 않았고, 거리의 누구도 당신의 이름을 부르지 않습니다. — 추방은 문이 아니라 침묵으로 시작되었다.",
  },
  ordinary: {
    id: "ordinary",
    name: "평범한 상인의 길",
    subtitle: "특별하지 않아도, 거리는 흘러간다",
    icon: "🧺",
    message:
      "전설도, 악명도 당신을 비껴갔습니다. 하루치 빵값을 벌고, 하루치 인사를 나누었지요. 누구의 이야기에도 주인공이 되지 못했지만 — 그 평범함이야말로 거리의 진짜 얼굴이었다.",
  },
};

export const ENDING_ORDER: EndingId[] = [
  "sage",
  "observer",
  "outcast",
  "raider",
  "naive",
  "tightrope",
  "lunatic",
  "ordinary",
];

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

  // 2. 관찰자: 추리 정확도 100% (시도 2회 이상) — 현자 요건은 못 채운 추리 마스터
  if (stats.guessAttempts >= 2 && guessAccuracy === 1) {
    return "observer";
  }

  // 3. 추방자: 평판 붕괴 (배신률과 무관하게 신뢰 자체가 무너진 경우)
  if (stats.finalReputation <= 10) return "outcast";

  // 4. 약탈자: 배신률 60%↑
  if (defectRate >= 0.6) return "raider";

  // 5. 순진: 협력률 90%↑
  if (coopRate >= 0.9) return "naive";

  // 6. 줄타기꾼: 협력률 40~60% + 평판 50↑ (의도적 균형 플레이)
  if (coopRate >= 0.4 && coopRate <= 0.6 && stats.finalReputation >= 50) {
    return "tightrope";
  }

  // 7. 광인 (기본값)
  if (coopRate === 0.5 && defectRate === 0.5) {
    return "lunatic";
  }
  return "ordinary";
}
