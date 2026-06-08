"use client";

import { CardInstance } from "@/domains/user/types/card.types";
import type { LaneStateDto } from "@/domains/user/types/match.types";
import GameCardView from "./gameCardView";

interface BoardFieldProps {
  lanes?: LaneStateDto[];
  owner: "player" | "opponent";
  totalPower?: number;
  onCardClick?: (card: CardInstance) => void;
  onLaneClick?: (laneIndex: number) => void;
  selectableLanes?: boolean;
}

const LANE_NAMES = ["Melee", "Ranged", "Siege"];

export default function BoardField({
  lanes,
  owner,
  totalPower,
  onCardClick,
  onLaneClick,
  selectableLanes = false,
}: BoardFieldProps) {
  const displayPower = totalPower ?? 0;
  const laneCount = lanes?.length ?? 3;
  console.log("BoardField render", {
    owner,
    selectableLanes,
    laneCount,
    lanes,
    totalPower,
  });


  // if (!lanes) {
  //   return (
  //     <div className="panel w-full p-4">
  //       <div className="text-sm text-slate-500">Loading board...</div>
  //     </div>
  //   );
  // }

  return (
    <div className={`panel w-full p-4 transition-all ${
      selectableLanes
        ? "ring-2 ring-emerald-500/30 bg-slate-900/75 shadow-inner shadow-emerald-500/10"
        : "bg-slate-900/30"
    }`}>
      {/* Field Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100 capitalize">
          {owner === "player" ? "Your" : "Opponent's"} Field
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Total Power:</span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-300">
            {displayPower}
          </span>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: laneCount }).map((_, laneIndex) => {
          const lane = lanes?.[laneIndex];
          const laneCards = lane?.cards ?? [];
          const lanePower = laneCards.reduce(
            (sum, c) => sum + (c.power || 0),
            0,
          );

          return (
            <div
              key={laneIndex}
              className={`
                flex flex-col rounded-lg border border-slate-700/50 
                bg-slate-900/30 p-3 transition-all
                ${selectableLanes ? "cursor-pointer hover:border-emerald-500 hover:bg-slate-800/50" : ""}
              `}
              onClick={() => selectableLanes && onLaneClick?.(laneIndex)}
            >
              {/* Lane Header */}
              <div className="mb-2 flex items-center justify-between border-b border-slate-700/50 pb-2">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  {LANE_NAMES[laneIndex] || `Lane ${laneIndex + 1}`}
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  {lanePower}
                </span>
              </div>

              {/* Lane Cards */}
              {laneCards.length === 0 ? (
                <div className="flex h-24 items-center justify-center rounded border border-dashed border-slate-700/50 bg-slate-950/20">
                  <p className="text-xs text-slate-500">
                    {selectableLanes ? "Click to play here" : "Empty"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {laneCards.map((card) => (
                    <GameCardView
                      key={card.instanceId}
                      card={card}
                      onClick={
                        onCardClick ? () => onCardClick(card) : undefined
                      }
                      size="small"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
