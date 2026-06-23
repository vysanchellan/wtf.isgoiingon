import Link from "next/link";
import { TrendingUp, Shield } from "lucide-react";

export function CTASection() {
  return (
    <section className="gradient-section py-16">
      <div className="mx-auto max-w-lg px-4 text-center">
        <h2 className="gradient-text text-2xl font-bold sm:text-3xl">
          Ready to try the demo?
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Click through the full flow &mdash; register, pick a package, and see
          the dashboard in action.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 text-sm no-underline"
          >
            <TrendingUp className="h-4 w-4" />
            Start investing
          </Link>
          <Link
            href="/admin"
            className="btn-outline inline-flex items-center gap-2 px-6 py-2.5 text-sm no-underline"
          >
            <Shield className="h-4 w-4" />
            Admin panel
          </Link>
        </div>
        <p className="mt-4 text-[10px] text-[var(--amber)]">
          This is a DEMO. No real investment is made.
        </p>
      </div>
    </section>
  );
}
