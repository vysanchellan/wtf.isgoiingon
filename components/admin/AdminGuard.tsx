import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";

const KEY = "brewclub:admin-session:v1";

export function isAdminSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function signInAdmin() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}

export function signOutAdmin() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

type Props = { children: ReactNode };

export function AdminGuard({ children }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAdminSignedIn()) {
      void router.replace("/admin");
      return;
    }
    // Gate check passed — reveal children. Intentional setState in effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[color:var(--foreground)]/55">
        Checking demo session…
      </div>
    );
  }

  return <>{children}</>;
}
