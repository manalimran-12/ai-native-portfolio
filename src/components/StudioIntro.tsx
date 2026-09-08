'use client';
import { usePrefersReducedMotion as useReducedMotion } from './three/usePrefersReducedMotion';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import Image from 'next/image';

const StudioScene = dynamic(() => import('./three/StudioScene'), {
  ssr: false,
});

export default function StudioIntro() {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { margin: '100px' });
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.13, 0.3], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const pointerEvents = useTransform(scrollYProgress, (p) =>
    p > 0.27 ? 'none' : 'auto'
  );
  const chapterOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.42, 0.68, 0.82],
    [0, 1, 1, 0]
  );
  const chapterY = useTransform(scrollYProgress, [0.28, 0.43], [55, 0]);
  const veil = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  useEffect(() => {
    const query = matchMedia('(max-width: 760px)');
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener('change', update);
    const timer = window.setTimeout(() => setReady(true), 250);
    return () => {
      clearTimeout(timer);
      query.removeEventListener('change', update);
    };
  }, []);
  return (
    <section
      id="home"
      ref={ref}
      className={`studio-intro ${reduced ? 'studio-reduced' : ''}`}
    >
      <div className="studio-stage">
        <div className="studio-atmosphere" />
        <div className="studio-grid" />
        <div className="studio-grain" />
        <div className="studio-canvas" aria-hidden="true">
          {ready && !reduced ? (
            <StudioScene
              progress={scrollYProgress}
              mobile={mobile}
              active={active}
            />
          ) : (
            <div className="studio-fallback-object" />
          )}
        </div>
        <motion.div
          className="studio-intro-copy"
          style={reduced ? {} : { opacity, y, scale, pointerEvents }}
        >
          <motion.p
            className="studio-kicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span /> INDEPENDENT MIND. LIMITLESS POSSIBILITIES.
          </motion.p>
          <h1 aria-label="Hi, I'm Manal Imran">
            <span className="studio-hello">Hi, I’m</span>
            {['Manal', 'Imran.'].map((word, w) => (
              <span
                className={`studio-name studio-name-${w}`}
                key={word}
                aria-hidden="true"
              >
                {word.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={
                      reduced
                        ? false
                        : {
                            y: 90,
                            opacity: 0,
                            rotateX: -70,
                            filter: 'blur(12px)',
                          }
                    }
                    animate={{
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      filter: 'blur(0px)',
                    }}
                    transition={{
                      delay: 0.3 + w * 0.15 + i * 0.055,
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="studio-intro-description">
              Engineering the functional.
              <br />
              <span>Crafting the unforgettable.</span>
            </p>
            <div className="studio-intro-links">
              <a href="#projects">
                Discover my work <ArrowUpRight size={19} />
              </a>
              <a href="/manal_imran_remote.pdf" aria-label="Download résumé">
                <Download size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
        {!reduced && (
          <motion.div
            className="studio-chapter-copy"
            style={{ opacity: chapterOpacity, y: chapterY }}
          >
            <p className="studio-kicker">FROM POSSIBILITY TO PRODUCT</p>
            <h2>
              Ideas are good.
              <br />
              <em>Making them real</em>
              <br />
              is better.
            </h2>
            <p>
              Full-stack thinking.
              <br />
              Beautifully built web & mobile experiences.
            </p>
          </motion.div>
        )}
        <motion.div
          className="studio-art-label"
          style={reduced ? {} : { opacity }}
        >
          <span>FIG. 001</span> A STUDY IN POSSIBILITIES <span>↗</span>
        </motion.div>
        <div className="studio-stage-footer">
          <a href="#about">
            <span className="studio-scroll-line" />
            <ArrowDown size={13} /> SCROLL TO UNFOLD
          </a>
          <span>
            KARACHI, PK <i /> AVAILABLE WORLDWIDE
          </span>
          <div className="studio-mini-avatar">
            <Image
              src="/memoji.svg"
              alt="Manal’s avatar"
              width={35}
              height={35}
            />
            <span>
              Human behind
              <br />
              the code.
            </span>
          </div>
        </div>
        {!reduced && (
          <motion.div className="studio-veil" style={{ opacity: veil }} />
        )}
        <motion.div
          className="studio-scene-progress"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}
