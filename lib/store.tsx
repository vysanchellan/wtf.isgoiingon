import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type PackageId = "starter" | "growth" | "premium";

type StoreApi = {
  selectedPackage: PackageId;
  setSelectedPackage: (id: PackageId) => void;
};

const StoreContext = createContext<StoreApi | null>(null);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("growth");

  const api = useMemo<StoreApi>(
    () => ({ selectedPackage, setSelectedPackage }),
    [selectedPackage]
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useDemoStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return ctx;
}
