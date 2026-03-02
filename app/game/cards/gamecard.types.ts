type GameCardInstance = {
  instanceId: string; // unique per copy
  cardId: string; // points back to base card
  zone: "deck" | "hand" | "board" | "graveyard";
  // other state: tapped, buffs, damage, etc.
};
