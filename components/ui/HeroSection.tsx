import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56]"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified Amazon reselling operation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-xl text-3xl font-medium leading-tight sm:text-4xl"
        >
          Put your money to work.<br />
          <strong className="font-medium text-[#1D9E75]">Triple your investment</strong> in 3 weeks.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-4 max-w-lg text-sm text-[var(--text-secondary)] leading-relaxed"
        >
          We buy and sell products on Amazon using investor capital. Every rand invested generates proven returns — paid back to you in three weekly instalments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1D9E75] px-6 py-2.5 text-sm font-medium text-white no-underline hover:bg-[#0F6E56] transition"
          >
            <TrendingUp className="h-4 w-4" />
            Start investing
          </Link>
          <a
            href="#how"
            className="inline-flex items-center rounded-lg border border-[var(--border-secondary)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--text-primary)] no-underline hover:bg-[var(--surface-muted)] transition"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}
