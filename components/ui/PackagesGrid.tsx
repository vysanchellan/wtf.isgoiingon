import Link from "next/link";
import { motion } from "framer-motion";
import { PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useDemoStore } from "@/lib/store";

type Props = {
  withHeader?: boolean;
};

export function PackagesGrid({ withHeader = true }: Props) {
  const { setSelectedPackage } = useDemoStore();

  return (
    <section id="packages" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ margin: "0 auto", maxWidth: "1024px", padding: "64px 16px" }}>
        {withHeader && (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>
              Investment packages
            </div>
            <h2 className="gradient-text" style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
              Choose your investment tier
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "480px" }}>
              All packages deliver a 3× return over 3 equal weekly payouts. The more you invest, the more you earn.
            </p>
          </div>
        )}

        <div className="pkg-grid" style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr" }}>
          <style>{`@media (min-width: 768px) { .pkg-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>

          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={pkg.highlight ? "card-premium" : "card-premium"}
              style={{
                position: "relative",
                overflow: "hidden",
                border: pkg.highlight ? "2px solid var(--gold)" : undefined,
                borderRadius: "var(--radius-lg)",
              }}
            >
              {pkg.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, var(--gold), var(--amber))",
                    padding: "2px 10px",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#0a0a0f",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    zIndex: 1,
                  }}
                >
                  Popular
                </div>
              )}

              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  {pkg.name}
                </div>
                <div className="gradient-text" style={{ fontSize: "24px", fontWeight: 700, marginTop: "4px" }}>
                  {formatCurrency(pkg.invest)}
                </div>
              </div>

              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>You receive</span>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--gold)" }}>
                    {formatCurrency(pkg.returnAmount)}
                  </span>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0 0 12px" }} />
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  <strong style={{ fontWeight: 600, color: "var(--text-primary)" }}>{formatCurrency(pkg.weeklyPayout)}/week</strong> × {pkg.weeks} payouts<br />
                  Over {pkg.weeks} weeks<br />
                  200% net gain
                </div>

                <Link
                  href="/register"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={pkg.highlight ? "btn-gold" : "btn-outline"}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 16px",
                    marginTop: "16px",
                    textAlign: "center",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  Choose {pkg.name}
                </Link>

                <p style={{ marginTop: "8px", textAlign: "center", fontSize: "10px", color: "var(--amber)" }}>
                  Fictional rate. Not real.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
