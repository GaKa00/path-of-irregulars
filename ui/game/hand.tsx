'use client'

import type { GameCard } from '@/domains/game/game.types'
import GameCardView from './gameCardView'

interface HandProps {
  cards: GameCard[]
  selectedCardIds?: string[]
  isMulliganMode?: boolean
  onCardClick?: (card: GameCard) => void
  maxCards?: number
}

export default function Hand({
  cards,
  selectedCardIds = [],
  isMulliganMode = false,
  onCardClick,
  maxCards = 10,
}: HandProps) {
  const isCardSelected = (cardId: string) => selectedCardIds.includes(cardId)

  return (
    <div className="panel w-full p-4">
      {/* Hand Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-100">Your Hand</h3>
          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
            {cards.length} / {maxCards}
          </span>
        </div>
        {isMulliganMode && (
          <span className="text-xs text-emerald-300">
            Select cards to swap ({selectedCardIds.length} selected)
          </span>
        )}
      </div>

      {/* Cards Container */}
      {cards.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40">
          <p className="text-sm text-slate-500">No cards in hand</p>
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {cards.map(card => (
            <div key={card.id} className="shrink-0">
              <GameCardView
                card={{ ...card, isSelected: isCardSelected(card.id) }}
                onClick={() => onCardClick?.(card)}
                size="medium"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
