import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { ASSETS } from '../../constants';

export const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-40 md:pt-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/10 via-transparent to-black/90 z-10"></div>
        <img src={ASSETS.heroBg} alt="Background" className="w-full h-full object-cover opacity-100" />
      </div>

      {/* Increased bottom padding (pb-48) to give space for the arrow */}
      <div className="container mx-auto px-4 pb-48 relative z-20 flex flex-col items-center text-center mt-12 md:mt-16">
        <Reveal>
          <img src={ASSETS.heroLogo} alt="BF Agência" className="w-64 md:w-80 lg:w-96 mx-auto mb-8 drop-shadow-2xl" />
        </Reveal>
        
        <Reveal delay={200}>
          <h2 className="text-black md:text-zinc-900 text-xl md:text-3xl font-heading font-bold mb-12 max-w-3xl mx-auto drop-shadow-md">
            As melhores soluções em tráfego pago para o seu negócio
          </h2>
        </Reveal>

        <Reveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={`https://wa.me/5573991002247?text=${encodeURIComponent("Olá! Gostaria de conhecer os serviços da BF Agência para gestão de tráfego pago.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow text-black text-lg font-bold px-8 py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} />
              Falar com Especialista
            </a>
            <button 
              onClick={onOpenModal}
              className="border border-white/20 text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all flex items-center justify-center bg-black/30 backdrop-blur-sm"
            >
              Solicitar Análise
            </button>
          </div>
        </Reveal>

        {/* Arrow positioned lower with bottom-12 to separate from buttons */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
          <ArrowRight className="rotate-90" />
        </div>
      </div>
    </section>
  );
};