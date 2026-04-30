const { useState, useEffect, useRef, useCallback } = React;

/* ----------------------------- Data ----------------------------- */

const PERSON_COPY = [
  "After studying design at Pratt Institute, I worked for several years at a creative experiential agency in New York City. In 2018, I relocated to San Francisco, where I've since been freelancing and working in-house with tech companies across the Bay Area.",
  "My interests shift from time to time but a consistent aspect is one of design — the joy of shaping and participation.",
  "Outside of work, I'm often deep-diving on one of my sporadic curiosities, doing gel-x nail art for my friends, and building towns in Animal Crossing."
];

const PROCESS_LEAD = "I'm a multidisciplinary designer interested in storytelling and transformation through visual design. From the briefing room to concepting to execution, I'm inspired by vision-driven design solutions that shape meaningful narratives, encourage connection, and are enjoyable to experience.";

const FOCUSES = ["Brand Strategy", "Brand Identity Systems", "Art Direction"];
const DISCIPLINES = ["Marketing Design", "Web & Digital Design", "Experiential Design", "Presentation Design", "Illustration", "Motion"];

const PROGRAMS = [
  { abbr: "Fg", name: "Figma" },
  { abbr: "Ps", name: "Photoshop" },
  { abbr: "Ai", name: "Illustrator" },
  { abbr: "Ae", name: "After Effects" },
  { abbr: "Id", name: "InDesign" },
  { abbr: "Fr", name: "Framer" },
  { abbr: "Sp", name: "Spline" },
  { abbr: "Ty", name: "Typography" },
  { abbr: "Mj", name: "Midjourney" },
  { abbr: "Cn", name: "Cinema 4D" },
  { abbr: "Nt", name: "Notion" }
];

const PRINCIPLES = [
  { num: "01", title: "Listen first, sketch second.", body: "Every project starts in conversation. The brief is just the entry point — the real work is finding the unsaid thing the team can't name yet." },
  { num: "02", title: "Systems, not snapshots.", body: "I design for the long arc: tokens, components, rituals. A logo is the easy part; what's hard is the hundredth touchpoint still feeling like the first." },
  { num: "03", title: "Make it enjoyable.", body: "Delight isn't decoration. A well-placed surprise — a wink, a curve, a soft transition — is how brands become memories." }
];

const PROJECTS = [
  {
    id: "p1",
    cls: "t-a",
    art: "art-1",
    year: "2025",
    title: "Meta Pro Team",
    sub: "Brand identity & design system – B2B Program",
    client: "Sundial Health",
    role: "Lead Designer",
    services: "Brand Identity, Web Design, Art Direction",
    year_full: "2024 — 2025",
    blurb: "A new visual language for a preventative care startup. We built a wordmark, color system, and narrative architecture that reframed annual checkups as something to look forward to — not avoid.",
    body: "Sundial came to us a year before launch. They had a strong clinical model and a name that hinted at warmth, but the existing identity felt like every other healthcare brand: blue, sterile, faintly defensive. We rebuilt the identity around a single idea — that the body keeps time, and good design helps you read the dial. The mark, color system, and editorial voice all flow from that metaphor."
  },
  {
    id: "p2",
    cls: "t-b",
    art: "art-2",
    year: "2025",
    title: "America's Retirement Crisis",
    sub: "Information Design — Fintech",
    client: "Foundry",
    role: "Systems Lead",
    services: "Design System, Component Library, Documentation",
    year_full: "2025",
    blurb: "Foundry's first proper design system. 240+ components, six surfaces, three product teams shipping from a shared truth. The hard part wasn't the tokens — it was the rituals that keep them used.",
    body: "When I joined, Foundry had three platforms (web app, partner dashboard, admin console) and no shared component library between them. The system we shipped is opinionated where it should be — type, spacing, motion — and quiet where it shouldn't (color, copy). It's been adopted by every product squad and now ships about 40% faster than before."
  },
  {
    id: "p3",
    cls: "t-c",
    art: "art-3",
    year: "2024",
    title: "Helio Field Guide",
    sub: "Print & editorial",
    client: "Helio Climate",
    role: "Art Director",
    services: "Editorial Design, Illustration, Print Production",
    year_full: "2024",
    blurb: "A 96-page field guide for community climate organizers. Designed to be folded, dog-eared, written in. Printed on uncoated stock with a single-spot fluorescent.",
    body: "Helio wanted a guide that wouldn't sit on a shelf. We designed for use — wide gutters, generous leading, room for marginalia. The cover is letterpressed; interior is on Munken Lynx 100gsm. We printed 5,000 in the first run, all distributed in person."
  },
  {
    id: "p4",
    cls: "t-d",
    art: "art-4",
    year: "2024",
    title: "Loop Festival",
    sub: "Identity & wayfinding",
    client: "Loop SF",
    role: "Lead Designer",
    services: "Identity, Wayfinding, Motion",
    year_full: "2024",
    blurb: "A circular generative identity for a 3-day music festival in Golden Gate Park. Every artist got their own variant of the mark, derived from their sonic palette.",
    body: "The brief: an identity that scales from a phone screen to a 40-foot stage backdrop. The answer was a generative system — a single core mark that responds to audio, to light, to time of day. We built the generator in TouchDesigner; the rendered outputs went on tickets, totes, the stage screens, and 4 different beer cans."
  },
  {
    id: "p5",
    cls: "t-e",
    art: "art-5",
    year: "2023",
    title: "OneEdition ",
    sub: "Packaging — F&B",
    client: "Maison Brûlé",
    role: "Designer",
    services: "Packaging, Illustration",
    year_full: "2023",
    blurb: "Limited-edition hot sauce packaging for a small-batch sauce maker. Hand-illustrated label, foil-stamped seal, recyclable mono-material bottle.",
    body: "A side project that turned into a regular client. Maison Brûlé is run by two friends out of a kitchen in Oakland. Each edition gets its own label illustration based on the dominant pepper. The bottles ship in a cardboard sleeve printed with linseed-oil ink."
  }
];

