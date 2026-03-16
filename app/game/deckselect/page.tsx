"use client";

import { getUserDecks } from "@/domains/game/deckselection/deckselection.service";
import { useEffect, useState } from "react";
import { Deck } from "@/domains/deckcollection/deck.types";
import { useGameStore } from "@/stores/game.store";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function DeckSelectPage() {
  const selectDeck = useGameStore((s) => s.selectDeck);
  const setMatch = useGameStore((s) => s.setMatch);
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

    const response = await fetch(
      `https://localhost:7197/matches`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PlayerOneId: user?.accountId,
          PlayerOneDeckId: deckId,
          PlayerTwoId: 1,
          PlayerTwoDeckId: 2,
        }),
      },
    );

    const data = await response.json();

    setMatch(data.gameId, data.opponentId);

    navigate.push(`/game`);
  }


const { user } = useAuthStore();


useEffect(() => {
  if (user?.accountId) {
    getUserDecks()
      .then(setDecks)
      .catch((err) => console.error(err));
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
                    {deck.cards?.length || 0} Cards
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
