import type { MatchDto } from "./match.types";

export async function getMatch(matchId: string): Promise<MatchDto> {
  const response = await fetch(`https://localhost:7197/matches/${matchId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch match: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}

export async function passTurn(matchId: string, playerId: number): Promise<MatchDto> {
  const response = await fetch(
    `https://localhost:7197/matches/${matchId}/players/${playerId}/passTurn`,
    {
      method: "PUT",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to pass turn: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}

export async function playCard(matchId: string, playerId: number, cardId: string, laneId?: string | null, targetId?: string | null ): Promise<MatchDto> {
  const response = await fetch(
    `https://localhost:7197/matches/${matchId}/players/${playerId}/playCard`,
    {
      method: "PUT",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to play card: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}

export async function endTurn(matchId: string, playerId: number): Promise<MatchDto> {
  const response = await fetch(
    `https://localhost:7197/matches/${matchId}/players/${playerId}/endTurn`,
    {
      method: "PUT",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to end turn: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}

export async function startTurn(matchId: string, playerId: number): Promise<MatchDto> {
  const response = await fetch(
    `https://localhost:7197/matches/${matchId}/players/${playerId}/startTurn`,
    {
      method: "PUT",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to start turn: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}