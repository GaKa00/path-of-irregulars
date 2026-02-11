"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/stores/auth.store'
import { loginRequest } from "@/services/authService";
import { useState } from "react";

export default function LoginCard() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useAuthStore((s) => s.login)
  const router = useRouter();

  async function handleLogin( e: React.FormEvent)  {
    e.preventDefault();
    try {
  const response = await loginRequest({username, password});

  login({accountId: response.accountId, username: response.username}, response.token);
      
  router.push("/meta");
    } catch (error) {
      setError("Invalid username or password");
    }
  
  }

  return (
    <>
      <div className="panel-accent w-full max-w-sm p-6">
        <h1 className="mb-1 text-2xl font-semibold text-emerald-100">Login</h1>
        <p className="mb-5 text-sm text-emerald-100/70">
          Login to your account to continue.
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="field-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="field-input"
          />
        </div>

        <button
          className="btn btn-primary mt-5 w-full rounded-xl"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center text-xs text-slate-400">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}