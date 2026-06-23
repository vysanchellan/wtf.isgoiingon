import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  const isDashboard = router.pathname === "/dashboard";
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div
        style={{
          background: "var(--amber)",
          padding: "4px 16px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "var(--bg-primary)",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          ⚠️ DEMO — Fictional content. Not real investment advice.
        </span>
      </div>

      <nav
        style={{
          background: "rgba(16, 16, 26, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.06)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, var(--gold), var(--amber))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendingUp size={20} style={{ color: "var(--bg-primary)" }} />
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.5px",
              }}
            >
              AmzVest{" "}
              <span style={{ color: "var(--gold)" }}>ZA</span>
            </span>
          </Link>

          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 32 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive(link.href)
                    ? "var(--gold)"
                    : "var(--text-secondary)",
                  textDecoration: "none",
                  borderBottom: isActive(link.href)
                    ? "2px solid var(--gold)"
                    : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.href))
                    e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.href))
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isDashboard && (
              <>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                  }}
                >
                  Sipho Nkosi
                </span>
                <Link
                  href="/"
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Exit
                </Link>
              </>
            )}
            {isAdmin && (
              <>
                <span
                  style={{
                    padding: "2px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "var(--gold)",
                    color: "var(--bg-primary)",
                  }}
                >
                  Admin
                </span>
                <Link
                  href="/"
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Exit
                </Link>
              </>
            )}
            {!isDashboard && !isAdmin && (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--gold)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:inline-block"
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--bg-primary)",
                    background:
                      "linear-gradient(135deg, var(--gold), var(--amber))",
                    border: "none",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Invest now
                </Link>
              </>
            )}
            <button
              className="md:hidden"
              onClick={() => setOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: 4,
                display: "flex",
              }}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: { transition: { staggerChildren: 0.05 } },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 20 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: isActive(link.href)
                        ? "var(--gold)"
                        : "var(--text-secondary)",
                      textDecoration: "none",
                      borderBottom: isActive(link.href)
                        ? "2px solid var(--gold)"
                        : "2px solid transparent",
                      paddingBottom: 4,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!isDashboard && !isAdmin && (
                <motion.div
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 20 },
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginTop: 8,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "12px 48px",
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--gold)",
                      border: "1px solid var(--border)",
                      background: "transparent",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    style={{
                      padding: "12px 48px",
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--bg-primary)",
                      background:
                        "linear-gradient(135deg, var(--gold), var(--amber))",
                      border: "none",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Invest now
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
