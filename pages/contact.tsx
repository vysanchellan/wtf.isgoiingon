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
            Contact
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "8px 0 0",
            }}
          >
            Get in touch
          </h1>
          <div style={{ marginTop: 20, maxWidth: 600 }}>
            <Disclaimer variant="card">
              This form does not submit anywhere — it&apos;s a UI flow for a demo project. No data is sent or stored.
            </Disclaimer>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0", background: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>
              Send a message (demo)
            </h2>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "4px 0 20px" }}>
              Fields validate locally. Submission shows a confirmation only.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Name" id="name" type="text" />
              <Field label="Email" id="email" type="email" />
              <Field label="Subject" id="subject" type="text" />
              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: 20,
                padding: "11px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "#0a0a0f",
                background: "linear-gradient(135deg, var(--gold), var(--amber))",
                border: "none",
                borderRadius: "var(--radius)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255, 215, 0, 0.25)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              Send demo message
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 20,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "12px 16px",
                    borderRadius: "var(--radius)",
                    background: "rgba(255, 215, 0, 0.08)",
                    border: "1px solid rgba(255, 215, 0, 0.2)",
                    fontSize: 12,
                    color: "var(--gold)",
                  }}
                >
                  <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>Demo: message accepted.</p>
                    <p style={{ color: "var(--text-secondary)", margin: "2px 0 0" }}>
                      No email is actually sent. This is a demo.
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

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-secondary)",
  display: "block",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 13,
  background: "var(--bg-tertiary)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  color: "var(--text-primary)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

function Field({ label, id, type }: { label: string; id: string; type: string }) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id}
        type={type}
        required
        style={inputStyle}
        onFocus={focusGold}
        onBlur={blurBorder}
      />
    </div>
  );
}

function focusGold(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--gold)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 215, 0, 0.15)";
}

function blurBorder(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--border)";
  e.currentTarget.style.boxShadow = "none";
}
