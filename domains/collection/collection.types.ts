export type CardType =
  | 'Climber'
  | 'Spell'
  | 'Artifact'

export type Card = {
  id: string
  name: string
  type: CardType
  power?: number
  description: string

}