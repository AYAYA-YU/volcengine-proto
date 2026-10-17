import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EmberField from "@/components/EmberField";
import { Magnetic, useParallax } from "@/components/Chrome";
import { pointerX, pointerY, bindPointer } from "@/lib/pointer";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => bindPointer(), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const textP = useParallax(-18);
  const ridgeP = useParallax(28);
  const titleXP = useTransform(pointerX, (v) => (v / window.innerWidth - 0.5) * 24);
  const titleYP = useTransform(pointerY, (v) => (v / window.innerHeight - 0.5) * 16);

  return (
    <section ref={ref} id="top" className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% -10%, rgba(61,123,255,.22), transparent 60%), radial-gradient(70% 50% at 80% 110%, rgba(255,106,0,.14), transparent 60%), linear-gradient(180deg, #08090C 0%, #0B0E16 100%)",
        }}
      />
      <EmberField density={0.00014} />

      <motion.svg
        aria-hidden
        style={{ ...ridgeP, y: drift }}
        className="pointer-events-none absolute bottom-0 left-1/2 w-[130%] -translate-x-1/2"
        viewBox="0 0 1440 420"
        fill="none"
      >
        <path d="M-40 420 L320 240 L520 320 L760 140 L980 300 L1180 220 L1500 400 L1500 420 Z" fill="#0E1524" opacity="0.7" />
        <path d="M-40 420 L220 320 L460 380 L720 220 L900 360 L1120 300 L1480 420 Z" fill="#101B30" opacity="0.85" />
        <path d="M720 220 L760 140 L800 224 L780 236 L760 222 L740 238 Z" fill="url(#lava)" />
        <defs>
          <linearGradient id="lava" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#FF3D00" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        style={{ ...textP, opacity: fade }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease }}
          className="mb-8 text-xs tracking-[0.6em] text-frost/70"
        >
          字节跳动旗下 · 企业级 AI 云
        </motion.p>

        <motion.h1
          style={{ x: titleXP, y: titleYP }}
          className="font-display font-black leading-[1.12]"
        >
          {["让积蓄的能量", "在此刻喷发"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block text-[13vw] md:text-[7.5rem] ${i === 1 ? "ember-text" : "text-bone"}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.3, delay: 0.9 + i * 0.18, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="mt-10 max-w-xl text-sm leading-loose text-frost md:text-base"
        >
          火山引擎 —— 九年沉淀的推荐算法、视频能力与算力底座
          <br />
          从豆包大模型到云基础设施，一站式加速企业智能化升级
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1, ease }}
          className="mt-12 flex items-center gap-6"
        >
          <Magnetic>
            <a
              href="#zones"
              className="glow-ember group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-ember to-lava px-10 py-4 text-base font-medium text-white"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              进入产品矩阵
              <span className="transition-transform duration-500 group-hover:translate-y-1">↓</span>
            </a>
          </Magnetic>
          <a href="#solutions" className="text-sm text-frost underline-offset-8 transition-colors hover:text-bone hover:underline">
            查看行业方案 →
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        style={{ opacity: fade }}
        className="relative z-10 flex items-center justify-between px-6 pb-8 text-[11px] tracking-[0.25em] text-frost/50 md:px-12"
      >
        <span>VOLCENGINE · YOUR AI CLOUD</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block"
        >
          向下滚动 · SCROLL
        </motion.span>
        <span>EST. 2020 · 始终创业</span>
      </motion.div>
    </section>
  );
}
