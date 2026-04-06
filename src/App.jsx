import { useEffect, useState } from "react";
import { initAnalytics, trackEvent, trackPageView } from "./analytics";

const stackStrip = [
  { label: "React", mark: "R", color: "#79d7ff", tint: "rgba(121, 215, 255, 0.14)" },
  { label: "Next.js", mark: "N", color: "#f3f5f6", tint: "rgba(243, 245, 246, 0.12)" },
  { label: "TypeScript", mark: "TS", color: "#67a8ff", tint: "rgba(103, 168, 255, 0.14)" },
  { label: "Tailwind CSS", mark: "TW", color: "#57d7d6", tint: "rgba(87, 215, 214, 0.14)" },
  { label: "JavaScript", mark: "JS", color: "#f3e267", tint: "rgba(243, 226, 103, 0.14)" },
  { label: "Vue.js", mark: "V", color: "#62d59a", tint: "rgba(98, 213, 154, 0.14)" },
  { label: "Node.js", mark: "ND", color: "#84d86b", tint: "rgba(132, 216, 107, 0.14)" },
  { label: "NestJS", mark: "NE", color: "#ff6c8f", tint: "rgba(255, 108, 143, 0.14)" },
  { label: "Java", mark: "J", color: "#ff9d74", tint: "rgba(255, 157, 116, 0.14)" },
  { label: "Spring Boot", mark: "SB", color: "#97df6d", tint: "rgba(151, 223, 109, 0.14)" },
  { label: "Python", mark: "PY", color: "#8fd1ff", tint: "rgba(143, 209, 255, 0.14)" },
  { label: "Django", mark: "DJ", color: "#73cb92", tint: "rgba(115, 203, 146, 0.14)" },
  { label: "Laravel", mark: "LA", color: "#ff7a67", tint: "rgba(255, 122, 103, 0.14)" },
  { label: "PostgreSQL", mark: "PG", color: "#8db2ff", tint: "rgba(141, 178, 255, 0.14)" },
  { label: "MySQL", mark: "MY", color: "#8dd7ff", tint: "rgba(141, 215, 255, 0.14)" },
  { label: "Redis", mark: "RE", color: "#ff8b7d", tint: "rgba(255, 139, 125, 0.14)" },
  { label: "RabbitMQ", mark: "RM", color: "#ffb470", tint: "rgba(255, 180, 112, 0.14)" },
  { label: "Kafka", mark: "KF", color: "#d6dae0", tint: "rgba(214, 218, 224, 0.14)" },
  { label: "AWS", mark: "AW", color: "#ffb470", tint: "rgba(255, 180, 112, 0.14)" },
  { label: "ECS", mark: "EC", color: "#ffb470", tint: "rgba(255, 180, 112, 0.14)" },
  { label: "ALB", mark: "LB", color: "#ffd28b", tint: "rgba(255, 210, 139, 0.14)" },
  { label: "Docker", mark: "DK", color: "#72c7ff", tint: "rgba(114, 199, 255, 0.14)" },
  { label: "CloudWatch", mark: "CW", color: "#b897ff", tint: "rgba(184, 151, 255, 0.14)" },
  { label: "Grafana", mark: "GF", color: "#ff9966", tint: "rgba(255, 153, 102, 0.14)" },
  { label: "Prometheus", mark: "PR", color: "#ff7f73", tint: "rgba(255, 127, 115, 0.14)" },
  { label: "CI/CD", mark: "CI", color: "#ccb9ff", tint: "rgba(204, 185, 255, 0.14)" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/_theolusola_?igsh=MXQ5MjUxYTJjeXJkbw%3D%3D&utm_source=qr",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@_theolusola_?_r=1&_t=ZS-95Gm4dNmuLC",
    icon: "tiktok",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devsola?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@devsolayt?si=U5iFP9BXjmRCO-GL",
    icon: "youtube",
  },
  {
    label: "CV",
    href: "https://docs.google.com/document/d/1QhJEp5iKxSKgsJKmt7vednH6oo4_po2OZekdNePLDCE/edit?usp=sharing",
    icon: "cv",
  },
];

