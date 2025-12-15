import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { ContactFormState } from '../types';
import { saveLead } from '../services/firebase';
import { sendEmailNotification } from '../services/emailService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  revenue: '',
  invests: 'não',
  message: ''
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Resetar o estado sempre que o modal for aberto
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen]);

  // Função segura para fechar e resetar
  const handleClose = () => {
    setSubmitted(false);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      ...formData,
      source: 'website_form_modal'
    };

    // 1. Salvar no Firebase
    try {
      await saveLead(leadData);
    } catch (error) {
      console.warn("Aviso: Firebase save falhou, mas prosseguindo.", error);
    }

    // 2. Enviar Email Silencioso
    sendEmailNotification(leadData).catch(err => console.error("Erro email:", err));

    try {
      // 3. Formatar mensagem e Redirecionar
      const messageText = `*Novo Lead do Site (BF Agência)*\n\n` +
                          `*Nome:* ${formData.name}\n` +
                          `*Empresa:* ${formData.company}\n` +
                          `*Email:* ${formData.email}\n` +
                          `*Telefone:* ${formData.phone}\n` +
                          `*Faturamento:* ${formData.revenue}\n` +
                          `*Investe:* ${formData.invests}\n` +
                          `*Mensagem:* ${formData.message}`;
      
      // Codificação robusta para URL
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5573991002247&text=${encodedMessage}`;

      setSubmitted(true);

      // Delay visual antes de redirecionar
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Houve um erro. Por favor, nos chame no WhatsApp manualmente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrapper com z-index alto e scroll permitido para mobile
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      
      {/* Container Flex que permite scroll vertical em telas pequenas */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        {/* Backdrop (Fundo Escuro) */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
          onClick={handleClose}
          aria-hidden="true"
        ></div>

        {/* Modal Card */}
        <div className="relative transform overflow-hidden rounded-2xl bg-zinc-900 border border-brand-yellow/20 text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl">
          
          {/* Botão Fechar */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/20 hover:bg-black/50 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-6 md:p-8">
            {!submitted ? (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 pr-8">
                  Inicie seu <span className="text-brand-yellow">Projeto</span>
                </h2>
                <p className="text-gray-400 mb-6 text-sm md:text-base">Preencha o formulário abaixo para receber uma análise inicial.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-gray-400 font-medium">Nome Completo*</label>
                      <input 
                        required 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base" 
                        placeholder="Seu nome" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-brand-yellow font-bold">Telefone / WhatsApp*</label>
                      <input 
                        required 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base" 
                        placeholder="(00) 00000-0000" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-gray-400 font-medium">E-mail Corporativo*</label>
                      <input 
                        required 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base" 
                        placeholder="seu@email.com" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-gray-400 font-medium">Nome da Empresa</label>
                      <input 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base" 
                        placeholder="Sua empresa" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-gray-400 font-medium">Faturamento Mensal</label>
                      <select 
                        name="revenue" 
                        value={formData.revenue} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="<10k">Até R$ 10k</option>
                        <option value="10k-50k">R$ 10k - R$ 50k</option>
                        <option value="50k-100k">R$ 50k - R$ 100k</option>
                        <option value=">100k">Acima de R$ 100k</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs md:text-sm text-gray-400 font-medium">Já investe em anúncios?</label>
                      <select 
                        name="invests" 
                        value={formData.invests} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base appearance-none"
                      >
                        <option value="não">Não, serei novo</option>
                        <option value="sim">Sim, já invisto</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs md:text-sm text-gray-400 font-medium">Mensagem ou Objetivo*</label>
                    <textarea 
                      required 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows={3} 
                      className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors text-base" 
                      placeholder="Descreva brevemente seu desafio..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-brand-yellow hover:bg-yellow-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    {loading ? "PROCESSANDO..." : "ENVIAR PROPOSTA"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-[fadeIn_0.5s]">
                <div className="text-brand-yellow mb-4">
                  <CheckCircle size={64} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  Seus dados foram processados com segurança.
                  <br/>
                  <span className="text-white font-bold">Aguardando redirecionamento para o WhatsApp...</span>
                </p>
                
                {/* Barra de progresso visual */}
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden max-w-[200px] mb-8">
                   <div className="h-full bg-brand-yellow animate-[scroll_1.5s_linear_infinite] w-full origin-left transform scale-x-0"></div>
                </div>
                
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button 
                      onClick={handleClose}
                      className="w-full py-3 rounded-lg border border-zinc-700 text-gray-300 hover:text-white hover:border-white transition-all text-sm"
                    >
                      Fechar Janela
                    </button>
                    
                    <button 
                       onClick={() => setSubmitted(false)}
                       className="w-full py-3 rounded-lg text-brand-yellow hover:text-yellow-400 text-sm flex items-center justify-center gap-2"
                    >
                       <RefreshCw size={14} /> Enviar outro contato
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};