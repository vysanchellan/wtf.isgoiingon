import Head from "next/head";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function PackagesPage() {
  return (
    <>
      <Head>
        <title>Packages — AmzVest ZA (DEMO)</title>
      </Head>
      <section className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            Investment packages
          </div>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">
            Pick the tier that matches your goals
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
            All packages are fully active in the demo — choosing one navigates you through the simulated investment flow.
          </p>
          <Disclaimer variant="card" className="mt-4 max-w-xl">
            Investment amounts, returns, and projections below are fabricated for UI demonstration. No real product or fulfilment exists.
          </Disclaimer>
        </div>
      </section>
      <PackagesGrid withHeader={false} />
    </>
  );
}
