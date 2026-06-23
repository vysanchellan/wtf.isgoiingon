import { motion } from "framer-motion";

const STEPS = [
  {
    num: 1,
    title: "Register & fund your package",
    desc: "Create your account, choose a package, and pay securely via PayFast — EFT, card, or SnapScan accepted. Your investment is confirmed immediately.",
  },
  {
    num: 2,
    title: "We purchase and sell products on Amazon",
    desc: "Your capital is used to source high-margin products and list them on Amazon. The operation has a proven buy-sell cycle with consistent profit margins.",
  },
  {
    num: 3,
    title: "Receive your weekly payouts",
    desc: "Starting one week after your investment activates, you receive equal weekly payments for 3 consecutive weeks — directly to your South African bank account.",
  },
  {
    num: 4,
    title: "Reinvest or withdraw",
    desc: "Once your cycle completes, you can reinvest your returns into a new package and compound your earnings, or simply withdraw.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-white dark:bg-[var(--surface)] border-b border-[var(--border-tertiary)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-2 text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
          How it works
        </div>
        <h2 className="text-xl font-medium mb-1">Simple, transparent process</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Your money is deployed into a live Amazon reselling operation. Here&apos;s exactly what happens.
        </p>

        <ul className="divide-y divide-[var(--border-tertiary)]">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-[40px_1fr] gap-4 py-5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E1F5EE] text-sm font-medium text-[#0F6E56] shrink-0">
                {step.num}
              </div>
              <div>
                <div className="text-sm font-medium">{step.title}</div>
                <div className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 rounded-lg border border-amber-400/60 bg-amber-50 px-4 py-3 text-xs text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          <strong>Risk disclosure:</strong> All of the above is fictional. This is a demo project. Investment returns shown are fabricated and do not represent real outcomes.
        </div>
      </div>
    </section>
  );
}
