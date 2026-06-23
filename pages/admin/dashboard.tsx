import Head from "next/head";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { INVESTORS, PAYOUTS, PACKAGES, getPackage } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
          <div className="rounded-lg bg-[var(--surface-muted)] p-3">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Capital deployed</div>
            <div className="text-lg font-medium text-[#1D9E75]">{formatCurrency(totalDeployed)}</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-muted)] p-3">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Active investors</div>
            <div className="text-lg font-medium">{activeCount}</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-muted)] p-3">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Payouts this week</div>
            <div className="text-lg font-medium text-[#BA7517]">{formatCurrency(totalPayoutsThisWeek)}</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-muted)] p-3">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Total paid out</div>
            <div className="text-lg font-medium text-[#1D9E75]">{formatCurrency(totalPaidOut)}</div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] overflow-hidden">
          <div className="px-5 pt-4 border-b border-[var(--border-tertiary)]">
            <div className="flex gap-0">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "px-4 py-2 text-xs font-medium border-b-2 transition",
                    tab === t.id
                      ? "text-[#1D9E75] border-[#1D9E75]"
                      : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "investors" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[var(--surface-muted)]">
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Package</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Invested</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Return</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-tertiary)]">
                  {INVESTORS.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[var(--surface-muted)]">
                      <td className="px-5 py-3 font-medium">{inv.name}</td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">{inv.package}</td>
                      <td className="px-5 py-3">{formatCurrency(inv.invested)}</td>
                      <td className="px-5 py-3">{formatCurrency(inv.returnAmount)}</td>
                      <td className="px-5 py-3">
                        <span className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                          inv.status === "active" && "bg-[#E1F5EE] text-[#0F6E56]",
                          inv.status === "complete" && "bg-[#EAF3DE] text-[#3B6D11]",
                          inv.status === "pending" && "bg-[#FAEEDA] text-[#633806]"
                        )}>
                          {inv.status === "complete" ? "Complete" : inv.status === "pending" ? "Pending payment" : "Active"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button className="rounded-lg border border-[var(--border-secondary)] px-3 py-1 text-[10px] hover:bg-[var(--surface-muted)] transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "payouts" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[var(--surface-muted)]">
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Investor</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Package</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Amount</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Week</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Due date</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-tertiary)]">
                  {PAYOUTS.map((p, i) => {
                    const key = `${p.investor}-${p.week}`;
                    const isPaid = paidPayouts.has(key);
                    return (
                      <tr key={i} className="hover:bg-[var(--surface-muted)]">
                        <td className="px-5 py-3 font-medium">{p.investor}</td>
                        <td className="px-5 py-3 text-[var(--text-secondary)]">{p.package}</td>
                        <td className="px-5 py-3 font-medium text-[#1D9E75]">{formatCurrency(p.amount)}</td>
                        <td className="px-5 py-3 text-[var(--text-secondary)]">Week {p.week}</td>
                        <td className="px-5 py-3 text-[var(--text-secondary)]">{p.dueDate}</td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => markPaid(key)}
                            disabled={isPaid}
                            className={cn(
                              "rounded-lg px-3 py-1 text-[10px] font-medium transition",
                              isPaid
                                ? "bg-[#EAF3DE] text-[#3B6D11] cursor-default"
                                : "border border-[#1D9E75] text-[#0F6E56] hover:bg-[#E1F5EE]"
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
          )}

          {tab === "packages" && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[var(--surface-muted)]">
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Package</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Investor pays</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Investor receives</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Weekly payout</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Your profit</th>
                    <th className="text-left px-5 py-3 font-medium text-[var(--text-secondary)] uppercase tracking-wider">Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-tertiary)]">
                  {PACKAGES.map((pkg) => {
                    const activeCount = INVESTORS.filter(
                      (i) => i.package === pkg.id && i.status === "active"
                    ).length;
                    const profit = pkg.invest * 7; // fictional profit calc
                    return (
                      <tr key={pkg.id} className="hover:bg-[var(--surface-muted)]">
                        <td className="px-5 py-3 font-medium">{pkg.name}</td>
                        <td className="px-5 py-3">{formatCurrency(pkg.invest)}</td>
                        <td className="px-5 py-3">{formatCurrency(pkg.returnAmount)}</td>
                        <td className="px-5 py-3 text-[var(--text-secondary)]">{formatCurrency(pkg.weeklyPayout)} × {pkg.weeks}</td>
                        <td className="px-5 py-3 font-medium text-[#1D9E75]">{formatCurrency(profit)}</td>
                        <td className="px-5 py-3">{activeCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
