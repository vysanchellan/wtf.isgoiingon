import Head from "next/head";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
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

      <PageHeader
        eyebrow="Contact"
        icon={<Mail className="h-3.5 w-3.5" />}
        title="Get in touch"
        subtitle="Have a question about the demo? Drop a note below."
      >
        <Disclaimer variant="card">
          This form does not submit anywhere — it&apos;s a UI flow for a demo
          project. No data is sent or stored.
        </Disclaimer>
      </PageHeader>

      <section className="bg-[var(--bg-primary)] py-16">
        <div className="mx-auto grid max-w-4xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Reach the (fictional) team
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              AmzVest ZA is an educational demonstration. These details are part
              of the simulation and don&apos;t reach a real inbox.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-[var(--gold)]/[0.1] text-[var(--gold)]">
                  <Mail className="h-4 w-4" />
                </span>
                hello@amzvest.example
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-[var(--gold)]/[0.1] text-[var(--gold)]">
                  <MapPin className="h-4 w-4" />
                </span>
                Durban, South Africa
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="card-glass p-6 sm:p-8"
          >
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Send a message (demo)
            </h2>
            <p className="mt-1 mb-6 text-xs text-[var(--text-secondary)]">
              Fields validate locally. Submission shows a confirmation only.
            </p>

            <div className="space-y-4">
              <Field label="Name" id="name" type="text" placeholder="Sipho Nkosi" />
              <Field label="Email" id="email" type="email" placeholder="you@email.com" />
              <Field label="Subject" id="subject" type="text" placeholder="How can we help?" />
              <div>
                <label htmlFor="message" className="field-label">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Your message…"
                  className="input-premium resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              <Send className="h-4 w-4" />
              Send demo message
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-start gap-2.5 rounded-[var(--radius)] border border-[var(--gold)]/20 bg-[var(--gold)]/[0.08] px-4 py-3 text-xs text-[var(--gold)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Demo: message accepted.</p>
                    <p className="mt-0.5 text-[var(--text-secondary)]">
                      No email is actually sent. This is a demo.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input id={id} type={type} required placeholder={placeholder} className="input-premium" />
    </div>
  );
}
