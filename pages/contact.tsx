import Head from "next/head";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Contact — AmzVest ZA (DEMO)</title>
      </Head>
      <section className="border-b border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-xs font-medium tracking-wider text-[#0F6E56] uppercase">
            Contact
          </div>
          <h1 className="mt-2 text-2xl font-medium sm:text-3xl">
            Get in touch with the (fictional) team.
          </h1>
          <Disclaimer variant="card" className="mt-4 max-w-xl">
            This form does not submit anywhere — it&apos;s a UI flow for a demo project. No data is sent or stored.
          </Disclaimer>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[var(--surface)]">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--border-tertiary)] bg-white dark:bg-[var(--surface)] p-6">
            <h2 className="text-base font-medium">Send a message (demo)</h2>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Fields validate locally. Submission shows a confirmation only.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="name" className="text-xs font-medium">Name</label>
                <input id="name" type="text" required className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-medium">Email</label>
                <input id="email" type="email" required className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
              </div>
              <div>
                <label htmlFor="subject" className="text-xs font-medium">Subject</label>
                <input id="subject" type="text" required className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium">Message</label>
                <textarea id="message" required rows={4} className="mt-1 w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1D9E75]/60 focus:ring-2 focus:ring-[#1D9E75]/20" />
              </div>
            </div>

            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#1D9E75] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0F6E56] transition">
              Send demo message
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/50 bg-emerald-50 px-4 py-3 text-xs text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold">Demo: message accepted.</p>
                    <p className="text-emerald-800/80 dark:text-emerald-200/80">No email is actually sent. This is a demo.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </>
  );
}
