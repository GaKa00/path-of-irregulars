import { Deck } from "@/domains/deckcollection/deck.types"

export type User = {
    id: string
    username: string
    password: string
    createdAt: Date
    Decks: Deck[];
    
}