import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background-tertiary)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
