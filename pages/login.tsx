import Head from "next/head";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign in — AmzVest ZA (DEMO)</title>
      </Head>
      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 120px)",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            background: "var(--bg-card)",
            border: "1px solid var(--border-glow)",
            borderRadius: "var(--radius-xl)",
            padding: 32,
            boxShadow: "var(--shadow-glow), var(--shadow-card)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                height: 36,
                width: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--radius)",
                background: "linear-gradient(135deg, var(--gold), var(--amber))",
              }}
            >
              <TrendingUp style={{ height: 18, width: 18, color: "#0a0a0f" }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--gold)" }}>
              AmzVest ZA
            </span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
            Welcome back
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 24px" }}>
            Sign in to your investor account
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: 13,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--text-primary)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 215, 0, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: 13,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--text-primary)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 215, 0, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <Link
              href="/dashboard"
              style={{
                display: "block",
                width: "100%",
                padding: "11px 16px",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                color: "#0a0a0f",
                background: "linear-gradient(135deg, var(--gold), var(--amber))",
                border: "none",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 215, 0, 0.25)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              Sign in
            </Link>
          </div>

          <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "var(--text-secondary)" }}>
            No account yet?{" "}
            <Link href="/register" style={{ color: "var(--gold)", textDecoration: "none" }}>
              Create one
            </Link>
            <span style={{ margin: "0 8px", color: "var(--text-muted)" }}>·</span>
            <Link href="/admin" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 11 }}>
              Admin access
            </Link>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "10px 12px",
              borderRadius: "var(--radius)",
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              fontSize: 11,
              color: "var(--amber)",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            This is a DEMO. No real authentication.
          </div>
        </div>
      </div>
    </>
  );
}
