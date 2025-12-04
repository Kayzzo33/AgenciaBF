import React from 'react';
import { Reveal } from '../Reveal';
import { ASSETS } from '../../constants';

export const About = () => (
  <section id="about" className="py-24 bg-white relative overflow-hidden">
    <div className="container mx-auto px-4 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[40%] w-[300px] md:w-[500px] pointer-events-none opacity-[0.08]">
        <img src={ASSETS.logoWatermark} alt="Decoration" className="w-full h-auto object-contain filter brightness-0" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-heading font-bold leading-none mb-6">
            <span className="text-brand-yellow block">QUEM</span>
            <span className="text-black block">SOMOS?</span>
          </h2>
          <div className="w-24 h-2 bg-brand-yellow mb-8 mx-auto"></div>
          <p className="text-zinc-800 text-lg md:text-xl leading-relaxed font-medium">
            Somos uma agência de marketing digital focada e <span className="font-bold">especializada em tráfego pago</span> com inteligência. 
            Atendemos tanto clientes locais, como de todo o Brasil.
          </p>
        </Reveal>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] w-[400px] md:w-[600px] pointer-events-none opacity-[0.08]">
        <img src={ASSETS.logoWatermark} alt="BF Watermark" className="w-full h-auto object-contain filter brightness-0" />
      </div>
    </div>
  </section>
);