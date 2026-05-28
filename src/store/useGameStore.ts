import { create } from "zustand";
import {
  CHOICE,
  type Choice,
  type EndingId,
  type GameEvent,
  type NpcId,
  type NpcType,
  type PayoffResult,
  type Round,
} from "../types/game";
import { STAGES, pickNpcFromStage } from "../game/stages";
import { NPCS } from "../game/npcs";
import { calcPayoff, drawEvent } from "../game/payoff";
import { decideOppMove } from "../game/strategies";
import { evaluateEnding } from "../game/endings";

type Screen =
  | "onboarding"
  | "home"
  | "playing"
  | "intro"
  | "battle"
  | "guess"
  | "ending"
  | "codex";

const ENDINGS_STORAGE_KEY = "tit-for-tat:unlockedEndings";

function loadUnlockedEndings(): EndingId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ENDINGS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EndingId[]) : [];
  } catch {
    return [];
  }
}

function saveUnlockedEndings(endings: EndingId[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ENDINGS_STORAGE_KEY, JSON.stringify(endings));
  } catch {
    // ignore
  }
}

type GameState = {
  screen: Screen;
  gold: number;
  reputation: number;
  currentStage: number;
  unlockedStage: number;
  currentNpcId: NpcId | null;
  battleHistory: Round[];
  currentEvent: GameEvent | null;
  lastRoundPayoff: PayoffResult | null;
  guessedTypes: NpcType[];
  // 누적 통계 (엔딩 판정용)
  coopCount: number;
  defectCount: number;
  guessAttempts: number;
  guessCorrect: number;
  // 마지막 클리어 시 결정된 엔딩
  currentEnding: EndingId | null;
  // 도감 (localStorage 영구 보존)
  unlockedEndings: EndingId[];

  setScreen: (s: Screen) => void;
  selectStage: (stage: number) => void;
  playRound: (myChoice: Choice) => void;
  prepareNextRound: () => void;
  submitGuess: (guess: NpcType | null) => boolean;
  returnToMap: () => void;
  // 게임 데이터 리셋 — 도감은 유지
  reset: () => void;
};

const TOTAL_STAGES = STAGES.length;

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
  coopCount: 0,
  defectCount: 0,
  guessAttempts: 0,
  guessCorrect: 0,
  currentEnding: null,
  unlockedEndings: loadUnlockedEndings(),

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
      screen: "battle",
    });
  },

  playRound: (myChoice) => {
    const {
      currentNpcId,
      battleHistory,
      currentEvent,
      gold,
      reputation,
      coopCount,
      defectCount,
    } = get();
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
      coopCount: coopCount + (myChoice === CHOICE.COOPERATE ? 1 : 0),
      defectCount: defectCount + (myChoice === CHOICE.DEFECT ? 1 : 0),
    });
  },

  prepareNextRound: () => {
    set({ lastRoundPayoff: null });
  },

  submitGuess: (guess) => {
    const {
      currentNpcId,
      gold,
      reputation,
      guessedTypes,
      guessAttempts,
      guessCorrect,
    } = get();
    if (!currentNpcId) return false;

    // 건너뛰기: 페널티 없음, 통계에도 미반영
    if (guess === null) return false;

    const correctType = NPCS[currentNpcId].type;
    const isCorrect = guess === correctType;

    const updates: Partial<GameState> = {
      guessAttempts: guessAttempts + 1,
      guessCorrect: guessCorrect + (isCorrect ? 1 : 0),
    };

    if (isCorrect) {
      updates.gold = gold + 5;
      updates.guessedTypes = guessedTypes.includes(correctType)
        ? guessedTypes
        : [...guessedTypes, correctType];
    } else {
      updates.reputation = Math.max(0, reputation - 3);
    }

    set(updates);
    return isCorrect;
  },

  returnToMap: () => {
    const {
      currentStage,
      unlockedStage,
      gold,
      reputation,
      coopCount,
      defectCount,
      guessAttempts,
      guessCorrect,
      unlockedEndings,
    } = get();

    // 마지막 스테이지(4) 클리어 → 엔딩 분기
    if (currentStage >= TOTAL_STAGES) {
      const endingId = evaluateEnding({
        finalGold: gold,
        finalReputation: reputation,
        coopCount,
        defectCount,
        guessAttempts,
        guessCorrect,
      });

      const nextUnlocked = unlockedEndings.includes(endingId)
        ? unlockedEndings
        : [...unlockedEndings, endingId];
      saveUnlockedEndings(nextUnlocked);

      set({
        currentEnding: endingId,
        unlockedEndings: nextUnlocked,
        screen: "ending",
        currentNpcId: null,
        battleHistory: [],
        currentEvent: null,
        lastRoundPayoff: null,
      });
      return;
    }

    set({
      unlockedStage: Math.max(unlockedStage, currentStage + 1),
      screen: "playing",
      currentNpcId: null,
      battleHistory: [],
      currentEvent: null,
      lastRoundPayoff: null,
    });
  },

  reset: () => {
    // 도감은 유지하고 게임 데이터만 초기화
    const keepUnlocked = get().unlockedEndings;
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
      coopCount: 0,
      defectCount: 0,
      guessAttempts: 0,
      guessCorrect: 0,
      currentEnding: null,
      unlockedEndings: keepUnlocked,
    });
  },
}));
