"use client";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <header className="w-full border-b border-slate-800 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Meta
          </span>
          <h1 className="text-base font-semibold text-slate-100">Path of Irregulars</h1>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/meta/friends" className="text-slate-300 hover:text-emerald-300">
              Friends
            </Link>
            <Link href="/meta/leaderboard" className="text-slate-300 hover:text-emerald-300">
              Leaderboard
            </Link>
            <Link href="/meta/profile" className="text-slate-300 hover:text-emerald-300">
              {user?.username}
            </Link>
          </div>
        ) : (
          <div className="text-xs text-slate-500">
            {/* Consider redirecting to login if unauthenticated */}
            Not signed in
          </div>
        )}
      </nav>
    </header>
  )
}