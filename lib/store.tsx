import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PACKAGES, type PackageId, getPackage } from "./data";

// ---------------------------------------------------------------------------
// Demo store — fully client-side, persisted to localStorage.
// NOT a real wallet, NOT real money, NOT real subscriptions.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "brewclub:demo-state:v1";

export type Transaction = {
  id: string;
  type: "deposit" | "purchase" | "refund";
  amount: number; // positive credit, negative debit
  label: string;
  createdAt: string; // ISO
  meta?: { packageId?: PackageId; method?: string };
};

export type Subscription = {
  packageId: PackageId;
  startedAt: string;
  nextBillingAt: string;
  status: "active" | "paused" | "cancelled";
};

export type User = {
  name: string;
  email: string;
};

export type DemoState = {
  user: User;
  walletBalance: number;
  transactions: Transaction[];
  subscription: Subscription | null;
};

const DEFAULT_STATE: DemoState = {
  user: { name: "Demo User", email: "demo@brewclub.example" },
  walletBalance: 0,
  transactions: [],
  subscription: null,
};

function isBrowser() {
  return typeof window !== "undefined";
}

function loadState(): DemoState {
  if (!isBrowser()) return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      user: { ...DEFAULT_STATE.user, ...(parsed.user ?? {}) },
      walletBalance: typeof parsed.walletBalance === "number" ? parsed.walletBalance : 0,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      subscription: parsed.subscription ?? null,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: DemoState) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy errors — this is a demo
  }
}

function genId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function addMonths(iso: string, months: number) {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

type DepositResult = { ok: true; tx: Transaction } | { ok: false; error: string };
type PurchaseResult =
  | { ok: true; tx: Transaction; subscription: Subscription }
  | { ok: false; error: string };

type StoreApi = {
  hydrated: boolean;
  state: DemoState;
  deposit(amount: number, method?: string): DepositResult;
  buyPackage(packageId: PackageId): PurchaseResult;
  cancelSubscription(): void;
  pauseSubscription(): void;
  resumeSubscription(): void;
  updateUser(patch: Partial<User>): void;
  reset(): void;
};

const StoreContext = createContext<StoreApi | null>(null);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);

  // Keep ref in sync with state for event-handler reads (e.g. buyPackage validation).
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  // setState in effect is intentional here — required to bridge SSR → client storage.
  useEffect(() => {
    const loaded = loadState();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loaded);
    setHydrated(true);
  }, []);

  // Persist on every change once hydrated
  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const deposit = useCallback<StoreApi["deposit"]>((amount, method = "Card •••• 4242") => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, error: "Enter an amount greater than zero." };
    }
    if (amount > 10_000) {
      return { ok: false, error: "Demo limit is $10,000 per top-up." };
    }
    const rounded = Math.round(amount * 100) / 100;
    const tx: Transaction = {
      id: genId("TX"),
      type: "deposit",
      amount: rounded,
      label: `Top-up via ${method}`,
      createdAt: new Date().toISOString(),
      meta: { method },
    };
    setState((s) => ({
      ...s,
      walletBalance: Math.round((s.walletBalance + rounded) * 100) / 100,
      transactions: [tx, ...s.transactions],
    }));
    return { ok: true, tx };
  }, []);

  const buyPackage = useCallback<StoreApi["buyPackage"]>((packageId) => {
    const pkg = getPackage(packageId);
    const current = stateRef.current;
    if (current.walletBalance < pkg.priceMonthly) {
      return {
        ok: false,
        error: `Not enough BrewCredits — you need $${pkg.priceMonthly.toFixed(
          2
        )} but only have $${current.walletBalance.toFixed(2)}.`,
      };
    }
    const now = new Date().toISOString();
    const subscription: Subscription = {
      packageId,
      startedAt: now,
      nextBillingAt: addMonths(now, 1),
      status: "active",
    };
    const tx: Transaction = {
      id: genId("TX"),
      type: "purchase",
      amount: -pkg.priceMonthly,
      label: `${pkg.name} subscription — first month`,
      createdAt: now,
      meta: { packageId },
    };
    setState((s) => ({
      ...s,
      walletBalance: Math.round((s.walletBalance - pkg.priceMonthly) * 100) / 100,
      transactions: [tx, ...s.transactions],
      subscription,
    }));
    return { ok: true, tx, subscription };
  }, []);

  const cancelSubscription = useCallback<StoreApi["cancelSubscription"]>(() => {
    setState((s) =>
      s.subscription
        ? { ...s, subscription: { ...s.subscription, status: "cancelled" } }
        : s
    );
  }, []);

  const pauseSubscription = useCallback<StoreApi["pauseSubscription"]>(() => {
    setState((s) =>
      s.subscription && s.subscription.status === "active"
        ? { ...s, subscription: { ...s.subscription, status: "paused" } }
        : s
    );
  }, []);

  const resumeSubscription = useCallback<StoreApi["resumeSubscription"]>(() => {
    setState((s) =>
      s.subscription && s.subscription.status !== "cancelled"
        ? { ...s, subscription: { ...s.subscription, status: "active" } }
        : s
    );
  }, []);

  const updateUser = useCallback<StoreApi["updateUser"]>((patch) => {
    setState((s) => ({ ...s, user: { ...s.user, ...patch } }));
  }, []);

  const reset = useCallback<StoreApi["reset"]>(() => {
    setState(DEFAULT_STATE);
  }, []);

  const api = useMemo<StoreApi>(
    () => ({
      hydrated,
      state,
      deposit,
      buyPackage,
      cancelSubscription,
      pauseSubscription,
      resumeSubscription,
      updateUser,
      reset,
    }),
    [
      hydrated,
      state,
      deposit,
      buyPackage,
      cancelSubscription,
      pauseSubscription,
      resumeSubscription,
      updateUser,
      reset,
    ]
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useDemoStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return ctx;
}

export function summarizeSubscription(sub: Subscription | null) {
  if (!sub) return null;
  const pkg = getPackage(sub.packageId);
  return {
    pkg,
    status: sub.status,
    startedAt: sub.startedAt,
    nextBillingAt: sub.nextBillingAt,
  };
}

export const ALL_PACKAGE_IDS: PackageId[] = PACKAGES.map((p) => p.id);
