import Link from "next/link";

export default function MetaButton({ title, link }: { title: string; link: string }) {
  return (
    <Link
      href={link}
      className="btn btn-ghost w-full justify-between rounded-xl border-slate-700 bg-slate-900/80 px-4 py-3 text-left text-sm hover:border-emerald-500"
    >
      <span className="font-medium text-slate-100">{title}</span>
      <span className="text-[10px] uppercase tracking-wide text-slate-500">Select</span>
    </Link>
  );
}