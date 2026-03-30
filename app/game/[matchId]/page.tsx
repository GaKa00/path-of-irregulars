"use client"

import GamePage from "../page";
import { useGameStore } from "@/stores/game.store";
import { use, useEffect } from "react";
import { getMatch } from "@/domains/game/game.service";



type GameRouteParams = {

  params: Promise<{
    matchId: string;
  }>;
};

export default function GameByMatchPage({ params }: GameRouteParams) {

  const { matchId } = use(params);
  const match = useGameStore((s) => s.match);
  const setMatchDto = useGameStore((s) => s.setMatchDto);

  // Debug: confirm the route param + store hydration timing
  useEffect(() => {
    console.log("[GameByMatchPage] matchId:", matchId, "store.matchId:", match?.matchId);
  }, [matchId, match?.matchId]);

  useEffect(() => {
    if (!matchId) return;

    // If zustand already has the right match, don't refetch.
    if (match?.matchId === matchId) return;

    console.log("[GameByMatchPage] Fetching match:", matchId);
    getMatch(matchId)
      .then((m) => {
        console.log("Fetched MatchDto:", m);
        setMatchDto(m);
      })
      .catch((err) =>
        console.error("Failed to fetch match state:", err),
      );
  }, [match?.matchId, matchId, setMatchDto]);

  // Debug: confirm the store was actually updated with the DTO
  useEffect(() => {
    if (!match) return;
    console.log("[GameByMatchPage] Store match updated:", match.matchId);
    console.log("[GameByMatchPage] Match:", match);
  }, [match]);


  return <GamePage />;
}

  