// 全局鼠标指针：模块级 motion values，任何组件可订阅做视差/磁吸/光晕
import { motionValue, MotionValue } from "framer-motion";

export const pointerX: MotionValue<number> = motionValue(
  typeof window !== "undefined" ? window.innerWidth / 2 : 0
);
export const pointerY: MotionValue<number> = motionValue(
  typeof window !== "undefined" ? window.innerHeight / 2 : 0
);
export const pointerVX: MotionValue<number> = motionValue(0);
export const pointerVY: MotionValue<number> = motionValue(0);

let bound = false;
export function bindPointer() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  let lastX = pointerX.get(), lastY = pointerY.get(), lastT = performance.now();
  window.addEventListener("mousemove", (e) => {
    const now = performance.now();
    const dt = Math.max(now - lastT, 1);
    pointerVX.set((e.clientX - lastX) / dt);
    pointerVY.set((e.clientY - lastY) / dt);
    lastX = e.clientX; lastY = e.clientY; lastT = now;
    pointerX.set(e.clientX);
    pointerY.set(e.clientY);
  }, { passive: true });
}
