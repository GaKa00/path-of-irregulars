"use client";

import { CardInstance } from "@/domains/user/types/card.types";

type GameCardViewProps = {
  card: CardInstance;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
};

const sizeClasses: Record<NonNullable<GameCardViewProps["size"]>, string> = {
  small: "h-48 w-40 p-3 text-xs",
  medium: "h-60 w-48 p-3.5 text-sm",
  large: "h-72 w-56 p-4 text-base",
};

export default function GameCardView({
  card,
  onClick,
  size = "medium",
}: GameCardViewProps) {
  const { definition, power, isDestroyed, isUntargetable } = card;
  const hasPower = !!power && power !== 0;
  const hasDescription = definition?.description;
  const isDisabled = isDestroyed || !onClick;

  const baseSize = sizeClasses[size];

  if (!definition) {
    return null; // Or render a placeholder
  }

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`
        group flex flex-col rounded-2xl border
        bg-linear-to-b from-slate-900 to-slate-950 shadow-lg
        ${baseSize}
        ${!isDestroyed ? "cursor-pointer hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]" : "cursor-not-allowed opacity-70"}
        ${!isUntargetable ? "ring-2 ring-emerald-500" : ""}
        border-slate-700 transition-all duration-150
      `}
    >
      {/* Top bar: name and power badge */}
      <div className="mb-2 flex items-start justify-between">
        <div className="max-w-[70%]">
          <h1 className="text-base font-semibold tracking-wide text-emerald-100">
            {definition.name}
          </h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-emerald-400/70">
            {definition.type}
          </p>
        </div>

        {hasPower && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500 bg-slate-950 text-xs font-bold text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
            {power}
          </div>
        )}
      </div>

      {/* Description pinned to bottom */}
      {hasDescription && (
        <div className="mt-auto rounded-xl border border-slate-700/60 bg-slate-900/70 p-2 text-[11px] leading-relaxed text-slate-200">
          {definition.description}
        </div>
      )}
    </button>
  );
}
