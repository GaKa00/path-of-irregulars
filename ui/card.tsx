

export default function CardView({
  name,
  type,
  power,
  description,
}: {
  name: string;
  type: string | undefined;
  power: number | undefined;
  description: string;
}) {
  const hasPower = power !== 0;
  const hasDescription = !!description;



  return (
    <div className="flex h-64 w-60 max-w-xs flex-col rounded-2xl border border-slate-700 bg-linear-to-b from-slate-900 to-slate-950 p-4 shadow-lg">
      {/* Top bar: name and power badge */}
      <div className="mb-2 flex items-start justify-between">
        <div className="max-w-[70%]">
          <h1 className="text-base font-semibold tracking-wide text-emerald-100">
            {name}
          </h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-emerald-400/70 ">
            {type}
          </p>
        </div>

        {hasPower && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500 bg-slate-950 text-sm font-bold text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.45)]">
            {power}
          </div>
        )}
      </div>

      {/* Body / description pinned to bottom */}
      {hasDescription && (
        <div className="mt-auto rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 text-xs leading-relaxed text-slate-200">
          {description}
        </div>
      )}
    </div>
  );
}
