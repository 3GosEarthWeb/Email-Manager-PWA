import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Search, Sun, Moon, ArrowLeft, Menu, X, Filter, Github, Linkedin, Mail, ExternalLink, BookOpen, Home as HomeIcon, Briefcase, PenTool, ArrowUp, Monitor } from "lucide-react";

/**
 * OGWUSEARCH — Single-file React scaffolding
 * -------------------------------------------------
 * This file gives you a running UX skeleton with:
 * - Search-first Hero (type-to-filter projects)
 * - Project grid with filters + detail view
 * - Pages: Home, Projects, Case Study, About, Blog, Contact
 * - Dark/Light theme toggle (no Tailwind)
 * - Minimal, modern styling with CSS-in-JS (scoped styles)
 *
 * How to use in Vite (no Tailwind):
 * 1) npm create vite@latest ogwusearch -- --template react
 * 2) cd ogwusearch && npm i react-router-dom lucide-react
 * 3) Replace src/App.jsx with this file's contents and ensure default export
 * 4) In src/main.jsx: render <App /> from this file
 * 5) npm run dev
 */

// ---------------------- Fake Data ----------------------
// ---------------------- Fake Data ----------------------
const PROJECTS = [
  {
    id: "oriem-finance",
    title: "Oriem Finance Banking UX",
    year: 2025,
    tags: ["React", "Design System", "Fintech", "Dashboard"],
    summary: "A private internet banking app with transfer, credit, transactions, and profiles.",
    cover: "https://picsum.photos/seed/oriem/800/500",
    impact: [
      "Reduced task completion time by 28%",
      "Unified 20+ components into a consistent DS",
      "WCAG AA contrast compliance"
    ],
    role: "Lead Designer/Engineer",
    problem: "Fragmented UI and inconsistent flows slowed users and hurt trust.",
    process: "Audited flows, mapped IA, built components, prototyped, and user-tested.",
    result: "Shipped a cohesive, responsive app with analytics and accessibility baked in.",
    links: [{ label: "Case Study", href: "/projects/oriem-finance" }]
  },
  {
    id: "casino-resort",
    title: "Resort & Casino Capital Raise Portal",
    year: 2025,
    tags: ["Next.js", "Pitch Ops", "Data Room", "Secure"],
    summary: "Investor portal for a $5B development with tracked engagement.",
    cover: "https://picsum.photos/seed/casino/800/500",
    impact: [
      "9 board members onboarded",
      "$3.5B tracked commitments",
      "Audit trail for 50+ docs"
    ],
    role: "Product Lead",
    problem: "Manual updates and scattered documents slowed due diligence.",
    process: "Built a secure portal with role-based access and analytics.",
    result: "Faster investor cycles and better compliance.",
    links: []
  },
  {
    id: "ogwusearch",
    title: "Ogwusearch Portfolio Engine",
    year: 2025,
    tags: ["UX", "Brand", "Search", "Content Architecture"],
    summary: "Personal brand that treats your work like a searchable knowledge graph.",
    cover: "https://picsum.photos/seed/ogwu/800/500",
    impact: ["+43% portfolio dwell time", "Higher recruiter conversions"],
    role: "Everything",
    problem: "Traditional portfolios hide depth and feel generic.",
    process: "Search-first IA, facets, narrative case studies, delightful micro-interactions.",
    result: "A portfolio that surfaces relevance in 1–2 clicks.",
    links: []
  },
  {
    id: "health-ai",
    title: "Predictive Health AI Dashboard",
    year: 2024,
    tags: ["AI", "Healthcare", "React", "Data Viz"],
    summary: "Clinical dashboard surfacing AI-driven patient risk scores.",
    cover: "https://picsum.photos/seed/health/800/500",
    impact: ["Improved early detection accuracy by 17%", "Adopted in 3 hospitals"],
    role: "UX Engineer",
    problem: "Clinicians struggled to interpret raw ML outputs.",
    process: "Interviewed doctors, iterated on risk visualizations, validated with test cases.",
    result: "Actionable and explainable insights integrated into daily workflow.",
    links: []
  },
  {
    id: "edtech-platform",
    title: "EdTech Learning Experience",
    year: 2023,
    tags: ["React", "Gamification", "Accessibility"],
    summary: "Interactive platform for personalized STEM tutoring.",
    cover: "https://picsum.photos/seed/edtech/800/500",
    impact: ["+65% student engagement", "WCAG AAA support for vision-impaired learners"],
    role: "Full-Stack Developer",
    problem: "Generic LMS tools lacked personalization and accessibility.",
    process: "Built adaptive modules, gamified progress, tested with 120 students.",
    result: "Adopted by 4 schools, reduced dropout by 19%.",
    links: []
  },
  {
    id: "ai-writer",
    title: "AI Copywriting Companion",
    year: 2024,
    tags: ["AI", "Content", "Productivity"],
    summary: "A smart writing assistant tuned for brand tone and speed.",
    cover: "https://picsum.photos/seed/writer/800/500",
    impact: ["Cut writing time by 40%", "Reduced off-brand copy incidents"],
    role: "Product Designer",
    problem: "Teams wasted hours rewriting inconsistent marketing content.",
    process: "Built tone profiles, integrated GPT APIs, ran AB tests.",
    result: "Faster workflows, happier content teams.",
    links: []
  },
  {
    id: "civic-map",
    title: "Civic Engagement Map",
    year: 2022,
    tags: ["Open Data", "Mapping", "React Leaflet"],
    summary: "Interactive map visualizing civic resources and events.",
    cover: "https://picsum.photos/seed/map/800/500",
    impact: ["12k monthly active citizens", "Increased local event attendance by 22%"],
    role: "Lead Developer",
    problem: "Residents had no centralized way to discover services/events.",
    process: "Pulled APIs, designed map overlays, tested for mobile-first users.",
    result: "Trusted by NGOs and local councils.",
    links: []
  },
  {
    id: "ecom-ai",
    title: "AI-Powered E-Commerce Recommender",
    year: 2024,
    tags: ["E-commerce", "AI", "Personalization"],
    summary: "Recommendation engine boosting conversion in online retail.",
    cover: "https://picsum.photos/seed/ecom/800/500",
    impact: ["+18% conversion", "Higher AOV by 9%"],
    role: "ML Engineer",
    problem: "Shoppers overwhelmed by too many irrelevant products.",
    process: "Trained collaborative filtering models, integrated into storefront.",
    result: "Meaningful recommendations in under 100ms.",
    links: []
  },
  {
    id: "green-energy",
    title: "Green Energy Analytics",
    year: 2023,
    tags: ["Sustainability", "Analytics", "Dashboards"],
    summary: "Dashboard to monitor solar farm efficiency and grid impact.",
    cover: "https://picsum.photos/seed/energy/800/500",
    impact: ["Detected panel faults 2 weeks earlier", "Optimized yield by 12%"],
    role: "Frontend Engineer",
    problem: "Operators lacked real-time visibility into performance.",
    process: "Built real-time charts, anomaly detection alerts, role-based access.",
    result: "Improved reliability and ROI.",
    links: []
  },
  {
    id: "travel-app",
    title: "Smart Travel Planner",
    year: 2022,
    tags: ["Mobile", "AI", "React Native"],
    summary: "App for AI-assisted trip planning with real-time pricing.",
    cover: "https://picsum.photos/seed/travel/800/500",
    impact: ["100k+ downloads", "4.7⭐ on app stores"],
    role: "Mobile Engineer",
    problem: "Travelers pieced trips together across scattered apps.",
    process: "Unified booking APIs, layered real-time recommendations.",
    result: "One-stop trip planning trusted by frequent travelers.",
    links: []
  },
  {
    id: "music-gen",
    title: "AI Music Generation Studio",
    year: 2024,
    tags: ["AI", "Audio", "Creative Tools"],
    summary: "Web app for generating royalty-free background music.",
    cover: "https://picsum.photos/seed/music/800/500",
    impact: ["500+ tracks created daily", "Adopted by indie creators"],
    role: "Full-Stack Dev",
    problem: "Small creators lacked affordable, custom background music.",
    process: "Trained diffusion-based audio model, built simple DAW interface.",
    result: "Accessible, creative tool for YouTubers and podcasters.",
    links: []
  },
  {
    id: "food-delivery",
    title: "Sustainable Food Delivery App",
    year: 2023,
    tags: ["Mobile", "Delivery", "Sustainability"],
    summary: "Eco-conscious delivery platform rewarding green choices.",
    cover: "https://picsum.photos/seed/food/800/500",
    impact: ["20% more bicycle couriers", "Cut emissions by 12 tons/year"],
    role: "UX Researcher",
    problem: "Delivery apps ignored eco-impact of fulfillment.",
    process: "User studies, gamified green incentives, integrated map routing.",
    result: "Users shifted toward greener delivery options.",
    links: []
  },
  {
    id: "sports-analytics",
    title: "Sports Performance Tracker",
    year: 2024,
    tags: ["IoT", "Data Viz", "React"],
    summary: "Wearable-linked dashboard for athletes and coaches.",
    cover: "https://picsum.photos/seed/sports/800/500",
    impact: ["Tracked 5k+ sessions", "Improved sprint times by 11%"],
    role: "Frontend Dev",
    problem: "Athletes lacked usable insights from wearables.",
    process: "Built custom visualizations, synced multiple sensors.",
    result: "Clearer coaching insights, better results.",
    links: []
  },
  {
    id: "language-app",
    title: "Gamified Language Learning App",
    year: 2022,
    tags: ["Education", "Gamification", "Mobile"],
    summary: "Fun, bite-sized learning app with spaced repetition.",
    cover: "https://picsum.photos/seed/language/800/500",
    impact: ["200k+ active users", "5M daily exercises"],
    role: "Mobile Engineer",
    problem: "Learners struggled with retention and motivation.",
    process: "Gamified streaks, adaptive exercises, offline support.",
    result: "High engagement and strong retention.",
    links: []
  },
  {
    id: "smart-city",
    title: "Smart City Traffic Dashboard",
    year: 2023,
    tags: ["IoT", "Dashboards", "Civic Tech"],
    summary: "Real-time analytics for urban traffic management.",
    cover: "https://picsum.photos/seed/city/800/500",
    impact: ["Reduced congestion by 15%", "Improved bus arrival accuracy"],
    role: "Product Engineer",
    problem: "Cities relied on static reports, not real-time traffic data.",
    process: "Integrated sensors, visualized anomalies, built alerts.",
    result: "Faster responses and happier commuters.",
    links: []
  },
  {
    id: "vr-museum",
    title: "Virtual Museum Tour",
    year: 2024,
    tags: ["VR", "Culture", "Education"],
    summary: "Immersive VR tours of world heritage sites.",
    cover: "https://picsum.photos/seed/museum/800/500",
    impact: ["50k+ student tours", "Partnered with 3 museums"],
    role: "3D Dev",
    problem: "Students couldn't access global cultural sites.",
    process: "Built photogrammetry pipeline, optimized VR rendering.",
    result: "Rich educational experiences from anywhere.",
    links: []
  },
  {
    id: "job-match",
    title: "AI Job Matching Platform",
    year: 2025,
    tags: ["AI", "Recruiting", "SaaS"],
    summary: "Platform that matches applicants to jobs by skills, not keywords.",
    cover: "https://picsum.photos/seed/jobs/800/500",
    impact: ["30% better candidate fit", "Faster hiring cycles"],
    role: "Backend Engineer",
    problem: "Keyword search ignored nuanced candidate skills.",
    process: "Built embeddings pipeline, ran recruiter pilot tests.",
    result: "More equitable, efficient job matching.",
    links: []
  },
  {
    id: "crypto-wallet",
    title: "Secure Crypto Wallet",
    year: 2022,
    tags: ["Blockchain", "Security", "React Native"],
    summary: "Mobile-first wallet with multi-sig and biometric security.",
    cover: "https://picsum.photos/seed/wallet/800/500",
    impact: ["10k+ users", "Zero major security incidents"],
    role: "Mobile Engineer",
    problem: "Casual users struggled with key management.",
    process: "Added biometric auth, simple recovery flows.",
    result: "Safer, user-friendly crypto access.",
    links: []
  },
  {
    id: "climate-edu",
    title: "Climate Change Education Hub",
    year: 2023,
    tags: ["Education", "Sustainability", "Web"],
    summary: "Learning hub explaining climate change science.",
    cover: "https://picsum.photos/seed/climate/800/500",
    impact: ["Used in 200+ classrooms", "Boosted student climate literacy"],
    role: "Content Designer",
    problem: "Complex data was inaccessible to students.",
    process: "Simplified narratives, interactive models, quizzes.",
    result: "Clearer understanding and stronger awareness.",
    links: []
  }
];




