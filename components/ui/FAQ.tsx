import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--bg-secondary)] border-b border-[var(--border)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
            FAQ
          </span>
          <h2 className="gradient-text mt-2 text-2xl font-bold sm:text-3xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="gradient-border rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-card)]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-b border-[var(--border)] last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[var(--gold)]/[0.02]"
                >
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isOpen
                        ? "text-[var(--gold)] font-semibold"
                        : "text-[var(--text-primary)]"
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-300",
                      isOpen
                        ? "rotate-180 text-[var(--gold)]"
                        : "text-[var(--text-muted)]"
                    )}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" as const }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
