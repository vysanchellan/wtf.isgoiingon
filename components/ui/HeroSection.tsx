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
          style={{
            position: "absolute",
            left: c.x,
            bottom: "0%",
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, var(--gold-light), var(--gold-dark))",
            boxShadow: "0 0 6px rgba(255, 215, 0, 0.4)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            background: "radial-gradient(ellipse, rgba(255,215,0,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center sm:px-6"
      >
        <motion.div variants={childVariants} className="mb-8 flex justify-center">
          <span
            className="gradient-border inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide"
            style={{ color: "var(--gold)" }}
          >
            <ShieldCheck style={{ width: 14, height: 14 }} />
            Verified Amazon Reselling Operation
          </span>
        </motion.div>

        <motion.h1 variants={childVariants} className="mx-auto max-w-3xl">
          <span style={{ display: "block", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Put your money to work.
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 500,
              lineHeight: 1.3,
              marginTop: "0.25rem",
              color: "var(--text-primary)",
            }}
          >
            <span className="gradient-text" style={{ fontWeight: 600 }}>Triple</span>{" "}
            your investment in 3 weeks.
          </span>
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          We buy and sell products on Amazon using investor capital. Every rand invested generates proven returns — paid back to you in three weekly instalments.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="btn-gold inline-flex items-center gap-2 px-7 py-3 text-sm no-underline"
          >
            <TrendingUp style={{ width: 16, height: 16 }} />
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

      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          maxWidth: 600,
          width: "calc(100% - 32px)",
          padding: "10px 18px",
          borderRadius: "var(--radius)",
          background: "rgba(255, 215, 0, 0.06)",
          border: "1px solid rgba(255, 215, 0, 0.12)",
          textAlign: "center",
          fontSize: 12,
          color: "var(--amber)",
          fontWeight: 500,
        }}
      >
        ⚠️ This is a FAKE demo site. No real money is involved.
      </div>
    </section>
  );
}
