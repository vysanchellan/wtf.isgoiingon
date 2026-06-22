import { useMemo } from "react";
import { REVENUE_SERIES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const W = 720;
const H = 240;
const PAD = { top: 20, right: 16, bottom: 28, left: 48 };

export function RevenueChart() {
  const { points, ticks, max } = useMemo(() => {
    const max = Math.ceil(Math.max(...REVENUE_SERIES.map((d) => d.revenue)) / 1000) * 1000;
    const stepX = (W - PAD.left - PAD.right) / (REVENUE_SERIES.length - 1);
    const points = REVENUE_SERIES.map((d, i) => ({
      x: PAD.left + i * stepX,
      y: PAD.top + (1 - d.revenue / max) * (H - PAD.top - PAD.bottom),
      label: d.month,
      revenue: d.revenue,
      orders: d.orders,
    }));
    const ticks = Array.from({ length: 5 }, (_, i) => {
      const v = (max / 4) * i;
      return {
        v,
        y: PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom),
      };
    });
    return { points, ticks, max };
  }, []);

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const areaPath =
    `M ${points[0].x} ${H - PAD.bottom} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x} ${H - PAD.bottom} Z`;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold">Revenue, last 6 months</h3>
          <p className="text-xs text-[color:var(--foreground)]/60">
            All figures fictional · max scale {formatCurrency(max)}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[color:var(--foreground)]/65">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand)]" />
            Revenue
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-60 w-full min-w-[640px]"
          role="img"
          aria-label="Revenue chart for the last six months"
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y grid */}
          {ticks.map((t) => (
            <g key={t.v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={t.y}
                y2={t.y}
                stroke="currentColor"
                opacity="0.08"
              />
              <text
                x={PAD.left - 8}
                y={t.y + 4}
                textAnchor="end"
                className="fill-current text-[10px] opacity-60"
              >
                {`$${(t.v / 1000).toFixed(t.v >= 1000 ? 0 : 1)}k`}
              </text>
            </g>
          ))}

          {/* Area + line */}
          <g className="text-[color:var(--brand)]">
            <path d={areaPath} fill="url(#revGrad)" />
            <path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Points + month labels */}
          {points.map((p) => (
            <g key={p.label}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--surface)"
                stroke="var(--brand)"
                strokeWidth="2"
              >
                <title>{`${p.label}: ${formatCurrency(p.revenue)} · ${p.orders} orders`}</title>
              </circle>
              <text
                x={p.x}
                y={H - 8}
                textAnchor="middle"
                className="fill-current text-[10px] opacity-65"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
