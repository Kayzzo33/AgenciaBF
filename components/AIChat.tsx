import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Olá! Sou a IA da BF Agência. Como posso ajudar você a escalar suas vendas hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const aiMsg = await generateAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: aiMsg }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Erro ao conectar com o servidor.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)} 
        className={`fixed bottom-24 right-5 z-[90] bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-full shadow-lg border border-brand-yellow/30 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 scale-100'}`}
        title="Falar com IA"
      >
        <Bot size={24} className="text-brand-yellow" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-5 right-5 sm:bottom-24 sm:right-5 z-[99] w-[90vw] sm:w-[350px] bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-zinc-900 p-4 flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Bot className="text-brand-yellow" size={20} />
            <span className="font-heading font-bold text-white text-sm">BF Intelligence</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-black/90">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-yellow text-black rounded-tr-none' : 'bg-zinc-800 text-gray-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 p-3 rounded-lg rounded-tl-none flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre nossos serviços..."
            className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-yellow"
          />
          <button onClick={handleSend} className="bg-brand-yellow text-black p-2 rounded-lg hover:bg-yellow-500">
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};