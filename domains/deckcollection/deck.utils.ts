import { Deck, DeckApiModel } from "../game/deckselection/deck.types";

export function addCardToDeck(deck: Deck, cardId: string): Deck {
  const existing = deck.cards.find((c) => c.cardId === cardId);

  if (existing) {
    if (existing.copies >= 3) {
      return deck;
    }

    return {
      ...deck,
      cards: deck.cards.map((c) =>
        c.cardId === cardId ? { ...c, copies: c.copies + 1 } : c,
      ),
    };
  }

  if (deck.cards.length >= 30) {
    return deck;
  }

  return {
    ...deck,
    cards: [...deck.cards, { cardId, copies: 1 }],
  };
}

export function removeCardFromDeck(deck: Deck, cardId: string): Deck {
  const existing = deck.cards.find((c) => c.cardId === cardId);

  if (!existing) {
    return deck;
  }

  if (existing.copies > 1) {
    return {
      ...deck,
      cards: deck.cards.map((c) =>
        c.cardId === cardId
          ? {
              ...c,
              copies: c.copies - 1,
            }
          : c,
      ),
    };
  }
  return {
    ...deck,
    cards: deck.cards.filter((c) => c.cardId !== cardId),
  };
}

export function mapDeckFromApi(apiDeck: DeckApiModel): Deck {
  return {
    id: apiDeck.id,
    name: apiDeck.name,
    accountId: apiDeck.accountId,
    cards: apiDeck.cards.map((c) => ({
      cardId: c.cardId,
      copies: c.amount,
    })),
  };
}
