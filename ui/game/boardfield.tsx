'use client'

import { Card } from '@/domains/collection/collection.types'
import GameCard from './gamecard'

interface BoardFieldProps {
  cards: Card[]
  owner: 'player' | 'opponent'
  totalPower?: number
  onCardClick?: (card: Card) => void
}

export default function BoardField({
  cards,
  owner,
  totalPower,
  onCardClick
}: BoardFieldProps) {
  const calculatedPower = cards.reduce((sum, card) => sum + (card.power || 0), 0)
  const displayPower = totalPower !== undefined ? totalPower : calculatedPower

  return (
    <div className="panel w-full p-4">
      {/* Field Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100 capitalize">
          {owner === 'player' ? 'Your' : "Opponent's"} Field
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Total Power:</span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-300">
            {displayPower}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      {cards.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40">
          <p className="text-sm text-slate-500">No cards played</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              isPlayable={false}
              onClick={onCardClick ? () => onCardClick(card) : undefined}
              size="small"
            />
          ))}
        </div>
      )}
    </div>
  )
}
