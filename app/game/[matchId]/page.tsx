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


  useEffect(() => {
    console.log("[GameByMatchPage] matchId:", matchId, "store.matchId:", match?.matchId);
  }, [matchId, match?.matchId]);

  useEffect(() => {
    if (!matchId) return;

  
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


  useEffect(() => {
    if (!match) return;
    console.log("[GameByMatchPage] Store match updated:", match.matchId);
    console.log("[GameByMatchPage] Match:", match);
  }, [match]);


  return <GamePage />;
}

  