import type { Card } from "@/domains/user/types/collection.types";

export type GameCard = Card & {
  isPlayable: boolean;
  isSelected: boolean;
  // optional extras:
  // zone?: 'hand' | 'board' | 'graveyard'
  // indexInHand?: number
};

export type GameStart = {
  PlayerOneId: number;
  PlayerOneDeckId: number;
  PlayerTwoId: number;
  PlayerTwoDeckId: number;
};
