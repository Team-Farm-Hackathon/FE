import type { Npc, NpcId, NpcType, NpcTypeInfo, Strategy } from "../types/game";
import {
  Naive,
  Cheater,
  Mentor,
  Grudger,
  avenger,
  Jester,
  Wanderer,
  Baker,
  Bard,
  Mercenary,
  Guildmaster,
  King,
  NobleWoman,
} from "../assets";

export const NPCS: Record<NpcId, Npc> = {
  // ─── STAGE 1 · 시골 · 튜토리얼 ─────────────────────────────────
  // 항상 협력 — 배신만 골라도 압승 가능한 튜토리얼 상대
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
    type: "naiveType",
    reactions: {
      CC: "역시! 좋은 거래였어요. 다음에 또 만나요.",
      CD: "어... 왜 그러셨어요? 슬퍼요...",
      DC: "괜찮아요, 다음엔 더 잘 부탁드려요!",
      DD: "이런 일이 또 생기다니... 마음이 아파요.",
    },
  },

  // ─── STAGE 2 · 마을 · 보통 ────────────────────────────────────
  // 티탯 — 받은 대로 돌려주는 마을의 노래꾼
  bard: {
    id: "bard",
    name: "떠돌이 음유시인",
    title: "거리의 노래꾼",
    intro: [
      "오, 새 얼굴이로구나. 노래 한 곡 들려드릴까?",
      "내 노래는 그대가 부르는 곡조를 따라간다네.",
      "다정한 음을 주면 다정하게, 거친 음을 주면 거칠게.",
    ],
    strategy: "titForTat",
    type: "avengerType",
    reactions: {
      CC: "그대의 음에 내 곡조를 맞추리.",
      CD: "...불협화음이군. 다음엔 갚아드리지.",
      DC: "오, 그런 음이라면 나도 따라가야겠군.",
      DD: "거친 노래엔 거친 노래로 답할 뿐.",
    },
  },
  // 관대한 티탯 — 실수 한두 번은 용서, 협력 회복 가능
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
    type: "avengerType",
    reactions: {
      CC: "따뜻한 거래, 따뜻한 빵.",
      CD: "괜찮습니다. 다음 빵은 더 맛있을 거예요.",
      DC: "사정이 있으셨겠지요, 신경 쓰지 마세요.",
      DD: "조금 식은 빵을 드릴 수밖에 없겠군요.",
    },
  },
  // 50/50 무작위 — 운에 의존, 평균치는 본전
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
    type: "jokerType",
    reactions: {
      CC: "운이 좋으셨네! 헤헤헤!",
      CD: "어이쿠, 동전이 그쪽을 보고 웃었나봐!",
      DC: "당했어! 하지만 재밌었지!",
      DD: "푸하하! 우린 같은 부류였군!",
    },
  },
  // 파블로프 — 이기면 유지, 지면 반대로 전환
  wanderer: {
    id: "wanderer",
    name: "행상인",
    title: "운명의 보부상",
    intro: [
      "운명의 바람이 자네를 이리로 데려왔군.",
      "잘 풀리면 그대로, 어그러지면 바꾼다네.",
      "내 노래는 매번 달라지지... 자, 시작해 볼까?",
    ],
    strategy: "pavlov",
    type: "jokerType",
    reactions: {
      CC: "좋은 흐름이군. 이대로 가지.",
      CD: "...흐름이 끊겼군. 곡조를 바꿔야겠어.",
      DC: "오, 의외의 음이로군.",
      DD: "엇박이군. 다음엔 다르게 가야지.",
    },
  },

  // ─── STAGE 3 · 변두리 · 어려움 ────────────────────────────────
  // 항상 배신 — 돈만 좇는 무법자
  mercenary: {
    id: "mercenary",
    name: "굶주린 용병",
    title: "골드만 좇는 자",
    intro: [
      "한 끼만 사주면 칼도 빌려드리지... 농담이오.",
      "내 신의는 동전 무게로 잰다.",
      "거래는 짧을수록 좋아. 길어지면 누군가 죽거든.",
    ],
    strategy: "alwaysDefect",
    type: "cheaterType",
    reactions: {
      CC: "...어이, 그렇게 쉽게 믿으면 안 된다고.",
      CD: "푸하, 미안하군. 이게 내 방식이야.",
      DC: "오, 머리 좀 굴리는데?",
      DD: "그래, 이게 변두리의 규칙이지.",
    },
  },
  // 그러저 — 길드의 명부에 한 번 오르면 끝
  guildmaster: {
    id: "guildmaster",
    name: "상인 길드장",
    title: "거래의 규칙을 세운 자",
    intro: [
      "이 거리는 내 손바닥 안일세, 젊은이.",
      "한 번. 단 한 번이라도 길드를 속이면,",
      "어느 가게도 자네에게 문을 열지 않을 걸세.",
    ],
    strategy: "grudger",
    type: "avengerType",
    reactions: {
      CC: "좋아, 자네 이름을 명부에 올려두지.",
      CD: "...명부에서 자네 이름을 지웠네. 영원히.",
      DC: "한 번의 실수로 다 잃을 셈인가.",
      DD: "이미 끝난 거래일세. 무의미하지.",
    },
  },
  // 티탯 — 상대 직전 수를 따라함, 협력 유지가 핵심
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
    type: "avengerType",
    reactions: {
      CC: "이게 신뢰일세. 잊지 말게.",
      CD: "...실망이군. 다음엔 똑같이 갚지.",
      DC: "내 차례인가. 받은 만큼만 돌려주는 것뿐일세.",
      DD: "어리석은 짓이야, 우리 둘 다.",
    },
  },
  // 항상 배신 — 같이 배신해야 본전, 협력은 손해
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
    type: "cheaterType",
    reactions: {
      CC: "...진심인가? 뭐, 나야 좋지.",
      CD: "낄낄, 역시 호구는 호구야.",
      DC: "어라? 제법인데?",
      DD: "흥, 서로 알아본 셈이군.",
    },
  },
  // 그러저 — 한 번이라도 배신 시 영원히 배신
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
    type: "avengerType",
    reactions: {
      CC: "...괜찮군.",
      CD: "...기억해두지. 영원히.",
      DC: "이게 시작이야. 끝이 아니라.",
      DD: "예상한 대로군.",
    },
  },
  // 하드 그러저 — 2회 누적 배신 시 영원히 배신
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
    type: "avengerType",
    reactions: {
      CC: "...현명하군.",
      CD: "한 번은 봐준다. 두 번째는 없다.",
      DC: "이걸로 끝낼 줄 아나?",
      DD: "역시. 세상에 믿을 놈은 없지.",
    },
  },

  // ─── STAGE 4 · 대도시 · 보스 ──────────────────────────────────
  // 하드 그러저 — 두 번까지는 봐주는 노쇠한 군주
  king: {
    id: "king",
    name: "늙은 왕",
    title: "왕좌의 무게를 아는 자",
    intro: [
      "허허, 또 하나의 상인인가.",
      "짐은 너그러우니 두 번까지는 눈감아 주겠다.",
      "허나 세 번째는… 짐의 칼이 답하리라.",
    ],
    strategy: "hardGrudger",
    type: "avengerType",
    reactions: {
      CC: "충직하구나. 짐의 곳간이 열려있다.",
      CD: "한 번이군. 짐은 기억하고 있다.",
      DC: "그대가 짐을 시험하는가?",
      DD: "더 이상 자비는 없다.",
    },
  },
  // 파블로프 — 사교계의 게임, 이긴 수는 유지·진 수는 뒤집기
  noblewoman: {
    id: "noblewoman",
    name: "베일의 귀족",
    title: "미소 뒤를 읽는 자",
    intro: [
      "어머나, 새로 오신 분이네요. 차 한 잔 어떠세요.",
      "사교계의 게임은 단순하답니다 — 통하면 그대로, 안 통하면 뒤집죠.",
      "어디 한번, 그대의 패를 보여주시겠어요?",
    ],
    strategy: "pavlov",
    type: "jokerType",
    reactions: {
      CC: "통했네요. 이 곡조를 계속 이어가요.",
      CD: "...어머. 그렇다면 저도 가면을 바꿔야겠군요.",
      DC: "오, 의외의 수네요. 흥미로워요.",
      DD: "서로 솔직했어요. 그래서 더 불편하죠.",
    },
  },
};