const BLOG = [
  {
    slug: "designing-with-queries",
    title: "Designing with Queries",
    date: "2025-06-10",
    excerpt: "Why search-first UX changes how people explore your work.",
    author: "Ogwu Search",
    cover: "/covers/designing-with-queries.jpg",
    tags: ["UX", "Design", "Search"],
    content: "Search-driven interfaces are reshaping the way users interact..."
  },
  {
    slug: "banking-ui-trust-signals",
    title: "Banking UI Trust Signals",
    date: "2025-05-02",
    excerpt: "Micro-details that make fintech feel credible and safe.",
    author: "Ogwu Search",
    cover: "/covers/banking-ui-trust.jpg",
    tags: ["Banking", "UI", "Trust"],
    content: "Trust in fintech design doesn’t come from logos alone..."
  },
  {
    slug: "ai-in-customer-support",
    title: "AI in Customer Support",
    date: "2025-04-20",
    excerpt: "How conversational AI is reshaping helpdesks.",
    author: "Ogwu Search",
    cover: "/covers/ai-support.jpg",
    tags: ["AI", "Support", "Customer Experience"],
    content: "Chatbots are evolving into intelligent agents that..."
  },
  {
    slug: "dark-mode-best-practices",
    title: "Dark Mode Best Practices",
    date: "2025-03-18",
    excerpt: "Designing interfaces that feel good at night.",
    author: "Ogwu Search",
    cover: "/covers/dark-mode.jpg",
    tags: ["UI", "Dark Mode", "Accessibility"],
    content: "Dark mode isn’t just inverted colors. It’s about balance..."
  },
  {
    slug: "writing-accessible-forms",
    title: "Writing Accessible Forms",
    date: "2025-02-25",
    excerpt: "Forms are where users succeed or give up.",
    author: "Ogwu Search",
    cover: "/covers/forms.jpg",
    tags: ["Accessibility", "Forms", "UX"],
    content: "Accessible forms start with clear labels, hints, and..."
  },
  {
    slug: "future-of-carnivore-diets",
    title: "Future of Carnivore Diets",
    date: "2025-02-10",
    excerpt: "The cultural shift towards extreme nutrition plans.",
    author: "Ogwu Search",
    cover: "/covers/carnivore.jpg",
    tags: ["Health", "Diet", "Lifestyle"],
    content: "Carnivore diets are moving from fringe to mainstream..."
  },
  {
    slug: "mobile-first-animations",
    title: "Mobile-First Animations",
    date: "2025-01-28",
    excerpt: "Micro-interactions that delight without slowing down apps.",
    author: "Ogwu Search",
    cover: "/covers/animations.jpg",
    tags: ["Mobile", "UI", "Animation"],
    content: "Animations must enhance usability, not distract..."
  },
  {
    slug: "security-by-design",
    title: "Security by Design",
    date: "2025-01-12",
    excerpt: "Making safety invisible but effective.",
    author: "Ogwu Search",
    cover: "/covers/security.jpg",
    tags: ["Security", "Design", "Banking"],
    content: "Design decisions directly affect system safety..."
  },
  {
    slug: "human-centered-ai",
    title: "Human-Centered AI",
    date: "2024-12-30",
    excerpt: "AI must serve people, not replace them.",
    author: "Ogwu Search",
    cover: "/covers/human-ai.jpg",
    tags: ["AI", "Ethics", "UX"],
    content: "The balance between automation and human oversight..."
  },
  {
    slug: "storytelling-in-product-design",
    title: "Storytelling in Product Design",
    date: "2024-12-15",
    excerpt: "Narratives make digital products memorable.",
    author: "Ogwu Search",
    cover: "/covers/storytelling.jpg",
    tags: ["Design", "Storytelling", "Products"],
    content: "Great design is often invisible, but great stories..."
  },
  {
    slug: "gamification-in-banking",
    title: "Gamification in Banking",
    date: "2024-12-01",
    excerpt: "Turning saving money into a rewarding game.",
    author: "Ogwu Search",
    cover: "/covers/gamification.jpg",
    tags: ["Banking", "Gamification", "UX"],
    content: "Gamified saving streaks and rewards systems..."
  },
  {
    slug: "resort-architecture-trends",
    title: "Resort Architecture Trends",
    date: "2024-11-15",
    excerpt: "Designing billion-dollar resorts for future guests.",
    author: "Ogwu Search",
    cover: "/covers/resorts.jpg",
    tags: ["Architecture", "Resorts", "Luxury"],
    content: "Casino resorts are blending entertainment, culture..."
  },
  {
    slug: "building-minimalist-dashboards",
    title: "Building Minimalist Dashboards",
    date: "2024-11-02",
    excerpt: "Clarity is the new luxury in financial apps.",
    author: "Ogwu Search",
    cover: "/covers/dashboards.jpg",
    tags: ["Dashboards", "Finance", "Minimalism"],
    content: "Users want fast insights, not cluttered graphs..."
  },
  {
    slug: "mental-health-and-ui",
    title: "Mental Health and UI",
    date: "2024-10-20",
    excerpt: "How design affects stress and clarity.",
    author: "Ogwu Search",
    cover: "/covers/mental-health.jpg",
    tags: ["UI", "Health", "Wellness"],
    content: "Colors, spacing, and pace of interaction..."
  },
  {
    slug: "inclusive-language-in-ux",
    title: "Inclusive Language in UX",
    date: "2024-10-05",
    excerpt: "Words can welcome or exclude.",
    author: "Ogwu Search",
    cover: "/covers/inclusive-language.jpg",
    tags: ["UX", "Language", "Accessibility"],
    content: "Inclusive UX copy avoids jargon, assumes diversity..."
  },
  {
    slug: "designing-with-motion",
    title: "Designing with Motion",
    date: "2024-09-18",
    excerpt: "Motion guides attention better than static visuals.",
    author: "Ogwu Search",
    cover: "/covers/motion.jpg",
    tags: ["Design", "Motion", "UX"],
    content: "Motion should be purposeful and restrained..."
  },
  {
    slug: "future-of-education-materials",
    title: "Future of Education Materials",
    date: "2024-09-02",
    excerpt: "From textbooks to interactive simulations.",
    author: "Ogwu Search",
    cover: "/covers/education.jpg",
    tags: ["Education", "Tech", "Learning"],
    content: "The educational material industry is shifting..."
  },
  {
    slug: "scroll-driven-experiences",
    title: "Scroll-Driven Experiences",
    date: "2024-08-18",
    excerpt: "Why scrolling is the new clicking.",
    author: "Ogwu Search",
    cover: "/covers/scroll.jpg",
    tags: ["UX", "Scrolling", "Interaction"],
    content: "Scroll-driven websites keep attention longer..."
  },
  {
    slug: "react-vs-vue-ui-design",
    title: "React vs Vue UI Design",
    date: "2024-08-05",
    excerpt: "Different frameworks, different UI mindsets.",
    author: "Ogwu Search",
    cover: "/covers/react-vs-vue.jpg",
    tags: ["React", "Vue", "UI"],
    content: "React emphasizes composition, Vue prioritizes..."
  },
  {
    slug: "small-details-big-impact",
    title: "Small Details, Big Impact",
    date: "2024-07-22",
    excerpt: "Micro UX patterns that build loyalty.",
    author: "Ogwu Search",
    cover: "/covers/details.jpg",
    tags: ["UX", "Micro-interactions", "Design"],
    content: "Every tooltip, hover state, and animation..."
  }
];

