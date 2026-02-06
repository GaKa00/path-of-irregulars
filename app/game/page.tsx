'use client'

import { useState } from 'react'
import GameBoard from '@/ui/gameboard'
import BoardField from '@/ui/boardfield'
import Hand from '@/ui/hand'
import TurnIndicator from '@/ui/turnindicator'
import PassButton from '@/ui/passbutton'
import RoundScore from '@/ui/roundscore'
import GameInfo from '@/ui/gameinfo'
import MulliganPhase from '@/ui/mulliganphase'
import { Card } from '@/domains/collection/collection.types'

// Mock data - will be replaced with actual state management later
const mockPlayerCards: Card[] = []
const mockOpponentCards: Card[] = []
const mockHand: Card[] = []
const mockStartingHand: Card[] = []

export default function GamePage() {
  const [isMulliganActive, setIsMulliganActive] = useState(false)
  const [selectedMulliganCards, setSelectedMulliganCards] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'opponent'>('player')
  const [roundNumber, setRoundNumber] = useState(1)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const handleMulliganCardToggle = (card: Card) => {
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

  const handleCardPlay = (card: Card) => {
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
          startingHand={mockStartingHand}
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
          <div className="text-sm text-slate-400">Cards in hand: ?</div>
        </div>
        <BoardField
          cards={mockOpponentCards}
          owner="opponent"
          totalPower={mockOpponentCards.reduce((sum, card) => sum + (card.power || 0), 0)}
        />
      </div>

      {/* Center Game Info Area */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <RoundScore
            playerScore={playerScore}
            opponentScore={opponentScore}
            currentRound={roundNumber}
            maxRounds={3}
          />
        </div>
        <div>
          <GameInfo
            roundNumber={roundNumber}
            turnNumber={1}
            cardsInDeck={25}
            cardsInHand={mockHand.length}
            opponentCardsInHand={undefined}
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
          cards={mockPlayerCards}
          owner="player"
          totalPower={mockPlayerCards.reduce((sum, card) => sum + (card.power || 0), 0)}
        />
      </div>

      {/* Player Hand */}
      <div className="mb-6">
        <Hand
          cards={mockHand}
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
