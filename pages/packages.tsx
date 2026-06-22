import Head from "next/head";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { CTASection } from "@/components/ui/CTASection";

export default function PackagesPage() {
  return (
    <>
      <Head>
        <title>Packages — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            Subscription tiers
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Pick the bag count that matches your week.
          </h1>
          <p className="mt-3 max-w-2xl text-[color:var(--foreground)]/75">
            All three tiers are fully active in the demo — choosing one walks you
            through a mock checkout that debits your BrewCredits balance.
          </p>
          <Disclaimer variant="card" className="mt-6 max-w-xl">
            Prices, perks, and supply origins below are fabricated for UI demonstration.
            No real product or fulfilment exists.
          </Disclaimer>
        </div>
      </section>

      <PackagesGrid withHeader={false} />
      <CTASection />
    </>
  );
}
