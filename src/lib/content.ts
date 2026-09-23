export const studio = {
  name: "Asmara Web Design",
  short: "Asmara",
  place: "Metro Atlanta, GA",
  linkedin: "https://www.linkedin.com/in/henok-t/",
  github: "https://github.com/Henok-T",
  tagline: "We build websites, and we fix what breaks in them.",
};

export const services = [
  {
    id: "website",
    title: "Websites for small businesses",
    summary:
      "You need a site that explains what you do and makes it easy to call, book, or order. We design and build it by hand, so it loads fast and stays easy to change.",
    points: ["Single-page and multi-page sites", "Menus, booking, contact forms", "Mobile-first layouts"],
    icon: "globe",
  },
  {
    id: "maintenance",
    title: "Website maintenance and fixes",
    summary:
      "Your site mostly works, but a form fails, a page breaks on phones, or content is out of date. We find the cause, fix it, and tell you what changed.",
    points: ["Bug and layout fixes", "Content and menu updates", "WordPress edits"],
    icon: "wrench",
  },
  {
    id: "support",
    title: "Technical support and troubleshooting",
    summary:
      "Something in your software is failing and nobody can say why. We reproduce it, isolate the cause, and write down the fix so the next person can handle it faster.",
    points: ["Issue reproduction and root cause", "Debugging and testing", "Clear written handoffs"],
    icon: "life-buoy",
  },
  {
    id: "pwa",
    title: "Installable web apps",
    summary:
      "You want something people can add to their home screen and use like an app, without app-store overhead. We build progressive web apps in plain JavaScript.",
    points: ["Service workers and install prompts", "Local data storage", "Audio and media features"],
    icon: "smartphone",
  },
  {
    id: "optimization",
    title: "Speed, accessibility and SEO cleanup",
    summary:
      "Your pages are slow, hard to use with a keyboard, or invisible in search. We tidy the markup, structure, and assets so people and search engines can read them.",
    points: ["Semantic HTML and headings", "Image and font loading", "Metadata and structured data"],
    icon: "gauge",
  },
] as const;

export const serviceOptions = [
  ...services.map((service) => ({ id: service.id, label: labelFor(service.id) })),
  { id: "other", label: "Something else" },
] as const;

function labelFor(id: (typeof services)[number]["id"]) {
  switch (id) {
    case "website":
      return "A new website";
    case "maintenance":
      return "Fixes or updates to an existing site";
    case "support":
      return "Technical support or troubleshooting";
    case "pwa":
      return "An installable web app";
    case "optimization":
      return "Speed, accessibility, or SEO cleanup";
  }
}

export function serviceLabel(id: string) {
  return serviceOptions.find((option) => option.id === id)?.label ?? id;
}

export const fixes = [
  {
    problem: "A booking form looked fine but never sent anything",
    fix: "Traced the silent failure and connected a working email service.",
  },
  {
    problem: "Refreshing any article page returned a 404",
    fix: "Fixed client-side routing and article paths on a single-page blog.",
  },
  {
    problem: "A team's workflow kept hitting the same blocker",
    fix: "Built a small internal app to take it off their plate.",
  },
];

export const steps = [
  {
    title: "Talk it through",
    body: "You describe the problem or the goal. We reply with questions before proposing anything.",
  },
  {
    title: "Agree on scope",
    body: "A short written plan: what gets built or fixed, what doesn't, and when.",
  },
  {
    title: "Build and review",
    body: "You see working pages early and often, tested on real phones and browsers.",
  },
  {
    title: "Launch and support",
    body: "We publish it, hand over notes on how it works, and stay available for fixes.",
  },
];

export const plans = [
  {
    id: "terrace",
    name: "Dante Plan",
    cadence: "Monthly subscription",
    price: "$49",
    unit: "/ month",
    note: "6-month minimum, then month to month.",
    blurb: "One sharp page that tells people who you are and how to reach you.",
    features: [
      "One-page website with a working contact form",
      "Hosting and SSL included",
      "Small content updates, up to 30 minutes a month",
      "Replies within one business day",
      "Domain billed yearly at cost",
    ],
    recommended: false,
    lead:
      "A single, well-structured page for businesses that need to be findable and reachable now: who you are, what you offer, where you work, and a contact form that delivers.",
    care: "We write the copy with you, build it, and host it. Small changes such as new hours, a new photo or updated services are covered each month.",
    terms:
      "$49 per month, 6-month minimum, then month to month. Domain billed yearly at cost. Cancel after the minimum and the site comes down at the end of that billing month. Ask about a buyout if you want to keep it.",
  },
  {
    id: "skyline",
    name: "Impero Plan",
    cadence: "Monthly subscription",
    price: "$149",
    unit: "/ month",
    note: "12-month minimum, then month to month.",
    blurb: "A complete website for one predictable monthly price.",
    features: [
      "Up to 5 pages, written and built for you",
      "Hosting and SSL included",
      "Content updates, up to 2 hours a month",
      "Monthly check for broken links, errors and accessibility issues",
      "Replies within one business day",
      "Domain billed yearly at cost",
    ],
    recommended: true,
    lead:
      "A full website of up to five pages, typically Home, Services, About, Gallery or Work, and Contact, planned around how your customers actually decide to call you.",
    care: "We handle the writing, design, build, hosting and ongoing care. Each month we check for broken links, errors and accessibility problems, and fix what we find.",
    terms:
      "$149 per month, 12-month minimum, then month to month. Domain billed yearly at cost. Up to 2 hours of content updates each month. Cancel after the minimum and the site comes down at the end of that billing month. Ask about a buyout if you want to keep it.",
  },
  {
    id: "landmark",
    name: "Roma Plan",
    cadence: "One-time build",
    price: "$1,499",
    unit: "+ hosting",
    note: "Half to start, half at launch.",
    blurb: "Build it once and own it outright.",
    features: [
      "Up to 5 pages, written and built for you",
      "You own the code and the content",
      "30 days of free fixes after launch",
      "Hosting $20 / month",
      "Domain billed yearly at cost",
    ],
    recommended: false,
    lead: "The same five-page website, paid for once. It belongs to you: the code, the content and the domain.",
    care: "Hosting is a separate $20 per month so the site stays fast, secure and online. After launch, you get 30 days of free fixes; later changes are quoted up front.",
    terms:
      "$1,499 one-time. Half is due to start, half when the site is ready to launch. Hosting $20 per month from launch. Domain billed yearly at cost.",
  },
] as const;

