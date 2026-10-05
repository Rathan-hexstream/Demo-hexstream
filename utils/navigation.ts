export const CONTACT_URL = "https://forms.office.com/r/zg0U7ZmsdF";

export interface NavLink {
  name: string;
  href: string;
  description?: string;
  children?: { name: string; href: string }[];
}

export interface NavGroup {
  label: string;
  tagline: string;
  links: NavLink[];
}

export const products: NavGroup = {
  label: "Products",
  tagline: "Purpose-built software for utility operations",
  links: [
    {
      name: "Utility360",
      href: "/products/utility360",
      description: "AI-powered outage analytics with 40+ pre-built dashboards.",
    },
    {
      name: "HEXaid",
      href: "/products/hexaid",
      description: "Mutual aid and restoration operations, coordinated in one view.",
    },
    {
      name: "SPARC",
      href: "/products/sparc",
      description: "Validated outage communications from near real-time AMI data.",
    },
    {
      name: "HEXpert",
      href: "/products/hexpert",
      description: "Contextual AI knowledge management for your project teams.",
    },
    {
      name: "AuditAI",
      href: "/products/auditai",
      description: "AI-powered compliance and quality audits for communications.",
    },
  ],
};

export const oracle: NavGroup = {
  label: "Oracle",
  tagline: "Deep expertise across the Oracle utilities stack",
  links: [
    {
      name: "OUDI",
      href: "/capabilities/oudi",
      description: "Oracle Utilities Data Intelligence, co-developed with Oracle.",
    },
    {
      name: "Data Exchange",
      href: "/capabilities/data-exchange",
      description: "Unify, cleanse and enrich energy and water data on OCI.",
      children: [
        { name: "GoldenGate", href: "/capabilities/goldengate" },
        { name: "LEC", href: "/capabilities/lec" },
        { name: "OIC", href: "/capabilities/oic" },
        { name: "SOA", href: "/capabilities/soa" },
      ],
    },
    {
      name: "FDI",
      href: "/capabilities/fdi",
      description: "Fusion Data Intelligence for new operational insight.",
    },
    {
      name: "OCI",
      href: "/capabilities/oci",
      description: "A scalable, managed platform for high-velocity pipelines.",
    },
    {
      name: "OUA",
      href: "/capabilities/oua",
      description: "Oracle Utilities Analytics, fed with real-time data.",
    },
  ],
};

export const analytics: NavGroup = {
  label: "Analytics",
  tagline: "Accelerators that put operational data to work",
  links: [
    {
      name: "Outage Management Analytics",
      href: "/capabilities/outage-management-analytics",
      description: "Connect T&D datasets to broaden response and limit outage impact.",
    },
    {
      name: "Asset Management Analytics",
      href: "/capabilities/asset-management-analytics",
      description: "Insight across assets, inventory, work and risk-based planning.",
    },
    {
      name: "Preventative Asset Maintenance",
      href: "/capabilities/preventative-asset-maintenance",
      description: "Replace scheduled upkeep with pinpoint maintenance forecasts.",
    },
    {
      name: "Field Services Analytics",
      href: "/capabilities/field-services-analytics",
      description: "Data-driven efficiency for every field operation.",
    },
    {
      name: "AI Applications",
      href: "/capabilities/ai-applications",
      description: "Artificial intelligence built into the analytics you already use.",
    },
  ],
};

export const managedServices: NavGroup = {
  label: "Managed Services",
  tagline: "Ongoing support for the platforms you depend on",
  links: [
    {
      name: "DevOps",
      href: "/capabilities/devops",
      description: "Utility-focused development teams that extend your own.",
    },
    {
      name: "Operations Support",
      href: "/capabilities/operations-support",
      description: "Day-to-day care for Oracle and Microsoft data platforms.",
    },
  ],
};

export const about: NavGroup = {
  label: "About",
  tagline: "The people behind HEXstream",
  links: [
    { name: "About HEXstream", href: "/about", description: "Our story, approach and team." },
    { name: "Careers", href: "/careers", description: "Build the future of utility data with us." },
    {
      name: "Utilities Analytics User Group",
      href: "/uaug",
      description: "A community of utility analytics practitioners.",
    },
  ],
};

export const insightLinks: NavLink[] = [
  { name: "Success Stories", href: "/Insights?type=Success Stories" },
  { name: "Tech Corner", href: "/Insights?type=Tech Corner" },
  { name: "Blogs", href: "/Insights?type=HEXstream Blog" },
  {
    name: "Whitepapers & Special Reports",
    href: `/Insights?type=${encodeURIComponent("Whitepapers & Special Reports")}`,
  },
];

export type NavEntry =
  | { kind: "group"; group: NavGroup }
  | { kind: "link"; label: string; href: string };

export const mainNav: NavEntry[] = [
  { kind: "group", group: products },
  { kind: "group", group: oracle },
  { kind: "link", label: "Expertise", href: "/capabilities/Expertise" },
  { kind: "group", group: managedServices },
  { kind: "link", label: "Insights", href: "/Insights" },
  { kind: "group", group: about },
];

/** CMS links are stored as absolute hexstream.com URLs; keep them in-app. */
export const toInternalHref = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?hexstream\.com(?=\/|$)/i, "") || "/";

export const isExternal = (href: string) => /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