const CLIENTS = [
  { name: "Meta", logo: "assets/logos/meta.png" },
  { name: "Roblox", logo: "assets/logos/roblox.png" },
  { name: "Human Interest", logo: "assets/logos/human-interest.png" },
  { name: "The Participation Agency", logo: "assets/logos/participation-agency.png" },
  { name: "Apple", logo: "assets/logos/apple.png" },
  { name: "Transparent Clinch Gallery", logo: "assets/logos/clinch.png" },
  { name: "Mondelēz International", logo: "assets/logos/mondelez.png" }
];

/* ----------------------------- Helpers ----------------------------- */

function useEscape(active, onEscape) {
  useEffect(() => {
    if (!active) return;
    const h = (e) => { if (e.key === "Escape") onEscape(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, onEscape]);
}

/* ----------------------------- Components ----------------------------- */

function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18"/>
      <line x1="18" y1="6" x2="6" y2="18"/>
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand__name">jess leung</span>
        <span className="brand__role">visual designer — san francisco</span>
      </div>
    </header>
  );
}

function FloatingNav({ activeIdx, onNav, style = "squares" }) {
  // Order: Work (0), Process (1), Person (2)
  const labels = ["The Work", "The Process", "The Person"];
  const shorts = ["Work", "Process", "Person"];
  const nums = ["01", "02", "03"];
  const pageKey = ["work","process","person"][activeIdx];
  const icons = [GridIcon, FlowIcon, FaceIcon];

  if (style === "pill") {
    return (
      <nav className={`fnav fnav--pill fnav--${pageKey}`} aria-label="Sections">
        <span className="fnav-pill__thumb" style={{ transform: `translateX(${activeIdx * 100}%)` }} />
        {shorts.map((l, i) => (
          <button key={i} className="fnav-pill__btn" aria-current={activeIdx === i} onClick={() => onNav(i)}>
            {l}
          </button>
        ))}
      </nav>
    );
  }

  if (style === "dots") {
    return (
      <nav className={`fnav fnav--dots fnav--${pageKey}`} aria-label="Sections">
        {labels.map((l, i) => (
          <button key={i} className="fnav-dot" aria-current={activeIdx === i} aria-label={l} title={l} onClick={() => onNav(i)}>
            <span className="fnav-dot__core" />
            <span className="fnav-dot__label">{shorts[i]}</span>
          </button>
        ))}
      </nav>
    );
  }

  if (style === "numbers") {
    return (
      <nav className={`fnav fnav--numbers fnav--${pageKey}`} aria-label="Sections">
        {labels.map((l, i) => (
          <button key={i} className="fnav-num" aria-current={activeIdx === i} aria-label={l} title={l} onClick={() => onNav(i)}>
            <span className="fnav-num__n">{nums[i]}</span>
            <span className="fnav-num__l">{shorts[i]}</span>
          </button>
        ))}
      </nav>
    );
  }

  if (style === "minimal") {
    return (
      <nav className={`fnav fnav--minimal fnav--${pageKey}`} aria-label="Sections">
        {labels.map((l, i) => (
          <button key={i} className="fnav-min" aria-current={activeIdx === i} aria-label={l} onClick={() => onNav(i)}>
            <span className="fnav-min__line" />
            <span className="fnav-min__label">{shorts[i]}</span>
          </button>
        ))}
      </nav>
    );
  }

  // default: squares (current)
  return (
    <nav className={`fnav floating-nav floating-nav--${pageKey}`} aria-label="Sections">
      {labels.map((l, i) => {
        const Icon = icons[i];
        return (
          <button
            key={i}
            className="nav__btn"
            aria-current={activeIdx === i}
            aria-label={l}
            title={l}
            onClick={() => onNav(i)}
          >
            <Icon />
          </button>
        );
      })}
    </nav>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}
function FlowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="12" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M8 6h6a4 4 0 0 1 4 4v0" />
      <path d="M16 12a4 4 0 0 1-4 4H8" />
    </svg>
  );
}
function FaceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="4" />
      <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

