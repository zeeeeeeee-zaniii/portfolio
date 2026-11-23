import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import HeroArt from "@/components/HeroArt";
import ContactForm from "@/components/ContactForm";
import YearNow from "@/components/YearNow";

const INSTAGRAM_URL = "https://www.instagram.com/buildwithzainab_/";

/* ---------- small inline icons (stroke, currentColor) ---------- */
const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--accent-deep)",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const Icons = {
  business: (
    <svg {...iconProps}>
      <path d="M4 21V8l6-4v17" />
      <path d="M10 21V4l10 6v11" />
      <path d="M2 21h20" />
      <path d="M13 8h2M13 12h2M13 16h2M6.5 9h1M6.5 13h1M6.5 17h1" />
    </svg>
  ),
  booking: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  ),
  landing: (
    <svg {...iconProps}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h5" />
      <rect x="8" y="15.5" width="6" height="3" rx="1.5" />
    </svg>
  ),
  maintenance: (
    <svg {...iconProps}>
      <path d="M14.5 6.5a4 4 0 0 1 5.6-3.9l-2.7 2.7.8 2.4 2.4.8 2.7-2.7a4 4 0 0 1-5.5 5L8 20.7a2 2 0 0 1-2.8 0l-2-2a2 2 0 0 1 0-2.8L9.7 9.4a4 4 0 0 0 4.8-2.9Z" transform="scale(0.92) translate(1 1)" />
    </svg>
  ),
};

