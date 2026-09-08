'use client';
import { usePrefersReducedMotion as useReducedMotion } from './three/usePrefersReducedMotion';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

export function StudioMotion() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rawX = useMotionValue(-500),
    rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 70, damping: 25 }),
    y = useSpring(rawY, { stiffness: 70, damping: 25 });
  useEffect(() => {
    if (reduced || !matchMedia('(pointer:fine)').matches) return;
    const move = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [rawX, rawY, reduced]);
  return (
    <>
      <motion.div
        className="studio-page-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      {!reduced && (
        <motion.div
          className="studio-cursor-light"
          style={{ x, y }}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function StudioBridge() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], ['-25%', '0%', '15%']);
  const x2 = useTransform(scrollYProgress, [0, 0.5, 1], ['25%', '0%', '-15%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-50, 130]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.3]);
  return (
    <section
      ref={ref}
      className="studio-bridge"
      aria-label="Thoughtfully designed. Precisely engineered."
    >
      <motion.div
        className="studio-bridge-orbit"
        style={reduced ? {} : { rotate, scale }}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </motion.div>
      <p className="cine-eyebrow">THE SPACE BETWEEN DESIGN & DEVELOPMENT</p>
      <motion.p className="studio-bridge-line" style={reduced ? {} : { x: x1 }}>
        Thoughtfully <em>designed.</em>
      </motion.p>
      <motion.p className="studio-bridge-line" style={reduced ? {} : { x: x2 }}>
        Precisely <em>engineered.</em>
      </motion.p>
      <span className="studio-bridge-foot">SCROLL INTO THE WORK ↓</span>
    </section>
  );
}

export function StudioMarquee() {
  return (
    <div
      className="studio-marquee-divider"
      aria-label="Creative thinking, clean code, real impact"
    >
      <div aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            Creative thinking <b>✳</b> <em>Clean code</em> <b>✳</b> Real impact{' '}
            <b>✳</b>
          </span>
        ))}
      </div>
    </div>
  );
}
