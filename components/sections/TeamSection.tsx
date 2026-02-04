import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils';
import { ASSETS } from '../../constants';

export const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[380px] md:min-h-[600px] lg:min-h-[900px] flex flex-col items-center justify-between overflow-hidden bg-black pt-12 md:pt-24 pb-0">
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.teamBg} alt="" role="presentation" className="w-full h-full object-cover opacity-60" />
      </div>

      {/* Cabeçalho da Seção */}
      <div className="relative z-30 flex items-center gap-4 lg:gap-6 px-4 lg:px-0 w-full max-w-7xl mb-4 md:mb-0">
         <div className={cn("h-3 lg:h-12 bg-brand-yellow rounded-r-full shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all duration-1000 ease-out", isVisible ? "w-12 lg:w-24 opacity-100" : "w-0 opacity-0")}></div>
        <h2 className={cn("text-white font-heading font-bold text-lg md:text-2xl lg:text-3xl max-w-2xl leading-tight transition-all duration-1000 delay-300", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
          Conheça o time que vai fazer diferença nos seus resultados:
        </h2>
      </div>
      
       <div className="absolute top-6 right-8 lg:right-24 z-20 hidden lg:block">
        <img src={ASSETS.teamLogo} alt="BF Logo" className="w-24 sm:w-32 h-auto object-contain opacity-90" />
      </div>

      {/* Container da Imagem - Alinhado ao fundo (items-end) */}
      <div className="container mx-auto px-4 relative z-10 w-full flex-1 flex items-end justify-center">
         <div className={cn("relative w-full max-w-[1400px] transition-all duration-1000 delay-500 flex items-end justify-center", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20")}>
             <img 
               src={ASSETS.teamGroup} 
               alt="Equipe BF Agência Completa" 
               className="w-full md:w-[95%] lg:w-full h-auto object-contain object-bottom drop-shadow-[0_-10px_30px_rgba(0,0,0,0.8)]" 
             />
             
             {/* Efeitos de luz atrás da imagem - Único feixe, suave e posicionado na base */}
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-[120px] md:h-[300px] bg-brand-yellow/5 rounded-full blur-[40px] md:blur-[80px] pointer-events-none"></div>
         </div>
      </div>
    </section>
  );
};