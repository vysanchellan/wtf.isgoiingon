import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const t = TESTIMONIALS[index];

  return (
    <section
      className="bg-[var(--bg-primary)] border-b border-[var(--border)] py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="gradient-text mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            What our investors say
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="card-premium glow relative overflow-hidden border-l-4 border-l-[var(--gold)] p-6 sm:p-8"
            >
              <div className="absolute bottom-4 right-4 select-none text-[var(--gold)]/20">
                <Quote className="h-20 w-20" />
              </div>
              <div className="text-[var(--gold)]/10">
                <Quote className="h-8 w-8" />
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed italic text-[var(--text-primary)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] text-xs font-bold text-[var(--bg-primary)]">
                    {t.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {t.name}
                  </span>
                </span>
                <span className="text-sm font-bold text-[var(--gold)]">
                  {t.amount}
                </span>
              </div>
              <p className="mt-2 text-[10px] text-[var(--amber)]">
                Name and quote are fictional. Not a real testimonial.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setIndex(
                  (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                )
              }
              aria-label="Previous testimonial"
              className="btn-outline inline-flex h-9 w-9 items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Choose testimonial"
            >
              {TESTIMONIALS.map((tt, i) => (
                <button
                  key={tt.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${tt.name}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-5 bg-[var(--gold)]"
                      : "w-2 bg-[var(--border)]"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i + 1) % TESTIMONIALS.length)
              }
              aria-label="Next testimonial"
              className="btn-outline inline-flex h-9 w-9 items-center justify-center"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
