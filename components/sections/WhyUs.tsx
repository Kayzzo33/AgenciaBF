import React from 'react';
import { Reveal } from '../Reveal';
import RadialOrbitalTimeline from '../RadialOrbitalTimeline';

export const WhyUs = () => (
  <section className="py-24 bg-white relative overflow-hidden min-h-[900px] flex flex-col z-10">
    <div className="container mx-auto px-4 relative z-10">
      <div className="w-full max-w-4xl mx-auto mb-12 text-center">
           <Reveal>
            <h2 className="text-5xl md:text-6xl font-heading font-bold leading-tight mb-8">
              <span className="text-brand-yellow">Porque</span>
              <br/>
              <span className="text-black">contratar a BF?</span>
            </h2>
            
            <p className="text-zinc-600 text-lg max-w-md mx-auto">
              Entenda como nossa metodologia única transforma seu investimento em resultados reais.
            </p>
          </Reveal>
      </div>
      <div className="w-full relative z-20 mt-8">
         <RadialOrbitalTimeline />
      </div>
    </div>
  </section>
);