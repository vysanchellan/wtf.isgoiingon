import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "banner" | "inline" | "card";

type Props = {
  variant?: Variant;
  children?: React.ReactNode;
  className?: string;
};

const DEFAULT_TEXT =
  "DEMO — Educational project. AmzVest ZA is fictional. No investments are accepted, no returns are paid, no data leaves your browser.";

export function Disclaimer({ variant = "inline", children, className }: Props) {
  const content = children ?? DEFAULT_TEXT;

  if (variant === "banner") {
    return (
      <div
        role="note"
        aria-label="Demo disclaimer"
        className={cn(
          "w-full bg-amber-500 text-white text-xs sm:text-sm",
          "flex items-center justify-center gap-2 px-4 py-1.5 font-medium tracking-wide",
          className
        )}
      >
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="text-center">{content}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        role="note"
        aria-label="Demo disclaimer"
        className={cn(
          "rounded-xl border border-amber-400/60 bg-amber-50 px-4 py-3 text-sm text-amber-900",
          "dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
          "flex gap-3",
          className
        )}
      >
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
        <p className="leading-relaxed">{content}</p>
      </div>
    );
  }

  return (
    <p
      role="note"
      aria-label="Demo disclaimer"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300",
        className
      )}
    >
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
      <span>{content}</span>
    </p>
  );
}
