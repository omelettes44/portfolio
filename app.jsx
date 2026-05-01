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
  { abbr: "Fg", name: "Figma", img: "assets/programs/figma.png" },
  { abbr: "Ps", name: "Photoshop", img: "assets/programs/photoshop.png" },
  { abbr: "Ai", name: "Illustrator", img: "assets/programs/illustrator.png" },
  { abbr: "Ae", name: "After Effects", img: "assets/programs/after-effects.png" },
  { abbr: "Id", name: "InDesign", img: "assets/programs/indesign.png" },
  { abbr: "Fr", name: "Framer", img: "assets/programs/framer.png" },
  { abbr: "Kn", name: "Keynote", img: "assets/programs/keynote.png" },
  { abbr: "Pt", name: "Powerpoint", img: "assets/programs/powerpoint.png" },
  { abbr: "Gs", name: "Google Slides", img: "assets/programs/google-slides.png" },
  { abbr: "Sk", name: "Sketchup", img: "assets/programs/sketchup.png" },
  { abbr: "Cl", name: "Claude", img: "assets/programs/Claude.png" },
  { abbr: "Vs", name: "Visual Studio Code", img: "assets/programs/visual-studio-code.png" },
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
    images: {
      thumbnail: "projects/meta-pt/thumb-2.jpg",  // For grid tile
      hero: "projects/meta-pt/02.jpg",         // For modal top
      gallery: [                                      // For modal gallery section
        "projects/meta-pt/meta_tabs_01.gif",
        "projects/meta-pt/12.jpg",
        "projects/meta-pt/10.jpg",
        "projects/meta-pt/06.jpg",
        "projects/meta-pt/09.jpg",
        "projects/meta-pt/13.jpg",
        "projects/meta-pt/04.jpg",
        "projects/meta-pt/14.jpg",
      ]
    },
    title: "Meta Pro Team",
    sub: "Brand Identity & design system – B2B Program",
    client: "Meta",
    role: "Lead Designer",
    services: "Brand Identity, Design System, Art Direction",
    blurb: "A new visual language for a Meta's B2B marketing service. From staging photoshoots on three continents to devising a unified system of iconography, color, and messaging, we designed a branded offer that scales internationally. ",
    body: "Our assets serve a global audience, remain translation-friendly, and support internal teams with comprehensive guidance on use cases across Meta’s channels and platforms. The collection of still photos, motion assets, component library, and usage guidelines are published to the company’s internal brand portal."
  },
  {
    id: "p2",
    cls: "t-b",
    art: "art-2",
    images: {
      thumbnail: "projects/meta-campaign/thumb.jpg",  // For grid tile
      hero: "projects/meta-campaign/01.jpg",         // For modal top
      gallery: [                                      // For modal gallery section
        "projects/meta-campaign/02.jpg",
        "projects/meta-campaign/08.jpg",
        "projects/meta-campaign/06.jpg",
        "projects/meta-campaign/04.jpg",
        "projects/meta-campaign/05.jpg",
        "projects/meta-campaign/07.jpg",
      ]
    },
    title: "Meta Campaigns",
    sub: "Visual and marketing design",
    client: "Meta",
    role: "Visual Designer",
    services: "Marketing Design, Web Design",
    blurb: "Designing cohesive B2B campaigns across digital touchpoints.",
    body: "Working across a high volume of B2B campaigns, I developed visual assets for landing pages, email, and social in close collaboration with cross-functional teams. I focused on crafting clean, eye-catching graphics that maintained consistency with the Meta for Business brand while adapting to different verticals and campaign needs."
  },
  {
    id: "p3",
    cls: "t-c",
    art: "art-3",
    images: {
      thumbnail: "projects/human-interest/thumb-2.jpg",  // For grid tile
      hero: "projects/human-interest/00.jpg",         // For modal top
      gallery: [                                      // For modal gallery section
        "projects/human-interest/01.jpg",
        "projects/human-interest/02.jpg",
        "projects/human-interest/03.jpg",
        "projects/human-interest/04.jpg",
      ]
    },
    title: "Human Interest",
    sub: "Information design and brand strategy",
    client: "Human Interest",
    role: "Visual Designer",
    services: "Information Design, Brand Strategy",
    blurb: "A digital infographic for Human Interest, a fintech company and 401k provider for small and medium sized businesses.",
    body: "I served as their sole in-house designer, working closely with the marketing team on brand development, digital campaigns, gated content, and inbound growth. This infographic is the culmination of visual design, market research, and brand strategy, positioning Human Interest as an access point to critical information, supporting retirement savings solutions.",
  },
  {
    id: "p4",
    cls: "t-d",
    art: "art-4",
    images: {
      thumbnail: "projects/Fluctuate/thumb.jpg",  // For grid tile
      hero: "projects/fluctuate/01.gif",         // For modal top
      gallery: [          
        "projects/fluctuate/09.jpg",
        "projects/fluctuate/11.jpg",                       // For modal gallery section
        "projects/fluctuate/02.jpg",
        "projects/fluctuate/03.jpg",
        "projects/fluctuate/04.jpg",
        "projects/fluctuate/05.jpg",
        "projects/fluctuate/06.jpg",
        "projects/fluctuate/07.jpg",
        "projects/fluctuate/10.jpg",
        "projects/fluctuate/14.jpg",
        "projects/fluctuate/15.jpg",
        "projects/fluctuate/16.jpg",
      ]
    },
    year: "2024",
    title: "Fluctuate",
    sub: "Editorial and print design",
    client: "Personal Project",
    role: "Creative",
    services: "Logomaking, Editorial Design, Motion",
    year_full: "2024",
    blurb: "Fluctuate Zine was born as an outlet to explore tension, change, and mental health. The first issue focused on food recipes, grocery items, and flavors as grounding sensory experiences.",
    body: "One of my favorite quotes is that it's hard to write something polished, and even harder to write something that is honest. I kept that in mind while approaching this personal project, allowing intuition the space to create freely. What resulted visually is a spotlight on typography, textures, and negative space."
  },
  {
    id: "p5",
    cls: "t-e",
    art: "art-5",
    images: {
      thumbnail: "projects/fluctuate/thumb.jpg",  // For grid tile
      hero: "projects/fluctuate/01.gif",         // For modal top
      gallery: [          
        "projects/fluctuate/09.jpg",
        "projects/fluctuate/11.jpg",                       // For modal gallery section
        "projects/fluctuate/02.jpg",
        "projects/fluctuate/03.jpg",
        "projects/fluctuate/04.jpg",
        "projects/fluctuate/05.jpg",
        "projects/fluctuate/06.jpg",
        "projects/fluctuate/07.jpg",
        "projects/fluctuate/10.jpg",
        "projects/fluctuate/14.jpg",
        "projects/fluctuate/15.jpg",
        "projects/fluctuate/16.jpg",
      ]
    },
    title: "Experiential",
    sub: "Experiential and production design",
    client: "Various",
    role: "Graphic and Interactive Designer",
    services: "Experiential Design, Production Design, Installation",
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
                    <img src={p.img} alt={p.name} />
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
      <div className={`tile__art ${p.art}`}>
        {p.images?.thumbnail && (
          <img 
            src={p.images.thumbnail} 
            alt={p.title}
            className="tile__image"
          />
        )}
      </div>
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
              {/* Hero image with CSS art fallback */}
              <div className={`modal__hero tile__art ${project.art}`}>
                {project.images?.hero && (
                  <img 
                    src={project.images.hero} 
                    alt={project.title}
                    className="modal__hero-image"
                  />
                )}
              </div>
              
              <h2 className="modal__title">{project.title}</h2>
              <p className="modal__sub">{project.blurb}</p>
              
              <dl className="modal__meta">
                <div><dt>Client</dt><dd>{project.client}</dd></div>
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Services</dt><dd>{project.services}</dd></div>
              </dl>
              
              <p>{project.body}</p>
              
              {/* Gallery with real images OR CSS art fallback */}
              <div className="modal__shots">
                {project.images?.gallery ? (
                  project.images.gallery.map((imgSrc, idx) => (
                    <div key={idx} className={`modal__shot-image ${idx === 0 ? 'full' : ''}`}>
                      <img 
                        src={imgSrc} 
                        alt={`${project.title} - Detail ${idx + 1}`}
                        className="modal__shot-image"
                      />
                    </div>
                  ))
                ) : (
                  // Fallback to CSS art if no images
                  <>
                    <div className={`modal__shot full tile__art ${project.art}`} />
                    <div className={`modal__shot tile__art ${project.art}`} style={{ filter: "hue-rotate(20deg)" }} />
                    <div className={`modal__shot tile__art ${project.art}`} style={{ filter: "hue-rotate(-30deg) saturate(0.85)" }} />
                  </>
                )}
              </div>
              <p> </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ----- App ----- */

function App() {
  const tweaks = {
  processColor: "#3856CF",
  navStyle: "squares"
};

  // active section index — order: work=0, process=1, person=2
  const [active, setActive] = useState(0); 
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

    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