/* ---------- decorative SVG patterns for cards ---------- */
function Pattern({ kind }: { kind: "dots" | "grid" | "waves" | "diag" }) {
  const id = `pat-${kind}`;
  return (
    <svg className="pattern" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        {kind === "dots" && (
          <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="var(--accent)" opacity="0.35" />
          </pattern>
        )}
        {kind === "grid" && (
          <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
          </pattern>
        )}
        {kind === "waves" && (
          <pattern id={id} width="40" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 Q10 0 20 7 T40 7" fill="none" stroke="var(--caramel)" strokeWidth="1.6" opacity="0.35" />
          </pattern>
        )}
        {kind === "diag" && (
          <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="5" height="16" fill="var(--accent)" opacity="0.18" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ---------- data ---------- */
const SERVICES = [
  {
    num: "01",
    icon: Icons.business,
    pattern: "dots" as const,
    title: "Business Websites",
    text: "A complete, modern website for your business — services, gallery, contact and everything a customer needs to trust you.",
    chips: ["Multi-page", "Mobile-first", "Fast loading"],
  },
  {
    num: "02",
    icon: Icons.booking,
    pattern: "grid" as const,
    title: "Booking Websites",
    text: "Let customers book appointments online with services, a calendar and confirmations — no more missed calls or messy chats.",
    chips: ["Online booking", "Calendar", "Admin panel"],
  },
  {
    num: "03",
    icon: Icons.landing,
    pattern: "waves" as const,
    title: "Landing Pages",
    text: "One focused page that turns visitors into customers — perfect for a product, offer, course or new launch.",
    chips: ["High-converting", "One page", "Quick launch"],
  },
  {
    num: "04",
    icon: Icons.maintenance,
    pattern: "diag" as const,
    title: "Website Maintenance",
    text: "Updates, small changes, backups and support after launch — so your website stays fresh, secure and working.",
    chips: ["Updates", "Support", "Care plans"],
  },
];

const CHECKLIST = [
  "Mobile-first design",
  "Fast loading",
  "Contact form to your inbox",
  "Support after launch",
];

const STEPS = [
  { title: "Discover", text: "We talk about your business, your customers and what your website must do." },
  { title: "Free Demo", text: "You see a working preview of your website before you commit to anything." },
  { title: "Build", text: "I design and build the full website, keeping you updated at every step." },
  { title: "Launch", text: "Your website goes live, tested on phones and computers, ready to share." },
  { title: "Maintain & Support", text: "I stay available for updates, backups and help whenever you need it." },
];

export default function Home() {
  const projects = [
    {
      title: "Online Booking Website",
      text: "Appointment booking with services, a live calendar, time slots that block once booked, and an admin panel to manage every booking.",
      url: process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "",
      accent: "var(--accent)",
    },
    {
      title: "Business Website",
      text: "A complete website for a boutique — collections with prices, a gallery, customer quotes, opening hours and a contact form with an admin inbox.",
      url: process.env.NEXT_PUBLIC_DEMO_BUSINESS_URL || "",
      accent: "var(--caramel)",
    },
    {
      title: "Online Ordering Website",
      text: "A restaurant menu with a cart, cash-on-delivery checkout, order tracking for customers and a full order flow for the owner.",
      url: process.env.NEXT_PUBLIC_DEMO_ORDERING_URL || "",
      accent: "var(--accent-deep)",
    },
    {
      title: "Landing Page",
      text: "A one-page product site built to convert — benefits, reviews, pricing packs, an FAQ and an order form that saves every lead.",
      url: process.env.NEXT_PUBLIC_DEMO_LANDING_URL || "",
      accent: "var(--accent)",
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="blob blob-a" />
          <div className="blob blob-b" />
          <div className="wrap hero-grid">
            <div>
              <h1>
                Hi, I&apos;m <em>Zainab Fatima</em>.
              </h1>
              <p className="hero-role">Web Developer &amp; AI Creator</p>
              <p className="hero-line">
                I build modern, fast websites that help businesses look
                professional online and turn visitors into customers.
              </p>
              <div className="hero-buttons">
                <a href="#work" className="btn btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="hero-art">
              <span className="hero-badge">
                <span className="dot-live" /> Open for new projects
              </span>
              <div className="hero-art-card">
                <HeroArt />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">About Me</p>
              <div className="about-grid">
                <div>
                  <h2 className="section-title">
                    Websites that feel as <em>good</em> as they look.
                  </h2>
                  <p>
                    I&apos;m a web developer who builds modern, fast websites
                    for businesses and brands — from complete business websites
                    and online booking systems to focused landing pages that
                    convert visitors into customers.
                  </p>
                  <p>
                    Every project is designed <strong>mobile-first</strong>,
                    with clean layouts, clear messaging and the small details
                    that make a business look professional and trustworthy
                    online.
                  </p>
                  <p>
                    Alongside client work, I create AI &amp; tech content —
                    sharing practical tools and ideas that help people build
                    and grow with technology.
                  </p>
                  <p>
                    <strong>
                      My goal is simple: a website you are proud to share, and
                      customers find easy to use.
                    </strong>
                  </p>
                </div>
                <div className="checklist-card">
                  <h3>Every project includes</h3>
                  <ul className="checklist">
                    {CHECKLIST.map((item) => (
                      <li key={item}>
                        <span className="check">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="btn btn-ghost btn-small"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📸 @buildwithzainab_ on Instagram ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section id="services">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h2 className="section-title">
                What I can <em>build</em> for you
              </h2>
              <p className="section-lead" style={{ marginBottom: "2.2rem" }}>
                Clear, complete packages — designed around your business, built
                to be fast on every phone.
              </p>
            </Reveal>
            <div className="grid grid-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title}>
                  <article className="card" style={{ height: "100%" }}>
                    <Pattern kind={s.pattern} />
                    <span className="card-num">{s.num}</span>
                    <div className="card-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <div className="chips">
                      {s.chips.map((c) => (
                        <span key={c} className="chip">
                          {c}
                        </span>
                      ))}
                    </div>
                    <span style={{ display: "none" }}>{i}</span>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="under-grid-note">
                Need something different — an online store, a portfolio, or a
                custom idea? <a href="#contact">Tell me about it →</a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- WORK ---------- */}
        <section id="work">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Selected Work</p>
              <h2 className="section-title">
                Demo projects, <em>fully working</em>
              </h2>
              <p className="section-lead" style={{ marginBottom: "2.2rem" }}>
                Each project below is a complete, working demo — open one and
                try it exactly as your customers would.
              </p>
            </Reveal>
            <div className="grid grid-2">
              {projects.map((p) => (
                <Reveal key={p.title}>
                  <article className="card" style={{ height: "100%" }}>
                    <span className="tag">Demo Project</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    {p.url ? (
                      <a
                        className="btn btn-rose btn-small"
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    ) : (
                      <span className="btn btn-rose btn-small disabled" aria-disabled="true">
                        Live Demo — coming soon
                      </span>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PROCESS ---------- */}
        <section id="process">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">How It Works</p>
              <h2 className="section-title">
                From first chat to <em>launch</em>
              </h2>
              <p className="section-lead" style={{ marginBottom: "2.2rem" }}>
                A simple, safe process — you always know what happens next.
              </p>
            </Reveal>
            <div className="process-grid">
              {STEPS.map((step, i) => (
                <Reveal key={step.title}>
                  <div className="step" style={{ height: "100%" }}>
                    <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <Reveal>
                <div>
                  <p className="eyebrow">Contact</p>
                  <h2 className="section-title">
                    Let&apos;s build your <em>website</em>
                  </h2>
                  <p className="section-lead" style={{ marginBottom: "1.4rem" }}>
                    Tell me a little about your business and the website you
                    have in mind. I reply to every message personally.
                  </p>
                  <p className="section-lead" style={{ marginBottom: "1.6rem" }}>
                    Prefer chatting? Send me a DM on Instagram with the word{" "}
                    <strong>DEMO</strong> and I will show you a free demo for
                    your business.
                  </p>
                  <a
                    className="btn btn-primary"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    DM on Instagram ↗
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>
            © <YearNow /> Zainab Fatima — Web Developer &amp; AI
            Creator
          </p>
          <p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              @buildwithzainab_
            </a>{" "}
            · Built with care, mobile-first
          </p>
        </div>
      </footer>
    </>
  );
}
