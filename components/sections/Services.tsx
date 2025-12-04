import React from 'react';
import { Reveal } from '../Reveal';
import { SERVICES } from '../../constants';

export const Services = () => (
  <section id="services" className="py-24 bg-black">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Nossas <span className="text-brand-yellow">Especialidades</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Soluções completas para dominar o digital e vender mais todos os dias.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {SERVICES.map((service, idx) => (
          <Reveal key={idx} delay={idx * 100} className="h-full">
            <div className="group bg-brand-dark border border-zinc-800 p-6 rounded-2xl hover:border-brand-yellow hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center text-brand-yellow mb-6 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                <service.icon size={32} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);