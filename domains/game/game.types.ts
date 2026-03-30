import type { Card } from "@/domains/collection/collection.types";

export type GameCard = Card & {
  isPlayable: boolean;
  isSelected: boolean;
  // optional extras:
  // zone?: 'hand' | 'board' | 'graveyard'
  // indexInHand?: number
};
