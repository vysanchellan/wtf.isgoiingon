import { motion } from "framer-motion";
import { ClipboardList, CreditCard, Package } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Pick a package",
    body:
      "Browse Starter, Connoisseur, or Master. Each is built around how much coffee you actually drink in a month.",
    note: "Demo: cards link to a mock checkout.",
  },
  {
    icon: CreditCard,
    title: "Top up your BrewCredits",
    body:
      "Add credits to your account from your wallet. The form mimics a real card input — useful for testing the flow.",
    note: "Demo: no real card data is collected or sent.",
  },
  {
    icon: Package,
    title: "Get fresh bags monthly",
    body:
      "Pause, skip, or upgrade any time from your account page. Your active subscription shows up on every page.",
    note: "Demo: shipping is simulated — no orders are produced.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps from sign-up to first sip.
          </h2>
          <p className="mt-3 text-[color:var(--foreground)]/70">
            Every step in this flow is a real interaction in the demo — try them out.
          </p>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
              >
                <div className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-full bg-[color:var(--brand)] px-2.5 text-xs font-semibold text-white">
                  Step {i + 1}
                </div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--foreground)]/75">{step.body}</p>
                <p className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300">
                  {step.note}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
