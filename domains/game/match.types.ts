export type CardStateDto = {
  id: string;
  name: string;
  power: number;
};

export type LaneStateDto = {
  laneType: number;
  cards: CardStateDto[];
};

export type PlayerStateDto = {
  name: string;
  handSize: number;
  deckSize: number;
  totalPower: number;
  wonRounds: number;
  hasPassed: boolean;
  lanes: LaneStateDto[];
};

export type MatchDto = {
  matchId: string;
  gameState: number; // matches backend enum (1 in your sample)
  turnCount: number;
  activePlayer: string;
  logs: string[];
  playerOne: PlayerStateDto;
  playerTwo: PlayerStateDto;
};

