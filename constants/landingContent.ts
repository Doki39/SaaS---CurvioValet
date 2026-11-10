export const BRAND = "CurvioValet";
export const TAGLINE = "Hotel operation software";
export const REQUEST_DEMO_CTA = "Request a free demo";

export const FOOTER_PLATFORM_HIGHLIGHTS = [
  "Valet mobile app",
  "AI photo check-in",
  "Digital vehicle library",
  "Key photo evidence",
  "PMS integration",
] as const;

export const FOOTER_APP_STORE = {
  appStoreUrl: "",
  playStoreUrl: "",
} as const;

export type FooterNavAction = "capabilities" | "pricing" | "faq" | "demo";

export type FooterNavLink =
  | { label: string; action: FooterNavAction }
  | { label: string; href: string };

export const FOOTER_NAV_COLUMNS: {
  title: string;
  links?: FooterNavLink[];
  highlights?: readonly string[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Platform capabilities", action: "capabilities" },
      { label: "Pricing", action: "pricing" },
      { label: "FAQ", action: "faq" },
    ],
  },
  {
    title: "Platform",
    highlights: FOOTER_PLATFORM_HIGHLIGHTS,
  },
  {
    title: "Company",
    links: [{ label: "Request a free demo", action: "demo" }],
  },
];

export const HERO = {
  eyebrow: "Smart valet system for your modern hotel",
  title: "The smarter way to run hotel valet operations",
  subtitle:
    "AI-powered vehicle check-in, digital vehicle and key records and team coordination. Makes it all in one platform built for premium hospitality.",
};

export const PROBLEMS = [
  {
    icon: "warning" as const,
    title: "Analog Chaos",
    body: "Paper logs and manual key tags lead to delays, lost keys, and guest frustration during peak hours.",
  },
  {
    icon: "format-paint" as const,
    title: "Curb Appeal",
    body:
      "Chalk numbers, painted slots, and traffic cones on the arrival drive clash with a five-star setting and guests notice before they reach the door.",
  },
  {
    icon: "photo-camera" as const,
    title: "Liability Blindspots",
    body:
      "Without time-stamped photos when your team takes custody of the vehicle, you have little proof of condition at intake leaving the property exposed to disputes over damage that may have occurred before parking.",
  },
];

export const PROBLEMS_VIDEO = {
  enabled: false,
  src: "/videos/beyond-manual-log.mp4",
  poster: "/images/problems-video-poster.jpg",
  ariaLabel: "Why hotels move beyond paper valet logs",
  disclaimer:
    "Video captured from the CurvioValet app, demonstrating real-time efficiency and check-in speed.",
};

export const PROBLEMS_VIDEO_DRAFT = {
  workingTitle: "Beyond the manual log",
  length: "1:45–2:05",
  format: "16:9, muted optional, captions recommended",
  fileDrop:
    "Save your export as public/videos/beyond-manual-log.mp4, then set PROBLEMS_VIDEO.enabled to true.",
  scenes: [
    {
      time: "0:00–0:10",
      title: "Hook",
      script:
        "Friday peak. Cars stack at the entrance. A key is missing. Guests wait under the portico while your team flips through a paper log.",
      shot: "Wide arrival, cut to valet desk: clipboard, key tags, queue at door.",
    },
    {
      time: "0:10–0:36",
      title: "Analog Chaos",
      script:
        "Every handoff means handwriting, cross-checking tags, and walking the board. Paper doesn’t scale when fifty keys are in play—one gap and the whole lane stalls.",
      shot: "Handwriting on log, hook board search, team radio; hold on waiting guests.",
    },
    {
      time: "0:36–1:02",
      title: "Visual Pollution",
      script:
        "Chalk numbers, painted slots, and traffic cones read as temporary fixes—not luxury. They clash with marble, lighting, and landscaping guests paid for.",
      shot: "Pristine facade vs chalk / cones; slow pan along drive.",
    },
    {
      time: "1:02–1:24",
      title: "Liability Blindspots",
      script:
        "Without time-stamped photos at intake, damage disputes come down to recall. That’s exposure for the hotel, the valet partner, and the guest relationship.",
      shot: "Unmarked scratch close-up; contrast phone capture with timestamp overlay.",
    },
    {
      time: "1:24–1:44",
      title: "Close",
      script:
        "Move beyond the manual log. CurvioValet puts AI check-in, digital keys, and condition photos in one flow—clean curb appeal, accountable operations.",
      shot: "Product montage or app UI; end card: logo, Request a demo, curviovalet.com.",
    },
  ],
};

