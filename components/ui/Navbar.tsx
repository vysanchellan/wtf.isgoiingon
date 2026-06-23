import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";
import { Disclaimer } from "./Disclaimer";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-40">
      <Disclaimer variant="banner" />
      <div className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto flex h-[58px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="AmzVest ZA home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D9E75]">
              <TrendingUp className="h-4 w-4 text-white" aria-hidden />
            </div>
            <div className="text-base font-medium text-[var(--text-primary)]">
              AmzVest <span className="text-[var(--text-secondary)] font-normal text-sm">ZA</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition no-underline",
                  isActive(link.href)
                    ? "bg-[#E1F5EE] text-[#0F6E56] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isDashboard ? (
              <span className="hidden text-sm text-[var(--text-secondary)] sm:block">Sipho Nkosi</span>
            ) : isAdmin ? (
              <span className="hidden rounded-full bg-[#E1F5EE] px-3 py-1 text-xs font-medium text-[#0F6E56] sm:inline-block">Admin</span>
            ) : null}
            <Link
              href={isDashboard ? "/" : isAdmin ? "/" : "/login"}
              className={cn(
                "rounded-lg border px-4 py-1.5 text-sm font-medium no-underline transition",
                "border-[var(--border-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
              )}
            >
              {isDashboard || isAdmin ? "Exit" : "Sign in"}
            </Link>
            {!isDashboard && !isAdmin && (
              <Link
                href="/register"
                className="hidden rounded-lg bg-[#1D9E75] px-4 py-1.5 text-sm font-medium text-white no-underline transition hover:bg-[#0F6E56] sm:inline-block"
              >
                Invest now
              </Link>
            )}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-secondary)] md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] md:hidden"
            >
              <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm no-underline",
                      isActive(link.href)
                        ? "bg-[#E1F5EE] text-[#0F6E56] font-medium"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-[var(--border-tertiary)]" />
                <Link href="/login" className="rounded-lg px-3 py-2 text-sm no-underline text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-[#1D9E75] px-3 py-2 text-center text-sm font-medium text-white no-underline"
                >
                  Invest now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
