import Head from "next/head";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MessageSquare, User } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Contact — BrewClub (DEMO)</title>
      </Head>
      <section className="border-b border-[color:var(--border)] gradient-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
            Get in touch
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Say hello to the (fictional) BrewClub team.
          </h1>
          <Disclaimer variant="card" className="mt-6 max-w-xl">
            This form does not submit anywhere — it&apos;s a UI flow for an academic
            project. No data is sent or stored.
          </Disclaimer>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Where we&apos;d be, in theory.</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[color:var(--foreground)]/60">Roastery (fictional)</dt>
                  <dd>140 Mock Lane, Anytown</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--foreground)]/60">Hours (fictional)</dt>
                  <dd>Mon–Fri, 9am–5pm</dd>
                </div>
                <div>
                  <dt className="text-[color:var(--foreground)]/60">Support email (demo)</dt>
                  <dd>support@brewclub.example</dd>
                </div>
              </dl>
            </div>
            <p className="text-xs text-[color:var(--foreground)]/55">
              All contact details on this page are placeholders.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
          >
            <h2 className="text-lg font-semibold">Send a message (demo)</h2>
            <p className="mt-1 text-sm text-[color:var(--foreground)]/65">
              Fields validate locally. Submission shows a confirmation only.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                icon={User}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                id="email"
                label="Email"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
              <Field
                id="subject"
                label="Subject"
                icon={MessageSquare}
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                className="sm:col-span-2"
                required
              />
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--brand-strong)] transition sm:w-auto"
            >
              Send demo message
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/50 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Demo: message accepted.</p>
                    <p className="text-emerald-800/80 dark:text-emerald-200/80">
                      No email is actually sent. In a real version this would hit a
                      contact endpoint.
                    </p>
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

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  className?: string;
};

function Field({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  required,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
        />
      </div>
    </div>
  );
}