export const STEPS = [
  {
    n: "1",
    title: "Snap",
    body:
      "Staff capture the vehicle and key. AI extracts the details on the spot, so every intake is fully documented from the first handoff.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCE7SrrF4Zrbzgy7s7kWJpPslaETdrS80Ja8G9okIxV5zha1CvhfZIHt0PDYSBZsegIYF0MAWziOz2qJZ-ovKFx_nze7Lc1MMut4-ayxc8uulgCySyxHfYW0IZOZ5qfrucoqVeDHRnPw-RJkb-bPKW3pRvQJyPQ2ngLPBvcEnk3BsGH4PBTeNlnr1ogY1ADEWUYawtlhG-mqcMBubRsVrTC_evaHQ8NnmG8AEJs0beoXe-Ew7yJviWSx-3NVvG4rgEzo036fgMfTc0",
  },
  {
    n: "2",
    title: "Verify",
    body: "Link the vehicle to the guest profile and key locker position without any extra steps.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0xF9DMvqU3AGGaQpM5tvpg4Rj8GXdJcDVKTRnxHySdAmAMIkQb3PzWo3jj7w57i_Hz0GMTrZfmElZOLdFsN38nP4s9ahEgmBy8mIf6H6inBtkEofQJ6EcPaNvl8dfOJ2K3tfcbU-6240gqA94CS2Ox9JEScp8O4taIuQaCrIv0PQrQs8pk8xA7SDWO07CsQX6yQoDUz6NPOEISB8NYN7ZLi9s9eD3MVEFI3zReNCEdCn8-J7y_9869mFtw6gQmwMTGSc543JmtTI",
  },
  {
    n: "3",
    title: "Secure",
    body: "Vehicle is safely parked with a timestamped digital record. Real-time location tracking for the team.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFVa6u1mA9RTtc72Hr0-J-Wq7KYNSak8F9iCZJFMc3twZEU4zaMbaW0Wu3MpR2qoQkcRWXIKU8mwPYXdLuLojGIgAi758KvdXiaio4w6KLbpmGE8pWw8Fy7PzqNoa2BcOCwwOIliZmq1vBRkWa8Ff5ZuUqxdoBxLaTzE9eUCm_CIGWGtDTlZIBpltLXwhmn-t29YUoCoLw2h2CRJsbajlUhLrXUJxme64L1ozB3ul5m5-K8C49TGYf3qnlrCiFnUDSWcQXIhp_fdQ",
  },
];

export const SURROUNDINGS_QUOTE = {
  title: "Respect the Surroundings",
  body:
    "Built from years of firsthand experience in the hotel industry, CurvioValet was designed around the people who make every guest experience count. From the moment a vehicle arrives, one photo captures the details your team needs. Vehicle information, key management and parking location all organized in one place.",
  emphasis: "Less searching. Fewer delays. More time for what matters: your guests.",
};

export const FEATURES = [
  {
    icon: "photo-camera" as const,
    title: "Quick Check-In (AI Photo Intake)",
    body: "Instant license plate and condition recognition via mobile lens.",
  },
  {
    icon: "inventory" as const,
    title: "Digital Vehicle Library",
    body: "A searchable, real-time database of all cars currently on the property.",
  },
  {
    icon: "visibility-off" as const,
    title: "Car Location Without Markings",
    body:
      "Your team always knows where each vehicle is and can move it with ease whenever the lot needs to shift.",
  },
  {
    icon: "vpn-key" as const,
    title: "Key Photo Evidence",
    body: "Visual confirmation of key placement in secure lockers for accountability.",
  },
  {
    icon: "assignment" as const,
    title: "Task Board for Teams",
    body: "Coordinate retrievals and arrivals between valets and the front desk.",
  },
  {
    icon: "history" as const,
    title: "Check-In History",
    body: "Detailed logs for every guest visit, vehicle, and handling staff.",
  },
  {
    icon: "apartment" as const,
    title: "Organisation Management",
    body: "Scale operations with unified branding and user permissions.",
  },
  {
    icon: "domain" as const,
    title: "Multi-Property Control",
    body: "Switch between hotel locations within one master dashboard.",
  },
];

