import React, { useState, useEffect } from 'react';
import { Modal } from './components/Modal';
import { AIChat } from './components/AIChat';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { IntroSection } from './components/sections/IntroSection';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { TeamSection } from './components/sections/TeamSection';
import { ExtendedTeamSection } from './components/sections/ExtendedTeamSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import { WhyUs } from './components/sections/WhyUs';
import { PartnershipSection } from './components/sections/PartnershipSection';
import { Testimonials } from './components/sections/Testimonials';
import { Stats } from './components/sections/Stats';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { cn } from './utils';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe os botões flutuantes após passar 600px de scroll
      setShowFloatingButtons(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans text-white selection:bg-brand-yellow selection:text-black">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <IntroSection />
      <About />
      <Services />
      <TeamSection />
      <ExtendedTeamSection />
      <SolutionsSection />
      <WhyUs />
      <PartnershipSection />
      <Testimonials />
      <Stats />
      <CtaSection onOpenModal={() => setIsModalOpen(true)} />
      <Footer />
      
      {/* Wrapper para controlar visibilidade no mobile vs desktop */}
      <div className={cn(
        "transition-opacity duration-500",
        showFloatingButtons ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
      )}>
        <FloatingWhatsApp />
        <AIChat />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;