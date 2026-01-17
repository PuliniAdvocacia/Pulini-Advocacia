
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, ...options });

    const currentRef = containerRef.current;
    if (currentRef) {
      const elements = currentRef.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (currentRef) {
        const elements = currentRef.querySelectorAll('.fade-in');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [options]);

  return containerRef;
};
