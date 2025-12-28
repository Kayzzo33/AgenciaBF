import React from 'react';
import { TESTIMONIALS } from '../../constants';

export const Testimonials = () => (
  <section className="py-24 bg-brand-dark overflow-hidden relative z-30">
    <div className="container mx-auto px-4 mb-12 text-center">
      <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-wider">O que dizem nossos <span className="text-brand-yellow">Parceiros</span></h2>
    </div>
    <div className="relative w-full flex overflow-hidden group">
      <div className="flex animate-scroll group-hover:[animation-play-state:paused] gap-6 px-6">
        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[350px] bg-black border border-zinc-800 p-8 rounded-xl hover:border-brand-yellow/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-gray-200 font-bold text-xl">
                {t.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-bold">{t.name}</h3>
                <p className="text-xs text-brand-yellow font-bold uppercase tracking-tighter">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-100 italic leading-relaxed">"{t.text}"</p>
            <div className="flex text-brand-yellow mt-4 gap-1">
              {[1,2,3,4,5].map(star => <span key={star} aria-hidden="true">★</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>
    </div>
  </section>
);