import React from 'react';
import { Reveal } from '../Reveal';
import { ASSETS } from '../../constants';

export const IntroSection = () => {
  return (
    <section className="relative w-full min-h-[700px] flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src={ASSETS.introBg} 
          alt="" 
          role="presentation"
          loading="lazy"
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10"></div>
      </div>

      <div className="absolute top-8 right-8 z-30">
        <img 
          src={ASSETS.logoYellow} 
          alt="Logo BF Agência Amarelo" 
          loading="lazy"
          className="w-24 md:w-32 opacity-90 hover:opacity-100 transition-opacity" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pt-20 md:pt-0 pl-4 md:pl-12">
          <Reveal>
            <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] uppercase tracking-tight">
              <span className="text-white block">Gestão</span>
              <span className="text-white block">Digital de</span>
              <span className="text-brand-yellow block mt-2">Tráfego Pago</span>
              <span className="text-brand-yellow block">Inteligente</span>
            </h2>
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 relative h-[500px] md:h-[700px] flex items-end justify-center md:justify-end pb-10">
          <img 
            src={ASSETS.arrow} 
            alt="" 
            role="presentation"
            loading="lazy"
            className="absolute bottom-0 right-0 w-[90%] md:w-[80%] object-contain z-10"
            style={{ maxHeight: '90%' }}
          />
          <div className="relative z-20 w-[85%] md:w-[75%] md:-mr-10 mb-10 md:mb-20 animate-float">
            <img 
              src={ASSETS.notebook} 
              alt="Notebook exibindo dashboard de resultados" 
              loading="lazy"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};