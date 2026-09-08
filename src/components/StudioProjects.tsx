'use client';
import { usePrefersReducedMotion as useReducedMotion } from './three/usePrefersReducedMotion';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from './portfolio-data';

function ProjectChapter({
  index,
  progress,
  onOpen,
  reduced,
}: {
  index: number;
  progress: MotionValue<number>;
  onOpen: (index: number) => void;
  reduced: boolean;
}) {
  const project = projects[index];
  const [active, setActive] = useState(index === 0);
  const last = index === projects.length - 1;
  const step = 1 / projects.length;
  const start = index * step;
  const local = useTransform(progress, (p) => (p - start) / step);
  useMotionValueEvent(local, 'change', (p) => {
    const next = p >= -0.15 && (last || p < 0.87);
    setActive((current) => (current === next ? current : next));
  });
  const x = useTransform(
    local,
    [-1, -0.12, 0, 0.72, 1],
    ['110%', '15%', '0%', '0%', last ? '0%' : '-110%']
  );
  const opacity = useTransform(
    local,
    [-0.5, 0, 0.72, 1],
    [0, 1, 1, last ? 1 : 0]
  );
  const rotateY = useTransform(local, [-0.8, 0, 0.72, 1], [-35, -12, 3, 30]);
  const rotateX = useTransform(local, [0, 0.72], [12, 0]);
  const screenY = useTransform(local, [0, 0.8], ['0%', '-12%']);
  const textY = useTransform(local, [-0.5, 0, 0.75, 1], [60, 0, 0, -45]);
  const visible = useTransform(local, (p) =>
    p >= -0.15 && (last || p < 0.87) ? 'auto' : 'none'
  );
  const zIndex = useTransform(local, (p) => (p >= 0 && p < 1 ? 2 : 1));
  return (
    <motion.article
      aria-hidden={!reduced && !active}
      inert={!reduced && !active}
      className={`studio-project-chapter studio-project-color-${index % 3}`}
      style={reduced ? {} : { x, opacity, pointerEvents: visible, zIndex }}
    >
      <motion.div
        className="studio-project-copy"
        style={reduced ? {} : { y: textY }}
      >
        <span className="studio-project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="studio-project-tech">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <button
          onClick={() => onOpen(index)}
          aria-label={`Explore ${project.title}`}
        >
          Explore project <ArrowUpRight size={19} />
        </button>
      </motion.div>
      <div className="studio-project-visual">
        <div className="studio-project-aura" />
        <span className="studio-project-number">0{index + 1}</span>
        <motion.div
          className={`studio-showcase-device ${index === 3 || index === 4 ? 'studio-phone' : ''}`}
          style={reduced ? {} : { rotateY, rotateX }}
        >
          <div className="studio-device-toolbar">
            <span>● ● ●</span>
            <span>{project.title}</span>
            <span>↗</span>
          </div>
          <div className="studio-device-screen">
            <motion.div style={reduced ? {} : { y: screenY }}>
              <Image
                src={project.image}
                alt={`${project.title} product interface`}
                width={1100}
                height={800}
                loading="lazy"
              />
            </motion.div>
          </div>
          <div className="studio-device-chin" />
        </motion.div>
        <div className="studio-device-shadow" />
        <span className="studio-project-caption">
          DESIGNED WITH INTENT. BUILT FOR IMPACT.
        </span>
      </div>
    </motion.article>
  );
}

export default function StudioProjects({
  onOpen,
}: {
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const count = useTransform(scrollYProgress, (p) =>
    String(
      Math.min(projects.length, Math.floor(p * projects.length) + 1)
    ).padStart(2, '0')
  );
  const moveTo = (index: number) => {
    if (!ref.current) return;
    const start = ref.current.getBoundingClientRect().top + window.scrollY;
    const travel = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + (travel * (index + 0.25)) / projects.length,
      behavior: reduced ? 'instant' : 'smooth',
    });
  };
  return (
    <section
      ref={ref}
      id="projects"
      className={`studio-projects ${reduced ? 'studio-projects-reduced' : ''}`}
    >
      <div className="studio-projects-sticky">
        <div className="studio-project-heading">
          <div>
            <p className="cine-eyebrow">02 / SELECTED WORK</p>
            <h2>
              Proof of <em>possibility.</em>
            </h2>
          </div>
          <span className="studio-project-counter">
            <motion.b>{count}</motion.b>
            <span> / 06</span>
          </span>
        </div>
        <div className="studio-project-viewport">
          {projects.map((project, index) => (
            <ProjectChapter
              key={project.title}
              index={index}
              progress={scrollYProgress}
              onOpen={onOpen}
              reduced={reduced}
            />
          ))}
        </div>
        <div className="studio-project-bottom">
          <span>SIX PROJECTS. ONE OBSESSION WITH DETAIL.</span>
          <div className="studio-project-dots">
            {projects.map((project, index) => (
              <button
                key={project.title}
                aria-label={`Go to ${project.title}`}
                onClick={() => moveTo(index)}
              >
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="studio-project-arrows">
            <button
              aria-label="Previous project"
              onClick={() =>
                moveTo(
                  Math.max(
                    0,
                    Math.floor(scrollYProgress.get() * projects.length) - 1
                  )
                )
              }
            >
              <ArrowLeft size={17} />
            </button>
            <button
              aria-label="Next project"
              onClick={() =>
                moveTo(
                  Math.min(
                    projects.length - 1,
                    Math.floor(scrollYProgress.get() * projects.length) + 1
                  )
                )
              }
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
        <motion.div
          className="studio-project-progress"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}
