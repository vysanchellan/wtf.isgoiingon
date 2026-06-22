import Head from "next/head";
import { FAQ } from "@/components/ui/FAQ";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            FAQ
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions about this demo.
          </h1>
          <Disclaimer variant="card" className="mt-6 max-w-xl" />
        </div>
      </section>
      <FAQ />
    </>
  );
}
