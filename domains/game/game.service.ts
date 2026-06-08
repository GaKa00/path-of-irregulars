import type { MatchDto } from "../user/types/match.types";
import { useAuthStore } from "@/stores/auth.store";
import { API_BASE_URL } from "@/config/api";

function getAuthHeaders(): Record<string, string> {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("Missing auth token");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getMatch(matchId: string): Promise<MatchDto> {
  const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch match: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as MatchDto;
}

export async function passTurn(
  matchId: string,
  playerId: number,
): Promise<MatchDto> {
  const url = `${API_BASE_URL}/matches/${matchId}/players/${playerId}/passTurn`;
  console.log("passTurn request:", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
  });
  console.log("passTurn response status:", response.status);
  if (!response.ok) {
    const body = await response.text();
    console.error("passTurn response body:", body);
    throw new Error(
      `Failed to pass turn: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as MatchDto;
}

export async function playCard(
  matchId: string,
  playerId: number,
  cardId: string,
  cardInstanceId: string,
  laneId?: string | null,
  targetId?: string | null,
): Promise<MatchDto> {
  const params = new URLSearchParams({
    cardId,
    instanceId: cardInstanceId,
  });
  if (laneId) params.append("laneId", laneId);
  if (targetId) params.append("targetId", targetId);

  const url = `${API_BASE_URL}/matches/${matchId}/players/${playerId}/playCard?${params}`;
  console.log("playCard request:", url);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to play card: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }
  return (await response.json()) as MatchDto;
}

export async function endTurn(
  matchId: string,
  playerId: number,
): Promise<MatchDto> {
  const url = `${API_BASE_URL}/matches/${matchId}/players/${playerId}/endTurn`;
  console.log("endTurn request:", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    console.error("endTurn response body:", body);
    throw new Error(
      `Failed to end turn: ${response.status} ${response.statusText}`,
    );
  }
  console.log("Turn ended successfully for playerId:", playerId);
  return (await response.json()) as MatchDto;
}

export async function startTurn(
  matchId: string,
  playerId: number,
): Promise<MatchDto> {
  const url = `${API_BASE_URL}/matches/${matchId}/players/${playerId}/startTurn`;
  console.log("startTurn request:", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    console.error("startTurn response body:", body);
    throw new Error(
      `Failed to start turn: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as MatchDto;
}
