export type Deck = {
  id: number;
  name: string;
  accountId: number;
  cards: DeckCard[];
};

export type DeckCard = {
  cardId: string;
  copies: number;
};
export type DeckApiModel = {
  id: number;
  name: string;
  accountId: number;
  cards: {
    id: number;
    cardId: string;
    deckId: number;
    amount: number;
  }[];
};
