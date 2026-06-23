import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white dark:bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <h2 className="text-xl font-medium">Ready to try the demo?</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Click through the full flow — register, pick a package, and see the dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1D9E75] px-5 py-2.5 text-sm font-medium text-white no-underline hover:bg-[#0F6E56] transition"
          >
            <TrendingUp className="h-4 w-4" />
            Start investing
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center rounded-lg border border-[var(--border-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] no-underline hover:bg-[var(--surface-muted)] transition"
          >
            Admin panel
          </Link>
        </div>
        <p className="mt-4 text-[10px] text-amber-700 dark:text-amber-300">
          This is a DEMO. No real investment is made.
        </p>
      </div>
    </section>
  );
}
