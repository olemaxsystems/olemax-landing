// ============================================================
// OLEMAX SYSTEMS — Головна сторінка (Hero + Ключові рішення)
// Framer Code Component
//
// Як користуватись:
// 1. У Framer: Insert → Code → New Code File → вставте цей файл повністю.
// 2. Перетягніть компонент "Olemax Homepage" з панелі Insert на канвас.
// 3. У правій панелі властивостей (групи "Hero", "Рішення", "Нижній CTA",
//    "Дизайн") замініть текст-заглушки та завантажте свої зображення.
// ============================================================

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer-motion"
/**
 * OLEMAX SYSTEMS — Homepage (Hero + Ключові рішення)
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

// ------------------------------------------------------------
// Допоміжні функції та іконки
// ------------------------------------------------------------

function getImageSrc(image) {
    if (!image) return undefined
    if (typeof image === "string") return image
    if (typeof image === "object" && image.src) return image.src
    return undefined
}

const NOISE_BG =
    'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")'

// Фірмовий знак-ціль (echo продуктового брендування — перехрестя на GNSS-модулях)
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
            <line
                x1="12"
                y1="0.5"
                x2="12"
                y2="4.5"
                stroke={color}
                strokeWidth="1.2"
            />
            <line
                x1="12"
                y1="19.5"
                x2="12"
                y2="23.5"
                stroke={color}
                strokeWidth="1.2"
            />
            <line
                x1="0.5"
                y1="12"
                x2="4.5"
                y2="12"
                stroke={color}
                strokeWidth="1.2"
            />
            <line
                x1="19.5"
                y1="12"
                x2="23.5"
                y2="12"
                stroke={color}
                strokeWidth="1.2"
            />
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
            <path
                d="M3.5 8H12.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
            />
            <path
                d="M8.5 3.5L13 8L8.5 12.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// Кутова "рамка наведення" — сигнатурний елемент, що візуалізує момент
// захоплення GNSS-сигналу (аналог "RTK LOCK" на реальному дисплеї пристрою)
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

// ------------------------------------------------------------
// Анімаційні варіанти
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// Головний компонент
// ------------------------------------------------------------

export default function OlemaxHomepage(props: any) {
    const {
        style,
        logo,
        hero = {},
        solutionsSection = {},
        bottomCta = {},
        design = {},
    } = props

    const {
        eyebrow = "ІННОВАЦІЇ В GNSS ТА РАДІОЕЛЕКТРОНІЦІ",
        headlineStart = "Точність, яка",
        headlineAccent = "не залежить від перешкод",
        subheadline = "Ми розробляємо GNSS-антени та радіочастотні системи, які зберігають стабільний сигнал навіть у найскладніших умовах. Обладнання, якому довіряють в авіації, обороні та промисловості.",
        image: heroImage,
        backgroundTexture,
        primaryButtonText = "Переглянути рішення",
        primaryButtonLink = "#olx-solutions",
        secondaryButtonText = "Зв\u2019язатися з нами",
        secondaryButtonLink = "#contact",
        badges = ["GPS", "GLONASS", "GALILEO", "BEIDOU", "QZSS", "SBAS"],
        lockLabel = "СИГНАЛ ЗАФІКСОВАНО · RTK ТОЧНІСТЬ",
    } = hero

    const {
        eyebrow: solutionsEyebrow = "НАШІ РІШЕННЯ",
        title: solutionsTitle = "Що ми створюємо",
        subtitle:
            solutionsSubtitle = "Від антен до готових радіочастотних систем — кожен продукт ми проєктуємо так, щоб він працював бездоганно навіть тоді, коли умови далекі від ідеальних.",
        items = [
            {
                title: "GNSS-антени преміум-класу",
                description:
                    "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
            },
            {
                title: "Радіочастотні системи для авіації та оборони",
                description:
                    "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
            },
            {
                title: "Індивідуальні інженерні рішення",
                description:
                    "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
            },
        ],
    } = solutionsSection

    const {
        text: bottomCtaText = "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
        buttonText: bottomCtaButtonText = "Обговорити проєкт",
        buttonLink: bottomCtaButtonLink = "#contact",
    } = bottomCta

    const { accentColor = "#3D7FFF", showNoiseTexture = true } = design

    const shouldReduceMotion = useReducedMotion()

    const logoSrc = getImageSrc(logo)
    const heroImgSrc = getImageSrc(heroImage)
    const bgTextureSrc = getImageSrc(backgroundTexture)

    return (
        <div
            className="olx-root"
            style={
                {
                    position: "relative",
                    width: "100%",
                    backgroundColor: "#0B0C0E",
                    color: "#F3F4F6",
                    fontFamily:
                        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    overflow: "hidden",
                    "--olx-signal": accentColor,
                    "--olx-steel": "#8B909A",
                    "--olx-hairline": "rgba(255,255,255,0.09)",
                    "--olx-surface": "#111317",
                    ...style,
                } as React.CSSProperties
            }
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .olx-root * , .olx-root *::before, .olx-root *::after { box-sizing: border-box; }
        .olx-root a { text-decoration: none; color: inherit; }
        .olx-root ::selection { background: var(--olx-signal); color: #0B0C0E; }

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

        .olx-btn-primary:focus-visible, .olx-btn-secondary:focus-visible, .olx-card:focus-visible {
          outline: 2px solid var(--olx-signal); outline-offset: 3px;
        }

        .olx-lock-readout { display: flex; align-items: center; gap: 9px; margin-top: 20px; }
        .olx-lock-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--olx-signal); display: inline-block; flex-shrink: 0; }
        .olx-lock-text {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 12px; letter-spacing: 0.05em; color: var(--olx-steel);
        }

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
        .olx-card-link svg { transition: transform .25s ease; }
        .olx-card:hover .olx-card-link svg { transform: translateX(4px); }

        @media (prefers-reduced-motion: reduce) {
          .olx-root { scroll-behavior: auto; }
        }
      `}</style>

            {showNoiseTexture && (
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: NOISE_BG,
                        opacity: 0.045,
                        mixBlendMode: "overlay",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
            )}

            {bgTextureSrc && (
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "55%",
                        height: "65%",
                        backgroundImage: `url(${bgTextureSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.12,
                        maskImage:
                            "radial-gradient(circle at 75% 15%, black, transparent 68%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at 75% 15%, black, transparent 68%)",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />
            )}

            {/* ============ HERO ============ */}
            <section
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1360,
                    margin: "0 auto",
                    padding:
                        "clamp(28px,5vw,56px) clamp(24px,5vw,64px) clamp(70px,9vw,120px)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: "clamp(56px,9vw,100px)" }}
                >
                    {logoSrc ? (
                        <img
                            src={logoSrc}
                            alt="OLEMAX SYSTEMS"
                            style={{
                                height: 30,
                                width: "auto",
                                display: "block",
                            }}
                        />
                    ) : (
                        <div
                            className="olx-display"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 9,
                                fontWeight: 700,
                                fontSize: 17,
                                letterSpacing: "0.01em",
                            }}
                        >
                            <TargetMark size={22} color="var(--olx-signal)" />
                            OLEMAX SYSTEMS
                        </div>
                    )}
                </motion.div>

                <div className="olx-grid">
                    {/* --- Текстова колонка --- */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.p
                            variants={staggerItem}
                            className="olx-eyebrow"
                        >
                            <TargetMark size={13} color="var(--olx-signal)" />
                            {eyebrow}
                        </motion.p>

                        <motion.h1
                            variants={staggerItem}
                            className="olx-display"
                            style={{
                                fontSize: "clamp(34px, 4.6vw, 60px)",
                                fontWeight: 700,
                                lineHeight: 1.08,
                                letterSpacing: "-0.02em",
                                margin: "0 0 22px",
                            }}
                        >
                            {headlineStart}{" "}
                            <span style={{ color: "var(--olx-signal)" }}>
                                {headlineAccent}
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={staggerItem}
                            style={{
                                fontSize: "clamp(15.5px,1.4vw,18px)",
                                lineHeight: 1.65,
                                color: "var(--olx-steel)",
                                maxWidth: 520,
                                margin: "0 0 36px",
                            }}
                        >
                            {subheadline}
                        </motion.p>

                        <motion.div
                            variants={staggerItem}
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 14,
                                marginBottom: 40,
                            }}
                        >
                            <a
                                href={primaryButtonLink}
                                className="olx-btn-primary"
                            >
                                {primaryButtonText}
                                <ArrowIcon />
                            </a>
                            <a
                                href={secondaryButtonLink}
                                className="olx-btn-secondary"
                            >
                                {secondaryButtonText}
                            </a>
                        </motion.div>

                        <motion.div
                            variants={staggerItem}
                            className="olx-badge-row"
                        >
                            {badges.map((badge: string, i: number) => (
                                <span key={i} className="olx-badge">
                                    {badge}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* --- Візуальна колонка: продукт + "захоплення сигналу" --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: easeOut,
                            delay: 0.15,
                        }}
                        style={{ position: "relative" }}
                    >
                        <motion.div
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                inset: "8%",
                                background:
                                    "radial-gradient(circle, color-mix(in srgb, var(--olx-signal) 26%, transparent) 0%, transparent 72%)",
                                filter: "blur(54px)",
                                zIndex: 0,
                            }}
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                          opacity: [0.45, 0.75, 0.45],
                                          scale: [1, 1.06, 1],
                                      }
                            }
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <div style={{ position: "relative", padding: 16 }}>
                            <motion.div
                                animate={
                                    shouldReduceMotion ? {} : { y: [0, -10, 0] }
                                }
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{ position: "relative", zIndex: 1 }}
                            >
                                {heroImgSrc ? (
                                    <img
                                        src={heroImgSrc}
                                        alt="Обладнання OLEMAX SYSTEMS"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            display: "block",
                                            borderRadius: 18,
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1 / 1",
                                            borderRadius: 18,
                                            background:
                                                "linear-gradient(160deg, #111317, #0A0A0C)",
                                            border: "1px solid var(--olx-hairline)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <TargetMark
                                            size={42}
                                            color="rgba(255,255,255,0.18)"
                                        />
                                        <span
                                            className="olx-mono"
                                            style={{
                                                fontSize: 12,
                                                color: "rgba(255,255,255,0.28)",
                                            }}
                                        >
                                            ФОТО ПРОДУКТУ
                                        </span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Кутові рамки — сигнатурна анімація "захоплення сигналу" */}
                            <motion.div
                                variants={bracketContainer}
                                initial="hidden"
                                animate="show"
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    pointerEvents: "none",
                                }}
                            >
                                <motion.div
                                    variants={bracketItem}
                                    style={{ position: "absolute", inset: 0 }}
                                >
                                    <CornerBracket corner="tl" />
                                </motion.div>
                                <motion.div
                                    variants={bracketItem}
                                    style={{ position: "absolute", inset: 0 }}
                                >
                                    <CornerBracket corner="tr" />
                                </motion.div>
                                <motion.div
                                    variants={bracketItem}
                                    style={{ position: "absolute", inset: 0 }}
                                >
                                    <CornerBracket corner="bl" />
                                </motion.div>
                                <motion.div
                                    variants={bracketItem}
                                    style={{ position: "absolute", inset: 0 }}
                                >
                                    <CornerBracket corner="br" />
                                </motion.div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="olx-lock-readout"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.15 }}
                        >
                            <motion.span
                                className="olx-lock-dot"
                                animate={
                                    shouldReduceMotion
                                        ? {}
                                        : { opacity: [1, 0.35, 1] }
                                }
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <span className="olx-lock-text">{lockLabel}</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ============ КЛЮЧОВІ РІШЕННЯ ============ */}
            <section
                id="olx-solutions"
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: 1360,
                    margin: "0 auto",
                    padding: "0 clamp(24px,5vw,64px) clamp(90px,10vw,140px)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: easeOut }}
                    style={{
                        textAlign: "center",
                        maxWidth: 620,
                        margin: "0 auto clamp(48px,6vw,72px)",
                    }}
                >
                    <p
                        className="olx-eyebrow"
                        style={{ justifyContent: "center" }}
                    >
                        <TargetMark size={13} color="var(--olx-signal)" />
                        {solutionsEyebrow}
                    </p>
                    <h2
                        className="olx-display"
                        style={{
                            fontSize: "clamp(28px,3.6vw,42px)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.01em",
                            margin: "0 0 16px",
                        }}
                    >
                        {solutionsTitle}
                    </h2>
                    <p
                        style={{
                            fontSize: 16.5,
                            lineHeight: 1.65,
                            color: "var(--olx-steel)",
                            margin: 0,
                        }}
                    >
                        {solutionsSubtitle}
                    </p>
                </motion.div>

                <div className="olx-solutions-grid">
                    {items.map((item: any, i: number) => {
                        const imgSrc = getImageSrc(item.image)
                        return (
                            <motion.a
                                key={i}
                                href={item.link || "#"}
                                className="olx-card"
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.12,
                                    ease: easeOut,
                                }}
                            >
                                <div className="olx-card-image-wrap">
                                    {imgSrc ? (
                                        <img
                                            src={imgSrc}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <TargetMark
                                                size={30}
                                                color="rgba(255,255,255,0.18)"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: "26px 24px 28px" }}>
                                    <h3
                                        className="olx-display"
                                        style={{
                                            fontSize: 19.5,
                                            fontWeight: 600,
                                            lineHeight: 1.3,
                                            margin: "0 0 10px",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 14.5,
                                            lineHeight: 1.6,
                                            color: "#9B9BA3",
                                            margin: "0 0 16px",
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                    <span className="olx-card-link">
                                        {item.linkText || "Дізнатись більше"}{" "}
                                        <ArrowIcon size={13} />
                                    </span>
                                </div>
                            </motion.a>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        marginTop: "clamp(48px,6vw,72px)",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 22,
                        padding: "clamp(28px,4vw,38px)",
                        borderRadius: 20,
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
                        border: "1px solid var(--olx-hairline)",
                    }}
                >
                    <p
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            margin: 0,
                            maxWidth: 480,
                            lineHeight: 1.4,
                        }}
                        className="olx-display"
                    >
                        {bottomCtaText}
                    </p>
                    <a href={bottomCtaButtonLink} className="olx-btn-primary">
                        {bottomCtaButtonText}
                        <ArrowIcon />
                    </a>
                </motion.div>
            </section>
        </div>
    )
}

