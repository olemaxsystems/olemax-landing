import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import heroImg from "./hero.jpg"
import card1Img from "./card1.jpg"
import card2Img from "./card2.jpg"
import card3Img from "./card3.jpg"
import rdImg from "./rd.jpg"
import logoImg from "./logo.png"

// ─── Images ─────────────────────────────────────────────────────────
const IMG_HERO   = heroImg
const IMG_CARD_1 = card1Img
const IMG_CARD_2 = card2Img
const IMG_CARD_3 = card3Img
const IMG_RD     = rdImg
const LOGO_URL   = logoImg
// ─── Logo SVG (OS mark) ────────────────────────────────────────────
function OsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ flexShrink: 0 }}>
      <rect x="6" y="16" width="28" height="28" rx="7" stroke="#3D7FFF" strokeWidth="5" fill="none"/>
      <path d="M34 54 Q44 64 60 44" stroke="#3D7FFF" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M54 30 L74 10" stroke="#3D7FFF" strokeWidth="5" strokeLinecap="round"/>
      <path d="M64 10 L74 10 L74 20" stroke="#3D7FFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function TargetMark({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, display: "block" }}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.2" />
      <line x1="12" y1="0.5" x2="12" y2="4.5" stroke={color} strokeWidth="1.2" />
      <line x1="12" y1="19.5" x2="12" y2="23.5" stroke={color} strokeWidth="1.2" />
      <line x1="0.5" y1="12" x2="4.5" y2="12" stroke={color} strokeWidth="1.2" />
      <line x1="19.5" y1="12" x2="23.5" y2="12" stroke={color} strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.6" fill={color} />
    </svg>
  )
}

function ArrowIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, display: "block" }}>
      <path d="M3.5 8H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.5 3.5L13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
    <svg width="22" height="22" viewBox="0 0 22 22"
      style={{ position: "absolute", ...position, transform: `rotate(${rotation}deg)` }}>
      <path d="M1 9 L1 1 L9 1" stroke="#3D7FFF" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ─── Animation variants ────────────────────────────────────────────
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
const bracketContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
}
const bracketItem = {
  hidden: { opacity: 0, scale: 1.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
}

// ─── Content ───────────────────────────────────────────────────────
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
        {
          title: "GNSS-антени преміум-класу",
          desc: "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
          link: "Дізнатись більше",
          img: IMG_CARD_1,
        },
        {
          title: "Радіочастотні системи для авіації та оборони",
          desc: "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
          link: "Дізнатись більше",
          img: IMG_CARD_2,
        },
        {
          title: "Індивідуальні інженерні рішення",
          desc: "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
          link: "Дізнатись більше",
          img: IMG_CARD_3,
        },
      ],
    },
    rd: {
      eyebrow: "R&D ЦЕНТР",
      title: "Інженерія, що проходить повний цикл перевірки",
      sub: "У власному R&D-процесі ми поєднуємо моделювання, швидке прототипування та вимірювання радіочастотних характеристик, щоб кожне рішення було готове до реальних умов експлуатації.",
      label: "RF LAB · VALIDATION LOOP",
      items: [
        {
          title: "Швидке прототипування",
          desc: "Перевіряємо топологію, форм-фактор і матеріали до запуску у виробництво.",
        },
        {
          title: "RF-вимірювання",
          desc: "Аналізуємо стабільність сигналу, втрати та роботу системи в умовах перешкод.",
        },
        {
          title: "Валідація надійності",
          desc: "Готуємо рішення до довготривалої роботи в польових, промислових та авіаційних сценаріях.",
        },
      ],
    },
    cta: {
      text: "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
      btn: "Обговорити проєкт",
    },
    footer: {
      copy: "© 2026 Olemax Systems",
      tagline: "GNSS · RF · Custom Engineering",
      email: "info@olemax-systems.com",
      phone: "+380 97 266 5257",
      city: "Kyiv, Ukraine",
    },
  },
  en: {
    nav: { solutions: "Solutions", rd: "R&D", contact: "Contact" },
    hero: {
      eyebrow: "GNSS ANTENNAS & RF SYSTEMS",
      h1start: "Precision that doesn't depend",
      h1accent: "on interference",
      sub: "We design GNSS antennas and radio-frequency systems that maintain a stable signal even in the most challenging environments. Equipment trusted in aviation, defence and industry.",
      btn1: "View solutions",
      btn2: "Contact us",
      lock: "SIGNAL ACQUIRED · RTK ACCURACY",
      badges: ["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"],
    },
    solutions: {
      eyebrow: "OUR SOLUTIONS",
      title: "What we build",
      sub: "From antennas to complete RF systems — every product is engineered to perform flawlessly even when conditions are far from ideal.",
      cards: [
        {
          title: "Premium-grade GNSS antennas",
          desc: "Multi-band antennas supporting GPS, GLONASS, Galileo and BeiDou. The housing withstands any weather, and accuracy holds even in demanding reception conditions.",
          link: "Learn more",
          img: IMG_CARD_1,
        },
        {
          title: "RF systems for aviation & defence",
          desc: "Boards and modules designed to the highest reliability standards — for tasks where the cost of error is too high and signal stability is critical.",
          link: "Learn more",
          img: IMG_CARD_2,
        },
        {
          title: "Custom engineering solutions",
          desc: "We design the form factor and configuration to match a specific customer task — from first sketch to serial production.",
          link: "Learn more",
          img: IMG_CARD_3,
        },
      ],
    },
    rd: {
      eyebrow: "R&D CENTER",
      title: "Engineering that passes the full validation cycle",
      sub: "In our own R&D process we combine simulation, rapid prototyping and RF measurement to ensure every solution is ready for real-world operating conditions.",
      label: "RF LAB · VALIDATION LOOP",
      items: [
        {
          title: "Rapid prototyping",
          desc: "We verify topology, form factor and materials before production launch.",
        },
        {
          title: "RF measurement",
          desc: "We analyse signal stability, losses and system behaviour under interference.",
        },
        {
          title: "Reliability validation",
          desc: "We prepare solutions for long-term operation in field, industrial and aviation scenarios.",
        },
      ],
    },
    cta: {
      text: "Have a non-standard task or a project that demands exceptional precision?",
      btn: "Discuss a project",
    },
    footer: {
      copy: "© 2026 Olemax Systems",
      tagline: "GNSS · RF · Custom Engineering",
      email: "info@olemax-systems.com",
      phone: "+380 97 266 5257",
      city: "Kyiv, Ukraine",
    },
  },
}

// ─── Global styles ─────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #0B0C0E; color: #F3F4F6; }
a { text-decoration: none; color: inherit; }
::selection { background: #3D7FFF; color: #0B0C0E; }

.olx-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
.olx-mono    { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

/* ── Eyebrow ── */
.olx-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px; font-weight: 500; letter-spacing: 0.14em;
  text-transform: uppercase; color: #3D7FFF; margin: 0 0 20px;
}

/* ── Buttons ── */
.olx-btn-primary, .olx-btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600;
  padding: 14px 26px; border-radius: 10px; cursor: pointer; border: 1px solid transparent;
  transition: transform .25s ease, box-shadow .25s ease, filter .25s ease,
              background .25s ease, border-color .25s ease;
}
.olx-btn-primary  { background: #3D7FFF; color: #08090b; }
.olx-btn-primary:hover  { transform: translateY(-2px); filter: brightness(1.09);
  box-shadow: 0 12px 28px rgba(61,127,255,.35); }
.olx-btn-primary svg { transition: transform .25s ease; }
.olx-btn-primary:hover svg { transform: translateX(3px); }
.olx-btn-secondary { background: transparent; color: #F3F4F6; border-color: rgba(255,255,255,.09); }
.olx-btn-secondary:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.28);
  transform: translateY(-2px); }
