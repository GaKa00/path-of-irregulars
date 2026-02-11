import { Card } from '../collection/collection.types'
import { User } from '../user/types/User'
import { Deck } from './deck.types'



export function addCardToDeck(deck: Deck, card: Card): Deck {
    const existing = deck.cards.find(c => c.card.id === card.id)
  
    if (existing) {
      if (existing.copies >= 3) {
        return deck
      }
  
      return {
        ...deck,
        cards: deck.cards.map(c =>
          c.card.id === card.id
            ? { ...c, copies: c.copies + 1 }
            : c
        ),
      }
    }
  
    if (deck.cards.length >= 30) {
      return deck
    }
  
    return {
      ...deck,
      cards: [...deck.cards, { card, copies: 1 }],
    }
  }

  export function removeCardFromDeck(deck:Deck, card: Card) : Deck {

    const existing = deck.cards.find(c => c.card.id === card.id)
  
    if (!existing)
    {
      return deck;
    }

    if (existing.copies > 1) {
      return {
        ...deck,
        cards: deck.cards.map(c => c.card.id? {
          ...c, copies: c.copies -1
        } : c),
      }
    } 
    return {
      ...deck,
      cards: deck.cards.filter(c => c.card.id !== card.id),
    }
  }