import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-6 text-center">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            FAQ
          </div>
          <h2 className="text-xl font-medium mt-1">Frequently asked questions</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            The most important answers about this demo are right here.
          </p>
        </div>

        <ul className="divide-y divide-[var(--border-tertiary)] overflow-hidden rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--surface-muted)] transition"
                >
                  <span className="text-sm font-medium">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)] transition",
                      isOpen && "rotate-180 text-[#1D9E75]"
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
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs text-[var(--text-secondary)] leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