.olx-btn-primary:focus-visible, .olx-btn-secondary:focus-visible { outline: 2px solid #3D7FFF; outline-offset: 3px; }

/* ── Badge ── */
.olx-badge {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11.5px; font-weight: 500; color: #8B909A;
  padding: 7px 13px; border-radius: 100px; letter-spacing: .03em;
  border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.03);
}

/* ── Lock readout ── */
.olx-lock-readout { display: flex; align-items: center; gap: 9px; margin-top: 20px; }
.olx-lock-dot { width: 7px; height: 7px; border-radius: 50%; background: #3D7FFF;
  display: inline-block; flex-shrink: 0; }
.olx-lock-text { font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px; letter-spacing: .05em; color: #8B909A; }

/* ── Hero grid ── */
.olx-hero-grid { display: grid; grid-template-columns: 1fr 0.82fr; gap: 60px; align-items: center; }
@media (max-width: 940px) { .olx-hero-grid { grid-template-columns: 1fr; gap: 52px; } }

/* ── Solutions grid ── */
.olx-solutions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
@media (max-width: 940px) { .olx-solutions-grid { grid-template-columns: 1fr; } }

/* ── Card ── */
.olx-card {
  display: block; background: #111317; border: 1px solid rgba(255,255,255,.09);
  border-radius: 18px; overflow: hidden;
  transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
}
.olx-card:hover { border-color: rgba(61,127,255,.45); box-shadow: 0 22px 44px rgba(0,0,0,.45);
  transform: translateY(-4px); }
.olx-card-image-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #0A0A0C; }
.olx-card-image-wrap img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .6s ease; }
.olx-card:hover .olx-card-image-wrap img { transform: scale(1.07); }
.olx-card-link { display: inline-flex; align-items: center; gap: 6px; color: #3D7FFF;
  font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12.5px; font-weight: 500;
  margin-top: 4px; letter-spacing: .02em; }
.olx-card-link svg { transition: transform .25s ease; }
.olx-card:hover .olx-card-link svg { transform: translateX(4px); }

/* ── R&D grid ── */
.olx-rd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
@media (max-width: 860px) { .olx-rd-grid { grid-template-columns: 1fr; } }

/* ── Nav ── */
.olx-header {
  position: sticky; top: 0; z-index: 100; backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(11,12,14,.72); border-bottom: 1px solid rgba(255,255,255,.07);
}

/* ── Lang switcher ── */
.olx-lang-btn {
  font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px;
  font-weight: 600; letter-spacing: .06em; padding: 5px 11px; border-radius: 6px;
  cursor: pointer; border: 1px solid transparent; background: transparent;
  color: #8B909A; transition: all .2s ease;
}
.olx-lang-btn.active { background: rgba(61,127,255,.15); border-color: rgba(61,127,255,.4); color: #3D7FFF; }
.olx-lang-btn:hover:not(.active) { color: #F3F4F6; }

/* ── Section ── */
.olx-section {
  max-width: 1360px; margin: 0 auto;
  padding: 0 clamp(24px,5vw,64px);
}

/* ── CTA banner ── */
.olx-cta-banner {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 22px; padding: clamp(28px,4vw,38px); border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,.01));
  border: 1px solid rgba(255,255,255,.09);
}