function ConnectFooter({ variant = "light" }) {
  return (
    <footer className="connect">
      <div>
        <div className="connect__label">Connect with me</div>
        <div className="connect__cta">
          <a className="btn-pill" href="mailto:hi@jesslikes.work">
            <span className="btn-pill__label">Send an email</span> <ArrowIcon />
          </a>
          <a className="btn-text" href="https://www.linkedin.com/in/jess-leung-77897010b/" target="_blank" rel="noopener">
            <span className="slide-inner">
              <span className="slide-top">LinkedIn</span>
              <span className="slide-bot">LinkedIn</span>
            </span>
          </a>
        </div>
      </div>
      <div className="copyright">© jess leung 2026</div>
    </footer>
  );
}

/* ----- Person ----- */

function PersonPage() {
  return (
    <div className="page page--person">
      <Header />
      <main className="section">
        <h1 className="title">The Person</h1>

        <div className="person__grid person__grid--single">
          <div>
            <div className="person__copy">
              {PERSON_COPY.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </main>
      <ConnectFooter />
    </div>
  );
}

/* ----- Process ----- */

function ProcessPage({ processColor }) {
  return (
    <div className="page page--process" style={{ background: processColor }}>
      <Header />
      <main className="section">
        <h1 className="title">The Process</h1>

        <p className="process__lead">{PROCESS_LEAD}</p>

        <div className="process__grid">
          <div className="process__lists">
            <dl className="deflist">
              <dt>Focuses</dt>
              <dd>{FOCUSES.map((f, i) => <div key={i}>{f}</div>)}</dd>

              <dt>Disciplines</dt>
              <dd>{DISCIPLINES.map((d, i) => <div key={i}>{d}</div>)}</dd>
            </dl>

            <div className="programs">
              <div className="programs__label">Programs</div>
              <div className="programs__grid">
                {PROGRAMS.map((p, i) => (
                  <div key={i} className="prog">
                    {p.abbr}
                    <span className="prog__tip">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ConnectFooter variant="blue" />
    </div>
  );
}

/* ----- Work ----- */

function Tile({ p, onOpen }) {
  return (
    <button className={`tile ${p.cls}`} onClick={() => onOpen(p)} aria-label={`Open ${p.title}`}>
      <div className={`tile__art ${p.art}`} />
      <span className="tile__open" aria-hidden="true">
        <PlusIcon />
      </span>
      <div className="tile__overlay">
        <div className="tile__title">{p.title}</div>
        <div className="tile__sub">{p.sub}</div>
      </div>
    </button>
  );
}

function WorkPage({ onOpenProject }) {
  return (
    <div className="page page--work">
      <Header />
      <main className="section">
        <h1 className="title">The Work</h1>

        <div className="grid">
          {PROJECTS.map((p) => (
            <Tile key={p.id} p={p} onOpen={onOpenProject} />
          ))}
        </div>

        <section className="clients" aria-label="Previously worked with">
          <div className="clients__label">Previously worked with</div>
          <div className="clients__row">
            {CLIENTS.map((c, i) => (
              <span key={i} className="client" title={c.name}>
                <img src={c.logo} alt={c.name} />
              </span>
            ))}
          </div>
        </section>
      </main>
      <ConnectFooter variant="dark" />
    </div>
  );
}

/* ----- Modal ----- */

function ProjectModal({ project, onClose }) {
  const open = !!project;
  useEscape(open, onClose);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className={`modal-backdrop ${open ? "is-open" : ""}`} onClick={onClose} />
      <div className={`modal ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={project?.title}>
        {project && (
          <>
            <div className="modal__head">
              <div className="modal__crumbs">the work / {project.client}</div>
              <button className="modal__close" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal__body">
              <div className={`modal__hero tile__art ${project.art}`} style={{ position: "relative" }} />
              <h2 className="modal__title">{project.title}</h2>
              <p className="modal__sub">{project.blurb}</p>
              <dl className="modal__meta">
                <div><dt>Client</dt><dd>{project.client}</dd></div>
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Services</dt><dd>{project.services}</dd></div>
                <div><dt>Year</dt><dd>{project.year_full}</dd></div>
              </dl>
              <p>{project.body}</p>
              <div className="modal__shots">
                <div className={`modal__shot full tile__art ${project.art}`} />
                <div className={`modal__shot tile__art ${project.art}`} style={{ filter: "hue-rotate(20deg)" }} />
                <div className={`modal__shot tile__art ${project.art}`} style={{ filter: "hue-rotate(-30deg) saturate(0.85)" }} />
              </div>
              <p>Process notes, the false starts, the things we learned. (Drop additional copy + asset rows here per case study.)</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ----- App ----- */

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // active section index — order: work=0, process=1, person=2
  const startIdx = { work: 0, process: 1, person: 2 }[tweaks.showStartingScreen] ?? 0;
  const [active, setActive] = useState(startIdx);
  const [openProject, setOpenProject] = useState(null);

  // Hash-based navigation so sections are linkable
  useEffect(() => {
    const map = ["work", "process", "person"];
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      const i = map.indexOf(h);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const nav = useCallback((i) => {
    setActive(i);
    const map = ["work", "process", "person"];
    if (window.history.replaceState) {
      window.history.replaceState(null, "", "#" + map[i]);
    }
    // Scroll the now-active layer to top
    requestAnimationFrame(() => {
      const layers = document.querySelectorAll(".layer");
      if (layers[i]) layers[i].scrollTop = 0;
    });
  }, []);

  // Expose nav for header buttons (avoid prop-drilling everywhere)
  useEffect(() => { window.__nav = nav; }, [nav]);

  // Apply density tweak
  useEffect(() => {
    document.body.dataset.density = tweaks.density;
  }, [tweaks.density]);

  // Apply accent tweak
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accentColor);
  }, [tweaks.accentColor]);

  return (
    <>
      <div className="stage">
        <div className={`layer ${active === 0 ? "is-active" : ""}`} aria-hidden={active !== 0}>
          <WorkPage onOpenProject={setOpenProject} />
        </div>
        <div className={`layer ${active === 1 ? "is-active" : ""}`} aria-hidden={active !== 1}>
          <ProcessPage processColor={tweaks.processColor} />
        </div>
        <div className={`layer ${active === 2 ? "is-active" : ""}`} aria-hidden={active !== 2}>
          <PersonPage />
        </div>
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />

      <FloatingNav activeIdx={active} onNav={nav} style={tweaks.navStyle} />

      <TweaksPanel>
        <TweakSection label="Look & Feel" />
        <TweakColor
          label="Process page color"
          value={tweaks.processColor}
          onChange={(v) => setTweak("processColor", v)}
        />
        <TweakColor
          label="Email button accent"
          value={tweaks.accentColor}
          onChange={(v) => setTweak("accentColor", v)}
        />

        <TweakSection label="Layout" />
        <TweakSelect
          label="Nav style"
          value={tweaks.navStyle}
          options={[
            { value: "squares", label: "Squares (default)" },
            { value: "pill", label: "Segmented pill" },
            { value: "dots", label: "Dots" },
            { value: "numbers", label: "Numbered tabs" },
            { value: "minimal", label: "Minimal lines" }
          ]}
          onChange={(v) => setTweak("navStyle", v)}
        />
        <TweakRadio
          label="Density"
          value={tweaks.density}
          options={[{ value: "default", label: "Default" }, { value: "tight", label: "Tight" }]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakRadio
          label="Start on"
          value={tweaks.showStartingScreen}
          options={[
            { value: "person", label: "Person" },
            { value: "process", label: "Process" },
            { value: "work", label: "Work" }
          ]}
          onChange={(v) => setTweak("showStartingScreen", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
