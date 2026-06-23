import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Wallet, Plus, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { PACKAGES, getPackage, type PackageId } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

type Phase = "idle" | "processing" | "done";

export default function CheckoutPage() {
  const router = useRouter();
  const { balance, selectedPackage, setSelectedPackage, purchase, hydrated } = useDemoStore();
  const [phase, setPhase] = useState<Phase>("idle");

  const pkg = getPackage(selectedPackage);
  const shortfall = Math.max(0, pkg.invest - balance);
  const canAfford = hydrated && balance >= pkg.invest;

  const handlePurchase = () => {
    if (!canAfford || phase !== "idle") return;
    setPhase("processing");
    window.setTimeout(() => {
      const result = purchase(selectedPackage);
      if (result.ok) {
        setPhase("done");
        window.setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setPhase("idle");
      }
    }, 1100);
  };

  return (
    <>
      <Head>
        <title>Checkout — AmzVest ZA (DEMO)</title>
      </Head>

      <PageHeader
        eyebrow="Checkout"
        icon={<ShoppingCart className="h-3.5 w-3.5" />}
        title="Purchase a package"
        subtitle="Pay from your wallet balance to activate a (fictional) investment."
      >
        <Disclaimer variant="card">
          No real purchase takes place. Buying a package only moves demo balance
          into a simulated holding, in your browser.
        </Disclaimer>
      </PageHeader>

      <section className="bg-[var(--bg-primary)] py-12">
        <div className="mx-auto grid max-w-3xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Order summary</h2>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value as PackageId)}
                style={{ width: "auto", padding: "0.4rem 0.6rem" }}
                className="input-premium cursor-pointer text-xs"
              >
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[var(--radius)] border border-[var(--gold)]/[0.15] bg-[var(--gold)]/[0.05] p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                {pkg.name} package
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="gradient-text text-4xl font-bold">{formatCurrency(pkg.invest)}</span>
                <span className="text-xs text-[var(--text-muted)]">one-time (demo)</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <Line label="You receive" value={formatCurrency(pkg.returnAmount)} highlight />
                <Line label="Payout" value="Single lump sum" />
                <Line label="Matures" value={`After ${pkg.weeks} weeks`} />
                <Line label="Net gain" value="100% (2×)" />
              </ul>
            </div>

            <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--amber)]">
              Fictional rate. Not real.
            </p>
          </motion.div>

          {/* Payment panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="card-glass flex flex-col p-6"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Wallet className="h-4 w-4 text-[var(--gold)]" />
              Pay from wallet
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Balance</span>
              <span className="text-lg font-bold text-[var(--gold)]">
                {hydrated ? formatCurrency(balance) : "—"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-xs text-[var(--text-secondary)]">
              <span>Package price</span>
              <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(pkg.invest)}</span>
            </div>

            {hydrated && !canAfford && (
              <div className="mt-4 flex items-start gap-2 rounded-[var(--radius)] border border-[var(--amber-deep)]/30 bg-[var(--amber-deep)]/10 px-3 py-2.5 text-[11px] text-[var(--amber)]">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <span>
                  You need {formatCurrency(shortfall)} more. Add funds to your wallet to
                  complete this purchase.
                </span>
              </div>
            )}

            <div className="mt-5 flex-1" />

            {canAfford ? (
              <button
                onClick={handlePurchase}
                disabled={phase !== "idle"}
                className="btn-gold flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {phase === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                  </>
                ) : phase === "done" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Purchased
                  </>
                ) : (
                  <>Pay {formatCurrency(pkg.invest)}</>
                )}
              </button>
            ) : (
              <Link
                href="/deposit"
                className="btn-gold flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold no-underline"
              >
                <Plus className="h-4 w-4" />
                Add funds
              </Link>
            )}

            <AnimatePresence>
              {phase === "done" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-center text-xs text-[var(--gold)]"
                >
                  {pkg.name} package activated — opening your dashboard…
                </motion.p>
              )}
            </AnimatePresence>

            <div className="demo-pill mt-5 justify-center px-3 py-2.5 text-center">
              Demo purchase. No payment is processed.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Line({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span>{label}</span>
      <span className={highlight ? "font-bold text-[var(--gold)]" : "font-medium text-[var(--text-primary)]"}>
        {value}
      </span>
    </li>
  );
}
