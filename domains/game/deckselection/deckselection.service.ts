import { Deck } from "@/domains/deckcollection/deck.types"
import { useAuthStore } from "@/stores/auth.store";

const accountId = useAuthStore.getState().user?.accountId;

export async function getUserDecks(): Promise<Deck[]> {
    const response = await fetch(`https://localhost:7197/accounts/${accountId}/decks`)
    if (!response.ok) {
        throw new Error(`Failed to fetch decks: ${response.status} ${response.statusText}`)
    }
    const decks = (await response.json()) as Deck[]
    return decks
}