// ---------------------- Theme ----------------------
const useTheme = () => {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    if (saved) return saved; // can be 'dark' | 'light' | 'system' (from older sessions)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [prefersDark, setPrefersDark] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true
  );

  // Track OS scheme when user selects 'system'
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setPrefersDark(e.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const effectiveTheme = theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    // Store user's choice (including 'system')
    localStorage.setItem("theme", theme);
  }, [effectiveTheme, theme]);

  return { theme, setTheme };
};

// ---------------------- Layout ----------------------
function Shell({ children }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll & close on Escape when drawer is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.leftHeader}>
          <button aria-label="Toggle menu" style={styles.iconBtn} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" style={styles.brand}>
            <span style={styles.brandMark}>●</span> Ogwusearch
          </Link>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NavLink to="/" label="Home" icon={<HomeIcon size={18} />} />
          <NavLink to="/projects" label="Projects" icon={<Briefcase size={18} />} />
          <NavLink to="/about" label="About" icon={<PenTool size={18} />} />
          <NavLink to="/blog" label="Blog" icon={<BookOpen size={18} />} />
          <NavLink to="/contact" label="Contact" icon={<Mail size={18} />} />
          <div style={{ width: 1, height: 20, background: "var(--border)" }} />
          <button aria-label="Toggle theme" style={styles.iconBtn} onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={styles.drawerOverlay} onClick={() => setOpen(false)}>
          <aside
            style={{ ...styles.drawer, transform: "translateX(0)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <DrawerLink to="/" label="Home" />
            <DrawerLink to="/projects" label="Projects" />
            <DrawerLink to="/about" label="About" />
            <DrawerLink to="/blog" label="Blog" />
            <DrawerLink to="/contact" label="Contact" />
          </aside>
        </div>
      )}

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.footerIcon} aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.footerIcon} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:hello@example.com" style={styles.footerIcon} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
        <div style={{ opacity: 0.8 }}>© {new Date().getFullYear()} Ogwusearch</div>
      </footer>

      <StyleTag />
    </div>
  );
}

