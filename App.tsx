import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

const NOISE_BG =
    'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")'

function TargetMark({
    size = 24,
    color = "currentColor",
}: {
    size?: number
    color?: string
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ flexShrink: 0, display: "block" }}
        >
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
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0, display: "block" }}
        >
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
            <path
                d="M1 9 L1 1 L9 1"
                stroke="var(--olx-signal)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    )
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const staggerItem = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

const bracketContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
}

const bracketItem = {
    hidden: { opacity: 0, scale: 1.4 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: easeOut },
    },
}

export default function OlemaxHomepage() {
    const accentColor = "#3D7FFF"
    const showNoiseTexture = true
    const shouldReduceMotion = useReducedMotion()

    return (
        <div
            className="olx-root"
            style={
                {
                    position: "relative",
                    width: "100%",
                    backgroundColor: "#0B0C0E",
                    color: "#F3F4F6",
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    overflow: "hidden",
                    "--olx-signal": accentColor,
                    "--olx-steel": "#8B909A",
                    "--olx-hairline": "rgba(255,255,255,0.09)",
                    "--olx-surface": "#111317",
                } as React.CSSProperties
            }
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
                .olx-root * , .olx-root *::before, .olx-root *::after { box-sizing: border-box; }
                .olx-root a { text-decoration: none; color: inherit; }
                .olx-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
                .olx-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .olx-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'IBM Plex Mono', ui-monospace, monospace;
                    font-size: 12px; font-weight: 500; letter-spacing: 0.14em;
                    text-transform: uppercase; color: var(--olx-signal);
                    margin: 0 0 20px;
                }
                .olx-grid { display: grid; grid-template-columns: 1fr 0.82fr; gap: 60px; align-items: center; }
                @media (max-width: 940px) { .olx-grid { grid-template-columns: 1fr; gap: 52px; } }
                .olx-badge-row { display: flex; flex-wrap: wrap; gap: 10px; }
                .olx-badge {
                    font-family: 'IBM Plex Mono', ui-monospace, monospace;
                    font-size: 11.5px; font-weight: 500; color: var(--olx-steel);
                    padding: 7px 13px; border-radius: 100px; letter-spacing: 0.03em;
                    border: 1px solid var(--olx-hairline); background: rgba(255,255,255,0.03);
                }
                .olx-btn-primary, .olx-btn-secondary {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 15px; font-weight: 600; padding: 14px 26px;
                    border-radius: 10px; cursor: pointer; border: 1px solid transparent;
                    transition: transform .25s ease, box-shadow .25s ease, filter .25s ease, background .25s ease, border-color .25s ease;
                }
                .olx-btn-primary { background: var(--olx-signal); color: #08090b; }
                .olx-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 12px 28px color-mix(in srgb, var(--olx-signal) 35%, transparent); }
                .olx-btn-primary svg { transition: transform .25s ease; }
                .olx-btn-primary:hover svg { transform: translateX(3px); }
                .olx-btn-secondary { background: transparent; color: #F3F4F6; border-color: var(--olx-hairline); }
                .olx-btn-secondary:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.28); transform: translateY(-2px); }
                .olx-lock-readout { display: flex; align-items: center; gap: 9px; margin-top: 20px; }
                .olx-lock-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--olx-signal); display: inline-block; flex-shrink: 0; }
                .olx-lock-text { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.05em; color: var(--olx-steel); }
                .olx-solutions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
                @media (max-width: 940px) { .olx-solutions-grid { grid-template-columns: 1fr; } }
                .olx-card {
                    display: block; background: var(--olx-surface); border: 1px solid var(--olx-hairline);
                    border-radius: 18px; overflow: hidden;
                    transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
                }
                .olx-card:hover { border-color: color-mix(in srgb, var(--olx-signal) 45%, transparent); box-shadow: 0 22px 44px rgba(0,0,0,0.45); transform: translateY(-4px); }
                .olx-card-image-wrap { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #0A0A0C; }
                .olx-card-image-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s ease; }
                .olx-card:hover .olx-card-image-wrap img { transform: scale(1.07); }
                .olx-card-link {
                    display: inline-flex; align-items: center; gap: 6px; color: var(--olx-signal);
                    font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12.5px; font-weight: 500;
                    margin-top: 4px; letter-spacing: 0.02em;
                }
            `}</style>

            {showNoiseTexture && (
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: NOISE_BG, opacity: 0.045, mixBlendMode: "overlay", pointerEvents: "none", zIndex: 0 }} />
            )}

            {/* ============ HERO ============ */}
            <section style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "clamp(28px,5vw,56px) clamp(24px,5vw,64px) clamp(70px,9vw,120px)" }}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "clamp(56px,9vw,100px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="olx-display" style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 700, fontSize: 17, letterSpacing: "0.01em" }}>
                        <TargetMark size={22} color="var(--olx-signal)" />
                        OLEMAX SYSTEMS
                    </div>
                    <nav style={{ display: "flex", gap: "24px", fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace" }}>
                        <a href="#olx-solutions" style={{ color: "var(--olx-steel)" }}>Рішення</a>
                        <a href="#contact" style={{ color: "var(--olx-steel)" }}>Контакти</a>
                    </nav>
                </motion.div>

                <div className="olx-grid">
                    <motion.div variants={staggerContainer} initial="hidden" animate="show">
                        <motion.p variants={staggerItem} className="olx-eyebrow">
                            <TargetMark size={13} color="var(--olx-signal)" />
                            ІННОВАЦІЇ В GNSS ТА РАДІОЕЛЕКТРОНІЦІ
                        </motion.p>

                        <motion.h1 variants={staggerItem} className="olx-display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 22px" }}>
                            Точність, яка <span style={{ color: "var(--olx-signal)" }}>не залежить від перешкод</span>
                        </motion.h1>

                        <motion.p variants={staggerItem} style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.65, color: "var(--olx-steel)", maxWidth: 520, margin: "0 0 36px" }}>
                            Ми розробляємо GNSS-антени та радіочастотні системи, які зберігають стабільний сигнал навіть у найскладніших умовах. Обладнання, якому довіряють в авіації, обороні та промисловості.
                        </motion.p>

                        <motion.div variants={staggerItem} style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
                            <a href="#olx-solutions" className="olx-btn-primary">
                                Переглянути рішення <ArrowIcon />
                            </a>
                            <a href="#contact" className="olx-btn-secondary">
                                Зв’язатися з нами
                            </a>
                        </motion.div>

                        <motion.div variants={staggerItem} className="olx-badge-row">
                            {["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"].map((badge, i) => (
                                <span key={i} className="olx-badge">{badge}</span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }} style={{ position: "relative" }}>
                        <div style={{ position: "relative", padding: 16 }}>
                            <div style={{ position: "relative", zIndex: 1, borderRadius: 18, overflow: "hidden", border: "1px solid var(--olx-hairline)" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
                                    alt="Обладнання OLEMAX SYSTEMS"
                                    style={{ width: "100%", height: "auto", display: "block" }}
                                />
                            </div>

                            <motion.div variants={bracketContainer} initial="hidden" animate="show" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                                <motion.div variants={bracketItem} style={{ position: "absolute", inset: 0 }}><CornerBracket corner="tl" /></motion.div>
                                <motion.div variants={bracketItem} style={{ position: "absolute", inset: 0 }}><CornerBracket corner="tr" /></motion.div>
                                <motion.div variants={bracketItem} style={{ position: "absolute", inset: 0 }}><CornerBracket corner="bl" /></motion.div>
                                <motion.div variants={bracketItem} style={{ position: "absolute", inset: 0 }}><CornerBracket corner="br" /></motion.div>
                            </motion.div>
                        </div>

                        <motion.div className="olx-lock-readout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.15 }}>
                            <span className="olx-lock-dot" />
                            <span className="olx-lock-text">СИГНАЛ ЗАФІКСОВАНО · RTK ТОЧНІСТЬ</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ============ КЛЮЧОВІ РІШЕННЯ ============ */}
            <section id="olx-solutions" style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "0 clamp(24px,5vw,64px) clamp(90px,10vw,140px)" }}>
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }} style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(48px,6vw,72px)" }}>
                    <p className="olx-eyebrow" style={{ justifyContent: "center" }}><TargetMark size={13} color="var(--olx-signal)" /> НАШІ РІШЕННЯ</p>
                    <h2 className="olx-display" style={{ fontSize: "clamp(28px,3.6vw,42px)", fontWeight: 700, margin: "0 0 16px" }}>Що ми створюємо</h2>
                    <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "var(--olx-steel)", margin: 0 }}>
                        Від антен до готових радіочастотних систем — кожен продукт ми проєктуємо так, щоб він працював бездоганно навіть тоді, коли умови далекі від ідеальних.
                    </p>
                </motion.div>

                <div className="olx-solutions-grid">
                    {[
                        {
                            title: "GNSS-антени преміум-класу",
                            description: "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов.",
                            img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop"
                        },
                        {
                            title: "Радіочастотні системи для авіації та оборони",
                            description: "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
                            img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
                        },
                        {
                            title: "Індивідуальні інженерні рішення",
                            description: "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
                            img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
                        }
                    ].map((item, i) => (
                        <motion.div key={i} className="olx-card" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12, ease: easeOut }}>
                            <div className="olx-card-image-wrap">
                                <img src={item.img} alt={item.title} loading="lazy" />
                            </div>
                            <div style={{ padding: "26px 24px 28px" }}>
                                <h3 className="olx-display" style={{ fontSize: 19.5, fontWeight: 600, margin: "0 0 10px" }}>{item.title}</h3>
                                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#9B9BA3", margin: "0 0 16px" }}>{item.description}</p>
                                <a href="#contact" className="olx-card-link">Дізнатись більше <ArrowIcon size={13} /></a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div id="contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginTop: "clamp(48px,6vw,72px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 22, padding: "clamp(28px,4vw,38px)", borderRadius: 20, background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))", border: "1px solid var(--olx-hairline)" }}>
                    <p style={{ fontSize: 18, fontWeight: 600, margin: 0, maxWidth: 480, lineHeight: 1.4 }} className="olx-display">
                        Маєте нестандартну задачу або проєкт, що вимагає особливої точності?
                    </p>
                    <a href="mailto:info@olemax-systems.com" className="olx-btn-primary">
                        Обговорити проєкт <ArrowIcon />
                    </a>
                </motion.div>
            </section>
        </div>
    )
}
