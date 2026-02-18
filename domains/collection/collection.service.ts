import { CardLibrary } from './collection.types'
import type { Card } from './collection.types'

export async function getAllCards(): Promise<CardLibrary> {
    const response = await fetch('https://localhost:7197/cards')
    if (!response.ok) {
      throw new Error(`Failed to fetch cards: ${response.status} ${response.statusText}`)
    }
    const cards = (await response.json()) as Card[]
    

    return { cards }
  
}

   export async function getCardById(id: string): Promise<Card> {
    const response = await fetch(`https://localhost:7197/cards/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch card: ${response.status} ${response.statusText}`)
    }
    const card = (await response.json()) as Card
    return card
  }
