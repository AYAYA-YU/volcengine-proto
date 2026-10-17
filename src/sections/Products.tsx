import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { zones, type Product, type Zone } from "@/data";
import { Reveal, SectionMark } from "@/components/Chrome";

const ease = [0.16, 1, 0.3, 1] as const;

function ZonePanel({ zone, index, onOpen }: { zone: Zone; index: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={index * 0.1}>
      <motion.button
        onClick={onOpen}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileTap={{ scale: 0.98 }}
        className="group relative block h-[420px] w-full overflow-hidden rounded-2xl text-left md:h-[560px]"
        style={{ background: zone.gradient }}
      >
        <span
          className="font-display pointer-events-none absolute -right-6 -top-10 select-none font-black leading-none transition-all duration-700"
          style={{
            fontSize: "16rem",
            color: hover ? zone.accent : "rgba(232,236,244,0.06)",
            transform: hover ? "translateY(8px) scale(1.05)" : "none",
            opacity: hover ? 0.9 : 1,
          }}
        >
          {zone.glyph}
        </span>
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(60% 45% at 50% 85%, ${zone.accent}26, transparent 70%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="mb-3 text-[10px] tracking-[0.35em]" style={{ color: zone.accent }}>
            {zone.en}
          </p>
          <h3 className="font-display text-3xl font-semibold text-bone transition-transform duration-500 group-hover:-translate-y-1">
            {zone.name}
          </h3>
          <p className="mt-2 text-xs text-frost/70">{zone.metaphor}</p>
          <div className="mt-5 flex items-center gap-2 text-xs text-frost/60 transition-all duration-500 group-hover:gap-4 group-hover:text-bone">
            进入 <span style={{ color: zone.accent }}>→</span>
          </div>
        </div>
        <span
          className="absolute left-7 top-7 h-8 w-px transition-all duration-500 group-hover:h-14"
          style={{ background: `linear-gradient(180deg, ${zone.accent}, transparent)` }}
        />
      </motion.button>
    </Reveal>
  );
}

function ZoneOverlay({ zone, onClose, onProduct }: { zone: Zone; onClose: () => void; onProduct: (p: Product) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease }}
      style={{ background: "#0B0E16" }}
    >
      <div className="pointer-events-none fixed inset-0" style={{ background: zone.gradient, opacity: 0.55 }} />
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 backdrop-blur-md md:px-12"
        style={{ background: "rgba(8,9,12,.55)" }}>
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-frost/70">
          <button onClick={onClose} className="transition-colors hover:text-bone">产品矩阵</button>
          <span style={{ color: zone.accent }}>/</span>
          <span className="text-bone">{zone.name}</span>
        </div>
        <button
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full border border-frost/20 text-frost transition-all duration-300 hover:rotate-90 hover:border-ember hover:text-ember"
        >
          ✕
        </button>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-16 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}
          className="text-[10px] tracking-[0.4em]"
          style={{ color: zone.accent }}
        >
          {zone.en}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease }}
          className="font-display mt-4 text-5xl font-bold text-bone md:text-7xl"
        >
          {zone.name}
          <span className="ml-6 align-top text-2xl text-frost/40">{zone.glyph}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-6 max-w-lg text-sm leading-relaxed text-frost"
        >
          {zone.blurb}
        </motion.p>

        <div className="mt-16 border-t border-frost/10">
          {zone.products.map((p, i) => (
            <motion.button
              key={p.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.7, ease }}
              onClick={() => onProduct(p)}
              className="group flex w-full items-baseline gap-6 border-b border-frost/10 py-8 text-left transition-colors duration-300 hover:bg-white/[0.03] md:gap-10"
            >
              <span className="font-display text-sm text-frost/40">0{i + 1}</span>
              <span className="font-display flex-1 text-2xl font-semibold text-bone transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                {p.name}
              </span>
              <span className="hidden text-[10px] tracking-[0.3em] text-frost/50 md:block">{p.en}</span>
              <span
                className="text-xl transition-all duration-500 group-hover:translate-x-2"
                style={{ color: zone.accent }}
              >
                →
              </span>
            </motion.button>
          ))}
        </div>
        <p className="mt-8 text-xs text-frost/40">点击产品名称，进入能力详情</p>
      </div>
    </motion.div>
  );
}

