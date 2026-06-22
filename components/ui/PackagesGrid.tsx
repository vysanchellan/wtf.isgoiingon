import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { PACKAGES } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type Props = {
  /** When true, the section renders with id/header for marketing pages. */
  withHeader?: boolean;
  /** Where the "Choose" CTA on each card links to. Defaults to checkout. */
  ctaHref?: (id: string) => string;
};

export function PackagesGrid({ withHeader = true, ctaHref }: Props) {
  return (
    <section id="packages" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {withHeader && (
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Three tiers. No surprises.
              </h2>
              <p className="mt-3 text-[color:var(--foreground)]/70">
                Skip, pause, or change tiers any time. Prices include shipping in the
                continental US (in this fictional world).
              </p>
            </div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              All prices are illustrative — demo only.
            </p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const href = (ctaHref ?? ((id) => `/checkout?package=${id}`))(pkg.id);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border bg-[color:var(--surface)] p-6 shadow-sm transition",
                  "hover:-translate-y-0.5 hover:shadow-md",
                  pkg.highlight
                    ? "border-[color:var(--brand)]/60 ring-1 ring-[color:var(--brand)]/30"
                    : "border-[color:var(--border)]"
                )}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-[color:var(--brand)] px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                    <Star className="h-3 w-3" />
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-[color:var(--foreground)]/70">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {formatCurrency(pkg.priceMonthly)}
                  </span>
                  <span className="text-sm text-[color:var(--foreground)]/60">
                    / month
                  </span>
                </div>
                <p className="mt-1 text-xs text-[color:var(--foreground)]/55">
                  {pkg.bagsPerMonth} × 250g bag{pkg.bagsPerMonth > 1 ? "s" : ""} per delivery
                </p>

                <ul className="mt-5 space-y-2 text-sm">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand)]" />
                      <span className="text-[color:var(--foreground)]/85">{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex-1" />

                <Link
                  href={href}
                  className={cn(
                    "mt-2 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition",
                    pkg.highlight
                      ? "bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-strong)]"
                      : "border border-[color:var(--border)] text-[color:var(--foreground)] hover:border-[color:var(--brand)]/40"
                  )}
                >
                  Choose {pkg.name}
                </Link>

                <p className="mt-3 text-center text-[11px] text-amber-700 dark:text-amber-300">
                  Demo price — no real payment will be taken.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
