import Head from "next/head";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1D9E75]">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">AmzVest admin</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Demo console</p>
            </div>
          </div>
          <h2 className="text-lg font-medium">Sign in</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6">
            Any credentials work — this gate is a UI flow, not real auth.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Email</label>
              <input type="email" defaultValue="admin@amzvest.example" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <input type="password" defaultValue="amzvest-demo" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <Link
              href="/admin/dashboard"
              className="block w-full rounded-lg bg-[#1D9E75] px-4 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-[#0F6E56] transition"
            >
              Enter demo dashboard
            </Link>
          </div>

          <Disclaimer variant="card" className="mt-6">
            This login form does not validate credentials. Clicking the button routes you into the admin pages.
          </Disclaimer>
        </div>
      </div>
    </>
  );
}
