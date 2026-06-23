import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = [
  "3× illustrative return",
  "3 weekly payouts",
  "Fictional figures",
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Emerald/teal palette tuned to the site's CSS variables (globals.css).
const WAVE_PALETTE: WaveConfig[] = [
  { offset: 0, amplitude: 70, frequency: 0.003, color: "rgba(20, 199, 123, 0.85)", opacity: 0.42 },
  { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: "rgba(79, 227, 168, 0.7)", opacity: 0.34 },
  { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: "rgba(45, 212, 191, 0.65)", opacity: 0.3 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: "rgba(12, 158, 99, 0.55)", opacity: 0.26 },
  { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: "rgba(210, 240, 230, 0.22)", opacity: 0.18 },
];

const BG_TOP = "#060B14";
const BG_BOTTOM = "#0A1120";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => recenterMouse();

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, BG_TOP);
      gradient.addColorStop(1, BG_BOTTOM);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      WAVE_PALETTE.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
      role="region"
      aria-label="AmzVest ZA demo hero section"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--gold)]/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[var(--amber)]/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-[var(--gold-dark)]/[0.05] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="gradient-border mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--bg-glass)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)] backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Verified Amazon Reselling Operation
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl lg:text-7xl"
          >
            Put your money to work.{" "}
            <span className="gradient-text">Triple your investment</span> in 3
            weeks.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-3xl text-lg text-[var(--text-secondary)] md:text-xl"
          >
            We buy and sell products on Amazon using investor capital. Every rand
            invested generates proven returns — paid back to you in three weekly
            instalments.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] no-underline"
            >
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Start investing
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#how"
              className="btn-outline inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium no-underline backdrop-blur"
            >
              How it works
            </a>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]"
          >
            {highlightPills.map((pill) => (
              <li
                key={pill}
                className="gradient-border rounded-full bg-[var(--bg-glass)] px-4 py-2 backdrop-blur"
              >
                {pill}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 w-[calc(100%-32px)] max-w-[640px] -translate-x-1/2 rounded-[var(--radius)] border border-[var(--gold)]/20 bg-[var(--gold)]/10 px-4 py-2.5 text-center text-xs font-semibold text-[var(--amber)] backdrop-blur">
        ⚠️ This is a FAKE demo site. No real money is involved. All figures are fictional and for educational purposes only.
      </div>
    </section>
  );
}
