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
      className="relative py-20 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What demo subscribers are saying.
          </h2>
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
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
              className="rounded-2xl border border-[color:var(--brand)]/30 bg-[color:var(--surface)] p-8 shadow-sm sm:p-10"
            >
              <Quote className="h-7 w-7 text-[color:var(--brand)]/70" aria-hidden />
              <blockquote className="mt-4 text-lg leading-relaxed text-[color:var(--foreground)]/90 sm:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1 border-t border-[color:var(--border)] pt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-[color:var(--foreground)]/65">
                  {t.role} · Loved the {t.bag}
                </span>
                <span className="mt-2 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                  Name and quote are fictional. Not a real testimonial.
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              aria-label="Previous testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] hover:border-[color:var(--brand)]/40 transition"
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
                    i === index
                      ? "w-6 bg-[color:var(--brand)]"
                      : "w-2 bg-[color:var(--border)] hover:bg-[color:var(--foreground)]/30"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
              aria-label="Next testimonial"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] hover:border-[color:var(--brand)]/40 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
