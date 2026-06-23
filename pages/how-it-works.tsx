import Head from "next/head";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — AmzVest ZA (DEMO)</title>
      </Head>
      <section className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            How it works
          </div>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">
            A flow you can actually click through.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
            Every step in this demo is interactive. Register, pick a package, and see the simulated dashboard.
          </p>
          <Disclaimer variant="card" className="mt-4 max-w-xl" />
        </div>
      </section>
      <HowItWorks />
    </>
  );
}
