import { motion } from "framer-motion";

const ITEMS = [
  { num: "3×", label: "Return on investment" },
  { num: "3 weeks", label: "Payout period" },
  { num: "143", label: "Active investors" },
  { num: "100%", label: "Payouts completed" },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08 }}
          className="border-r border-[var(--border-tertiary)] last:border-r-0 px-4 py-5 text-center"
        >
          <div className="text-xl font-medium text-[#1D9E75]">{item.num}</div>
          <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mt-0.5">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
