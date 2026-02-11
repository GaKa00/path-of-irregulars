import MetaButton from "@/ui/metabutton";

export default function GameSelector() {
  const buttons = [
    { title: "Play", link: "/game/deckselection" },
    { title: "Modes (WIP)", link: "/game/modes" },
    { title: "Collection", link: "/meta/collection" },
  ];

  return (
    <section className="panel max-w-md px-6 py-6">
      <header className="mb-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
          Meta hub
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-100">What do you want to do?</h2>
        <p className="mt-1 text-xs text-slate-400">
          Jump straight into a match, explore modes, or manage your collection.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        {buttons.map(button => (
          <MetaButton key={button.title} title={button.title} link={button.link} />
        ))}
      </div>
    </section>
  );
}
