import Head from "next/head";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign in — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1D9E75]">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">AmzVest ZA</span>
          </div>
          <h2 className="text-lg font-medium">Welcome back</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6">
            Sign in to your investor account to view your portfolio
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Email address</label>
              <input type="email" placeholder="your@email.com" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-[#1D9E75] px-4 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-[#0F6E56] transition"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            No account yet? <Link href="/register" className="text-[#1D9E75] no-underline">Create one</Link>
            <span className="mx-2">·</span>
            <Link href="/admin" className="text-[var(--text-secondary)] no-underline text-[10px]">Admin access</Link>
          </div>

          <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-[10px] text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
            This is a DEMO. No real authentication.
          </div>
        </div>
      </div>
    </>
  );
}
