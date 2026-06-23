import Link from "next/link";
import { motion } from "framer-motion";
import { PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useDemoStore } from "@/lib/store";

type Props = {
  withHeader?: boolean;
};

export function PackagesGrid({ withHeader = true }: Props) {
  const { setSelectedPackage } = useDemoStore();

  return (
    <section id="packages" className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        {withHeader && (
          <div className="mb-8">
            <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
              Investment packages
            </div>
            <h2 className="text-xl font-medium mt-1">Choose your investment tier</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              All packages deliver a 3× return over 3 equal weekly payouts. The more you invest, the more you earn.
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl overflow-hidden border transition ${
                pkg.highlight
                  ? "border-[#1D9E75] border-2"
                  : "border-[var(--border-tertiary)] hover:border-[#1D9E75]"
              }`}
            >
              <div className={`px-5 py-4 border-b border-[var(--border-tertiary)] ${
                pkg.highlight ? "bg-[#E1F5EE]" : "bg-[var(--surface-muted)]"
              }`}>
                <div className="text-[10px] font-medium tracking-wider text-[var(--text-secondary)] uppercase mb-1">
                  {pkg.name}
                  {pkg.badge && (
                    <span className="ml-2 inline-block rounded-full bg-[#1D9E75] px-2 py-0.5 text-[9px] font-medium text-white uppercase tracking-wide">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="text-xl font-medium">
                  {formatCurrency(pkg.invest)}
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[var(--text-secondary)]">You receive</span>
                  <span className="text-lg font-medium text-[#1D9E75]">{formatCurrency(pkg.returnAmount)}</span>
                </div>
                <hr className="border-[var(--border-tertiary)] mb-3" />
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--text-primary)] font-medium">{formatCurrency(pkg.weeklyPayout)}/week</strong> × {pkg.weeks} payouts<br />
                  Over {pkg.weeks} weeks<br />
                  200% net gain
                </div>
                <Link
                  href="/register"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`mt-4 block w-full rounded-lg py-2 text-center text-xs font-medium no-underline transition ${
                    pkg.highlight
                      ? "bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
                      : "bg-[#E1F5EE] text-[#0F6E56] hover:opacity-85"
                  }`}
                >
                  Choose {pkg.name}
                </Link>
                <p className="mt-2 text-center text-[10px] text-amber-700 dark:text-amber-300">
                  Fictional rate. Not real.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
