import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';

interface AnimatedCounterProps {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `to` when scrolled into view.
 * Instantly shows the final value if the user prefers reduced motion.
 */
export function AnimatedCounter({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useForceReducedMotion();
  const [value, setValue] = useState(prefersReduced ? to : 0);

  useEffect(() => {
    if (prefersReduced) {
      setValue(to);
      return;
    }
    if (!isInView) return;

    let rafId: number;
    const startTime = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * to);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, to, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}
