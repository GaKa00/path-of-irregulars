"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await registerUser({ username, password });
      alert("Registered successfully");
      router.push("/meta");
    } catch (error) {
      setError("Failed to register");
    }
  }

  return (
    <main className="page-shell">
      <section className="page-shell-inner items-center justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="panel-accent w-full max-w-sm p-6">
            <h1 className="mb-1 text-2xl font-semibold text-emerald-100">Register</h1>
            <p className="mb-5 text-sm text-emerald-100/70">
              Begin your ascent to the top.
            </p>

            <form className="space-y-3" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                className="field-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="field-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn btn-primary mt-5 w-full rounded-xl" type="submit">
                Register
              </button>
            </form>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center text-xs text-slate-400">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}