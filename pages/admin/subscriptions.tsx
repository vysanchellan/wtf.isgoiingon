import Head from "next/head";
import { useMemo, type ReactElement } from "react";
import type { NextPage } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ADMIN_USERS, PACKAGES } from "@/lib/data";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  paused: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
};

const SubscriptionsPage: NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const tierBreakdown = useMemo(() => {
    return PACKAGES.map((p) => {
      const subs = ADMIN_USERS.filter((u) => u.package === p.id);
      const active = subs.filter((s) => s.status === "active").length;
      const mrr = active * p.priceMonthly;
      return { pkg: p, total: subs.length, active, mrr };
    });
  }, []);

  const subscriptionList = ADMIN_USERS.filter((u) => u.package !== null);

  return (
    <>
      <Head>
        <title>Admin · Subscriptions — BrewClub (DEMO)</title>
      </Head>

      <div className="grid gap-4 sm:grid-cols-3">
        {tierBreakdown.map((t) => {
          const pct = t.total === 0 ? 0 : Math.round((t.active / t.total) * 100);
          return (
            <div
              key={t.pkg.id}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{t.pkg.name}</h3>
                <span className="rounded-full bg-[color:var(--brand)]/12 px-2 py-0.5 text-xs font-semibold text-[color:var(--brand-strong)]">
                  {formatCurrency(t.pkg.priceMonthly)}/mo
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">{t.total}</p>
              <p className="text-xs text-[color:var(--foreground)]/60">
                total subscribers · {t.active} active ({pct}%)
              </p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
                <div
                  className="h-full bg-[color:var(--brand)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-[color:var(--foreground)]/60">
                Contributes{" "}
                <strong className="text-[color:var(--foreground)]">
                  {formatCurrency(t.mrr)}
                </strong>{" "}
                / month
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
        <header className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
          <h3 className="text-base font-semibold">All subscriptions</h3>
          <span className="text-xs text-[color:var(--foreground)]/55">
            {subscriptionList.length} records
          </span>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--surface-muted)] text-left text-xs uppercase tracking-wider text-[color:var(--foreground)]/60">
              <tr>
                <th className="px-4 py-2 font-medium">Subscriber</th>
                <th className="px-4 py-2 font-medium">Package</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Monthly</th>
                <th className="px-4 py-2 text-right font-medium">Lifetime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {subscriptionList.map((u) => {
                const pkg = PACKAGES.find((p) => p.id === u.package);
                if (!pkg) return null;
                return (
                  <tr key={u.id} className="hover:bg-[color:var(--surface-muted)]/60">
                    <td className="px-4 py-3">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-[color:var(--foreground)]/55">{u.email}</p>
                    </td>
                    <td className="px-4 py-3">{pkg.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize",
                          STATUS_STYLES[u.status]
                        )}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatCurrency(pkg.priceMonthly)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {formatCurrency(u.lifetimeSpend)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Disclaimer variant="card" className="mt-6" />
    </>
  );
};

SubscriptionsPage.getLayout = (page) => (
  <AdminLayout
    title="Subscriptions"
    description="Tier breakdown and individual subscription records."
  >
    {page}
  </AdminLayout>
);

export default SubscriptionsPage;
