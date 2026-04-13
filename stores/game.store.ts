import { create } from "zustand";
import type { MatchDto } from "@/domains/user/types/match.types";

type GameState = {
  userId?: number;
  opponentId?: number;
  deckId?: number;
  opponentDeckId?: number;
  matchId?: string;
  match?: MatchDto;
  // instanceId?: number; // Uncomment when backend provides instance IDs

  selectDeck: (deckId: number) => void;
  setMatch: (matchId: string, opponentId: number) => void;
  setMatchDto: (match: MatchDto) => void;
  // setInstance: (instanceId: number) => void; // Uncomment when using instance IDs
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  userId: undefined,
  opponentId: undefined,
  deckId: undefined,
  opponentDeckId: undefined,
  matchId: undefined,
  match: undefined,
  // instanceId: undefined,

  selectDeck: (deckId) => set({ deckId }),

  setMatch: (matchId, opponentId) => set({ matchId, opponentId }),
  setMatchDto: (match) =>
    set({
      match,
      matchId: match.matchId,
    }),
  // setInstance: (instanceId) => set({ instanceId }),

  resetGame: () =>
    set({
      opponentId: undefined,
      deckId: undefined,
      matchId: undefined,
      match: undefined,
      opponentDeckId: undefined,
    }),
}));
