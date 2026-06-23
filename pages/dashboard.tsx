import Head from "next/head";
import Link from "next/link";
import { TrendingUp, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard — AmzVest ZA (DEMO)</title>
      </Head>

      <div className="bg-[var(--amber-deep)]/20 border-b border-[var(--amber-deep)]/20 px-4 py-2 flex items-center justify-center gap-2 text-xs font-medium text-[var(--amber)]">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
        DEMO — For Educational Purposes Only
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Welcome back, Sipho
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Your investment portfolio · Growth Package
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <MetricCard label="Invested" value="R1,000" />
          <MetricCard label="Total return" value="R3,000" gold />
          <MetricCard label="Received" value="R1,000" gold />
        </div>

        <div className="card-premium mb-4">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold">Active investment</h3>
            <span className="rounded-full bg-[var(--gold)]/[0.12] text-[var(--gold)] px-3 py-0.5 text-[10px] font-bold">
              Active
            </span>
          </div>
          <div className="px-5">
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

        <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border)] mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold">Payout schedule</h3>
            <span className="text-[11px] text-[var(--text-secondary)]">Growth Package</span>
          </div>
          <div className="px-5">
            <PayoutRow week="Week 1 payout" date="Paid 9 June 2025" amount="R1,000" status="Paid" paid />
            <PayoutRow week="Week 2 payout" date="Due 16 June 2025" amount="R1,000" status="Upcoming" />
            <PayoutRow week="Week 3 payout" date="Due 23 June 2025" amount="R1,000" status="Upcoming" border={false} />
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] bg-[var(--gold)]/[0.06] border border-[var(--gold)]/[0.15] px-5 py-4 flex items-center justify-between mb-6">
          <div>
            <div className="text-sm font-semibold text-[var(--gold)]">
              Reinvest your returns when your cycle ends
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-1">
              Compound your R3,000 return into a Premium package
            </div>
          </div>
          <Link
            href="/register"
            className="btn-gold inline-flex px-4 py-2 text-xs no-underline"
          >
            Reinvest
          </Link>
        </div>

        <div className="text-right">
          <Link
            href="/"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] no-underline"
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
    <div className="rounded-[var(--radius)] bg-[var(--bg-card)] border border-[var(--border)] p-4">
      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">
        {label}
      </div>
      <div className={`text-xl font-bold ${gold ? "text-[var(--gold)]" : "text-[var(--text-primary)]"}`}>
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
    <div className={`flex items-center justify-between py-3 ${border ? "border-b border-[var(--border)]" : ""}`}>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{meta}</div>
      </div>
      {badge && (
        <span
          className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
            done
              ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]"
              : "bg-[var(--gold)]/[0.08] text-[var(--amber)]"
          }`}
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
    <div className={`flex items-center justify-between py-3 ${border ? "border-b border-[var(--border)]" : ""}`}>
      <div>
        <div className="text-sm font-medium">{week}</div>
        <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{date}</div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-bold text-[var(--gold)]">{amount}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
            paid
              ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]"
              : "bg-[var(--amber-deep)]/[0.12] text-[var(--amber)]"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
