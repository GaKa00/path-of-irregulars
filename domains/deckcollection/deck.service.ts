import { mapDeckFromApi } from './deck.utils'
import type { Deck, DeckApiModel } from './deck.types'
import { useAuthStore } from '@/stores/auth.store'

const API_BASE_URL = 'https://localhost:7197'

type DeckPayload = {
  Name: string
  CardIds: string[]  
}


const accountId = useAuthStore.getState().user?.accountId;

export const deckService = {
  async getUserDecks(): Promise<Deck[]> {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/decks`)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch decks: ${response.status} ${response.statusText}`,
      )
    }

    const apiDecks = (await response.json()) as DeckApiModel[]
    return apiDecks.map(mapDeckFromApi)
  },

  async saveDeck(deck: Deck): Promise<Deck> {
    const payload: DeckPayload = {
      Name: deck.name,
      CardIds: deck.cards.flatMap(c => Array(c.copies).fill(c.cardId)),
    }

    console.log(payload);
    const response = await fetch(
      `${API_BASE_URL}/accounts/1007/decks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      throw new Error(
        `Failed to save deck: ${response.status} ${response.statusText}`,
      )
    }

    const savedApiDeck = (await response.json()) as DeckApiModel
    return mapDeckFromApi(savedApiDeck)
  },
} as const