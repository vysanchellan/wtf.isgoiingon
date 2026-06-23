import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Menu, X, AlertTriangle } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  const isDashboard = router.pathname === "/dashboard";
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--amber-deep)]/20 text-[var(--amber)] border-b border-[var(--amber-deep)]/20 text-[10px] flex items-center justify-center gap-1.5 px-4 py-1 font-medium tracking-wide">
        <AlertTriangle className="h-3 w-3 shrink-0" />
        DEMO — Fictional content. Not real investment advice.
      </div>

      <nav
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-secondary)]/90 backdrop-blur-xl border-[var(--border-glow)] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-[var(--bg-secondary)]/60 backdrop-blur-lg border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--amber)] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,215,0,0.25)] transition-transform duration-300 group-hover:scale-105">
              <TrendingUp size={20} className="text-[var(--bg-primary)]" />
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              AmzVest{" "}
              <span className="text-[var(--gold)]">ZA</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium no-underline pb-1 transition-colors duration-200 ${
                    active
                      ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--gold)] border-b-2 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {isDashboard && (
              <>
                <span className="text-sm text-[var(--text-secondary)]">
                  Sipho Nkosi
                </span>
                <Link href="/" className="btn-outline">
                  Exit
                </Link>
              </>
            )}
            {isAdmin && (
              <>
                <span className="bg-[var(--gold)] text-[var(--bg-primary)] rounded-full px-3 py-0.5 text-xs font-bold">
                  Admin
                </span>
                <Link href="/" className="btn-outline">
                  Exit
                </Link>
              </>
            )}
            {!isDashboard && !isAdmin && (
              <>
                <Link href="/login" className="btn-outline">
                  Sign in
                </Link>
                <Link href="/register" className="btn-gold hidden sm:inline-flex">
                  Invest now
                </Link>
              </>
            )}
            <button
              className="md:hidden bg-transparent border-none text-[var(--text-primary)] cursor-pointer p-1 flex"
              onClick={() => setOpen(true)}
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
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 bg-transparent border-none text-[var(--text-primary)] cursor-pointer"
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
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
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
                      className={`text-2xl font-semibold no-underline pb-1 ${
                        active
                          ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                          : "text-[var(--text-secondary)] border-b-2 border-transparent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              {!isDashboard && !isAdmin && (
                <motion.div
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 20 },
                  }}
                  className="flex flex-col gap-3 mt-2 w-full items-center"
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn-outline text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="btn-gold text-center"
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
