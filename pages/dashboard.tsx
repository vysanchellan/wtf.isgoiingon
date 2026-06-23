import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  Wallet,
  PiggyBank,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard — AmzVest ZA (DEMO)</title>
      </Head>

      <div className="flex items-center justify-center gap-2 border-b border-[var(--amber-deep)]/20 bg-[var(--amber-deep)]/20 px-4 py-2 text-xs font-medium text-[var(--amber)]">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        DEMO — For Educational Purposes Only. All figures below are fictional.
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Welcome back, Sipho
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Your investment portfolio · Growth Package
          </p>
        </motion.div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <MetricCard label="Invested" value="R1,000" icon={Wallet} index={0} />
          <MetricCard label="Total return" value="R3,000" icon={TrendingUp} gold index={1} />
          <MetricCard label="Received" value="R1,000" icon={PiggyBank} gold index={2} />
        </div>

        <Card index={3}>
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
            <h2 className="text-sm font-semibold">Active investment</h2>
            <span className="rounded-full bg-[var(--gold)]/[0.12] px-3 py-0.5 text-[10px] font-bold text-[var(--gold)]">
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
        </Card>

        <Card index={4}>
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
            <h2 className="text-sm font-semibold">Payout schedule</h2>
            <span className="text-[11px] text-[var(--text-secondary)]">Growth Package</span>
          </div>
          <div className="px-5 pt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span>Cycle progress</span>
              <span className="text-[var(--gold)]">1 of 3 payouts</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "33%" }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--amber)]"
              />
            </div>
          </div>
          <div className="px-5">
            <PayoutRow week="Week 1 payout" date="Paid 9 June 2025" amount="R1,000" status="Paid" paid />
            <PayoutRow week="Week 2 payout" date="Due 16 June 2025" amount="R1,000" status="Upcoming" />
            <PayoutRow week="Week 3 payout" date="Due 23 June 2025" amount="R1,000" status="Upcoming" border={false} />
          </div>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6 flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--gold)]/[0.15] bg-[var(--gold)]/[0.06] px-5 py-4"
        >
          <div>
            <div className="text-sm font-semibold text-[var(--gold)]">
              Reinvest your returns when your cycle ends
            </div>
            <div className="mt-1 text-[11px] text-[var(--text-secondary)]">
              Compound your R3,000 return into a Premium package
            </div>
          </div>
          <Link
            href="/register"
            className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold no-underline"
          >
            Reinvest
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <div className="text-right">
          <Link
            href="/"
            className="text-xs text-[var(--text-muted)] no-underline hover:text-[var(--text-primary)]"
          >
            Sign out
          </Link>
        </div>
      </div>
    </>
  );
}

function Card({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glass mb-4 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  gold,
  index,
}: {
  label: string;
  value: string;
  icon: typeof Wallet;
  gold?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glass p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
        <Icon className={`h-3.5 w-3.5 ${gold ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`} />
      </div>
      <div className={`text-xl font-bold ${gold ? "text-[var(--gold)]" : "text-[var(--text-primary)]"}`}>
        {value}
      </div>
    </motion.div>
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
    <div className={`flex items-center justify-between py-3.5 ${border ? "border-b border-[var(--border)]" : ""}`}>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{meta}</div>
      </div>
      {badge && (
        <span
          className={`rounded-full px-3 py-0.5 text-[10px] font-bold ${
            done ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]" : "bg-[var(--gold)]/[0.08] text-[var(--amber)]"
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
    <div className={`flex items-center justify-between py-3.5 ${border ? "border-b border-[var(--border)]" : ""}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            paid ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]" : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
          }`}
        >
          {paid ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
        </span>
        <div>
          <div className="text-sm font-medium">{week}</div>
          <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">{date}</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-bold text-[var(--gold)]">{amount}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
            paid ? "bg-[var(--gold)]/[0.12] text-[var(--gold)]" : "bg-[var(--amber-deep)]/[0.12] text-[var(--amber)]"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
