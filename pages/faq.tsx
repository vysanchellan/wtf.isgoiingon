import Head from "next/head";
import { HelpCircle } from "lucide-react";
import { FAQ } from "@/components/ui/FAQ";
import { PageHeader } from "@/components/ui/PageHeader";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ — AmzVest ZA (DEMO)</title>
      </Head>
      <PageHeader
        eyebrow="FAQ"
        icon={<HelpCircle className="h-3.5 w-3.5" />}
        title="Questions about this demo."
        subtitle="The short version: nothing here is real. Here are the details."
      >
        <Disclaimer variant="card" />
      </PageHeader>
      <FAQ />
    </>
  );
}
