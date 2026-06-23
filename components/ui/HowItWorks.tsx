import { motion } from "framer-motion";
import { UserPlus, ShoppingCart, Wallet, RefreshCw } from "lucide-react";

const STEPS = [
  {
    num: 1,
    icon: UserPlus,
    title: "Register & fund your package",
    desc: "Create your account, choose a package, and pay securely via PayFast — EFT, card, or SnapScan accepted. Your investment is confirmed immediately.",
  },
  {
    num: 2,
    icon: ShoppingCart,
    title: "We purchase and sell products on Amazon",
    desc: "Your capital is used to source high-margin products and list them on Amazon. The operation has a proven buy-sell cycle with consistent profit margins.",
  },
  {
    num: 3,
    icon: Wallet,
    title: "Receive your weekly payouts",
    desc: "Starting one week after your investment activates, you receive equal weekly payments for 3 consecutive weeks — directly to your South African bank account.",
  },
  {
    num: 4,
    icon: RefreshCw,
    title: "Reinvest or withdraw",
    desc: "Once your cycle completes, you can reinvest your returns into a new package and compound your earnings, or simply withdraw.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="eyebrow">How It Works</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight gradient-text sm:text-4xl">
          Simple, transparent process
        </h2>
        <p className="mb-12 mt-3 max-w-md text-base text-[var(--text-secondary)]">
          Your money is deployed into a (fictional) Amazon reselling operation.
          Here&apos;s exactly what happens.
        </p>

        <ol className="relative">
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--gold)]/40 via-[var(--border)] to-transparent"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative grid grid-cols-[40px_1fr] gap-5 pb-9 last:pb-0"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-[var(--bg-primary)] shadow-[0_0_20px_rgba(20,199,123,0.25)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      Step {step.num}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-10 rounded-[var(--radius)] border-l-4 border-[var(--gold-dark)] bg-[var(--amber-deep)]/10 px-4 py-3 text-xs leading-relaxed text-[var(--amber)]">
          <strong className="font-medium text-[var(--text-primary)]">Risk disclosure:</strong>{" "}
          <span className="text-[var(--text-muted)]">
            All of the above is fictional. This is a demo project. Investment
            returns shown are fabricated and do not represent real outcomes.
          </span>
        </div>
      </div>
    </section>
  );
}
