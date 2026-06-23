import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
};

export function PageHeader({ eyebrow, title, subtitle, children, icon }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="h-[320px] w-[520px] rounded-full bg-[var(--gold)]/[0.07] blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="eyebrow">
            {icon}
            {eyebrow}
          </div>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6 max-w-2xl">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
