import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp } from "lucide-react";

const coins = [
  { size: 6, x: "5%", delay: 0, duration: 7 },
  { size: 10, x: "12%", delay: 1.5, duration: 9 },
  { size: 8, x: "22%", delay: 0.8, duration: 6.5 },
  { size: 14, x: "35%", delay: 2.2, duration: 10 },
  { size: 7, x: "48%", delay: 0.3, duration: 8 },
  { size: 12, x: "58%", delay: 1.8, duration: 7.5 },
  { size: 5, x: "68%", delay: 2.8, duration: 6 },
  { size: 9, x: "78%", delay: 0.6, duration: 8.5 },
  { size: 11, x: "88%", delay: 1.2, duration: 9.5 },
  { size: 7, x: "95%", delay: 2, duration: 7 },
  { size: 13, x: "42%", delay: 3.5, duration: 11 },
  { size: 6, x: "72%", delay: 4, duration: 6.5 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function HeroSection() {
  return (
    <section className="gradient-hero relative flex min-h-screen items-center overflow-hidden">
      {coins.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "120%" }}
          animate={{ opacity: [0, 0.7, 0.4, 0.8, 0], y: "-120%" }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 rounded-full pointer-events-none z-0 shadow-[0_0_6px_rgba(255,215,0,0.4)]"
          style={{
            left: c.x,
            width: c.size,
            height: c.size,
            background: "radial-gradient(circle at 35% 35%, var(--gold-light), var(--gold-dark))",
          }}
        />
      ))}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,215,0,0.05)_0%,transparent_60%)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center sm:px-6"
      >
        <motion.div variants={childVariants} className="mb-8 flex justify-center">
          <span className="gradient-border inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--gold)]">
            <ShieldCheck size={14} />
            Verified Amazon Reselling Operation
          </span>
        </motion.div>

        <motion.h1 variants={childVariants} className="mx-auto max-w-3xl">
          <span
            className="block font-medium leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Put your money to work.
          </span>
          <span
            className="block font-medium leading-[1.3] mt-1 text-[var(--text-primary)]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            <span className="gradient-text font-semibold">Triple</span>{" "}
            your investment in 3 weeks.
          </span>
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed sm:text-base text-[var(--text-secondary)]"
        >
          We buy and sell products on Amazon using investor capital. Every rand invested
          generates proven returns — paid back to you in three weekly instalments.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="btn-gold inline-flex items-center gap-2 px-7 py-3 text-sm no-underline"
          >
            <TrendingUp size={16} />
            Start investing
          </Link>
          <a
            href="#how"
            className="btn-outline inline-flex items-center gap-2 px-7 py-3 text-sm no-underline"
          >
            How it works
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 max-w-[600px] w-[calc(100%-32px)] px-4 py-2.5 rounded-[var(--radius)] bg-[var(--gold)]/5 border border-[var(--gold)]/10 text-center text-xs text-[var(--amber)] font-medium">
        ⚠️ This is a FAKE demo site. No real money is involved.
      </div>
    </section>
  );
}
