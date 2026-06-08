"use client";

import {
  createMatch,
  getUserDecks,
} from "@/domains/game/deckselection/deckselection.service";
import { useEffect, useState } from "react";
import { Deck } from "@/domains/game/deckselection/deck.types";
import { useGameStore } from "@/stores/game.store";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function DeckSelectPage() {
  const selectDeck = useGameStore((s) => s.selectDeck);
  const setMatch = useGameStore((s) => s.setMatch);
  const setMatchDto = useGameStore((s) => s.setMatchDto);
  const deckId = useGameStore((s) => s.deckId);
  const selectedDeck = useGameStore((s) => s.deckId);
  const [decks, setDecks] = useState<Deck[]>([]);

  const navigate = useRouter();

  function handleDeckSelect(deckId: number) {
    selectDeck(deckId);
    console.log(deckId);
  }

  async function handlePlay() {
    if (!deckId) {
      alert("Select a deck first");
      return;
    }
    if (!user?.accountId) {
      alert("You must be logged in to start a match");
      return;
    }

    const match = await createMatch({
      PlayerOneId: user.accountId,
      PlayerOneDeckId: deckId,
      PlayerTwoId: 1,
      PlayerTwoDeckId: 2,
    });

    setMatchDto(match);
    // If you want to keep opponentId in store too, set it here once backend includes it.
    setMatch(match.matchId, 1);

    navigate.push(`/game/${match.matchId}`);
  }

  const { user } = useAuthStore();

  useEffect(() => {
    console.log("DeckSelectPage useEffect user accountId:", user?.accountId);
    if (user?.accountId) {
      getUserDecks()
        .then((fetchedDecks) => {
          console.log("Fetched decks:", fetchedDecks);
          setDecks(fetchedDecks);
        })
        .catch((err) => {
          console.error("Failed to fetch user decks:", err);
        });
    }
  }, [user?.accountId]);

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <div className="flex flex-col items-center justify-center">
          <section className="panel px-6 py-8">
            <header className="mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                Deck Select
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-100">
                Select a deck to play
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decks.map((deck) => (
                <div
                  key={deck.id}
                  onClick={() => handleDeckSelect(deck.id)}
                  className={`panel px-6 py-6 cursor-pointer transition-all duration-200 
          ${
            selectedDeck === deck.id
              ? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500"
              : "hover:border-emerald-500/50 border-transparent"
          }`}
                >
                  <h3 className="text-lg font-semibold text-slate-100">
                    {deck.name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    {deck.cards?.reduce(
                      (sum, entry) => sum + entry.copies,
                      0,
                    ) || 0}{" "}
                    Cards
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handlePlay}
              disabled={!selectedDeck}
              className="mt-8 w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
