
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ChatbotCharacter from '@/components/ChatbotCharacter';
import ChatInterface from '@/components/ChatInterface';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';
import Projects from '@/components/Projects';
import ContactMe from '@/components/ContactMe';

const PortfolioPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDownloadCV = () => {
    toast({
      title: "📄 CV Download",
      description: "CV download feature coming soon! Contact me directly for my resume.",
      duration: 3000
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <Helmet>
        <title>Manal Imran - Full-Stack Developer & AI Integration Specialist</title>
        <meta
          name="description"
          content="Portfolio of Manal Imran, a full-stack developer with 8+ years of experience in React, Node.js, Python, and AI integration. Building intelligent web solutions with modern technologies."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-lg border-b border-purple-300/20">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              Manal Imran
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-purple-200 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={handleDownloadCV}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/50 backdrop-blur-lg border-t border-purple-300/20"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-purple-200 hover:text-white py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={handleDownloadCV}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </motion.div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-20">
          {/* Hero Section with Chatbot */}
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Manal Imran</span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-200 mb-12">
                  Full-Stack Developer & AI Integration Specialist
                </p>
              </motion.div>

              <ChatbotCharacter onOpenChat={() => setIsChatOpen(true)} />
            </div>
          </section>

          {/* Portfolio Sections */}
          <Services />
          <Skills />
          <WorkExperience />
          <Projects />
          <ContactMe />

          {/* Footer */}
          <footer className="bg-black/30 backdrop-blur-lg border-t border-purple-300/20 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-purple-200 text-sm">
                © 2026 Manal Imran. Built with React, Tailwind CSS & Framer Motion.
              </p>
            </div>
          </footer>
        </main>

        {/* Chat Interface */}
        <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  );
};

export default PortfolioPage;
