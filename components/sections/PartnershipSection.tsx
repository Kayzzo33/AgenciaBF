import React from 'react';
import { ASSETS } from '../../constants';
import { Reveal } from '../Reveal';

export const PartnershipSection = () => {
  return (
    <section className="relative bg-black pt-32 pb-32 z-20 overflow-visible">
       <div className="container mx-auto px-4 relative">
          <Reveal>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-0">
               {/* Box Amarelo com Texto */}
               <div className="bg-brand-yellow rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-10 md:p-16 flex-1 flex flex-col justify-center items-start shadow-[0_0_30px_rgba(255,193,7,0.2)] z-10">
                  <img src={ASSETS.logoMain} alt="BF" className="w-24 md:w-32 h-auto object-contain mb-6" />
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-black leading-tight">
                       “Nós não queremos clientes, <br/><span className="font-black text-black/80">queremos parceiros!”</span>
                  </h2>
               </div>

               {/* Imagem como complemento (Card) */}
               <div className="relative w-full md:w-[320px] h-[300px] md:h-auto overflow-hidden rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none z-10">
                  <img 
                    src={ASSETS.partnerPerson} 
                    alt="Parceiros" 
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Overlay sutil para integração */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-l md:from-black/20 md:to-transparent"></div>
               </div>
            </div>
          </Reveal>
       </div>
    </section>
  )
};