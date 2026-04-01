"use client";

import { Card } from "@/domains/user/types/collection.types";

interface GameCardProps {
  card: Card;
  isPlayable?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

export default function GameCard({
  card,
  isPlayable = true,
  isSelected = false,
  isDisabled = false,
  onClick,
  size = "medium",
}: GameCardProps) {
  const sizeClasses = {
    small: "w-20 h-28 text-xs",
    medium: "w-32 h-44 text-sm",
    large: "w-40 h-56 text-base",
  };

  const baseClasses = `
    panel relative cursor-pointer transition-all duration-200
    ${sizeClasses[size]}
    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    ${isSelected ? "ring-2 ring-emerald-500 scale-105" : ""}
    ${isPlayable && !isDisabled ? "hover:scale-110 hover:ring-2 hover:ring-emerald-400" : ""}
    ${!isPlayable ? "opacity-70" : ""}
  `;

  return (
    <div
      className={baseClasses.trim()}
      onClick={!isDisabled && onClick ? onClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !isDisabled ? 0 : undefined}
    >
      {/* Card Image */}
      <div className="relative h-3/5 w-full overflow-hidden rounded-t-lg">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
            No Image
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="flex h-2/5 flex-col justify-between p-2">
        <div>
          <h3 className="font-semibold text-slate-100 line-clamp-1">
            {card.name}
          </h3>
          {card.power !== undefined && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs font-bold text-emerald-400">
                {card.power}
              </span>
              <span className="text-[10px] text-slate-400">power</span>
            </div>
          )}
        </div>

        {/* Card Type Badge */}
        <div className="mt-1">
          <span className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-slate-800 text-slate-300">
            {card.type}
          </span>
        </div>
      </div>

      {/* Ability Indicator */}
      {card.description && (
        <div className="absolute right-1 top-1">
          <div className="rounded-full bg-emerald-500/20 p-1">
            <span className="text-[8px] text-emerald-300">⚡</span>
          </div>
        </div>
      )}

      {/* Selected Overlay */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-emerald-500/10" />
      )}
    </div>
  );
}
