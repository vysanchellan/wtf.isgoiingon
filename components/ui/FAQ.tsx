import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-[color:var(--foreground)]/70">
            The most important answers about this demo are right here.
          </p>
        </div>

        <ul className="divide-y divide-[color:var(--border)] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-[color:var(--surface-muted)]/60 transition"
                >
                  <span className="text-base font-semibold">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 text-[color:var(--foreground)]/60 transition",
                      isOpen && "rotate-180 text-[color:var(--brand)]"
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
                      <p className="px-5 pb-5 text-sm text-[color:var(--foreground)]/80 leading-relaxed">
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
