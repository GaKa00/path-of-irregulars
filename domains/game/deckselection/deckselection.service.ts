import { deckService } from "@/domains/deckcollection/deck.service";
import type { Deck } from "@/domains/deckcollection/deck.types";
import type { MatchDto } from "@/domains/game/match.types";
import { GameStart } from "../game.types";

export async function getUserDecks(): Promise<Deck[]> {
  return deckService.getUserDecks();
}

export async function createMatch(gameStart: GameStart): Promise<MatchDto> {
  const response = await fetch(`https://localhost:7197/matches`, {
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