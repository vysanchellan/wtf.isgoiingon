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
    <div className="bg-[var(--bg-secondary)] border-y border-[var(--border-glow)]">
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
            className="relative px-4 py-6 text-center"
            style={
              i < ITEMS.length - 1
                ? {
                    borderRight: "1px solid transparent",
                    borderImage:
                      "linear-gradient(180deg, transparent, rgba(255,215,0,0.2), transparent) 1",
                  }
                : undefined
            }
          >
            <div className="gradient-text text-2xl font-bold">{item.num}</div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