export type Plan = (typeof plans)[number];

export const included = [
  "Mobile-first design",
  "Fast loading",
  "Built to WCAG 2.2 AA",
  "On-page SEO basics",
];

export const projects = [
  {
    slug: "jonah-mobile-labs",
    name: "Jonah Mobile Labs",
    url: "https://jonahmobilelabs.com/",
    host: "jonahmobilelabs.com",
    place: "Snellville, GA",
    kind: "Client website",
    region: "Healthcare",
    image: "/work/jonah.webp",
    summary:
      "A full redesign for a mobile lab that brings specimen collection and rapid testing to homes, workplaces, schools and events across Gwinnett County and Metro Atlanta.",
    points: [
      "Service picker: tap a service to see what's involved, then request it in one step",
      "A dedicated section for employers needing on-site drug testing and screening",
      "City and ZIP checker so visitors can confirm the service area",
      "Call and “Request a visit” actions pinned on mobile",
    ],
    role: "Full redesign and build",
    cta: "Visit Jonah Mobile Labs",
  },
  {
    slug: "7-days",
    name: "7 Days Facility Service",
    url: "https://7daysfacilityservice.com/",
    host: "7daysfacilityservice.com",
    place: "Charlotte, NC",
    kind: "Client website",
    region: "Facility services",
    image: "/work/7days.webp",
    summary:
      "A single-page site for a hood cleaning, pressure washing and commercial cleaning company, built from their printed flyer into five clear services, each with its own quote request.",
    points: [],
    role: "Design and build",
    cta: "Visit the site",
  },
  {
    slug: "chibo",
    name: "Chibo Ethiopian Coffee & Kitchen",
    url: "https://chibocafe.netlify.app/",
    host: "chibocafe.netlify.app",
    place: "Concept site",
    kind: "Design concept",
    region: "Cafe",
    image: "/work/chibo.webp",
    summary:
      "A warm, story-led site for a neighborhood café, with a tabbed menu, a section on the traditional jebena coffee ceremony, and a wall of customer reviews.",
    points: [],
    role: "Design and build",
    cta: "Visit the site",
  },
  {
    slug: "kostina",
    name: "Kostina Photography",
    url: "https://kostinaphoto.netlify.app/",
    host: "kostinaphoto.netlify.app",
    place: "Concept site",
    kind: "Design concept",
    region: "Photography",
    image: "/work/kostina.webp",
    summary:
      "A design concept for a wedding and event photographer: a dark editorial look, a gallery filtered by event type, and an inquiry form that asks for the date and venue up front.",
    points: [],
    role: "Design concept",
    cta: "View the concept",
  },
  {
    slug: "vitablendz",
    name: "Vitablendz",
    url: "https://vitablendz.netlify.app/",
    host: "vitablendz.netlify.app",
    place: "Concept site",
    kind: "Design concept",
    region: "Food and beverage",
    summary:
      "A bright, fresh site for a frozen yogurt and smoothie bar in central Stavanger, with opening hours, location and starting prices right on the first screen.",
    points: [],
    role: "Design and build",
    cta: "Visit the site",
  },
  {
    slug: "hdmona",
    name: "Hdmona Restaurant",
    url: "https://hdmona.netlify.app/",
    host: "hdmona.netlify.app",
    place: "Concept site",
    kind: "Design concept",
    region: "Restaurant",
    summary:
      "A Norwegian-language site for an Eritrean and Ethiopian restaurant, built around a menu organized by category so guests can choose before they arrive.",
    points: [],
    role: "Design and build",
    cta: "Visit the site",
  },
] as const;

export type Project = (typeof projects)[number];

export const regions = ["All", "Healthcare", "Facility services", "Cafe", "Photography", "Food and beverage", "Restaurant"] as const;
