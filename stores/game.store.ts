import { create } from "zustand";

type GameState = {
  userId?: number;
  opponentId?: number;
  deckId?: number;
  opponentDeckId?: number;
  matchId?: number;
  // instanceId?: number; // Uncomment when backend provides instance IDs

  selectDeck: (deckId: number) => void;
  setMatch: (matchId: number, opponentId: number) => void;
  // setInstance: (instanceId: number) => void; // Uncomment when using instance IDs
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  userId: undefined,
  opponentId: undefined,
  deckId: undefined,
  opponentDeckId: undefined,
  matchId: undefined,
  // instanceId: undefined,

  selectDeck: (deckId) => set({ deckId }),

  setMatch: (matchId, opponentId) => set({ matchId, opponentId }),
  // setInstance: (instanceId) => set({ instanceId }),

  resetGame: () =>
    set({
      opponentId: undefined,
      deckId: undefined,
      matchId: undefined,
      opponentDeckId: undefined,
    }),
}));