import React from 'react';
import { Reveal } from '../Reveal';

export const CtaSection = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="py-24 bg-brand-yellow relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div className="container mx-auto px-4 relative z-10 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6 uppercase">
          Quer ser nosso próximo case de <br/>sucesso?
        </h2>
        <p className="text-black/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
          Temos apenas 3 vagas disponíveis para novos projetos este mês. Garanta sua análise gratuita agora.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://wa.me/5573991002247?text=Quero transformar meu negócio com a BF Agência!" className="bg-black text-white font-bold text-lg px-10 py-4 rounded-lg hover:scale-105 transition-transform shadow-xl">Falar no WhatsApp</a>
          <button onClick={onOpenModal} className="bg-transparent border-2 border-black text-black font-bold text-lg px-10 py-4 rounded-lg hover:bg-black hover:text-white transition-all">Receber Proposta</button>
        </div>
      </Reveal>
    </div>
  </section>
);