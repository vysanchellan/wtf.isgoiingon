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
      className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            Testimonials
          </div>
          <h2 className="text-xl font-medium mt-1">What our investors say</h2>
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
            Every quote below is fictional, written for the purposes of this UI demo.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-[#1D9E75]/30 bg-white dark:bg-[var(--surface)] p-6"
            >
              <Quote className="h-5 w-5 text-[#1D9E75]/60" aria-hidden />
              <blockquote className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-[var(--border-tertiary)] pt-3 text-xs">
                <span className="font-medium">{t.name}</span>
                <span className="text-[#1D9E75] font-medium">{t.amount}</span>
              </figcaption>
              <p className="mt-2 text-[10px] font-medium text-amber-700 dark:text-amber-300">
                Name and quote are fictional. Not a real testimonial.
              </p>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              aria-label="Previous testimonial"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-secondary)] hover:border-[#1D9E75]/40 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((tt, i) => (
                <button
                  key={tt.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${tt.name}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-5 bg-[#1D9E75]" : "w-2 bg-[var(--border)] hover:bg-[var(--text-secondary)]"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
              aria-label="Next testimonial"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-secondary)] hover:border-[#1D9E75]/40 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
