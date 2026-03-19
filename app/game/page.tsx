'use client'

import { useState } from 'react'
import GameBoard from '@/ui/game/gameboard'
import BoardField from '@/ui/game/boardfield'
import Hand from '@/ui/game/hand'
import TurnIndicator from '@/ui/game/turnindicator'
import PassButton from '@/ui/game/passbutton'
import RoundScore from '@/ui/game/roundscore';
import GameInfo from '@/ui/game/gameinfo';
import MulliganPhase from '@/ui/game/mulliganphase';
import { GameCard } from '@/domains/game/game.types';
import { useGameStore } from '@/stores/game.store'

export default function GamePage() {
  const [isMulliganActive, setIsMulliganActive] = useState(false)
  const [selectedMulliganCards, setSelectedMulliganCards] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'opponent'>('player')
  const [roundNumber, setRoundNumber] = useState(1)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const match = useGameStore((s) => s.match);
  const opponentHandSize = match?.playerTwo.handSize;
  const playerHandSize = match?.playerOne.handSize;
  const opponentDeckSize = match?.playerTwo.deckSize;
  const playerDeckSize = match?.playerOne.deckSize;
  const opponentTotalPower = match?.playerTwo.totalPower;
  const playerTotalPower = match?.playerOne.totalPower;
  const opponentWonRounds = match?.playerTwo.wonRounds;
  const playerWonRounds = match?.playerOne.wonRounds;
  const opponentHasPassed = match?.playerTwo.hasPassed;
  const playerHasPassed = match?.playerOne.hasPassed;
  const opponentLanes = match?.playerTwo.lanes;
  const playerLanes = match?.playerOne.lanes;
 

  const handleMulliganCardToggle = (card: GameCard) => {
    setSelectedMulliganCards((prev) => {
      if (prev.includes(card.id)) {
        return prev.filter((id) => id !== card.id)
      }
      if (prev.length < 3) {
        return [...prev, card.id]
      }
      return prev
    })
  }

  const handleMulliganConfirm = () => {
    // TODO: Call backend endpoint to swap cards
    setIsMulliganActive(false)
    setSelectedMulliganCards([])
  }

  const handleCardPlay = (card: GameCard) => {
    // TODO: Call backend playcard endpoint
    console.log('Playing card:', card)
  }

  const handlePass = () => {
    // TODO: Call backend endturn endpoint
    setCurrentPlayer(currentPlayer === 'player' ? 'opponent' : 'player')
  }

  return (
    <GameBoard>
      {/* Mulligan Phase Overlay */}
      {isMulliganActive && (
        <MulliganPhase
          startingHand={[]}
          selectedCardIds={selectedMulliganCards}
          onCardToggle={handleMulliganCardToggle}
          onConfirm={handleMulliganConfirm}
          maxSwaps={3}
        />
      )}

      {/* Opponent Area (Top) */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200">Opponent</h2>
          <div className="text-sm text-slate-400">Cards in hand: {opponentHandSize}</div>
        </div>
        <BoardField
          cards={[]}
          owner="opponent"
          totalPower={opponentTotalPower ?? 0}
        />
      </div>

      {/* Center Game Info Area */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <RoundScore
            playerScore={playerWonRounds ?? 0}
            opponentScore={opponentWonRounds ?? 0}
            currentRound={roundNumber ?? 1}
            maxRounds={3}
          />
        </div>
        <div>
          <GameInfo
            roundNumber={roundNumber ?? 1}
            turnNumber={1}
            cardsInDeck={playerDeckSize ?? 0}
            cardsInHand={playerHandSize ?? 0}
            opponentCardsInHand={opponentHandSize ?? 0}
          />
        </div>
      </div>

      {/* Turn Indicator */}
      <div className="mb-6">
        <TurnIndicator
          currentPlayer={currentPlayer}
          playerName="You"
          opponentName="Opponent"
          turnNumber={1}
          isWaiting={currentPlayer !== 'player'}
        />
      </div>

      {/* Player Area (Bottom) */}
      <div className="mb-6">
        <BoardField
          cards={[]}
          owner="player"
          totalPower={0}
        />
      </div>

      {/* Player Hand */}
      <div className="mb-6">
        <Hand
          // TODO: Map backend CardStateDto -> GameCard with full card info
          cards={playerLanes?.flatMap((lane) => lane.cards) as any || []}
          selectedCardIds={[]}
          isMulliganMode={false}
          onCardClick={handleCardPlay}
          maxCards={10}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <PassButton
          isPlayerTurn={currentPlayer === 'player'}
          onClick={handlePass}
          disabled={false}
        />
      </div>
    </GameBoard>
  )
}
