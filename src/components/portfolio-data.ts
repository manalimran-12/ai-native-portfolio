import {
  Globe2,
  Smartphone,
  Server,
  Cloud,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Microscope,
  MapPin,
  Users,
  Building2,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
export const services = [
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

export const experiences = [
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
    period: 'Jun 2023 – Mar 2025',
    description:
      'Designed and developed responsive web and mobile interfaces with a strong focus on usability and accessibility. Conducted user research and usability testing with cross-functional design teams.',
    icon: Briefcase,
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Remote — International Clients',
    period: 'May 2023 – Apr 2025',
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

export const projects: Array<{
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: typeof HeartPulse;
  gradient: string;
  image: string;
  video?: string;
}> = [
  {
    title: 'Disease Prediction System',
    category: 'Final Year Project · AI/ML',
    description:
      'Desktop app built with Electron.js integrated with a FastAPI microservice to predict diseases from uploaded reports using fine-tuned pre-trained ML models for real-time inference.',
    tech: ['Electron.js', 'FastAPI', 'ML / AI'],
    icon: HeartPulse,
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    image: '/projects/disease-prediction.svg',
  },
  {
    title: 'Immigration Services Website',
    category: 'Corporate · US, Canada, UK',
    description:
      'Responsive immigration consulting site with SEO-friendly layouts, mobile-first design, and scalable frontend components.',
    tech: ['Next.js', 'Tailwind CSS', 'SEO'],
    icon: Globe2,
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    image: '/projects/immigration-services.png',
  },
  {
    title: 'Korangi City Lab',
    category: 'Corporate Website · Karachi',
    description:
      'Official website for Korangi City Lab built with React, Vite, Tailwind CSS, and Radix UI. Smooth animations via Framer Motion, SEO optimization, and accessible interactive components.',
    tech: ['React', 'Vite', 'Radix UI', 'Framer Motion'],
    icon: Microscope,
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    image: '/projects/korangi-city-lab.png',
  },
  {
    title: 'Checkpoint Spot',
    category: 'Mobile · Event Marathon',
    description:
      'React Native app converting Figma designs to production-ready screens, with Redux Toolkit for state and REST APIs for real-time data.',
    tech: ['React Native', 'Redux Toolkit', 'REST API'],
    icon: MapPin,
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
    image: '/projects/Main.svg',
  },
  {
    title: 'Employee Performance Rating',
    category: 'Full-Stack Mobile App',
    description:
      'Full-stack mobile app for employee performance tracking. RESTful APIs and seamless frontend-backend integration.',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    icon: Users,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    image: '/projects/employee-rating.svg',
  },
  {
    title: 'Al Jidar Steels',
    category: 'Manufacturing · Riyadh',
    description:
      'Responsive corporate website for a Riyadh-based manufacturing company, optimized for performance, accessibility, and global audiences.',
    tech: ['Next.js', 'Tailwind CSS', 'A11y'],
    icon: Building2,
    gradient: 'from-slate-400 via-zinc-500 to-stone-600',
    image: '/projects/al-jidar-steels.png',
  },
];

export const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/manalimran-12',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/manal-imran-96bb72254',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:manalimran200212@gmail.com',
    label: 'Email',
  },
];
