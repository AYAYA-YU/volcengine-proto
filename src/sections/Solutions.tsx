import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { solutions, type Solution } from "@/data";
import { Reveal, SectionMark } from "@/components/Chrome";

const ease = [0.16, 1, 0.3, 1] as const;

function Track({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const dragging = useRef(false);
  const start = useRef({ px: 0, x: 0 });
  const [, force] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        x.current = Math.max(0, Math.min(x.current - e.deltaY, el.scrollWidth - el.clientWidth));
        el.scrollLeft = x.current;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className="flex cursor-grab select-none gap-6 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollBehavior: dragging.current ? "auto" : "smooth" }}
      onPointerDown={(e) => {
        dragging.current = true; force(1);
        start.current = { px: e.clientX, x: ref.current!.scrollLeft };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current || !ref.current) return;
        ref.current.scrollLeft = start.current.x - (e.clientX - start.current.px);
      }}
      onPointerUp={() => { dragging.current = false; force(0); }}
      onPointerLeave={() => { dragging.current = false; force(0); }}
    >
      {children}
    </div>
  );
}

function SolutionOverlay({ s, onClose }: { s: Solution; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center px-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: "rgba(4,5,8,.72)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.6, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-frost/10"
        style={{ background: "#0B0E16" }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: s.gradient, opacity: 0.9 }} />
        <span className="font-display pointer-events-none absolute -bottom-16 -right-4 select-none text-[14rem] font-black leading-none text-white/[0.04]">
          {s.glyph}
        </span>
        <button onClick={onClose}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-frost/20 text-frost transition-all duration-300 hover:rotate-90 hover:text-bone">
          ✕
        </button>
        <div className="relative p-10 md:p-14">
          <p className="text-[10px] tracking-[0.4em]" style={{ color: s.accent }}>{s.en}</p>
          <h3 className="font-display mt-3 text-4xl font-bold text-bone">{s.industry}</h3>
          <p className="mt-2 text-lg" style={{ color: s.accent }}>{s.headline}</p>
          <p className="mt-6 max-w-xl text-sm leading-loose text-frost">{s.story}</p>
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {s.metrics.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease }}>
                <p className="font-display text-3xl font-bold" style={{ color: s.accent }}>{m.value}</p>
                <p className="mt-1 text-xs text-frost/70">{m.label}</p>
              </motion.div>
            ))}
          </div>
          <a href="#cta" onClick={onClose}
            className="mt-10 inline-block rounded-full border px-8 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-ink"
            style={{ borderColor: s.accent, color: s.accent }}>
            获取 {s.industry} 方案 →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Solutions() {
  const [active, setActive] = useState<Solution | null>(null);
  return (
    <section id="solutions" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionMark no="02" label="SOLUTIONS · 行业解决方案" />
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-tight text-bone md:text-6xl">
              每一种地貌<br />都有它的喷发方式
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-md">
            <p className="text-sm leading-relaxed text-frost">
              拖动浏览五大行业板块。点击任意行业，查看该地貌上的真实喷发记录——量化的业务结果。
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Track>
          {solutions.map((s, i) => (
            <motion.button
              key={s.industry}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8, ease }}
              whileHover={{ y: -8 }}
              onClick={() => setActive(s)}
              className="group relative h-[380px] w-[300px] flex-none overflow-hidden rounded-2xl text-left md:w-[360px]"
              style={{ background: s.gradient }}
            >
              <span className="font-display absolute left-6 top-4 text-8xl font-black text-white/[0.07] transition-all duration-700 group-hover:text-white/[0.15]">
                {s.glyph}
              </span>
              <span className="absolute right-6 top-7 text-[10px] tracking-[0.35em] text-frost/50">{s.en}</span>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-display text-3xl font-semibold text-bone">{s.industry}</p>
                <p className="mt-1 text-xs text-frost/70">{s.headline}</p>
                <p className="mt-4 flex items-center gap-2 text-xs transition-all duration-500 group-hover:gap-4" style={{ color: s.accent }}>
                  查看喷发记录 <span>→</span>
                </p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{ background: s.accent }} />
            </motion.button>
          ))}
        </Track>
      </div>

      <AnimatePresence>
        {active && <SolutionOverlay s={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
