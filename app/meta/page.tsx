
import GameSelector from "@/ui/gameselector";
import MetaFooter from "@/ui/metafooter";
import Navbar from "@/ui/navbar";
import Link from "next/link";

export default function MetaPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <section className="page-shell-inner overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <GameSelector />
        </div>
        <div className="mt-4">
          <MetaFooter />
        </div>
      </section>
    </main>
  );
}