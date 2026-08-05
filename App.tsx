import ProductsSection from "./ProductsSection"
import maxAImg from "./max-a.jpg" 
import maxMImg from "./max-m.jpg"
import maxAPdf from "./max-a-brochure.pdf"
import maxMPdf from "./max-m-brochure.pdf"

import { useState, useEffect } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"

import heroImg  from "./hero.jpg"
import card1Img from "./card1.jpg"
import card2Img from "./card2.jpg"
import card3Img from "./card3.jpg"
import rdImg    from "./rd.jpg"
import logoImg  from "./logo.png"

const IMG_HERO   = heroImg
const IMG_CARD_1 = card1Img
const IMG_CARD_2 = card2Img
const IMG_CARD_3 = card3Img
const IMG_RD     = rdImg
const LOGO_URL   = logoImg

// ─────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────

function TargetMark({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ flexShrink: 0, display: "block" }}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.2" />
      <line x1="12" y1="0.5"  x2="12" y2="4.5"  stroke={color} strokeWidth="1.2" />
      <line x1="12" y1="19.5" x2="12" y2="23.5" stroke={color} strokeWidth="1.2" />
      <line x1="0.5"  y1="12" x2="4.5"  y2="12" stroke={color} strokeWidth="1.2" />
      <line x1="19.5" y1="12" x2="23.5" y2="12" stroke={color} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.6" fill={color} />
    </svg>
  )
}

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      style={{ flexShrink: 0, display: "block" }}>
      <path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.5 3.5L13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.line x1="3" y1="6"  x2="19" y2="6"
        stroke="#F3F4F6" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: 45,  y: 5  } : { rotate: 0, y: 0 }}
        style={{ originX: "11px", originY: "6px" }}
        transition={{ duration: 0.25 }} />
      <motion.line x1="3" y1="11" x2="19" y2="11"
        stroke="#F3F4F6" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }} />
      <motion.line x1="3" y1="16" x2="19" y2="16"
        stroke="#F3F4F6" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ originX: "11px", originY: "16px" }}
        transition={{ duration: 0.25 }} />
    </svg>
  )
}

function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const rotation = { tl: 0, tr: 90, br: 180, bl: 270 }[corner]
  const position: React.CSSProperties =
    corner === "tl" ? { top: 0, left: 0 }
    : corner === "tr" ? { top: 0, right: 0 }
    : corner === "br" ? { bottom: 0, right: 0 }
    : { bottom: 0, left: 0 }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24"
      style={{ position: "absolute", ...position, transform: `rotate(${rotation}deg)` }}>
      <path d="M2 10 L2 2 L10 2" stroke="#3D7FFF" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────
// HERO OS BADGE
// ─────────────────────────────────────────────────────────────────────

