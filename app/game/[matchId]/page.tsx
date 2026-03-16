"use client"

import GamePage from "../page";



type GameRouteParams = {
  params: {
    matchId: string;
  };
};

export default function GameByMatchPage({ params }: GameRouteParams) {
  const { matchId } = params;

  // TODO: When backend supports instances, fetch by matchId + instanceId
  // const instanceId = ... // derive or read from store/query
  // useEffect(() => {
  //   // fetch(`https://localhost:7197/matches/${matchId}/instances/${instanceId}`)
  // }, [matchId, instanceId]);

  // For now we just reuse the existing GamePage shell
  return <GamePage />;
}

  