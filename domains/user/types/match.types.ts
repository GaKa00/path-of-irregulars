import { CardInstance } from "./card.types";

export interface LaneStateDto {
  laneType: number;
  cards: CardInstance[]; 
}

export interface PlayerStateDto {
  name: string;
  handSize: number;
  deckSize: number;
  hand: CardInstance[];
  graveyard: CardInstance[];
  lanes: LaneStateDto[];
  totalPower: number;
  wonRounds: number;
  hasPassed: boolean;
}

export interface MatchDto {
  matchId: string;
  gameState: number;
  turnCount: number;
  activePlayer: string;
  logs: string[];
  playerOne: PlayerStateDto;
  playerTwo: PlayerStateDto;
}