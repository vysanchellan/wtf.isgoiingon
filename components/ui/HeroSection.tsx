import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";
import { Disclaimer } from "./Disclaimer";

const FLOATERS = [
  { left: "10%", delay: 0, size: 24, dur: 12 },
  { left: "22%", delay: 2.4, size: 16, dur: 14 },
  { left: "38%", delay: 1.1, size: 32, dur: 16 },
  { left: "55%", delay: 3.2, size: 20, dur: 13 },
  { left: "68%", delay: 0.6, size: 28, dur: 15 },
  { left: "82%", delay: 2.0, size: 18, dur: 11 },
  { left: "90%", delay: 4.0, size: 26, dur: 17 },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="grain pointer-events-none absolute inset-0 text-amber-900" />

      {/* Floating coffee beans */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-20%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: f.dur,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 rounded-full bg-[color:var(--brand)]/15"
            style={{ left: f.left, width: f.size, height: f.size }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/30 bg-[color:var(--surface)]/70 px-3 py-1 text-xs font-medium text-[color:var(--brand-strong)] backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          New: micro-lot drops, weekly
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Specialty coffee, on a schedule that respects{" "}
          <span className="text-[color:var(--brand)]">roast dates</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="max-w-2xl text-lg text-[color:var(--foreground)]/75 sm:text-xl"
        >
          BrewClub curates single-origin bags and delivers them within seven days of
          roasting. Choose a tier, top up your BrewCredits, and we handle the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            href="/packages"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-strong)] transition"
          >
            Explore packages
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground)]/80 backdrop-blur hover:border-[color:var(--brand)]/40 hover:text-[color:var(--foreground)] transition"
          >
            <Coffee className="h-4 w-4 text-[color:var(--brand)]" />
            How it works
          </Link>
        </motion.div>

        <Disclaimer
          variant="card"
          className="mt-2 max-w-2xl"
        >
          This is a UI/UX demo. BrewClub is fictional — no coffee ships, no payments
          are processed, no accounts persist outside your browser.
        </Disclaimer>
      </div>
    </section>
  );
}
