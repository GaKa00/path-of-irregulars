import { Card } from '../collection/collection.types'

export type DeckCard = {
  card: Card
  copies: number
}

export type Deck = {
  id: string
  name: string
  cards: DeckCard[]
}
