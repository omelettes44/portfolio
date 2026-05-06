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
  { abbr: "Sk", name: "SketchUp", img: "assets/programs/sketchup.png" },
  { abbr: "Cl", name: "Claude", img: "assets/programs/claude.png" },
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
      thumbnail: "projects/meta-pt/thumb-2.jpg",
      hero: "projects/meta-pt/02.jpg",
    },
    title: "Meta Pro Team",
    sub: "Brand strategy & design system – B2B Program",
    password: "infiniteloop",
    company: "Meta",
    role: "Lead Designer",
    scope: "Brand Strategy, Design System, Art Direction",
    credits: "Creative Director / Linlin Yang \n Global Marketing Manager / Tiffany Tran \n Copywriter / Brittany Simons \n Agency Partner / Bone + Gold, Rachel Dorsey",
    blurb: "A new visual language for Meta's B2B marketing service. From photoshoots to devising a unified system of iconography, color, and messaging, we designed a branded offer that scales internationally.",
    contentBlocks: [
      {
        type: "text",
        content: "Working closely with our Creative Director, I helped every step of the way from pre-production to post-production to publication. We defined design goals and target deliverables, accounting for the program's marketing framework and use-cases across channels, platforms, and audiences. I contributed to art direction notes from lighting to wardrobe to environment and more. \n\n Post-production, I led the design and organization of digital design assets in a Figma library hosting multi-instance components along with photos, videos, and motion assets. All our digital assets are translation friendly and created with intention for our audience regions and locales. \n\n In the final phase of this project, I collaborated closely with crossfunctional team members to outline program information and was responsible for translating it into a functional landing page published to Meta's internal brand portal."
      },
      {
        type: "images",
        items: [
          { src: "projects/meta-pt/15.jpg", span: 2 },
          { src: "projects/meta-pt/16.jpg", span: 2 },
          { src: "projects/meta-pt/10.jpg", span: 2 },
          { src: "projects/meta-pt/20.jpg", span: 2 },
          { src: "projects/meta-pt/17.jpg", span: 2 },
          { src: "projects/meta-pt/18.jpg", span: 2 },
          { src: "projects/meta-pt/24.jpg", span: 2 },
          { src: "projects/meta-pt/21.jpg", span: 2 },
          { src: "projects/meta-pt/19.jpg", span: 2 },
          { src: "projects/meta-pt/13.jpg", span: 2 },
          { src: "projects/meta-pt/06.jpg", span: 2 },
          { src: "projects/meta-pt/14.jpg", span: 2 },
          { src: "projects/meta-pt/22.jpg", span: 2 },
          { src: "projects/meta-pt/23.jpg", span: 2 },
        ]
      }
    ]
  },
  {
    id: "p2",
    cls: "t-b",
    art: "art-2",
    images: {
      thumbnail: "projects/meta-campaign/thumb.jpg",
      hero: "projects/meta-campaign/01.jpg",
    },
    title: "Meta Campaigns",
    sub: "Visual and marketing design",
    company: "Meta",
    role: "Visual Designer",
    scope: "Marketing Design, Web Design, Motion Design",
    credits: "Creative Director / Liz O'Neal",
    blurb: "Designing cohesive B2B campaigns across digital touchpoints.",
    contentBlocks: [
      {
        type: "text",
        content: "I developed visual assets for landing pages, email, and social in close collaboration with our CD, Marketing Managers and Webdev team. I focused on crafting clean, eye-catching graphics consistent with the Meta for Business brand while adapting to different verticals and campaign needs."
      },
      {
        type: "images",
        items: [
          { src: "projects/meta-campaign/02.jpg", span: 4 },
          { src: "projects/meta-campaign/03.jpg", span: 2 },
          { src: "projects/meta-campaign/04.jpg", span: 2 },
          { src: "projects/meta-campaign/05.jpg", span: 2 },
          { src: "projects/meta-campaign/06.jpg", span: 2 },
        ]
      },
      {
        type: "text",
        content: "\n\n\n\n"
      },
      {
        type: "images",
        items: [
          { src: "projects/meta-campaign/07.jpg", span: 4 },
        ]
      },
      {
      type: "video",
      items: [
      {
        src: "projects/meta-campaign/08.mp4",
        span: 2,
        autoplay: true,
        loop: true,
        muted: true  // required for autoplay
     },
     {
        src: "projects/meta-campaign/09.mp4",
        span: 2,
        autoplay: true,
        loop: true,
        muted: true
     }
    ]
    },
     {
        type: "images",
        items: [
          { src: "projects/meta-campaign/10.jpg", span: 1 },
          { src: "projects/meta-campaign/11.jpg", span: 1 },
          { src: "projects/meta-campaign/12.jpg", span: 1 },
          { src: "projects/meta-campaign/13.jpg", span: 1 },
        ]
     },
     {
        type: "text",
        content: "\n\n\n\n"
      },
      {
        type: "images",
        items: [
          { src: "projects/meta-campaign/15.jpg", span: 4 },
          { src: "projects/meta-campaign/16.jpg", span: 2 },
          { src: "projects/meta-campaign/17.jpg", span: 2 },
          { src: "projects/meta-campaign/18.jpg", span: 2 },
          { src: "projects/meta-campaign/19.jpg", span: 2 },
        ]
      },
]
  },
  {
    id: "p3",
    cls: "t-c",
    art: "art-3",
    images: {
      thumbnail: "projects/human-interest/thumb-3.jpg",
      hero: "projects/human-interest/07.jpg",
    },
    title: "Human Interest",
    sub: "Brand evolution and information design",
    company: "Human Interest",
    role: "Visual Designer",
    scope: "Brand Strategy, Information Design",
    credits: "VP of Marketing / Tim Parks\nDirector of Research & Content / Erin Savage",
    blurb: "Building the brand framework and strategy and digital assets for a fintech company in the retirement saving solutions space.",
    contentBlocks: [
      {
        type: "text",
        content: "In information-dense industries, a challenge often is to deliver specialized information in digestible, compelling ways. Starting with a google document of raw data compiled by our Director of Content & Research, I translated the information into a branded infographic focusing on a clear hierarchy of visuals–the heatmap, the headline, and the body text. This asset was used for gated content marketing driving inbound growth. I delivered the asset as a PDF so the vector format retains its clarity when viewed at any scale.\n\nAt the time, the Human Interest brand was in its initial stages with a logo, typefaces, and color palette. I was serving as their sole in-house designer and in order to more effectively build awareness and efficiently produce assets across channels, we would have to establish a true framework and baseline for our brand strategy."
      },
      {
        type: "images",
        items: [
          { src: "projects/human-interest/01.jpg", span: 2 },
          { src: "projects/human-interest/02.jpg", span: 2 },
          { src: "projects/human-interest/03.jpg", span: 2 },
          { src: "projects/human-interest/04.jpg", span: 2 },
        ]
      },
      {
        type: "text",
        content: "Working closely with the VP of Marketing, we ran an 8-week brand sprint with company C-suite, workshopping one aspect of our brand arsenal each week. We did this by drawing from workshop agendas and practices from agency titans like Ogilvy.\n\nWith participation from the CEO, co-founders, and each department lead, we hosted open conversations about why the company exists, who it serves, what its presence communicates externally.\n\nAfter each workshop, myself, the VP of Marketing, and Director of Content & Research synthesized the learnings and tested them through A/B tests on our marketing website and sample audience surveys in parallel to the ongoing sprint. By the end of the 8 weeks, we had established a brand ethos and toolkit company-wide including Purpose, Vision, Mission, Personality, Target audience, Value props, and Positioning."
      },
      {
        type: "images",
        items: [
          { src: "projects/human-interest/09.jpg", span: 2 },
          { src: "projects/human-interest/10.jpg", span: 2 },
          { src: "projects/human-interest/08.jpg", span: 2 },
          { src: "projects/human-interest/11.jpg", span: 2 },
        ]
      }
    ]
  },
  {
    id: "p4",
    cls: "t-d",
    art: "art-4",
    images: {
      thumbnail: "projects/fluctuate/thumb.jpg",
      hero: "projects/fluctuate/01.gif",
    },
    title: "Fluctuate",
    sub: "Editorial and print design",
    info: "Personal Project",
    role: "Creative",
    scope: "Logomaking, Editorial Design, Motion",
    year: "2024",
    blurb: "Fluctuate Zine was born as an outlet to explore tension, change, and mental health. The first issue focused on food recipes, grocery items, and flavors as grounding sensory experiences.",
    contentBlocks: [
      {
        type: "text",
        content: "One of my favorite quotes is that it's hard to write something polished, and even harder to write something that is honest. I kept that in mind while approaching this personal project, allowing intuition the space to create freely. What resulted visually is a spotlight on typography, textures, and negative space."
      },
      {
        type: "images",
        items: [
          { src: "projects/fluctuate/09.jpg", span: 2 },
          { src: "projects/fluctuate/11.jpg", span: 2 },
          { src: "projects/fluctuate/02.jpg", span: 2 },
          { src: "projects/fluctuate/03.jpg", span: 2 },
          { src: "projects/fluctuate/04.jpg", span: 2 },
          { src: "projects/fluctuate/05.jpg", span: 2 },
          { src: "projects/fluctuate/06.jpg", span: 2 },
          { src: "projects/fluctuate/07.jpg", span: 2 },
          { src: "projects/fluctuate/10.jpg", span: 2 },
          { src: "projects/fluctuate/14.jpg", span: 2 },
          { src: "projects/fluctuate/15.jpg", span: 2 },
          { src: "projects/fluctuate/16.jpg", span: 2 },
        ]
      }
    ]
  },
  {
    id: "p5",
    cls: "t-e",
    art: "art-5",
    images: {
      thumbnail: "projects/draft-can/thumb.jpg",
      hero: "projects/draft-can/00.jpg",
    },
    title: "Draftcan",
    sub: "Collection of ideas and design bits",
    company: "Various",
    role: "Visual Designer, Illustrator, Motion Designer",
    blurb: "Collection of ideas, designs, and illustrations throughout the years. Not everything makes it to the publishing stage, but an idea unused often finds second wind in other ways!",
    contentBlocks: [
      {
        type: "images",
        items: [
          { src: "projects/draft-can/ani_02.gif", span: 1 },
          { src: "projects/draft-can/ani_01.gif", span: 1 },
          { src: "projects/draft-can/boon-supply_01.jpg", span: 1 },
          { src: "projects/draft-can/boon-supply_02.gif", span: 1 },
          { src: "projects/draft-can/atlp_01.jpg", span: 1 },
          { src: "projects/draft-can/atlp_02.jpg", span: 1 },
          { src: "projects/draft-can/gch_01.jpg", span: 1 },
          { src: "projects/draft-can/apple_01.jpg", span: 1 },
          { src: "projects/draft-can/caratz_01.jpg", span: 1 },
          { src: "projects/draft-can/caratz_02.jpg", span: 1 },
          { src: "projects/draft-can/caratz_03.jpg", span: 1 },
          { src: "projects/draft-can/caratz_05.jpg", span: 1 },
          { src: "projects/draft-can/Caratz_404.gif", span: 1 },
          { src: "projects/draft-can/caratz_04.gif", span: 3 },
          { src: "projects/draft-can/mercury_01.jpg", span: 1 },
          { src: "projects/draft-can/mercury_02.jpg", span: 1 },
          { src: "projects/draft-can/vase_01.jpg", span: 1 },
          { src: "projects/draft-can/vase_02.gif", span: 1 },
          { src: "projects/draft-can/thirdlove_02.gif", span: 1 },
          { src: "projects/draft-can/thirdlove_01.jpg", span: 1 },
          { src: "projects/draft-can/draft-can.jpg", span: 1 },
          { src: "projects/draft-can/fly-club_01.jpg", span: 1 },
          { src: "projects/draft-can/turner_01.jpg", span: 1 },
          { src: "projects/draft-can/turner_02.jpg", span: 1 },
          { src: "projects/draft-can/spk_01.jpg", span: 1 },
          { src: "projects/draft-can/pa_mtg_01.jpg", span: 1 },
          { src: "projects/draft-can/illo_01.jpg", span: 1 },
          { src: "projects/draft-can/illo_02.jpg", span: 1 },
          { src: "projects/draft-can/illo_03.jpg", span: 1 },
          { src: "projects/draft-can/illo_04.jpg", span: 1 },
        ]
      }
    ]
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

return (
  <nav className={`fnav floating-nav floating-nav--${pageKey}`} aria-label="Sections">
    {labels.map((l, i) => {
      const Icon = icons[i];
      const activeSizes = [16, 18, 18];
      const iconSize = activeIdx === i ? activeSizes[i] : 10;  // ← change 14 to 10 here
      return (
        <button
          key={i}
          className="nav__btn"
          aria-current={activeIdx === i}
          aria-label={l}
          title={l}
          onClick={() => onNav(i)}
        >
          <Icon size={iconSize} />
        </button>
      );
    })}
  </nav>
);
}

