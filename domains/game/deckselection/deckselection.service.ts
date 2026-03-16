import { deckService } from "@/domains/deckcollection/deck.service";
import type { Deck } from "@/domains/deckcollection/deck.types";

export async function getUserDecks(): Promise<Deck[]> {
  return deckService.getUserDecks();
}