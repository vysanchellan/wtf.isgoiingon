// ---------------------------------------------------------------------------
// All data in this file is FICTIONAL — for UI/UX demo only.
// No real users, payments, or orders. See README + page banners.
// ---------------------------------------------------------------------------

export type PackageId = "starter" | "connoisseur" | "master";

export type Package = {
  id: PackageId;
  name: string;
  priceMonthly: number;
  bagsPerMonth: number;
  tagline: string;
  description: string;
  perks: string[];
  badge?: string;
  highlight?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 15,
    bagsPerMonth: 1,
    tagline: "One bag a month, perfectly timed",
    description:
      "A single 250g bag of single-origin beans delivered fresh each month. Perfect for solo drinkers.",
    perks: [
      "1 × 250g single-origin bag / month",
      "Roast date guarantee (within 7 days)",
      "Pause or skip any month",
    ],
  },
  {
    id: "connoisseur",
    name: "Connoisseur",
    priceMonthly: 35,
    bagsPerMonth: 3,
    tagline: "Three bags, curated by our roasters",
    description:
      "Three 250g bags chosen by our head roaster — a curated mix of origins, processes, and roast levels.",
    perks: [
      "3 × 250g curated bags / month",
      "Tasting notes & brewing guide for each",
      "Early access to micro-lot releases",
      "Free shipping",
    ],
    badge: "Most popular",
    highlight: true,
  },
  {
    id: "master",
    name: "Master",
    priceMonthly: 75,
    bagsPerMonth: 5,
    tagline: "The full experience, plus gear",
    description:
      "Five bags a month, including rare micro-lots, plus a complimentary burr grinder when you sign up.",
    perks: [
      "5 × 250g bags / month (incl. micro-lots)",
      "Complimentary burr grinder on signup",
      "Quarterly tasting kit",
      "Priority shipping & support",
      "Invites to in-person cuppings",
    ],
  },
];

export function getPackage(id: PackageId): Package {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) throw new Error(`Unknown package: ${id}`);
  return pkg;
}

// ---------------------------------------------------------------------------
// Marketing content
// ---------------------------------------------------------------------------

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  bag: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amara O.",
    role: "Pour-over hobbyist",
    bag: "Ethiopia Yirgacheffe",
    quote:
      "The Yirgacheffe in my last box was the cleanest cup I've ever brewed at home. Roast dates are always within a week — I can taste it.",
  },
  {
    name: "Marcus L.",
    role: "Espresso enthusiast",
    bag: "Brazil Cerrado",
    quote:
      "I switched from a supermarket bag and never looked back. The Connoisseur tier gives me enough variety to keep mornings interesting.",
  },
  {
    name: "Priya R.",
    role: "Café owner",
    bag: "Colombia Huila",
    quote:
      "I use BrewClub bags as guest pours at the shop. Customers ask about them every week. Curation is genuinely thoughtful.",
  },
  {
    name: "Tomás G.",
    role: "Weekend brewer",
    bag: "Guatemala Antigua",
    quote:
      "Pausing a month while traveling took two clicks. That alone is worth it. The grinder that came with Master is a real piece of kit, not a freebie.",
  },
];

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Is BrewClub a real service?",
    a: "No. BrewClub is a fictional brand built as a UI/UX demonstration for an academic project. No coffee will ship, no payments are processed, no accounts persist beyond your browser.",
  },
  {
    q: "Will my card be charged if I 'top up' BrewCredits?",
    a: "No. The deposit form does not collect or transmit any real card data. Entering numbers updates a value in your browser's local storage only.",
  },
  {
    q: "Where does the coffee come from?",
    a: "Nowhere — the origins, roast dates, and tasting notes shown on the site are illustrative. No real supply chain exists behind this demo.",
  },
  {
    q: "Can I pause or cancel a subscription?",
    a: "On a real subscription service you'd manage this from your Account page. In this demo, you can also reset the entire mock state from your Account page to start over.",
  },
  {
    q: "How is my data handled?",
    a: "All state lives in your browser via localStorage. Nothing is sent to a server. Clearing your browser data wipes the demo state.",
  },
  {
    q: "Who built this?",
    a: "A student building a third-year UI/UX project. The fictional brand, characters, testimonials, and figures are all invented for the purpose of the exercise.",
  },
];

// ---------------------------------------------------------------------------
// Seed catalog (admin inventory)
// ---------------------------------------------------------------------------

export type InventoryItem = {
  sku: string;
  origin: string;
  process: string;
  roast: "Light" | "Medium" | "Medium-Dark" | "Dark";
  stockBags: number;
  roastedOn: string; // ISO
};

