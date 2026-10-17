import { useEffect, useRef } from "react";
import { pointerX, pointerY } from "@/lib/pointer";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number; hue: "ember" | "glacier";
}

export default function EmberField({
  density = 0.00012,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (px?: number, py?: number, burst = false): Particle => ({
      x: px ?? Math.random() * w,
      y: py ?? h + 8,
      vx: burst ? (Math.random() - 0.5) * 1.6 : (Math.random() - 0.5) * 0.3,
      vy: burst ? -(Math.random() * 1.8 + 0.6) : -(Math.random() * 0.45 + 0.15),
      life: 0,
      maxLife: burst ? 90 + Math.random() * 60 : 300 + Math.random() * 300,
      size: burst ? Math.random() * 2 + 0.8 : Math.random() * 1.6 + 0.4,
      hue: Math.random() < (burst ? 0.75 : 0.22) ? "ember" : "glacier",
    });

    let last = performance.now();
    let emitAcc = 0;
    let prevMX = pointerX.get(), prevMY = pointerY.get();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3); last = now;
      ctx.clearRect(0, 0, w, h);

      const target = Math.floor(w * h * density);
      emitAcc += dt;
      if (particles.length < target && emitAcc > 4) {
        particles.push(spawn());
        emitAcc = 0;
      }

      const rect = canvas.getBoundingClientRect();
      const mx = pointerX.get() - rect.left, my = pointerY.get() - rect.top;
      const speed = Math.hypot(mx - prevMX, my - prevMY);
      prevMX = mx; prevMY = my;
      if (speed > 6 && particles.length < target * 1.6) {
        for (let i = 0; i < Math.min(speed / 8, 3); i++) {
          particles.push(spawn(mx + (Math.random() - 0.5) * 24, my + (Math.random() - 0.5) * 24, true));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life > p.maxLife || p.y < -12 || p.x < -12 || p.x > w + 12) {
          particles.splice(i, 1); continue;
        }
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 110) * 0.35 * dt;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.985; p.vy = p.vy * 0.995 - 0.002 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;

        const t = p.life / p.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
        const flicker = 0.75 + 0.25 * Math.sin(p.life * 0.3 + p.x);
        ctx.globalAlpha = alpha * flicker * 0.9;
        ctx.fillStyle = p.hue === "ember" ? "#FF8A3D" : "#5E8FE8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