export const AUDIENCES = [
  {
    title: "Valet Staff",
    body: "Eliminate the stress of lost keys and messy manual logs. Simple, fast mobile interface.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCndIIoaSxD_W4R6Fya6q-GXD5CsWaRxjd3Yo1dGCy9eAmlpMEXiuDPLovniabEuu1nmOYDdo9uVuZk5oYnMZXINuIZKBjzeST3vxLBJoploH1SNzEzX69IYdVoAGXlChdYCzBYT22-11s9y6Urx5yfzGx55SbIC3aqarRh9WNTJhVb9LdacmNvBRaW9qupH-bK2oPLql5QYW2DISREcalTr1MZptCYAqmyQrPYK5l9_T41TqP_VWqQWCedymHrcGmnAcRRJv0IjdM",
  },
  {
    title: "Hotel Managers",
    body: "Gain data-driven insights into peak times, staff performance, and liability protection.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9evvi8qO0Smy8DumdmylnwBABlMrmgnBGiFD4KcXBKKxfedDJ4VGO3-P84Kc1W4NZGnJ5UncJuZeguOh07BZZgwzNnzF7QuIXLayEGulS_vU5f6nfkn1A7U_78UXRrrcN_hHA4Q11FEmcDKWyKA6nwzqCPQk3829RY8o6cjocRIXz4jzDcGckyVD6PwfrE-J44gV9Pxz4U1MM1OBCEXu__FDiVIoZWE9OdWmHvq-AySuLdOZGUjHCnMrH0kbiQ68DK4y_yOBSpKo",
  },
  {
    title: "Front Desk",
    body: "Instantly see vehicle status and coordinate guest departures with ease.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJdq12n0VVtvsLWk9XlcK9cAzFe53J6Lh0ozfRjEErWZf0mfyCB2geT7nrU3sLc5H0aPuAv7PBLx_nN1YtTM7ZWq6SwdGkTULm9CU5fu2ZmV28n41VWFcQMNSWUTq3SVZDA8A9KO9ul6cUkbl5sAxU__LsTsLYRamWXVzBmnb5pBw7nWXG2F0D09eVoEPtu1lYv2_lHBBovhLbILHn5bTL0z7ha-ISOtotKyxhHp3PGqi61_bPK2m1j5f-04yL8yVULuBBqcXzbR4",
  },
];

export const WHY_POINTS = [
  "90% reduction in check-in time",
  "Digital-first valet workflows reduce paper use and align with your property's sustainability standards",
  "100% digital key accountability",
  "Timestamped vehicle photos at check-in strengthen documentation and reduce exposure to disputed damage claims",
  "Easily integrates with Oracle OPERA and any PMS",
];

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "\u20ac79",
    period: "/month",
    features: ["AI Photo Check-in", "300 Cars / Month", "Key Photo Library"],
    cta: "Get Started",
    popular: false,
    dark: true,
  },
  {
    id: "pro",
    name: "Professional",
    price: "\u20ac199",
    period: "/month",
    features: [
      "Everything in Starter",
      "Unlimited Vehicles",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Select Plan",
    popular: true,
    dark: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Multi-Property Dashboard", "Oracle Integration", "Dedicated Account Mgr"],
    cta: "Contact Sales",
    popular: false,
    dark: true,
  },
];

export const FAQ = [
  {
    q: "Does it require a guest app?",
    a: "No guest app is required. Your team runs the full workflow in CurvioValet; guests never need to install software. You may optionally send an SMS with a secure link so they can view their vehicle profile and submit a retrieval request through the link.",
    open: true,
  },
  {
    q: "How accurate is the AI?",
    a: "Extraction is tuned for common brands and standard plates. Staff needs to accept the AI-filled fields. Nothing is saved until your team confirms, so your library always reflects verified data, not raw model output.",
    open: false,
  },
  {
    q: "Is data stored securely?",
    a: "Yes. Sensitive fields are encrypted, sessions are JWT-based, and media is stored in secured cloud storage.",
    open: false,
  },
];
