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
    <section id="packages" className="bg-[var(--bg-primary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        {withHeader && (
          <>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold)]">
              Investment packages
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 gradient-text">
              Choose your investment tier
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2 mb-8 max-w-md">
              All packages deliver a 3&times; return over 3 equal weekly payouts. The more you invest, the more you earn.
            </p>
          </>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] bg-[var(--bg-card)] ${
                pkg.highlight
                  ? "border-2 border-[var(--gold)]"
                  : "border border-[var(--border)] hover:border-[var(--gold)]/30"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute top-3 right-3 z-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] px-2 py-0.5 text-[9px] font-bold text-[var(--bg-primary)] uppercase tracking-wider">
                  Popular
                </span>
              )}

              <div className={`px-5 py-4 border-b border-[var(--border)] ${
                pkg.highlight ? "bg-[var(--gold)]/[0.04]" : "bg-[var(--bg-tertiary)]"
              }`}>
                <div className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                  {pkg.name}
                  {pkg.highlight && (
                    <span className="ml-2 inline-block rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] px-2 py-0.5 text-[9px] font-bold text-[var(--bg-primary)] uppercase">
                      POPULAR
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold gradient-text mt-1">
                  {formatCurrency(pkg.invest)}
                </div>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-[var(--text-secondary)]">You receive</span>
                  <span className="text-lg font-bold text-[var(--gold)]">
                    {formatCurrency(pkg.returnAmount)}
                  </span>
                </div>
                <div className="border-t border-[var(--border)] mb-3" />
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-medium text-[var(--text-primary)]">{formatCurrency(pkg.weeklyPayout)}/week</span> &times; {pkg.weeks} payouts<br />
                  Over {pkg.weeks} weeks<br />
                  200% net gain
                </div>

                <Link
                  href="/register"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`mt-4 block w-full rounded-[var(--radius)] py-2 text-center text-xs font-semibold no-underline transition-all ${
                    pkg.highlight
                      ? "bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] text-[var(--bg-primary)] hover:shadow-[0_8px_30px_rgba(255,215,0,0.25)]"
                      : "border border-[var(--border)] text-[var(--gold)] hover:bg-[var(--gold)]/[0.05]"
                  }`}
                >
                  Choose {pkg.name}
                </Link>

                <p className="mt-2 text-center text-[10px] text-[var(--amber)]">
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
