import Head from "next/head";
import { useState } from "react";
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
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          <KpiCard label="Capital deployed" value={formatCurrency(totalDeployed)} gold />
          <KpiCard label="Active investors" value={String(activeCount)} />
          <KpiCard label="Payouts this week" value={formatCurrency(totalPayoutsThisWeek)} amber />
          <KpiCard label="Total paid out" value={formatCurrency(totalPaidOut)} gold />
        </div>

        <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-card)] border border-[var(--border)]">
          <div className="flex px-5 pt-4 border-b border-[var(--border)]">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-4 py-2 text-xs",
                  tab === t.id
                    ? "font-semibold text-[var(--gold)] border-b-2 border-[var(--gold)]"
                    : "font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "investors" && <InvestorsTable />}
          {tab === "payouts" && (
            <PayoutsTable paidPayouts={paidPayouts} markPaid={markPaid} />
          )}
          {tab === "packages" && <PackagesTable />}
        </div>
      </AdminLayout>
    </>
  );
}

function KpiCard({ label, value, gold, amber }: { label: string; value: string; gold?: boolean; amber?: boolean }) {
  return (
    <div className="rounded-[var(--radius)] bg-[var(--bg-card)] border border-[var(--border)] p-3">
      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">
        {label}
      </div>
      <div className={cn("text-lg font-bold", amber ? "text-[var(--amber)]" : "text-[var(--gold)]")}>
        {value}
      </div>
    </div>
  );
}

function InvestorsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[var(--bg-tertiary)]">
            {["Name", "Package", "Invested", "Return", "Status", ""].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-tertiary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVESTORS.map((inv, i) => (
            <tr
              key={inv.id}
              className={cn(
                "hover:bg-[var(--gold)]/[0.02] transition",
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
                <button className="rounded-[var(--radius)] border border-[var(--border)] px-3 py-1 text-[10px] hover:bg-[var(--bg-tertiary)] transition">
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
  return (
    <span className={cn(base, colorMap[status] || "text-[var(--text-muted)]")}>
      {labels[status]}
    </span>
  );
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
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[var(--bg-tertiary)]">
            {["Investor", "Package", "Amount", "Week", "Due date", "Action"].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-tertiary)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PAYOUTS.map((p, i) => {
            const key = `${p.investor}-${p.week}`;
            const isPaid = paidPayouts.has(key);
            return (
              <tr
                key={key}
                className={cn(
                  "hover:bg-[var(--gold)]/[0.02] transition",
                  i < PAYOUTS.length - 1 && "border-b border-[var(--border)]"
                )}
              >
                <td className="px-5 py-3 font-medium">{p.investor}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {p.package.charAt(0).toUpperCase() + p.package.slice(1)}
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--gold)]">
                  {formatCurrency(p.amount)}
                </td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  Week {p.week}
                </td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {p.dueDate}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => markPaid(key)}
                    disabled={isPaid}
                    className={cn(
                      "rounded-[var(--radius)] px-3 py-1 text-[10px] font-semibold transition",
                      isPaid
                        ? "bg-[var(--gold)]/[0.12] text-[var(--gold)] cursor-default"
                        : "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)]/[0.08]"
                    )}
                  >
                    {isPaid ? "✓ Paid" : "Mark paid"}
                  </button>
                </td>
              </tr>
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
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[var(--bg-tertiary)]">
            {["Package", "Investor pays", "Investor receives", "Weekly payout", "Your profit", "Active"].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider bg-[var(--bg-tertiary)]"
              >
                {h}
              </th>
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
                  "hover:bg-[var(--gold)]/[0.02] transition",
                  i < PACKAGES.length - 1 && "border-b border-[var(--border)]"
                )}
              >
                <td className="px-5 py-3 font-medium">{pkg.name}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.invest)}</td>
                <td className="px-5 py-3">{formatCurrency(pkg.returnAmount)}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)]">
                  {formatCurrency(pkg.weeklyPayout)} × {pkg.weeks}
                </td>
                <td className="px-5 py-3 font-semibold text-[var(--gold)]">
                  {formatCurrency(profit)}
                </td>
                <td className="px-5 py-3">{activeCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
