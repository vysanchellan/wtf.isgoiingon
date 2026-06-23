import Head from "next/head";
import Link from "next/link";
import { TrendingUp, Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin — AmzVest ZA (DEMO)</title>
      </Head>
      <div style={{ minHeight: "calc(100vh - 116px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{
          width: "100%", maxWidth: 400,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.03)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--gold), var(--amber))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp style={{ width: 18, height: 18, color: "#0a0a0f" }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>AmzVest admin</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Demo console</p>
            </div>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Sign in</h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, marginBottom: 24 }}>
            Any credentials work — this gate is a UI flow, not real auth.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Email</label>
              <input type="email" defaultValue="admin@amzvest.example" style={{
                width: "100%", padding: "10px 12px", borderRadius: "var(--radius)",
                border: "1px solid var(--border)", background: "var(--bg-tertiary)",
                color: "var(--text-primary)", fontSize: 14, outline: "none",
              }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--text-muted)" }} />
                <input type="password" defaultValue="amzvest-demo" style={{
                  width: "100%", padding: "10px 12px 10px 36px", borderRadius: "var(--radius)",
                  border: "1px solid var(--border)", background: "var(--bg-tertiary)",
                  color: "var(--text-primary)", fontSize: 14, outline: "none",
                }} />
              </div>
            </div>
            <Link href="/admin/dashboard" style={{
              display: "block", width: "100%", padding: "11px 16px", borderRadius: "var(--radius)",
              background: "linear-gradient(135deg, var(--gold), var(--amber))",
              color: "#0a0a0f", fontSize: 14, fontWeight: 600, textAlign: "center",
              textDecoration: "none", border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
            }}>
              Enter demo dashboard
            </Link>
          </div>

          <div style={{
            marginTop: 24, borderRadius: "var(--radius)",
            border: "1px solid rgba(217, 119, 6, 0.2)",
            background: "rgba(146, 64, 14, 0.08)",
            padding: "12px 16px", fontSize: 11, color: "var(--amber)",
            lineHeight: 1.6,
          }}>
            This login form does not validate credentials. Clicking the button routes you into the admin pages.
          </div>
        </div>
      </div>
    </>
  );
}
