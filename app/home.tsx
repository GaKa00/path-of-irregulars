"use client";


import Hero from "@/components/hero";
import News from "@/components/news";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();
    return (
        <>
           <Hero />
           <News/>
        </>
    );
}