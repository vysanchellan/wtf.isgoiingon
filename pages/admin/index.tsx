import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, BarChart3, Users, Banknote } from "lucide-react";

const STATS = [
  { icon: Banknote, label: "Capital deployed", value: "R 11 500" },
  { icon: Users, label: "Active investors", value: "5" },
  { icon: BarChart3, label: "Total returns owed", value: "R 23 000" },
];

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="relative flex min-h-[calc(100vh-116px)] items-center justify-center overflow-hidden px-4 py-10">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--gold)]/[0.07] blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--amber)]/[0.05] blur-[130px]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card-glass relative grid w-full max-w-4xl overflow-hidden md:grid-cols-2"
        >
          {/* Showcase panel */}
          <div className="relative hidden flex-col justify-between gap-8 border-r border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] p-8 md:flex">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_0%,rgba(20,199,123,0.1),transparent_70%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/[0.12] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                <ShieldCheck className="h-3 w-3" />
                Operations console
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-[var(--text-primary)]">
                Run the (fictional) <span className="gradient-text">AmzVest</span> operation
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Track investors, process weekly payouts, and review package
                performance — all simulated, no real data.
              </p>
            </div>

            <div className="relative space-y-3">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-glass)] px-4 py-3 backdrop-blur"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-[var(--gold)]/[0.12] text-[var(--gold)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {s.label}
                      </div>
                      <div className="text-base font-bold text-[var(--gold)]">{s.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Form panel */}
          <div className="p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]">
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
                <input type="email" defaultValue="admin@amzvest.example" className="input-premium" />
              </div>
              <div>
                <label className="field-label">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    defaultValue="amzvest-demo"
                    style={{ paddingLeft: "2.3rem" }}
                    className="input-premium"
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
          </div>
        </motion.div>
      </div>
    </>
  );
}
