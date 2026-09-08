'use client';
import { usePrefersReducedMotion as useReducedMotion } from './three/usePrefersReducedMotion';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, MotionConfig, useInView, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Command,
  Send,
  Plus,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { services, experiences, projects, socialLinks } from './portfolio-data';
import './cinematic-portfolio.css';
import './studio-experience.css';
import StudioIntro from './StudioIntro';
import StudioProjects from './StudioProjects';
import { StudioMotion, StudioBridge, StudioMarquee } from './StudioMotion';

const ChatPanel = dynamic(() => import('./chat-panel'), { ssr: false });
const skills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'React Native',
  'Node.js',
  'Nest.js',
  'FastAPI',
  'Tailwind CSS',
  'AWS',
  'GCP',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Firebase',
  'Stripe',
];

function Reveal({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.section>
  );
}

function Magnetic({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  const reduced = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={`cine-button ${className}`}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - box.left - box.width / 2) * 0.12);
        y.set((event.clientY - box.top - box.height / 2) * 0.18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1200, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);
  return (
    <div ref={ref} className="cine-stat">
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/** Optional video sources can be added when actual project recordings are available. */
function ProjectMedia({
  image,
  title,
  video,
  active = false,
}: {
  image: string;
  title: string;
  video?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: '100px' });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!ref.current) return;
    if (inView && active && !reduced) void ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [inView, active, reduced]);
  return (
    <div className="cine-browser">
      <div className="cine-browser-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>preview / {title.toLowerCase().replaceAll(' ', '-')}</span>
        <Plus size={11} />
      </div>
      <div className="cine-browser-screen">
        {video ? (
          <video
            ref={ref}
            src={inView ? video : undefined}
            poster={image}
            muted
            autoPlay={active && !reduced}
            loop
            playsInline
            preload="none"
            aria-label={`${title} demo`}
          />
        ) : (
          <Image
            src={image}
            alt={`${title} interface preview`}
            width={1000}
            height={650}
            loading="lazy"
            className="cine-preview-image"
          />
        )}
      </div>
    </div>
  );
}