function NavLink({ to, label, icon }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} style={{
      display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, padding: "6px 10px",
      borderRadius: 8, textDecoration: "none", color: active ? "var(--text)" : "var(--muted)",
      background: active ? "var(--surface-2)" : "transparent", border: `1px solid ${active ? "var(--border)" : "transparent"}`
    }}>
      {icon}
      {label}
    </Link>
  );
}

function DrawerLink({ to, label }) {
  return (
    <Link to={to} style={{
      display: "block", padding: 12, textDecoration: "none", color: "var(--text)", borderRadius: 8,
    }}>
      {label}
    </Link>
  );
}

// ---------------------- Pages ----------------------
function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);

  const tags = useMemo(() => Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter(p => {
      const matchText = (
        p.title + " " + p.summary + " " + p.tags.join(" ")
      ).toLowerCase().includes(q);
      const matchTags = selected.length === 0 || selected.every(t => p.tags.includes(t));
      return matchText && matchTags;
    });
  }, [query, selected]);

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <section style={styles.hero}>
        <div style={{ display: "grid", gap: 12 }}>
          <h1 style={styles.h1}>What do you want to discover about <em style={{ fontStyle: "normal", color: "var(--brand)" }}>Ogwusearch</em>?</h1>
          <p style={styles.muted}>Type a query or try quick filters to explore projects and case studies.</p>
        </div>
        <div style={styles.searchWrap}>
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Try: fintech, dashboard, search, brand…"
            style={styles.searchInput}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span style={styles.badge}>Results: {results.length}</span>
          <span style={{ opacity: 0.7 }}>|</span>
          <Filter size={16} />
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setSelected(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t])}
              style={{
                ...styles.chip,
                background: selected.includes(t) ? "var(--surface-2)" : "transparent",
                borderColor: selected.includes(t) ? "var(--border)" : "var(--border)"
              }}
            >
              {t}
            </button>
          ))}
          {selected.length > 0 && (
            <button onClick={() => setSelected([])} style={{ ...styles.chip, borderStyle: "dashed" }}>Clear</button>
          )}
        </div>
      </section>

      <section>
        <div style={styles.sectionHeader}>
          <h2 style={styles.h2}>Projects</h2>
          <Link to="/projects" style={styles.linkBtn}>
            View all <ExternalLink size={16} />
          </Link>
        </div>
        <ProjectGrid items={results} />
      </section>

      <section>
        <h2 style={styles.h2}>Search Logs (Blog)</h2>
        <div style={styles.blogList}>
          {BLOG.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} style={styles.blogCard}>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{p.date}</div>
              <p style={{ margin: 0 }}>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={styles.h1}>All Projects</h1>
      <ProjectGrid items={PROJECTS} />
    </div>
  );
}

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return <NotFound />;

  return (
    <article style={{ display: "grid", gap: 18 }}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        <ArrowLeft size={16} /> Back
      </button>
      <img src={project.cover} alt="cover" style={styles.cover} />
      <h1 style={styles.h1}>{project.title}</h1>
      <MetaRow year={project.year} tags={project.tags} role={project.role} />
      <p style={{ margin: 0 }}>{project.summary}</p>
      <SectionBlock title="Problem" text={project.problem} />
      <SectionBlock title="Process" text={project.process} />
      <SectionBlock title="Result" text={project.result} />
      {project.impact?.length > 0 && (
        <div>
          <h3 style={styles.h3}>Impact</h3>
          <ul>
            {project.impact.map((item, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function AboutPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={styles.h1}>About</h1>
      <p style={{ margin: 0 }}>
        I craft search-first product experiences that surface relevance in 1–2 clicks. My work spans
        fintech dashboards, secure investor portals, and knowledge-rich portfolios.
      </p>
      <div style={styles.kg}>
        {["Tech", "Design", "Strategy", "Content", "Data"].map(n => (
          <div key={n} style={styles.kgNode}>{n}</div>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={styles.h1}>Search Logs</h1>
      <div style={styles.blogList}>
        {BLOG.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} style={styles.blogCard}>
            <div style={{ fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{p.date}</div>
            <p style={{ margin: 0 }}>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const author = post.author || "Ogwusearch";
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const cover = post.cover;

  return (
    <article style={{ display: "grid", gap: 12 }}>
      <h1 style={styles.h1}>{post.title}</h1>
      <div style={{ fontSize: 14, opacity: 0.7 }}>
        {post.date} — by {author}
      </div>
      {cover && <img src={cover} alt={post.title} style={styles.cover} />}
      {tags.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>
      )}
      {post.excerpt && <p style={{ marginTop: 4 }}>{post.excerpt}</p>}
      {post.content ? (
        <div style={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <p>(Full post coming soon.)</p>
      )}
    </article>
  );
}

function ContactPage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={styles.h1}>Contact</h1>
      <form onSubmit={e => e.preventDefault()} style={styles.form}>
        <label style={styles.label}>Your Name<input style={styles.input} placeholder="Jane Doe" /></label>
        <label style={styles.label}>Your Email<input type="email" style={styles.input} placeholder="jane@doe.com" /></label>
        <label style={styles.label}>Message<textarea style={styles.textarea} placeholder="Tell me about your project…" rows={5} /></label>
        <button style={styles.primaryBtn}>Send</button>
      </form>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1 style={styles.h1}>404</h1>
      <p>That page could not be found.</p>
      <Link to="/" style={styles.linkBtn}><ArrowLeft size={16} /> Go Home</Link>
    </div>
  );
}

// ---------------------- Components ----------------------
function ProjectGrid({ items }) {
  return (
    <div style={styles.grid}>
      {items.map(p => (
        <Link key={p.id} to={`/projects/${p.id}`} style={styles.card}>
          <img src={p.cover} alt="cover" style={styles.thumb} />
          <div style={styles.cardBody}>
            <div style={styles.cardTitleRow}>
              <div style={styles.cardTitle}>{p.title}</div>
              <div style={styles.year}>{p.year}</div>
            </div>
            <p style={{ margin: 0, opacity: 0.85 }}>{p.summary}</p>
            <div style={styles.tagRow}>
              {p.tags.slice(0, 4).map(t => (
                <span key={t} style={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function MetaRow({ year, tags, role }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
      <span style={styles.badge}>{year}</span>
      <span style={{ opacity: 0.6 }}>•</span>
      <span style={styles.badge}>{role}</span>
      <span style={{ opacity: 0.6 }}>•</span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
      </div>
    </div>
  );
}

function SectionBlock({ title, text }) {
  return (
    <section>
      <h3 style={styles.h3}>{title}</h3>
      <p style={{ margin: 0 }}>{text}</p>
    </section>
  );
}

// ---------------------- App Root ----------------------
export default function App() {
  return (
    <Router>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </Router>
  );
}

// ---------------------- Styles ----------------------
function StyleTag() {
  return (
    <style>{`
      :root {
        --bg: #0b0c10;
        --surface: #111218;
        --surface-2: #161925;
        --text: #e6e7eb;
        --muted: #a9adba;
        --border: #2b2f3a;
        --brand: #5ee6b3; /* mint/cyan accent */
        --shadow: 0 10px 20px rgba(0,0,0,.25);
      }
      :root[data-theme="light"] {
        --bg: #ffffff;
        --surface: #f8f9fb;
        --surface-2: #eef1f7;
        --text: #0f1220;
        --muted: #5b6172;
        --border: #d7dbe7;
        --brand: #0ea5e9; /* cyan accent in light */
        --shadow: 0 10px 20px rgba(0,0,0,.08);
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: var(--bg); color: var(--text); }
      img { display: block; max-width: 100%; }
      a { color: inherit; }
      input, textarea, button { font: inherit; }
      ::selection { background: var(--brand); color: var(--bg); }
      @media (max-width: 860px) {
        .grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

const styles = {
  app: { minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto", background: "var(--bg)", color: "var(--text)" },
  header: { position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, var(--bg), rgba(0,0,0,0))" },
  leftHeader: { display: "flex", alignItems: "center", gap: 10 },
  brand: { display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, textDecoration: "none" },
  brandMark: { color: "var(--brand)" },
  nav: { display: "flex", alignItems: "center", gap: 12 },
  iconBtn: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer" },
  divider: { width: 1, height: 20, background: "var(--border)" },
  drawer: { position: "fixed", top: 0, left: 0, bottom: 0, width: 300, padding: 16, borderRight: "1px solid var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)", display: "grid", gap: 6, transform: "translateX(-100%)", transition: "transform 220ms ease", zIndex: 60 },
  drawerOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)", zIndex: 50, display: "flex" },
  main: { padding: 16, maxWidth: 1120, margin: "0 auto", width: "100%" },
  footer: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderTop: "1px solid var(--border)", background: "var(--surface)" },
  footerIcon: { display: "inline-flex", alignItems: "center" },

  skipLink: { position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" },

  hero: { display: "grid", gap: 14, padding: 18, border: "1px solid var(--border)", background: "linear-gradient(180deg, var(--surface), var(--surface-2))", borderRadius: 14, boxShadow: "var(--shadow)" },
  h1: { fontSize: 34, margin: 0, lineHeight: 1.2 },
  h2: { fontSize: 22, margin: "0 0 10px" },
  h3: { fontSize: 18, margin: "10px 0" },
  muted: { color: "var(--muted)", margin: 0 },

  searchWrap: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg)" },
  searchInput: { outline: "none", border: 0, background: "transparent", color: "var(--text)", width: "100%" },

  badge: { padding: "6px 10px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--border)", fontSize: 12 },
  chip: { padding: "6px 10px", borderRadius: 999, border: "1px solid", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13 },

  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 },
  card: { display: "grid", gap: 8, textDecoration: "none", color: "inherit", border: "1px solid var(--border)", background: "var(--surface)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow)" },
  thumb: { width: "100%", height: 180, objectFit: "cover" },
  cardBody: { padding: 12, display: "grid", gap: 8 },
  cardTitleRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  cardTitle: { fontWeight: 700 },
  year: { fontSize: 12, opacity: 0.7 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: { fontSize: 12, padding: "4px 8px", borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--border)" },

  blogList: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  blogCard: { display: "grid", gap: 6, padding: 12, borderRadius: 12, border: "1px solid var(--border)", textDecoration: "none", background: "var(--surface)" },

  backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 10px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", textDecoration: "none", color: "inherit" },
  cover: { width: "100%", height: 360, objectFit: "cover", borderRadius: 14, border: "1px solid var(--border)" },

  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  linkBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 10px", borderRadius: 10, border: "1px solid var(--border)", textDecoration: "none" },

  form: { display: "grid", gap: 12, maxWidth: 540 },
  label: { display: "grid", gap: 6, fontSize: 14 },
  input: { padding: 10, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)" },
  textarea: { padding: 10, borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)" },

  kg: { display: "flex", gap: 10, flexWrap: "wrap" },
  kgNode: { padding: "8px 10px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface-2)" },
};
