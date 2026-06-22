import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
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

type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout =
    Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

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
        <title>BrewClub — Specialty coffee, on subscription (DEMO)</title>
        <meta
          name="description"
          content="A fictional specialty-coffee subscription. UI/UX demo built for a third-year academic project."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d97706" />
      </Head>
      <div className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <DemoStoreProvider>{getLayout(page)}</DemoStoreProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
