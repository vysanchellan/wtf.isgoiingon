import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.15), transparent)",
        }}
      />

      <div style={{ background: "var(--bg-primary)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 24px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            AmzVest ZA &copy; {year} &middot; Durban, South Africa
          </span>
          <span
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              display: "flex",
              gap: 20,
            }}
          >
            <Link
              href="#"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Terms
            </Link>
            <Link
              href="#"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Privacy
            </Link>
          </span>
        </div>

        <div
          style={{
            background: "rgba(146, 64, 14, 0.1)",
            borderLeft: "3px solid var(--gold-dark)",
            padding: "12px 24px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            <strong>DEMONSTRATION SITE.</strong> AmzVest ZA is a fictional
            brand. No investments are accepted, no returns are paid, and all
            figures shown on this site are fabricated for educational purposes.
          </span>
        </div>
      </div>
    </footer>
  );
}
