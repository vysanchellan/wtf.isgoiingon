import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function AdminLayout({ children, title, description }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center w-full gap-1.5 px-4 py-1 text-[10px] font-medium text-[var(--amber)] bg-[rgba(217,119,6,0.15)] border-b border-[rgba(217,119,6,0.15)]">
        DEMO — Admin simulation. No real data.
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">{title}</h1>
        {description && <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>}
        {children}
      </div>
    </div>
  );
}
