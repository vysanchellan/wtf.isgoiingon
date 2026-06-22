import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BarChart3,
  Bell,
  Box,
  Coffee,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { AdminGuard, signOutAdmin } from "./AdminGuard";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/inventory", label: "Inventory", icon: Box },
];

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AdminLayout({ children, title, description, actions }: Props) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[color:var(--surface-muted)]/40">
        <Disclaimer variant="banner" />

        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--background)]/85 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand)] text-white">
              <Coffee className="h-4 w-4" />
            </span>
            BrewClub <span className="text-[color:var(--foreground)]/55">/ admin</span>
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)]"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-30 w-64 -translate-x-full border-r border-[color:var(--border)] bg-[color:var(--background)] p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
              mobileOpen && "translate-x-0"
            )}
          >
            <Link
              href="/admin/dashboard"
              className="mb-6 hidden items-center gap-2 px-2 text-base font-semibold lg:flex"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[color:var(--brand)] text-white">
                <Coffee className="h-4 w-4" />
              </span>
              <span>
                Brew<span className="text-[color:var(--brand)]">Club</span>
                <span className="ml-1 text-xs font-medium text-[color:var(--foreground)]/55">
                  admin
                </span>
              </span>
            </Link>

            <nav className="space-y-0.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)] font-semibold"
                        : "text-[color:var(--foreground)]/75 hover:bg-[color:var(--surface-muted)]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute inset-x-4 bottom-4 space-y-2">
              <Link
                href="/"
                className="block rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-medium hover:border-[color:var(--brand)]/40"
              >
                ← Back to marketing site
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOutAdmin();
                  router.push("/admin");
                }}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-400/40 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out (demo)
              </button>
            </div>
          </aside>

          {/* Mobile backdrop */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-20 bg-black/40 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="sticky top-0 z-10 hidden border-b border-[color:var(--border)] bg-[color:var(--background)]/85 px-6 py-3 backdrop-blur lg:flex lg:items-center lg:justify-between">
              <div className="relative w-80 max-w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
                <input
                  type="search"
                  placeholder="Search (demo) ..."
                  className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] py-1.5 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--brand)]/60"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--brand)]/40"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
                </button>
                <ThemeToggle />
                <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] py-1 pl-1 pr-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--brand)]/15 text-xs font-semibold text-[color:var(--brand-strong)]">
                    AD
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold">Admin Demo</p>
                    <p className="text-[10px] text-[color:var(--foreground)]/55">
                      admin@brewclub.example
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
                  {description && (
                    <p className="mt-1 text-sm text-[color:var(--foreground)]/65">
                      {description}
                    </p>
                  )}
                </div>
                {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
