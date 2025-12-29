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
    <section ref={sectionRef} className="relative w-full min-h-screen sm:min-h-[900px] flex flex-col items-center justify-between lg:justify-end overflow-hidden bg-black pt-0 pb-0">
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.teamBg} alt="" role="presentation" className="w-full h-full object-cover" />
      </div>

      <div className="relative lg:absolute lg:top-[12%] left-0 w-full z-30 flex items-center gap-4 lg:gap-6 px-4 lg:px-0 pt-20 lg:pt-0 mb-12 lg:mb-0">
        <div className={cn("h-3 lg:h-12 bg-brand-yellow rounded-r-full shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all duration-1000 ease-out", isVisible ? "w-12 lg:w-24 opacity-100" : "w-0 opacity-0")}></div>
        <h2 className={cn("text-white font-heading font-bold text-lg md:text-2xl lg:text-3xl max-w-2xl leading-tight transition-all duration-1000 delay-300", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
          Conheça o time que vai fazer diferença nos seus resultados:
        </h2>
      </div>

      <div className="absolute top-6 right-8 lg:right-24 z-20 hidden lg:block">
        <img src={ASSETS.teamLogo} alt="BF Logo" className="w-24 sm:w-32 h-auto object-contain opacity-90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row justify-center items-end gap-12 lg:gap-16 w-full pb-12 lg:pb-0">
          
          {/* Pessoa 1 */}
          <div className="relative w-full max-w-[550px] flex flex-col items-center group">
             <div className={cn("absolute top-[20%] -left-[10%] z-30 text-left hidden lg:block transition-all duration-700 delay-500", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                <h3 className="text-brand-yellow font-heading font-bold text-3xl mb-1">Geriel Soglia</h3>
                <div className="w-24 h-[2px] bg-white mb-1 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <p className="text-white text-xl font-light">CEO & Founder</p>
             </div>
             
             <div className="lg:hidden w-full text-center mb-6">
                <h3 className="text-brand-yellow font-heading font-bold text-2xl md:text-3xl">Geriel Soglia</h3>
                <div className="w-12 h-[2px] bg-white mx-auto my-2"></div>
                <p className="text-white text-lg">CEO & Founder</p>
             </div>
             
             {ASSETS.teamFrame && (
               <div className="absolute bottom-0 left-[38%] -translate-x-1/2 w-[90%] h-[70%] z-0 opacity-60 pointer-events-none">
                  <img src={ASSETS.teamFrame} alt="" className="w-full h-full object-contain" />
               </div>
             )}
             
             <a 
               href="https://www.instagram.com/ogeriiel/" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Perfil do Instagram de Geriel Soglia"
               className="relative z-10 w-full cursor-pointer"
             >
                <img src={ASSETS.teamPerson1} alt="Foto de Geriel Soglia" className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 origin-bottom" />
             </a>
          </div>

          {/* Pessoa 2 */}
          <div className="relative w-full max-w-[550px] flex flex-col items-center group">
             <div className={cn("absolute top-[20%] -left-[10%] z-30 text-left hidden lg:block transition-all duration-700 delay-700", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10")}>
                <h3 className="text-brand-yellow font-heading font-bold text-3xl mb-1">Marcos Júnior</h3>
                <div className="w-24 h-[2px] bg-white mb-1 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <p className="text-white text-xl font-light">Diretor e Gerente Comercial</p>
             </div>

             <div className="lg:hidden w-full text-center mb-6">
                <h3 className="text-brand-yellow font-heading font-bold text-2xl md:text-3xl">Marcos Júnior</h3>
                <div className="w-12 h-[2px] bg-white mx-auto my-2"></div>
                <p className="text-white text-lg">Diretor e Gerente Comercial</p>
             </div>

             {ASSETS.teamFrame && (
               <div className="absolute bottom-0 left-[38%] -translate-x-1/2 w-[90%] h-[70%] z-0 opacity-60 pointer-events-none">
                  <img src={ASSETS.teamFrame} alt="" className="w-full h-full object-contain" />
               </div>
             )}
             
             <a 
               href="https://www.instagram.com/marcosg_jr/" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Perfil do Instagram de Marcos Júnior"
               className="relative z-10 w-full cursor-pointer"
             >
                <img src={ASSETS.teamPerson2} alt="Foto de Marcos Júnior" className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 origin-bottom" />
             </a>
          </div>

        </div>
      </div>
    </section>
  );
};