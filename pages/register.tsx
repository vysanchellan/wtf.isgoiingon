import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { getPackage, type PackageId } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const PKG_IDS: PackageId[] = ["starter", "growth", "premium"];

export default function RegisterPage() {
  const { selectedPackage, setSelectedPackage } = useDemoStore();
  const pkgId = selectedPackage;
  const pkg = getPackage(pkgId);

  return (
    <>
      <Head>
        <title>Register — AmzVest ZA (DEMO)</title>
      </Head>
      <div className="relative flex min-h-[calc(100vh-116px)] items-center justify-center overflow-hidden px-4 py-12">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[var(--gold)]/[0.06] blur-[130px]" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card-glass relative w-full max-w-sm p-8 shadow-[var(--shadow-glow)]"
        >
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]">
              <TrendingUp className="h-5 w-5 text-[#0a0a0f]" />
            </div>
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
              AmzVest <span className="text-[var(--gold)]">ZA</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create your account</h1>
          <p className="mb-5 mt-1.5 text-sm text-[var(--text-secondary)]">
            Join 143 (fictional) investors in the demo
          </p>

          <div className="mb-5 rounded-[var(--radius)] border border-[var(--gold)]/[0.15] bg-[var(--gold)]/[0.06] px-4 py-3">
            <div className="text-xs font-semibold text-[var(--gold)]">
              {pkg.name} package selected
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
              Invest {formatCurrency(pkg.invest)} · Receive {formatCurrency(pkg.returnAmount)} over{" "}
              {pkg.weeks} weeks ({formatCurrency(pkg.weeklyPayout)}/week)
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="field-label">Full name</label>
              <input type="text" placeholder="Sipho Nkosi" className="input-premium" />
            </div>
            <div>
              <label className="field-label">Email address</label>
              <input type="email" placeholder="sipho@email.com" className="input-premium" />
            </div>
            <div>
              <label className="field-label">Phone number</label>
              <input type="tel" placeholder="+27 82 000 0000" className="input-premium" />
            </div>
            <div>
              <label className="field-label">Investment package</label>
              <select
                value={pkgId}
                onChange={(e) => setSelectedPackage(e.target.value as PackageId)}
                className="input-premium cursor-pointer"
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
              <label className="field-label">Create password</label>
              <input type="password" placeholder="Minimum 8 characters" className="input-premium" />
            </div>
            <Link
              href="/checkout"
              className="btn-gold mt-1 flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold no-underline"
            >
              Create account &amp; proceed to payment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 text-center text-xs text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[var(--gold)] no-underline hover:underline">
              Sign in
            </Link>
          </div>

          <div className="demo-pill mt-5 justify-center px-3 py-2.5 text-center">
            This is a DEMO. No real account is created. No payment is processed.
          </div>
        </motion.div>
      </div>
    </>
  );
}
