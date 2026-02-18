"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllCards } from "@/domains/collection/collection.service";
import { CardLibrary } from "@/domains/collection/collection.types";
import CollectionNavbar from "@/ui/meta/collectionNavbar";
import CardCollection from "@/ui/meta/cardcollection";

export default function CollectionPage() {
  const [collection, setCollection] = useState<CardLibrary | null>(null);
  const router = useRouter();

  useEffect(() => {
    getAllCards().then(setCollection);
  }, []);

  const handleCreateDeck = () => {
    router.push("/meta/collection/decks/newdeck");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        {/* Top bar with back button and title */}
<CollectionNavbar handleBack={handleBack} collection={collection} />

        {/* Main content */}
        <div className="grid flex-1 gap-6 md:grid-cols-[2fr,1.2fr]">
          {/* Collection summary / placeholder area */}
          <CardCollection collection={collection} />

          {/* Deck creation UI */}
          <div className="panel-accent flex flex-col p-5">
            <h2 className="mb-1 text-lg font-semibold text-emerald-200">
              Create a new deck
            </h2>
            <p className="mb-4 text-xs text-emerald-100/70">
              Start a fresh strategy with a brand new deck built from your
              collection.
            </p>

            <button
              onClick={handleCreateDeck}
              className="btn btn-primary mb-4 rounded-xl"
            >
              <span className="text-base">＋</span>
              <span>New Deck</span>
            </button>

            <div className="mt-1 flex-1 rounded-xl border border-emerald-800/60 bg-slate-950/60 px-3 py-3 text-xs text-emerald-100/70">
              <p className="mb-2 font-medium text-emerald-200">How it works</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Click &quot;New Deck&quot; to open the deck builder.</li>
                <li>
                  Select cards from your collection to add them to the deck.
                </li>
                <li>Tune your list, then save it for play modes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
