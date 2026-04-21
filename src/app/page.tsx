'use client';

import FluidCursor from '@/components/FluidCursor';
import ChatPanel from '@/components/chat-panel';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Cloud,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  HeartPulse,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Smartphone,
  Globe2,
  Server,
  Users,
  Microscope,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────── Data ────────────────────────────── */

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

const services = [
  {
    icon: Globe2,
    title: 'Web Development',
    description:
      'Scalable, high-performance web apps built with React.js, Next.js, and modern frontend tooling.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile apps with React Native — Figma to production, with deep API integration.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description:
      'RESTful services with Node.js, Nest.js, FastAPI, plus payment gateways like Stripe Subscription billing.',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Microservices on AWS (EC2, S3, SQS), GCP, Firebase, Docker — built with CI/CD best practices.',
  },
];

const experiences = [
  {
    title: 'Software Engineer',
    company: 'HashPotato — Karachi, Pakistan',
    period: 'Apr 2025 – Present',
    description:
      'Building full-stack web & mobile apps with React Native, Next.js, and Nest.js. Reduced load times by 20%, integrated Stripe Subscription billing, and deployed microservices on AWS (S3, EC2, SQS) and GCP.',
    icon: Briefcase,
  },
  {
    title: 'Associate Software Engineer',
    company: '360XpertSolutions — Karachi, Pakistan',
    period: 'Feb 2024 – Mar 2025',
    description:
      'Designed and developed responsive web and mobile interfaces with a strong focus on usability and accessibility. Conducted user research and usability testing with cross-functional design teams.',
    icon: Briefcase,
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Remote — International Clients',
    period: 'May 2023 – Present',
    description:
      'Delivered custom web & mobile solutions using React, Next.js, and React Native. Integrated third-party APIs, authentication systems, and payment gateways across the full project lifecycle.',
    icon: Briefcase,
  },
  {
    title: 'Bachelor of Computer Science',
    company: 'University of Karachi (UBIT)',
    period: '2021 – 2025',
    description:
      'Coursework: Data Structures & Algorithms, OOP, Databases, Operating Systems, Computer Networks, Machine Learning, Data Mining, HCI, and Network Security & Cryptography.',
    icon: GraduationCap,
  },
];

const projects = [
  {
    title: 'Disease Prediction System',
    category: 'Final Year Project · AI/ML',
    description:
      'Desktop app built with Electron.js integrated with a FastAPI microservice to predict diseases from uploaded reports using fine-tuned pre-trained ML models for real-time inference.',
    tech: ['Electron.js', 'FastAPI', 'ML / AI'],
    icon: HeartPulse,
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
  },
  {
    title: 'Immigration Services Website',
    category: 'Corporate · US, Canada, UK',
    description:
      'Responsive immigration consulting site with SEO-friendly layouts, mobile-first design, and scalable frontend components.',
    tech: ['Next.js', 'Tailwind CSS', 'SEO'],
    icon: Globe2,
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
  },
  {
    title: 'Korangi City Lab',
    category: 'Corporate Website · Karachi',
    description:
      'Official website for Korangi City Lab built with React, Vite, Tailwind CSS, and Radix UI. Smooth animations via Framer Motion, SEO optimization, and accessible interactive components.',
    tech: ['React', 'Vite', 'Radix UI', 'Framer Motion'],
    icon: Microscope,
    gradient: 'from-amber-400 via-orange-500 to-red-500',
  },
  {
    title: 'Checkpoint Spot',
    category: 'Mobile · Event Marathon',
    description:
      'React Native app converting Figma designs to production-ready screens, with Redux Toolkit for state and REST APIs for real-time data.',
    tech: ['React Native', 'Redux Toolkit', 'REST API'],
    icon: MapPin,
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
  },
  {
    title: 'Employee Performance Rating',
    category: 'Full-Stack Mobile App',
    description:
      'Full-stack mobile app for employee performance tracking. RESTful APIs and seamless frontend-backend integration.',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    icon: Users,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    title: 'Al Jidar Steels',
    category: 'Manufacturing · Riyadh',
    description:
      'Responsive corporate website for a Riyadh-based manufacturing company, optimized for performance, accessibility, and global audiences.',
    tech: ['Next.js', 'Tailwind CSS', 'A11y'],
    icon: Building2,
    gradient: 'from-slate-400 via-zinc-500 to-stone-600',
  },
];

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/manalimran-12',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/manal-imran',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:manalimran200212@gmail.com',
    label: 'Email',
  },
];

const CV_PATH = '/Manal%20Imran%202026.pdf';

