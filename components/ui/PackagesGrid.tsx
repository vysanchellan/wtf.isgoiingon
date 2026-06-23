import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Check, Star as LucideStar } from "lucide-react";

import { PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useDemoStore } from "@/lib/store";

type Props = {
  withHeader?: boolean;
};

type MousePosition = { x: number | null; y: number | null };

// --- Interactive magnetic starfield (gold theme) ---

function Star({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  });

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const starX = rect.left + (parseFloat(initialPos.left) / 100) * rect.width;
    const starY = rect.top + (parseFloat(initialPos.top) / 100) * rect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 600;
    if (distance < radius) {
      const force = 1 - distance / radius;
      springX.set(deltaX * force * 0.5);
      springY.set(deltaY * force * 0.5);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  return (
    <motion.div
      className="absolute rounded-full bg-[var(--gold)]"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${initialPos.size}px`,
        height: `${initialPos.size}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: initialPos.duration,
        repeat: Infinity,
        delay: initialPos.delay,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: MousePosition;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {Array.from({ length: 120 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

export function PackagesGrid({ withHeader = true }: Props) {
  const { setSelectedPackage } = useDemoStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  return (
    <section
      id="packages"
      ref={containerRef}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setMousePosition({ x: null, y: null })}
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-primary)]"
    >
      <InteractiveStarfield
        mousePosition={mousePosition}
        containerRef={containerRef}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        {withHeader && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Investment packages
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight gradient-text sm:text-5xl">
              Choose your investment tier
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)]">
              All packages illustrate a 3× return over 3 equal weekly payouts.
              These figures are fictional and shown for demonstration only.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: pkg.highlight ? -16 : 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
              }}
              className={`relative flex flex-col rounded-2xl p-8 backdrop-blur-sm transition-colors ${
                pkg.highlight
                  ? "border-2 border-[var(--gold)] bg-[var(--bg-card)]/80 shadow-[var(--shadow-glow)]"
                  : "border border-[var(--border)] bg-[var(--bg-card)]/70 hover:border-[var(--gold)]/30"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] px-4 py-1.5">
                    <LucideStar className="h-4 w-4 fill-current text-[var(--bg-primary)]" />
                    <span className="text-sm font-semibold text-[var(--bg-primary)]">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col text-center">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {pkg.description}
                </p>

                <div className="mt-6 flex items-baseline justify-center gap-x-1">
                  <span className="gradient-text text-5xl font-bold tracking-tight">
                    {formatCurrency(pkg.invest)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  One-time (demo) · You receive{" "}
                  <span className="font-semibold text-[var(--gold)]">
                    {formatCurrency(pkg.returnAmount)}
                  </span>
                </p>

                <ul
                  role="list"
                  className="mt-8 space-y-3 text-left text-sm leading-6 text-[var(--text-secondary)]"
                >
                  {[
                    `${formatCurrency(pkg.weeklyPayout)} per week × ${pkg.weeks} payouts`,
                    `Pays out over ${pkg.weeks} weeks`,
                    "200% illustrative net gain",
                    "Reinvest or withdraw (demo flow)",
                  ].map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-[var(--gold)]"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href="/register"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`block w-full rounded-[var(--radius)] py-2.5 text-center text-sm font-semibold no-underline transition-all ${
                      pkg.highlight
                        ? "btn-gold"
                        : "btn-outline"
                    }`}
                  >
                    Choose {pkg.name}
                  </Link>
                  <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--amber)]">
                    Fictional rate. Not real.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
