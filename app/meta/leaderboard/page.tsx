export default function LeaderboardPage() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <header className="top-bar">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
            <p className="text-sm text-slate-400">
              See how you stack up against other irregulars.
            </p>
          </div>
        </header>

        <main className="flex-1">
          <div className="panel p-6">
            <p className="text-sm text-slate-400">
              Ranked ladders and seasonal stats coming soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}