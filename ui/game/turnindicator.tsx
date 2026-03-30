'use client'

interface TurnIndicatorProps {
  currentPlayer: 'player' | 'opponent'
  playerName?: string
  opponentName?: string
  turnNumber?: number
  isWaiting?: boolean
}

export default function TurnIndicator({
  currentPlayer,
  playerName = 'You',
  opponentName = 'Opponent',
  turnNumber,
  isWaiting = false
}: TurnIndicatorProps) {
  const isPlayerTurn = currentPlayer === 'player'
  const displayName = isPlayerTurn ? playerName : opponentName

  return (
    <div className="panel-accent flex items-center justify-center gap-3 p-4">
      {/* Turn Indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isPlayerTurn
              ? 'bg-emerald-500 animate-pulse'
              : 'bg-slate-500'
          }`}
        />
        <span className="text-sm font-medium text-slate-200">
          {isWaiting ? 'Waiting for' : "It's"}{' '}
          <span className={isPlayerTurn ? 'text-emerald-300' : 'text-slate-300'}>
            {displayName}'s
          </span>{' '}
          turn
        </span>
      </div>

      {/* Turn Number */}
      {turnNumber !== undefined && (
        <div className="flex items-center gap-1 border-l border-emerald-800/60 pl-3">
          <span className="text-xs text-slate-400">Turn</span>
          <span className="text-sm font-semibold text-emerald-300">{turnNumber}</span>
        </div>
      )}
    </div>
  )
}