export const NPC_ICON: Record<NpcId, string> = {
  // STAGE 1
  naive: Naive,
  // STAGE 2
  bard: Bard,
  baker: Baker,
  jester: Jester,
  wanderer: Wanderer,
  // STAGE 3
  mercenary: Mercenary,
  guildmaster: Guildmaster,
  mentor: Mentor,
  cheater: Cheater,
  grudger: Grudger,
  avenger: avenger,
  // STAGE 4
  king: King,
  noblewoman: NobleWoman,
};

export const NPC_TIER: Record<NpcId, "I" | "II" | "III" | "IV"> = {
  naive: "I",
  bard: "II",
  baker: "II",
  jester: "II",
  wanderer: "II",
  mercenary: "III",
  guildmaster: "III",
  mentor: "III",
  cheater: "III",
  grudger: "III",
  avenger: "III",
  king: "IV",
  noblewoman: "IV",
};

export const NPC_ORDER: NpcId[] = [
  // STAGE 1
  "naive",
  // STAGE 2
  "bard",
  "baker",
  "jester",
  "wanderer",
  // STAGE 3
  "mercenary",
  "guildmaster",
  "mentor",
  "cheater",
  "grudger",
  "avenger",
  // STAGE 4
  "king",
  "noblewoman",
];

// 추리 카드용 4가지 유형 정보
export const NPC_TYPES: Record<NpcType, NpcTypeInfo> = {
  naiveType: {
    id: "naiveType",
    name: "순진이",
    description: "무조건 협력. 의심 없이 손을 내미는 자.",
    icon: "🤝",
  },
  cheaterType: {
    id: "cheaterType",
    name: "사기꾼",
    description: "무조건 배신. 신뢰는 그의 사전에 없다.",
    icon: "🗡",
  },
  avengerType: {
    id: "avengerType",
    name: "복수자",
    description: "상대가 한 대로 돌려준다. 정의의 저울.",
    icon: "⚖",
  },
  jokerType: {
    id: "jokerType",
    name: "변덕쟁이",
    description: "무작위. 그조차 자신을 모른다.",
    icon: "🎲",
  },
};

export const STRATEGY_LABEL: Record<Strategy, { name: string; desc: string }> =
  {
    alwaysCooperate: {
      name: "항상 협력",
      desc: "어떤 상황에도 손을 내민다.",
    },
    alwaysDefect: {
      name: "항상 배신",
      desc: "조건 없이 등을 돌린다.",
    },
    titForTat: {
      name: "팃포탯",
      desc: "받은 그대로 돌려준다. 첫 거래는 협력.",
    },
    generousTitForTat: {
      name: "관대한 팃포탯",
      desc: "팃포탯이지만 가끔 한두 번은 용서한다.",
    },
    grudger: {
      name: "그러저",
      desc: "한 번이라도 배신당하면 영원히 배신.",
    },
    hardGrudger: {
      name: "하드 그러저",
      desc: "누적 배신 2회를 넘기면 영원히 배신.",
    },
    random: {
      name: "변덕",
      desc: "동전 던지기. 50/50 무작위.",
    },
    pavlov: {
      name: "파블로프",
      desc: "이긴 수는 그대로, 진 수는 뒤집어 낸다.",
    },
  };
