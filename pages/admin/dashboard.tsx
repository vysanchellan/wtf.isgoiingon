import Head from "next/head";
import { useMemo } from "react";
import { Box, DollarSign, Package, Users } from "lucide-react";
import type { ReactElement } from "react";
import type { NextPage } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { ADMIN_ORDERS, ADMIN_USERS, INVENTORY, REVENUE_SERIES } from "@/lib/data";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  shipped: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300",
  processing: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  refunded: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
};

const DashboardPage: NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const stats = useMemo(() => {
    const activeUsers = ADMIN_USERS.filter((u) => u.status === "active").length;
    const recentOrders = ADMIN_ORDERS.slice(0, 5);
    const mrr = ADMIN_USERS.filter((u) => u.status === "active").reduce(
      (acc, u) => {
        const price = u.package === "master" ? 75 : u.package === "connoisseur" ? 35 : 15;
        return acc + (u.package ? price : 0);
      },
      0
    );
    const currentMonth = REVENUE_SERIES[REVENUE_SERIES.length - 1];
    const prevMonth = REVENUE_SERIES[REVENUE_SERIES.length - 2];
    const growthPct = ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100;
    const totalBags = INVENTORY.reduce((acc, i) => acc + i.stockBags, 0);
    return { activeUsers, recentOrders, mrr, currentMonth, growthPct, totalBags };
  }, []);

  return (
    <>
      <Head>
        <title>Admin · Overview — BrewClub (DEMO)</title>
      </Head>

      <Disclaimer variant="card" className="mb-6">
        Every number on this dashboard — users, revenue, orders, stock — is fabricated
        for a UI/UX demonstration. No real data is being queried.
      </Disclaimer>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={formatCurrency(stats.mrr)}
          delta={{ value: `${stats.growthPct.toFixed(1)}%`, positive: stats.growthPct >= 0 }}
          icon={DollarSign}
          index={0}
        />
        <StatCard
          label="Active subscribers"
          value={stats.activeUsers.toString()}
          delta={{ value: "+12", positive: true }}
          icon={Users}
          index={1}
        />
        <StatCard
          label="Orders this month"
          value={stats.currentMonth.orders.toString()}
          delta={{ value: "+17", positive: true }}
          icon={Package}
          index={2}
        />
        <StatCard
          label="Bags in stock"
          value={stats.totalBags.toLocaleString()}
          delta={{ value: "−84", positive: false }}
          icon={Box}
          index={3}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <RevenueChart />

        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Recent orders</h3>
            <span className="text-xs text-[color:var(--foreground)]/55">last 5</span>
          </div>
          <ul className="divide-y divide-[color:var(--border)]">
            {stats.recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div>
                  <p className="font-medium">{o.user}</p>
                  <p className="text-xs text-[color:var(--foreground)]/55">
                    {o.id} · {formatDate(o.placedAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums font-semibold">{formatCurrency(o.amount)}</p>
                  <span
                    className={cn(
                      "mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                      STATUS_STYLES[o.status]
                    )}
                  >
                    {o.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

DashboardPage.getLayout = (page) => (
  <AdminLayout
    title="Overview"
    description="A snapshot of the BrewClub demo business."
  >
    {page}
  </AdminLayout>
);

export default DashboardPage;
