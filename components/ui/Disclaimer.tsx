import { AlertTriangle } from "lucide-react";

type Variant = "banner" | "inline" | "card";

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
};

const DEFAULT_TEXT =
  "DEMO — Educational project. AmzVest ZA is fictional. No investments are accepted, no returns are paid, no data leaves your browser.";

export function Disclaimer({ variant = "inline", children }: Props) {
  const content = children ?? DEFAULT_TEXT;

  if (variant === "banner") {
    return (
      <div
        role="note"
        aria-label="Demo disclaimer"
        style={{
          width: "100%",
          background: "rgba(217, 119, 6, 0.15)",
          color: "var(--amber)",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "4px 16px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          borderBottom: "1px solid rgba(217, 119, 6, 0.15)",
        }}
      >
        <AlertTriangle style={{ width: 12, height: 12, flexShrink: 0 }} />
        <span style={{ textAlign: "center" }}>{content}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        role="note"
        aria-label="Demo disclaimer"
        style={{
          borderRadius: "var(--radius)",
          border: "1px solid rgba(217, 119, 6, 0.2)",
          background: "rgba(146, 64, 14, 0.08)",
          padding: "12px 16px",
          fontSize: "12px",
          color: "var(--amber)",
          display: "flex",
          gap: "10px",
          lineHeight: 1.6,
        }}
      >
        <AlertTriangle style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
        <p>{content}</p>
      </div>
    );
  }

  return (
    <p
      role="note"
      aria-label="Demo disclaimer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--amber)",
      }}
    >
      <AlertTriangle style={{ width: 12, height: 12 }} />
      <span>{content}</span>
    </p>
  );
}
