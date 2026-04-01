import { CardLibrary } from "@/domains/user/types/collection.types";
import CardView from "../card";

export default function CardCollection({
  collection,
}: {
  collection: CardLibrary | null;
}) {
  const convertTypeEnumToText = (type: number) => {
    if (type === 0) return "Climber";
    if (type === 1) return "Spell";
    if (type === 2) return "Artifact";
  };

  //   {
  //     const convertedType = convertTypeEnumToText(card.type);
  //   }
  return (
    <div className="panel p-5">
      <h2 className="mb-2 text-lg font-semibold text-slate-100">Your Cards</h2>
      <p className="mb-4 text-sm text-slate-400">
        Browse and manage your card library. Deck building tools are on the
        right.
      </p>

      <div className="grid max-h-112 grid-cols-1 gap-3 overflow-y-auto rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-4 text-sm text-slate-500 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 sm:grid-cols-2 lg:grid-cols-3">
        {collection?.cards.map((card) => (
          <div key={card.id} className="flex items-stretch">
            <CardView
              name={card.name}
              type={convertTypeEnumToText(card.type)}
              power={card.power ?? 0}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
