import Head from "next/head";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { INVESTORS, PAYOUTS, PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          <KpiCard label="Capital deployed" value={formatCurrency(totalDeployed)} gold />
          <KpiCard label="Active investors" value={String(activeCount)} />
          <KpiCard label="Payouts this week" value={formatCurrency(totalPayoutsThisWeek)} amber />
          <KpiCard label="Total paid out" value={formatCurrency(totalPaidOut)} gold />
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: 0 }}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: "8px 18px",
                    fontSize: 12,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    borderBottom: tab === t.id ? "2px solid var(--gold)" : "2px solid transparent",
                    color: tab === t.id ? "var(--gold)" : "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (tab !== t.id) e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (tab !== t.id) e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
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
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 14,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: gold ? "var(--gold)" : amber ? "var(--amber)" : "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function InvestorsTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-tertiary)" }}>
            {["Name", "Package", "Invested", "Return", "Status", ""].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 20px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderTop: "1px solid var(--border)" }}>
          {INVESTORS.map((inv, i) => (
            <tr
              key={inv.id}
              style={{
                borderBottom: i < INVESTORS.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-tertiary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <td style={{ padding: "10px 20px", fontWeight: 500 }}>{inv.name}</td>
              <td style={{ padding: "10px 20px", color: "var(--text-secondary)" }}>
                {inv.package.charAt(0).toUpperCase() + inv.package.slice(1)}
              </td>
              <td style={{ padding: "10px 20px" }}>{formatCurrency(inv.invested)}</td>
              <td style={{ padding: "10px 20px" }}>{formatCurrency(inv.returnAmount)}</td>
              <td style={{ padding: "10px 20px" }}>
                <StatusBadge status={inv.status} />
              </td>
              <td style={{ padding: "10px 20px" }}>
                <button
                  style={{
                    padding: "4px 12px",
                    fontSize: 10,
                    fontWeight: 500,
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold-dark)";
                    e.currentTarget.style.background = "rgba(255, 215, 0, 0.05)";
                    e.currentTarget.style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    active: { background: "rgba(255, 215, 0, 0.08)", color: "var(--gold)" },
    complete: { background: "rgba(255, 215, 0, 0.12)", color: "var(--gold)" },
    pending: { background: "rgba(245, 158, 11, 0.1)", color: "var(--amber)" },
  };
  const labels: Record<string, string> = {
    active: "Active",
    complete: "Complete",
    pending: "Pending payment",
  };
  return (
    <span
      style={{
        ...styles[status],
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 600,
      }}
    >
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
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-tertiary)" }}>
            {["Investor", "Package", "Amount", "Week", "Due date", "Action"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 20px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderTop: "1px solid var(--border)" }}>
          {PAYOUTS.map((p, i) => {
            const key = `${p.investor}-${p.week}`;
            const isPaid = paidPayouts.has(key);
            return (
              <tr
                key={key}
                style={{
                  borderBottom: i < PAYOUTS.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-tertiary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <td style={{ padding: "10px 20px", fontWeight: 500 }}>{p.investor}</td>
                <td style={{ padding: "10px 20px", color: "var(--text-secondary)" }}>
                  {p.package.charAt(0).toUpperCase() + p.package.slice(1)}
                </td>
                <td style={{ padding: "10px 20px", fontWeight: 600, color: "var(--gold)" }}>
                  {formatCurrency(p.amount)}
                </td>
                <td style={{ padding: "10px 20px", color: "var(--text-secondary)" }}>
                  Week {p.week}
                </td>
                <td style={{ padding: "10px 20px", color: "var(--text-secondary)" }}>
                  {p.dueDate}
                </td>
                <td style={{ padding: "10px 20px" }}>
                  <button
                    onClick={() => markPaid(key)}
                    disabled={isPaid}
                    style={{
                      padding: "4px 12px",
                      fontSize: 10,
                      fontWeight: 600,
                      border: isPaid ? "none" : "1px solid rgba(255, 215, 0, 0.4)",
                      borderRadius: "var(--radius)",
                      cursor: isPaid ? "default" : "pointer",
                      transition: "all 0.2s",
                      background: isPaid ? "rgba(255, 215, 0, 0.12)" : "transparent",
                      color: isPaid ? "var(--gold)" : "var(--gold-dark)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isPaid) {
                        e.currentTarget.style.background = "rgba(255, 215, 0, 0.08)";
                        e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 215, 0, 0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isPaid) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
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
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-tertiary)" }}>
            {["Package", "Investor pays", "Investor receives", "Weekly payout", "Your profit", "Active"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 20px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderTop: "1px solid var(--border)" }}>
          {PACKAGES.map((pkg, i) => {
            const activeCount = INVESTORS.filter(
              (inv) => inv.package === pkg.id && inv.status === "active"
            ).length;
            const profit = pkg.invest * 7;
            return (
              <tr
                key={pkg.id}
                style={{
                  borderBottom: i < PACKAGES.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-tertiary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <td style={{ padding: "10px 20px", fontWeight: 500 }}>{pkg.name}</td>
                <td style={{ padding: "10px 20px" }}>{formatCurrency(pkg.invest)}</td>
                <td style={{ padding: "10px 20px" }}>{formatCurrency(pkg.returnAmount)}</td>
                <td style={{ padding: "10px 20px", color: "var(--text-secondary)" }}>
                  {formatCurrency(pkg.weeklyPayout)} × {pkg.weeks}
                </td>
                <td style={{ padding: "10px 20px", fontWeight: 600, color: "var(--gold)" }}>
                  {formatCurrency(profit)}
                </td>
                <td style={{ padding: "10px 20px" }}>{activeCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
