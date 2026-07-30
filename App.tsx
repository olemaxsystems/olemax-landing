import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

const NOISE_BG =
    "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.035%22/%3E%3C/svg%3E')"

function TargetMark({ size = 24, color = "#3D7FFF" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        </svg>
    )
}

function ArrowIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    )
}

function CornerBracket({ position = "tl", color = "#3D7FFF" }: { position?: "tl" | "tr" | "bl" | "br"; color?: string }) {
    const transforms = {
        tl: "",
        tr: "scale(-1, 1)",
        bl: "scale(1, -1)",
        br: "scale(-1, -1)",
    }
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: transforms[position] }}>
            <path d="M0 12V0H12" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
    )
}

export default function App() {
    const shouldReduceMotion = useReducedMotion()
    const [formSubmitted, setFormSubmitted] = React.useState(false)

    const accentColor = "#3D7FFF"

    const fadeInVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: (custom: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] },
        }),
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0A0C10",
                color: "#E6E8EC",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                position: "relative",
                overflowX: "hidden",
                scrollBehavior: "smooth",
            }}
        >
            {/* Текстурний шум та сітка */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE_BG, pointerEvents: "none", zIndex: 1 }} />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "-15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "900px",
                    height: "600px",
                    background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px", position: "relative", zIndex: 2 }}>
                {/* Шапка */}
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "24px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        marginBottom: "64px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <TargetMark color={accentColor} />
                        <span style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "0.08em", color: "#FFFFFF" }}>
                            OLEMAX SYSTEMS
                        </span>
                    </div>

                    <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                        <a href="#solutions" style={{ color: "#94A3B8", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                            Напрямки
                        </a>
                        <a href="#about" style={{ color: "#94A3B8", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                            Про нас
                        </a>
                        <a href="#contact" style={{ color: "#94A3B8", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}>
                            Контакти
                        </a>
                    </nav>
                </header>

                {/* Hero section */}
                <section style={{ marginBottom: "120px" }}>
                    <motion.div initial="hidden" animate="visible" custom={0} variants={fadeInVariants}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 12px",
                                backgroundColor: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                color: "#94A3B8",
                                marginBottom: "24px",
                            }}
                        >
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                            СЕРІЙНЕ ВИРОБНИЦТВО КИЇВ, УКРАЇНА
                        </div>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={fadeInVariants}
                        style={{
                            fontSize: "clamp(38px, 5.5vw, 68px)",
                            fontWeight: 800,
                            lineHeight: 1.08,
                            letterSpacing: "-0.02em",
                            maxWidth: "920px",
                            marginBottom: "24px",
                            color: "#FFFFFF",
                        }}
                    >
                        Радіочастотні та GNSS-рішення високоточного призначення
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={fadeInVariants}
                        style={{ fontSize: "18px", lineHeight: 1.6, color: "#94A3B8", maxWidth: "680px", marginBottom: "40px" }}
                    >
                        Розробка, моделювання та виробництво спеціалізованих антен і ВЧ-компонентів для авіації, безпілотних платформ та оборонних задач.
                    </motion.p>

                    <motion.div initial="hidden" animate="visible" custom={3} variants={fadeInVariants} style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#solutions"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "16px 32px",
                                backgroundColor: accentColor,
                                color: "#FFFFFF",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "4px",
                                boxShadow: `0 4px 20px ${accentColor}40`,
                            }}
                        >
                            Каталог рішень <ArrowIcon />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#contact"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "16px 32px",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#E6E8EC",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "4px",
                            }}
                        >
                            Замовити розробку
                        </motion.a>
                    </motion.div>
                </section>

                {/* Напрямки */}
                <section id="solutions" style={{ marginBottom: "120px" }}>
                    <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accentColor, marginBottom: "32px" }}>
                        Ключові напрямки
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                        {[
                            {
                                title: "GNSS-антени преміум-класу",
                                desc: "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Стійкі до погодних умов та завад у складних умовах прийому.",
                                tag: "GNSS / L1/L2/L5",
                            },
                            {
                                title: "Радіочастотні системи для БПЛА",
                                desc: "ВЧ-модулі, підсилювачі та плати, спроєктовані за найвищими стандартами надійності для безпілотних та оборонних систем.",
                                tag: "RF / Aviation",
                            },
                            {
                                title: "Індивідуальні R&D розробки",
                                desc: "Проєктування форм-фактора та ВЧ-тракту під індивідуальні вимоги замовника — від схемотехніки до серійного випуску.",
                                tag: "Custom Engineering",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                variants={fadeInVariants}
                                whileHover={{ y: -4, borderColor: "rgba(61, 127, 255, 0.4)" }}
                                style={{
                                    position: "relative",
                                    padding: "36px",
                                    backgroundColor: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justify: "space-between",
                                    transition: "border-color 0.3s, transform 0.3s",
                                }}
                            >
                                <div style={{ position: "absolute", top: 10, left: 10 }}><CornerBracket position="tl" color={accentColor} /></div>
                                <div style={{ position: "absolute", top: 10, right: 10 }}><CornerBracket position="tr" color={accentColor} /></div>
                                <div style={{ position: "absolute", bottom: 10, left: 10 }}><CornerBracket position="bl" color={accentColor} /></div>
                                <div style={{ position: "absolute", bottom: 10, right: 10 }}><CornerBracket position="br" color={accentColor} /></div>

                                <div>
                                    <span style={{ fontSize: "11px", fontWeight: 600, color: accentColor, letterSpacing: "0.08em", display: "block", marginBottom: "12px" }}>
                                        {item.tag}
                                    </span>
                                    <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px", color: "#FFFFFF" }}>{item.title}</h3>
                                    <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#94A3B8", marginBottom: "28px" }}>{item.desc}</p>
                                </div>

                                <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: accentColor, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
                                    Замовити конфігурацію <ArrowIcon size={14} color={accentColor} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Блок про нас / характеристики */}
                <section id="about" style={{ marginBottom: "120px" }}>
                    <div
                        style={{
                            padding: "48px",
                            backgroundColor: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "12px",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "32px",
                        }}
                    >
                        {[
                            { num: "100%", label: "Власне виробництво в Києві" },
                            { num: "<0.1dB", label: "Мінімальне затухання в трактах" },
                            { num: "IP67/68", label: "Захист корпусів від вологи та пилу" },
                            { num: "R&D", label: "Повний цикл проектування та тестів" },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div style={{ fontSize: "36px", fontWeight: 800, color: "#FFFFFF", marginBottom: "8px" }}>{stat.num}</div>
                                <div style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.4 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Форма зв'язку та контакти */}
                <section id="contact">
                    <div
                        style={{
                            padding: "48px",
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "12px",
                        }}
                    >
                        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", marginBottom: "12px" }}>Обговорити проєкт</h2>
                            <p style={{ fontSize: "15px", color: "#94A3B8", marginBottom: "32px" }}>
                                Залиште заявку на підбір ВЧ-компонентів або розробку рішення за вашими ТЗ.
                            </p>

                            {formSubmitted ? (
                                <div style={{ padding: "20px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", borderRadius: "6px", color: "#10B981", fontWeight: 600 }}>
                                    Дякуємо! Дякуємо за звернення. Наш інженер зв'яжеться з вами найближчим часом.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    <input
                                        type="text"
                                        placeholder="Ваше ім'я або назва компанії"
                                        required
                                        style={{
                                            padding: "14px 18px",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: "6px",
                                            color: "#FFFFFF",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email або Телефон / Telegram"
                                        required
                                        style={{
                                            padding: "14px 18px",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: "6px",
                                            color: "#FFFFFF",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                    <textarea
                                        rows={4}
                                        placeholder="Короткий опис задачі або необхідних характеристик"
                                        style={{
                                            padding: "14px 18px",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: "6px",
                                            color: "#FFFFFF",
                                            fontSize: "14px",
                                            outline: "none",
                                            resize: "vertical",
                                        }}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        style={{
                                            padding: "16px",
                                            backgroundColor: accentColor,
                                            color: "#FFFFFF",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontWeight: 600,
                                            fontSize: "15px",
                                            cursor: "pointer",
                                            boxShadow: `0 4px 20px ${accentColor}30`,
                                        }}
                                    >
                                        Надіслати запит
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </div>
                </header>

                <footer style={{ marginTop: "80px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#64748B" }}>
                    <div>© {new Date().getFullYear()} OLEMAX SYSTEMS. Всі права захищено.</div>
                    <div>Київ, Україна</div>
                </footer>
            </main>
        </div>
    )
}