// ------------------------------------------------------------
// Property Controls (панель властивостей у Framer)
// ------------------------------------------------------------

addPropertyControls(OlemaxHomepage, {
    logo: {
        type: ControlType.Image,
        title: "Логотип",
    },
    hero: {
        type: ControlType.Object,
        title: "Hero",
        controls: {
            eyebrow: {
                type: ControlType.String,
                title: "Тег",
                defaultValue: "ІННОВАЦІЇ В GNSS ТА РАДІОЕЛЕКТРОНІЦІ",
            },
            headlineStart: {
                type: ControlType.String,
                title: "Заголовок",
                defaultValue: "Точність, яка",
            },
            headlineAccent: {
                type: ControlType.String,
                title: "Заголовок (акцент)",
                defaultValue: "не залежить від перешкод",
            },
            subheadline: {
                type: ControlType.String,
                title: "Підзаголовок",
                defaultValue:
                    "Ми розробляємо GNSS-антени та радіочастотні системи, які зберігають стабільний сигнал навіть у найскладніших умовах. Обладнання, якому довіряють в авіації, обороні та промисловості.",
                displayTextArea: true,
            },
            image: {
                type: ControlType.Image,
                title: "Фото продукту",
            },
            backgroundTexture: {
                type: ControlType.Image,
                title: "Фонова текстура",
            },
            primaryButtonText: {
                type: ControlType.String,
                title: "Кнопка 1 — текст",
                defaultValue: "Переглянути рішення",
            },
            primaryButtonLink: {
                type: ControlType.Link,
                title: "Кнопка 1 — посилання",
                defaultValue: "#olx-solutions",
            },
            secondaryButtonText: {
                type: ControlType.String,
                title: "Кнопка 2 — текст",
                defaultValue: "Зв\u2019язатися з нами",
            },
            secondaryButtonLink: {
                type: ControlType.Link,
                title: "Кнопка 2 — посилання",
                defaultValue: "#contact",
            },
            badges: {
                type: ControlType.Array,
                title: "Мітки систем",
                control: { type: ControlType.String },
                defaultValue: [
                    "GPS",
                    "GLONASS",
                    "GALILEO",
                    "BEIDOU",
                    "QZSS",
                    "SBAS",
                ],
                maxCount: 8,
            },
            lockLabel: {
                type: ControlType.String,
                title: "Текст \u201cлокalizації\u201d сигналу",
                defaultValue: "СИГНАЛ ЗАФІКСОВАНО · RTK ТОЧНІСТЬ",
            },
        },
    },
    solutionsSection: {
        type: ControlType.Object,
        title: "Рішення",
        controls: {
            eyebrow: {
                type: ControlType.String,
                title: "Тег",
                defaultValue: "НАШІ РІШЕННЯ",
            },
            title: {
                type: ControlType.String,
                title: "Заголовок",
                defaultValue: "Що ми створюємо",
            },
            subtitle: {
                type: ControlType.String,
                title: "Підзаголовок",
                defaultValue:
                    "Від антен до готових радіочастотних систем — кожен продукт ми проєктуємо так, щоб він працював бездоганно навіть тоді, коли умови далекі від ідеальних.",
                displayTextArea: true,
            },
            items: {
                type: ControlType.Array,
                title: "Картки",
                control: {
                    type: ControlType.Object,
                    controls: {
                        image: { type: ControlType.Image, title: "Зображення" },
                        title: {
                            type: ControlType.String,
                            title: "Назва",
                            defaultValue: "Назва рішення",
                        },
                        description: {
                            type: ControlType.String,
                            title: "Опис",
                            defaultValue: "Короткий опис рішення.",
                            displayTextArea: true,
                        },
                        linkText: {
                            type: ControlType.String,
                            title: "Текст посилання",
                            defaultValue: "Дізнатись більше",
                        },
                        link: { type: ControlType.Link, title: "Посилання" },
                    },
                },
                defaultValue: [
                    {
                        title: "GNSS-антени преміум-класу",
                        description:
                            "Багаточастотні антени з підтримкою GPS, GLONASS, Galileo та BeiDou. Корпус витримує будь-яку погоду, а точність не падає навіть за складних умов прийому сигналу.",
                    },
                    {
                        title: "Радіочастотні системи для авіації та оборони",
                        description:
                            "Плати та модулі, спроєктовані за найвищими стандартами надійності — для задач, де ціна помилки надто висока, а стабільність сигналу критична.",
                    },
                    {
                        title: "Індивідуальні інженерні рішення",
                        description:
                            "Проєктуємо форм-фактор і конфігурацію під конкретне завдання клієнта — від першого ескізу до серійного виробництва.",
                    },
                ],
                maxCount: 6,
            },
        },
    },
    bottomCta: {
        type: ControlType.Object,
        title: "Нижній CTA",
        controls: {
            text: {
                type: ControlType.String,
                title: "Текст",
                defaultValue:
                    "Маєте нестандартну задачу або проєкт, що вимагає особливої точності?",
                displayTextArea: true,
            },
            buttonText: {
                type: ControlType.String,
                title: "Кнопка — текст",
                defaultValue: "Обговорити проєкт",
            },
            buttonLink: {
                type: ControlType.Link,
                title: "Кнопка — посилання",
                defaultValue: "#contact",
            },
        },
    },
    design: {
        type: ControlType.Object,
        title: "Дизайн",
        controls: {
            accentColor: {
                type: ControlType.Color,
                title: "Акцентний колір (сигнал)",
                defaultValue: "#3D7FFF",
            },
            showNoiseTexture: {
                type: ControlType.Boolean,
                title: "Текстура шуму",
                defaultValue: true,
            },
        },
    },
})
