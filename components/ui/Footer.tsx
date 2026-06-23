import Link from "next/link";
import { TrendingUp, AlertTriangle } from "lucide-react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Packages", href: "/packages" },
      { label: "How it works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-glow)] bg-[var(--bg-secondary)]">
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[300px] w-[400px] rounded-full bg-[var(--gold)]/[0.04] blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-[0_0_20px_rgba(20,199,123,0.3)]">
                <TrendingUp size={20} className="text-[var(--bg-primary)]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                AmzVest <span className="text-[var(--gold)]">ZA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              A fictional Amazon reselling investment platform — built purely as a
              UI/UX demonstration.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>AmzVest ZA &copy; {year} &middot; Durban, South Africa</span>
          <span>Educational demonstration project</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-[var(--amber-deep)]/20 bg-[var(--amber-deep)]/10 px-4 py-3 text-center text-xs text-[var(--amber)]">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <span>
          <strong>DEMONSTRATION SITE.</strong> AmzVest ZA is a fictional brand. No
          investments are accepted, no returns are paid, and all figures shown on
          this site are fabricated for educational purposes.
        </span>
      </div>
    </footer>
  );
}
