import Head from "next/head";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — AmzVest ZA (DEMO)</title>
      </Head>
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "48px 16px 40px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            How it works
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "8px 0 0",
            }}
          >
            A flow you can actually click through.
          </h1>
          <div style={{ marginTop: 20, maxWidth: 600 }}>
            <Disclaimer variant="card">
              Every step in this demo is interactive. Register, pick a package, and see the simulated dashboard.
            </Disclaimer>
          </div>
        </div>
      </section>
      <HowItWorks />
    </>
  );
}
