import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import { generateAIResponse, ChatMessage } from '../services/geminiService';
import { saveLead } from '../services/firebase';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a IA da BF Agência. Você quer escalar as vendas da sua empresa ou apenas tirar dúvidas?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading, leadSaved]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    const newHistory = [...messages, { role: 'user', text: userMsg } as ChatMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const { text, functionCall } = await generateAIResponse(newHistory);

      if (functionCall && functionCall.name === 'saveLead') {
        // AI decided to save the lead
        const args = functionCall.args;
        
        // Save to Firebase (Non-blocking)
        try {
            await saveLead({
                ...args,
                source: 'chatbot_qualification'
            });
        } catch (e) {
             console.warn("Aviso: Falha ao salvar lead no Firebase (verifique permissões), continuando fluxo.", e);
        }

        // Generate confirmation text
        const confirmText = "Perfeito! Já registrei seus dados e passei o resumo da nossa conversa para a equipe. Clique no botão abaixo para concluir o atendimento no WhatsApp.";
        setMessages(prev => [...prev, { role: 'model', text: confirmText }]);
        
        // Setup WhatsApp Button with RICH CONTEXT
        // Using api.whatsapp.com/send is often more reliable for Desktop Apps than wa.me
        const waText = `*Iniciando Atendimento (Via Chatbot Site)*\n\n` +
                       `👤 *Nome:* ${args.name}\n` +
                       `🏢 *Empresa/Projeto:* ${args.company}\n` +
                       `📱 *Telefone:* ${args.phone}\n` +
                       `💰 *Faturamento/Investimento:* ${args.revenue}\n\n` +
                       `📝 *Resumo da Conversa:* \n${args.needs}`;
        
        const encodedText = encodeURIComponent(waText);
        setWhatsappLink(`https://api.whatsapp.com/send?phone=5573991002247&text=${encodedText}`);
        setLeadSaved(true);

        // Also trigger email mailto for redundancy
        const mailtoBody = `Nome: ${args.name}%0D%0AEmpresa: ${args.company}%0D%0AFone: ${args.phone}%0D%0AResumo: ${args.needs}`;
        const mailtoUrl = `mailto:bfagencia1@gmail.com?subject=Lead via Chatbot - ${args.company}&body=${mailtoBody}`;
        
        // Slight delay to prevent browser blocking the second popup/action
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 500);

      } else {
        // Normal text response
        setMessages(prev => [...prev, { role: 'model', text: text || "Entendido." }]);
      }

    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um erro de conexão. Por favor, use o botão do WhatsApp no canto da tela.' }]);
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
                {/* Check if text contains a link (simple heuristic) */}
                {msg.text.includes('https://wa.me') ? (
                    <span>
                        {msg.text.split('https://wa.me')[0]}
                        <a href="https://wa.me/5573991002247" target="_blank" rel="noopener noreferrer" className="underline font-bold text-brand-yellow hover:text-white">
                            Clique aqui para chamar no WhatsApp
                        </a>
                    </span>
                ) : (
                    msg.text
                )}
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

          {/* CTA for Saved Lead */}
          {leadSaved && (
             <div className="flex justify-center mt-4 pb-2">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#128C7E] transition-colors animate-pulse shadow-lg hover:scale-105 transform"
                >
                  <MessageCircle size={20} />
                  Continuar no WhatsApp
                </a>
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
            disabled={leadSaved} 
            placeholder={leadSaved ? "Atendimento transferido para WhatsApp" : "Digite sua mensagem..."}
            className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-yellow disabled:opacity-50"
          />
          <button 
            onClick={handleSend} 
            disabled={leadSaved}
            className="bg-brand-yellow text-black p-2 rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};