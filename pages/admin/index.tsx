import { useRouter } from "next/router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Coffee, Lock, Sparkles } from "lucide-react";
import { isAdminSignedIn, signInAdmin } from "@/components/admin/AdminGuard";
import { Disclaimer } from "@/components/ui/Disclaimer";
import type { NextPage } from "next";
import type { ReactElement } from "react";

const AdminLoginPage: NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const router = useRouter();
  const [email, setEmail] = useState("admin@brewclub.example");
  const [password, setPassword] = useState("brewclub-demo");

  useEffect(() => {
    if (isAdminSignedIn()) {
      void router.replace("/admin/dashboard");
    }
  }, [router]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInAdmin();
    void router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Disclaimer variant="banner" />
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--brand)] text-white">
              <Coffee className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">BrewClub admin</p>
              <p className="text-xs text-[color:var(--foreground)]/55">Demo console</p>
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-[color:var(--foreground)]/65">
            Any credentials work — this gate is a UI flow, not real auth.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--background)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--brand)]/60 focus:ring-2 focus:ring-[color:var(--brand)]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-strong)] transition"
            >
              <Sparkles className="h-4 w-4" />
              Enter demo dashboard
            </button>
          </form>

          <Disclaimer variant="card" className="mt-6">
            This login form does not validate credentials. Clicking the button stores a
            flag in <code className="rounded bg-amber-200/40 px-1">sessionStorage</code>{" "}
            and routes you into the admin pages. Closing the tab signs you out.
          </Disclaimer>
        </motion.div>
      </div>
    </div>
  );
};

// No marketing layout for the admin login screen
AdminLoginPage.getLayout = (page) => page;

export default AdminLoginPage;
