import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User, Briefcase, Code, Rocket, Mail } from 'lucide-react';

const ChatbotCharacter = ({ onOpenChat, onStartInlineChat = () => {}, dockVisible = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const recommendedQuestions = [
    { icon: User, label: 'Me', question: 'Tell me about Manal' },
    { icon: Briefcase, label: 'Projects', question: 'What projects has Manal worked on?' },
    { icon: Code, label: 'Skills', question: 'What are Manal\'s technical skills?' },
    { icon: Rocket, label: 'Fun', question: 'What makes Manal unique?' },
    { icon: Mail, label: 'Contact', question: 'How can I contact Manal?' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onStartInlineChat(inputValue);
      setInputValue('');
    }
  };

  const handleQuestionClick = (question) => {
    onStartInlineChat(question);
    setInputValue('');
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Avatar with multiple rings */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="absolute -inset-6 rounded-full border-8 border-[#A489AD]/6 transform-gpu blur-[18px]" />
        <div className="absolute -inset-3 rounded-full border-2 border-[#A489AD]/30 opacity-80" />

        <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#A489AD]/10 bg-gradient-to-b from-[#2b2330]/40 to-transparent">
          <img src="/bitmoji.png" alt="AI Assistant Character" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* Large pill input (hero) */}
      <motion.div className="w-full flex justify-center mt-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="flex items-center bg-white/6 backdrop-blur-md rounded-full px-4 py-3 shadow-xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent placeholder:text-white/60 text-white text-lg focus:outline-none px-3"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="ml-3 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-md hover:scale-105 transition-transform disabled:opacity-60"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Recommended quick-cards (bigger rounded cards like reference) */}
      <motion.div className={`w-full flex justify-center mt-6 ${dockVisible ? 'mb-36' : ''}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex flex-wrap gap-4 justify-center">
          {recommendedQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(item.question)}
              className="flex items-center gap-3 px-5 py-3 bg-white/8 text-white rounded-2xl shadow-lg hover:bg-white/12 transition-all border border-white/6"
            >
              <item.icon className="w-5 h-5 text-[#A489AD]" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* subtitle */}
      <p className="text-sm text-white/60 mt-4 text-center max-w-xl">Ask anything about Manal's work, skills, or projects — responses appear right below.</p>
    </div>
  );
};

export default ChatbotCharacter;
