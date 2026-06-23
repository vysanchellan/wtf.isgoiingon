import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Shield, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-[var(--bg-primary)] px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="gradient-border relative mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-xl)] bg-[var(--bg-card)] px-6 py-14 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(255,215,0,0.08),transparent_70%)]" />
        <div className="relative">
          <h2 className="gradient-text-animated text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to try the demo?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-[var(--text-secondary)]">
            Click through the full flow — register, pick a package, and see the
            dashboard in action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="btn-gold group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold no-underline"
            >
              <TrendingUp className="h-4 w-4" />
              Start investing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/admin"
              className="btn-outline inline-flex items-center gap-2 px-7 py-3 text-sm no-underline"
            >
              <Shield className="h-4 w-4" />
              Admin panel
            </Link>
          </div>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-wider text-[var(--amber)]">
            This is a DEMO. No real investment is made.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
