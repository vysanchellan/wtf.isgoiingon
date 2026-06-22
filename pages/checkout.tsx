import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Wallet as WalletIcon } from "lucide-react";
import { PACKAGES, getPackage, type PackageId } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const VALID_IDS: PackageId[] = PACKAGES.map((p) => p.id);

export default function CheckoutPage() {
  const router = useRouter();
  const { state, hydrated, buyPackage } = useDemoStore();
  const queried = router.query.package;
  const initialId: PackageId =
    typeof queried === "string" && VALID_IDS.includes(queried as PackageId)
      ? (queried as PackageId)
      : "connoisseur";

  const [selected, setSelected] = useState<PackageId>(initialId);
  const [lastQuery, setLastQuery] = useState<typeof queried>(queried);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // Sync local state to URL query during render (React-recommended pattern for
  // adjusting state based on changing props — no effect needed).
  if (queried !== lastQuery) {
    setLastQuery(queried);
    if (typeof queried === "string" && VALID_IDS.includes(queried as PackageId)) {
      setSelected(queried as PackageId);
    }
  }

  const pkg = getPackage(selected);
  const insufficient = hydrated && state.walletBalance < pkg.priceMonthly;

  function handleConfirm() {
    setError(null);
    setStatus("processing");
    window.setTimeout(() => {
      const result = buyPackage(selected);
      if (!result.ok) {
        setError(result.error);
        setStatus("idle");
        return;
      }
      setStatus("done");
    }, 600);
  }

  return (
    <>
      <Head>
        <title>Checkout — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <nav className="text-xs text-[color:var(--foreground)]/55" aria-label="Breadcrumb">
            <Link href="/packages" className="hover:text-[color:var(--foreground)]">
              Packages
            </Link>
            <ChevronRight className="-mt-0.5 mx-1 inline h-3 w-3" />
            <span>Checkout</span>
          </nav>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Confirm your subscription
          </h1>
          <p className="mt-2 max-w-2xl text-[color:var(--foreground)]/70">
            We&apos;ll debit BrewCredits from your wallet for the first month and
            schedule the next billing date. Demo only.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h2 className="text-sm font-semibold text-[color:var(--foreground)]/65">
                Choose your tier
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {PACKAGES.map((p) => {
                  const active = p.id === selected;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelected(p.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition",
                        active
                          ? "border-[color:var(--brand)] ring-1 ring-[color:var(--brand)]/30 bg-[color:var(--brand)]/5"
                          : "border-[color:var(--border)] hover:border-[color:var(--brand)]/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{p.name}</p>
                        {active && (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--brand)] text-[10px] font-bold text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[color:var(--foreground)]/65">
                        {p.bagsPerMonth} bag{p.bagsPerMonth > 1 ? "s" : ""} / mo
                      </p>
                      <p className="mt-2 text-lg font-bold">
                        {formatCurrency(p.priceMonthly)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="text-lg font-semibold">{pkg.name}</h2>
              <p className="text-sm text-[color:var(--foreground)]/70">{pkg.tagline}</p>
              <p className="mt-3 text-sm">{pkg.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {pkg.perks.map((p) => (
                  <li key={p} className="text-[color:var(--foreground)]/85">
                    · {p}
                  </li>
                ))}
              </ul>
            </div>

            <Disclaimer variant="card">
              Confirming below debits your demo wallet, sets a fake next-billing date,
              and adds a transaction. No coffee will ever ship — it&apos;s a UI flow.
            </Disclaimer>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[color:var(--foreground)]/65">
                Order summary
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label={`${pkg.name} (monthly)`} value={formatCurrency(pkg.priceMonthly)} />
                <Row label="Shipping (demo)" value="Included" muted />
                <Row label="Tax (demo)" value="—" muted />
              </dl>
              <hr className="my-4 border-[color:var(--border)]" />
              <dl className="space-y-2 text-sm">
                <Row label="Charged today" value={formatCurrency(pkg.priceMonthly)} bold />
                <Row
                  label="Wallet balance"
                  value={
                    hydrated ? formatCurrency(state.walletBalance) : "—"
                  }
                  muted
                />
                <Row
                  label="After charge"
                  value={
                    hydrated
                      ? formatCurrency(
                          Math.max(0, state.walletBalance - pkg.priceMonthly)
                        )
                      : "—"
                  }
                  muted
                />
              </dl>

              {insufficient ? (
                <div className="mt-5 rounded-xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                  <p className="font-semibold">Not enough BrewCredits.</p>
                  <p className="mt-1 text-amber-800/80 dark:text-amber-200/80">
                    Top up first, then come back to confirm.
                  </p>
                  <Link
                    href={`/deposit`}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[color:var(--brand-strong)] transition"
                  >
                    <WalletIcon className="h-3.5 w-3.5" />
                    Top up wallet
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={status === "processing" || status === "done"}
                  onClick={handleConfirm}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "processing"
                    ? "Processing..."
                    : status === "done"
                    ? "Done"
                    : `Confirm & subscribe`}
                  {status === "idle" && <ArrowRight className="h-4 w-4" />}
                </button>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 rounded-lg border border-rose-400/50 bg-rose-50 px-3 py-2 text-xs text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200"
                  >
                    {error}
                  </motion.p>
                )}

                {status === "done" && state.subscription && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/50 bg-emerald-50 px-4 py-3 text-xs text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <div>
                      <p className="font-semibold">
                        You&apos;re subscribed to {pkg.name} (demo).
                      </p>
                      <p className="mt-1">
                        Next billing on {formatDate(state.subscription.nextBillingAt)}.
                      </p>
                      <Link
                        href="/account"
                        className="mt-2 inline-block font-semibold underline"
                      >
                        Go to my account →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={cn(muted && "text-[color:var(--foreground)]/55")}>{label}</dt>
      <dd
        className={cn(
          "tabular-nums",
          bold && "text-lg font-bold",
          muted && "text-[color:var(--foreground)]/60"
        )}
      >
        {value}
      </dd>
    </div>
  );
}
