import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--brand)]/30 bg-gradient-to-br from-[color:var(--brand)]/10 via-transparent to-[color:var(--accent)]/10 p-8 sm:p-12">
          <div className="grid items-center gap-6 md:grid-cols-[1.4fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to try the demo flow?
              </h2>
              <p className="mt-2 text-[color:var(--foreground)]/75">
                Top up some BrewCredits, pick a tier, and watch your account update —
                all without leaving your browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/deposit"
                className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--brand-strong)] transition"
              >
                Top up wallet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/70 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:border-[color:var(--brand)]/40 transition"
              >
                See packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
