import Head from "next/head";
import Link from "next/link";
import { TrendingUp, Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="min-h-[calc(100vh-116px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-glow)] p-8 shadow-[var(--shadow-glow)]">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] flex items-center justify-center">
              <TrendingUp className="w-[18px] h-[18px] text-[#0a0a0f]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">AmzVest admin</p>
              <p className="text-[11px] text-[var(--text-muted)]">Demo console</p>
            </div>
          </div>

          <h2 className="m-0 text-xl font-semibold text-[var(--text-primary)]">Sign in</h2>
          <p className="mt-1 mb-6 text-sm text-[var(--text-secondary)]">
            Any credentials work — this gate is a UI flow, not real auth.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-[var(--text-secondary)]">Email</label>
              <input
                type="email"
                defaultValue="admin@amzvest.example"
                className="w-full px-3 py-2.5 text-sm text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-[var(--text-secondary)]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
                <input
                  type="password"
                  defaultValue="amzvest-demo"
                  className="w-full px-3 py-2.5 pl-9 text-sm text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] outline-none"
                />
              </div>
            </div>
            <Link
              href="/admin/dashboard"
              className="btn-gold block w-full text-center no-underline text-sm px-4 py-2.5"
            >
              Enter demo dashboard
            </Link>
          </div>

          <div className="mt-6 rounded-[var(--radius)] border border-[rgba(217,119,6,0.2)] bg-[rgba(146,64,14,0.08)] px-4 py-3 text-[11px] text-[var(--amber)] leading-relaxed">
            This login form does not validate credentials. Clicking the button routes you into the admin pages.
          </div>
        </div>
      </div>
    </>
  );
}
