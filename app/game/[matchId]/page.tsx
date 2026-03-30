"use client"

import GamePage from "../page";
import { useGameStore } from "@/stores/game.store";
import React, { useEffect } from "react";
import { getMatch } from "@/domains/game/game.service";



type GameRouteParams = {
  params: Promise<{
    matchId: string;
  }>;
};

export default function GameByMatchPage({ params }: GameRouteParams) {
  const { matchId } = React.use(params); 
  const match = useGameStore((s) => s.match);
  const setMatchDto = useGameStore((s) => s.setMatchDto);

  useEffect(() => {
    if (!matchId) return;

    // zustand may be empty on first render; prefer the route param as the source of truth.
    const matchIdInStore = match?.matchId;
    if (matchIdInStore && matchIdInStore === matchId) return;

    if (!matchIdInStore || matchIdInStore !== matchId) {
      getMatch(matchId)
        .then((m) => setMatchDto(m))
        .catch((err) => console.error("Failed to fetch match state:", err));
    }
  }, [match?.matchId, matchId, setMatchDto]);

  // For now we just reuse the existing GamePage shell
  return <GamePage />;
}

  