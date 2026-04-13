

export type LaneStateDto = {
  laneType: number;
  cards: CardStateDto[];
};

export type CardStateDto = {
  instanceId: string; 
  definition: CardDefinition;
  name: string; 
  power: number; 
  description: string | null;
};

export type CardDefinition = {
  name: string;
  type: string;
  power: number;
  description: string | null;
};
export type PlayerStateDto = {
  name: string;
  handSize: number;
  deckSize: number;
  totalPower: number;
  wonRounds: number;
  hasPassed: boolean;
  hand: CardStateDto[]; // Changed from the nested object structure
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
