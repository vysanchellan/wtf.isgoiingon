export type PackageId = "starter" | "growth" | "premium";

export type InvestmentPackage = {
  id: PackageId;
  name: string;
  invest: number;
  returnAmount: number;
  weeklyPayout: number;
  weeks: number;
  tagline: string;
  description: string;
  highlight?: boolean;
  badge?: string;
};

export const PACKAGES: InvestmentPackage[] = [
  {
    id: "starter",
    name: "Starter",
    invest: 500,
    returnAmount: 1500,
    weeklyPayout: 500,
    weeks: 3,
    tagline: "Invest R500, receive R1,500",
    description: "A R500 investment that returns R1,500 over 3 equal weekly payouts.",
  },
  {
    id: "growth",
    name: "Growth",
    invest: 1000,
    returnAmount: 3000,
    weeklyPayout: 1000,
    weeks: 3,
    tagline: "Invest R1,000, receive R3,000",
    description: "A R1,000 investment that returns R3,000 over 3 equal weekly payouts.",
    highlight: true,
    badge: "Popular",
  },
  {
    id: "premium",
    name: "Premium",
    invest: 2500,
    returnAmount: 7500,
    weeklyPayout: 2500,
    weeks: 3,
    tagline: "Invest R2,500, receive R7,500",
    description: "A R2,500 investment that returns R7,500 over 3 equal weekly payouts.",
  },
];

export function getPackage(id: PackageId): InvestmentPackage {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) throw new Error(`Unknown package: ${id}`);
  return pkg;
}

export type Testimonial = {
  name: string;
  quote: string;
  amount: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thabo M.",
    quote: "I was skeptical at first, but the weekly payouts are exactly what they promised. Received my full R3,000 on time.",
    amount: "R3,000 earned",
  },
  {
    name: "Nomsa D.",
    quote: "Started with the Starter package to test the waters. After seeing the first payout hit my account, I upgraded to Premium.",
    amount: "R7,500 earned",
  },
  {
    name: "Ayanda K.",
    quote: "The reinvest feature is brilliant. I rolled my returns into a bigger package and doubled my earnings in the next cycle.",
    amount: "R9,000 earned",
  },
  {
    name: "Lerato S.",
    quote: "Three weeks, three payouts, no issues. The Amazon reselling model makes total sense once you see the numbers.",
    amount: "R1,500 earned",
  },
];

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Is AmzVest ZA a real platform?",
    a: "No. This is a fictional demo project created for educational purposes only. No real investments are accepted, no real returns are paid, and no real Amazon reselling operation exists behind this site.",
  },
  {
    q: "Can I deposit real money?",
    a: "Absolutely not. No deposit functionality exists. This is a demonstration only. Any 'investment' or 'payment' flows shown are UI simulations that do not process real transactions.",
  },
  {
    q: "Are the returns real?",
    a: "No. All return figures are completely fabricated. The 3× return, weekly payout amounts, and any financial projections shown on this site are fictional and for illustrative purposes only.",
  },
  {
    q: "Is my data safe?",
    a: "No data is collected, stored, or transmitted. This is a static demo site. Any information entered into forms remains in your browser and is never sent to any server.",
  },
  {
    q: "Can I reinvest my returns?",
    a: "In this demo simulation, the 'Reinvest' button navigates to the registration page. No actual reinvestment occurs — it is a UI flow designed to demonstrate the concept.",
  },
];

export type Investor = {
  id: string;
  name: string;
  package: PackageId;
  invested: number;
  returnAmount: number;
  status: "active" | "complete" | "pending";
};

export const INVESTORS: Investor[] = [
  { id: "I-1001", name: "Sipho Nkosi", package: "growth", invested: 1000, returnAmount: 3000, status: "active" },
  { id: "I-1002", name: "Nomsa Dlamini", package: "premium", invested: 2500, returnAmount: 7500, status: "active" },
  { id: "I-1003", name: "Thabo Mokoena", package: "starter", invested: 500, returnAmount: 1500, status: "complete" },
  { id: "I-1004", name: "Ayanda Khumalo", package: "growth", invested: 1000, returnAmount: 3000, status: "active" },
  { id: "I-1005", name: "Priya Naidoo", package: "premium", invested: 2500, returnAmount: 7500, status: "pending" },
  { id: "I-1006", name: "Lerato Sithole", package: "starter", invested: 500, returnAmount: 1500, status: "active" },
  { id: "I-1007", name: "David Chen", package: "growth", invested: 1000, returnAmount: 3000, status: "complete" },
  { id: "I-1008", name: "Sofia Almeida", package: "premium", invested: 2500, returnAmount: 7500, status: "active" },
];

export type Payout = {
  investor: string;
  package: PackageId;
  amount: number;
  week: number;
  dueDate: string;
  paid: boolean;
};

export const PAYOUTS: Payout[] = [
  { investor: "Sipho Nkosi", package: "growth", amount: 1000, week: 2, dueDate: "16 Jun", paid: false },
  { investor: "Nomsa Dlamini", package: "premium", amount: 2500, week: 2, dueDate: "16 Jun", paid: false },
  { investor: "Ayanda Khumalo", package: "growth", amount: 1000, week: 1, dueDate: "18 Jun", paid: false },
  { investor: "Lerato Sithole", package: "starter", amount: 500, week: 3, dueDate: "20 Jun", paid: false },
];

export const ALL_PACKAGE_IDS: PackageId[] = PACKAGES.map((p) => p.id);
