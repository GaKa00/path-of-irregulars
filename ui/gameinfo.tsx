'use client'

interface GameInfoProps {
  roundNumber: number
  turnNumber?: number
  cardsInDeck?: number
  cardsInHand?: number
  opponentCardsInHand?: number
}

export default function GameInfo({
  roundNumber,
  turnNumber,
  cardsInDeck,
  cardsInHand,
  opponentCardsInHand
}: GameInfoProps) {
  return (
    <div className="panel flex flex-wrap items-center justify-center gap-4 p-3">
      {/* Round Info */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Round</span>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
          {roundNumber}
        </span>
      </div>

      {/* Turn Info */}
      {turnNumber !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Turn</span>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
            {turnNumber}
          </span>
        </div>
      )}

      {/* Cards in Deck */}
      {cardsInDeck !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Deck</span>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
            {cardsInDeck}
          </span>
        </div>
      )}

      {/* Cards in Hand */}
      {cardsInHand !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Hand</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">
            {cardsInHand}
          </span>
        </div>
      )}

      {/* Opponent Cards in Hand */}
      {opponentCardsInHand !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Opponent Hand</span>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
            {opponentCardsInHand}
          </span>
        </div>
      )}
    </div>
  )
}
