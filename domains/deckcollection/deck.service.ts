import { mapDeckFromApi } from './deck.utils'
import type { Deck, DeckApiModel } from './deck.types'

const API_BASE_URL = 'https://localhost:7197'

type DeckUpsertPayload = {
  id: Deck['id']
  name: Deck['name']
  accountId: Deck['accountId']
  cards: { cardId: string; amount: number }[]
}

export const deckService = {
  async getUserDecks(accountId: number): Promise<Deck[]> {
    const response = await fetch(`${API_BASE_URL}/account/${accountId}/decks`)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch decks: ${response.status} ${response.statusText}`,
      )
    }

    const apiDecks = (await response.json()) as DeckApiModel[]
    return apiDecks.map(mapDeckFromApi)
  },

  async saveDeck(deck: Deck): Promise<Deck> {
    const payload: DeckUpsertPayload = {
      id: deck.id,
      name: deck.name,
      accountId: deck.accountId,
      cards: deck.cards.map(c => ({ cardId: c.cardId, amount: c.copies })),
    }

    const response = await fetch(
      `${API_BASE_URL}/account/${deck.accountId}/decks`,
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