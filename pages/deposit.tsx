import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wallet, CreditCard, Landmark, Smartphone, CheckCircle2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { useDemoStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const QUICK = [500, 1000, 2500, 5000];

const METHODS = [
  { id: "EFT", label: "Instant EFT", icon: Landmark },
  { id: "Card", label: "Card", icon: CreditCard },
  { id: "SnapScan", label: "SnapScan", icon: Smartphone },
] as const;

type Phase = "idle" | "processing" | "done";

export default function DepositPage() {
  const router = useRouter();
  const { balance, deposit, hydrated } = useDemoStore();
  const [amount, setAmount] = useState<number>(1000);
  const [method, setMethod] = useState<string>("EFT");
  const [phase, setPhase] = useState<Phase>("idle");

  const valid = amount > 0;

  const handleDeposit = () => {
    if (!valid || phase !== "idle") return;
    setPhase("processing");
    window.setTimeout(() => {
      deposit(amount, method);
      setPhase("done");
      window.setTimeout(() => router.push("/wallet"), 1100);
    }, 1200);
  };

  return (
    <>
      <Head>
        <title>Add funds — AmzVest ZA (DEMO)</title>
      </Head>

      <PageHeader
        eyebrow="Wallet"
        icon={<Wallet className="h-3.5 w-3.5" />}
        title="Add funds to your wallet"
        subtitle="Top up your demo balance, then use it to purchase a package."
      >
        <Disclaimer variant="card">
          No real payment is processed. This is a simulated top-up — your balance
          only changes inside this demo, in your browser.
        </Disclaimer>
      </PageHeader>

      <section className="bg-[var(--bg-primary)] py-14">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Current balance
              </span>
              <span className="text-lg font-bold text-[var(--gold)]">
                {hydrated ? formatCurrency(balance) : "—"}
              </span>
            </div>

            <label className="field-label">Amount (ZAR)</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-semibold text-[var(--gold)]">
                R
              </span>
              <input
                type="number"
                min={0}
                value={Number.isNaN(amount) ? "" : amount}
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                style={{ paddingLeft: "2.1rem" }}
                className="input-premium text-lg font-semibold"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(q)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    amount === q
                      ? "border-[var(--gold)] bg-[var(--gold)]/[0.1] text-[var(--gold)]"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/40"
                  }`}
                >
                  {formatCurrency(q)}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="field-label">Payment method</label>
              <div className="grid grid-cols-3 gap-2">
                {METHODS.map((m) => {
                  const Icon = m.icon;
                  const active = method === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-[var(--radius)] border px-2 py-3 text-[11px] font-medium transition ${
                        active
                          ? "border-[var(--gold)] bg-[var(--gold)]/[0.08] text-[var(--gold)]"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold)]/40"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={!valid || phase !== "idle"}
              className="btn-gold mt-7 flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {phase === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </>
              ) : phase === "done" ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Funds added
                </>
              ) : (
                <>Deposit {valid ? formatCurrency(amount) : "funds"}</>
              )}
            </button>

            <AnimatePresence>
              {phase === "done" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-xs text-[var(--gold)]"
                >
                  {formatCurrency(amount)} added to your demo wallet — redirecting…
                </motion.p>
              )}
            </AnimatePresence>

            <div className="demo-pill mt-5 justify-center px-3 py-2.5 text-center">
              Demo top-up only. No card is charged, no money moves.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
