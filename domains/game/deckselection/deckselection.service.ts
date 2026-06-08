import { deckService } from "@/domains/deckcollection/deck.service";
import type { Deck } from "@/domains/game/deckselection/deck.types";
import type { MatchDto } from "@/domains/user/types/match.types";
import { GameStart } from "../../user/types/game.types";
import { API_BASE_URL } from "@/config/api";

export async function getUserDecks(): Promise<Deck[]> {
  return deckService.getUserDecks();
}

export async function createMatch(gameStart: GameStart): Promise<MatchDto> {
  const response = await fetch(`${API_BASE_URL}/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameStart),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create match: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as MatchDto;
}
