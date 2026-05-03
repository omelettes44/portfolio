<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<title>Jess Leung — Visual Designer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap">

<!-- OPTIMIZED: Production React (7x smaller than development) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<style>
  :root {
    --bg-person: #ffffff;
    --bg-process: #2e57d6;
    --bg-work: #0d1116;
    --ink-person: #111418;
    --ink-process: #ffffff;
    --ink-work: #ffffff;
    --accent: #f7c98a;
    --accent-soft: #fde6c4;
    --tile: #14253f;
    --tile-hi: #1a2e4d;
    --rule: rgba(0,0,0,0.08);
    --rule-on-blue: rgba(255,255,255,0.18);
    --rule-on-dark: rgba(255,255,255,0.10);
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Figtree', system-ui, -apple-system, Helvetica, Arial, sans-serif;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    background: #0d1116; /* Will be dynamically updated by React */
    color: #111;
    overflow-x: hidden;
    transition: background-color 700ms var(--ease); /* Smooth transition when changing pages */
  }
  body {
    min-height: 100vh;
    min-height: 100dvh;
  }
  a { color: inherit; }

  /* Stage holds three layers that cross-fade. */
  .stage {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    overflow: hidden;
  }
  .layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 700ms var(--ease);
    will-change: opacity;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .layer.is-active {
    opacity: 1;
    pointer-events: auto;
    z-index: 2;
  }
  .layer.is-active main.section,
  .layer.is-active .connect { animation: rise 900ms var(--ease) both; }
  .layer.is-active main.section .title,
  .layer.is-active main.section h1.title { animation: none; }

  @keyframes rise {
    from { transform: translateY(8px); opacity: 0; }
    to   { transform: none; opacity: 1; }
  }

  .page {
    min-height: 100vh;
    min-height: 100dvh;
    padding: 36px 56px 28px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .page--person { background: var(--bg-person); color: var(--ink-person); --bg-current: var(--bg-person); }
  .page--process { background: var(--bg-process); color: var(--ink-process); --bg-current: var(--bg-process); }
  .page--work { background: var(--bg-work); color: var(--ink-work); --bg-current: var(--bg-work); }

  /* Floating nav (fixed top-right, persists across all pages) */
  .fnav {
    position: fixed;
    top: 36px;
    right: 56px;
    z-index: 30;
    transition: color 500ms var(--ease);
  }
  .fnav--person { color: #111; }
  .fnav--process { color: #ffffff; }
  .fnav--work { color: rgba(255,255,255,0.92); }

  /* Style A: Squares (default — your current) */
  .floating-nav {
    display: flex;
    gap: 12px;
    color: #111;
  }
  .floating-nav--person { color: #111; }
  .floating-nav--process { color: #ffffff; }
  .floating-nav--work { color: #ffffff; }
  .floating-nav--process .nav__btn,
  .floating-nav--work .nav__btn { border-color: currentColor; }

  /* Style B: Pill (segmented control) */
  .fnav--pill {
    display: inline-flex;
    position: fixed;
    padding: 4px;
    border-radius: 999px;
    background: rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .fnav--pill.fnav--process,
  .fnav--pill.fnav--work {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.18);
  }
  .fnav-pill__thumb {
    position: absolute;
    top: 4px; left: 4px; bottom: 4px;
    width: calc((100% - 8px) / 3);
    background: currentColor;
    border-radius: 999px;
    transition: transform 380ms var(--ease);
    opacity: 1;
  }
  .fnav-pill__btn {
    position: relative;
    z-index: 1;
    border: 0;
    background: transparent;
    padding: 8px 18px;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
    cursor: pointer;
    color: currentColor;
    opacity: 0.7;
    transition: opacity 220ms var(--ease), color 220ms var(--ease);
  }
  .fnav-pill__btn[aria-current="true"] {
    opacity: 1;
    color: var(--pill-on, #fff);
    mix-blend-mode: difference;
  }
  .fnav-pill__btn:hover { opacity: 1; }

  /* Style C: Dots (minimal index) */
  .fnav--dots {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .fnav-dot {
    border: 0;
    background: transparent;
    padding: 6px 0;
    cursor: pointer;
    color: currentColor;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font: inherit;
  }
  .fnav-dot__core {
    display: inline-block;
    width: 7px; height: 7px; border-radius: 50%;
    background: currentColor;
    opacity: 0.35;
    transition: opacity 240ms var(--ease), transform 320ms var(--ease);
  }
  .fnav-dot[aria-current="true"] .fnav-dot__core {
    opacity: 1;
    transform: scale(1.6);
  }
  .fnav-dot__label {
    font-size: 12px;
    letter-spacing: 0.02em;
    opacity: 0;
    max-width: 0;
    overflow: hidden;
    transition: opacity 240ms var(--ease), max-width 320ms var(--ease);
    white-space: nowrap;
  }
  .fnav-dot[aria-current="true"] .fnav-dot__label,
  .fnav-dot:hover .fnav-dot__label {
    opacity: 1;
    max-width: 80px;
  }

  /* Style D: Numbers — monospace tabular */
  .fnav--numbers {
    display: flex;
    gap: 28px;
  }
  .fnav-num {
    border: 0;
    background: transparent;
    padding: 4px 0;
    cursor: pointer;
    color: currentColor;
    font: inherit;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 2px;
    opacity: 0.45;
    transition: opacity 240ms var(--ease);
    position: relative;
  }
  .fnav-num:hover { opacity: 0.85; }
  .fnav-num[aria-current="true"] { opacity: 1; }
  .fnav-num__n {
    font-family: figtree;
    font-size: 11px;
    letter-spacing: 0.04em;
    opacity: 0.75;
  }
  .fnav-num__l {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.005em;
  }
  .fnav-num[aria-current="true"]::after {
    content: "";
    position: absolute;
    left: 0; right: 0;
    bottom: -6px;
    height: 1.5px;
    background: currentColor;
    border-radius: 1px;
    animation: underline 320ms var(--ease) both;
  }
  @keyframes underline {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }

  /* Style E: Minimal — text labels with leading line that grows when active */
  .fnav--minimal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }
  .fnav-min {
    border: 0;
    background: transparent;
    cursor: pointer;
    color: currentColor;
    font: inherit;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0;
    font-size: 13px;
    font-weight: 500;
    opacity: 0.55;
    transition: opacity 240ms var(--ease);
  }
  .fnav-min:hover { opacity: 0.9; }
  .fnav-min[aria-current="true"] { opacity: 1; font-weight: 600; }
  .fnav-min__line {
    display: inline-block;
    width: 14px;
    height: 1.5px;
    background: currentColor;
    transition: width 320ms var(--ease);
  }
  .fnav-min[aria-current="true"] .fnav-min__line { width: 32px; }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    padding-right: 220px;
  }
  .brand {
    display: flex;
    align-items: baseline;
    gap: 18px;
    flex-wrap: wrap;
  }
  .brand__name {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.01em;
  }
  .brand__role {
    font-size: 16px;
    opacity: 0.78;
    font-weight: 400;
  }

  /* Nav squares */
  .nav {
    display: flex;
    gap: 12px;
  }
  .nav__btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1.5px solid currentColor;
    background: transparent;
    color: inherit;
    cursor: pointer;
    padding: 0;
    position: relative;
    display: grid;
    place-items: center;
    opacity: 0.28;
    transition: opacity 220ms var(--ease), transform 220ms var(--ease);
  }
  .nav__btn:hover { opacity: 0.7; transform: translateY(-1px); }
  .nav__btn[aria-current="true"] { opacity: 1; }
  .nav__btn > svg { transition: width 220ms var(--ease), height 220ms var(--ease), transform 220ms var(--ease); }
  .nav__btn[aria-current="true"] > svg { transform: scale(1.05); }

  /* Section base */
  .section {
    flex: 1;
    margin-top: clamp(36px, 6vw, 80px);
    width: 100%;
    max-width: 1280px;
  }
  .eyebrow {
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: lowercase;
    opacity: 0.6;
    font-weight: 500;
  }
  h1.title {
    margin: 0 0 8px;
    font-size: clamp(36px, 5.4vw, 64px);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 1;
  }

  /* Person */
  .person__grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
    margin-top: 56px;
  }
  .person__grid--single {
    grid-template-columns: minmax(0, 720px);
  }
  .person__copy {
    max-width: 520px;
    font-size: 17px;
    line-height: 1.55;
    color: #2a2f36;
  }
  .person__copy p + p { margin-top: 1.2em; }
  .person__meta {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 10px 24px;
    margin-top: 36px;
    font-size: 14px;
    color: #2a2f36;
  }
  .person__meta dt { font-weight: 600; }
  .person__meta dd { margin: 0; opacity: 0.8; }

  .person__media {
    position: relative;
  }
  .portrait {
    aspect-ratio: 4 / 5;
    width: 100%;
    max-width: 460px;
    margin-left: auto;
    border-radius: 18px;
    background:
      radial-gradient(120% 80% at 30% 0%, #fde6c4 0%, transparent 60%),
      radial-gradient(120% 80% at 90% 100%, #f7c98a 0%, transparent 55%),
      linear-gradient(180deg, #f6efe4 0%, #ecdfca 100%);
    overflow: hidden;
    position: relative;
    box-shadow: 0 30px 60px -30px rgba(0,0,0,0.18);
  }
  .portrait__sticker {
    position: absolute;
    bottom: 18px;
    left: 18px;
    background: #111;
    color: #fff;
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 12px;
    letter-spacing: 0.02em;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #6ee787;
    box-shadow: 0 0 0 0 rgba(110,231,135,0.7);
    animation: pulse 1.8s infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(110,231,135,0.6); }
    70% { box-shadow: 0 0 0 10px rgba(110,231,135,0); }
    100% { box-shadow: 0 0 0 0 rgba(110,231,135,0); }
  }
  .portrait__label {
    position: absolute;
    inset: auto 0 0 0;
    padding: 22px 22px 18px;
    display: flex;
    justify-content: space-between;
    font-family: ui-monospace, SF Mono, Menlo, monospace;
    font-size: 11px;
    color: rgba(0,0,0,0.55);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .portrait__big {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: rgba(0,0,0,0.18);
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: center;
    padding: 24px;
  }

  /* Marquee facts */
  .marquee {
    margin-top: clamp(40px, 7vw, 80px);
    padding: 18px 0;
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  }
  .marquee__track {
    display: flex;
    gap: 48px;
    width: max-content;
    animation: marquee 38s linear infinite;
    font-size: 14px;
    color: #4a5160;
    align-items: center;
  }
  .marquee__track span { display: inline-flex; align-items: center; gap: 14px; white-space: nowrap; }
  .marquee__track span::after {
    content: "";
    width: 4px; height: 4px; border-radius: 50%; background: currentColor; opacity: 0.5;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* Process */
  .process__lead {
    font-size: clamp(26px, 3.4vw, 42px);
    line-height: 1.18;
    font-weight: 500;
    letter-spacing: -0.018em;
    max-width: 24ch;
    margin: 32px 0 0;
    text-wrap: balance;
  }
  .process__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(40px, 5vw, 80px);
    margin-top: clamp(48px, 7vw, 88px);
    align-items: start;
  }
  .process__lists {
    display: grid;
    gap: 28px;
  }
  .deflist {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 8px 18px;
    font-size: 18px;
    align-items: start;
  }
  .deflist dt {
    font-weight: 600;
    grid-column: 1;
    margin: 0;
  }
  .deflist dd {
    margin: 0;
    grid-column: 2;
    opacity: 0.86;
    line-height: 1.55;
  }
  .deflist dd + dt { margin-top: 6px; }

  .programs {
    margin-top: 4px;
  }
  .programs__label {
    font-size: 16px;
    letter-spacing: 0.04em;
    margin-bottom: 24px;
    font-weight: 600;
  }
  .programs__grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
    max-width: 460px;
  }
  .prog {
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.16);
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.02em;
    cursor: default;
    position: relative;
    max-width: 74px;
  }
  .prog img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  }
  .prog:hover { 
    transform: none; 
    background: rgba(255,255,255,0.12);
  }
.prog__tip {
  position: fixed;
  top: 0;
  left: 0;
  background: #313131;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  padding: 4px 8px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms var(--ease);
  z-index: 1000;
  transform: translate(4px, 4px);
}
.prog:hover .prog__tip { opacity: 1; }

  .process__side {
    display: grid;
    gap: 28px;
    align-content: start;
  }
  .principle {
    border: 1px solid var(--rule-on-blue);
    border-radius: 14px;
    padding: 22px 24px;
    background: rgba(255,255,255,0.04);
  }
  .principle__num {
    font-family: ui-monospace, SF Mono, Menlo, monospace;
    font-size: 12px;
    opacity: 0.7;
  }
  .principle h3 {
    margin: 8px 0 6px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .principle p { margin: 0; font-size: 14px; line-height: 1.55; opacity: 0.85; }

  /* Work */
  .work__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
  }
  .work__count {
    display: none;
  }

  /* OPTIMIZED: Explicit grid for better control, but keeping tile classes for compatibility */
  .grid {
    margin-top: 36px;
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .tile {
    position: relative;
    background: var(--tile);
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    cursor: pointer;
    border: 0;
    padding: 0;
    text-align: left;
    color: inherit;
    transition: transform 360ms var(--ease);
  }
  .tile.t-a { grid-column: span 3; aspect-ratio: 16 / 11; }
  .tile.t-b { grid-column: span 3; aspect-ratio: 16 / 11; }
  .tile.t-c, .tile.t-d, .tile.t-e { grid-column: span 2; aspect-ratio: 4 / 3; }

  .tile__art {
    position: absolute; inset: 0;
    transition: transform 700ms var(--ease), filter 500ms var(--ease);
  }
  .tile:hover .tile__art { transform: scale(1.04); }

  .tile__overlay {
    position: absolute; inset: 0;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #fff;
    background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%);
    opacity: 0;
    transition: opacity 320ms var(--ease);
  }
  .tile:hover .tile__overlay,
  .tile:focus-visible .tile__overlay { opacity: 1; }
  .tile__title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .tile__sub {
    font-size: 13px;
    opacity: 0.8;
    margin-top: 2px;
  }
  .tile__year {
    position: absolute;
    top: 16px;
    left: 18px;
    font-family: ui-monospace, SF Mono, Menlo, monospace;
    font-size: 11px;
    opacity: 0.7;
    color: #fff;
    letter-spacing: 0.06em;
  }
  .tile__open {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(6px);
    display: grid; place-items: center;
    color: #fff;
    opacity: 1;
    z-index: 10;
    transition: background 220ms var(--ease), transform 220ms var(--ease);
  }
  .tile:hover .tile__open { background: rgba(255,255,255,0.2); transform: scale(1.25); opacity: 1; }

  /* Tile artworks (each one is a different composition built in CSS so they read as distinct) */
  .art-1 {
    background:
      radial-gradient(120% 90% at 20% 20%, #f7c98a 0%, transparent 55%),
      radial-gradient(120% 90% at 80% 90%, #ff6b48 0%, transparent 55%),
      linear-gradient(135deg, #1a2e4d 0%, #14253f 100%);
  }
  .art-1::before {
    content: "";
    position: absolute;
    inset: 14% 8% 14% 8%;
    border-radius: 50%;
    background: radial-gradient(circle, #fff8eb 0%, #f7c98a 40%, transparent 75%);
    filter: blur(2px);
    opacity: 0.85;
  }
  .art-2 {
    
  }
  .art-2::before {
  
  }
  .art-2::after {

  }
  .art-3 {

  }
  .art-3::before {

  }
  .art-3::after {

  }
  .art-4 {

  }
  .art-4::before {

  }
  .art-5 {

  }
  .art-5::before {

  }
  .art-5::after {

  }

/* Image overlays on tiles */
.tile__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Keep this for tiles - they need fixed aspect ratios */
  object-position: center center;
  z-index: 1;
}

/* Modal hero image - height adjusts to image */
.modal__hero-image {
  position: relative;  /* Changed from absolute */
  width: 100%;
  height: auto;  /* Changed from 100% */
  display: block;
  object-fit: contain;  /* Changed from cover */
}

/* Modal gallery images - height adjusts to image */
.modal__shot-image {
  position: relative;  /* Changed from absolute */
  width: 100%;
  height: auto;  /* Changed from 100% */
  display: block;
  object-fit: contain;  /* Changed from cover */
}

/* Video styles */
.modal__video {
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
}

.modal__video-iframe {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
}

.modal__video-player {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
}

  /* Clients */
  .clients {
    margin-top: clamp(56px, 8vw, 96px);
  }
  .clients__label {
    font-size: 16px;
    letter-spacing: 0.04em;
    opacity: 0.55;
    margin-bottom: 18px;
  }
  .clients__row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 32px;
    align-items: center;
    padding: 12px 0 12px 0;
  }
  .client {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    opacity: 1;
  }
  .client img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  /* Footer (connect bar) */
  .connect {
    margin-top: clamp(56px, 8vw, 88px);
    padding-top: 28px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .connect__label {
    font-size: 16px;
    letter-spacing: 0.00em;
    opacity: 0.6;
    margin-bottom: 32px;
  }
  .connect__cta {
    display: flex;
    gap: 16px;
    align-items: center;
    grid-row: 1;
    grid-column: 1;
  }
  /* Sweep CTA pill */
  .btn-pill {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 18px 32px;
    border-radius: 999px;
    font-size: 24px;
    font-weight: 200;
    letter-spacing: -0.012em;
    text-decoration: none;
    line-height: 1;
    border: 1.5px solid color-mix(in srgb, currentColor 20%, transparent);
    background: color-mix(in srgb, currentColor 10%, transparent);
    position: relative;
    overflow: hidden;
    isolation: isolate;
    transition: transform 220ms var(--ease),
                color 260ms var(--ease),
                border-color 260ms var(--ease);
  }
  .btn-pill::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform 380ms var(--ease);
    z-index: -1;
  }
  .btn-pill .btn-pill__label,
  .btn-pill .arrow {
    position: relative;
    z-index: 1;
  }
  .btn-pill .arrow {
    width: 22px; height: 22px;
    transition: transform 260ms var(--ease);
  }
  .btn-pill:hover::before { transform: translateX(0); }
  .btn-pill:hover .arrow { transform: translateX(4px); }
  .btn-pill:active { transform: scale(0.98); }

  /* Person page — dark outline, peach sweep, dark text on hover */
  .page--person .btn-pill { color: #1b1410; }
  .page--person .btn-pill::before { background: var(--accent); }
  .page--person .btn-pill:hover { color: #1b1410; border-color: var(--accent); }

  /* Process page — white outline, white sweep, blue text on hover */
  .page--process .btn-pill { color: #ffffff; }
  .page--process .btn-pill::before { background: #ffffff; }
  .page--process .btn-pill:hover { color: #2e57d6; }

  /* Work page — white outline, white sweep, dark text on hover */
  .page--work .btn-pill { color: #ffffff; }
  .page--work .btn-pill::before { background: #ffffff; }
  .page--work .btn-pill:hover { color: #0d1116; }

  /* Slide LinkedIn link */
  .btn-text {
    display: inline-block;
    padding: 16px 20px;
    border-radius: 999px;
    font-size: 24px;
    font-weight: 200;
    letter-spacing: -0.012em;
    text-decoration: none;
    color: inherit;
    opacity: 1;
    line-height: 1.1;
    transition: opacity 220ms var(--ease), color 220ms var(--ease);
  }
  .btn-text:hover { opacity: 1; }
  .btn-text:active { color: var(--accent); }
  .btn-text .slide-inner {
    position: relative;
    display: inline-block;
    height: 1.1em;
    overflow: hidden;
    line-height: 1.1;
    vertical-align: bottom;
  }
  .btn-text .slide-top,
  .btn-text .slide-bot {
    display: inline-block;
    transition: transform 380ms var(--ease);
  }
  .btn-text .slide-bot {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    transform: translateX(calc(-100% - 48px));
  }
  .btn-text:hover .slide-top { transform: translateX(calc(100% + 48px)); }
  .btn-text:hover .slide-bot { transform: translateX(0); }

  .copyright {
    text-align: right;
    font-size: 14px;
    opacity: 0.2;
    align-self: end;
    font-family: figtree;
    grid-row: 2;
    grid-column: 1;
    margin-top: 48px; /* this becomes your breathing space */
    text-align: right;
  }

  /* Modal */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    transition: opacity 320ms var(--ease);
  }
  .modal-backdrop.is-open { opacity: 1; pointer-events: auto; }

  .modal {
    position: fixed;
    inset: 4vh 4vw;
    background: #fafaf7;
    color: #111;
    border-radius: 28px;
    overflow: hidden;
    z-index: 60;
    transform: translateY(24px) scale(0.985);
    opacity: 0;
    pointer-events: none;
    transition: opacity 360ms var(--ease), transform 420ms var(--ease);
    display: flex;
    flex-direction: column;
    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
  }
  .modal.is-open { opacity: 1; transform: none; pointer-events: auto; }
  .modal__head {
    padding: 22px 28px;
    border-bottom: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .modal__brand {
    display: flex;
    align-items: baseline;
    gap: 18px;
    flex-wrap: wrap;
  }
  .modal__brand-name {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.01em;
    color: #111;  
    opacity: 0.3;
  }
  .modal__brand-title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #111;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 320ms var(--ease), transform 320ms var(--ease);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
  }
  .modal__brand-title.is-visible {
    opacity: 1;
    transform: translateX(0);
    max-width: 600px;
  }
  .modal__brand-role {
    font-size: 16px;
    opacity: 0.78;
    font-weight: 400;
    color: #111;  
    opacity: 0.4;
  }
  .modal__close {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    display: grid; place-items: center;
    transition: transform 220ms var(--ease);
  }
  .modal__close:hover { transform: scale(1.25); }
  .modal__close > svg { transition: transform 220ms var(--ease); }
  .modal__body {
    overflow-y: auto;
    padding: 36px 36px 56px;
  }
  .modal__hero {
    border-radius: 14px;
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .modal__title {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
    line-height: 1.05;
  }
  .modal__sub {
    font-size: 16px;
    color: #444;
    margin: 0 0 28px;
    max-width: 60ch;
    line-height: 1.55;
  }
  .modal__meta {
    display: grid;
    grid-template-columns: repeat(4, minmax(0,1fr));
    gap: 18px;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 18px 0;
    margin-bottom: 28px;
  }
  .modal__meta dt {
    font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.55; margin-bottom: 4px;
    font-family: ui-monospace, SF Mono, Menlo, monospace;
  }
  .modal__meta dd { margin: 0; font-size: 14px; font-weight: 500; }
  .modal__body p { font-size: 16px; line-height: 1.6; color: #2a2f36; max-width: 70ch; }
  .modal__shots {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin: 24px 0;
    justify-items: center;
    align-items: center;
  }
.modal__shot {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.modal__shot.full { 
  grid-column: span 4; 
}

/* OPTIMIZED: Images now use lazy loading for better performance */

  /* Mobile */
  @media (max-width: 760px) {
    .page { padding: 22px 22px 24px; }
    .fnav { top: 22px; right: 22px; }
    .floating-nav { gap: 8px; }
    .fnav--numbers { gap: 18px; }
    .fnav--dots { gap: 14px; }
    .header { padding-right: 130px; }
    .brand__name { font-size: 15px; }
    .brand__role { font-size: 12px; flex-basis: 100%; }
    .brand { gap: 6px; }
    .nav__btn { width: 30px; height: 30px; }
    h1.title { font-size: 38px; }

    .section { margin-top: 36px; }

    .person__grid {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 32px;
    }
    .person__media { order: -1; }
    .portrait { max-width: 100%; aspect-ratio: 5 / 4; }
    .person__copy { font-size: 16px; }
    .person__meta { grid-template-columns: 100px 1fr; }

    .process__lead { font-size: 24px; }
    .process__grid { grid-template-columns: 1fr; gap: 36px; }
    .programs__grid { grid-template-columns: repeat(6, 1fr); max-width: none; }
    .deflist { grid-template-columns: 110px 1fr; }

    .grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .tile.t-a, .tile.t-b { grid-column: span 2; aspect-ratio: 16 / 11; }
    .tile.t-c, .tile.t-d, .tile.t-e { grid-column: span 2; aspect-ratio: 16 / 11.tile__open; }
    .tile__title { font-size: 15px; }
    .tile__overlay { opacity: 1; padding: 14px; }

    .clients__row { grid-template-columns: repeat(3, 1fr); gap: 22px 18px; padding: 22px 0; }
    .client { height: 28px; }

    .connect { grid-template-columns: 1fr; }
    .copyright { text-align: left; }
    .connect__cta { flex-wrap: wrap; }

    .modal { inset: 0; border-radius: 0; }
    .modal__body { padding: 24px 20px 40px; }
    .modal__meta { grid-template-columns: 1fr; }
   .modal__shots { 
      grid-template-columns: 1fr; 
    }
    .modal__shots > * {
      grid-column: span 1 !important;
    }
    
    /* Smaller font size for project title in header on mobile */
    .modal__brand-title {
      font-size: 18px;
      max-width: 200px;
    }
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }

  /* Tweaks dark fallback */
  body[data-density="tight"] .section { margin-top: 28px; }
  body[data-density="tight"] .clients { margin-top: 40px; }
  
/* Tweaks dark fallback */
  body[data-density="tight"] .section { margin-top: 28px; }
  body[data-density="tight"] .clients { margin-top: 40px; }

/* Password Prompt Styles - Floating over work page */
.password-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 17, 22, 0.85);
  opacity: .7;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  z-index: 100;
}

.password-prompt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
}

.password-prompt__card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  padding: 32px 36px;
  max-width: 340px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.password-prompt__title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: #111;
}

.password-prompt__subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px;
  opacity: 0.8;
}

.password-prompt form {
  position: relative;
  min-height: 44px;
}

.password-prompt__input {
  width: 100%;
  padding: 12px 48px 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 15px;
  transition: all 200ms var(--ease);
  background: #fafafa;
  color: #111;
}

.password-prompt__input::placeholder {
  color: #999;
  opacity: 0.6;
}

.password-prompt__input:focus {
  outline: none;
  border-color: #111;
  background: #ffffff;
}

.password-prompt__input.is-error {
  border-color: #dc2626;
  background: #fef2f2;
}

.password-prompt__error {
  color: #dc2626;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
  top: 100%;
  left: 0;
  right: 0;
}

.password-prompt__submit {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  background: #111;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 200ms var(--ease);
}

.password-prompt__submit:hover {
  background: #000;
  transform: translateY(-50%) scale(1.05);
}

.password-prompt__submit:active {
  transform: translateY(-50%) scale(0.95);
}

@media (max-width: 760px) {
  .password-prompt__card {
    padding: 28px 24px;
    max-width: calc(100vw - 48px);
  }
}
  

  
</style>
</head>
<body>

<div id="root"></div>

<script>
(function() {
  if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  var mx = 0, my = 0, rx = 0, ry = 0, started = false;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    if (!started) { rx = mx; ry = my; started = true; }
  });

  function tick() {
    rx += (mx - rx) * 0.45;
    ry += (my - ry) * 0.45;
    dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(tick);
  }
  tick();



<script>
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "processColor": "#2e57d6",
    "accentColor": "#f7c98a",
    "density": "default",
    "showStartingScreen": "work",
    "transitionStyle": "crossfade",
    "navStyle": "squares"
  }/*EDITMODE-END*/;
</script>

<script type="text/babel" src="tweaks-panel.jsx"></script>
<script type="text/babel" src="app.jsx"></script>

</body>
</html>
