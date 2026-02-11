export default function MetaFooter() {
  return (
    <footer className="flex items-center justify-between rounded-xl border border-slate-800 bg-black/40 px-4 py-3 text-xs text-slate-300">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <p>UID: 1</p>
          <p>Version 0.1.0</p>
        </div>
        <p className="text-[11px] text-slate-500">
          © 2026 Path of Irregulars. Tower of God is owned by SIU and Naver WebToon.
        </p>
      </div>
      <button className="btn btn-ghost btn-icon border-red-500/60 text-[11px] text-red-400 hover:border-red-400 hover:text-red-300">
        Quit
      </button>
    </footer>
  );
}