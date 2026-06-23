import Head from "next/head";
import { Layers } from "lucide-react";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function PackagesPage() {
  return (
    <>
      <Head>
        <title>Packages — AmzVest ZA (DEMO)</title>
      </Head>
      <PageHeader
        eyebrow="Investment packages"
        icon={<Layers className="h-3.5 w-3.5" />}
        title="Pick the tier that matches your goals"
        subtitle="Three illustrative tiers, each showing a 2× return paid as a single lump sum after 3 weeks."
      >
        <Disclaimer variant="card">
          Investment amounts, returns, and projections below are fabricated for UI
          demonstration. No real product or fulfilment exists.
        </Disclaimer>
      </PageHeader>
      <PackagesGrid withHeader={false} />
    </>
  );
}
