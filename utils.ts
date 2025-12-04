import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const REVEAL_CLASS = "transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 translate-y-8 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0";
export const REVEAL_VISIBLE = "opacity-100 translate-y-0";

// Observer helper
export const useIntersectionObserver = (callback: () => void, options = { threshold: 0.1 }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [callback, options]);

  return ref;
};