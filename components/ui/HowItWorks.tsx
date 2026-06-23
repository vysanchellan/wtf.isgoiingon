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
    <section id="how" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ margin: "0 auto", maxWidth: "768px", padding: "64px 16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>
          How It Works
        </div>

        <h2 className="gradient-text" style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1.2, marginBottom: "8px" }}>
          Simple, transparent process
        </h2>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "40px", maxWidth: "480px" }}>
          Your money is deployed into a live Amazon reselling operation. Here&apos;s exactly what happens.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {STEPS.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "16px",
                padding: "20px 0",
                position: "relative",
              }}
            >
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, var(--border-glow), transparent)",
                  }}
                />
              )}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--gold), var(--amber))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0a0a0f",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {step.title}
                </div>
                <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {step.desc}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div
          style={{
            marginTop: "32px",
            borderRadius: "var(--radius)",
            borderLeft: "3px solid var(--gold-dark)",
            background: "rgba(146, 64, 14, 0.1)",
            padding: "12px 16px",
            fontSize: "12px",
          }}
        >
          <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Risk disclosure:</strong>{" "}
          <span style={{ color: "var(--text-muted)" }}>
            All of the above is fictional. This is a demo project. Investment returns shown are fabricated and do not represent real outcomes.
          </span>
        </div>
      </div>
    </section>
  );
}
