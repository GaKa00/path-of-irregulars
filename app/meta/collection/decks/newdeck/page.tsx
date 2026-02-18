'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Card } from '@/domains/collection/collection.types'
import { Deck } from '@/domains/deckcollection/deck.types'
import { addCardToDeck, removeCardFromDeck } from '@/domains/deckcollection/deck.utils'
import { getAllCards } from '@/domains/collection/collection.service'

import CardView from '@/ui/card'
import { deckService } from '@/domains/deckcollection/deck.service'

const emptyDeck: Deck = {
  id: 0,
  name: 'New Deck',
  accountId: 0,
  cards: [],
}

export default function NewDeckPage() {
  const [deck, setDeck] = useState<Deck>(emptyDeck)
  const [cards, setCards] = useState<Card[]>([])
  const router = useRouter()
  
  
  const handleSaveDeck = () => {
    deckService.saveDeck(deck).then(res => {
      router.push(`/meta/collection/decks/${res.id}`)
    })
  }
  useEffect(() => {
   getAllCards().then(res => {
      setCards(res.cards)
    })
  }, [])

  const handleAddCard = (cardId: string) => {
    setDeck(d => addCardToDeck(d, cardId))
  }

  const handleRemoveCard = (cardId: string) => {
    setDeck(d => removeCardFromDeck(d, cardId))
  }

  const handleBack = () => {
    router.back()
  }

  const totalCards = deck.cards.reduce((sum, entry) => sum + entry.copies, 0)

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        {/* Top bar */}
        <div className="top-bar">
          <button onClick={handleBack} className="btn btn-ghost">
            <span className="text-lg">&larr;</span>
            <span>Back</span>
          </button>

          <div className="text-right">
            <h1 className="text-2xl font-semibold tracking-tight">
              {deck.name}
            </h1>
            <p className="text-sm text-slate-400">
              {totalCards} / 40 cards
            </p>
          </div>
        </div>

        <div className="grid flex-1 gap-6 md:grid-cols-[2fr,1.3fr]">
          {/* Card browser */}
          <section className="panel p-5">
            <h2 className="mb-3 text-lg font-semibold text-slate-100">
              Card Library
            </h2>
            <p className="mb-4 text-sm text-slate-400">
              Click a card to add it to your deck.
            </p>
            <div className="grid max-h-105 grid-cols-2 gap-2 overflow-y-auto pr-1 text-sm md:grid-cols-3">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleAddCard(card.id)}
                  className="btn btn-ghost justify-between rounded-xl border-slate-700 bg-slate-900/80 px-3 py-2 text-left text-xs hover:border-emerald-500"
                >
                  <CardView
                    key={card.id}
                    name={card.name}
                    type={card.type}
                    power={card.power ?? 0}
                    description={card.description}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Current deck side panel */}
          <aside className="panel-accent flex flex-col p-5">
            <h2 className="mb-2 text-lg font-semibold text-emerald-200">
              Deck list
            </h2>
            <p className="mb-4 text-xs text-emerald-100/70">
              Tap a card in the list to remove it.
            </p>

            <div className="flex-1 overflow-y-auto rounded-xl bg-slate-950/60 p-3 text-xs">
              {deck.cards.length === 0 ? (
                <p className="text-slate-500">No cards added yet.</p>
              ) : (
                <ul className="space-y-1">
                  {deck.cards.map((entry) => (
                    <li key={`${entry.cardId}`}>
                      <button
                        onClick={() => handleRemoveCard(entry.cardId)}
                        className="flex w-full items-center justify-between rounded-lg border border-emerald-800/60 bg-slate-900/80 px-2 py-1 hover:bg-slate-900"
                      >
                        <span className="text-emerald-100">
                        {entry.cardId} x {entry.copies}
                        </span>
                        <span className="text-[10px] text-emerald-300">
                          Remove
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button className="btn btn-primary mt-4 rounded-xl text-sm" onClick={handleSaveDeck}>
              Save deck (stub)
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
