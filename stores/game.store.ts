import { create } from "zustand";

type GameState = {
  userId?: number;
  opponentId?: number;
  deckId?: number;
  opponentDeckId?: number;
  matchId?: number;

  selectDeck: (deckId: number) => void;
  setMatch: (matchId: number, opponentId: number) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  userId: undefined,
  opponentId: undefined,
  deckId: undefined,
  opponentDeckId: undefined,
  matchId: undefined,

  selectDeck: (deckId) => set({ deckId }),

  setMatch: (matchId, opponentId) => set({ matchId, opponentId }),

  resetGame: () =>
    set({
      opponentId: undefined,
      deckId: undefined,
      matchId: undefined,
      opponentDeckId: undefined,
    }),
}));