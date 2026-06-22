import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mounting flag prevents SSR/CSR mismatch — intentional setState in effect.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-[color:var(--border)] bg-[color:var(--surface)]/60 backdrop-blur",
        "text-[color:var(--foreground)]/80 hover:text-[color:var(--brand)] transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--brand)]",
        className
      )}
    >
      {/* Render both icons to avoid layout shift; toggle visibility once mounted */}
      <Sun
        className={cn("h-4 w-4 transition", mounted ? (isDark ? "hidden" : "block") : "block")}
        aria-hidden
      />
      <Moon
        className={cn("h-4 w-4 transition", mounted ? (isDark ? "block" : "hidden") : "hidden")}
        aria-hidden
      />
    </button>
  );
}
