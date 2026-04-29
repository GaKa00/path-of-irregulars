'use client'

import { useGameStore } from "@/stores/game.store"

interface TurnIndicatorProps {
  turnNumber?: number

}

export default function TurnIndicator({
  turnNumber,
}: TurnIndicatorProps) {
  const match = useGameStore((s) => s.match);
  const displayName = match?.activePlayer;


  return (
    <div className="panel-accent flex items-center justify-center gap-3 p-4">
      {/* Turn Indicator */}
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full bg-emerald-500 animate-pulse`}/>
        <span className="text-sm font-medium text-slate-200">
           {"It's"}{' '}
          <span className= 'text-emerald-300' >
            {displayName}&apos;s
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
