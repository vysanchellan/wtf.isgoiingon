import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/lib/utils";

type Props = {
  value: number;
  className?: string;
  duration?: number;
};

/** Smoothly counts from the previous value to the new one (e.g. after a deposit). */
export function AnimatedCurrency({ value, className, duration = 750 }: Props) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return; // already showing the right value
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span className={className}>{formatCurrency(display)}</span>;
}
