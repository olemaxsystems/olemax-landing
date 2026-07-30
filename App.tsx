import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

// Допоміжні функції та іконки
function getImgSrc(image: any) {
    if (!image) return undefined
    if (typeof image === "string") return image
    if (typeof image === "object" && image.src) return image.src
    return undefined
}

const NOISE_BG =
    "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.035%22/%3E%3C/svg%3E')"

function TargetMark({ size = 24, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        </svg>
    )
}

function ArrowIcon({ size = 18, color = "currentColor" }) {
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
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: transforms[position] }}
        >
            <path d="M0 12V0H12" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
    )
}

export default function App(props: any) {
    const shouldReduceMotion = useReducedMotion()

    const {
        brandName = "OLEMAX SYSTEMS",
        statusBadgeText = "СЕРІЙНЕ ВИРОБНИЦТВО КИЇВ, УКРАЇНА",
        heroTitle = "Радіочастотні та GNSS-рішення високоточного призначення",
        heroSubtitle = "Розробка, моделювання та виробництво спеціалізованих антен і ВЧ-компонентів для авіації, безпілотних платром та оборонних задач.",
        primaryCtaText = "Каталог рішень",
        primaryCtaLink = "#solutions",
        secondaryCtaText = "Замовити розробку",
        secondaryCtaLink = "#contact",
        gridColumns = 3,
        solutionsTitle = "Ключові напрямки",
        solutions = [
            {
                title: "GNSS-антени преміум-класу",
                description:
                    "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
                linkText: "Дізнатись більше",
                link: "#gnss",
            },
            {
                title: "Радіочастотні системи для авіації та оборони",
                description:
                    "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
                linkText: "Дізнатись більше",
                link: "#rf",
            },
            {
                title: "Індивідуальні інженерні рішення",
                description:
                    "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
                linkText: "Дізнатись більше",
                link: "#custom",
            },
        ],
        bottomCta = {
            text: "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
            buttonText: "Обговорити проєкт",
            buttonLink: "#contact",
        },
        design = {
            accentColor: "#3D7FFF",
            showNoiseTexture: true,
        }
    } = props

    const accentColor = design?.accentColor || "#3D7FFF"

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0A0C10",
                color: "#E6E8EC",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Текстурний шум */}
            {design?.showNoiseTexture && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: NOISE_BG,
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />
            )}

            {/* Фонова сітка */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            {/* Радіальний градієнт */}
            <div
                style={{
                    position: "absolute",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "800px",
                    height: "500px",
                    background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 24px 80px",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Шапка / Навігація */}
                <header
                    style={{
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                        paddingBottom: "32px",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        marginBottom: "64px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <TargetMark color={accentColor} />
                        <span
                            style={{
                                fontWeight: 700,
                                fontSize: "18px",
                                letterSpacing: "0.08em",
                                color: "#FFFFFF",
                            }}
                        >
                            {brandName}
                        </span>
                    </div>

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
                        }}
                    >
                        <span
                            style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "#10B981",
                                boxShadow: "0 0 8px #10B981",
                            }}
                        />
                        {statusBadgeText}
                    </div>
                </header>

                {/* Блок Hero */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ marginBottom: "96px" }}
                >
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: "clamp(36px, 5vw, 64px)",
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            maxWidth: "900px",
                            marginBottom: "24px",
                            color: "#FFFFFF",
                        }}
                    >
                        {heroTitle}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: "18px",
                            lineHeight: 1.6,
                            color: "#94A3B8",
                            maxWidth: "680px",
                            marginBottom: "40px",
                        }}
                    >
                        {heroSubtitle}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
                    >
                        <a
                            href={primaryCtaLink}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "14px 28px",
                                backgroundColor: accentColor,
                                color: "#FFFFFF",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {primaryCtaText}
                            <ArrowIcon />
                        </a>

                        <a
                            href={secondaryCtaLink}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "14px 28px",
                                backgroundColor: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#E6E8EC",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {secondaryCtaText}
                        </a>
                    </motion.div>
                </motion.section>

                {/* Розділ "Ключові напрямки" */}
                <section style={{ marginBottom: "96px" }}>
                    <h2
                        style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: accentColor,
                            marginBottom: "32px",
                        }}
                    >
                        {solutionsTitle}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
                            gap: "24px",
                        }}
                    >
                        {solutions.map((item: any, index: number) => (
                            <div
                                key={index}
                                style={{
                                    position: "relative",
                                    padding: "32px",
                                    backgroundColor: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: "6px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div style={{ position: "absolute", top: 8, left: 8 }}>
                                    <CornerBracket position="tl" color={accentColor} />
                                </div>
                                <div style={{ position: "absolute", top: 8, right: 8 }}>
                                    <CornerBracket position="tr" color={accentColor} />
                                </div>
                                <div style={{ position: "absolute", bottom: 8, left: 8 }}>
                                    <CornerBracket position="bl" color={accentColor} />
                                </div>
                                <div style={{ position: "absolute", bottom: 8, right: 8 }}>
                                    <CornerBracket position="br" color={accentColor} />
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            marginBottom: "12px",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "15px",
                                            lineHeight: 1.6,
                                            color: "#94A3B8",
                                            marginBottom: "24px",
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                {item.linkText && (
                                    <a
                                        href={item.link || "#"}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            color: accentColor,
                                            textDecoration: "none",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.linkText}
                                        <ArrowIcon size={14} color={accentColor} />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Нижній заклик до дії (CTA) */}
                {bottomCta && (
                    <section
                        id="contact"
                        style={{
                            padding: "48px",
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            gap: "24px",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "22px",
                                fontWeight: 700,
                                maxWidth: "600px",
                                color: "#FFFFFF",
                            }}
                        >
                            {bottomCta.text}
                        </h3>
                        <a
                            href={bottomCta.buttonLink || "#"}
                            style={{
                                padding: "14px 32px",
                                backgroundColor: accentColor,
                                color: "#FFFFFF",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "4px",
                            }}
                        >
                            {bottomCta.buttonText}
                        </a>
                    </section>
                )}
            </main>
        </div>
    )
}
