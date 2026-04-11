"use client";

import { useState, useEffect, useRef } from "react";

export function useCountUp(target: number, duration = 1200, decimals = 0): number {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  const factor = Math.pow(10, decimals);

  useEffect(() => {
    if (target <= 0) return;

    const start = prev.current;
    const diff = target - start;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round((start + diff * eased) * factor) / factor;
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prev.current = target;
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration, factor]);

  return value;
}
