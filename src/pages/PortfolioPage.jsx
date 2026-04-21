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
import FluidCursor from '@/components/FluidCursor';
import InlineChatInterface from '@/components/InlineChatInterface';

const PortfolioPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inlineOpen, setInlineOpen] = useState(false);
  const [inlineInitialMessage, setInlineInitialMessage] = useState('');

  const handleDownloadCV = () => {
    toast({
      title: "📄 CV Download",
      description: "CV download feature coming soon! Contact me directly for my resume.",
      duration: 3000
    });
  };

  const handleStartInlineChat = (message = '') => {
    // Close sidebar chat if open
    setIsChatOpen(false);
    setInlineInitialMessage(message);
    setInlineOpen(true);
    // scroll to the inline chat area inside the hero so user sees it
    setTimeout(() => {
      const el = document.querySelector('#inline-chat-hero');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
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

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Fluid Cursor Background */}
        <div className="fixed inset-0 z-0">
          <FluidCursor />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-lg border-b border-[#A489AD]/20">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-[#A489AD]"
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
                  className="text-[#A489AD] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={handleDownloadCV}
                className="bg-gradient-to-r from-[#A489AD] to-[#8a7a91] hover:from-[#c4b5c9] hover:to-[#A489AD] text-black"
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
              className="md:hidden bg-black/90 backdrop-blur-lg border-t border-[#A489AD]/20"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-[#A489AD] hover:text-white py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={handleDownloadCV}
                  className="w-full bg-gradient-to-r from-[#A489AD] to-[#8a7a91] hover:from-[#c4b5c9] hover:to-[#A489AD] text-black"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </motion.div>
          )}
        </header>

        {/* Main Content: single-column layout for cleaner chat UX */}
        <main className="pt-20 relative z-10">
          <div className="max-w-5xl mx-auto px-4">
            {/* Hero Section with centered chat entry */}
            <section className="min-h-screen flex flex-col items-center justify-center py-20">
              <div className="w-full text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A489AD] to-white">Manal Imran</span>
                  </h1>
                  <p className="text-lg md:text-xl text-[#A489AD] mb-8">
                    Full-Stack Developer & AI Integration Specialist
                  </p>
                </motion.div>

                <div className="mx-auto w-full">
                  <ChatbotCharacter onStartInlineChat={handleStartInlineChat} />
                </div>

                {/* Inline chat appears directly below the hero input for a single-column flow */}
                {inlineOpen && (
                  <div id="inline-chat-hero" className="mt-8 w-full flex justify-center">
                    <InlineChatInterface initialMessage={inlineInitialMessage} onClose={() => setInlineOpen(false)} />
                  </div>
                )}
              </div>
            </section>

            {/* Portfolio Sections in single column */}
            <div className="space-y-20">
              <Services />
              <Skills />
              <WorkExperience />
              <Projects />
              <ContactMe />
            </div>

            {/* Footer */}
            <footer className="bg-black/80 backdrop-blur-lg border-t border-[#A489AD]/20 py-8 mt-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-[#A489AD] text-sm">
                  © 2026 Manal Imran. Built with React, Tailwind CSS & Framer Motion.
                </p>
              </div>
            </footer>
          </div>
        </main>

        <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  );
};

export default PortfolioPage;
