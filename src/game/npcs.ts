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
    intro: [
      "안녕하세요! 좋은 거래 부탁드려요... 헤헤.",
      "저는 늘 좋은 마음으로 장사한답니다.",
      "당신도 좋은 분이시죠? 그렇죠?",
    ],
    strategy: "alwaysCooperate",
  },
  // [STAGE 1 · 시골 · 쉬움] 50/50 무작위 — 운에 의존, 평균치는 본전
  jester: {
    id: "jester",
    name: "떠돌이 광대",
    title: "변덕의 광인",
    intro: [
      "오늘은 친절할까? 아니면 장난칠까?",
      "동전을 던져서 정해볼까나, 헤헷!",
      "운이 좋길 빌어보시구려, 손님!",
    ],
    strategy: "random",
  },

  // [STAGE 2 · 마을 · 보통] 항상 배신 — 같이 배신해야 본전, 협력은 손해
  cheater: {
    id: "cheater",
    name: "약삭빠른 장사꾼",
    title: "골목의 사기꾼",
    intro: [
      "오, 호구... 아니, 손님 오셨네.",
      "내 물건은 다 진품이지. 진짜로, 진짜.",
      "자, 지갑부터 좀 보여주시겠나?",
    ],
    strategy: "alwaysDefect",
  },
  // [STAGE 2 · 마을 · 보통] 관대한 티탯 — 실수 한두 번은 용서, 협력 회복 가능
  baker: {
    id: "baker",
    name: "빵집 주인",
    title: "관대한 이웃",
    intro: [
      "어서 오세요, 따뜻한 빵 향이 좋지요?",
      "한두 번의 실수쯤이야 빵 한 조각으로 풀어버리세.",
      "오늘도 좋은 하루 보내십시다.",
    ],
    strategy: "generousTitForTat",
  },

  // [STAGE 3 · 변두리 · 어려움] 티탯 — 상대 직전 수를 따라함, 협력 유지가 핵심
  mentor: {
    id: "mentor",
    name: "노상인",
    title: "거리의 현자",
    intro: [
      "또 만났구려, 신참.",
      "거래는 신뢰일세. 자네가 보여주는 만큼만 돌려주겠네.",
      "내 방식이 마음에 들길 바라네.",
    ],
    strategy: "titForTat",
  },
  // [STAGE 3 · 변두리 · 어려움] 파블로프 — 이기면 유지, 지면 반대로 전환
  wanderer: {
    id: "wanderer",
    name: "방랑하는 음유시인",
    title: "운명의 노래꾼",
    intro: [
      "운명의 바람이 자네를 이리로 데려왔군.",
      "잘 풀리면 그대로, 어그러지면 바꾼다네.",
      "내 노래는 매번 달라지지... 자, 시작해 볼까?",
    ],
    strategy: "pavlov",
  },

  // [STAGE 4 · 대도시 · 고난도] 그러저 — 한 번이라도 배신 시 영원히 배신
  grudger: {
    id: "grudger",
    name: "외팔이 대장장이",
    title: "한 번의 배신을 잊지 않는 자",
    intro: [
      "...왔는가.",
      "한 번이다. 한 번만 속이면,",
      "다시는 자네와 거래하지 않아.",
    ],
    strategy: "grudger",
  },
  // [STAGE 4 · 대도시 · 고난도] 하드 그러저 — 2회 누적 배신 시 영원히 배신
  avenger: {
    id: "avenger",
    name: "복면 용병",
    title: "복수의 칼날",
    intro: [
      "흠... 새 얼굴이군.",
      "두 번까진 봐주지. 세 번째는…",
      "각오는 되어 있겠지?",
    ],
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
