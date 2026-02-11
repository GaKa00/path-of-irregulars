'use client'

interface RoundScoreProps {
  playerScore: number
  opponentScore: number
  currentRound: number
  maxRounds?: number
  playerName?: string
  opponentName?: string
}

export default function RoundScore({
  playerScore,
  opponentScore,
  currentRound,
  maxRounds = 3,
  playerName = 'You',
  opponentName = 'Opponent'
}: RoundScoreProps) {
  const rounds = Array.from({ length: maxRounds }, (_, i) => i + 1)
  const playerWins = playerScore
  const opponentWins = opponentScore

  const getRoundStatus = (roundNum: number) => {
    if (roundNum < currentRound) {
      // Past round - determine winner
      if (roundNum <= playerWins) return 'player-won'
      if (roundNum <= opponentWins) return 'opponent-won'
      return 'tie'
    }
    if (roundNum === currentRound) return 'current'
    return 'pending'
  }

  return (
    <div className="panel w-full p-4">
      <div className="mb-3 text-center">
        <h3 className="text-sm font-semibold text-slate-100">Match Score</h3>
        <p className="mt-1 text-xs text-slate-400">
          Best of {maxRounds} • Round {currentRound}
        </p>
      </div>

      {/* Score Display */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-300">{playerScore}</div>
          <div className="text-xs text-slate-400">{playerName}</div>
        </div>
        <div className="text-lg text-slate-500">vs</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-300">{opponentScore}</div>
          <div className="text-xs text-slate-400">{opponentName}</div>
        </div>
      </div>

      {/* Round Indicators */}
      <div className="flex items-center justify-center gap-2">
        {rounds.map((roundNum) => {
          const status = getRoundStatus(roundNum)
          const statusClasses = {
            'player-won': 'bg-emerald-500/20 border-emerald-500',
            'opponent-won': 'bg-slate-700 border-slate-600',
            'current': 'bg-emerald-500 border-emerald-400 animate-pulse',
            'pending': 'bg-slate-800 border-slate-700',
            'tie': 'bg-slate-700 border-slate-600'
          }

          return (
            <div
              key={roundNum}
              className={`
                flex h-8 w-8 items-center justify-center rounded-full border-2
                text-xs font-semibold
                ${statusClasses[status]}
                ${status === 'player-won' ? 'text-emerald-300' : ''}
                ${status === 'opponent-won' ? 'text-slate-400' : ''}
                ${status === 'current' ? 'text-slate-900' : ''}
                ${status === 'pending' ? 'text-slate-500' : ''}
              `}
            >
              {status === 'player-won' && '✓'}
              {status === 'opponent-won' && '✗'}
              {status === 'current' && roundNum}
              {status === 'pending' && roundNum}
            </div>
          )
        })}
      </div>
    </div>
  )
}
