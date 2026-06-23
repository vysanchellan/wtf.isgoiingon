import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  Plus,
  Layers,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { AnimatedCurrency } from "@/components/ui/AnimatedCurrency";
import { useDemoStore } from "@/lib/store";
import { formatCurrency, formatDate, maturityDate } from "@/lib/utils";

export default function WalletPage() {
  const { balance, transactions, holdings, hydrated, reset } = useDemoStore();

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const projectedReturn = holdings.reduce((s, h) => s + h.returnAmount, 0);

  return (
    <>
      <Head>
        <title>Your wallet — AmzVest ZA (DEMO)</title>
      </Head>

      <PageHeader
        eyebrow="Wallet"
        icon={<Wallet className="h-3.5 w-3.5" />}
        title="Your wallet"
        subtitle="Deposit funds, buy packages, and track your demo activity."
      >
        <Disclaimer variant="card">
          Every figure here is fictional and stored only in your browser. No real
          money, accounts, or payouts are involved.
        </Disclaimer>
      </PageHeader>

      <section className="bg-[var(--bg-primary)] py-12">
        <div className="mx-auto max-w-3xl space-y-5 px-4 sm:px-6">
          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="gradient-border relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--bg-card)] p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_85%_0%,rgba(20,199,123,0.12),transparent_70%)]" />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Available balance
                </div>
                <div className="mt-1 text-4xl font-bold tabular-nums text-[var(--text-primary)]">
                  {hydrated ? <AnimatedCurrency value={balance} /> : "—"}
                </div>
              </div>
              <div className="flex gap-2.5">
                <Link
                  href="/deposit"
                  className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold no-underline"
                >
                  <Plus className="h-4 w-4" />
                  Add funds
                </Link>
                <Link
                  href="/packages"
                  className="btn-outline inline-flex items-center gap-1.5 px-5 py-2.5 text-sm no-underline"
                >
                  <Layers className="h-4 w-4" />
                  Buy a package
                </Link>
              </div>
            </div>

            {holdings.length > 0 && (
              <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-5">
                <MiniStat label="Total invested" value={formatCurrency(totalInvested)} />
                <MiniStat label="Projected return" value={formatCurrency(projectedReturn)} gold />
              </div>
            )}
          </motion.div>

          {/* Holdings */}
          <Section title="Your investments" icon={TrendingUp}>
            {holdings.length === 0 ? (
              <Empty
                text="No packages purchased yet."
                ctaHref="/packages"
                ctaLabel="Browse packages"
              />
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {holdings.map((h) => (
                  <div key={h.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {h.name} package
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                        {formatCurrency(h.invested)} invested · matures{" "}
                        {maturityDate(h.startDate, h.weeks)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--gold)]">
                        {formatCurrency(h.returnAmount)}
                      </div>
                      <span className="rounded-full bg-[var(--gold)]/[0.12] px-2.5 py-0.5 text-[10px] font-bold text-[var(--gold)]">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Transactions */}
          <Section title="Recent activity" icon={Wallet}>
            {transactions.length === 0 ? (
              <Empty
                text="No transactions yet."
                ctaHref="/deposit"
                ctaLabel="Make your first deposit"
              />
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {transactions.map((t) => {
                  const credit = t.amount > 0;
                  return (
                    <div key={t.id} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            credit
                              ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]"
                              : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {credit ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-[var(--text-primary)]">{t.label}</div>
                          <div className="text-[11px] text-[var(--text-muted)]">{formatDate(t.date)}</div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${credit ? "text-[var(--gold)]" : "text-[var(--text-secondary)]"}`}>
                        {credit ? "+" : "−"}
                        {formatCurrency(Math.abs(t.amount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>

          <div className="flex justify-center pt-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] transition hover:text-[var(--amber)]"
            >
              <RotateCcw className="h-3 w-3" />
              Reset demo wallet
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Wallet;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="card-glass overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-5 py-3.5">
        <Icon className="h-4 w-4 text-[var(--gold)]" />
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function MiniStat({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</div>
      <div className={`mt-1 text-lg font-bold ${gold ? "text-[var(--gold)]" : "text-[var(--text-primary)]"}`}>
        {value}
      </div>
    </div>
  );
}

function Empty({ text, ctaHref, ctaLabel }: { text: string; ctaHref: string; ctaLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
      <p className="text-sm text-[var(--text-secondary)]">{text}</p>
      <Link
        href={ctaHref}
        className="btn-outline inline-flex items-center px-4 py-2 text-xs no-underline"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
