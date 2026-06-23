import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
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

  const page = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <Head>
        <title>AmzVest ZA — Investment Demo (DEMO)</title>
        <meta
          name="description"
          content="A fictional Amazon reselling investment platform. Educational demo project."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <DemoStoreProvider>
            <Layout>{page}</Layout>
          </DemoStoreProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
