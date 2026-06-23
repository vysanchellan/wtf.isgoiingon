import Head from "next/head";
import { FAQ } from "@/components/ui/FAQ";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ — AmzVest ZA (DEMO)</title>
      </Head>
      <section className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            FAQ
          </div>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">
            Questions about this demo.
          </h1>
          <Disclaimer variant="card" className="mt-4 max-w-xl" />
        </div>
      </section>
      <FAQ />
    </>
  );
}
