'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ExternalLink, MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingMessage?: { text: string; id: number } | null;
}

export default function ChatPanel({
  open,
  onOpenChange,
  pendingMessage,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastProcessedId = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error,
  } = useChat({
    onError: (err) => {
      console.error('[ChatPanel] useChat error:', err);
    },
    onFinish: (msg) => {
      console.log('[ChatPanel] finished message:', msg);
    },
  });

  const appendRef = useRef(append);
  appendRef.current = append;

  // Auto-send pending message when panel opens
  useEffect(() => {
    if (
      open &&
      pendingMessage &&
      lastProcessedId.current !== pendingMessage.id
    ) {
      lastProcessedId.current = pendingMessage.id;
      appendRef.current({ role: 'user', content: pendingMessage.text });
    }
  }, [open, pendingMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-neutral-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-neutral-800 dark:bg-neutral-950 sm:w-[480px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between overflow-hidden border-b border-neutral-200 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-500/10 px-5 py-4 dark:border-neutral-800">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500" />
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-2 ring-purple-500/30">
              <Image
                src="/memoji.svg"
                alt="Avatar"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Chat with Manal
              </h3>
              <p className="text-xs text-neutral-500">AI-powered assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/15 p-4">
                <MessageCircle className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="mb-1 font-medium text-neutral-800 dark:text-neutral-200">
                Start a conversation
              </h4>
              <p className="text-sm text-neutral-500">
                Ask me about my projects, skills, or anything else!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                // Build a single combined text from parts (if any) or fall back to content
                let assistantText = '';
                const toolNames: string[] = [];

                if (message.role === 'assistant') {
                  if (message.parts && message.parts.length > 0) {
                    for (const part of message.parts) {
                      if (part.type === 'text' && part.text) {
                        assistantText += part.text;
                      } else if (part.type === 'tool-invocation') {
                        const inv = part.toolInvocation;
                        toolNames.push(inv.toolName);
                        // If the tool returned a result, include any string content
                        if (inv.state === 'result' && inv.result) {
                          const r = inv.result as unknown;
                          if (typeof r === 'string') {
                            assistantText += (assistantText ? '\n\n' : '') + r;
                          } else if (
                            r &&
                            typeof r === 'object' &&
                            'presentation' in r &&
                            typeof (r as { presentation: unknown }).presentation === 'string'
                          ) {
                            assistantText +=
                              (assistantText ? '\n\n' : '') +
                              (r as { presentation: string }).presentation;
                          }
                        }
                      }
                    }
                  }
                  if (!assistantText) assistantText = message.content || '';
                }

                const isLoadingTool =
                  message.role === 'assistant' &&
                  !assistantText &&
                  toolNames.length > 0;

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                          : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        isLoadingTool ? (
                          <div className="text-neutral-500 italic">
                            Loading {toolNames.join(', ')}…
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none dark:prose-invert [&>p:last-child]:mb-0 [&>p]:mb-1">
                            <ReactMarkdown>{assistantText}</ReactMarkdown>
                          </div>
                        )
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                );
              })}
              {isLoading &&
                messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
                      <div className="flex gap-1.5">
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              {error && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    <div className="font-semibold">Chat error</div>
                    <div className="mt-1 text-xs opacity-90">
                      {error.message || 'Something went wrong contacting the AI.'}
                    </div>
                    <div className="mt-2 text-xs opacity-70">
                      Check the dev terminal &amp; ensure{' '}
                      <code className="rounded bg-red-200/50 px-1 py-0.5 dark:bg-red-900/40">
                        MISTRAL_API_KEY
                      </code>{' '}
                      is set in <code>.env.local</code>.
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-purple-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:hover:scale-100"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
