import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronUp, ChevronDown } from 'lucide-react';
import useChatbot from '@/hooks/useChatbot';

const ChatDock = () => {
  const { quickReplies = [], inputValue, setInputValue, isLoading, sendMessage, handleQuickReply } = useChatbot();
  const [showQuick, setShowQuick] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    // focus the input for convenience
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
    }
  };

  return (
    <div className="fixed left-1/2 bottom-6 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="mx-auto">
        <div className="bg-transparent flex flex-col gap-3">
          {/* quick replies */}
          <div className={`w-full transition-all duration-200 ${showQuick ? 'opacity-100 max-h-40' : 'opacity-60 max-h-0 overflow-hidden'}`}>
            <div className="flex items-center justify-center gap-4 mb-2 text-sm text-white/70">
              <button onClick={() => setShowQuick(!showQuick)} className="flex items-center gap-2 px-2 py-1">
                {showQuick ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span className="underline">{showQuick ? 'Hide quick questions' : 'Show quick questions'}</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {(quickReplies.length ? quickReplies : ['Tell me about Manal', 'What are her skills?', 'Projects', 'Contact']).slice(0, 8).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(q)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm border border-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* input pill */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <div className="flex-1 bg-white/90 rounded-full shadow-inner">
              <div className="flex items-center px-6 py-4 gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything"
                  className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-lg"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="ml-2 w-12 h-12 rounded-full bg-[#A489AD] flex items-center justify-center text-white disabled:opacity-60"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDock;