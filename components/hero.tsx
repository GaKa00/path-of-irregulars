import Image from "next/image";
import PlayGameButton from "./playgamebutton";
import Link from "next/link";

export default function Hero() {
    return (
      <section className="h-screen w-full flex items-center justify-center">

        <div className="hero-image">
            <Image src="/homeimage.jpg" alt="Path of Irregulars" fill className="object-cover brightness-[0.7]" />
        </div>

        <div className="hero-content bg-white/20 rounded-lg p-4">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold">Path of Irregulars</h1>
                <p className="text-lg">The Unofficial Tower of God Card Game</p>
            </div>
            <PlayGameButton />
        </div>
    </section>
  );
}