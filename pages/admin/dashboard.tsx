import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, Users, CalendarClock, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { INVESTORS, PAYOUTS, PACKAGES } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";

type TabId = "investors" | "payouts" | "packages";

const TABS: { id: TabId; label: string }[] = [
  { id: "investors", label: "Investors" },
  { id: "payouts", label: "Payouts due" },
  { id: "packages", label: "Package overview" },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<TabId>("investors");
  const [paidPayouts, setPaidPayouts] = useState<Set<string>>(new Set());

  const totalDeployed = INVESTORS.reduce((sum, i) => sum + i.invested, 0);
  const activeCount = INVESTORS.filter((i) => i.status === "active").length;
  const totalPayoutsThisWeek = PAYOUTS.reduce((sum, p) => sum + p.amount, 0);
  const totalPaidOut = INVESTORS.reduce((sum, i) => sum + i.returnAmount, 0);

  const markPaid = (key: string) => {
    setPaidPayouts((prev) => new Set(prev).add(key));
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
          <KpiCard label="Payouts this week" value={formatCurrency(totalPayoutsThisWeek)} icon={CalendarClock} amber index={2} />
          <KpiCard label="Total paid out" value={formatCurrency(totalPaidOut)} icon={TrendingUp} index={3} />
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

          {tab === "investors" && <InvestorsTable />}
          {tab === "payouts" && <PayoutsTable paidPayouts={paidPayouts} markPaid={markPaid} />}
          {tab === "packages" && <PackagesTable />}
        </div>
      </AdminLayout>
    </>
  );
}

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
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
        <Icon className={cn("h-3.5 w-3.5", amber ? "text-[var(--amber)]" : "text-[var(--gold)]")} />
      </div>
      <div className={cn("text-lg font-bold", amber ? "text-[var(--amber)]" : "text-[var(--gold)]")}>
        {value}
      </div>
    </motion.div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="bg-[var(--bg-tertiary)] px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
      {children}
    </th>
  );
}

function Row({ children, last }: { children: React.ReactNode; last: boolean }) {
  return (
    <tr className={cn("transition hover:bg-[var(--gold)]/[0.03]", !last && "border-b border-[var(--border)]")}>
      {children}
    </tr>
  );
}

function InvestorsTable() {
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
            <Row key={inv.id} last={i === INVESTORS.length - 1}>
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
                <button className="rounded-[var(--radius)] border border-[var(--border)] px-3 py-1 text-[10px] transition hover:border-[var(--gold)]/40 hover:bg-[var(--bg-tertiary)]">
                  View
                </button>
              </td>
            </Row>
          ))}
        </tbody>
      </table>
    </div>
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

function PayoutsTable({
  paidPayouts,
  markPaid,
}: {
  paidPayouts: Set<string>;
  markPaid: (key: string) => void;
}) {
  return (
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
            const key = `${p.investor}-${p.week}`;
            const isPaid = paidPayouts.has(key);
            return (
              <Row key={key} last={i === PAYOUTS.length - 1}>
                <td className="px-5 py-3 font-medium">{p.investor}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {p.package.charAt(0).toUpperCase() + p.package.slice(1)}
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--gold)]">{formatCurrency(p.amount)}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">Week {p.week}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">{p.dueDate}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => markPaid(key)}
                    disabled={isPaid}
                    className={cn(
                      "rounded-[var(--radius)] px-3 py-1 text-[10px] font-semibold transition",
                      isPaid
                        ? "cursor-default bg-[var(--gold)]/[0.12] text-[var(--gold)]"
                        : "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/[0.08]"
                    )}
                  >
                    {isPaid ? "✓ Paid" : "Mark paid"}
                  </button>
                </td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

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
              <Row key={pkg.id} last={i === PACKAGES.length - 1}>
                <td className="px-5 py-3 font-medium">{pkg.name}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.invest)}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.returnAmount)}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {formatCurrency(pkg.weeklyPayout)} × {pkg.weeks}
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--gold)]">{formatCurrency(profit)}</td>
                <td className="px-5 py-3">{activeCount}</td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
