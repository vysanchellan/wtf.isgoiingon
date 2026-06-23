import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { PACKAGES, type PackageId, getPackage } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const PKG_IDS: PackageId[] = ["starter", "growth", "premium"];

export default function RegisterPage() {
  const { selectedPackage, setSelectedPackage } = useDemoStore();
  const [pkgId, setPkgId] = useState<PackageId>(selectedPackage);

  useEffect(() => {
    setPkgId(selectedPackage);
  }, [selectedPackage]);

  const pkg = getPackage(pkgId);

  return (
    <>
      <Head>
        <title>Register — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1D9E75]">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium">AmzVest ZA</span>
          </div>
          <h2 className="text-lg font-medium">Create your account</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6">
            Join 143 investors already earning returns
          </p>

          <div className="rounded-lg bg-[#E1F5EE] px-4 py-3 mb-5">
            <div className="text-xs font-medium text-[#0F6E56]">{pkg.name} Package selected</div>
            <div className="text-[11px] text-[#0F6E56] mt-0.5">
              Invest {formatCurrency(pkg.invest)} · Receive {formatCurrency(pkg.returnAmount)} over {pkg.weeks} weeks ({formatCurrency(pkg.weeklyPayout)}/week)
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Full name</label>
              <input type="text" placeholder="Sipho Nkosi" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Email address</label>
              <input type="email" placeholder="sipho@email.com" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Phone number</label>
              <input type="tel" placeholder="+27 82 000 0000" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Investment package</label>
              <select
                value={pkgId}
                onChange={(e) => setPkgId(e.target.value as PackageId)}
                className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20"
              >
                {PKG_IDS.map((id) => {
                  const p = getPackage(id);
                  return (
                    <option key={id} value={id}>
                      {p.name} — Invest {formatCurrency(p.invest)}, receive {formatCurrency(p.returnAmount)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-secondary)]">Create password</label>
              <input type="password" placeholder="Minimum 8 characters" className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
            </div>
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-[#1D9E75] px-4 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-[#0F6E56] transition"
            >
              Create account &amp; proceed to payment
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            Already have an account? <Link href="/login" className="text-[#1D9E75] no-underline">Sign in</Link>
          </div>

          <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-[10px] text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
            This is a DEMO. No real account is created. No payment is processed.
          </div>
        </div>
      </div>
    </>
  );
}
