import Head from "next/head";
import { PackagesGrid } from "@/components/ui/PackagesGrid";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function PackagesPage() {
  return (
    <>
      <Head>
        <title>Packages — AmzVest ZA (DEMO)</title>
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
            Investment packages
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "8px 0 0",
            }}
          >
            Pick the tier that matches your goals
          </h1>
          <div style={{ marginTop: 20, maxWidth: 600 }}>
            <Disclaimer variant="card">
              Investment amounts, returns, and projections below are fabricated for UI demonstration. No real product or fulfilment exists.
            </Disclaimer>
          </div>
        </div>
      </section>
      <PackagesGrid withHeader={false} />
    </>
  );
}
