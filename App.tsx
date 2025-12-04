import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      
      <FloatingWhatsApp />
      <AIChat />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;