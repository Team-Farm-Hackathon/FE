import { create } from "zustand";
import type {
  Choice,
  GameEvent,
  NpcId,
  NpcType,
  PayoffResult,
  Round,
} from "../types/game";
import { STAGES, pickNpcFromStage } from "../game/stages";
import { NPCS } from "../game/npcs";
import { calcPayoff, drawEvent } from "../game/payoff";
import { decideOppMove } from "../game/strategies";

type Screen =
  | "onboarding"
  | "playing"
  | "intro"
  | "battle"
  | "guess"
  | "ending";

type GameState = {
  screen: Screen;
  gold: number;
  reputation: number;
  // 현재 위치한 (또는 진입 중인) 스테이지
  currentStage: number;
  // 해금된 가장 높은 스테이지 (기본 1)
  unlockedStage: number;
  // 현재 거래 중인 NPC (스테이지 진입 시 풀에서 무작위로 결정)
  currentNpcId: NpcId | null;
  // 현재 배틀의 라운드 히스토리
  battleHistory: Round[];
  // 이번 라운드의 이벤트
  currentEvent: GameEvent | null;
  // 직전 라운드 결과 (RoundResult 표시용)
  lastRoundPayoff: PayoffResult | null;
  // 정답 맞춘 NPC 유형 기록 (선택사항: 도감/엔딩용)
  guessedTypes: NpcType[];

  // 액션
  setScreen: (s: Screen) => void;
  selectStage: (stage: number) => void;
  // 라운드 1회 진행: 내 선택 → 상대 결정 → 페이오프 계산 → 히스토리/스토어 갱신
  playRound: (myChoice: Choice) => void;
  // 다음 라운드 준비 (이벤트 새로 뽑기)
  prepareNextRound: () => void;
  // 추리 제출 (정답 시 +5 골드, 오답 시 -3 평판, 건너뛰기는 null)
  submitGuess: (guess: NpcType | null) => boolean;
  // 배틀/추리 종료 후 맵으로 복귀 (다음 스테이지 해금)
  returnToMap: () => void;
  reset: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  gold: 50,
  reputation: 50,
  currentStage: 1,
  unlockedStage: 1,
  screen: "onboarding",
  currentNpcId: null,
  battleHistory: [],
  currentEvent: null,
  lastRoundPayoff: null,
  guessedTypes: [],

  setScreen: (screen) => set({ screen }),

  selectStage: (stageId) => {
    const stage = STAGES.find((s) => s.id === stageId);
    if (!stage) return;
    set({
      currentStage: stageId,
      currentNpcId: pickNpcFromStage(stage),
      battleHistory: [],
      currentEvent: drawEvent(),
      lastRoundPayoff: null,
      screen: "intro",
    });
  },

  playRound: (myChoice) => {
    const { currentNpcId, battleHistory, currentEvent, gold, reputation } =
      get();
    if (!currentNpcId) return;

    const npc = NPCS[currentNpcId];
    const oppChoice = decideOppMove(npc.strategy, battleHistory);
    const payoff = calcPayoff(myChoice, oppChoice, currentEvent);

    const round: Round = {
      turn: battleHistory.length + 1,
      myChoice,
      oppChoice,
    };

    set({
      battleHistory: [...battleHistory, round],
      lastRoundPayoff: payoff,
      gold: gold + payoff.goldDelta,
      reputation: Math.max(0, Math.min(100, reputation + payoff.repDelta)),
    });
  },

  prepareNextRound: () => {
    set({ currentEvent: drawEvent(), lastRoundPayoff: null });
  },

  submitGuess: (guess) => {
    const { currentNpcId, gold, reputation, guessedTypes } = get();
    if (!currentNpcId) return false;

    // 건너뛰기: 페널티 없음
    if (guess === null) {
      set({ screen: "playing" });
      return false;
    }

    const correctType = NPCS[currentNpcId].type;
    const isCorrect = guess === correctType;

    if (isCorrect) {
      set({
        gold: gold + 5,
        guessedTypes: guessedTypes.includes(correctType)
          ? guessedTypes
          : [...guessedTypes, correctType],
      });
    } else {
      set({ reputation: Math.max(0, reputation - 3) });
    }

    return isCorrect;
  },

  returnToMap: () => {
    const { currentStage, unlockedStage } = get();
    set({
      unlockedStage: Math.max(unlockedStage, currentStage + 1),
      screen: "playing",
      currentNpcId: null,
      battleHistory: [],
      currentEvent: null,
      lastRoundPayoff: null,
    });
  },

  reset: () =>
    set({
      gold: 50,
      reputation: 50,
      currentStage: 1,
      unlockedStage: 1,
      screen: "onboarding",
      currentNpcId: null,
      battleHistory: [],
      currentEvent: null,
      lastRoundPayoff: null,
      guessedTypes: [],
    }),
}));
