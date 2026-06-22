import Head from "next/head";
import { useMemo, useState, type ReactElement } from "react";
import type { NextPage } from "next";
import { Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ADMIN_USERS } from "@/lib/data";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

type StatusFilter = "all" | "active" | "paused" | "cancelled";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  paused: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300",
};

const UsersPage: NextPage & { getLayout?: (page: ReactElement) => ReactElement } = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ADMIN_USERS.filter((u) => {
      if (status !== "all" && u.status !== status) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    });
  }, [query, status]);

  return (
    <>
      <Head>
        <title>Admin · Users — BrewClub (DEMO)</title>
      </Head>

      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[color:var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--foreground)]/45" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users by name, email, or ID"
              className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--background)] py-1.5 pl-9 pr-3 text-sm outline-none focus:border-[color:var(--brand)]/60"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] p-0.5 text-xs">
              {(["all", "active", "paused", "cancelled"] as StatusFilter[]).map((s) => (
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
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs hover:border-[color:var(--brand)]/40"
            >
              <Filter className="h-3.5 w-3.5" />
              More filters
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs hover:border-[color:var(--brand)]/40"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--surface-muted)] text-left text-xs uppercase tracking-wider text-[color:var(--foreground)]/60">
              <tr>
                <th className="px-4 py-2 font-medium">User</th>
                <th className="px-4 py-2 font-medium">Joined</th>
                <th className="px-4 py-2 font-medium">Package</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Lifetime spend</th>
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[color:var(--surface-muted)]/60 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand)]/12 text-xs font-semibold text-[color:var(--brand-strong)]">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.name}</p>
                        <p className="truncate text-xs text-[color:var(--foreground)]/55">
                          {u.email} · {u.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--foreground)]/75">
                    {formatDate(u.joinedAt)}
                  </td>
                  <td className="px-4 py-3 capitalize">{u.package ?? "—"}</td>
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
                  <td className="px-4 py-3 text-right font-medium tabular-nums">
                    {formatCurrency(u.lifetimeSpend)}
                  </td>
                  <td className="px-2 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-[color:var(--surface-muted)]"
                      aria-label={`Open actions for ${u.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[color:var(--foreground)]/55"
                  >
                    No users match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-[color:var(--border)] px-4 py-3 text-xs text-[color:var(--foreground)]/60 sm:flex-row">
          <p>
            Showing <strong>{filtered.length}</strong> of {ADMIN_USERS.length} users
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-full border border-[color:var(--border)] px-2 py-1 hover:border-[color:var(--brand)]/40">
              ← Prev
            </button>
            <button className="rounded-full border border-[color:var(--border)] px-2 py-1 hover:border-[color:var(--brand)]/40">
              Next →
            </button>
          </div>
        </div>
      </div>

      <Disclaimer variant="card" className="mt-6">
        All user records on this page are fictional. Search, filter, and pagination
        operate on the hardcoded dataset in <code>lib/data.ts</code>.
      </Disclaimer>
    </>
  );
};

UsersPage.getLayout = (page) => (
  <AdminLayout
    title="Users"
    description="Manage demo subscribers, filter by status, export a fake CSV."
    actions={
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--brand-strong)]"
      >
        <Plus className="h-4 w-4" />
        Invite user
      </button>
    }
  >
    {page}
  </AdminLayout>
);

export default UsersPage;
