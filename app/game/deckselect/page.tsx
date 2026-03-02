export default function DeckSelectPage() {
  return (
    <>
      <div className="page-shell">
        <div className="page-shell-inner">
          <div className="flex flex-col items-center justify-center">
            <section className="panel max-w-md px-6 py-6">
              <header className="mb-4 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                  Deck Select
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-100">
                  Select a deck to play
                </h2>
               
              </header>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}