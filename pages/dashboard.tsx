import Head from "next/head";
import Link from "next/link";
import { TrendingUp, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard — AmzVest ZA (DEMO)</title>
      </Head>

      <div
        style={{
          background: "rgba(245, 158, 11, 0.1)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 500,
          color: "var(--amber)",
          textAlign: "center",
        }}
      >
        <AlertTriangle style={{ width: 14, height: 14, flexShrink: 0 }} />
        DEMO — For Educational Purposes Only
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
            Welcome back, Sipho
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0" }}>
            Your investment portfolio · Growth Package
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          <MetricCard label="Invested" value="R1,000" />
          <MetricCard label="Total return" value="R3,000" gold />
          <MetricCard label="Received" value="R1,000" gold />
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Active investment</h3>
            <span
              style={{
                padding: "2px 12px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 600,
                background: "rgba(255, 215, 0, 0.12)",
                color: "var(--gold)",
              }}
            >
              Active
            </span>
          </div>
          <div style={{ padding: "0 20px" }}>
            <InvestmentRow
              name="Growth Package — R1,000 invested"
              meta="Started 2 June 2025 · Completes 23 June 2025"
            />
            <InvestmentRow
              name="Starter Package — R500 invested"
              meta="Completed 15 May 2025 · R1,500 received"
              badge="Done"
              done
              border={false}
            />
          </div>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Payout schedule</h3>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Growth Package</span>
          </div>
          <div style={{ padding: "0 20px" }}>
            <PayoutRow week="Week 1 payout" date="Paid 9 June 2025" amount="R1,000" status="Paid" paid />
            <PayoutRow week="Week 2 payout" date="Due 16 June 2025" amount="R1,000" status="Upcoming" />
            <PayoutRow week="Week 3 payout" date="Due 23 June 2025" amount="R1,000" status="Upcoming" border={false} />
          </div>
        </div>

        <div
          style={{
            padding: "16px 20px",
            borderRadius: "var(--radius-lg)",
            background: "rgba(255, 215, 0, 0.06)",
            border: "1px solid rgba(255, 215, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)" }}>
              Reinvest your returns when your cycle ends
            </div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>
              Compound your R3,000 return into a Premium package
            </div>
          </div>
          <Link
            href="/register"
            style={{
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 600,
              color: "#0a0a0f",
              background: "linear-gradient(135deg, var(--gold), var(--amber))",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 215, 0, 0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            Reinvest
          </Link>
        </div>

        <div style={{ textAlign: "right" }}>
          <Link
            href="/"
            style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Sign out
          </Link>
        </div>
      </div>
    </>
  );
}

function MetricCard({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 16,
      }}
    >
      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: gold ? "var(--gold)" : "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function InvestmentRow({
  name,
  meta,
  badge,
  done,
  border = true,
}: {
  name: string;
  meta: string;
  badge?: string;
  done?: boolean;
  border?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: border ? "1px solid var(--border)" : "none",
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{meta}</div>
      </div>
      {badge && (
        <span
          style={{
            padding: "2px 12px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            background: done ? "rgba(255, 215, 0, 0.12)" : "rgba(255, 215, 0, 0.08)",
            color: done ? "var(--gold)" : "var(--amber)",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function PayoutRow({
  week,
  date,
  amount,
  status,
  paid,
  border = true,
}: {
  week: string;
  date: string;
  amount: string;
  status: string;
  paid?: boolean;
  border?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: border ? "1px solid var(--border)" : "none",
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{week}</div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{date}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)" }}>{amount}</span>
        <span
          style={{
            padding: "2px 10px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 600,
            background: paid ? "rgba(255, 215, 0, 0.12)" : "rgba(245, 158, 11, 0.12)",
            color: paid ? "var(--gold)" : "var(--amber)",
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
