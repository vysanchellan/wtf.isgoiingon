export type PackageId = "starter" | "growth" | "premium";

export type InvestmentPackage = {
  id: PackageId;
  name: string;
  invest: number;
  returnAmount: number;
  weeks: number; // term — full return paid as one lump sum at the end
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
    returnAmount: 1000,
    weeks: 3,
    tagline: "Invest R500, receive R1,000",
    description: "A R500 investment that returns R1,000 as a single payout after 3 weeks.",
  },
  {
    id: "growth",
    name: "Growth",
    invest: 1000,
    returnAmount: 2000,
    weeks: 3,
    tagline: "Invest R1,000, receive R2,000",
    description: "A R1,000 investment that returns R2,000 as a single payout after 3 weeks.",
    highlight: true,
    badge: "Popular",
  },
  {
    id: "premium",
    name: "Premium",
    invest: 2500,
    returnAmount: 5000,
    weeks: 3,
    tagline: "Invest R2,500, receive R5,000",
    description: "A R2,500 investment that returns R5,000 as a single payout after 3 weeks.",
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
    quote: "I was skeptical at first, but the full payout landed exactly three weeks later, just as promised. R2,000 back on my R1,000.",
    amount: "R2,000 returned",
  },
  {
    name: "Nomsa D.",
    quote: "Started with the Starter package to test the waters. After my first payout cleared, I went straight to Premium.",
    amount: "R5,000 returned",
  },
  {
    name: "Ayanda K.",
    quote: "The reinvest flow is brilliant. I rolled my return into a bigger package the next cycle and kept it compounding.",
    amount: "R5,000 returned",
  },
  {
    name: "Lerato S.",
    quote: "Three weeks, one clean payout, no issues. The Amazon reselling model makes total sense once you see the numbers.",
    amount: "R1,000 returned",
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
    q: "How do the returns work?",
    a: "In this fictional model, a package matures after 3 weeks and the full return is paid in a single lump sum — not in weekly instalments. All return figures, including the 2× return shown here, are completely fabricated and for illustrative purposes only.",
  },
  {
    q: "Is my data safe?",
    a: "No data is collected, stored, or transmitted. This is a static demo site. Any information entered into forms remains in your browser and is never sent to any server.",
  },
  {
    q: "Can I reinvest my returns?",
    a: "In this demo simulation, the 'Reinvest' button simply takes you back to the packages. No actual reinvestment occurs — it is a UI flow designed to demonstrate the concept.",
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
  { id: "I-1001", name: "Sipho Nkosi", package: "growth", invested: 1000, returnAmount: 2000, status: "active" },
  { id: "I-1002", name: "Nomsa Dlamini", package: "premium", invested: 2500, returnAmount: 5000, status: "active" },
  { id: "I-1003", name: "Thabo Mokoena", package: "starter", invested: 500, returnAmount: 1000, status: "complete" },
  { id: "I-1004", name: "Ayanda Khumalo", package: "growth", invested: 1000, returnAmount: 2000, status: "active" },
  { id: "I-1005", name: "Priya Naidoo", package: "premium", invested: 2500, returnAmount: 5000, status: "pending" },
  { id: "I-1006", name: "Lerato Sithole", package: "starter", invested: 500, returnAmount: 1000, status: "active" },
  { id: "I-1007", name: "David Chen", package: "growth", invested: 1000, returnAmount: 2000, status: "complete" },
  { id: "I-1008", name: "Sofia Almeida", package: "premium", invested: 2500, returnAmount: 5000, status: "active" },
];

export type Payout = {
  investor: string;
  package: PackageId;
  amount: number; // full maturity return
  dueDate: string;
  paid: boolean;
};

export const PAYOUTS: Payout[] = [
  { investor: "Sipho Nkosi", package: "growth", amount: 2000, dueDate: "23 Jun", paid: false },
  { investor: "Nomsa Dlamini", package: "premium", amount: 5000, dueDate: "23 Jun", paid: false },
  { investor: "Ayanda Khumalo", package: "growth", amount: 2000, dueDate: "25 Jun", paid: false },
  { investor: "Lerato Sithole", package: "starter", amount: 1000, dueDate: "27 Jun", paid: false },
];

export const ALL_PACKAGE_IDS: PackageId[] = PACKAGES.map((p) => p.id);
