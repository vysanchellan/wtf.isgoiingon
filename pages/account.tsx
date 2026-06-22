import Head from "next/head";
import Link from "next/link";
import { CalendarDays, Coffee, Pause, Play, RefreshCw, ShieldAlert, User as UserIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDemoStore, summarizeSubscription } from "@/lib/store";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatDate, formatRelative } from "@/lib/utils";

export default function AccountPage() {
  const {
    state,
    hydrated,
    updateUser,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    reset,
  } = useDemoStore();

  const sub = summarizeSubscription(state.subscription);

  return (
    <>
      <Head>
        <title>My account — BrewClub (DEMO)</title>
      </Head>

      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            My account
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, {state.user.name}.
          </h1>
          <p className="mt-2 max-w-2xl text-[color:var(--foreground)]/70">
            Manage your demo profile, subscription, and wallet from here.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--foreground)]/65">
                Profile
              </h2>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]">
                <UserIcon className="h-4 w-4" />
              </span>
            </div>
            <label className="text-xs font-medium text-[color:var(--foreground)]/65">
              Display name
            </label>
            <input
              type="text"
              value={state.user.name}
              onChange={(e) => updateUser({ name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
            />
            <label className="mt-3 block text-xs font-medium text-[color:var(--foreground)]/65">
              Email
            </label>
            <input
              type="email"
              value={state.user.email}
              onChange={(e) => updateUser({ email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
            />
            <p className="mt-3 text-[11px] text-[color:var(--foreground)]/55">
              Saved automatically to your browser&apos;s local storage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-[color:var(--brand)]/30 bg-gradient-to-br from-[color:var(--brand)]/10 via-[color:var(--surface)] to-[color:var(--accent)]/10 p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--foreground)]/65">
                Wallet
              </h2>
              <Link
                href="/wallet"
                className="text-xs font-medium text-[color:var(--brand)] hover:underline"
              >
                Open wallet →
              </Link>
            </div>
            <p className="text-xs text-[color:var(--foreground)]/65">BrewCredits</p>
            <p className="mt-1 text-4xl font-bold tabular-nums">
              {hydrated ? formatCurrency(state.walletBalance) : "$0.00"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/deposit"
                className="rounded-full bg-[color:var(--brand)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[color:var(--brand-strong)]"
              >
                Top up
              </Link>
              <Link
                href="/packages"
                className="rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs font-semibold hover:border-[color:var(--brand)]/40"
              >
                Browse packages
              </Link>
            </div>
            <p className="mt-3 text-[11px] text-[color:var(--foreground)]/55">
              {hydrated
                ? `${state.transactions.length} transaction${
                    state.transactions.length === 1 ? "" : "s"
                  } on record`
                : "—"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[color:var(--foreground)]/65">
                Subscription
              </h2>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]">
                <Coffee className="h-4 w-4" />
              </span>
            </div>

            {!sub ? (
              <>
                <p className="text-sm text-[color:var(--foreground)]/65">
                  You don&apos;t have an active subscription. Pick a package to start
                  the demo flow.
                </p>
                <Link
                  href="/packages"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[color:var(--brand-strong)]"
                >
                  Choose a package
                </Link>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">{sub.pkg.name}</p>
                <p className="text-sm text-[color:var(--foreground)]/65">
                  {sub.pkg.bagsPerMonth} bag{sub.pkg.bagsPerMonth > 1 ? "s" : ""} / month
                  · {formatCurrency(sub.pkg.priceMonthly)}
                </p>
                <span
                  className={cn(
                    "mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    sub.status === "active" &&
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
                    sub.status === "paused" &&
                      "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200",
                    sub.status === "cancelled" &&
                      "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                  )}
                >
                  ● {sub.status}
                </span>
                <dl className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[color:var(--foreground)]/65">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Started {formatRelative(sub.startedAt)}
                  </div>
                  <div className="flex items-center gap-2 text-[color:var(--foreground)]/65">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Next billing on {formatDate(sub.nextBillingAt)}
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  {sub.status === "active" && (
                    <button
                      type="button"
                      onClick={pauseSubscription}
                      className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs hover:border-[color:var(--brand)]/40"
                    >
                      <Pause className="h-3 w-3" />
                      Pause
                    </button>
                  )}
                  {sub.status === "paused" && (
                    <button
                      type="button"
                      onClick={resumeSubscription}
                      className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[color:var(--brand-strong)]"
                    >
                      <Play className="h-3 w-3" />
                      Resume
                    </button>
                  )}
                  {sub.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={cancelSubscription}
                      className="inline-flex items-center gap-1 rounded-full border border-rose-400/40 px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]/70">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              Reset demo state
            </h3>
            <p className="mt-2 text-sm text-[color:var(--foreground)]/65">
              Wipes the demo wallet balance, transactions, and subscription stored in
              this browser. Useful when showing the project to graders.
            </p>
            <button
              type="button"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.confirm("Reset all demo state in this browser?")
                ) {
                  reset();
                }
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-rose-400/50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
            >
              <RefreshCw className="h-3 w-3" />
              Reset everything
            </button>
          </div>

          <Disclaimer variant="card">
            Every value on this page lives only in your browser. Nothing here is shared
            with a server, and no third parties can see your &quot;account&quot;.
          </Disclaimer>
        </div>
      </section>
    </>
  );
}
