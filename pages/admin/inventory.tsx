import Head from "next/head";
import { useMemo, type ReactElement } from "react";
import type { NextPage } from "next";
import { AlertTriangle, Coffee, PackagePlus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { INVENTORY } from "@/lib/data";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatDate } from "@/lib/utils";

const ROAST_DOT: Record<string, string> = {
  Light: "bg-amber-300",
  Medium: "bg-amber-500",
  "Medium-Dark": "bg-amber-700",
  Dark: "bg-amber-900",
};

const InventoryPage: NextPage & { getLayout?: (page: ReactElement) => ReactElement } = () => {
  const totals = useMemo(() => {
    return INVENTORY.reduce(
      (acc, i) => {
        acc.totalBags += i.stockBags;
        if (i.stockBags < 100) acc.lowStockSkus += 1;
        return acc;
      },
      { totalBags: 0, lowStockSkus: 0 }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Admin · Inventory — BrewClub (DEMO)</title>
      </Head>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--foreground)]/55">
            Total bags in stock
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums">
            {totals.totalBags.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-[color:var(--foreground)]/55">
            Across {INVENTORY.length} SKUs
          </p>
        </div>
        <div className="rounded-2xl border border-amber-400/40 bg-amber-50/60 p-5 shadow-sm dark:border-amber-500/40 dark:bg-amber-500/10">
          <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" /> Low-stock SKUs
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{totals.lowStockSkus}</p>
          <p className="mt-1 text-xs text-amber-800/70 dark:text-amber-200/80">
            Anything under 100 bags
          </p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--foreground)]/55">
            Newest roast
          </p>
          <p className="mt-2 text-3xl font-bold">
            {formatDate(
              INVENTORY.slice().sort((a, b) => b.roastedOn.localeCompare(a.roastedOn))[0]
                .roastedOn
            )}
          </p>
          <p className="mt-1 text-xs text-[color:var(--foreground)]/55">
            From the most recent batch
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INVENTORY.map((item) => {
          const low = item.stockBags < 100;
          return (
            <div
              key={item.sku}
              className="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm transition hover:border-[color:var(--brand)]/40"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--brand)]/12 text-[color:var(--brand-strong)]">
                  <Coffee className="h-5 w-5" />
                </div>
                {low && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
                    <AlertTriangle className="h-3 w-3" />
                    Low
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold leading-tight">{item.origin}</h3>
              <p className="text-xs text-[color:var(--foreground)]/55">
                SKU {item.sku} · {item.process}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={cn("h-2 w-2 rounded-full", ROAST_DOT[item.roast])} />
                <span>{item.roast} roast</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[color:var(--border)] pt-3 text-xs">
                <div>
                  <p className="text-[color:var(--foreground)]/55">In stock</p>
                  <p className="text-base font-semibold tabular-nums">{item.stockBags} bags</p>
                </div>
                <div>
                  <p className="text-[color:var(--foreground)]/55">Roasted on</p>
                  <p className="text-base font-semibold">{formatDate(item.roastedOn)}</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs font-medium hover:border-[color:var(--brand)]/40"
              >
                <PackagePlus className="h-3.5 w-3.5" />
                Reorder (demo)
              </button>
            </div>
          );
        })}
      </div>

      <Disclaimer variant="card" className="mt-6" />
    </>
  );
};

InventoryPage.getLayout = (page) => (
  <AdminLayout
    title="Inventory"
    description="Single-origin bag stock across the (fictional) roastery."
  >
    {page}
  </AdminLayout>
);

export default InventoryPage;
