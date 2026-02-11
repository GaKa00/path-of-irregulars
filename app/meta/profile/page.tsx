export default function ProfilePage() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <header className="top-bar">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <p className="text-sm text-slate-400">
              Manage your identity, preferences, and stats.
            </p>
          </div>
        </header>

        <main className="flex-1 grid gap-6 md:grid-cols-2">
          <section className="panel p-6">
            <h2 className="mb-2 text-lg font-semibold text-slate-100">Account</h2>
            <p className="text-sm text-slate-400">
              Account settings and linked identities coming soon.
            </p>
          </section>

          <section className="panel p-6">
            <h2 className="mb-2 text-lg font-semibold text-slate-100">Stats</h2>
            <p className="text-sm text-slate-400">
              Lifetime stats, favorite decks, and more coming soon.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
