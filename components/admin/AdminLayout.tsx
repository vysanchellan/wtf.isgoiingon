import { type ReactNode } from "react";
import { Disclaimer } from "@/components/ui/Disclaimer";

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function AdminLayout({ children, title, description }: Props) {
  return (
    <div>
      <Disclaimer variant="banner">
        DEMO — Admin simulation. No real data.
      </Disclaimer>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-lg font-medium">{title}</h1>
          {description && <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
