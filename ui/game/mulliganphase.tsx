"use client";

import { Card } from "@/domains/user/types/collection.types";
import Hand from "./hand";
import { GameCard } from "@/domains/user/types/game.types";

interface MulliganPhaseProps {
  startingHand: GameCard[];
  selectedCardIds: string[];
  onCardToggle: (card: GameCard) => void;
  onConfirm: () => void;
  maxSwaps?: number;
}

export default function MulliganPhase({
  startingHand,
  selectedCardIds,
  onCardToggle,
  onConfirm,
  maxSwaps = 3,
}: MulliganPhaseProps) {
  const canConfirm =
    selectedCardIds.length > 0 && selectedCardIds.length <= maxSwaps;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="panel-accent mx-4 w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-emerald-200">
            Mulligan Phase
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Select up to {maxSwaps} cards from your starting hand to swap
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {selectedCardIds.length} of {maxSwaps} cards selected
          </p>
        </div>

        {/* Hand Display */}
        <div className="mb-6">
          <Hand
            cards={startingHand}
            selectedCardIds={selectedCardIds}
            isMulliganMode={true}
            onCardClick={onCardToggle}
            maxCards={10}
          />
        </div>

        {/* Instructions */}
        <div className="mb-6 rounded-lg border border-emerald-800/60 bg-slate-950/60 p-4">
          <p className="text-xs text-emerald-100/70">
            <strong className="text-emerald-200">How it works:</strong> Click on
            cards you want to swap. Selected cards will be returned to your deck
            and replaced with new ones. You can select up to {maxSwaps} cards.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={!canConfirm}
            className={`
              btn btn-primary flex-1 rounded-xl
              ${!canConfirm ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Confirm Swap ({selectedCardIds.length} cards)
          </button>
          {selectedCardIds.length === 0 && (
            <button onClick={onConfirm} className="btn btn-ghost rounded-xl">
              Keep All Cards
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
