import { CardLibrary } from "@/domains/collection/collection.types";

export default function CollectionNavbar({ handleBack, collection }: { handleBack: () => void, collection: CardLibrary | null }) {
    return (
      <div className="top-bar">
        <button onClick={handleBack} className="btn btn-ghost">
          <span className="text-lg">&larr;</span>
          <span>Back</span>
        </button>

        <div className="text-right">
          <h1 className="text-2xl font-semibold tracking-tight">Collection</h1>
          <p className="text-sm text-slate-400">
            Cards owned:{" "}
            <span className="font-medium text-slate-100">
              {collection?.cards.length ?? 0}
            </span>
          </p>
        </div>
      </div>
    );
}