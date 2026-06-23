import Head from "next/head";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard — AmzVest ZA (DEMO)</title>
      </Head>
      <Disclaimer variant="banner">
        DEMO — For Educational Purposes Only. All data, returns, and content are completely fictional.
      </Disclaimer>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium">Welcome back, Sipho</h2>
          <p className="text-sm text-[var(--text-secondary)]">Your investment portfolio · Growth Package</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-lg bg-[var(--surface-muted)] p-4">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Invested</div>
            <div className="text-xl font-medium">R1,000</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-muted)] p-4">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Total return</div>
            <div className="text-xl font-medium text-[#1D9E75]">R3,000</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-muted)] p-4">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-1">Received</div>
            <div className="text-xl font-medium text-[#1D9E75]">R1,000</div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-tertiary)]">
            <h3 className="text-sm font-medium">Active investment</h3>
            <span className="rounded-full bg-[#E1F5EE] px-3 py-0.5 text-[10px] font-medium text-[#0F6E56]">Active</span>
          </div>
          <div className="px-5">
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-tertiary)]">
              <div>
                <div className="text-sm font-medium">Growth Package — R1,000 invested</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Started 2 June 2025 · Completes 23 June 2025</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">Starter Package — R500 invested</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Completed 15 May 2025 · R1,500 received</div>
              </div>
              <span className="rounded-full bg-[#EAF3DE] px-3 py-0.5 text-[10px] font-medium text-[#3B6D11]">Done</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-tertiary)]">
            <h3 className="text-sm font-medium">Payout schedule</h3>
            <span className="text-[11px] text-[var(--text-secondary)]">Growth Package</span>
          </div>
          <div className="px-5">
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-tertiary)]">
              <div>
                <div className="text-sm font-medium">Week 1 payout</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Paid 9 June 2025</div>
              </div>
              <div className="text-sm font-medium text-[#1D9E75]">R1,000</div>
              <span className="rounded-full bg-[#EAF3DE] px-3 py-0.5 text-[10px] font-medium text-[#3B6D11]">Paid</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[var(--border-tertiary)]">
              <div>
                <div className="text-sm font-medium">Week 2 payout</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Due 16 June 2025</div>
              </div>
              <div className="text-sm font-medium text-[#1D9E75]">R1,000</div>
              <span className="rounded-full bg-[#FAEEDA] px-3 py-0.5 text-[10px] font-medium text-[#633806]">Upcoming</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium">Week 3 payout</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Due 23 June 2025</div>
              </div>
              <div className="text-sm font-medium text-[#1D9E75]">R1,000</div>
              <span className="rounded-full bg-[#FAEEDA] px-3 py-0.5 text-[10px] font-medium text-[#633806]">Upcoming</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-[#E1F5EE] px-5 py-4 flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium text-[#0F6E56]">Reinvest your returns when your cycle ends</div>
            <div className="text-[11px] text-[#1D9E75] mt-0.5">Compound your R3,000 return into a Premium package</div>
          </div>
          <Link href="/register" className="rounded-lg bg-[#1D9E75] px-4 py-2 text-xs font-medium text-white no-underline hover:bg-[#0F6E56] transition">
            Reinvest
          </Link>
        </div>

        <div className="text-right">
          <Link href="/" className="text-xs text-[var(--text-secondary)] no-underline hover:text-[var(--text-primary)]">Sign out</Link>
        </div>
      </div>
    </>
  );
}
