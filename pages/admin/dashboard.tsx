import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Users,
  CalendarClock,
  CheckCircle2,
  Loader2,
  X,
  Zap,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { INVESTORS, PAYOUTS, PACKAGES, type Investor } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";

type TabId = "investors" | "payouts" | "packages";

const TABS: { id: TabId; label: string }[] = [
  { id: "investors", label: "Investors" },
  { id: "payouts", label: "Payouts due" },
  { id: "packages", label: "Package overview" },
];

const payoutKey = (investor: string, week: number) => `${investor}-${week}`;

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<TabId>("investors");
  const [paid, setPaid] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState<string | null>(null);
  const [selected, setSelected] = useState<Investor | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [burst, setBurst] = useState(0);

  const totalDeployed = INVESTORS.reduce((s, i) => s + i.invested, 0);
  const activeCount = INVESTORS.filter((i) => i.status === "active").length;

  const { dueRemaining, paidThisSession } = useMemo(() => {
    let due = 0;
    let done = 0;
    for (const p of PAYOUTS) {
      if (paid.has(payoutKey(p.investor, p.week))) done += p.amount;
      else due += p.amount;
    }
    return { dueRemaining: due, paidThisSession: done };
  }, [paid]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const processPayout = (investor: string, week: number, amount: number) => {
    const key = payoutKey(investor, week);
    if (paid.has(key) || processing) return;
    setProcessing(key);
    window.setTimeout(() => {
      setPaid((prev) => new Set(prev).add(key));
      setProcessing(null);
      setBurst((b) => b + 1);
      setToast(`Payout of ${formatCurrency(amount)} to ${investor} processed (demo)`);
    }, 1100);
  };

  const processAll = () => {
    if (processing) return;
    const remaining = PAYOUTS.filter((p) => !paid.has(payoutKey(p.investor, p.week)));
    if (remaining.length === 0) return;
    setPaid(new Set(PAYOUTS.map((p) => payoutKey(p.investor, p.week))));
    setBurst((b) => b + 1);
    const total = remaining.reduce((s, p) => s + p.amount, 0);
    setToast(`${remaining.length} payouts (${formatCurrency(total)}) processed (demo)`);
  };

  return (
    <>
      <Head>
        <title>Admin · Dashboard — AmzVest ZA (DEMO)</title>
      </Head>
      <AdminLayout title="Admin panel" description="AmzVest ZA · Operations dashboard">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard label="Capital deployed" value={formatCurrency(totalDeployed)} icon={Banknote} index={0} />
          <KpiCard label="Active investors" value={String(activeCount)} icon={Users} index={1} />
          <KpiCard label="Payouts due" value={formatCurrency(dueRemaining)} icon={CalendarClock} amber index={2} />
          <KpiCard label="Paid this session" value={formatCurrency(paidThisSession)} icon={CheckCircle2} index={3} />
        </div>

        <div className="card-glass overflow-hidden">
          <div className="flex border-b border-[var(--border)] px-5 pt-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative px-4 pb-3 text-xs transition-colors",
                  tab === t.id
                    ? "font-semibold text-[var(--gold)]"
                    : "font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {t.label}
                {tab === t.id && (
                  <motion.div
                    layoutId="admin-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--gold)]"
                  />
                )}
              </button>
            ))}
          </div>

          {tab === "investors" && <InvestorsTable onView={setSelected} />}
          {tab === "payouts" && (
            <PayoutsTable
              paid={paid}
              processing={processing}
              onProcess={processPayout}
              onProcessAll={processAll}
              dueRemaining={dueRemaining}
              burst={burst}
            />
          )}
          {tab === "packages" && <PackagesTable />}
        </div>
      </AdminLayout>

      <InvestorModal investor={selected} onClose={() => setSelected(null)} />
      <Toast message={toast} />
    </>
  );
}

