import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { useTranslation } from '../../i18n/LanguageContext';
import { aiAPI } from '../../services/api';
import type { ChatMessage } from '../../types';

interface ChatDrawerProps {
  onClose: () => void;
}

export default function ChatDrawer({ onClose }: ChatDrawerProps) {
  const t = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t.ai.welcome },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiAPI.sendMessage(trimmed, messages);
      setMessages([...history, { role: 'assistant', content: response.reply }]);
    } catch (err: unknown) {
      const status = (err as AxiosError).response?.status;
      if (status === 429) {
        toast.error(t.ai.rateLimitError);
      } else {
        toast.error(t.ai.errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-4 z-[60] w-[400px] h-[520px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-chat-pop-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-grey-50 bg-primary-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" />
            <path d="M20 6v4" />
            <path d="M22 8h-4" />
            <path d="M6 18v2" />
            <path d="M7 19H5" />
          </svg>
          <h2 className="font-semibold text-sm">{t.ai.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-primary-700 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : 'bg-[#F5F7FA] text-grey-500 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#F5F7FA] text-grey-300 px-3 py-2 rounded-lg rounded-bl-none text-sm flex items-center gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
              <span className="ml-1">{t.ai.thinking}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-grey-50 p-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.ai.placeholder}
          className="flex-1 px-3 py-2 border border-grey-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
