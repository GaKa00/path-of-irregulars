"use client"

import GamePage from "../page";
import { useGameStore } from "@/stores/game.store";



type GameRouteParams = {
  params: {
    matchId: string;
  };
};

export default function GameByMatchPage({ params }: GameRouteParams) {
  const { matchId } = params;
  const match = useGameStore((s) => s.match);

  // TODO: When backend supports instances, fetch by matchId + instanceId
  // const instanceId = ... // derive or read from store/query
  // useEffect(() => {
  //   // fetch(`https://localhost:7197/matches/${matchId}/instances/${instanceId}`)
  // }, [matchId, instanceId]);

  // If the user hard-refreshes, zustand state is lost. When you add a backend GET
  // endpoint (e.g. GET /matches/{matchId}) you can fetch it here if `match` is missing.
  // useEffect(() => {
  //   if (!match || match.matchId !== matchId) {
  //     // fetch(`https://localhost:7197/matches/${matchId}`)
  //   }
  // }, [match, matchId]);

  // For now we just reuse the existing GamePage shell
  return <GamePage />;
}

  