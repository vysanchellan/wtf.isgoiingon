import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { DemoStoreProvider } from "@/lib/store";
import { Layout } from "@/components/ui/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AmzVest ZA — Premium Investment Platform (DEMO)</title>
        <meta name="description" content="A premium fictional Amazon reselling investment platform. Educational demo project." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>
      <div className={`${inter.variable} font-sans`}>
        <DemoStoreProvider>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </motion.div>
          </AnimatePresence>
        </DemoStoreProvider>
      </div>
    </>
  );
}
