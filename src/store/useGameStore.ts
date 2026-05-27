import { create } from "zustand";
import type { PayoffResult } from "../types/game";


type Screen = "onboarding" | "playing" | "ending";

type GameState = {
  screen: Screen;
  gold: number;
  reputation: number;
  currentStage: number;
  applyTradeResult: (result: PayoffResult) => void;
  goToStage: (stage: number) => void;
  nextStage: () => void;
  reset: () => void;
  setScreen: (s: Screen) => void;
};

export const useGameStore = create<GameState>((set) => ({
  gold: 0,
  reputation: 50,
  currentStage: 1,
  screen: "onboarding",

  applyTradeResult: ({ goldDelta, repDelta }) =>
    set((s) => ({
      gold: s.gold + goldDelta,
      reputation: Math.max(0, Math.min(100, s.reputation + repDelta)),
    })),

  goToStage: (stage) => set({ currentStage: stage }),
  nextStage: () => set((s) => ({ currentStage: s.currentStage + 1 })),
  setScreen: (screen) => set({ screen }),
  reset: () =>
    set({ gold: 0, reputation: 50, currentStage: 1, screen: "onboarding" }),
}));