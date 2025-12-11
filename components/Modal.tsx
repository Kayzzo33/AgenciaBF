import React, { useState } from 'react';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { ContactFormState } from '../types';
import { saveLead } from '../services/firebase';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '',
    invests: 'não',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Save to Firebase (Non-blocking)
    // Se falhar por permissão, continuamos o fluxo para não perder o lead no WhatsApp
    try {
      await saveLead({
        ...formData,
        source: 'website_form_modal'
      });
    } catch (error) {
      console.warn("Aviso: Não foi possível salvar no banco de dados (verifique regras do Firebase), mas prosseguindo para WhatsApp/Email.", error);
    }

    try {
      // 2. Format WhatsApp Message (Using api.whatsapp.com for better compatibility)
      const messageText = `*Novo Lead do Site (BF Agência)*\n\n` +
                          `*Nome:* ${formData.name}\n` +
                          `*Empresa:* ${formData.company}\n` +
                          `*Email:* ${formData.email}\n` +
                          `*Telefone:* ${formData.phone}\n` +
                          `*Faturamento:* ${formData.revenue}\n` +
                          `*Investe:* ${formData.invests}\n` +
                          `*Mensagem:* ${formData.message}`;
                          
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5573991002247&text=${encodeURIComponent(messageText)}`;

      // 3. Email Link (Client-side fallback since we don't have a backend server for SMTP)
      const mailtoUrl = `mailto:bfagencia1@gmail.com?subject=Novo Lead Site - ${formData.company}&body=Nome: ${formData.name}%0D%0AEmpresa: ${formData.company}%0D%0ATelefone: ${formData.phone}%0D%0AFaturamento: ${formData.revenue}%0D%0AMensagem: ${formData.message}`;
      
      setSubmitted(true);

      // Redirect actions
      setTimeout(() => {
        // Open email client
        window.location.href = mailtoUrl;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
      }, 1000);

    } catch (error) {
      console.error("Erro ao processar links:", error);
      alert("Houve um erro ao processar. Por favor, nos chame diretamente no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-brand-yellow/20 rounded-2xl w-full max-w-2xl p-6 md:p-8 shadow-2xl transform transition-all animate-[fadeIn_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
              Inicie seu <span className="text-brand-yellow">Projeto</span>
            </h2>
            <p className="text-gray-400 mb-6">Preencha o formulário abaixo para receber uma análise inicial.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Nome Completo*</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Seu nome" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400 font-bold text-brand-yellow">Telefone / WhatsApp Business*</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">E-mail Corporativo*</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors" placeholder="seu@email.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Nome da Empresa</label>
                  <input name="company" value={formData.company} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Sua empresa" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Faturamento Mensal Estimado</label>
                  <select name="revenue" value={formData.revenue} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors">
                    <option value="">Selecione...</option>
                    <option value="<10k">Até R$ 10k</option>
                    <option value="10k-50k">R$ 10k - R$ 50k</option>
                    <option value="50k-100k">R$ 50k - R$ 100k</option>
                    <option value=">100k">Acima de R$ 100k</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Já investe em anúncios?</label>
                  <select name="invests" value={formData.invests} onChange={handleChange} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors">
                    <option value="não">Não, serei novo</option>
                    <option value="sim">Sim, já invisto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Mensagem ou Objetivo Principal*</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors" placeholder="Descreva brevemente seu desafio..." />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-yellow hover:bg-yellow-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {loading ? "PROCESSANDO..." : "ENVIAR PROPOSTA"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-[fadeIn_0.5s]">
            <div className="text-brand-yellow mb-4">
              <CheckCircle size={64} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Solicitação Enviada!</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Seus dados foram salvos. Você está sendo redirecionado para o WhatsApp e para o seu provedor de E-mail para confirmar o envio.
            </p>
            <button onClick={onClose} className="text-brand-yellow hover:underline">Fechar janela</button>
          </div>
        )}
      </div>
    </div>
  );
};