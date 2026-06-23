import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { PACKAGES, getPackage, type PackageId } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const PKG_IDS: PackageId[] = ["starter", "growth", "premium"];

export default function RegisterPage() {
  const { selectedPackage, setSelectedPackage } = useDemoStore();
  const [pkgId, setPkgId] = useState<PackageId>(selectedPackage);

  useEffect(() => {
    setPkgId(selectedPackage);
  }, [selectedPackage]);

  const pkg = getPackage(pkgId);

  return (
    <>
      <Head>
        <title>Register — AmzVest ZA (DEMO)</title>
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
            Create your account
          </h2>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 20px" }}>
            Join 143 investors already earning returns
          </p>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--radius)",
              background: "rgba(255, 215, 0, 0.06)",
              border: "1px solid rgba(255, 215, 0, 0.15)",
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>
              {pkg.name} Package selected
            </div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>
              Invest {formatCurrency(pkg.invest)} · Receive {formatCurrency(pkg.returnAmount)} over {pkg.weeks} weeks ({formatCurrency(pkg.weeklyPayout)}/week)
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Full name
              </label>
              <input
                type="text"
                placeholder="Sipho Nkosi"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurBorder}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="sipho@email.com"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurBorder}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Phone number
              </label>
              <input
                type="tel"
                placeholder="+27 82 000 0000"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurBorder}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Investment package
              </label>
              <select
                value={pkgId}
                onChange={(e) => setPkgId(e.target.value as PackageId)}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A89F94' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 32,
                }}
                onFocus={focusGold}
                onBlur={blurBorder}
              >
                {PKG_IDS.map((id) => {
                  const p = getPackage(id);
                  return (
                    <option key={id} value={id}>
                      {p.name} — Invest {formatCurrency(p.invest)}, receive {formatCurrency(p.returnAmount)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                Create password
              </label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurBorder}
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
                marginTop: 2,
                boxSizing: "border-box",
              }}
              onMouseEnter={hoverGold}
              onMouseLeave={leaveGold}
            >
              Create account & proceed to payment
            </Link>
          </div>

          <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--gold)", textDecoration: "none" }}>
              Sign in
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
            This is a DEMO. No real account is created.
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 13,
  background: "var(--bg-tertiary)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  color: "var(--text-primary)",
  outline: "none",
  boxSizing: "border-box",
};

function focusGold(e: React.FocusEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.borderColor = "var(--gold)";
  el.style.boxShadow = "0 0 0 3px rgba(255, 215, 0, 0.15)";
}

function blurBorder(e: React.FocusEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.borderColor = "var(--border)";
  el.style.boxShadow = "none";
}

function hoverGold(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 215, 0, 0.25)";
  e.currentTarget.style.transform = "translateY(-1px)";
}

function leaveGold(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.boxShadow = "none";
  e.currentTarget.style.transform = "none";
}
