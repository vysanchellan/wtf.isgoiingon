import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { PACKAGES, getPackage, type PackageId } from "@/lib/data";
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
      <div className="min-h-[calc(100vh-116px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-glow)] p-8 shadow-[var(--shadow-glow)]">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] flex items-center justify-center">
              <TrendingUp className="h-[18px] w-[18px] text-[#0a0a0f]" />
            </div>
            <span className="text-sm font-semibold text-[var(--gold)]">
              AmzVest ZA
            </span>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Create your account
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 mb-5">
            Join 143 investors already earning returns
          </p>

          <div className="rounded-[var(--radius)] bg-[var(--gold)]/[0.06] border border-[var(--gold)]/[0.15] px-4 py-3 mb-5">
            <div className="text-xs font-semibold text-[var(--gold)]">
              {pkg.name} Package selected
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              Invest {formatCurrency(pkg.invest)} · Receive {formatCurrency(pkg.returnAmount)} over {pkg.weeks} weeks ({formatCurrency(pkg.weeklyPayout)}/week)
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Full name
              </label>
              <input
                type="text"
                placeholder="Sipho Nkosi"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="sipho@email.com"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="+27 82 000 0000"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Investment package
              </label>
              <select
                value={pkgId}
                onChange={(e) => setPkgId(e.target.value as PackageId)}
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition cursor-pointer"
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
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1.5">
                Create password
              </label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full px-3 py-2.5 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-[var(--radius)] text-[var(--text-primary)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 transition"
              />
            </div>
            <Link
              href="/dashboard"
              className="btn-gold block w-full text-center py-2.5 text-sm font-semibold no-underline mt-0.5"
            >
              Create account &amp; proceed to payment
            </Link>
          </div>

          <div className="text-center text-xs text-[var(--text-secondary)] mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--gold)] no-underline">
              Sign in
            </Link>
          </div>

          <div className="mt-4 rounded-[var(--radius)] bg-[var(--amber-deep)]/10 border border-[var(--amber-deep)]/20 px-3 py-2.5 text-[11px] text-[var(--amber)] text-center font-medium">
            This is a DEMO. No real account is created.
          </div>
        </div>
      </div>
    </>
  );
}