const capabilityRows = [
  {
    id: "01",
    icon: "systems",
    title: "I build sharp software systems with real platform and fintech depth",
    body:
      "I build across interface, backend, APIs, payments, event-driven services, and delivery layers, shaping products that feel polished up front and still hold up as the system underneath gets more demanding.",
    tags: ["Payments", "AWS", "RabbitMQ", "System design"],
  },
  {
    id: "02",
    icon: "product",
    title: "I think beyond tickets and work with the product in mind",
    body:
      "I work comfortably across onboarding, activation, conversion, retention, and feature iteration when the product needs more than a surface implementation.",
    tags: ["Product growth", "A/B testing", "Onboarding", "Analytics"],
  },
  {
    id: "03",
    icon: "music",
    title: "I bring creativity into my work beyond code",
    body:
      "Outside software, I produce music in FL Studio with a focus on composition, sound design, and mixing. That creative practice sharpens my rhythm, taste, and patience in product work too.",
    tags: ["FL Studio", "Sound design", "Audio mixing", "Composition"],
  },
  {
    id: "04",
    icon: "values",
    title: "I work from a clear set of values",
    body:
      "Effective communication, collaboration, problem-solving, time management, continuous learning, and a steady commitment to quality are the constants across both engineering and creative work.",
    tags: ["Problem-solving", "Time management", "Continuous learning", "Quality"],
  },
];

