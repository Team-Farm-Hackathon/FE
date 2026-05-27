import { create } from "zustand";
import type { NpcId, PayoffResult } from "../types/game";
import { STAGES, pickNpcFromStage } from "../game/stages";

type Screen = "onboarding" | "playing" | "intro" | "battle" | "ending";

type GameState = {
  screen: Screen;
  gold: number;
  reputation: number;
  currentStage: number;
  // 현재 거래 중인 NPC (스테이지 진입 시 풀에서 무작위로 결정)
  currentNpcId: NpcId | null;
  applyTradeResult: (result: PayoffResult) => void;
  goToStage: (stage: number) => void;
  nextStage: () => void;
  // 스테이지 선택 → 풀에서 NPC 뽑고 인트로 화면으로 이동
  selectStage: (stage: number) => void;
  reset: () => void;
  setScreen: (s: Screen) => void;
};

export const useGameStore = create<GameState>((set) => ({
  gold: 50,
  reputation: 50,
  currentStage: 1,
  screen: "onboarding",
  currentNpcId: null,

  applyTradeResult: ({ goldDelta, repDelta }) =>
    set((s) => ({
      gold: s.gold + goldDelta,
      reputation: Math.max(0, Math.min(100, s.reputation + repDelta)),
    })),

  goToStage: (stage) => set({ currentStage: stage }),
  nextStage: () => set((s) => ({ currentStage: s.currentStage + 1 })),
  selectStage: (stageId) => {
    const stage = STAGES.find((s) => s.id === stageId);
    if (!stage) return;
    set({
      currentStage: stageId,
      currentNpcId: pickNpcFromStage(stage),
      screen: "intro",
    });
  },
  setScreen: (screen) => set({ screen }),
  reset: () =>
    set({
      gold: 0,
      reputation: 50,
      currentStage: 1,
      screen: "onboarding",
      currentNpcId: null,
    }),
}));