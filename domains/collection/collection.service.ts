import { CardLibrary } from './collection.model'
import type { Card } from './collection.types'

export const cardLibraryService = {
  async getAllCards(): Promise<CardLibrary> {
    const response = await fetch('https://localhost:7197/cards')

    if (!response.ok) {
      throw new Error(`Failed to fetch cards: ${response.status} ${response.statusText}`)
    }

    const cards = (await response.json()) as Card[]

    return { cards }
  },
}