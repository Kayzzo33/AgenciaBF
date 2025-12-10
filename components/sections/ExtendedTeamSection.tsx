import React, { useState } from 'react';
import { X, User, Instagram } from 'lucide-react';
import { Reveal } from '../Reveal';
import { cn } from '../../utils';
import { EXTENDED_TEAM } from '../../constants';

export const ExtendedTeamSection = () => {
  const [activeMember, setActiveMember] = useState<typeof EXTENDED_TEAM[0] | null>(null);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
       <div className="container mx-auto px-4">
          <Reveal>
             <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-16">
               Equipe de <span className="text-brand-yellow">Alta Performance</span>
             </h2>
          </Reveal>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
             {EXTENDED_TEAM.map((member, idx) => (
               <div 
                 key={idx}
                 onClick={() => member.active && setActiveMember(member)}
                 className={cn(
                   "relative group rounded-2xl p-4 transition-all duration-300 border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-4 w-[45%] md:w-56 flex-grow-0",
                   member.active ? "cursor-pointer hover:border-brand-yellow hover:bg-zinc-800 hover:-translate-y-2" : "opacity-50 grayscale cursor-not-allowed"
                 )}
               >
                  <div className={cn(
                    "w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 transition-all duration-300",
                    member.active ? "border-brand-yellow/50 group-hover:border-brand-yellow" : "border-zinc-700"
                  )}>
                    {member.thumbnail || member.image ? (
                      <img 
                        src={member.thumbnail || member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-white font-bold text-sm md:text-lg">{member.name}</h3>
                    <p className="text-brand-yellow text-xs uppercase tracking-wider font-medium">{member.role}</p>
                  </div>
                  
                  {member.active && (
                    <div className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                  )}
               </div>
             ))}
          </div>
       </div>

       {/* Enhanced Modal / Lightbox View - Clean Layout to Prevent Errors */}
       {activeMember && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity animate-[fadeIn_0.3s]" 
             onClick={() => setActiveMember(null)}
           ></div>

           {/* Close Button */}
           <button 
                onClick={() => setActiveMember(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-brand-yellow transition-colors z-[110] p-2 bg-black/50 rounded-full"
              >
                <X size={32} />
           </button>

           {/* Content Wrapper - Flex Column for separation */}
           <div className="relative z-10 w-full max-w-[500px] flex flex-col items-center animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
              
              {/* Image Container - Padded bottom to separate from text */}
              <div className="w-full h-[50vh] md:h-[55vh] flex items-end justify-center mb-4">
                 <img 
                   src={activeMember.image} 
                   alt={activeMember.name} 
                   className="w-auto h-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(255,193,7,0.15)]"
                 />
              </div>

              {/* Text and Button Container - Increased Gap (gap-8) */}
              <div className="flex flex-col items-center gap-8 w-full px-4 text-center">
                
                {/* Text Group */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-brand-yellow font-heading font-black text-3xl md:text-5xl uppercase tracking-wider leading-none drop-shadow-lg">
                      {activeMember.role}
                    </h3>
                    <p className="text-white text-xl font-light opacity-90">{activeMember.name}</p>
                </div>
                
                {/* Button */}
                {activeMember.instagram && (
                  <a 
                    href={activeMember.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-brand-yellow text-black hover:bg-white transition-all px-8 py-3 rounded-full flex items-center gap-3 group border border-brand-yellow shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:scale-105"
                  >
                    <Instagram size={24} />
                    <span className="font-bold uppercase text-sm">Seguir no Insta</span>
                  </a>
                )}
              </div>

           </div>
         </div>
       )}
    </section>
  )
}