'use client'

import { Deck } from '@/domains/deckcollection/deck.types'
import Link from 'next/link'

interface DeckCardProps {
  deck: Deck
  onEdit?: (deck: Deck) => void
  onDelete?: (deck: Deck) => void
  showActions?: boolean
}

export default function DeckCard({
  deck,
  onEdit,
  onDelete,
  showActions = true
}: DeckCardProps) {
  const cardCount = deck.cards.reduce((sum, entry) => sum + entry.copies, 0)
  const uniqueCardCount = deck.cards.length
  const isComplete = cardCount === 25

  // Get preview of first few cards
  const previewCards = deck.cards.slice(0, 3)

  return (
    <div className="panel group relative p-4 transition-all duration-200 hover:border-emerald-500/50">
      {/* Deck Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-100">{deck.name}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
            <span>
              {cardCount} / 25 cards
              {isComplete && (
                <span className="ml-1 text-emerald-400">✓</span>
              )}
            </span>
            <span>•</span>
            <span>{uniqueCardCount} unique</span>
          </div>
        </div>

        {/* Status Badge */}
        {isComplete ? (
          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-medium text-emerald-300">
            Ready
          </span>
        ) : (
          <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-medium text-slate-400">
            Incomplete
          </span>
        )}
      </div>

      {/* Card Preview */}
      {previewCards.length > 0 && (
        <div className="mb-3 flex gap-2">
          {previewCards.map((entry, index) => (
            <div
              key={entry.card.id}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-900/80 text-[10px] text-slate-400"
              title={entry.card.name}
            >
              {entry.copies > 1 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-emerald-500 px-1 text-[8px] text-slate-900">
                  {entry.copies}
                </span>
              )}
              {entry.card.name.charAt(0).toUpperCase()}
            </div>
          ))}
          {deck.cards.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-900/80 text-[10px] text-slate-400">
              +{deck.cards.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(deck)}
              className="btn btn-ghost flex-1 rounded-xl text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(deck)}
              className="btn btn-ghost rounded-xl text-sm text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}