/* ── Footer nav ── */
.olx-nav-link {
  font-family: 'Inter', sans-serif; font-size: 14.5px; color: #8B909A;
  transition: color .2s; cursor: pointer;
}
.olx-nav-link:hover { color: #F3F4F6; }

@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<"ua" | "en">("ua")
  const t = content[lang]
  const reduced = useReducedMotion()

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ════════ HEADER ════════ */}
      <header className="olx-header">
        <div className="olx-section">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              height: 68 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {LOGO_URL
                ? <img src={LOGO_URL} alt="OLEMAX SYSTEMS" style={{ height: 30, width: "auto" }} />
                : <>
                    <OsLogo size={30} />
                    <span className="olx-display" style={{ fontWeight: 700, fontSize: 16,
                        letterSpacing: ".02em" }}>
                      OLEMAX SYSTEMS
                    </span>
                  </>
              }
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <a href="#solutions" className="olx-nav-link">{t.nav.solutions}</a>
              <a href="#rd" className="olx-nav-link">{t.nav.rd}</a>
              <a href="#contact" className="olx-nav-link">{t.nav.contact}</a>
              <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
                <button className={`olx-lang-btn${lang === "ua" ? " active" : ""}`}
                  onClick={() => setLang("ua")}>UA</button>
                <button className={`olx-lang-btn${lang === "en" ? " active" : ""}`}
                  onClick={() => setLang("en")}>EN</button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ════════ HERO ════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Radial glow bg */}
        <div aria-hidden style={{ position: "absolute", top: "10%", right: "5%",
            width: "45%", height: "70%",
            background: "radial-gradient(circle, rgba(61,127,255,.13) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="olx-section" style={{ paddingTop: "clamp(56px,8vw,96px)",
            paddingBottom: "clamp(80px,10vw,130px)" }}>
          <div className="olx-hero-grid">

            {/* Text column */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              <motion.p variants={staggerItem} className="olx-eyebrow">
                <TargetMark size={13} color="#3D7FFF" />
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1 variants={staggerItem} className="olx-display"
                style={{ fontSize: "clamp(34px,4.6vw,60px)", fontWeight: 700,
                  lineHeight: 1.08, letterSpacing: "-.02em", margin: "0 0 22px" }}>
                {t.hero.h1start}{" "}
                <span style={{ color: "#3D7FFF" }}>{t.hero.h1accent}</span>
              </motion.h1>

              <motion.p variants={staggerItem}
                style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.65,
                  color: "#8B909A", maxWidth: 520, margin: "0 0 36px" }}>
                {t.hero.sub}
              </motion.p>

              <motion.div variants={staggerItem}
                style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
                <a href="#solutions" className="olx-btn-primary">
                  {t.hero.btn1} <ArrowIcon />
                </a>
                <a href="mailto:info@olemax-systems.com" className="olx-btn-secondary">
                  {t.hero.btn2}
                </a>
              </motion.div>

              <motion.div variants={staggerItem}
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {t.hero.badges.map((b) => (
                  <span key={b} className="olx-badge">{b}</span>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual column */}
            <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .9, ease, delay: .15 }} style={{ position: "relative" }}>

              {/* Glow */}
              <motion.div aria-hidden
                style={{ position: "absolute", inset: "8%",
                  background: "radial-gradient(circle, rgba(61,127,255,.26) 0%, transparent 72%)",
                  filter: "blur(54px)", zIndex: 0 }}
                animate={reduced ? {} : { opacity: [.45, .75, .45], scale: [1, 1.06, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />

              {/* Image + brackets */}
              <div style={{ position: "relative", padding: 16 }}>
                <motion.div
                  animate={reduced ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "relative", zIndex: 1 }}>
                  <img src={IMG_HERO} alt="OLEMAX SYSTEMS hardware"
                    style={{ width: "100%", height: "auto", display: "block",
                      borderRadius: 18, border: "1px solid rgba(255,255,255,.09)" }} />
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
                transition={{ duration: .6, delay: 1.15 }}>
                <motion.span className="olx-lock-dot"
                  animate={reduced ? {} : { opacity: [1, .35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
                <span className="olx-lock-text">{t.hero.lock}</span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════ SOLUTIONS ════════ */}
      <section id="solutions" style={{ paddingBottom: "clamp(90px,10vw,140px)" }}>
        <div className="olx-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: .7, ease }}
            style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(48px,6vw,72px)" }}>
            <p className="olx-eyebrow" style={{ justifyContent: "center" }}>
              <TargetMark size={13} color="#3D7FFF" />
              {t.solutions.eyebrow}
            </p>
            <h2 className="olx-display"
              style={{ fontSize: "clamp(28px,3.6vw,42px)", fontWeight: 700,
                lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: 16 }}>
              {t.solutions.title}
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#8B909A" }}>
              {t.solutions.sub}
            </p>
          </motion.div>

          <div className="olx-solutions-grid">
            {t.solutions.cards.map((card, i) => (
              <motion.a key={i} href="#" className="olx-card"
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: .6, delay: i * .12, ease }}>
                <div className="olx-card-image-wrap">
                  <img src={card.img} alt={card.title} loading="lazy" />
                </div>
                <div style={{ padding: "26px 24px 28px" }}>
                  <h3 className="olx-display"
                    style={{ fontSize: 19.5, fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#9B9BA3", marginBottom: 16 }}>
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

      {/* ════════ R&D ════════ */}
      <section id="rd" style={{ paddingBottom: "clamp(90px,10vw,140px)" }}>
        <div className="olx-section">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: .7, ease }}
            style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
            <p className="olx-eyebrow">
              <TargetMark size={13} color="#3D7FFF" />
              {t.rd.eyebrow}
            </p>
            <h2 className="olx-display"
              style={{ fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 700,
                lineHeight: 1.12, letterSpacing: "-.02em", marginBottom: 16, maxWidth: 700 }}>
              {t.rd.title}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#8B909A", maxWidth: 620 }}>
              {t.rd.sub}
            </p>
          </motion.div>

          <div className="olx-rd-grid">
            {/* Left — big photo */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: .8, ease }}
              style={{ position: "relative" }}>
              <img src={IMG_RD} alt="RF Lab board traces"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover",
                  borderRadius: 18, display: "block",
                  border: "1px solid rgba(255,255,255,.09)" }} />
              {/* Label on photo */}
              <div className="olx-mono"
                style={{ position: "absolute", bottom: 20, left: 20, right: 20,
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(11,12,14,.82)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 8, padding: "8px 14px",
                  fontSize: 11, letterSpacing: ".1em", color: "#3D7FFF" }}>
                <motion.span style={{ width: 6, height: 6, borderRadius: "50%",
                    background: "#3D7FFF", display: "inline-block" }}
                  animate={reduced ? {} : { opacity: [1, .3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
                {t.rd.label}
              </div>
            </motion.div>

            {/* Right — three panels */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {t.rd.items.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: .65, delay: i * .12, ease }}
                  style={{ background: "#111317", border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: 16, padding: "clamp(20px,3vw,28px)" }}>
                  <h3 className="olx-display"
                    style={{ fontSize: 19, fontWeight: 600, marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#8B909A" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section id="contact" style={{ paddingBottom: "clamp(80px,9vw,120px)" }}>
        <div className="olx-section">
          <motion.div className="olx-cta-banner"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .7, ease }}>
            <p className="olx-display"
              style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 600,
                lineHeight: 1.4, maxWidth: 480 }}>
              {t.cta.text}
            </p>
            <a href="mailto:info@olemax-systems.com" className="olx-btn-primary">
              {t.cta.btn} <ArrowIcon />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.07)",
          paddingTop: 32, paddingBottom: 32 }}>
        <div className="olx-section">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center",
              justifyContent: "space-between", gap: 16 }}>
            <span className="olx-mono"
              style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".04em" }}>
              {t.footer.copy}
            </span>
            <span className="olx-mono"
              style={{ fontSize: 12, color: "#555", letterSpacing: ".06em" }}>
              {t.footer.tagline}
            </span>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
              <a href={`mailto:${t.footer.email}`} className="olx-mono"
                style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".02em",
                  transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B909A")}>
                {t.footer.email}
              </a>
              <a href={`tel:${t.footer.phone.replace(/\s/g, "")}`} className="olx-mono"
                style={{ fontSize: 12, color: "#8B909A", letterSpacing: ".02em",
                  transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B909A")}>
                {t.footer.phone}
              </a>
              <span className="olx-mono"
                style={{ fontSize: 12, color: "#555", letterSpacing: ".04em" }}>
                {t.footer.city}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
