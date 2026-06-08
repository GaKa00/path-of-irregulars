"use client";

import { useState } from "react";
import GameBoard from "@/ui/game/gameboard";
import BoardField from "@/ui/game/boardfield";
import Hand from "@/ui/game/hand";
import TurnIndicator from "@/ui/game/turnindicator";
import PassButton from "@/ui/game/passbutton";
import RoundScore from "@/ui/game/roundscore";
import GameInfo from "@/ui/game/gameinfo";
import MulliganPhase from "@/ui/game/mulliganphase";
import { GameCard } from "@/domains/user/types/game.types";
import { useGameStore } from "@/stores/game.store";
import { endTurn, passTurn, playCard } from "@/domains/game/game.service";
import { useAuthStore } from "@/stores/auth.store";
import { CardInstance } from "@/domains/user/types/card.types";

export default function GamePage() {
  const [isMulliganActive, setIsMulliganActive] = useState(false);
  const [selectedMulliganCards, setSelectedMulliganCards] = useState<string[]>(
    [],
  );


  const [roundNumber] = useState(1);
  const [pendingCard, setPendingCard] = useState<CardInstance | null>(null);

  const match = useGameStore((s) => s.match);
  const setMatchDto = useGameStore((s) => s.setMatchDto);
  const opponentHandSize = match?.playerTwo.handSize;
  const playerHandSize = match?.playerOne.handSize;
  const playerDeckSize = match?.playerOne.deckSize;
  const opponentTotalPower = match?.playerTwo.totalPower;
  const opponentWonRounds = match?.playerTwo.wonRounds;
  const playerWonRounds = match?.playerOne.wonRounds;



  const playerId = useAuthStore((s) => s.user?.accountId);
  const playerName = useAuthStore((s) => s.user?.username);
const currentPlayer = match?.activePlayer ?? "";
  console.log("GamePage Render - matchId:", match?.matchId, "playerId:", playerId, "playerName:", playerName);

  const handleMulliganCardToggle = (card: GameCard) => {
    setSelectedMulliganCards((prev) => {
      if (prev.includes(card.id)) {
        return prev.filter((id) => id !== card.id);
      }
      if (prev.length < 3) {
        return [...prev, card.id];  
      }
      return prev;
    });
  };

  const handleMulliganConfirm = () => {
    // TODO: Call backend endpoint to swap cards
    setIsMulliganActive(false);
    setSelectedMulliganCards([]);
  };

  const handleCardPlay = (card: CardInstance) => {

    if (currentPlayer !==  playerName) {
      alert("Not your turn");
      return;
    }
    setPendingCard(card);
  };

  const handleLaneSelect = async (laneIndex: number) => {
    if (!pendingCard || !match?.matchId || !playerId) {
      console.error("Missing required data:", {
        pendingCard: !!pendingCard,
        matchId: match?.matchId,
        playerId,
      });
      return;
    }

    try {
      const updatedMatch = await playCard(
        match.matchId,
        playerId,
        pendingCard.definition.id, 
        laneIndex.toString(),
        null,
      );
      setMatchDto(updatedMatch);
      console.log("Card played successfully:", pendingCard.definition.name);
    } catch (err) {
      console.error("Failed to play card:", err);
    } finally {
      setPendingCard(null);
      endTurn(match.matchId, playerId);
    }
  };

  const handlePass = () => {
    if (currentPlayer === playerName) {
      passTurn(match?.matchId ?? "", playerId ?? 0);
    } else {
      alert("Not your turn");
    }

  };

  return (
    <GameBoard>
     
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
          <div className="text-sm text-slate-400">
            Cards in hand: {opponentHandSize}
          </div>
        </div>
        <BoardField
          lanes={match?.playerTwo.lanes}
          owner="opponent"
          totalPower={opponentTotalPower ?? 0}
        />
      </div>

   
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

   
      <div className="mb-6">
        <TurnIndicator
          turnNumber={1}
        />
      </div>

      <div className="mb-6">
        <BoardField
          lanes={match?.playerOne.lanes}
          owner="player"
          totalPower={match?.playerOne.totalPower ?? 0}
          selectableLanes={!!pendingCard}
          onLaneClick={handleLaneSelect}
        />
      </div>

      {/* Player Hand */}
      <div className="mb-6">
        <Hand
          cards={match?.playerOne.hand ?? []}
          onCardClick={handleCardPlay}
        />
      </div>

   
      <div className="flex justify-center">
        <PassButton
          isPlayerTurn={currentPlayer === playerName}
          onClick={handlePass}
          disabled={false}
        />
      </div>
    </GameBoard>
  );
}