/* ── KPI ──────────────────────────────────────────── */
function KpiCard({
  label,
  value,
  icon: Icon,
  amber,
  index,
}: {
  label: string;
  value: string;
  icon: typeof Banknote;
  amber?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="card-glass p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
        <Icon className={cn("h-3.5 w-3.5", amber ? "text-[var(--amber)]" : "text-[var(--gold)]")} />
      </div>
      <div className={cn("text-lg font-bold tabular-nums", amber ? "text-[var(--amber)]" : "text-[var(--gold)]")}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Shared table bits ────────────────────────────── */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="bg-[var(--bg-tertiary)] px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: string }) {
  const base = "rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-[var(--gold)]/[0.12]";
  const colorMap: Record<string, string> = {
    active: "text-[var(--gold)]",
    complete: "text-[var(--amber)]",
    pending: "text-[var(--text-muted)]",
  };
  const labels: Record<string, string> = {
    active: "Active",
    complete: "Complete",
    pending: "Pending payment",
  };
  return <span className={cn(base, colorMap[status] || "text-[var(--text-muted)]")}>{labels[status]}</span>;
}

/* ── Investors ────────────────────────────────────── */
function InvestorsTable({ onView }: { onView: (inv: Investor) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {["Name", "Package", "Invested", "Return", "Status", ""].map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVESTORS.map((inv, i) => (
            <tr
              key={inv.id}
              onClick={() => onView(inv)}
              className={cn(
                "cursor-pointer transition hover:bg-[var(--gold)]/[0.03]",
                i < INVESTORS.length - 1 && "border-b border-[var(--border)]"
              )}
            >
              <td className="px-5 py-3 font-medium">{inv.name}</td>
              <td className="px-5 py-3 text-[var(--text-secondary)]">
                {inv.package.charAt(0).toUpperCase() + inv.package.slice(1)}
              </td>
              <td className="px-5 py-3">{formatCurrency(inv.invested)}</td>
              <td className="px-5 py-3">{formatCurrency(inv.returnAmount)}</td>
              <td className="px-5 py-3">
                <StatusBadge status={inv.status} />
              </td>
              <td className="px-5 py-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(inv);
                  }}
                  className="rounded-[var(--radius)] border border-[var(--border)] px-3 py-1 text-[10px] transition hover:border-[var(--gold)]/40 hover:bg-[var(--bg-tertiary)] hover:text-[var(--gold)]"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Payouts ──────────────────────────────────────── */
function PayoutsTable({
  paid,
  processing,
  onProcess,
  onProcessAll,
  dueRemaining,
  burst,
}: {
  paid: Set<string>;
  processing: string | null;
  onProcess: (investor: string, week: number, amount: number) => void;
  onProcessAll: () => void;
  dueRemaining: number;
  burst: number;
}) {
  const allDone = dueRemaining === 0;
  return (
    <div className="relative">
      <ConfettiBurst trigger={burst} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3.5">
        <p className="text-xs text-[var(--text-secondary)]">
          {allDone ? (
            <span className="font-medium text-[var(--gold)]">All payouts processed ✨</span>
          ) : (
            <>
              <span className="font-semibold text-[var(--amber)]">{formatCurrency(dueRemaining)}</span> still due
              this cycle
            </>
          )}
        </p>
        <button
          onClick={onProcessAll}
          disabled={allDone || !!processing}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[var(--radius)] px-4 py-2 text-xs font-semibold transition",
            allDone || processing
              ? "cursor-not-allowed bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
              : "btn-gold"
          )}
        >
          <Zap className="h-3.5 w-3.5" />
          Process all due
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              {["Investor", "Package", "Amount", "Week", "Due date", "Action"].map((h) => (
                <Th key={h}>{h}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYOUTS.map((p, i) => {
              const key = payoutKey(p.investor, p.week);
              const isPaid = paid.has(key);
              const isProcessing = processing === key;
              return (
                <motion.tr
                  key={key}
                  animate={isPaid ? { backgroundColor: "rgba(255,215,0,0.04)" } : {}}
                  className={cn(i < PAYOUTS.length - 1 && "border-b border-[var(--border)]")}
                >
                  <td className="px-5 py-3 font-medium">{p.investor}</td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">
                    {p.package.charAt(0).toUpperCase() + p.package.slice(1)}
                  </td>
                  <td className="px-5 py-3 font-semibold text-[var(--gold)]">{formatCurrency(p.amount)}</td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">Week {p.week}</td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">{p.dueDate}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => onProcess(p.investor, p.week, p.amount)}
                      disabled={isPaid || !!processing}
                      className={cn(
                        "inline-flex min-w-[110px] items-center justify-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-[10px] font-semibold transition",
                        isPaid
                          ? "cursor-default bg-[var(--gold)]/[0.12] text-[var(--gold)]"
                          : isProcessing
                            ? "cursor-wait border border-[var(--gold)]/40 text-[var(--gold)]"
                            : "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/[0.08] disabled:opacity-40"
                      )}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                        </>
                      ) : isProcessing ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing…
                        </>
                      ) : (
                        "Process payout"
                      )}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Packages ─────────────────────────────────────── */
function PackagesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            {["Package", "Investor pays", "Investor receives", "Weekly payout", "Your profit", "Active"].map((h) => (
              <Th key={h}>{h}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PACKAGES.map((pkg, i) => {
            const activeCount = INVESTORS.filter(
              (inv) => inv.package === pkg.id && inv.status === "active"
            ).length;
            const profit = pkg.invest * 7;
            return (
              <tr
                key={pkg.id}
                className={cn(
                  "transition hover:bg-[var(--gold)]/[0.03]",
                  i < PACKAGES.length - 1 && "border-b border-[var(--border)]"
                )}
              >
                <td className="px-5 py-3 font-medium">{pkg.name}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.invest)}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.returnAmount)}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {formatCurrency(pkg.weeklyPayout)} × {pkg.weeks}
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--gold)]">{formatCurrency(profit)}</td>
                <td className="px-5 py-3">{activeCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Investor detail modal ────────────────────────── */
function InvestorModal({ investor, onClose }: { investor: Investor | null; onClose: () => void }) {
  useEffect(() => {
    if (!investor) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [investor, onClose]);

  const pkg = investor ? PACKAGES.find((p) => p.id === investor.package) : undefined;

  return (
    <AnimatePresence>
      {investor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="card-glass relative w-full max-w-md p-6"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] text-base font-bold text-[var(--bg-primary)]">
                {investor.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{investor.name}</h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {investor.id} · {pkg?.name} package
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Invested" value={formatCurrency(investor.invested)} />
              <Stat label="Total return" value={formatCurrency(investor.returnAmount)} gold />
              <Stat label="Weekly payout" value={pkg ? formatCurrency(pkg.weeklyPayout) : "—"} />
              <Stat label="Status" value={<StatusBadge status={investor.status} />} />
            </div>

            {pkg && (
              <div className="mt-5">
                <p className="mb-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Payout schedule
                </p>
                <div className="space-y-1.5">
                  {Array.from({ length: pkg.weeks }).map((_, w) => (
                    <div
                      key={w}
                      className="flex items-center justify-between rounded-[var(--radius)] bg-[var(--bg-tertiary)] px-3 py-2 text-xs"
                    >
                      <span className="text-[var(--text-secondary)]">Week {w + 1} payout</span>
                      <span className="font-semibold text-[var(--gold)]">
                        {formatCurrency(pkg.weeklyPayout)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="demo-pill mt-5 justify-center px-3 py-2 text-center">
              Demo record. This investor and all figures are fictional.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value, gold }: { label: string; value: React.ReactNode; gold?: boolean }) {
  return (
    <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-tertiary)] p-3">
      <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{label}</div>
      <div className={cn("mt-1 text-sm font-bold", gold ? "text-[var(--gold)]" : "text-[var(--text-primary)]")}>
        {value}
      </div>
    </div>
  );
}

/* ── Toast ────────────────────────────────────────── */
function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 24, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[130] flex items-center gap-2.5 rounded-full border border-[var(--gold)]/30 bg-[var(--bg-card)]/95 px-5 py-3 text-sm text-[var(--text-primary)] shadow-[var(--shadow-card)] backdrop-blur"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)]/[0.15] text-[var(--gold)]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Confetti burst (no external deps, deterministic) ── */
const CONFETTI_COUNT = 28;
const CONFETTI_PIECES = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
  id: i,
  angle: (i / CONFETTI_COUNT) * Math.PI * 2,
  distance: 90 + ((i * 37) % 130),
  size: 5 + ((i * 13) % 6),
  gold: i % 2 === 0,
  rotate: ((i * 47) % 360) - 180,
  duration: 0.9 + ((i * 7) % 5) / 10,
}));

function ConfettiBurst({ trigger }: { trigger: number }) {
  if (trigger === 0) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-10 z-20 h-0 w-0" aria-hidden="true">
      {CONFETTI_PIECES.map((p) => (
        <motion.span
          key={`${trigger}-${p.id}`}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance + 60,
            rotate: p.rotate,
            scale: 0.4,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size * 1.4,
            borderRadius: 2,
            background: p.gold ? "var(--gold)" : "var(--amber)",
          }}
        />
      ))}
    </div>
  );
}
