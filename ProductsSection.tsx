import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── TYPES ───────────────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  tagline: string
  desc: string
  specs: { label: string; value: string }[]
  badges: string[]
  img?: string
  pdf?: string
}

interface ProductsSectionProps {
  gurykAImage?: string
  gurykMImage?: string
  gurykAPdf?: string
  gurykMPdf?: string
  lang?: "ua" | "en"
}

// ─── SVG ICONS ───────────────────────────────────────────────────────
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

function DownloadIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, display: "block" }}>
      <path d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 14H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, display: "block" }}>
      <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="#F3F4F6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function GnssModuleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.35 }}>
      <rect x="8" y="16" width="48" height="36" rx="6" stroke="#3D7FFF" strokeWidth="2" fill="none" />
      <circle cx="24" cy="34" r="8" stroke="#3D7FFF" strokeWidth="2" />
      <path d="M40 26H48M40 34H48M40 42H48" stroke="#3D7FFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── ANIMATION HELPERS ───────────────────────────────────────────────
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: "easeIn" as const } },
}

const inView = (amount = 0.18) => ({
  initial: "hidden",
  whileInView: "show",
  exit: "exit",
  viewport: { once: false, amount },
})

// ─── MODAL COMPONENT ─────────────────────────────────────────────────
function ProductModal({ product, onClose, lang }: { product: Product; onClose: () => void; lang: "ua" | "en" }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(11, 12, 14, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease }}
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#111317",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 20,
          padding: "clamp(24px, 4vw, 36px)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div>
            <span className="olx-eyebrow" style={{ marginBottom: 6 }}>{product.tagline}</span>
            <h3 className="olx-display" style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700 }}>
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: "#8B909A", marginBottom: 24 }}>
          {product.desc}
        </p>

        {/* Specs Table */}
        <div style={{ marginBottom: 28 }}>
          <h4 className="olx-mono" style={{ fontSize: 12, color: "#3D7FFF", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>
            {lang === "ua" ? "Технічні характеристики" : "Technical Specifications"}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {product.specs.map((spec, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontSize: 14,
                }}
              >
                <span style={{ color: "#8B909A" }}>{spec.label}</span>
                <span className="olx-mono" style={{ color: "#F3F4F6", fontWeight: 500 }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {product.pdf && (
            <a href={product.pdf} download target="_blank" rel="noopener noreferrer" className="olx-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <DownloadIcon /> {lang === "ua" ? "Завантажити специфікацію (PDF)" : "Download Data Sheet (PDF)"}
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── MAIN PRODUCTS SECTION ───────────────────────────────────────────
export default function ProductsSection({
  gurykAImage,
  gurykMImage,
  gurykAPdf,
  gurykMPdf,
  lang = "ua",
}: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const productsData: Record<"ua" | "en", Product[]> = {
    ua: [
      {
        id: "guryk-a",
        name: "GURYK-A",
        tagline: "АВІАЦІЙНИЙ GNSS МОДУЛЬ",
        desc: "Високоточний GNSS-приймач підвищеної завадозахищеності для авіаційних систем та БПЛА. Спроєктований для стабільної навігації в умовах активного РЕБ та складного радіоелектронного оточення.",
        badges: ["RTK GPS", "Multi-Band", "Anti-Jamming", "UAV Ready"],
        img: gurykAImage,
        pdf: gurykAPdf,
        specs: [
          { label: "Підтримка супутників", value: "GPS, GLONASS, Galileo, BeiDou" },
          { label: "Точність (RTK)", value: "1 cm + 1 ppm" },
          { label: "Завадозахищеність", value: "Активна придушувальна топологія" },
          { label: "Інтерфейси", value: "UART / CAN / USB" },
          { label: "Напруга живлення", value: "5V - 36V DC" },
        ],
      },
      {
        id: "guryk-m",
        name: "GURYK-M",
        tagline: "КОМПАКТНИЙ МОДУЛЬ НАВІГАЦІЇ",
        desc: "Малогабаритний радіочастотний та GNSS модуль для мультироторних платформ і мобільних робототехнічних комплексів з оптимізованим енергоспоживанням.",
        badges: ["Compact", "Low Power", "Multi-GNSS", "High-Precision"],
        img: gurykMImage,
        pdf: gurykMPdf,
        specs: [
          { label: "Форм-фактор", value: "Ультракомпактний" },
          { label: "Підтримка частот", value: "L1 / L2 / L5" },
          { label: "Час гарячого старту", value: "< 1 сек" },
          { label: "Інтерфейси", value: "UART / SPI" },
          { label: "Енергоспоживання", value: "< 0.8 W" },
        ],
      },
    ],
    en: [
      {
        id: "guryk-a",
        name: "GURYK-A",
        tagline: "AVIATION GNSS MODULE",
        desc: "High-precision anti-jamming GNSS receiver for aviation systems and UAVs. Engineered for reliable navigation under active EW and complex RF interference environments.",
        badges: ["RTK GPS", "Multi-Band", "Anti-Jamming", "UAV Ready"],
        img: gurykAImage,
        pdf: gurykAPdf,
        specs: [
          { label: "Satellite Constellations", value: "GPS, GLONASS, Galileo, BeiDou" },
          { label: "RTK Accuracy", value: "1 cm + 1 ppm" },
          { label: "Interference Rejection", value: "Active suppression topology" },
          { label: "Interfaces", value: "UART / CAN / USB" },
          { label: "Input Voltage", value: "5V - 36V DC" },
        ],
      },
      {
        id: "guryk-m",
        name: "GURYK-M",
        tagline: "COMPACT NAVIGATION MODULE",
        desc: "Ultra-compact RF and GNSS module for multirotor platforms and mobile robotics featuring low power consumption and high signal acquisition speed.",
        badges: ["Compact", "Low Power", "Multi-GNSS", "High-Precision"],
        img: gurykMImage,
        pdf: gurykMPdf,
        specs: [
          { label: "Form Factor", value: "Ultra-compact" },
          { label: "Bands Supported", value: "L1 / L2 / L5" },
          { label: "Hot Start Time", value: "< 1 sec" },
          { label: "Interfaces", value: "UART / SPI" },
          { label: "Power Consumption", value: "< 0.8 W" },
        ],
      },
    ],
  }

  const products = productsData[lang]

  return (
    <section id="products" style={{ paddingBottom: "clamp(72px, 10vw, 140px)" }}>
      <div className="olx-section">
        {/* Section Heading */}
        <motion.div variants={fadeUp} {...inView(0.2)} style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(40px, 6vw, 70px)" }}>
          <p className="olx-eyebrow" style={{ justifyContent: "center" }}>
            <TargetMark size={13} color="#3D7FFF" />
            {lang === "ua" ? "КАТАЛОГ ПРОДУКЦІЇ" : "PRODUCT CATALOG"}
          </p>
          <h2 className="olx-display" style={{ fontSize: "clamp(26px, 3.6vw, 42px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.01em", marginBottom: 14 }}>
            {lang === "ua" ? "Серійні інженерні модулі" : "Serial Engineering Modules"}
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.65, color: "#8B909A" }}>
            {lang === "ua"
              ? "Готові GNSS та RF модулі власної розробки, готові до інтеграції у ваші платформи та обладнання."
              : "Proprietary GNSS and RF modules ready for integration into your platforms and equipment."}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="olx-card"
              variants={fadeUp}
              {...inView(0.15)}
              transition={{ duration: 0.6, delay: idx * 0.12, ease } as never}
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <div className="olx-card-image-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {product.img ? (
                  <img src={product.img} alt={product.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <GnssModuleIcon />
                )}
              </div>

              <div style={{ padding: "24px 22px 26px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <span className="olx-mono" style={{ fontSize: 11, color: "#3D7FFF", letterSpacing: ".1em", marginBottom: 6 }}>
                  {product.tagline}
                </span>

                <h3 className="olx-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
                  {product.name}
                </h3>

                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9B9BA3", marginBottom: 20, flexGrow: 1 }}>
                  {product.desc}
                </p>

                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {product.badges.map((b) => (
                    <span key={b} className="olx-badge" style={{ fontSize: 10.5, padding: "4px 10px" }}>
                      {b}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="olx-btn-secondary"
                    style={{ flex: 1, padding: "10px 16px", fontSize: 13.5, justifyContent: "center" }}
                  >
                    {lang === "ua" ? "Характеристики" : "Specs"}
                  </button>

                  {product.pdf && (
                    <a
                      href={product.pdf}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="olx-btn-primary"
                      style={{ padding: "10px 16px", fontSize: 13.5 }}
                      title={lang === "ua" ? "Завантажити PDF" : "Download PDF"}
                    >
                      <DownloadIcon size={14} /> PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} lang={lang} />
        )}
      </AnimatePresence>
    </section>
  )
}
