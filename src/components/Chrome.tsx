import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { bindPointer, pointerX, pointerY } from "@/lib/pointer";

export function Cursor() {
  useEffect(() => bindPointer(), []);
  const x = useSpring(pointerX, { stiffness: 900, damping: 60, mass: 0.2 });
  const y = useSpring(pointerY, { stiffness: 900, damping: 60, mass: 0.2 });
  const gx = useSpring(pointerX, { stiffness: 120, damping: 26, mass: 0.8 });
  const gy = useSpring(pointerY, { stiffness: 120, damping: 26, mass: 0.8 });

  return (
    <>
      <motion.div
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
        style={{ x, y }}
      />
      <motion.div
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ember/40"
        style={{ x: gx, y: gy }}
      />
    </>
  );
}

export function CursorGlow() {
  const gx = useSpring(pointerX, { stiffness: 90, damping: 28, mass: 1 });
  const gy = useSpring(pointerY, { stiffness: 90, damping: 28, mass: 1 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
      style={{
        x: gx, y: gy,
        background:
          "radial-gradient(circle at 35% 35%, rgba(61,123,255,.28), transparent 55%), radial-gradient(circle at 65% 65%, rgba(255,106,0,.16), transparent 55%)",
      }}
    />
  );
}

const links = [
  { label: "产品矩阵", href: "#zones" },
  { label: "解决方案", href: "#solutions" },
  { label: "信任", href: "#trust" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <a href="#top" className="group flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-ember to-lava font-display text-sm font-bold text-white transition-transform duration-500 group-hover:rotate-[10deg]">火</span>
        <span className="font-display text-lg font-semibold tracking-widest">火山引擎</span>
        <span className="hidden text-[10px] tracking-[0.3em] text-frost/50 sm:block">VOLCENGINE</span>
      </a>
      <nav className="hidden items-center gap-10 text-sm text-frost md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="relative transition-colors duration-300 hover:text-bone">
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-500 hover:w-full" />
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="glow-ember rounded-full border border-ember/60 px-5 py-2 text-sm text-ember transition-all duration-500 hover:bg-ember hover:text-white"
      >
        免费体验
      </a>
    </motion.header>
  );
}

export function SectionMark({ no, label }: { no: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-display text-sm text-ember">{no}</span>
      <span className="h-px w-12 bg-ember/50" />
      <span className="text-xs tracking-[0.4em] text-frost/70">{label}</span>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function useParallax(depth: number) {
  void pointerX.get();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  useEffect(() => {
    const unsubX = pointerX.on("change", (v) => {
      rawX.set((v / window.innerWidth - 0.5) * depth);
    });
    const unsubY = pointerY.on("change", (v) => {
      rawY.set((v / window.innerHeight - 0.5) * depth);
    });
    return () => { unsubX(); unsubY(); };
  }, [depth, rawX, rawY]);
  return {
    x: useSpring(rawX, { stiffness: 60, damping: 20 }),
    y: useSpring(rawY, { stiffness: 60, damping: 20 }),
  };
}

export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rawX.set((e.clientX - (r.left + r.width / 2)) * strength);
        rawY.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      {children}
    </motion.div>
  );
}
