import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin — AmzVest ZA (DEMO)</title>
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
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--amber)]">
              <ShieldCheck className="h-5 w-5 text-[#0a0a0f]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">AmzVest admin</p>
              <p className="text-[11px] text-[var(--text-muted)]">Demo console</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Sign in</h1>
          <p className="mb-6 mt-1.5 text-sm text-[var(--text-secondary)]">
            Any credentials work — this gate is a UI flow, not real auth.
          </p>

          <div className="space-y-4">
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                defaultValue="admin@amzvest.example"
                className="input-premium"
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="password"
                  defaultValue="amzvest-demo"
                  className="input-premium pl-9"
                />
              </div>
            </div>
            <Link
              href="/admin/dashboard"
              className="btn-gold flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold no-underline"
            >
              Enter demo dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="demo-pill mt-6 px-4 py-3 leading-relaxed">
            This login form does not validate credentials. Clicking the button
            routes you into the admin pages.
          </div>
        </motion.div>
      </div>
    </>
  );
}
