import Head from "next/head";
import { Workflow } from "lucide-react";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — AmzVest ZA (DEMO)</title>
      </Head>
      <PageHeader
        eyebrow="How it works"
        icon={<Workflow className="h-3.5 w-3.5" />}
        title="A flow you can actually click through."
        subtitle="From registration to payout — every step is an interactive simulation."
      >
        <Disclaimer variant="card">
          Every step in this demo is interactive. Register, pick a package, and see
          the simulated dashboard. No real money moves.
        </Disclaimer>
      </PageHeader>
      <HowItWorks />
    </>
  );
}
