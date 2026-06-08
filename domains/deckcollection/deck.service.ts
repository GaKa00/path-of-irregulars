import { mapDeckFromApi } from "./deck.utils";
import type { Deck, DeckApiModel } from "../game/deckselection/deck.types";
import { useAuthStore } from "@/stores/auth.store";
import { API_BASE_URL } from "@/config/api";

type DeckPayload = {
  Name: string;
  CardIds: string[];
};

function getCurrentAccountId(): number {
  const accountId = useAuthStore.getState().user?.accountId;
  if (!accountId) {
    throw new Error("Missing authenticated user accountId");
  }
  return accountId;
}

function getAuthHeaders(): Record<string, string> {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("Missing auth token");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export const deckService = {
  async getUserDecks(): Promise<Deck[]> {
    const accountId = getCurrentAccountId();
    console.log("deckService.getUserDecks accountId:", accountId);
    const url = `${API_BASE_URL}/accounts/${accountId}/decks`;
    console.log("deckService.getUserDecks url:", url);
    const response = await fetch(url, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    console.log("deckService.getUserDecks response status:", response.status);
    if (!response.ok) {
      const body = await response.text();
      console.error("deckService.getUserDecks response body:", body);
      throw new Error(
        `Failed to fetch decks: ${response.status} ${response.statusText}`,
      );
    }

    const apiDecks = (await response.json()) as DeckApiModel[];
    console.log("deckService.getUserDecks parsed decks:", apiDecks);
    return apiDecks.map(mapDeckFromApi);
  },

  async saveDeck(deck: Deck): Promise<Deck> {
    const payload: DeckPayload = {
      Name: deck.name,
      CardIds: deck.cards.flatMap((c) => Array(c.copies).fill(c.cardId)),
    };

    console.log(payload);
    const accountId = getCurrentAccountId();
    const response = await fetch(
      `${API_BASE_URL}/accounts/${accountId}/decks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to save deck: ${response.status} ${response.statusText}`,
      );
    }

    const savedApiDeck = (await response.json()) as DeckApiModel;
    return mapDeckFromApi(savedApiDeck);
  },
} as const;
