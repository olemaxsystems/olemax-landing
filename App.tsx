import * as React from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"

const NOISE_BG =
    'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")'

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
        corner === "tl"
            ? { top: 0, left: 0 }
            : corner === "tr"
              ? { top: 0, right: 0 }
              : corner === "br"
                ? { bottom: 0, right: 0 }
                : { bottom: 0, left: 0 }
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            style={{
                position: "absolute",
                ...position,
                transform: `rotate(${rotation}deg)`,
            }}
        >
            <path d="M1 9 L1 1 L9 1" stroke="var(--olx-signal)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
    )
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const content = {
    UA: {
        nav: { solutions: "Рішення", contact: "Контакт" },
        hero: {
            eyebrow: "ІННОВАЦІЇ В GNSS ТА РАДІОЕЛЕКТРОНІЦІ",
            titleStart: "Точність, яка",
            titleAccent: "не залежить від перешкод",
            sub: "Ми розробляємо GNSS-антени та радіочастотні системи, які зберігають стабільний сигнал навіть у найскладніших умовах. Обладнання, якому довіряють в авіації, обороні та промисловості.",
            btn1: "Переглянути рішення",
            btn2: "Зв’язатися з нами",
            lock: "СИГНАЛ ЗАФІКСОВАНО · RTK ТОЧНІСТЬ",
        },
        solutions: {
            eyebrow: "НАШІ РІШЕННЯ",
            title: "Що ми створюємо",
            sub: "Від антен до готових радіочастотних систем — кожен продукт ми проєктуємо так, щоб він працював бездоганно навіть тоді, коли умови далекі від ідеальних.",
            items: [
                {
                    title: "GNSS-антени преміум-класу",
                    desc: "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
                    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                },
                {
                    title: "Радіочастотні системи для авіації та оборони",
                    desc: "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
                    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                },
                {
                    title: "Індивідуальні інженерні рішення",
                    desc: "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
                    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                },
            ],
            cta: "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
            ctaBtn: "Обговорити проєкт",
        },
    },
    EN: {
        nav: { solutions: "Solutions", contact: "Contact" },
        hero: {
            eyebrow: "INNOVATIONS IN GNSS & RADIO ELECTRONICS",
            titleStart: "Precision that",
            titleAccent: "defies interference",
            sub: "We engineer high-performance GNSS antennas and RF systems designed to maintain rock-solid signal lock in the most demanding environments. Trusted in aviation, defense, and industry.",
            btn1: "Explore Solutions",
            btn2: "Contact Us",
            lock: "SIGNAL LOCKED · RTK PRECISION",
        },
        solutions: {
            eyebrow: "OUR SOLUTIONS",
            title: "What we build",
            sub: "From specialized antennas to complete RF sub-systems — every product is engineered for flawless performance when conditions are far from ideal.",
            items: [
                {
                    title: "Premium GNSS Antennas",
                    desc: "Multi-frequency antennas supporting GPS, GLONASS, Galileo, and BeiDou. Ruggedized weatherproof enclosures ensure stable precision even under severe signal obstruction.",
                    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
                },
                {
                    title: "RF Systems for Aviation & Defense",
                    desc: "Custom boards and RF modules built to the highest reliability standards — designed for mission-critical applications where signal stability is paramount.",
                    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                },
                {
                    title: "Custom Engineering & R&D",
                    desc: "We design custom form-factors and RF architectures tailored to your exact specifications — from initial schematics to full-scale series production.",
                    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                },
            ],
            cta: "Have a custom challenge or project requiring extreme precision?",
            ctaBtn: "Discuss Project",
        },
    },
}

