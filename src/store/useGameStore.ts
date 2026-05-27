import { create } from "zustand";
import type { PayoffResult } from "../types/game";


type GameState = {
  gold: number;
  reputation: number;
  currentStage: number;
  applyTradeResult: (result: PayoffResult) => void;
  goToStage: (stage: number) => void;
  nextStage: () => void;
  reset: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  gold: 0,
  reputation: 50,
  currentStage: 1,

  applyTradeResult: ({ goldDelta, repDelta }) =>
    set((s) => ({
      gold: s.gold + goldDelta,
      reputation: Math.max(0, Math.min(100, s.reputation + repDelta)),
    })),

  goToStage: (stage) => set({ currentStage: stage }),
  nextStage: () => set((s) => ({ currentStage: s.currentStage + 1 })),
  reset: () => set({ gold: 0, reputation: 50, currentStage: 1 }),
}));