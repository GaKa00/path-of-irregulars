import { CardLibrary } from "../user/types/collection.types";
import type { Card } from "../user/types/collection.types";
import { API_BASE_URL } from "@/config/api";

export async function getAllCards(): Promise<CardLibrary> {
  const response = await fetch(`${API_BASE_URL}/cards`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch cards: ${response.status} ${response.statusText}`,
    );
  }
  const cards = (await response.json()) as Card[];

  return { cards };
}

export async function getCardById(id: string): Promise<Card> {
  const response = await fetch(`${API_BASE_URL}/cards/${id}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch card: ${response.status} ${response.statusText}`,
    );
  }
  const card = (await response.json()) as Card;
  return card;
}