function HeroOsBadge({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div aria-hidden
      style={{ position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", zIndex: 10,
        width: 96, height: 96,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        style={{ position: "absolute", inset: 0, borderRadius: "50%",
          border: "1.5px solid rgba(61,127,255,0.5)",
          borderTopColor: "rgba(61,127,255,0.12)" }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
      <motion.div
        style={{ width: 74, height: 74, borderRadius: "50%",
          background: "rgba(11,12,14,0.82)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px rgba(61,127,255,0.25)" }}
        animate={reduced ? {} : {
          boxShadow: ["0 0 18px rgba(61,127,255,0.2)",
                      "0 0 36px rgba(61,127,255,0.45)",
                      "0 0 18px rgba(61,127,255,0.2)"],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <img src={LOGO_URL} alt="OS"
          style={{ width: 42, height: 42, objectFit: "cover",
            borderRadius: "50%", background: "#fff", padding: 4 }} />
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// ANIMATION HELPERS
// ─────────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.65, ease } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeIn" as const } },
}
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0,   transition: { duration: 0.75, ease } },
  exit:   { opacity: 0, x: -16, transition: { duration: 0.3,  ease: "easeIn" as const } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0,   transition: { duration: 0.75, ease } },
  exit:   { opacity: 0, x: 16,  transition: { duration: 0.3,  ease: "easeIn" as const } },
}
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease } },
}
const bracketContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
}
const bracketItem = {
  hidden: { opacity: 0, scale: 1.4 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
}

const inView = (amount = 0.18) => ({
  initial: "hidden",
  whileInView: "show",
  exit: "exit",
  viewport: { once: false, amount },
})

// ─────────────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────────────

const content = {
  ua: {
    nav: { solutions: "Рішення", rd: "R&D", contact: "Контакт" },
    hero: {
      eyebrow: "GNSS АНТЕНИ ТА RF СИСТЕМИ",
      h1start: "Точність, яка не залежить",
      h1accent: "від перешкод",
      sub: "Ми розробляємо GNSS-антени та радіочастотні системи, які зберігають стабільний сигнал навіть у найскладніших умовах. Обладнання, якому довіряють в авіації, обороні та промисловості.",
      btn1: "Переглянути рішення",
      btn2: "Зв'язатися з нами",
      lock: "СИГНАЛ ЗАФІКСОВАНО · RTK ТОЧНІСТЬ",
      badges: ["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"],
    },
    solutions: {
      eyebrow: "НАШІ РІШЕННЯ",
      title: "Що ми створюємо",
      sub: "Від антен до готових радіочастотних систем — кожен продукт ми проєктуємо так, щоб він працював бездоганно навіть тоді, коли умови далекі від ідеальних.",
      cards: [
        { title: "GNSS-антени преміум-класу",
          desc: "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
          link: "Дізнатись більше", img: IMG_CARD_1 },
        { title: "Радіочастотні системи для авіації та оборони",
          desc: "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
          link: "Дізнатись більше", img: IMG_CARD_2 },
        { title: "Індивідуальні інженерні рішення",
          desc: "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
          link: "Дізнатись більше", img: IMG_CARD_3 },
      ],
    },
    rd: {
      eyebrow: "R&D ЦЕНТР",
      title: "Інженерія, що проходить повний цикл перевірки",
      sub: "У власному R&D-процесі ми поєднуємо моделювання, швидке прототипування та вимірювання радіочастотних характеристик, щоб кожне рішення було готове до реальних умов експлуатації.",
      label: "RF LAB · VALIDATION LOOP",
      items: [
        { title: "Швидке прототипування",
          desc: "Перевіряємо топологію, форм-фактор і матеріали до запуску у виробництво." },
        { title: "RF-вимірювання",
          desc: "Аналізуємо стабільність сигналу, втрати та роботу системи в умовах перешкод." },
        { title: "Валідація надійності",
          desc: "Готуємо рішення до довготривалої роботи в польових, промислових та авіаційних сценаріях." },
      ],
    },
    cta: {
      text: "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
      btn:  "Обговорити проєкт",
    },
    footer: {
      copy: "© 2026 Olemax Systems", tagline: "GNSS · RF · Custom Engineering",
      email: "info@olemax-systems.com", phone: "+380 97 266 5257", city: "Kyiv, Ukraine",
    },
  },
  en: {
    nav: { solutions: "Solutions", rd: "R&D", contact: "Contact" },
    hero: {
      eyebrow: "GNSS ANTENNAS & RF SYSTEMS",
      h1start: "Precision that doesn't depend",
      h1accent: "on interference",
      sub: "We design GNSS antennas and radio-frequency systems that maintain a stable signal even in the most challenging environments. Equipment trusted in aviation, defence and industry.",
      btn1: "View solutions", btn2: "Contact us",
      lock: "SIGNAL ACQUIRED · RTK ACCURACY",
      badges: ["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"],
    },
    solutions: {
      eyebrow: "OUR SOLUTIONS",
      title: "What we build",
      sub: "From antennas to complete RF systems — every product is engineered to perform flawlessly even when conditions are far from ideal.",
      cards: [
        { title: "Premium-grade GNSS antennas",
          desc: "Multi-band antennas supporting GPS, GLONASS, Galileo and BeiDou. The housing withstands any weather, and accuracy holds even in demanding reception conditions.",
          link: "Learn more", img: IMG_CARD_1 },
        { title: "RF systems for aviation & defence",
          desc: "Boards and modules designed to the highest reliability standards — for tasks where the cost of error is too high and signal stability is critical.",
          link: "Learn more", img: IMG_CARD_2 },
        { title: "Custom engineering solutions",
          desc: "We design the form factor and configuration to match a specific customer task — from first sketch to serial production.",
          link: "Learn more", img: IMG_CARD_3 },
      ],
    },
    rd: {
      eyebrow: "R&D CENTER",
      title: "Engineering that passes the full validation cycle",
      sub: "In our own R&D process we combine simulation, rapid prototyping and RF measurement to ensure every solution is ready for real-world operating conditions.",
      label: "RF LAB · VALIDATION LOOP",
      items: [
        { title: "Rapid prototyping",
          desc: "We verify topology, form factor and materials before production launch." },
        { title: "RF measurement",
          desc: "We analyse signal stability, losses and system behaviour under interference." },
        { title: "Reliability validation",
          desc: "We prepare solutions for long-term operation in field, industrial and aviation scenarios." },
      ],
    },
    cta: {
      text: "Have a non-standard task or a project that demands exceptional precision?",
      btn:  "Discuss a project",
    },
    footer: {
      copy: "© 2026 Olemax Systems", tagline: "GNSS · RF · Custom Engineering",
      email: "info@olemax-systems.com", phone: "+380 97 266 5257", city: "Kyiv, Ukraine",
    },
  },
}

// ─────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { overflow-x: hidden; max-width: 100vw; scroll-behavior: smooth; }
body  { background: #0B0C0E; color: #F3F4F6; }
img   { max-width: 100%; height: auto; }
a     { text-decoration: none; color: inherit; }
::selection { background: #3D7FFF; color: #0B0C0E; }

.olx-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
.olx-mono    { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

/* ── Eyebrow ── */
.olx-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11.5px; font-weight: 500; letter-spacing: 0.13em;
  text-transform: uppercase; color: #3D7FFF; margin: 0 0 18px;
}

/* ── Buttons ── */
.olx-btn-primary, .olx-btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600;
  padding: 13px 24px; border-radius: 10px; cursor: pointer; border: 1px solid transparent;
  white-space: nowrap;
  transition: transform .25s ease, box-shadow .25s ease, filter .25s ease,
              background .25s ease, border-color .25s ease;
}
.olx-btn-primary  { background: #3D7FFF; color: #08090b; }
.olx-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.09);
  box-shadow: 0 12px 28px rgba(61,127,255,.35); }
.olx-btn-primary svg { transition: transform .25s ease; }
.olx-btn-primary:hover svg { transform: translateX(3px); }
.olx-btn-secondary { background: transparent; color: #F3F4F6; border-color: rgba(255,255,255,.12); }
.olx-btn-secondary:hover { background: rgba(255,255,255,.06);
  border-color: rgba(255,255,255,.28); transform: translateY(-2px); }
.olx-btn-primary:focus-visible,
.olx-btn-secondary:focus-visible { outline: 2px solid #3D7FFF; outline-offset: 3px; }
@media (max-width: 480px) {
  .olx-btn-primary, .olx-btn-secondary {
    width: 100%; justify-content: center; font-size: 14px; padding: 13px 20px;
  }
}

/* ── Badges ── */
.olx-badge {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px; font-weight: 500; color: #8B909A;
  padding: 6px 12px; border-radius: 100px; letter-spacing: .03em;
  border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
}

/* ── Lock readout ── */
.olx-lock-readout { display: flex; align-items: center; gap: 9px; margin-top: 18px; }
.olx-lock-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #3D7FFF;
  display: inline-block; flex-shrink: 0;
}
.olx-lock-text {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px; letter-spacing: .05em; color: #8B909A;
}

/* ════════════════════════════════════════════════
   HEADER  —  ключовий фікс
   
   Стратегія: header-inner має ТІЛЬКИ двох flex-дітей:
     1) логотип (зліва)
     2) .olx-nav-right (справа) — один контейнер,
        який всередині себе перемикається між
        desktop-nav та mobile-controls за допомогою
        display:flex / display:none.
   Таким чином space-between завжди ділить простір
   рівно між двома елементами і ніщо не з'їжджає.
════════════════════════════════════════════════ */
.olx-header {
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  background: rgba(11,12,14,.80);
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.olx-header-inner {
  max-width: 1360px; margin: 0 auto;
  padding: 0 clamp(20px,5vw,64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

/* Right slot — wraps everything on the right side */
.olx-nav-right {
  display: flex;
  align-items: center;
  gap: 0;                /* children control their own spacing */
}

/* Desktop nav links + lang switcher */
.olx-desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}
.olx-nav-link {
  font-family: 'Inter', sans-serif; font-size: 14.5px;
  color: #8B909A; transition: color .2s; cursor: pointer;
}
.olx-nav-link:hover { color: #F3F4F6; }

/* Lang switcher pill */
.olx-lang-pill {
  display: flex; gap: 3px; margin-left: 20px;
  padding: 3px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.025);
}
.olx-lang-btn {
  font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px;
  font-weight: 600; letter-spacing: .06em; padding: 5px 11px; border-radius: 6px;
  cursor: pointer; border: 1px solid transparent; background: transparent;
  color: #8B909A; transition: all .2s ease;
}
.olx-lang-btn.active {
  background: rgba(61,127,255,.15); border-color: rgba(61,127,255,.4); color: #3D7FFF;
}
.olx-lang-btn:hover:not(.active) { color: #F3F4F6; }

/* Mobile controls: lang pill + hamburger
   — hidden on desktop, shown on mobile */
.olx-mobile-controls {
  display: none;
  align-items: center;
  gap: 8px;
}
.olx-hamburger {
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; cursor: pointer;
  padding: 6px; border-radius: 8px; color: #F3F4F6;
}

@media (max-width: 720px) {
  /* Hide desktop nav, show mobile controls */
  .olx-desktop-nav     { display: none; }
  .olx-mobile-controls { display: flex; }
}

/* ── Mobile drawer ── */
.olx-mobile-nav {
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 999;
  background: #0B0C0E;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 28px 28px 48px;
  border-top: 1px solid rgba(255,255,255,.07);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.olx-mobile-nav a {
  display: block; padding: 18px 0; color: #F3F4F6;
  font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600;
  letter-spacing: -.01em; text-align: left;
  border-bottom: 1px solid rgba(255,255,255,.06);
  transition: color .2s;
}
.olx-mobile-nav a:hover { color: #3D7FFF; }
.olx-mobile-nav .olx-mobile-email {
  color: #3D7FFF; margin-top: 8px; font-size: 18px;
}

/* ── Section wrapper ── */
.olx-section { max-width: 1360px; margin: 0 auto; padding: 0 clamp(20px,5vw,64px); }

/* ── Hero ── */
.olx-hero-grid {
  display: grid; grid-template-columns: 1fr 0.82fr;
  gap: 60px; align-items: center;
}
@media (max-width: 860px) {
  .olx-hero-grid { grid-template-columns: 1fr; gap: 40px; }
}

/* ── Solutions ── */
.olx-solutions-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
}
@media (max-width: 900px) { .olx-solutions-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .olx-solutions-grid { grid-template-columns: 1fr; gap: 16px; } }

/* ── Card ── */
.olx-card {
  display: block; background: #111317;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 18px; overflow: hidden;
  transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
}
.olx-card:hover {
  border-color: rgba(61,127,255,.45);
  box-shadow: 0 22px 44px rgba(0,0,0,.45);
  transform: translateY(-4px);
}
.olx-card-image-wrap {
  position: relative; aspect-ratio: 4/3; overflow: hidden; background: #0A0A0C;
}
.olx-card-image-wrap img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .6s ease;
}
.olx-card:hover .olx-card-image-wrap img { transform: scale(1.07); }
.olx-card-link {
  display: inline-flex; align-items: center; gap: 6px; color: #3D7FFF;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12.5px; font-weight: 500; margin-top: 4px; letter-spacing: .02em;
}
.olx-card-link svg { transition: transform .25s ease; }
.olx-card:hover .olx-card-link svg { transform: translateX(4px); }

/* ── R&D grid ── */
.olx-rd-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 28px; align-items: start;
}
@media (max-width: 780px) { .olx-rd-grid { grid-template-columns: 1fr; } }

/* ── Logo plaque ── */
.olx-logo-plaque {
  width: 40px; height: 40px; border-radius: 12px;
  background: #ffffff; display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}
.olx-logo-plaque img { width: 28px; height: 28px; object-fit: contain; display: block; }

/* ── CTA ── */
.olx-cta-banner {
  display: flex; flex-wrap: wrap; align-items: center;
  justify-content: space-between; gap: 22px;
  padding: clamp(24px,4vw,38px); border-radius: 20px;
  background: linear-gradient(135deg,rgba(255,255,255,.038),rgba(255,255,255,.01));
  border: 1px solid rgba(255,255,255,.09);
}
@media (max-width: 560px) {
  .olx-cta-banner { flex-direction: column; text-align: center; }
  .olx-cta-banner a { width: 100%; justify-content: center; }
}

/* ── Footer ── */
.olx-footer-inner {
  display: flex; flex-wrap: wrap; align-items: center;
  justify-content: space-between; gap: 16px;
}
@media (max-width: 600px) {
  .olx-footer-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
}

@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`

// ─────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang]     = useState<"ua" | "en">("ua")
  const [menuOpen, setMenu] = useState(false)
  const t       = content[lang]
  const reduced = useReducedMotion()

  useEffect(() => {
    const close = () => { if (window.innerWidth > 720) setMenu(false) }
    window.addEventListener("resize", close)
    return () => window.removeEventListener("resize", close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  function closeMenu(anchor?: string) {
    setMenu(false)
    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" })
      }, 280)
    }
  }

  /* Shared lang pill — rendered in both desktop nav and mobile controls */
  const LangPill = () => (
    <div className="olx-lang-pill">
      <button className={`olx-lang-btn${lang === "ua" ? " active" : ""}`}
        onClick={() => setLang("ua")}>UA</button>
      <button className={`olx-lang-btn${lang === "en" ? " active" : ""}`}
        onClick={() => setLang("en")}>EN</button>
    </div>
  )

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════════════════════════════════════════
          HEADER
          Structure:
            .olx-header-inner
              ├─ logo (motion.div)          ← flex child 1
              └─ .olx-nav-right             ← flex child 2
                    ├─ .olx-desktop-nav  (desktop only, hidden ≤720px)
                    └─ .olx-mobile-controls (mobile only, hidden >720px)
      ══════════════════════════════════════════════ */}
      <header className="olx-header">
        <div className="olx-header-inner">

          {/* ── Flex child 1: Logo ── */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "default" }}
            whileHover={reduced ? {} : {
              rotate: [0, -4, 4, -2, 0], scale: 1.05,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}>
            <div className="olx-logo-plaque">
              <img src={LOGO_URL} alt="OS" />
            </div>
            <span className="olx-display"
              style={{ fontWeight: 700, fontSize: 15, letterSpacing: ".06em",
                textTransform: "uppercase", color: "#F3F4F6" }}>
              OLEMAX SYSTEMS
            </span>
          </motion.div>

          {/* ── Flex child 2: right-side nav slot ── */}
          <div className="olx-nav-right">

            {/* Desktop: links + lang pill */}
            <nav className="olx-desktop-nav">
              <a href="#solutions" className="olx-nav-link">{t.nav.solutions}</a>
              <a href="#rd"        className="olx-nav-link">{t.nav.rd}</a>
              <a href="#contact"   className="olx-nav-link">{t.nav.contact}</a>
              <LangPill />
            </nav>

            {/* Mobile: lang pill + hamburger */}
            <div className="olx-mobile-controls">
              <LangPill />
              <button className="olx-hamburger" aria-label="Меню"
                onClick={() => setMenu((v) => !v)}>
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="olx-mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.26, ease }}>
              <a href="#solutions" onClick={() => closeMenu("solutions")}>{t.nav.solutions}</a>
              <a href="#rd"        onClick={() => closeMenu("rd")}>{t.nav.rd}</a>
              <a href="#contact"   onClick={() => closeMenu("contact")}>{t.nav.contact}</a>
              <a href="mailto:info@olemax-systems.com"
                className="olx-mobile-email"
                onClick={() => setMenu(false)}>
                info@olemax-systems.com
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "10%", right: "5%",
            width: "45%", height: "70%",
            background: "radial-gradient(circle, rgba(61,127,255,.12) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="olx-section"
          style={{ paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(64px,10vw,130px)" }}>
          <div className="olx-hero-grid">

            {/* Text column */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              <motion.p variants={staggerItem} className="olx-eyebrow">
                <TargetMark size={13} color="#3D7FFF" />
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1 variants={staggerItem} className="olx-display"
                style={{ fontSize: "clamp(30px,5vw,60px)", fontWeight: 700,
                  lineHeight: 1.08, letterSpacing: "-.02em", margin: "0 0 20px" }}>
                {t.hero.h1start}{" "}
                <span style={{ color: "#3D7FFF" }}>{t.hero.h1accent}</span>
              </motion.h1>

              <motion.p variants={staggerItem}
                style={{ fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.65,
                  color: "#8B909A", maxWidth: 520, margin: "0 0 32px" }}>
                {t.hero.sub}
              </motion.p>

              <motion.div variants={staggerItem}
                style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                <a href="#solutions" className="olx-btn-primary">
                  {t.hero.btn1} <ArrowIcon />
                </a>
                <a href="mailto:info@olemax-systems.com" className="olx-btn-secondary">
                  {t.hero.btn2}
                </a>
              </motion.div>

              <motion.div variants={staggerItem}
                style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {t.hero.badges.map((b) => (
                  <span key={b} className="olx-badge">{b}</span>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual column */}
            <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .9, ease, delay: .2 }}
              style={{ position: "relative" }}>

              <motion.div aria-hidden
                style={{ position: "absolute", inset: "8%",
                  background: "radial-gradient(circle, rgba(61,127,255,.26) 0%, transparent 72%)",
                  filter: "blur(54px)", zIndex: 0 }}
                animate={reduced ? {} : { opacity: [.45, .75, .45], scale: [1, 1.06, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

              <div style={{ position: "relative", padding: 14 }}>
                <motion.div
                  animate={reduced ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "relative", zIndex: 1 }}>
                  <img src={IMG_HERO} alt="OLEMAX SYSTEMS hardware"
                    style={{ width: "100%", height: "auto", display: "block",
                      borderRadius: 18, border: "1px solid rgba(255,255,255,.09)" }} />
                  <HeroOsBadge reduced={reduced} />
                </motion.div>

                {/* Corner brackets */}
                <motion.div variants={bracketContainer} initial="hidden" animate="show"
                  aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                  {(["tl", "tr", "bl", "br"] as const).map((c) => (
                    <motion.div key={c} variants={bracketItem}
                      style={{ position: "absolute", inset: 0 }}>
                      <CornerBracket corner={c} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Lock readout */}
              <motion.div className="olx-lock-readout"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: 1.1 }}>
                <motion.span className="olx-lock-dot"
                  animate={reduced ? {} : { opacity: [1, .35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
                <span className="olx-lock-text">{t.hero.lock}</span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SOLUTIONS
      ══════════════════════════════════════════════ */}
      <section id="solutions" style={{ paddingBottom: "clamp(72px,10vw,140px)" }}>
        <div className="olx-section">
          <motion.div variants={fadeUp} {...inView(0.2)}
            style={{ textAlign: "center", maxWidth: 620,
              margin: "0 auto clamp(40px,6vw,70px)" }}>
            <p className="olx-eyebrow" style={{ justifyContent: "center" }}>
              <TargetMark size={13} color="#3D7FFF" />
              {t.solutions.eyebrow}
            </p>
            <h2 className="olx-display"
              style={{ fontSize: "clamp(26px,3.6vw,42px)", fontWeight: 700,
                lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: 14 }}>
              {t.solutions.title}
            </h2>
            <p style={{ fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.65, color: "#8B909A" }}>
              {t.solutions.sub}
            </p>
          </motion.div>

          <div className="olx-solutions-grid">
            {t.solutions.cards.map((card, i) => (
              <motion.a key={i} href="#" className="olx-card"
                variants={fadeUp} {...inView(0.15)}
                transition={{ duration: .6, delay: i * .1, ease } as never}>
                <div className="olx-card-image-wrap">
                  <img src={card.img} alt={card.title} loading="lazy" />
                </div>
                <div style={{ padding: "22px 20px 26px" }}>
                  <h3 className="olx-display"
                    style={{ fontSize: "clamp(16px,1.4vw,19.5px)", fontWeight: 600,
                      lineHeight: 1.3, marginBottom: 10 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9B9BA3", marginBottom: 14 }}>
                    {card.desc}
                  </p>
                  <span className="olx-card-link">
                    {card.link} <ArrowIcon size={13} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════ */}
      <ProductsSection
        gurykAImage={gurykAImg}
        gurykMImage={gurykMImg}
        gurykAPdf={gurykAPdf}
        gurykMPdf={gurykMPdf}
        lang={lang}
      />

      {/* ══════════════════════════════════════════════
          R&D
      ══════════════════════════════════════════════ */}
      <section id="rd" style={{ paddingBottom: "clamp(72px,10vw,140px)" }}>
        <div className="olx-section">
          <motion.div variants={fadeUp} {...inView(0.15)}
            style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <p className="olx-eyebrow">
              <TargetMark size={13} color="#3D7FFF" />
              {t.rd.eyebrow}
            </p>
            <h2 className="olx-display"
              style={{ fontSize: "clamp(26px,3.8vw,46px)", fontWeight: 700,
                lineHeight: 1.12, letterSpacing: "-.02em", marginBottom: 14, maxWidth: 700 }}>
              {t.rd.title}
            </h2>
            <p style={{ fontSize: "clamp(15px,1.3vw,16.5px)", lineHeight: 1.65,
                color: "#8B909A", maxWidth: 620 }}>
              {t.rd.sub}
            </p>
          </motion.div>

          <div className="olx-rd-grid">
            {/* Left — big photo */}
            <motion.div variants={fadeLeft} {...inView(0.15)} style={{ position: "relative" }}>
              <img src={IMG_RD} alt="RF Lab board traces"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover",
                  borderRadius: 18, display: "block",
                  border: "1px solid rgba(255,255,255,.09)" }} />
              <div className="olx-mono"
                style={{ position: "absolute", bottom: 16, left: 16, right: 16,
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(11,12,14,.82)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 8, padding: "8px 12px",
                  fontSize: 11, letterSpacing: ".1em", color: "#3D7FFF" }}>
                <motion.span style={{ width: 6, height: 6, borderRadius: "50%",
                    background: "#3D7FFF", display: "inline-block", flexShrink: 0 }}
                  animate={reduced ? {} : { opacity: [1, .3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                {t.rd.label}
              </div>
            </motion.div>

            {/* Right — three panels */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {t.rd.items.map((item, i) => (
                <motion.div key={i} variants={fadeRight} {...inView(0.1)}
                  style={{ background: "#111317",
                    border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: 16, padding: "clamp(18px,3vw,26px)" }}>
                  <h3 className="olx-display"
                    style={{ fontSize: "clamp(16px,1.4vw,19px)", fontWeight: 600, marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#8B909A" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section id="contact" style={{ paddingBottom: "clamp(64px,9vw,120px)" }}>
        <div className="olx-section">
          <motion.div className="olx-cta-banner" variants={fadeUp} {...inView(0.2)}>
            <p className="olx-display"
              style={{ fontSize: "clamp(15px,1.8vw,22px)", fontWeight: 600,
                lineHeight: 1.4, maxWidth: 480 }}>
              {t.cta.text}
            </p>
            <a href="mailto:info@olemax-systems.com" className="olx-btn-primary">
              {t.cta.btn} <ArrowIcon />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.07)",
          paddingTop: 28, paddingBottom: 28 }}>
        <div className="olx-section">
          <div className="olx-footer-inner">
            <span className="olx-mono"
              style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".04em" }}>
              {t.footer.copy}
            </span>
            <span className="olx-mono"
              style={{ fontSize: 12, color: "#444", letterSpacing: ".06em" }}>
              {t.footer.tagline}
            </span>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <a href={`mailto:${t.footer.email}`} className="olx-mono"
                style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".02em", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B909A")}>
                {t.footer.email}
              </a>
              <a href={`tel:${t.footer.phone.replace(/\s/g, "")}`} className="olx-mono"
                style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".02em", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B909A")}>
                {t.footer.phone}
              </a>
              <span className="olx-mono"
                style={{ fontSize: 12, color: "#444", letterSpacing: ".04em" }}>
                {t.footer.city}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
