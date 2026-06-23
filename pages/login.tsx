import Head from "next/head";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign in — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="min-h-[calc(100vh-116px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-glow)] p-8 shadow-[var(--shadow-glow)]">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] flex items-center justify-center">
              <TrendingUp className="h-[18px] w-[18px] text-[#0a0a0f]" />
            </div>
            <span className="text-sm font-semibold text-[var(--gold)]">
              AmzVest ZA
            </span>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Welcome back
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6">
            Sign in to your investor account
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <Link
              href="/dashboard"
              className="btn-gold block w-full text-center py-2.5 text-sm font-semibold no-underline"
            >
              Sign in
            </Link>
          </div>

          <div className="text-center text-xs text-[var(--text-secondary)] mt-5">
            No account yet?{" "}
            <Link href="/register" className="text-[var(--gold)] no-underline">
              Create one
            </Link>
            <span className="mx-2 text-[var(--text-muted)]">·</span>
            <Link href="/admin" className="text-[var(--text-muted)] no-underline text-[11px]">
              Admin access
            </Link>
          </div>

          <div className="mt-4 rounded-[var(--radius)] bg-[var(--amber-deep)]/10 border border-[var(--amber-deep)]/20 px-3 py-2.5 text-[11px] text-[var(--amber)] text-center font-medium">
            This is a DEMO. No real authentication.
          </div>
        </div>
      </div>
    </>
  );
}
