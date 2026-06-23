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
    <section id="how" className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold)]">
          How It Works
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mt-2 gradient-text">
          Simple, transparent process
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2 mb-8 max-w-md">
          Your money is deployed into a live Amazon reselling operation. Here&apos;s exactly what happens.
        </p>

        <ul className="divide-y divide-[var(--border)]">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-[40px_1fr] gap-4 py-5"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] text-[var(--bg-primary)] text-sm font-bold flex items-center justify-center shrink-0">
                {step.num}
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {step.title}
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">
                  {step.desc}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 rounded-[var(--radius)] border-l-4 border-[var(--gold-dark)] bg-[var(--amber-deep)]/10 px-4 py-3 text-xs text-[var(--amber)] leading-relaxed">
          <strong className="text-[var(--text-primary)] font-medium">Risk disclosure:</strong>{" "}
          <span className="text-[var(--text-muted)]">
            All of the above is fictional. This is a demo project. Investment returns shown are fabricated and do not represent real outcomes.
          </span>
        </div>
      </div>
    </section>
  );
}