const mainExperiences = [
  {
    role: "Technical Lead / Principal Engineer",
    company: "SystemDigits / RockPay",
    period: "May 2024 - Present",
    location: "Remote, USA",
    links: [
      { label: "SystemDigits", href: "https://systemdigits.com" },
      { label: "RockPay", href: "https://rockpay.app" },
    ],
    image: "/experience/rockpay.png",
    imageAlt: "RockPay homepage screenshot",
    summary:
      "I lead fintech product and platform work across frontend, backend, delivery, and trust-critical user flows.",
    highlights: [
      "I reduced fraud attempts by 30 percent through smarter product and platform controls.",
      "I improved release cycles by 60 percent with stronger delivery systems and CI/CD.",
      "I led 6 engineers while still shipping production work across frontend and platform layers.",
      "I built reusable product primitives around authentication, messaging, notifications, and transaction flows.",
      "I worked across React, TypeScript, Spring Boot, Redis, RabbitMQ, and cloud infrastructure to keep product and platform aligned.",
      "I partnered with growth, design, and product teams on onboarding, conversion, and trust-critical financial flows.",
    ],
  },
  {
    role: "Software Consultant",
    company: "CamCap Markets",
    period: "Apr 2023 - Aug 2023 · Jun 2025 - Oct 2025",
    location: "London, England",
    links: [
      { label: "Trade Report", href: "https://tradereport.camcapmarkets.com/" },
      { label: "CAMcap Markets", href: "https://camcapmarkets.com/en/" },
    ],
    image: "/experience/camcap.png",
    imageAlt: "CAMcap Markets login screenshot",
    summary:
      "I supported the delivery of financial analysis software in a trust-heavy environment where clarity, reporting accuracy, and clean workflows mattered.",
    highlights: [
      "I worked as a software consultant on finance-facing product flows and reporting experiences.",
      "I rebuilt key parts of the web experience with Laravel and Blade.",
      "I integrated reporting and operational data into clearer product surfaces for users.",
      "I improved authentication and account flow handling for a more dependable experience.",
      "I built supporting automation and backend processes around alerts, emails, and recurring tasks.",
      "I worked in a domain where precision, trust, and clear information architecture were non-negotiable.",
    ],
  },
  {
    role: "Full-Stack Product Engineer",
    company: "MockThatInterview",
    period: "Jun 2025 - Sep 2025",
    location: "Remote contract",
    links: [{ label: "MockThatInterview", href: "https://mockthatinterview.com" }],
    image: "/experience/mockthatinterview.svg",
    imageAlt: "MockThatInterview homepage screenshot",
    summary:
      "I worked across AI interview UX, onboarding, scheduling, payments, and feedback loops on a mock interview platform that combined AI and human reviewers.",
    highlights: [
      "I built interactive frontend flows with React, Next.js, and TypeScript.",
      "I integrated authentication, scheduling, and payments into the user experience.",
      "I helped shape onboarding and activation paths for candidates preparing for interviews.",
      "I worked closely with users, product, and engineering to improve issue clarity and support loops.",
      "I contributed to a product where AI workflows and real human feedback had to feel coherent in one journey.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Darey.io",
    period: "Mar 2022 - Jul 2023",
    location: "London, England",
    links: [{ label: "Darey.io", href: "https://www.darey.io/" }],
    image: "/experience/darey.png",
    imageAlt: "Darey.io homepage screenshot",
    summary:
      "I built production frontend systems for a learning platform with a strong focus on performance, usability, and learner engagement.",
    highlights: [
      "I improved engagement by 20 percent through UX and frontend improvements.",
      "I reduced page load time by 15 percent, helping conversion from landing to registration.",
      "I designed, built, and maintained dynamic frontend applications using HTML5, CSS3, JavaScript, and React.",
      "I integrated frontend features with backend services through RESTful APIs.",
      "I resolved conflicts and prioritized project needs within cross-functional teams.",
      "I worked closely with designers and backend engineers on API contracts and learning workflows.",
      "I improved frontend reliability, accessibility, and cross-browser behavior for a large learner base.",
      "I stayed active in conferences, workshops, and self-study to keep the work aligned with modern frontend practices.",
    ],
  },
  {
    role: "Fullstack Engineer",
    company: "SideHustle NG",
    period: "Apr 2021 - Feb 2022",
    location: "Ibadan, Oyo",
    links: [{ label: "TerraHQ LMS", href: "https://lms.terrahq.co/" }],
    image: "/experience/terra.svg",
    imageAlt: "Terra Learning homepage artwork",
    summary:
      "I handled both frontend and backend work on production applications with REST APIs, caching, and event-driven infrastructure.",
    highlights: [
      "I played a core role in the end-to-end development of applications across frontend, backend, and DevOps work.",
      "I built features across Laravel, MySQL, Redis, Kafka, and Vue.js.",
      "I contributed to the architecture and implementation of RESTful APIs for production use.",
      "I used Vue.js for dynamic interfaces and Laravel for server-side development.",
      "I worked close to delivery and DevOps workflows instead of staying boxed into one layer.",
      "I improved API performance and reliability, helping reduce latency on core flows.",
      "I supported end-to-end product delivery across frontend interfaces, backend logic, and operational tooling.",
    ],
  },
];

const otherExperiences = [
  {
    role: "Senior Java Developer",
    company: "BioAuth Solutions Ltd",
    period: "Jan 2022 - Jun 2022",
    location: "London, England",
  },
  {
    role: "Lead Backend Developer",
    company: "Illumino",
    period: "Sep 2021 - Jan 2022",
    location: "Lagos, Lagos",
  },
  {
    role: "Full-Stack / Mobile App Developer",
    company: "NaturesFX",
    period: "Aug 2021 - Dec 2021",
    location: "London, England",
  },
  {
    role: "Full Stack Web Developer",
    company: "Rock Valley Hotel",
    period: "Apr 2021 - May 2021",
    location: "Idanre, Ondo",
  },
  {
    role: "Software Engineering Intern",
    company: "Winatech Web Solutions",
    period: "Feb 2014 - Sep 2016",
    location: "Owo, Ondo",
  },
];

const referencePanels = [
  {
    label: "Reference",
    title: "Donfrancis Osaji",
    href: "https://www.linkedin.com/in/donfrancisosaji/",
    copy:
      "I prefer to keep this section honest, so I am linking directly to professional references instead of adding quote text I cannot verify publicly.",
  },
  {
    label: "Reference",
    title: "Idris Akano",
    href: "https://www.linkedin.com/in/idris-akano/",
    copy:
      "I am using direct reference links here because they say more than made-up testimonials ever could.",
  },
  {
    label: "Additional reference",
    title: "More references available on request",
    copy:
      "I can share more professional references on request. The pattern across my roles is consistent: strong collaboration, hands-on delivery, and trust in high-responsibility work.",
  },
];

function CapabilityIcon({ type }) {
  if (type === "systems") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="5" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="8.5" y="13" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 8h2M9.5 11.2v1.8M14.5 11.2v1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "product") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 17l4-4 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 6h14v12H5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (type === "platform") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="10" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="15" width="16" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8" cy="7" r="1" fill="currentColor" />
        <circle cx="8" cy="12" r="1" fill="currentColor" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "support") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 13v-1a6 6 0 0 1 12 0v1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="4.5" y="12.5" width="3" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="16.5" y="12.5" width="3" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M19.5 17.5a2.5 2.5 0 0 1-2.5 2.5H13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "people") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.5 18.5c.6-2.6 2.6-4 4.5-4s3.9 1.4 4.5 4M13 18.5c.4-1.9 1.9-3.2 3.8-3.2 1.7 0 3.1 1 3.7 3.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "music") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 5v9.5a2.5 2.5 0 1 1-1.5-2.3V7.2l7-1.7v7a2.5 2.5 0 1 1-1.5-2.3V4.2z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "values") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20s-6-3.4-6-9V6l6-2 6 2v5c0 5.6-6 9-6 9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.5 12.2l1.6 1.6 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20c4 0 7-3 7-7s-3-7-7-7-7 3-7 7 3 7 7 7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 13.2l1.7 1.8 3.4-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 4c.4 2.1 1.7 3.4 4 3.8v2.4c-1.4 0-2.7-.4-4-1.2v5.9a4.7 4.7 0 1 1-4.7-4.6c.4 0 .8 0 1.2.1v2.4a2.5 2.5 0 1 0 1.3 2.1V4z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.3 8.4A1.7 1.7 0 1 0 6.3 5a1.7 1.7 0 0 0 0 3.4zM4.9 9.8h2.8V19H4.9zM9.6 9.8h2.7v1.3h.1c.4-.7 1.3-1.6 2.8-1.6 3 0 3.5 2 3.5 4.5V19H16v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H9.6z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12s0-3.4-.4-5c-.2-.9-.9-1.6-1.8-1.8C17.2 4.8 12 4.8 12 4.8s-5.2 0-6.8.4c-.9.2-1.6.9-1.8 1.8C3 8.6 3 12 3 12s0 3.4.4 5c.2.9.9 1.6 1.8 1.8 1.6.4 6.8.4 6.8.4s5.2 0 6.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5 .4-5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 9.2l5 2.8-5 2.8z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10v16H7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 8h5M9.5 11.5h5M9.5 15h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StackIcon({ item }) {
  return (
    <span
      className="stack-mark"
      aria-hidden="true"
      style={{
        "--stack-color": item.color,
        "--stack-bg": item.tint,
      }}
    >
      {item.mark}
    </span>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 5h5v5M19 5l-8.5 8.5M13 7H8.2A2.2 2.2 0 0 0 6 9.2v6.6A2.2 2.2 0 0 0 8.2 18h6.6a2.2 2.2 0 0 0 2.2-2.2V11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{body}</p>
    </div>
  );
}

