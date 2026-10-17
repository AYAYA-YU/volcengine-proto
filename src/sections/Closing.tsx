import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import EmberField from "@/components/EmberField";
import { Magnetic, Reveal, SectionMark } from "@/components/Chrome";

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return c.stop;
    }
  }, [inView, mv, to]);
  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const values = [
  { k: "始终创业", v: "Always Day 1", d: "像公司创立第一天那样思考，逃离平庸的重力。" },
  { k: "务实敢为", v: "Ground & Courageous", d: "不自嗨，注重效果。尝试多种可能，快速迭代。" },
  { k: "追求极致", v: "Aim for the Highest", d: "不放过问题，思考本质，在更大范围里找最优解。" },
  { k: "多元兼容", v: "Diversity & Inclusion", d: "为多元不同而喝彩，让不同的想法挑战彼此。" },
];

const stats = [
  { to: 100000, suffix: "+", label: "服务企业客户" },
  { to: 99, suffix: ".995%", label: "全球服务可用性" },
  { to: 21, suffix: " 个", label: "全球地域覆盖" },
];

export default function Closing() {
  return (
    <>
      <section className="relative mx-auto max-w-[1440px] px-6 py-28 md:px-12">
        <SectionMark no="03" label="CULTURE · 文化即产品" />
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-tight text-bone md:text-6xl">
              火山不是一天<br />
              <span className="ember-text">形成的</span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-loose text-frost">
              字节范儿的六条价值观，是这座火山的地质结构。
              它们决定着我们如何把九年沉淀的技术能量，持续、稳定地交付给每一位客户。
            </p>
            <div className="mt-14 hidden gap-10 lg:flex">
              {["激", "发", "创", "造", "丰", "富", "生", "活"].map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease }}
                  className="font-display text-vertical text-2xl text-frost/50"
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <div className="space-y-px overflow-hidden rounded-2xl border border-frost/10">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.08}>
                <div className="group relative bg-basalt p-8 transition-colors duration-500 hover:bg-magma">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl font-semibold text-bone transition-transform duration-500 group-hover:translate-x-2">
                      {v.k}
                    </h3>
                    <span className="text-[10px] tracking-[0.3em] text-frost/40">{v.v}</span>
                  </div>
                  <p className="mt-3 text-sm text-frost/70">{v.d}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-ember to-transparent transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="relative border-y border-frost/10 bg-basalt/50">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-3 md:px-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} className="text-center">
              <p className="font-display text-5xl font-bold text-bone md:text-6xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-xs tracking-[0.3em] text-frost/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="cta" className="relative overflow-hidden py-40 text-center">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 100%, rgba(255,106,0,.16), transparent 65%), radial-gradient(50% 40% at 50% 0%, rgba(61,123,255,.14), transparent 60%)" }} />
        <EmberField density={0.00008} />
        <div className="relative z-10 px-6">
          <Reveal>
            <p className="text-xs tracking-[0.5em] text-frost/60">READY TO ERUPT</p>
            <h2 className="font-display mt-6 text-5xl font-black leading-tight text-bone md:text-7xl">
              开启你的<span className="ember-text"> AI 云</span>之旅
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-loose text-frost">
              免费注册，立享 ¥1000 体验金。架构师 1 对 1 陪同，从你的第一行代码到第一次喷发。
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-12">
            <Magnetic strength={0.45}>
              <a href="#top"
                className="glow-ember group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-ember to-lava px-14 py-5 text-lg font-medium text-white">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                立即免费注册
              </a>
            </Magnetic>
            <p className="mt-6 text-xs text-frost/50">或拨打 400-850-0030 预约专家咨询</p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-frost/10 px-6 py-14 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-ember to-lava font-display text-sm font-bold text-white">火</span>
            <div>
              <p className="font-display font-semibold tracking-widest">火山引擎</p>
              <p className="text-[9px] tracking-[0.3em] text-frost/40">VOLCENGINE · YOUR AI CLOUD</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-frost/60">
            <a href="#zones" className="transition-colors hover:text-bone">产品矩阵</a>
            <a href="#solutions" className="transition-colors hover:text-bone">解决方案</a>
            <a href="#trust" className="transition-colors hover:text-bone">信任中心</a>
            <a href="#cta" className="transition-colors hover:text-bone">免费体验</a>
          </nav>
          <p className="text-[10px] text-frost/40">© 2026 火山引擎 · 交互原型仅用于设计学习</p>
        </div>
      </footer>
    </>
  );
}