function GridIcon({ size = 10 }) {
  return (
    <svg style={{ width: size, height: size }} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M10.5879 10.5879V11.6475H11.6475V10.5879H10.5879ZM6.29102 11.6475H7.34961V10.5879H6.29102V11.6475ZM8.4707 8.4707H7.34961V9.5293H8.4707V10.5879H9.5293V9.5293H10.6504V8.4707H9.5293V7.41211H8.4707V8.4707ZM6.29102 7.41211H7.34961V6.35254H6.29102V7.41211ZM10.5879 7.41211H11.6475V6.35254H10.5879V7.41211ZM16.8789 11.6475H15.8828V12.7061H12.7061V15.8828H11.6475V16.9414H10.5879V18H7.34961V16.9414H6.29102V15.8828H5.23145V12.7061H2.05566V11.6475H1.05859V10.5879H0V7.41211H1.05859V6.35254H2.05566V5.29395H5.23145V2.11719H6.29102V1.05859H7.34961V0H10.5879V1.05859H11.6475V2.11719H12.7061V5.29395H15.8828V6.35254H16.8789V7.41211H18V10.5879H16.8789V11.6475Z" fill="currentColor"/>
    </svg>
  );
}

function FlowIcon({ size = 10 }) {
  return (
    <svg style={{ width: size, height: size }} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9.5 18H8.5V17H7V14H8.5V11H9.5V14H11V17H9.5V18ZM6 13H5V12H6V13ZM13 13H12V12H13V13ZM4 8.4707H7.34961V9.5293H4V11H1V9.5293H0V8.4707H1V7H4V8.4707ZM17 8.4707H17.998V9.5293H17V11H14V9.5293H10.6484V8.4707H14V7H17V8.4707ZM9.5 1H11V4H9.5V7H8.5V4H7V1H8.5V0H9.5V1ZM6 6H5V5H6V6ZM13 6H12V5H13V6Z" fill="currentColor"/>
    </svg>
  );
}

