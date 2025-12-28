import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils';
import { ASSETS } from '../../constants';

export const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none">
      <nav 
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-between",
          isScrolled 
            ? "mt-6 w-[92%] md:w-fit bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] md:gap-12" 
            : "w-full max-w-7xl px-6 py-10 mt-2 bg-transparent md:gap-0"
        )}
      >
        <div className="flex items-center gap-3">
          <img 
            src={ASSETS.logoMain} 
            alt="BF Logo - Início" 
            className="h-10 w-auto object-contain transition-transform hover:scale-110" 
          />
          <div 
             className={cn(
               "hidden md:flex overflow-hidden transition-all duration-500 ease-in-out",
               isScrolled ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
             )}
          >
            <img 
              src={ASSETS.logoText} 
              alt="BF Agência de Gestão de Tráfego" 
              className="h-8 w-auto object-contain" 
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className={cn("transition-colors text-sm uppercase tracking-wider font-bold", isScrolled ? "text-gray-300 hover:text-brand-yellow" : "text-black hover:text-zinc-700")}>Início</a>
          <a href="#about" className={cn("transition-colors text-sm uppercase tracking-wider font-bold", isScrolled ? "text-gray-300 hover:text-brand-yellow" : "text-black hover:text-zinc-700")}>Quem Somos</a>
          <a href="#services" className={cn("transition-colors text-sm uppercase tracking-wider font-bold", isScrolled ? "text-gray-300 hover:text-brand-yellow" : "text-black hover:text-zinc-700")}>Serviços</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenModal}
            className={cn(
              "bg-brand-yellow hover:bg-yellow-400 text-black font-bold rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:-translate-y-0.5 whitespace-nowrap",
              isScrolled ? "px-5 py-2 text-sm" : "px-6 py-3 shadow-xl"
            )}
          >
            Falar com Especialista
          </button>
          <button 
            className={cn("md:hidden transition-colors p-2", isScrolled ? "text-white" : "text-black")} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full mt-4 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col gap-4 md:hidden animate-[fadeIn_0.2s] shadow-2xl mx-4 pointer-events-auto">
            <a href="#home" className="text-white p-2 text-center font-medium hover:text-brand-yellow" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#about" className="text-white p-2 text-center font-medium hover:text-brand-yellow" onClick={() => setIsMenuOpen(false)}>Quem Somos</a>
            <a href="#services" className="text-white p-2 text-center font-medium hover:text-brand-yellow" onClick={() => setIsMenuOpen(false)}>Serviços</a>
          </div>
        )}
      </nav>
    </div>
  );
};