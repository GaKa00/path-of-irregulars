"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/stores/auth.store'

export default function LoginCard() {
  const setUser = useAuthStore((s) => s.setUser)
  const router = useRouter();

  const handleLogin = () => {
    setUser({
      id: '1',
      username: 'Irregular',
      email: 'irregular@tower.com',
      password: 'password',
      createdAt: new Date(),
    })

    router.push("/meta")
  }

  return (
    <>
      <div className="panel-accent w-full max-w-sm p-6">
        <h1 className="mb-1 text-2xl font-semibold text-emerald-100">Login</h1>
        <p className="mb-5 text-sm text-emerald-100/70">
          Login to your account to continue.
        </p>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="field-input"
          />
          <input
            type="password"
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