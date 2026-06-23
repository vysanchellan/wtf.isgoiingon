import Link from "next/link";
import { TrendingUp, Shield } from "lucide-react";

export function CTASection() {
  return (
    <section className="gradient-section relative overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 600px 300px at 50% 0%, rgba(255, 215, 0, 0.06), transparent)",
        }}
      />
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <h2 className="gradient-text text-2xl font-bold sm:text-3xl">
          Ready to try the demo?
        </h2>
        <p
          className="mx-auto mt-3 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Click through the full flow &mdash; register, pick a package, and see
          the dashboard in action.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        <p
          className="mt-5 text-[11px] font-medium tracking-wide"
          style={{ color: "var(--amber)" }}
        >
          This is a DEMO. No real investment is made.
        </p>
      </div>
    </section>
  );
}
