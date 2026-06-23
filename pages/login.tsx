import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign in — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="relative flex min-h-[calc(100vh-116px)] items-center justify-center overflow-hidden px-4 py-12">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[var(--gold)]/[0.06] blur-[130px]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card-glass relative w-full max-w-sm p-8 shadow-[var(--shadow-glow)]"
        >
          <div className="mb-7 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--amber)]">
              <TrendingUp className="h-5 w-5 text-[#0a0a0f]" />
            </div>
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
              AmzVest <span className="text-[var(--gold)]">ZA</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Welcome back</h1>
          <p className="mb-7 mt-1.5 text-sm text-[var(--text-secondary)]">
            Sign in to your investor account
          </p>

          <div className="space-y-4">
            <div>
              <label className="field-label">Email address</label>
              <input type="email" placeholder="your@email.com" className="input-premium" />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input type="password" placeholder="••••••••" className="input-premium" />
            </div>
            <Link
              href="/dashboard"
              className="btn-gold mt-1 flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold no-underline"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 text-center text-xs text-[var(--text-secondary)]">
            No account yet?{" "}
            <Link href="/register" className="font-semibold text-[var(--gold)] no-underline hover:underline">
              Create one
            </Link>
            <span className="mx-2 text-[var(--text-muted)]">·</span>
            <Link href="/admin" className="text-[11px] text-[var(--text-muted)] no-underline hover:text-[var(--text-secondary)]">
              Admin access
            </Link>
          </div>

          <div className="demo-pill mt-6 justify-center px-3 py-2.5 text-center">
            This is a DEMO. No real authentication.
          </div>
        </motion.div>
      </div>
    </>
  );
}
