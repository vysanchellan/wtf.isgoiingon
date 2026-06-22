import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { useDemoStore } from "@/lib/store";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency } from "@/lib/utils";

const QUICK_AMOUNTS = [25, 50, 100, 200];

export default function DepositPage() {
  const router = useRouter();
  const { state, hydrated, deposit } = useDemoStore();
  const [amount, setAmount] = useState<string>("50");
  const [cardName, setCardName] = useState("Demo User");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/29");
  const [cvc, setCvc] = useState("123");
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const numericAmount = Number(amount);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    setStatus("processing");
    // Simulate network latency
    window.setTimeout(() => {
      const masked = `Card •••• ${cardNumber.replace(/\s/g, "").slice(-4) || "0000"}`;
      const result = deposit(numericAmount, masked);
      if (!result.ok) {
        setError(result.error);
        setStatus("idle");
        return;
      }
      setStatus("done");
    }, 700);
  }

  return (
    <>
      <Head>
        <title>Top up wallet — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            Top up
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Add BrewCredits to your wallet.
          </h1>
          <p className="mt-2 max-w-2xl text-[color:var(--foreground)]/70">
            Pick an amount, fill in the card form, and the balance updates instantly.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
          >
            <h2 className="text-lg font-semibold">Amount</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(String(v))}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    Number(amount) === v
                      ? "border-[color:var(--brand)] bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]"
                      : "border-[color:var(--border)] hover:border-[color:var(--brand)]/40"
                  )}
                >
                  ${v}
                </button>
              ))}
            </div>
            <div className="relative mt-3">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--foreground)]/55">
                $
              </span>
              <input
                type="number"
                min={1}
                max={10000}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] py-2 pl-7 pr-3 text-base outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>

            <hr className="my-6 border-[color:var(--border)]" />

            <h2 className="text-lg font-semibold">Card details (demo)</h2>
            <p className="mt-1 text-xs text-[color:var(--foreground)]/55">
              Pre-filled. These values are not collected, validated, or transmitted.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Name on card</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Card number</label>
                <div className="relative mt-1.5">
                  <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] py-2 pl-9 pr-3 text-sm tracking-widest outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Expiry</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "processing"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {status === "processing"
                ? "Processing..."
                : `Top up ${formatCurrency(numericAmount || 0)}`}
            </button>

            <p className="mt-3 text-center text-[11px] text-[color:var(--foreground)]/55">
              <Lock className="-mt-0.5 mr-1 inline h-3 w-3" />
              No data leaves your browser. The lock icon is decorative.
            </p>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-lg border border-rose-400/50 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200"
                >
                  {error}
                </motion.p>
              )}

              {status === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/50 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">
                      Demo deposit of {formatCurrency(numericAmount)} added.
                    </p>
                    <p className="mt-1 text-emerald-800/80 dark:text-emerald-200/80">
                      New balance: {formatCurrency(state.walletBalance)}.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href="/wallet"
                        className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white"
                      >
                        View wallet
                      </Link>
                      <Link
                        href="/packages"
                        className="rounded-full border border-emerald-700/40 px-3 py-1 text-xs font-semibold text-emerald-900 dark:text-emerald-200"
                      >
                        Pick a package
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          router.replace(router.asPath);
                        }}
                        className="text-xs underline text-emerald-800 dark:text-emerald-200"
                      >
                        Top up again
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h3 className="text-sm font-semibold">Current balance</h3>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {hydrated ? formatCurrency(state.walletBalance) : "$0.00"}
              </p>
              <p className="mt-1 text-xs text-[color:var(--foreground)]/55">
                Updates the moment the demo deposit completes.
              </p>
            </div>

            <Disclaimer variant="card">
              The card fields are decorative. Even the most realistic-looking number,
              expiry, and CVC never leave the browser. Nothing here meets PCI or any
              real-world payment standard.
            </Disclaimer>
          </aside>
        </div>
      </section>
    </>
  );
}
