import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="border-t border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="text-xs text-[var(--text-secondary)]">
            AmzVest ZA © {year} · Durban, South Africa
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            <Link href="#" className="text-[var(--text-secondary)] no-underline hover:text-[var(--brand)] mr-3">Terms</Link>
            <Link href="#" className="text-[var(--text-secondary)] no-underline hover:text-[var(--brand)]">Privacy</Link>
          </span>
        </div>
        <div className="border-t border-[var(--border-tertiary)] bg-amber-50 px-4 py-3 text-center text-xs text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
          <strong>DEMONSTRATION SITE.</strong> AmzVest ZA is a fictional brand. No investments are accepted, no returns are paid, and all figures shown on this site are fabricated for educational purposes. Form submissions and &quot;payments&quot; never leave your browser.
        </div>
      </div>
    </footer>
  );
}
