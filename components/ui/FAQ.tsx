import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="py-16 sm:py-20"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--gold)" }}
          >
            FAQ
          </span>
          <h2 className="gradient-text mt-2 text-2xl font-bold sm:text-3xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="gradient-border overflow-hidden rounded-xl">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="transition-all duration-300"
                  style={{
                    background: isOpen
                      ? "rgba(255, 215, 0, 0.02)"
                      : "transparent",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 hover:opacity-90"
                    style={{
                      background: isOpen
                        ? "rgba(255, 215, 0, 0.03)"
                        : "transparent",
                    }}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        isOpen ? "font-semibold" : ""
                      )}
                      style={{
                        color: isOpen ? "var(--gold)" : "var(--text-primary)",
                      }}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-300"
                      )}
                      style={{
                        color: isOpen ? "var(--gold)" : "var(--text-muted)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
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
                        <div
                          className="px-6 pb-6 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
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
      </div>
    </section>
  );
}
