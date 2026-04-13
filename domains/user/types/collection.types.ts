

export type Card = {
  id: string;
  name: string;
  type: number;
  power?: number;
  description: string;
};



export type CardLibrary = {
  cards: Card[];
};