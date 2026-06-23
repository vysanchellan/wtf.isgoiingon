import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-glow)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-[var(--text-muted)] text-xs">
          AmzVest ZA &copy; {year} &middot; Durban, South Africa
        </span>
        <span className="text-[var(--text-muted)] text-xs flex gap-5">
          <Link
            href="#"
            className="text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Privacy
          </Link>
        </span>
      </div>

      <div className="bg-[var(--amber-deep)]/10 border-t border-[var(--amber-deep)]/20 text-center text-xs text-[var(--amber)] px-4 py-3">
        <strong>DEMONSTRATION SITE.</strong> AmzVest ZA is a fictional brand.
        No investments are accepted, no returns are paid, and all figures shown
        on this site are fabricated for educational purposes.
      </div>
    </footer>
  );
}
