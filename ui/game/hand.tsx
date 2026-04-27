"use client";

import type { GameCard } from "@/domains/user/types/game.types";
import GameCardView from "./gameCardView";
import { CardInstance } from "@/domains/user/types/card.types";
import { useState } from "react";

interface HandProps {
  cards: CardInstance[];
  onCardClick?: (card: CardInstance) => void;
}

export default function Hand({
  cards,

  onCardClick,
}: HandProps) {
  return (
    <div className="panel fixed bottom-8 left-[5vw] w-[90vw] p-4">
      {/* Hand Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-100">Your Hand</h3>
          <span className="rounded-full bg-slate-800 px-2 my-1 text-xs text-slate-300">
            {cards.length} / {10}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      {cards.length === 0 ? (
        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40">
          <p className="text-sm text-slate-500">No cards in hand</p>
        </div>
      ) : (
        <div className="flex gap-8 overflow-x-auto pl-3 py-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {cards.map((card) => (
            <div key={card.instanceId} className="shrink-0">
              <GameCardView
                card={{ ...card }}
                onClick={() => {
                  onCardClick?.(card);
                }}
                size="medium"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