export default function CinematicPortfolio() {
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const [mailReady, setMailReady] = useState(false);

  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    let cleanup = () => {};
    let cancelled = false;
    void Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.1,
        anchors: true,
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap.fromTo(
          '.cine-timeline-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cine-timeline',
              start: 'top 70%',
              end: 'bottom 65%',
              scrub: true,
            },
          }
        );
      }, root);
      cleanup = () => {
        context.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => {
      cancelled = true;

      cleanup();
    };
  }, [reduced]);
  const nav = ['About', 'Services', 'Projects', 'Skills', 'Experience'];
  return (
    <MotionConfig reducedMotion="user">
      <div ref={root} className="cinematic-portfolio">
        <StudioMotion />
        <a className="cine-skip" href="#about">
          Skip to content
        </a>
        <header className="cine-nav">
          <a className="cine-brand" href="#home" aria-label="Manal Imran home">
            <span className="cine-monogram">
              m<span>.</span>
            </span>
            <span>
              manal<span className="cine-brand-muted">imran</span>
              <span className="cine-brand-dot">.</span>
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className={menu ? 'cine-navigation is-open' : 'cine-navigation'}
          >
            {nav.map((item) => (
              <a
                href={`#${item.toLowerCase()}`}
                key={item}
                onClick={() => setMenu(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <a href="#contact" className="cine-nav-contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="cine-menu"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </header>
        <StudioIntro />
        <div className="cine-tool-strip">
          <span>IDEAS TO EXPERIENCES</span>
          <div>
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'AWS',
              'React Native',
            ].map((skill, i) => (
              <span key={skill}>
                <span className="cine-tool-symbol">
                  {['⚛', 'N', 'TS', '⬡', '⌁', '⚛'][i]}
                </span>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <Reveal id="about" className="cine-section cine-about">
          <div>
            <p className="cine-eyebrow">01 / A LITTLE ABOUT ME</p>
            <h2>
              Curiosity meets code.
              <br />
              <span>Good things happen.</span>
            </h2>
            <a href="/manal_imran_remote.pdf" className="cine-inline-link">
              A closer look at my journey <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="cine-about-copy">
            <p>
              I’m a Software Engineer based in Karachi, Pakistan, currently
              building full-stack web and mobile applications at{' '}
              <strong>HashPotato</strong>.
            </p>
            <p>
              With 3+ years of experience, I love crafting scalable products
              that make a real impact for international clients. From
              pixel-perfect mobile screens to cloud microservices, I bring equal
              parts engineering precision and creative curiosity.
            </p>
            <div className="cine-stats">
              <Counter value={3} suffix="+" label="Years of experience" />
              <Counter value={6} suffix="+" label="Major projects" />
              <Counter value={20} suffix="%" label="Faster load times" />
            </div>
          </div>
        </Reveal>
        <StudioBridge />
        <StudioProjects
          onOpen={(index) => {
            projectTrigger.current =
              document.activeElement as HTMLButtonElement;
            setSelected(index);
          }}
        />
        <Reveal id="services" className="cine-section">
          <p className="cine-eyebrow">03 / WHAT I BRING TO THE TABLE</p>
          <div className="cine-section-heading">
            <h2>
              From the first idea
              <br />
              <span>to the final pixel.</span>
            </h2>
            <p className="cine-heading-note">
              End-to-end engineering for products
              <br />
              that look good and work even better.
            </p>
          </div>
          <div className="cine-services">
            {services.map((service, i) => (
              <motion.article whileHover={{ y: -6 }} key={service.title}>
                <div className="cine-service-top">
                  <service.icon size={25} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact" aria-label={`Discuss ${service.title}`}>
                  <ArrowUpRight size={20} />
                </a>
              </motion.article>
            ))}
          </div>
        </Reveal>
        <StudioMarquee />
        <Reveal id="skills" className="cine-section cine-skills">
          <div>
            <p className="cine-eyebrow">04 / MY EVERYDAY TOOLKIT</p>
            <h2>
              The right tools.
              <br />
              <span>Infinite possibilities.</span>
            </h2>
            <p>
              Modern technologies, thoughtfully chosen.
              <br />
              Always learning. Always building.
            </p>
          </div>
          <div className="cine-skill-cloud">
            {skills.map((skill, i) => (
              <motion.div
                tabIndex={0}
                whileHover={{ y: -7, scale: 1.07 }}
                className="cine-skill"
                style={{ '--delay': `${i * -0.7}s` } as CSSProperties}
                key={skill}
              >
                <span>{['✳', '◇', '⌘', '⬡'][i % 4]}</span>
                {skill}
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal id="experience" className="cine-section cine-experience">
          <div className="cine-experience-title">
            <p className="cine-eyebrow">05 / THE JOURNEY SO FAR</p>
            <h2>
              Learning. Building.
              <br />
              <span>Growing.</span>
            </h2>
            <p>
              Every chapter brings a new perspective.
              <br />
              Here’s what shaped mine.
            </p>
            <Magnetic
              href="/manal_imran_remote.pdf"
              className="cine-button-secondary"
            >
              View full résumé <ArrowUpRight size={16} />
            </Magnetic>
          </div>
          <div className="cine-timeline">
            <div className="cine-timeline-line">
              <div className="cine-timeline-fill" />
            </div>
            {experiences.map((experience, i) => (
              <motion.article
                key={experience.title}
                initial={{ opacity: 0, x: reduced ? 0 : 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span
                  className={`cine-timeline-node ${i === 0 ? 'is-current' : ''}`}
                />
                <span className="cine-experience-period">
                  {experience.period}
                  {i === 0 && <b>CURRENT</b>}
                </span>
                <h3>{experience.title}</h3>
                <h4>{experience.company}</h4>
                <p>{experience.description}</p>
              </motion.article>
            ))}
          </div>
        </Reveal>
        <Reveal id="contact" className="cine-section cine-contact">
          <div className="cine-contact-particles" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${(i * 19) % 100}%`,
                  top: `${(i * 31) % 100}%`,
                  animationDelay: `${-i}s`,
                }}
              />
            ))}
          </div>
          <div>
            <p className="cine-eyebrow">
              06 / SOMETHING GREAT STARTS WITH A HELLO
            </p>
            <h2>
              Have an idea?
              <br />
              Let’s make it <span>real.</span>
              <span className="cine-contact-star">✳</span>
            </h2>
            <p>
              Looking for a software engineer, a creative collaborator,
              <br />
              or just a good conversation? My inbox is open.
            </p>
            <a
              className="cine-contact-email"
              href="mailto:manalimran200212@gmail.com"
            >
              manalimran200212@gmail.com <ArrowUpRight size={20} />
            </a>
            <div className="cine-contact-socials">
              {socialLinks.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
          <form
            className="cine-form"
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              window.location.href = `mailto:manalimran200212@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry from ${form.get('name')}`)}&body=${encodeURIComponent(`From: ${form.get('name')} <${form.get('email')}>\n\n${form.get('message')}`)}`;
              setMailReady(true);
            }}
          >
            <div className="cine-form-row">
              <label>
                Your name
                <input
                  name="name"
                  placeholder="Alex Johnson"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  placeholder="alex@company.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label>
              What are you thinking?
              <textarea
                name="message"
                placeholder="Tell me a little about your project…"
                rows={3}
                required
                maxLength={4000}
              />
            </label>
            <button className="cine-button cine-button-primary" type="submit">
              Let’s start a conversation <Send size={15} />
            </button>
            <p role="status">
              {mailReady
                ? 'Your email draft is ready in your email app. Send it there to get in touch.'
                : 'This opens your email app with your message ready to send.'}
            </p>
          </form>
        </Reveal>
        <footer className="cine-footer">
          <a href="#home" className="cine-brand">
            manalimran<span className="cine-brand-dot">.</span>
          </a>
          <p>
            © {new Date().getFullYear()} Manal Imran. Crafted with care &
            curiosity.
          </p>
          <a href="#home">
            BACK TO TOP <ArrowUpRight size={14} />
          </a>
        </footer>
        <button
          className="cine-chat-launcher"
          onClick={() => setChat(true)}
          aria-label="Open AI chat with Manal"
        >
          <Sparkles size={17} />
          <span>Ask my AI</span>
          <span className="cine-chat-key">
            <Command size={10} />
          </span>
        </button>
        {chat && <ChatPanel open={chat} onOpenChange={setChat} />}
        <Dialog
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
        >
          <DialogContent
            className="cine-project-dialog"
            data-lenis-prevent
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              projectTrigger.current?.focus();
            }}
          >
            <button
              type="button"
              className="cine-dialog-close"
              aria-label="Close project"
              onClick={() => setSelected(null)}
            >
              <X size={19} />
            </button>
            {selected !== null && (
              <>
                <span className="cine-eyebrow">
                  SELECTED WORK / 0{selected + 1}
                </span>
                <DialogTitle className="cine-dialog-title">
                  {projects[selected].title}
                </DialogTitle>
                <DialogDescription className="cine-dialog-description">
                  {projects[selected].description}
                </DialogDescription>
                <ProjectMedia
                  image={projects[selected].image}
                  title={projects[selected].title}
                  video={projects[selected].video}
                  active
                />
                <div className="cine-tags">
                  {projects[selected].tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="cine-button cine-button-primary"
                >
                  Let’s build something like this <ArrowUpRight size={16} />
                </a>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MotionConfig>
  );
}
