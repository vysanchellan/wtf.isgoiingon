import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
        "border border-[var(--border-secondary)] bg-[var(--background)]",
        "text-[var(--text-secondary)] hover:text-[var(--brand)] transition",
        className
      )}
    >
      <Sun className={cn("h-4 w-4", mounted && isDark ? "hidden" : "block")} aria-hidden />
      <Moon className={cn("h-4 w-4", mounted && isDark ? "block" : "hidden")} aria-hidden />
    </button>
  );
}
