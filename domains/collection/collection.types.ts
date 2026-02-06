export type CardType =
  | 'climber'
  | 'spell'
  | 'artifact'

export type Card = {
  id: string
  name: string
  type: CardType
  power?: number
  description: string
  imageUrl: string
}