function ProductOverlay({ product, zone, onBack, onCloseAll }: {
  product: Product; zone: Zone; onBack: () => void; onCloseAll: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.7, ease }}
      style={{ background: "#08090C" }}
    >
      <div className="pointer-events-none fixed inset-0" style={{ background: zone.gradient, opacity: 0.35 }} />
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 backdrop-blur-md md:px-12"
        style={{ background: "rgba(8,9,12,.55)" }}>
        <button onClick={onBack} className="group flex items-center gap-3 text-xs tracking-[0.25em] text-frost/70 transition-colors hover:text-bone">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> 返回 {zone.name}
        </button>
        <button onClick={onCloseAll}
          className="grid h-10 w-10 place-items-center rounded-full border border-frost/20 text-frost transition-all duration-300 hover:rotate-90 hover:border-ember hover:text-ember">
          ✕
        </button>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-32 pt-14 md:px-12">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[10px] tracking-[0.4em]" style={{ color: zone.accent }}>{product.en}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease }}
          className="font-display mt-4 text-4xl font-bold text-bone md:text-6xl">{product.name}</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="mt-5 max-w-lg text-sm leading-relaxed text-frost">{product.desc}</motion.p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-frost/10 bg-frost/10 sm:grid-cols-3">
          {product.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease }}
              className="bg-ink/80 p-8"
            >
              <p className="font-display text-4xl font-bold" style={{ color: zone.accent }}>{m.value}</p>
              <p className="mt-2 text-xs text-frost/70">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }}
          className="mt-14">
          <p className="mb-6 text-[10px] tracking-[0.4em] text-frost/50">核心能力 / CAPABILITIES</p>
          <div className="flex flex-wrap gap-3">
            {product.features.map((f) => (
              <span key={f} className="rounded-full border border-frost/15 px-5 py-2 text-sm text-frost transition-colors duration-300 hover:border-transparent hover:text-bone"
                style={{ background: "rgba(232,236,244,.03)" }}>
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
          className="mt-16 flex flex-wrap items-center gap-6">
          <a href="#cta" onClick={onCloseAll}
            className="glow-ember rounded-full px-9 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(120deg, ${zone.accent}, #FF3D00)` }}>
            免费体验 {product.name}
          </a>
          <a href="#cta" onClick={onCloseAll} className="text-sm text-frost underline-offset-8 hover:text-bone hover:underline">
            联系架构师 →
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [zone, setZone] = useState<Zone | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.body.style.overflow = zone ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [zone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") product ? setProduct(null) : setZone(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product]);

  return (
    <section id="zones" className="relative mx-auto max-w-[1440px] px-6 py-28 md:px-12">
      <SectionMark no="01" label="PRODUCT MATRIX · 产品矩阵" />
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-tight text-bone md:text-6xl">
            四层地貌<br />一种能量
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="max-w-md">
          <p className="text-sm leading-relaxed text-frost">
            像地壳、岩浆、火山口与熔岩河一样，火山引擎的能力按企业选型的逻辑分为四层。
            点击任意地貌，逐层下潜至每一条产品线。
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {zones.map((z, i) => (
          <ZonePanel key={z.name} zone={z} index={i} onOpen={() => { setZone(z); setProduct(null); }} />
        ))}
      </div>

      <AnimatePresence>
        {zone && !product && (
          <ZoneOverlay key="zone" zone={zone} onClose={() => setZone(null)} onProduct={setProduct} />
        )}
        {zone && product && (
          <ProductOverlay
            key="product"
            product={product}
            zone={zone}
            onBack={() => setProduct(null)}
            onCloseAll={() => { setProduct(null); setZone(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
