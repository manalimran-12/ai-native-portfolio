import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, X } from 'lucide-react';
import useChatbot from '@/hooks/useChatbot';

const InlineChatInterface = ({ initialMessage = '', onClose }) => {
  const { messages, inputValue, setInputValue, isLoading, sendMessage, quickReplies, handleQuickReply } = useChatbot();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialMessage?.trim()) {
      // send initial message once
      sendMessage(initialMessage);
    }
    // focus input when component mounts
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
    }
  };

  // Bubble classes
  const userBubble = 'max-w-[80%] rounded-[18px] px-4 py-3 bg-[#A489AD] text-black shadow-sm rounded-br-none';
  const botBubble = 'max-w-[80%] rounded-[18px] px-4 py-3 bg-[#2a2a2a] text-white shadow-sm rounded-bl-none border border-[#3a3a3a]';

  const chatBox = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="w-full max-w-3xl mx-auto bg-[#1f1f1f] rounded-2xl p-4 shadow-lg border border-[#A489AD]/20"
      aria-live="polite"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold">Chat</h4>
        {onClose && (
          <button onClick={onClose} className="text-sm text-white/60 hover:text-white p-2 rounded-md">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="max-h-[40vh] sm:max-h-64 overflow-y-auto space-y-3 mb-4 px-1">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={message.sender === 'user' ? userBubble : botBubble}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className="text-xs mt-1 text-white/50">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className={botBubble}>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#A489AD]" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && quickReplies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {quickReplies.slice(0, 4).map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickReply(q)}
              className="px-3 py-2 bg-[#2f2f2f] text-white rounded-full text-sm border border-[#A489AD]/20 hover:bg-[#3a3a3a]"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full bg-[#2f2f2f] text-white placeholder:text-white/50 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-3 rounded-full bg-[#A489AD] text-white disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
        <div className="w-full h-[90vh] bg-transparent flex items-end">
          <div className="w-full rounded-t-2xl bg-[#101010] p-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold">Chat</h4>
              {onClose && (
                <button onClick={onClose} className="text-sm text-white/60 hover:text-white p-2 rounded-md">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="h-[65vh] overflow-y-auto pb-4">
              {chatBox}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return chatBox;
};

export default InlineChatInterface;
