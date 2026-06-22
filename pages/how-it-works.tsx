import Head from "next/head";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { CTASection } from "@/components/ui/CTASection";

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            How it works
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            A flow you can actually click through.
          </h1>
          <p className="mt-3 max-w-2xl text-[color:var(--foreground)]/75">
            Every step in this demo is interactive. Top up credits, pick a tier,
            and your account state will update across the site.
          </p>
          <Disclaimer variant="card" className="mt-6 max-w-xl" />
        </div>
      </section>
      <HowItWorks />
      <CTASection />
    </>
  );
}
