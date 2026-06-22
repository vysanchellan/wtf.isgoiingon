import Link from "next/link";
import { AtSign, Briefcase, Code2, Coffee } from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Packages", href: "/packages" },
      { label: "How it works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Wallet", href: "/wallet" },
      { label: "Top up", href: "/deposit" },
      { label: "My account", href: "/account" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy (demo)", href: "#" },
      { label: "Terms (demo)", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[color:var(--border)]/70 bg-[color:var(--surface-muted)]/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand)]/15 text-[color:var(--brand)]">
                <Coffee className="h-4 w-4" aria-hidden />
              </span>
              <span>
                Brew<span className="text-[color:var(--brand)]">Club</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-[color:var(--foreground)]/70">
              A fictional specialty-coffee subscription, built as a UI/UX demonstration
              for a third-year academic project.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Code2, label: "GitHub" },
                { icon: AtSign, label: "Twitter" },
                { icon: Briefcase, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={`${label} (demo link)`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--foreground)]/70 hover:text-[color:var(--brand)] hover:border-[color:var(--brand)]/50 transition"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--foreground)]/55">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[color:var(--foreground)]/80 hover:text-[color:var(--brand)] transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          <strong className="font-semibold">DEMONSTRATION SITE.</strong>{" "}
          BrewClub is a fictional brand. No coffee ships, no subscriptions are charged,
          and all users, orders, and revenue figures shown anywhere on this site are
          fabricated for a UI/UX project. Form submissions and &quot;payments&quot; never
          leave your browser.
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--border)]/60 pt-6 text-xs text-[color:var(--foreground)]/55 sm:flex-row sm:items-center">
          <p>© {year} BrewClub (demo). All trademarks and product names are illustrative.</p>
          <p>Built with Next.js, Tailwind CSS, framer-motion.</p>
        </div>
      </div>
    </footer>
  );
}
