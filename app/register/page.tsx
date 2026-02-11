import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="page-shell">
      <section className="page-shell-inner items-center justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="panel-accent w-full max-w-sm p-6">
            <h1 className="mb-1 text-2xl font-semibold text-emerald-100">Register</h1>
            <p className="mb-5 text-sm text-emerald-100/70">
              Begin your ascent to the top.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="field-input"
              />
              <input
                type="text"
                placeholder="Username"
                className="field-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="field-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="field-input"
              />
            </div>

            <button className="btn btn-primary mt-5 w-full rounded-xl">
              Register
            </button>
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