
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotCharacter = ({ onOpenChat }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating animation container */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.6 : 0.3
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Character image */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple-400/50 shadow-2xl">
            <img
              src="/bitmoji.png"
              alt="AI Assistant Character"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Chat button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          onClick={onOpenChat}
          size="lg"
          className="bg-[#A489AD] text-black font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat with AI Assistant
        </Button>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-purple-200 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Ask me anything about Manal's skills, projects, or experience!
      </motion.p>
    </div>
  );
};

export default ChatbotCharacter;
