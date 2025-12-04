import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { ContactFormState } from '../types';

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
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => setSubmitted(true), 1500);
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
                  <label className="text-sm text-gray-400">Telefone / WhatsApp*</label>
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

              <button type="submit" className="w-full bg-brand-yellow hover:bg-yellow-500 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95">
                <Send size={20} />
                ENVIAR PROPOSTA
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-[fadeIn_0.5s]">
            <div className="text-brand-yellow mb-4">
              <CheckCircle size={64} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Recebemos sua solicitação!</h3>
            <p className="text-gray-400 max-w-md">Um de nossos especialistas analisará suas informações e entrará em contato via WhatsApp em breve.</p>
            <button onClick={onClose} className="mt-8 text-brand-yellow hover:underline">Fechar janela</button>
          </div>
        )}
      </div>
    </div>
  );
};