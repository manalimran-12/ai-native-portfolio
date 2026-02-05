import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useChatbot from '@/hooks/useChatbot';
import FluidCursor from '@/components/FluidCursor';

const ChatInterface = ({ isOpen, onClose }) => {
  const { messages, inputValue, setInputValue, isLoading, sendMessage, handleQuickReply, quickReplies } = useChatbot();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:right-8 md:bottom-8 md:top-8 md:w-[450px] bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#A489AD]/30"
          >
            {/* Fluid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
              <FluidCursor />
            </div>

            {/* Header */}
            <div className="relative z-10 bg-gradient-to-r from-[#A489AD] to-[#8a7a91] text-black p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-sm text-black/80">Ask me anything!</p>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-sm ${
                      message.sender === 'user'
                        ? 'bg-[#A489AD] text-white rounded-br-none shadow-lg'
                        : 'bg-white/10 text-white shadow-md rounded-bl-none border border-[#A489AD]/30'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-white/50'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md flex items-center gap-2 border border-[#A489AD]/30 backdrop-blur-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-[#A489AD]" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="relative z-10 p-4 bg-white/5 backdrop-blur-sm border-t border-[#A489AD]/20">
                <p className="text-xs text-white/60 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.slice(0, 4).map((reply, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full border-[#A489AD]/50 text-[#A489AD] hover:bg-[#A489AD]/20 hover:text-white backdrop-blur-sm"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="relative z-10 p-4 bg-white/5 backdrop-blur-sm border-t border-[#A489AD]/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 rounded-full border border-[#A489AD]/30 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#A489AD] focus:border-transparent text-white placeholder:text-white/40"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isLoading}
                  className="rounded-full bg-gradient-to-r from-[#A489AD] to-[#8a7a91] hover:from-[#c4b5c9] hover:to-[#A489AD] text-white w-12 h-12 shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