function FaceIcon({ size = 10 }) {
  return (
    <svg style={{ width: size, height: size }} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9.5 8.5V7H8.5V8.5H7V9.5H8.5V11H9.5V9.5H11V8.5H9.5ZM18 9.5H16V10.5H13.5V11.5H11.5V13H10.5V15H9.5V18H8.5V15H7.5V13H6.5V11.5H4.5V10.5H2V9.5H0V8.5H2V7.5H4.5V6.5H6.5V5H7.5V3H8.5V0H9.5V3H10.5V5H11.5V6.5H13.5V7.5H16V8.5H18V9.5Z" fill="currentColor"/>
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
      <div className="copyright">© 2026</div>
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
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleMouseMove = (e, programName) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
    setActiveTooltip(programName);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

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
                  <div 
                    key={i} 
                    className="prog"
                    onMouseMove={(e) => handleMouseMove(e, p.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img src={p.img} alt={p.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {activeTooltip && (
        <span 
          className="prog__tip" 
          style={{ 
            left: `${tooltipPos.x + 12}px`, 
            top: `${tooltipPos.y + 12}px`,
            opacity: 1
          }}
        >
          {activeTooltip}
        </span>
      )}
      <ConnectFooter variant="blue" />
    </div>
  );
}

/* ----- Work ----- */

function Tile({ p, onOpen }) {
  const inlineStyle = {};
  if (p.span) inlineStyle.gridColumn = `span ${p.span}`;
  if (p.aspectRatio) inlineStyle.aspectRatio = p.aspectRatio;
  
  return (
    <button 
      className={`tile ${p.cls}`} 
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      onClick={() => {
        if (p.password) {
          const unlocked = JSON.parse(sessionStorage.getItem('unlockedProjects') || '[]');
          if (!unlocked.includes(p.id)) {
            if (window.__setPasswordPrompt) {
              window.__setPasswordPrompt(p);
              return;
            }
          }
        }
        onOpen(p);
      }}
      aria-label={`Open ${p.title}`}
    >
      <div className={`tile__art ${p.art}`}>
        {p.images?.thumbnail && (
          <img 
            src={p.images.thumbnail} 
            alt={p.title}
            className="tile__image"
            loading="lazy"
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
  const [showTitleInHeader, setShowTitleInHeader] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [unlockedProjects, setUnlockedProjects] = useState(() => {
    const stored = sessionStorage.getItem('unlockedProjects');
    return stored ? JSON.parse(stored) : [];
  });
  const modalBodyRef = useRef(null);
  const titleRef = useRef(null);
  
  useEscape(open, onClose);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPasswordInput('');
      setPasswordError(false);
    }
  }, [open, project?.id]);

  const isUnlocked = !project?.password || unlockedProjects.includes(project.id);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === project.password) {
      const newUnlocked = [...unlockedProjects, project.id];
      setUnlockedProjects(newUnlocked);
      sessionStorage.setItem('unlockedProjects', JSON.stringify(newUnlocked));
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  useEffect(() => {
    if (!open || !modalBodyRef.current || !titleRef.current) return;

    const handleScroll = () => {
      const titleBottom = titleRef.current.getBoundingClientRect().bottom;
      const modalTop = modalBodyRef.current.getBoundingClientRect().top;
      setShowTitleInHeader(titleBottom < modalTop + 80);
    };

    const modalBody = modalBodyRef.current;
    modalBody.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => modalBody.removeEventListener('scroll', handleScroll);
  }, [open]);

  return (
    <>
      <div className={`modal-backdrop ${open ? "is-open" : ""}`} onClick={onClose} />
      <div className={`modal ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label={project?.title}>
        {project && (
          <>
            <div className="modal__head">
              <div className="modal__brand">
                <span className="modal__brand-name">jess leung</span>
                <span className={`modal__brand-title ${showTitleInHeader ? 'is-visible' : ''}`}>
                  {project.title}
                </span>
              </div>
              <button className="modal__close" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal__body" ref={modalBodyRef}>
              <div className={`modal__hero tile__art ${project.art}`}>
                {project.images?.hero && (
                  <img 
                    src={project.images.hero} 
                    alt={project.title}
                    className="modal__hero-image"
                  />
                )}
              </div>
              
              <h2 className="modal__title" ref={titleRef}>{project.title}</h2>
              <p className="modal__sub">{project.blurb}</p>
              
              <dl className="modal__meta">
                {project.info && <div><dt>Info</dt><dd>{project.info}</dd></div>}
                {project.company && <div><dt>Company</dt><dd>{project.company}</dd></div>}
                {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
                {project.scope && <div><dt>Scope</dt><dd>{project.scope}</dd></div>}
                {project.credits && (
                  <div>
                    <dt>Credits</dt>
                    <dd>
                      {project.credits.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < project.credits.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              
              {project.contentBlocks && project.contentBlocks.map((block, blockIdx) => {
                if (block.type === "video") {
  return (
    <div key={blockIdx} className="modal__shots">
      {block.items ? (
        // Multiple videos
        block.items.map((video, idx) => {
          const videoSrc = typeof video === 'string' ? video : video.src;
          const span = typeof video === 'string' ? 2 : (video.span || 2);
          const autoplay = typeof video === 'string' ? false : (video.autoplay || false);
          const loop = typeof video === 'string' ? false : (video.loop || false);
          const controls = typeof video === 'string' ? true : (video.controls !== false);
          const muted = typeof video === 'string' ? false : (video.muted || autoplay || false);
          
          return (
            <div 
              key={idx}
              className="modal__shot modal__video"
              style={{ gridColumn: `span ${span}` }}
            >
              {videoSrc.includes('youtube.com') || videoSrc.includes('vimeo.com') ? (
                <iframe
                  src={videoSrc}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="modal__video-iframe"
                />
              ) : (
                <video
                  src={videoSrc}
                  controls={controls}
                  autoPlay={autoplay}
                  loop={loop}
                  muted={muted}
                  playsInline
                  className="modal__video-player"
                />
              )}
            </div>
          );
        })
      ) : (
        // Single video (old format for backwards compatibility)
        <div 
          className="modal__shot modal__video"
          style={{ gridColumn: `span ${block.span || 4}` }}
        >
          {block.src.includes('youtube.com') || block.src.includes('vimeo.com') ? (
            <iframe
              src={block.src}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="modal__video-iframe"
            />
          ) : (
            <video
              src={block.src}
              controls={block.controls !== false}
              autoPlay={block.autoplay || false}
              loop={block.loop || false}
              muted={block.muted || block.autoplay || false}
              playsInline
              className="modal__video-player"
            />
          )}
        </div>
      )}
    </div>
  );
}
if (block.type === "text") {
  return (
    <p key={blockIdx} style={{ whiteSpace: 'pre-line' }}>
      {block.content}
    </p>
  );
}
                if (block.type === "images") {
                  return (
                    <div key={blockIdx} className="modal__shots">
                      {block.items.map((item, idx) => {
                        const imgSrc = typeof item === 'string' ? item : item.src;
                        const span = typeof item === 'string' ? 1 : (item.span || 1);
                        
                        return (
                          <div 
                            key={idx} 
                            className="modal__shot"
                            style={{ gridColumn: `span ${span}` }}
                          >
                            <img 
                              src={imgSrc} 
                              alt={`${project.title} - Detail ${idx + 1}`}
                              className="modal__shot-image"
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                
                return null;
              })}
              
              <p> </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ----- Password Prompt ----- */

function PasswordPrompt({ project, onUnlock, onClose }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === project.password) {
      const unlocked = JSON.parse(sessionStorage.getItem('unlockedProjects') || '[]');
      const newUnlocked = [...unlocked, project.id];
      sessionStorage.setItem('unlockedProjects', JSON.stringify(newUnlocked));
      onUnlock();
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  return (
    <>
      <div className="password-overlay" onClick={onClose} />
      <div className="password-prompt">
        <div className="password-prompt__card">
          <h3 className="password-prompt__title">{project.title}</h3>
          <p className="password-prompt__subtitle">D'oh! This project is protected by an NDA</p>
          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                className={`password-prompt__input ${passwordError ? 'is-error' : ''}`}
                placeholder="Password"
                autoFocus
              />
              <button type="submit" className="password-prompt__submit">
                <ArrowIcon size={16} />
              </button>
            </div>
            {passwordError && (
              <div className="password-prompt__error">Incorrect password</div>
            )}
          </form>
        </div>
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

  const [active, setActive] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [passwordPromptProject, setPasswordPromptProject] = useState(null);
  
  useEffect(() => {
    window.__setPasswordPrompt = setPasswordPromptProject;
  }, []);

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
    requestAnimationFrame(() => {
      const layers = document.querySelectorAll(".layer");
      if (layers[i]) layers[i].scrollTop = 0;
    });
  }, []);

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

      {passwordPromptProject && (
        <PasswordPrompt 
          project={passwordPromptProject}
          onUnlock={() => {
            setPasswordPromptProject(null);
            setOpenProject(passwordPromptProject);
          }}
          onClose={() => setPasswordPromptProject(null)}
        />
      )}

      <FloatingNav activeIdx={active} onNav={nav} style={tweaks.navStyle} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
