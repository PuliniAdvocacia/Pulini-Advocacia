
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // Inicia a animação um pouco antes do elemento entrar totalmente
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      // Filtramos apenas os que estão entrando e ainda não estão visíveis
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting && !entry.target.classList.contains('visible'))
        // Ordenamos pela posição no topo para garantir que o escalonamento siga o fluxo de leitura
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

      visibleEntries.forEach((entry, index) => {
        const target = entry.target as HTMLElement;
        
        // Aplicamos um delay incremental para o efeito cascata (stagger)
        // 150ms é o "sweet spot" para percepção de suavidade sem parecer lento
        target.style.transitionDelay = `${index * 150}ms`;
        target.classList.add('visible');
        
        // Performance: Uma vez animado, paramos de observar este elemento específico
        observer.unobserve(target);
      });
    }, observerOptions);

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
      observer.disconnect();
    };
  }, [options]);

  return containerRef;
};
