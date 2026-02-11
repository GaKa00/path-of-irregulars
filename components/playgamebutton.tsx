import { useRouter } from "next/navigation";

export default function PlayGameButton() {
    const router = useRouter();
    return (
        <button  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 pointer-cursor" onClick={() => router.push("/login")}>Play Now</button>
    );
}