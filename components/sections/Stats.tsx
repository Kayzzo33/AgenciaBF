import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '../Reveal';
import { STATS } from '../../constants';

const Counter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        // Frame time 16ms (approx 60fps)
        const totalFrames = duration / 16;
        const increment = end / totalFrames;
        
        const timer = window.setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            window.clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

export const Stats = () => {
  return (
    <section className="py-20 bg-zinc-900 border-y border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="flex flex-col items-center group cursor-default">
                <div className="text-4xl md:text-6xl font-black text-brand-yellow mb-2 flex items-baseline group-hover:scale-110 transition-transform duration-300">
                  <Counter end={stat.value} />
                  <span className="text-2xl md:text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-gray-400 uppercase text-xs md:text-sm tracking-widest font-bold group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};