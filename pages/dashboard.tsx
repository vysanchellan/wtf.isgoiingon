import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Wallet,
  TrendingUp,
  PiggyBank,
  Plus,
  Layers,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useDemoStore } from "@/lib/store";
import { AnimatedCurrency } from "@/components/ui/AnimatedCurrency";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { balance, holdings, transactions, hydrated } = useDemoStore();

  const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
  const projectedReturn = holdings.reduce((s, h) => s + h.returnAmount, 0);
  const hasHoldings = holdings.length > 0;

  return (
    <>
      <Head>
        <title>Dashboard — AmzVest ZA (DEMO)</title>
      </Head>

      <div className="flex items-center justify-center gap-2 border-b border-[var(--amber-deep)]/20 bg-[var(--amber-deep)]/20 px-4 py-2 text-xs font-medium text-[var(--amber)]">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        DEMO — For Educational Purposes Only. All figures below are fictional.
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Welcome back, Sipho</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {hasHoldings
              ? `You hold ${holdings.length} active ${holdings.length === 1 ? "package" : "packages"}`
              : "Your investment portfolio"}
          </p>
        </motion.div>

        {/* Wallet summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="gradient-border relative mb-4 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_90%_0%,rgba(20,199,123,0.12),transparent_70%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                Wallet balance
              </div>
              <div className="mt-1 text-3xl font-bold text-[var(--text-primary)]">
                {hydrated ? <AnimatedCurrency value={balance} /> : "—"}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/deposit"
                className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold no-underline"
              >
                <Plus className="h-3.5 w-3.5" />
                Add funds
              </Link>
              <Link
                href="/packages"
                className="btn-outline inline-flex items-center gap-1.5 px-4 py-2 text-xs no-underline"
              >
                <Layers className="h-3.5 w-3.5" />
                Buy package
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          <Metric label="Invested" value={hydrated ? formatCurrency(totalInvested) : "—"} icon={Wallet} index={0} />
          <Metric label="Projected return" value={hydrated ? formatCurrency(projectedReturn) : "—"} icon={TrendingUp} gold index={1} />
          <Metric label="Wallet" value={hydrated ? formatCurrency(balance) : "—"} icon={PiggyBank} gold index={2} />
        </div>

        {/* Holdings */}
        <Card index={3}>
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
            <h2 className="text-sm font-semibold">Your investments</h2>
            {hasHoldings && (
              <span className="rounded-full bg-[var(--gold)]/[0.12] px-3 py-0.5 text-[10px] font-bold text-[var(--gold)]">
                {holdings.length} active
              </span>
            )}
          </div>

          {!hydrated ? (
            <div className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">Loading…</div>
          ) : !hasHoldings ? (
            <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                You haven&apos;t purchased a package yet.
              </p>
              <p className="max-w-xs text-xs text-[var(--text-muted)]">
                Add funds to your wallet, then choose a package to see it appear here
                with its payout schedule.
              </p>
              <Link
                href="/packages"
                className="btn-gold mt-1 inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold no-underline"
              >
                Browse packages
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {holdings.map((h) => (
                <div key={h.id} className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {h.name} package
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                        {formatCurrency(h.invested)} invested · started {formatDate(h.startDate)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[var(--gold)]">
                        {formatCurrency(h.returnAmount)}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">total return</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {Array.from({ length: h.weeks }).map((_, w) => (
                      <div
                        key={w}
                        className="flex items-center justify-between rounded-[var(--radius)] bg-[var(--bg-tertiary)] px-3 py-2"
                      >
                        <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <Clock className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                          Week {w + 1} payout
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[var(--gold)]">
                            {formatCurrency(h.weeklyPayout)}
                          </span>
                          <span className="rounded-full bg-[var(--amber-deep)]/[0.12] px-2 py-0.5 text-[10px] font-bold text-[var(--amber)]">
                            Scheduled
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Reinvest banner */}
        {hasHoldings && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--gold)]/[0.15] bg-[var(--gold)]/[0.06] px-5 py-4"
          >
            <div>
              <div className="text-sm font-semibold text-[var(--gold)]">
                Reinvest your returns when a cycle ends
              </div>
              <div className="mt-1 text-[11px] text-[var(--text-secondary)]">
                Compound returns into a bigger package (demo)
              </div>
            </div>
            <Link
              href="/packages"
              className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold no-underline"
            >
              Reinvest
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}

        {/* Recent activity */}
        {hydrated && transactions.length > 0 && (
          <Card index={4}>
            <div className="border-b border-[var(--border)] px-5 py-3.5">
              <h2 className="text-sm font-semibold">Recent activity</h2>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {transactions.slice(0, 5).map((t) => {
                const credit = t.amount > 0;
                return (
                  <div key={t.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <div className="text-sm font-medium">{t.label}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{formatDate(t.date)}</div>
                    </div>
                    <span className={`text-sm font-bold ${credit ? "text-[var(--gold)]" : "text-[var(--text-secondary)]"}`}>
                      {credit ? "+" : "−"}
                      {formatCurrency(Math.abs(t.amount))}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        <div className="mt-2 text-right">
          <Link
            href="/"
            className="text-xs text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)]"
          >
            Sign out
          </Link>
        </div>
      </div>
    </>
  );
}

function Card({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glass mb-4 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  gold,
  index,
}: {
  label: string;
  value: string;
  icon: typeof Wallet;
  gold?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glass p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
        <Icon className={`h-3.5 w-3.5 ${gold ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`} />
      </div>
      <div className={`text-lg font-bold ${gold ? "text-[var(--gold)]" : "text-[var(--text-primary)]"}`}>
        {value}
      </div>
    </motion.div>
  );
}