function App() {
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    initAnalytics();
    trackPageView();

    const handleHashChange = () => {
      trackPageView(window.location.pathname + window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowQuickActions(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    trackEvent("scroll_to_top_click", {
      section: "floating_actions",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackedClick = (eventName, params = {}) => () => {
    trackEvent(eventName, params);
  };

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <header className="site-header">
        <a
          className="brand-lockup"
          href="#top"
          onClick={handleTrackedClick("nav_click", { target_section: "top", placement: "header_brand" })}
        >
          <span className="brand-mark">S</span>
          <span className="brand-text">Sola Moses Paul</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#capabilities" onClick={handleTrackedClick("nav_click", { target_section: "capabilities", placement: "header_nav" })}>Capabilities</a>
          <a href="#experience" onClick={handleTrackedClick("nav_click", { target_section: "experience", placement: "header_nav" })}>Experience</a>
          <a href="#feedback" onClick={handleTrackedClick("nav_click", { target_section: "feedback", placement: "header_nav" })}>Feedback</a>
          <a href="#contact" onClick={handleTrackedClick("nav_click", { target_section: "contact", placement: "header_nav" })}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Senior software engineer across product, platform, and delivery</p>
            <h1>
              I build premium, scalable software products and systems.
            </h1>
            <p className="hero-summary">
              I am Sola Moses Paul, based in Nigeria and open to remote work. I build products that feel intentional,
              behave well under pressure, and still make sense when the system underneath gets complicated.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#contact"
                onClick={handleTrackedClick("hero_cta_click", { cta_label: "contact", destination: "contact_section" })}
              >
                Contact
              </a>
              <a
                className="button button-secondary"
                href="https://docs.google.com/document/d/1QhJEp5iKxSKgsJKmt7vednH6oo4_po2OZekdNePLDCE/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={handleTrackedClick("hero_cta_click", { cta_label: "view_cv", destination: "external_cv" })}
              >
                View CV
              </a>
              <a
                className="button button-secondary"
                href="#experience"
                onClick={handleTrackedClick("hero_cta_click", { cta_label: "browse_experience", destination: "experience_section" })}
              >
                Browse experience
              </a>
            </div>

          </div>

          <aside className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/sola-favicon.jpg"
                alt="Sola Moses Paul portrait"
              />
            </div>

            <div className="signal-card">
              <p className="signal-label">Current lane</p>
              <h2>I bring product taste, engineering depth, and platform calm.</h2>
              <ul>
                <li>I am open to remote roles and contracts</li>
                <li>I work comfortably across US time zones</li>
                <li>I am strongest in fintech, SaaS, AI, and education products</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="company-marquee" aria-label="Technology stack">
          <div className="company-track">
            {[...stackStrip, ...stackStrip].map((item, index) => (
              <span className="company-pill" key={`${item.label}-${index}`}>
                <StackIcon item={item} />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        <section className="section-block" id="capabilities">
          <SectionHeading
            eyebrow="Capabilities & Stack"
            title="I work across the stack, but I stay grounded in product."
            body="I use the stack above to ship real products, not just to collect tools. The rows below show how I turn that range into useful work."
          />

          <div className="capability-list">
            {capabilityRows.map((item) => (
              <article className="capability-row" key={item.id}>
                <div className="capability-index">
                  <span className="capability-icon">
                    <CapabilityIcon type={item.icon} />
                  </span>
                  <span>{item.id}</span>
                </div>
                <div className="capability-main">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="Work shaped across product, platform, and delivery."
            body="I am leading with the experiences that best represent my range across product, engineering, platform work, and delivery."
          />

          <div className="experience-ledger">
            {mainExperiences.map((item) => (
              <article className="experience-entry" key={`${item.company}-${item.role}`}>
                <div className="experience-meta">
                  <p>{item.period}</p>
                  <span>{item.location}</span>
                </div>

                <div className="experience-content">
                  <div className="experience-visual">
                    <img src={item.image} alt={item.imageAlt} />
                  </div>
                  <p className="experience-role">{item.role}</p>
                  <h3>{item.company}</h3>
                  <div className="experience-links">
                    {item.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleTrackedClick("experience_link_click", {
                          company: item.company,
                          role: item.role,
                          link_label: link.label,
                        })}
                      >
                        <span>{link.label}</span>
                        <ExternalLinkIcon />
                      </a>
                    ))}
                  </div>
                  <p className="experience-summary">{item.summary}</p>
                  <ul className="experience-points">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="other-experience">
            <div className="other-experience-head">
              <p className="eyebrow">Other Experience</p>
              <p className="section-copy">
                These roles round out my path across backend, mobile, consulting, and early engineering work.
              </p>
            </div>

            <div className="other-experience-grid">
              {otherExperiences.map((item) => (
                <article className="other-card" key={`${item.company}-${item.role}`}>
                  <p className="experience-role">{item.role}</p>
                  <h3>{item.company}</h3>
                  <p className="other-meta">{item.location}</p>
                  <p className="other-meta">{item.period}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="feedback">
          <SectionHeading
            eyebrow="Feedback"
            title="I would rather show real references than polished fiction."
            body="I am keeping this section simple and credible by linking to real professional references instead of inventing testimonial copy."
          />

          <div className="proof-grid">
            {referencePanels.map((panel) => (
              <article className="proof-card" key={panel.title}>
                <p className="proof-label">{panel.label}</p>
                <h3>{panel.title}</h3>
                <p>{panel.copy}</p>
                {panel.href ? (
                  <a
                    className="reference-link"
                    href={panel.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleTrackedClick("reference_link_click", { reference_name: panel.title })}
                  >
                    Open profile
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <footer className="section-block contact-shell" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>If you need taste, range, and real delivery, I would love to talk.</h2>
            <p className="section-copy">
              I am available for remote engineering roles, consulting, and product-focused build work.
            </p>
          </div>

          <div className="contact-panel">
            <a
              href="mailto:paulsola79@gmail.com"
              onClick={handleTrackedClick("contact_click", { contact_method: "email", placement: "footer" })}
            >
              paulsola79@gmail.com
            </a>
            <p>Based in Nigeria</p>
            <div className="social-row contact-socials">
              {socialLinks.map((item) => (
                <a
                  className="social-chip"
                  key={`contact-${item.label}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleTrackedClick("social_link_click", { social_network: item.label.toLowerCase(), placement: "footer" })}
                >
                  <SocialIcon type={item.icon} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      <div className={`floating-actions ${showQuickActions ? "is-visible" : ""}`} aria-hidden={!showQuickActions}>
        <a
          className="floating-button floating-button-whatsapp"
          href="https://api.whatsapp.com/send?phone=2347065425688&text=Hello%20Sola,%20I%20would%20love%20to%20learn%20more%20about%20your%20work."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={handleTrackedClick("contact_click", { contact_method: "whatsapp", placement: "floating_action" })}
        >
          <svg viewBox="0 0 448 512" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>

        <button
          className="floating-button floating-button-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
