import { motion } from "framer-motion";

const ITEMS = [
  { num: "3×", label: "Return on investment" },
  { num: "3 weeks", label: "Payout period" },
  { num: "143", label: "Active investors" },
  { num: "100%", label: "Payouts completed" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function TrustBar() {
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-glow)",
        borderBottom: "1px solid var(--border-glow)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4"
      >
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            style={{
              position: "relative",
              padding: "24px 16px",
              textAlign: "center",
              borderRight: i < ITEMS.length - 1
                ? "1px solid transparent"
                : "none",
              borderImage: i < ITEMS.length - 1
                ? "linear-gradient(180deg, transparent, rgba(255,215,0,0.2), transparent) 1"
                : undefined,
            }}
          >
            <div
              className="gradient-text"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 600 }}
            >
              {item.num}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 4,
              }}
            >
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
