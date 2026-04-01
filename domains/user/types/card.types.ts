export interface CardDefinition {
  id: string;
  name: string;
  description: string;
  type: "Unit" | "Spell" | "Artifact"; // Use a string union for your C# Enum
  power: number;
  effects: CardEffect[];
}

export interface CardEffect {
  trigger: string;
  effectId: string;
  parameters: Record<string, number>;
}
export interface CardInstance {
  instanceId: string;
  definition: CardDefinition;
  power: number;
  isDestroyed: boolean;
  isUntargetable: boolean;

 
  equippedTo?: CardInstance | null;
  equippedArtifacts: CardInstance[];
}