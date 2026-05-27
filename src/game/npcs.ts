import type { Npc, NpcId } from "../types/game";
import {
  Naive,
  Cheater,
  Mentor,
  Grudger,
  avenger,
  Jester,
  Wanderer,
  Baker,
} from "../assets";

export const NPCS: Record<NpcId, Npc> = {
  // [STAGE 1 · 시골 · 쉬움] 항상 협력 — 배신만 골라도 압승 가능한 튜토리얼 상대
  naive: {
    id: "naive",
    name: "순진한 농부",
    title: "마을의 순박한 일꾼",
    intro: "안녕하세요! 좋은 거래 부탁드려요... 헤헤.",
    strategy: "alwaysCooperate",
  },
  // [STAGE 1 · 시골 · 쉬움] 50/50 무작위 — 운에 의존, 평균치는 본전
  jester: {
    id: "jester",
    name: "떠돌이 광대",
    title: "변덕의 광인",
    intro: "오늘은 친절할까? 아니면 장난칠까? 누가 알겠어!",
    strategy: "random",
  },

  // [STAGE 2 · 마을 · 보통] 항상 배신 — 같이 배신해야 본전, 협력은 손해
  cheater: {
    id: "cheater",
    name: "약삭빠른 장사꾼",
    title: "골목의 사기꾼",
    intro: "오, 호구... 아니, 손님 오셨네. 좋은 거 보여드리지.",
    strategy: "alwaysDefect",
  },
  // [STAGE 2 · 마을 · 보통] 관대한 티탯 — 실수 한두 번은 용서, 협력 회복 가능
  baker: {
    id: "baker",
    name: "빵집 주인",
    title: "관대한 이웃",
    intro: "한두 번의 실수쯤이야, 따뜻한 빵 한 조각으로 풀어버리세.",
    strategy: "generousTitForTat",
  },

  // [STAGE 3 · 변두리 · 어려움] 티탯 — 상대 직전 수를 따라함, 협력 유지가 핵심
  mentor: {
    id: "mentor",
    name: "노상인",
    title: "거리의 현자",
    intro: "거래는 신뢰일세. 자네가 보여주는 만큼만 돌려주겠네.",
    strategy: "titForTat",
  },
  // [STAGE 3 · 변두리 · 어려움] 파블로프 — 이기면 유지, 지면 반대로 전환
  wanderer: {
    id: "wanderer",
    name: "방랑하는 음유시인",
    title: "운명의 노래꾼",
    intro: "잘 풀리면 그대로, 어그러지면 바꾼다네.",
    strategy: "pavlov",
  },

  // [STAGE 4 · 대도시 · 고난도] 그러저 — 한 번이라도 배신 시 영원히 배신
  grudger: {
    id: "grudger",
    name: "외팔이 대장장이",
    title: "한 번의 배신을 잊지 않는 자",
    intro: "한 번이다. 한 번만 속이면, 다시는 거래하지 않아.",
    strategy: "grudger",
  },
  // [STAGE 4 · 대도시 · 고난도] 하드 그러저 — 2회 누적 배신 시 영원히 배신
  avenger: {
    id: "avenger",
    name: "복면 용병",
    title: "복수의 칼날",
    intro: "두 번까진 봐주지. 세 번째는… 각오해라.",
    strategy: "hardGrudger",
  },
};

export const NPC_ICON: Record<NpcId, string> = {
  naive: Naive,
  cheater: Cheater,
  mentor: Mentor,
  grudger: Grudger,
  avenger: avenger,
  jester: Jester,
  wanderer: Wanderer,
  baker: Baker,
};
