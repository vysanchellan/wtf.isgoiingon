import { type ReactNode } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function AdminLayout({ children, title, description }: Props) {
  return (
    <div>
      <div className="flex w-full items-center justify-center gap-1.5 border-b border-[rgba(217,119,6,0.15)] bg-[rgba(217,119,6,0.15)] px-4 py-1 text-[10px] font-medium tracking-wide text-[var(--amber)]">
        <AlertTriangle className="h-3 w-3 shrink-0" />
        DEMO — Admin simulation. No real data.
      </div>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-5 items-center gap-1 rounded-full bg-[var(--gold)]/[0.12] px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
            <ShieldCheck className="h-3 w-3" />
            Admin
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
