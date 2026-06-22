import { motion } from "framer-motion";
import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon: LucideIcon;
  index?: number;
};

export function StatCard({ label, value, delta, icon: Icon, index = 0 }: Props) {
  const positive = delta?.positive !== false;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--foreground)]/55">
          {label}
        </p>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
      {delta && (
        <p
          className={cn(
            "mt-1 inline-flex items-center gap-1 text-xs font-medium",
            positive
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-rose-700 dark:text-rose-300"
          )}
        >
          {positive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {delta.value}
          <span className="text-[color:var(--foreground)]/55">vs last month</span>
        </p>
      )}
    </motion.div>
  );
}
