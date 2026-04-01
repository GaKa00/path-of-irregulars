"use client";

import { Card } from "@/domains/user/types/collection.types";
import CardComponent from "@/ui/card";

interface CardGridProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  selectedCardIds?: string[];
  columns?: 2 | 3 | 4 | 5;
  emptyMessage?: string;
}

export default function CardGrid({
  cards,
  onCardClick,
  selectedCardIds = [],
  columns = 4,
  emptyMessage = "No cards found",
}: CardGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  };

  const isCardSelected = (cardId: string) => selectedCardIds.includes(cardId);

  if (cards.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onCardClick?.(card)}
          className={`
            cursor-pointer transition-all duration-200
            ${onCardClick ? "hover:scale-105" : ""}
            ${isCardSelected(card.id) ? "ring-2 ring-emerald-500" : ""}
          `}
        >
          <CardComponent
            name={card.name}
            type={card.type}
            power={card.power || 0}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
}