export const INVENTORY: InventoryItem[] = [
  {
    sku: "ETH-YIR-001",
    origin: "Ethiopia, Yirgacheffe",
    process: "Washed",
    roast: "Light",
    stockBags: 184,
    roastedOn: "2026-06-15",
  },
  {
    sku: "COL-HUI-014",
    origin: "Colombia, Huila",
    process: "Honey",
    roast: "Medium",
    stockBags: 312,
    roastedOn: "2026-06-17",
  },
  {
    sku: "BRA-CER-022",
    origin: "Brazil, Cerrado",
    process: "Natural",
    roast: "Medium-Dark",
    stockBags: 421,
    roastedOn: "2026-06-12",
  },
  {
    sku: "GUA-ANT-007",
    origin: "Guatemala, Antigua",
    process: "Washed",
    roast: "Medium",
    stockBags: 96,
    roastedOn: "2026-06-18",
  },
  {
    sku: "KEN-NYE-031",
    origin: "Kenya, Nyeri",
    process: "Washed",
    roast: "Light",
    stockBags: 58,
    roastedOn: "2026-06-19",
  },
  {
    sku: "IND-MON-009",
    origin: "Indonesia, Mandheling",
    process: "Wet-hulled",
    roast: "Dark",
    stockBags: 142,
    roastedOn: "2026-06-10",
  },
];

// ---------------------------------------------------------------------------
// Seed admin tables
// ---------------------------------------------------------------------------

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: "active" | "paused" | "cancelled";
  package: PackageId | null;
  lifetimeSpend: number;
};

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "U-1042",
    name: "Amara Okafor",
    email: "amara.o@example.com",
    joinedAt: "2025-09-12",
    status: "active",
    package: "connoisseur",
    lifetimeSpend: 315,
  },
  {
    id: "U-1043",
    name: "Marcus Lin",
    email: "marcus.l@example.com",
    joinedAt: "2025-10-04",
    status: "active",
    package: "master",
    lifetimeSpend: 675,
  },
  {
    id: "U-1044",
    name: "Priya Rao",
    email: "priya.r@example.com",
    joinedAt: "2025-11-21",
    status: "active",
    package: "connoisseur",
    lifetimeSpend: 245,
  },
  {
    id: "U-1045",
    name: "Tomás Garcia",
    email: "tomas.g@example.com",
    joinedAt: "2026-01-08",
    status: "paused",
    package: "starter",
    lifetimeSpend: 75,
  },
  {
    id: "U-1046",
    name: "Eleanor Brooks",
    email: "eleanor.b@example.com",
    joinedAt: "2026-02-19",
    status: "active",
    package: "starter",
    lifetimeSpend: 60,
  },
  {
    id: "U-1047",
    name: "Jin Park",
    email: "jin.p@example.com",
    joinedAt: "2026-03-02",
    status: "cancelled",
    package: null,
    lifetimeSpend: 45,
  },
  {
    id: "U-1048",
    name: "Sofia Almeida",
    email: "sofia.a@example.com",
    joinedAt: "2026-04-11",
    status: "active",
    package: "master",
    lifetimeSpend: 225,
  },
  {
    id: "U-1049",
    name: "David Chen",
    email: "david.c@example.com",
    joinedAt: "2026-05-23",
    status: "active",
    package: "connoisseur",
    lifetimeSpend: 105,
  },
];

export type AdminOrder = {
  id: string;
  user: string;
  package: PackageId;
  amount: number;
  status: "shipped" | "processing" | "delivered" | "refunded";
  placedAt: string;
};

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: "O-9821", user: "Amara Okafor", package: "connoisseur", amount: 35, status: "delivered", placedAt: "2026-06-01" },
  { id: "O-9822", user: "Marcus Lin", package: "master", amount: 75, status: "delivered", placedAt: "2026-06-02" },
  { id: "O-9823", user: "Sofia Almeida", package: "master", amount: 75, status: "shipped", placedAt: "2026-06-12" },
  { id: "O-9824", user: "Eleanor Brooks", package: "starter", amount: 15, status: "delivered", placedAt: "2026-06-14" },
  { id: "O-9825", user: "Priya Rao", package: "connoisseur", amount: 35, status: "delivered", placedAt: "2026-06-15" },
  { id: "O-9826", user: "David Chen", package: "connoisseur", amount: 35, status: "shipped", placedAt: "2026-06-18" },
  { id: "O-9827", user: "Amara Okafor", package: "connoisseur", amount: 35, status: "processing", placedAt: "2026-06-20" },
  { id: "O-9828", user: "Marcus Lin", package: "master", amount: 75, status: "processing", placedAt: "2026-06-21" },
  { id: "O-9819", user: "Tomás Garcia", package: "starter", amount: 15, status: "refunded", placedAt: "2026-05-30" },
];

// 6-month revenue series for the admin chart
export const REVENUE_SERIES: { month: string; revenue: number; orders: number }[] = [
  { month: "Jan", revenue: 3120, orders: 88 },
  { month: "Feb", revenue: 3580, orders: 102 },
  { month: "Mar", revenue: 4210, orders: 119 },
  { month: "Apr", revenue: 4870, orders: 134 },
  { month: "May", revenue: 5440, orders: 151 },
  { month: "Jun", revenue: 6120, orders: 168 },
];
