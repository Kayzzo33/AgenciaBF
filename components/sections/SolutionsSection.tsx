import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import { ASSETS, SOLUTIONS_LIST, ADAPTATION_ITEMS } from '../../constants';

export const SolutionsSection = () => {
  return (
    <section className="relative bg-black pt-24 pb-48 overflow-visible z-30">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Part 1: Solutions (Premium Grid) */}
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight">
              <span className="text-brand-yellow">Solucionamos e sanamos</span> <span className="text-white">a demanda</span>
              <br />
              <span className="text-white">de acordo com sua necessidade:</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-6xl mx-auto mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUTIONS_LIST.map((item, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex items-start gap-4 overflow-hidden transition-all duration-300 hover:border-brand-yellow hover:shadow-[0_0_25px_rgba(255,193,7,0.15)] hover:-translate-y-1 cursor-default h-full backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="mt-1 min-w-[28px]">
                      <div className="w-7 h-7 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors shadow-md">
                        <CheckCircle2 size={16} aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-zinc-200 font-medium text-lg leading-snug group-hover:text-white transition-colors relative z-10">{item}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
        </div>

        {/* Part 2: Adaptation (Overlap Layout) */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-end gap-0 relative z-20 mt-40">
           
           {/* Text Content - Pushed Far Right to approach Notebook */}
           <div className="w-full lg:w-1/2 lg:pl-36 z-20 relative order-2 lg:order-1">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-10">
                  Adaptação diante <br/><span className="text-brand-yellow">a concorrência:</span>
                </h2>
                <div className="flex flex-col gap-5">
                  {ADAPTATION_ITEMS.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 flex items-center gap-6 overflow-hidden transition-all duration-500 hover:border-brand-yellow hover:bg-zinc-900/90 cursor-default hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(255,193,7,0.1)] w-full max-w-xl"
                    >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                       <div className="min-w-[64px] w-[64px] h-[64px] rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-brand-yellow group-hover:scale-110 group-hover:border-brand-yellow/50 transition-all duration-300 shadow-inner relative z-10">
                          <item.icon size={28} aria-hidden="true" />
                       </div>
                       <h3 className="text-lg md:text-xl font-heading font-bold text-white group-hover:text-brand-yellow transition-colors leading-tight relative z-10">
                         {item.title}
                       </h3>
                       <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-brand-yellow">
                          <ArrowRight size={20} aria-hidden="true" />
                       </div>
                    </div>
                  ))}
                </div>
              </Reveal>
           </div>
           
           {/* Sharp Notebook - Justify End (Right aligned) */}
           <div className="w-full lg:w-1/2 hidden lg:flex justify-end relative z-10 order-1 lg:order-2">
              <Reveal delay={200}>
                 <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <img 
                      src={ASSETS.notebookBlack} 
                      alt="Dashboard de resultados exibido em um notebook" 
                      loading="lazy"
                      className="w-full max-w-sm h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
              </Reveal>
           </div>
        </div>

      </div>

      <div className="hidden lg:block absolute bottom-[-80px] left-[-40px] z-30 w-[150px] pointer-events-none">
        <img src={ASSETS.notebookBlur} alt="" role="presentation" className="w-full h-auto object-contain opacity-100" />
      </div>
    </section>
  );
};