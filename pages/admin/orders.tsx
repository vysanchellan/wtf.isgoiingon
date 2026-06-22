import Head from "next/head";
import { useMemo, useState, type ReactElement } from "react";
import type { NextPage } from "next";
import { Download, Filter, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ADMIN_ORDERS, getPackage } from "@/lib/data";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

type StatusFilter = "all" | "processing" | "shipped" | "delivered" | "refunded";

const STATUS_STYLES: Record<string, string> = {
  processing: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  shipped: "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300",
  delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  refunded: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
};

const OrdersPage: NextPage & { getLayout?: (page: ReactElement) => ReactElement } = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ADMIN_ORDERS.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.user.toLowerCase().includes(q) ||
        o.package.toLowerCase().includes(q)
      );
    });
  }, [query, status]);

  const totals = useMemo(() => {
    return ADMIN_ORDERS.reduce(
      (acc, o) => {
        acc.gross += o.amount;
        if (o.status === "refunded") acc.refunded += o.amount;
        return acc;
      },
      { gross: 0, refunded: 0 }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Admin · Orders — BrewClub (DEMO)</title>
      </Head>

      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Gross volume" value={formatCurrency(totals.gross)} hint="all-time, demo" />
        <Summary
          label="Net volume"
          value={formatCurrency(totals.gross - totals.refunded)}
          hint={`refunds: ${formatCurrency(totals.refunded)}`}
        />
        <Summary
          label="Order count"
          value={ADMIN_ORDERS.length.toString()}
          hint={`${ADMIN_ORDERS.filter((o) => o.status === "processing").length} in progress`}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[color:var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID, user, package"
              className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--background)] py-1.5 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--brand)]/60"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] p-0.5 text-xs">
              {(["all", "processing", "shipped", "delivered", "refunded"] as StatusFilter[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={cn(
                      "rounded-full px-2.5 py-1 capitalize transition",
                      status === s
                        ? "bg-[color:var(--brand)] text-white"
                        : "text-[color:var(--foreground)]/65 hover:text-[color:var(--foreground)]"
                    )}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs hover:border-[color:var(--brand)]/40"
            >
              <Filter className="h-3.5 w-3.5" />
              Date range
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs hover:border-[color:var(--brand)]/40"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--surface-muted)] text-left text-xs uppercase tracking-wider text-[color:var(--foreground)]/60">
              <tr>
                <th className="px-4 py-2 font-medium">Order</th>
                <th className="px-4 py-2 font-medium">Customer</th>
                <th className="px-4 py-2 font-medium">Package</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {filtered.map((o) => {
                const pkg = getPackage(o.package);
                return (
                  <tr key={o.id} className="hover:bg-[color:var(--surface-muted)]/60 transition">
                    <td className="px-4 py-3 font-medium tabular-nums">{o.id}</td>
                    <td className="px-4 py-3">{o.user}</td>
                    <td className="px-4 py-3">{pkg.name}</td>
                    <td className="px-4 py-3 text-[color:var(--foreground)]/75">
                      {formatDate(o.placedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize",
                          STATUS_STYLES[o.status]
                        )}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatCurrency(o.amount)}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[color:var(--foreground)]/55"
                  >
                    No orders match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Disclaimer variant="card" className="mt-6" />
    </>
  );
};

function Summary({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--foreground)]/55">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-[color:var(--foreground)]/55">{hint}</p>
    </div>
  );
}

OrdersPage.getLayout = (page) => (
  <AdminLayout
    title="Orders"
    description="Every demo order with status, customer, and package details."
  >
    {page}
  </AdminLayout>
);

export default OrdersPage;
