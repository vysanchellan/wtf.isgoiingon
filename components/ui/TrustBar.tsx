import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, CalendarClock, Users, CheckCircle2 } from "lucide-react";

type Item = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: typeof TrendingUp;
};

const ITEMS: Item[] = [
  { value: 2, suffix: "×", label: "Return on investment", icon: TrendingUp },
  { value: 3, suffix: " weeks", label: "Time to payout", icon: CalendarClock },
  { value: 143, label: "Active investors", icon: Users },
  { value: 100, suffix: "%", label: "Payouts completed", icon: CheckCircle2 },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function Stat({ item, active, index }: { item: Item; active: boolean; index: number }) {
  const count = useCountUp(item.value, active);
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex flex-col items-center border-[var(--border)] px-4 py-8 text-center [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0 sm:border-r sm:[&:nth-child(4n)]:border-r-0"
    >
      <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)]/[0.1] text-[var(--gold)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="gradient-text text-3xl font-bold">
        {item.prefix}
        {count}
        {item.suffix}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        {item.label}
      </div>
    </motion.div>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="border-y border-[var(--border-glow)] bg-[var(--bg-secondary)]">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4"
      >
        {ITEMS.map((item, i) => (
          <Stat key={item.label} item={item} active={inView} index={i} />
        ))}
      </div>
    </div>
  );
}