export default function OlemaxHomepage() {
    const [lang, setLang] = React.useState<"UA" | "EN">("UA")
    const shouldReduceMotion = useReducedMotion()

    const t = content[lang]

    return (
        <div
            className="olx-root"
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#0B0C0E",
                color: "#F3F4F6",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                overflowX: "hidden",
                "--olx-signal": "#3D7FFF",
                "--olx-steel": "#8B909A",
                "--olx-hairline": "rgba(255,255,255,0.09)",
                "--olx-surface": "#111317",
            } as React.CSSProperties}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
                * { box-sizing: border-box; }
                a { text-decoration: none; color: inherit; }
                .olx-display { font-family: 'Space Grotesk', sans-serif; }
                .olx-mono { font-family: 'IBM Plex Mono', monospace; }
                .olx-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'IBM Plex Mono', monospace; font-size: 12px;
                    font-weight: 500; letter-spacing: 0.14em;
                    text-transform: uppercase; color: var(--olx-signal); margin: 0 0 20px;
                }
                .olx-grid { display: grid; grid-template-columns: 1fr 0.82fr; gap: 60px; align-items: center; }
                @media (max-width: 940px) { .olx-grid { grid-template-columns: 1fr; gap: 52px; } }
                .olx-badge {
                    font-family: 'IBM Plex Mono', monospace; font-size: 11.5px;
                    font-weight: 500; color: var(--olx-steel); padding: 7px 13px;
                    border-radius: 100px; border: 1px solid var(--olx-hairline);
                    background: rgba(255,255,255,0.03);
                }
                .olx-btn-primary, .olx-btn-secondary {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'Space Grotesk', sans-serif; font-size: 15px;
                    font-weight: 600; padding: 14px 26px; border-radius: 10px;
                    cursor: pointer; border: 1px solid transparent;
                    transition: all .25s ease;
                }
                .olx-btn-primary { background: var(--olx-signal); color: #08090b; }
                .olx-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 12px 28px rgba(61,127,255,0.35); }
                .olx-btn-secondary { background: transparent; color: #F3F4F6; border-color: var(--olx-hairline); }
                .olx-btn-secondary:hover { background: rgba(255,255,255,0.06); transform: translateY(-2px); }
                .olx-card {
                    display: block; background: var(--olx-surface); border: 1px solid var(--olx-hairline);
                    border-radius: 18px; overflow: hidden; transition: all .3s ease;
                }
                .olx-card:hover { border-color: rgba(61,127,255,0.45); transform: translateY(-4px); box-shadow: 0 22px 44px rgba(0,0,0,0.45); }
                .olx-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; }
                .olx-card:hover img { transform: scale(1.07); }
                .lang-btn {
                    background: none; border: none; font-family: 'IBM Plex Mono', monospace;
                    font-size: 13px; font-weight: 600; cursor: pointer; padding: 6px 10px;
                    border-radius: 6px; transition: all 0.2s;
                }
                .lang-btn.active { background: var(--olx-signal); color: #08090b; }
                .lang-btn:not(.active) { color: var(--olx-steel); }
            `}</style>

            <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: NOISE_BG, opacity: 0.045, mixBlendMode: "overlay", pointerEvents: "none", zIndex: 0 }} />

            {/* SHARED HEADER + LANGUAGE SWITCHER */}
            <header style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "32px clamp(24px,5vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="olx-display" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 18 }}>
                    <TargetMark size={24} color="var(--olx-signal)" />
                    OLEMAX SYSTEMS
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <nav style={{ display: "flex", gap: 24, fontSize: 14, fontFamily: "'IBM Plex Mono', monospace" }}>
                        <a href="#olx-solutions" style={{ color: "var(--olx-steel)", transition: "color 0.2s" }}>{t.nav.solutions}</a>
                        <a href="#contact" style={{ color: "var(--olx-steel)", transition: "color 0.2s" }}>{t.nav.contact}</a>
                    </nav>

                    <div style={{ display: "flex", backgroundColor: "rgba(255,255,255,0.04)", padding: 4, borderRadius: 8, border: "1px solid var(--olx-hairline)" }}>
                        <button onClick={() => setLang("UA")} className={`lang-btn ${lang === "UA" ? "active" : ""}`}>UA</button>
                        <button onClick={() => setLang("EN")} className={`lang-btn ${lang === "EN" ? "active" : ""}`}>EN</button>
                    </div>
                </div>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={lang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* HERO SECTION */}
                    <section style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "40px clamp(24px,5vw,64px) 100px" }}>
                        <div className="olx-grid">
                            <div>
                                <p className="olx-eyebrow"><TargetMark size={13} color="var(--olx-signal)" /> {t.hero.eyebrow}</p>
                                <h1 className="olx-display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)", fontWeight: 700, lineHeight: 1.08, margin: "0 0 22px" }}>
                                    {t.hero.titleStart} <span style={{ color: "var(--olx-signal)" }}>{t.hero.titleAccent}</span>
                                </h1>
                                <p style={{ fontSize: "17px", lineHeight: 1.65, color: "var(--olx-steel)", maxWidth: 520, margin: "0 0 36px" }}>{t.hero.sub}</p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
                                    <a href="#olx-solutions" className="olx-btn-primary">{t.hero.btn1} <ArrowIcon /></a>
                                    <a href="#contact" className="olx-btn-secondary">{t.hero.btn2}</a>
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"].map((badge, i) => (
                                        <span key={i} className="olx-badge">{badge}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ position: "relative" }}>
                                <div style={{ position: "relative", padding: 16 }}>
                                    <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--olx-hairline)" }}>
                                        <img
                                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
                                            alt="OLEMAX RF Hardware"
                                            style={{ width: "100%", display: "block" }}
                                        />
                                    </div>
                                    <CornerBracket corner="tl" />
                                    <CornerBracket corner="tr" />
                                    <CornerBracket corner="bl" />
                                    <CornerBracket corner="br" />
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 20 }}>
                                    <motion.span
                                        animate={shouldReduceMotion ? {} : { opacity: [1, 0.35, 1] }}
                                        transition={{ duration: 1.6, repeat: Infinity }}
                                        style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "var(--olx-signal)" }}
                                    />
                                    <span className="olx-mono" style={{ fontSize: 12, color: "var(--olx-steel)" }}>{t.hero.lock}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SOLUTIONS SECTION */}
                    <section id="olx-solutions" style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "40px clamp(24px,5vw,64px) 120px" }}>
                        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 64px" }}>
                            <p className="olx-eyebrow" style={{ justifyContent: "center" }}><TargetMark size={13} color="var(--olx-signal)" /> {t.solutions.eyebrow}</p>
                            <h2 className="olx-display" style={{ fontSize: "38px", fontWeight: 700, margin: "0 0 16px" }}>{t.solutions.title}</h2>
                            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--olx-steel)", margin: 0 }}>{t.solutions.sub}</p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
                            {t.solutions.items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="olx-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div style={{ aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#0A0A0C" }}>
                                        <img src={item.img} alt={item.title} loading="lazy" />
                                    </div>
                                    <div style={{ padding: "26px 24px 28px" }}>
                                        <h3 className="olx-display" style={{ fontSize: 20, fontWeight: 600, margin: "0 0 10px" }}>{item.title}</h3>
                                        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#9B9BA3", margin: "0 0 16px" }}>{item.desc}</p>
                                        <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--olx-signal)", fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
                                            Дізнатись більше <ArrowIcon size={13} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Твій оригінальний компактний блок CTA */}
                        <div id="contact" style={{ marginTop: 64, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 22, padding: 36, borderRadius: 20, background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))", border: "1px solid var(--olx-hairline)" }}>
                            <p className="olx-display" style={{ fontSize: 18, fontWeight: 600, margin: 0, maxWidth: 480 }}>{t.solutions.cta}</p>
                            <a href="mailto:info@olemax-systems.com" className="olx-btn-primary">{t.solutions.ctaBtn} <ArrowIcon /></a>
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            <footer style={{ maxWidth: 1360, margin: "0 auto", padding: "32px clamp(24px,5vw,64px)", borderTop: "1px solid var(--olx-hairline)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--olx-steel)" }}>
                <div>© {new Date().getFullYear()} OLEMAX SYSTEMS. All rights reserved.</div>
                <div>Kyiv, Ukraine</div>
            </footer>
        </div>
    )
}
