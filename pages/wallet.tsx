import Head from "next/head";
import Link from "next/link";
import { ArrowDownCircle, ArrowUpCircle, Plus, RefreshCw, Wallet as WalletIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useDemoStore } from "@/lib/store";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatRelative } from "@/lib/utils";

export default function WalletPage() {
  const { state, hydrated, reset } = useDemoStore();

  return (
    <>
      <Head>
        <title>Wallet — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            Your wallet
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            BrewCredits balance
          </h1>
          <p className="mt-2 max-w-2xl text-[color:var(--foreground)]/70">
            Top up credits to subscribe to a package. Credits are stored in your
            browser only — no payment is ever taken.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-[color:var(--brand)]/30 bg-gradient-to-br from-[color:var(--brand)]/12 via-[color:var(--surface)] to-[color:var(--accent)]/10 p-8 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--brand)] text-white shadow">
                <WalletIcon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
                DEMO BALANCE
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-[color:var(--foreground)]/65">Available BrewCredits</p>
              <p className="mt-1 text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
                {hydrated ? formatCurrency(state.walletBalance) : "$0.00"}
              </p>
              <p className="mt-2 text-xs text-[color:var(--foreground)]/55">
                Account · {state.user.email}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/deposit"
                className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--brand-strong)] transition"
              >
                <Plus className="h-4 w-4" />
                Top up
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:border-[color:var(--brand)]/40 transition"
              >
                Browse packages
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm(
                      "Reset all demo state (wallet, transactions, subscription)?"
                    )
                  ) {
                    reset();
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-transparent px-3 py-2 text-xs text-[color:var(--foreground)]/65 hover:text-red-600 transition"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset demo
              </button>
            </div>
          </motion.div>

          <div className="space-y-4">
            <Disclaimer variant="card">
              BrewCredits are a mock currency. Top-ups simply increase a number stored in
              your browser&apos;s local storage. Closing the tab keeps the balance;
              clearing site data resets it.
            </Disclaimer>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h3 className="text-sm font-semibold">Subscription</h3>
              {hydrated && state.subscription ? (
                <p className="mt-2 text-sm text-[color:var(--foreground)]/75">
                  Active on the <strong>{state.subscription.packageId}</strong> plan ·{" "}
                  <Link href="/account" className="underline text-[color:var(--brand)]">
                    manage
                  </Link>
                </p>
              ) : (
                <p className="mt-2 text-sm text-[color:var(--foreground)]/65">
                  No active subscription. Top up your balance, then pick a package.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Transactions</h2>
            <span className="text-xs text-[color:var(--foreground)]/55">
              {hydrated ? `${state.transactions.length} entries` : "—"}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
            {!hydrated || state.transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--surface-muted)] text-[color:var(--foreground)]/50">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <p className="text-sm text-[color:var(--foreground)]/65">
                  No transactions yet. Try a top-up to see this list populate.
                </p>
                <Link
                  href="/deposit"
                  className="text-sm font-medium text-[color:var(--brand)] hover:underline"
                >
                  Make your first demo top-up →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[color:var(--border)]">
                {state.transactions.map((tx) => {
                  const isCredit = tx.amount >= 0;
                  return (
                    <li
                      key={tx.id}
                      className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "inline-flex h-9 w-9 items-center justify-center rounded-full",
                            isCredit
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                          )}
                        >
                          {isCredit ? (
                            <ArrowDownCircle className="h-4 w-4" />
                          ) : (
                            <ArrowUpCircle className="h-4 w-4" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{tx.label}</p>
                          <p className="text-xs text-[color:var(--foreground)]/55">
                            {tx.id} · {formatRelative(tx.createdAt)}
                          </p>
                        </div>
                      </div>
                      <p
                        className={cn(
                          "shrink-0 tabular-nums font-semibold",
                          isCredit ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                        )}
                      >
                        {isCredit ? "+" : "−"}
                        {formatCurrency(Math.abs(tx.amount))}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
