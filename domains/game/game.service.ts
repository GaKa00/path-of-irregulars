import type { MatchDto } from "./match.types";

export async function getMatch(matchId: string): Promise<MatchDto> {
  const response = await fetch(`https://localhost:7197/matches/${matchId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch match: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as MatchDto;
}