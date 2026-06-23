import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function AdminLayout({ children, title, description }: Props) {
  return (
    <div>
      <div style={{
        width: "100%", background: "rgba(217, 119, 6, 0.15)", color: "var(--amber)",
        fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center",
        gap: "6px", padding: "4px 16px", fontWeight: 500,
        borderBottom: "1px solid rgba(217, 119, 6, 0.15)",
      }}>
        DEMO — Admin simulation. No real data.
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{title}</h1>
          {description && <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, margin: 0 }}>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