/* ────────────────────────── Animation helpers ────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
}

/* ────────────────────────────── Component ────────────────────────────── */

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<{
    text: string;
    id: number;
  } | null>(null);
  const [heroInput, setHeroInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const hasAutoPlayedRef = useRef(false);

  const openChat = (message?: string) => {
    if (message) {
      setPendingMessage({ text: message, id: Date.now() });
    }
    setChatOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload chat assets
  useEffect(() => {
    const img = new window.Image();
    img.src = '/landing-memojis.png';

    const linkWebm = document.createElement('link');
    linkWebm.rel = 'prefetch';
    linkWebm.as = 'video';
    linkWebm.href = '/final_memojis.webm';
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = '/final_memojis_ios.mp4';
    document.head.appendChild(linkMp4);
  }, []);

  // Load speech synthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Auto-play intro on first user interaction (required by browser autoplay policies)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const events: Array<keyof WindowEventMap> = [
      'mousemove',
      'scroll',
      'click',
      'keydown',
      'touchstart',
    ];

    const trigger = () => {
      if (hasAutoPlayedRef.current) return;
      hasAutoPlayedRef.current = true;
      cleanup();
      timer = setTimeout(() => playIntro(), 900);
    };

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
    };

    events.forEach((e) =>
      window.addEventListener(e, trigger, { passive: true })
    );

    return () => {
      cleanup();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const playIntro = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const text =
      "Hi! I'm Manal Imran. I'm a Software Engineer with over three years of experience, passionate about building scalable web and mobile applications. Let's talk about creating something amazing together!";

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = voicesRef.current.length
      ? voicesRef.current
      : window.speechSynthesis.getVoices();

    const preferredVoice =
      voices.find((v) => v.name === 'Google UK English Female') ||
      voices.find((v) => v.name === 'Samantha') ||
      voices.find((v) =>
        v.name === 'Microsoft Zira - English (United States)'
      ) ||
      voices.find(
        (v) =>
          v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      ) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ─────────────────── Navbar ─────────────────── */}
      <nav
        className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl'
            : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-manal.svg" alt="Logo" width={32} height={32} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={CV_PATH}
              download
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-foreground/20 bg-white/20 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-white/35 dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20 md:inline-flex"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
            <Button
              size="sm"
              className="hidden cursor-pointer rounded-full bg-purple-600 px-5 text-white hover:bg-purple-700 md:flex"
              onClick={() => openChat()}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Let&apos;s Talk
            </Button>
            <button
              className="rounded-lg p-2 text-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-foreground/10 bg-background/95 px-6 py-4 backdrop-blur-xl dark:border-white/10 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={CV_PATH}
              download
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-white/20 py-2 text-sm font-medium text-foreground dark:border-white/20 dark:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <Button
              size="sm"
              className="mt-3 w-full rounded-full bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => {
                setMobileMenuOpen(false);
                openChat();
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Let&apos;s Talk
            </Button>
          </motion.div>
        )}
      </nav>

      {/* ─────────────────── Hero Section ─────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-10">
        <motion.div
          className="z-10 flex max-w-6xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:border-white/20 dark:bg-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to international &amp; remote roles
          </motion.div>

          {/* Avatar — auto-speaks intro on first visit, replays on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <button
              type="button"
              onClick={playIntro}
              onMouseEnter={() => {
                if (!isSpeaking) playIntro();
              }}
              aria-label={
                isSpeaking ? 'Stop introduction' : 'Play introduction'
              }
              className="group relative cursor-pointer outline-none focus:outline-none"
            >
              {/* Animated pulse rings while speaking */}
              {isSpeaking && (
                <>
                  <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-purple-500/30" />
                  <span
                    className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-purple-400/20"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-pink-400/15"
                    style={{ animationDelay: '1s' }}
                  />
                </>
              )}

              <div
                className={`relative h-40 w-40 overflow-hidden rounded-full border-4 bg-white/25 shadow-xl backdrop-blur-sm transition-all duration-500 dark:bg-white/15 sm:h-48 sm:w-48 ${
                  isSpeaking
                    ? 'scale-[1.03] border-purple-500 shadow-purple-500/50'
                    : 'border-foreground/10 group-hover:scale-[1.03] group-hover:border-purple-500/60 group-hover:shadow-purple-500/30 dark:border-white/30'
                }`}
              >
                <Image
                  src="/memoji.svg"
                  alt="Manal Imran Avatar"
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </button>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Manal Imran
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 max-w-2xl text-lg text-foreground/80 sm:text-xl"
          >
            Software Engineer with{' '}
            <span className="font-semibold text-foreground">3+ years</span>{' '}
            building scalable web &amp; mobile apps with React, Next.js, React
            Native, and Node.js.
          </motion.p>

          {/* Chat Input */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (heroInput.trim()) {
                openChat(heroInput.trim());
                setHeroInput('');
              }
            }}
            className="relative w-full max-w-lg"
          >
            <div className="flex items-center rounded-full border border-foreground/15 bg-white/20 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-foreground/25 hover:bg-white/30 dark:border-white/20 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white/15">
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full border-none bg-transparent text-base text-foreground placeholder:text-foreground/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!heroInput.trim()}
                className="flex shrink-0 items-center justify-center rounded-full bg-purple-600 p-2.5 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.form>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {[
              'Who are you?',
              'Show me your projects',
              'What are your skills?',
              'How can I contact you?',
            ].map((q) => (
              <button
                key={q}
                onClick={() => openChat(q)}
                className="cursor-pointer rounded-full border border-foreground/15 bg-white/15 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-white/30 hover:text-foreground dark:border-white/20 dark:bg-white/10 dark:hover:border-white/40 dark:hover:bg-white/20"
              >
                {q}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─────────────────── About Section ─────────────────── */}
      <AnimatedSection id="about" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="mb-12">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-purple-800 dark:text-purple-400">
              About Me
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Building user-centric products for global teams
            </h2>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                I&apos;m a Software Engineer based in Karachi, Pakistan,
                currently building full-stack web and mobile applications at{' '}
                <span className="font-semibold text-foreground">HashPotato</span>
                . With 3+ years of experience, I love crafting scalable products
                that make a real impact for international clients.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                My toolkit spans React.js, Next.js, React Native, Node.js,
                Nest.js, and cloud platforms like AWS and GCP. Whether
                it&apos;s integrating Stripe billing, deploying microservices,
                or shipping pixel-perfect mobile screens — I&apos;m always
                pushing for clean, maintainable code.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'React.js',
                  'Next.js',
                  'React Native',
                  'Node.js',
                  'TypeScript',
                  'AWS',
                  'PostgreSQL',
                  'MongoDB',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-purple-700/30 bg-purple-700/10 px-3 py-1.5 text-sm font-medium text-purple-900 dark:border-purple-300/30 dark:bg-purple-400/15 dark:text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '6+', label: 'Major Projects' },
                { value: '20%', label: 'Faster Load Times' },
                { value: '∞', label: 'Lines of Code' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-foreground/10 bg-white/20 p-6 text-center backdrop-blur-sm dark:border-white/15 dark:bg-white/10"
                >
                  <div className="mb-1 text-3xl font-bold text-purple-800 dark:text-purple-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────────── Services Section ─────────────────── */}
      <AnimatedSection id="services" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-purple-800 dark:text-purple-400">
              Services
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              What I can do for you
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="group rounded-2xl border border-foreground/10 bg-white/20 p-6 backdrop-blur-sm transition-all hover:border-purple-700/30 hover:bg-white/30 dark:border-white/15 dark:bg-white/10 dark:hover:border-purple-300/40 dark:hover:bg-white/15"
              >
                <div className="mb-4 inline-flex rounded-xl bg-purple-700/15 p-3 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────────── Projects Section ─────────────────── */}
      <AnimatedSection id="projects" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="mb-12">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-purple-800 dark:text-purple-400">
              Projects
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Things I&apos;ve built
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-foreground/10 bg-white/20 backdrop-blur-sm transition-all hover:border-purple-700/30 hover:bg-white/30 dark:border-white/15 dark:bg-white/10 dark:hover:border-purple-300/40 dark:hover:bg-white/15"
                onClick={() =>
                  openChat(`Tell me more about the ${project.title} project`)
                }
              >
                {/* Gradient header */}
                <div
                  className={`relative aspect-video overflow-hidden bg-gradient-to-br ${project.gradient}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-white/90 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
                  </h3>
                  <p className="mb-3 text-sm text-foreground/80">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────────── Experience Section ─────────────────── */}
      <AnimatedSection id="experience" className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-purple-800 dark:text-purple-400">
              Experience
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Where I&apos;ve worked &amp; studied
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-foreground/15" />

            {experiences.map((exp) => (
              <motion.div
                key={exp.title}
                variants={fadeInUp}
                className="relative mb-10 pl-20 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-purple-700/30 bg-purple-700/10 backdrop-blur-sm dark:border-purple-300/30 dark:bg-purple-500/20">
                  <exp.icon className="h-5 w-5 text-purple-800 dark:text-purple-400" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-foreground/10 bg-white/20 p-6 backdrop-blur-sm dark:border-white/15 dark:bg-white/10">
                  <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wide text-purple-800 dark:text-purple-400">
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="mb-2 text-sm font-semibold text-foreground/70">
                    {exp.company}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─────────────────── CTA Section ─────────────────── */}
      <section className="px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s build something amazing together
          </h2>
          <p className="mb-8 text-lg text-foreground/80">
            Have a project in mind? Looking for a Software Engineer for your
            team? I&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="cursor-pointer rounded-full bg-purple-600 px-8 text-white hover:bg-purple-700"
              onClick={() =>
                openChat("I'd like to discuss a project with you")
              }
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start a Conversation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer rounded-full border-foreground/20 bg-white/15 px-8 backdrop-blur-sm hover:bg-white/25 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
              asChild
            >
              <a href="mailto:manalimran200212@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────── Footer ─────────────────── */}
      <footer className="border-t border-foreground/10 px-4 py-12 dark:border-white/15">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo-manal.svg"
                alt="Logo"
                width={28}
                height={28}
              />
              <span className="text-sm font-medium text-foreground/70">
                &copy; {new Date().getFullYear()} Manal Imran. All rights
                reserved.
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2.5 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground/70">
              <MapPin className="h-4 w-4" />
              Karachi, Pakistan
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────── Chat Panel ─────────────────── */}
      <ChatPanel
        open={chatOpen}
        onOpenChange={setChatOpen}
        pendingMessage={pendingMessage}
      />

      {/* ─────────────────── Fluid Cursor ─────────────────── */}
      <FluidCursor />
    </div>
  );
}
