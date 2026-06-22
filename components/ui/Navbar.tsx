import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Menu, Wallet as WalletIcon, X } from "lucide-react";
import { useDemoStore } from "@/lib/store";
import { cn, formatCurrency } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Disclaimer } from "./Disclaimer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const router = useRouter();
  const { state, hydrated } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      <Disclaimer variant="banner" />
      <div
        className={cn(
          "transition-all duration-300",
          "border-b border-[color:var(--border)]/60",
          scrolled
            ? "bg-[color:var(--background)]/85 backdrop-blur-md shadow-sm"
            : "bg-[color:var(--background)]/60 backdrop-blur"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight"
            aria-label="BrewClub home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand)]/15 text-[color:var(--brand)]">
              <Coffee className="h-4 w-4" aria-hidden />
            </span>
            <span>
              Brew<span className="text-[color:var(--brand)]">Club</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition",
                  isActive(link.href)
                    ? "bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]"
                    : "text-[color:var(--foreground)]/75 hover:text-[color:var(--foreground)] hover:bg-[color:var(--surface-muted)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/wallet"
              className={cn(
                "hidden items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-3 py-1.5 text-sm font-medium backdrop-blur sm:inline-flex",
                "hover:border-[color:var(--brand)]/50 transition"
              )}
              aria-label="Wallet"
            >
              <WalletIcon className="h-3.5 w-3.5 text-[color:var(--brand)]" aria-hidden />
              <span className="tabular-nums">
                {hydrated ? formatCurrency(state.walletBalance) : "$0.00"}
              </span>
            </Link>
            <ThemeToggle />
            <Link
              href="/admin"
              className="hidden rounded-full bg-[color:var(--brand)] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-[color:var(--brand-strong)] md:inline-block"
            >
              Admin
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] md:hidden"
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
              className="md:hidden border-t border-[color:var(--border)]/60 bg-[color:var(--background)]/95 backdrop-blur"
            >
              <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm",
                      isActive(link.href)
                        ? "bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]"
                        : "text-[color:var(--foreground)]/80 hover:bg-[color:var(--surface-muted)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-[color:var(--border)]/60" />
                <Link
                  href="/wallet"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-[color:var(--surface-muted)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <WalletIcon className="h-4 w-4 text-[color:var(--brand)]" />
                    Wallet
                  </span>
                  <span className="tabular-nums text-[color:var(--foreground)]/70">
                    {hydrated ? formatCurrency(state.walletBalance) : "$0.00"}
                  </span>
                </Link>
                <Link
                  href="/account"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-[color:var(--surface-muted)]"
                >
                  My account
                </Link>
                <Link
                  href="/admin"
                  className="rounded-lg bg-[color:var(--brand)] px-3 py-2 text-center text-sm font-medium text-white"
                >
                  Admin dashboard
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
