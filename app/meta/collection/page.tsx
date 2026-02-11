'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cardLibraryService } from '@/domains/collection/collection.service'
import { CardLibrary } from '@/domains/collection/collection.model'

export default function CollectionPage() {
  const [collection, setCollection] = useState<CardLibrary | null>(null)
  const router = useRouter()

  useEffect(() => {
    cardLibraryService.getAllCards().then(setCollection)
  }, [])

  const handleCreateDeck = () => {
    router.push('/meta/collection/decks/newdeck')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        {/* Top bar with back button and title */}
        <div className="top-bar">
          <button onClick={handleBack} className="btn btn-ghost">
            <span className="text-lg">&larr;</span>
            <span>Back</span>
          </button>

          <div className="text-right">
            <h1 className="text-2xl font-semibold tracking-tight">Collection</h1>
            <p className="text-sm text-slate-400">
              Cards owned:{' '}
              <span className="font-medium text-slate-100">{collection?.cards.length ?? 0}</span>
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid flex-1 gap-6 md:grid-cols-[2fr,1.2fr]">
          {/* Collection summary / placeholder area */}
          <div className="panel p-5">
            <h2 className="mb-2 text-lg font-semibold text-slate-100">Your Cards</h2>
            <p className="mb-4 text-sm text-slate-400">
              Browse and manage your card library. Deck building tools are on the right.
            </p>

            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/40 text-sm text-slate-500">
              Card grid coming soon
            </div>
          </div>

          {/* Deck creation UI */}
          <div className="panel-accent flex flex-col p-5">
            <h2 className="mb-1 text-lg font-semibold text-emerald-200">Create a new deck</h2>
            <p className="mb-4 text-xs text-emerald-100/70">
              Start a fresh strategy with a brand new deck built from your collection.
            </p>

            <button onClick={handleCreateDeck} className="btn btn-primary mb-4 rounded-xl">
              <span className="text-base">＋</span>
              <span>New Deck</span>
            </button>

            <div className="mt-1 flex-1 rounded-xl border border-emerald-800/60 bg-slate-950/60 px-3 py-3 text-xs text-emerald-100/70">
              <p className="mb-2 font-medium text-emerald-200">How it works</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Click &quot;New Deck&quot; to open the deck builder.</li>
                <li>Select cards from your collection to add them to the deck.</li>
                <li>Tune your list, then save it for play modes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

