export default function Card({
  name,
  type,
  power,
  description,
}: {
  name: string;
  type: string;
  power: number;
  description: string;
}) {
  const hasPower = power !== 0;

  return (
    <div className="panel w-full max-w-xs rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-3 shadow-lg">
      {/* Top bar: name and power badge */}
      <div className="mb-2 flex items-start justify-between">
        <div className="max-w-[70%]">
          <h1 className="text-base font-semibold tracking-wide text-emerald-100">
            {name}
          </h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-emerald-400/70">
            {type}
          </p>
        </div>

        {hasPower && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500 bg-slate-950 text-lg font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            {power}
          </div>
        )}
      </div>

      {/* Body / description */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 text-xs leading-relaxed text-slate-200">
        {description}
      </div>

      {/* Bottom strip */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span className="rounded-full border border-slate-700/80 px-2 py-0.5 uppercase tracking-[0.18em] text-[9px] text-slate-300/80">
          {type}
        </span>
        {hasPower && (
          <span className="text-[10px] text-emerald-400/80">
            Power {power}
          </span>
        )}
      </div>
    </div>
  );
}