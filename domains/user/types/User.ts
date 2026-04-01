import { Deck } from "@/domains/game/deckselection/deck.types";

export type User = {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  Decks: Deck[];
};

export type AuthUser = {
  accountId: number;
  username: string;
};