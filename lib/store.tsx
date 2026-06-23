import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPackage, type PackageId } from "@/lib/data";

export type { PackageId };

export type Txn = {
  id: string;
  type: "deposit" | "purchase";
  amount: number; // +deposit, -purchase
  label: string;
  date: string; // ISO
};

export type Holding = {
  id: string;
  packageId: PackageId;
  name: string;
  invested: number;
  returnAmount: number;
  weeklyPayout: number;
  weeks: number;
  startDate: string; // ISO
};

type PurchaseResult = { ok: boolean; reason?: "insufficient" };

type StoreApi = {
  hydrated: boolean;
  balance: number;
  transactions: Txn[];
  holdings: Holding[];
  selectedPackage: PackageId;
  setSelectedPackage: (id: PackageId) => void;
  deposit: (amount: number, method?: string) => void;
  purchase: (id: PackageId) => PurchaseResult;
  reset: () => void;
};

const STORAGE_KEY = "amzvest-demo-v1";

type Persisted = {
  balance: number;
  transactions: Txn[];
  holdings: Holding[];
  selectedPackage: PackageId;
};

const StoreContext = createContext<StoreApi | null>(null);

const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("growth");

  // Hydrate from localStorage once on mount (client only) to avoid SSR
  // mismatch — the server always renders the empty defaults.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Partial<Persisted>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client hydration from localStorage
        if (typeof data.balance === "number") setBalance(data.balance);
        if (Array.isArray(data.transactions)) setTransactions(data.transactions);
        if (Array.isArray(data.holdings)) setHoldings(data.holdings);
        if (data.selectedPackage) setSelectedPackage(data.selectedPackage);
      }
    } catch {
      /* ignore corrupt demo state */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we never overwrite saved data).
  useEffect(() => {
    if (!hydrated) return;
    const data: Persisted = { balance, transactions, holdings, selectedPackage };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable — demo still works in-memory */
    }
  }, [hydrated, balance, transactions, holdings, selectedPackage]);

  const api = useMemo<StoreApi>(() => {
    const deposit = (amount: number, method = "EFT") => {
      if (!Number.isFinite(amount) || amount <= 0) return;
      setBalance((b) => b + amount);
      setTransactions((t) => [
        {
          id: genId(),
          type: "deposit",
          amount,
          label: `Deposit via ${method}`,
          date: new Date().toISOString(),
        },
        ...t,
      ]);
    };

    const purchase = (id: PackageId): PurchaseResult => {
      const pkg = getPackage(id);
      let result: PurchaseResult = { ok: true };
      setBalance((b) => {
        if (b < pkg.invest) {
          result = { ok: false, reason: "insufficient" };
          return b;
        }
        return b - pkg.invest;
      });
      if (!result.ok) return result;

      const now = new Date().toISOString();
      setHoldings((h) => [
        {
          id: genId(),
          packageId: pkg.id,
          name: pkg.name,
          invested: pkg.invest,
          returnAmount: pkg.returnAmount,
          weeklyPayout: pkg.weeklyPayout,
          weeks: pkg.weeks,
          startDate: now,
        },
        ...h,
      ]);
      setTransactions((t) => [
        {
          id: genId(),
          type: "purchase",
          amount: -pkg.invest,
          label: `Purchased ${pkg.name} package`,
          date: now,
        },
        ...t,
      ]);
      return result;
    };

    const reset = () => {
      setBalance(0);
      setTransactions([]);
      setHoldings([]);
      setSelectedPackage("growth");
    };

    return {
      hydrated,
      balance,
      transactions,
      holdings,
      selectedPackage,
      setSelectedPackage,
      deposit,
      purchase,
      reset,
    };
  }, [hydrated, balance, transactions, holdings, selectedPackage]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useDemoStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return ctx;
}
