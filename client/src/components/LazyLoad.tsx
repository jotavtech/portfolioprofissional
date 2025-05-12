import React, { useState, useEffect, useRef, ReactNode, memo } from 'react';
import { motion } from 'framer-motion';

// Tipos de animação disponíveis
type AnimationType = 'fade' | 'slideUp' | 'zoom' | 'none';

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: AnimationType;
  delay?: number;
}

/**
 * Componente de carregamento lazy simplificado e confiável
 * - Carrega componentes apenas quando estão perto de entrar na viewport
 * - Usa IntersectionObserver para melhor performance
 * - Suporta diferentes efeitos de animação
 */
function LazyLoad({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px 100px 0px',
  animation = 'fade',
  delay = 0
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Já processado, não precisa repetir
    if (hasAnimated) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Se tiver delay, aplica, senão mostra imediatamente
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
          observer.unobserve(currentRef);
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, hasAnimated, rootMargin, threshold]);

  // Definições das animações
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5 } }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    },
    none: {
      initial: {},
      animate: {}
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <motion.div
          initial={selectedAnimation.initial}
          animate={selectedAnimation.animate}
        >
          {children}
        </motion.div>
      ) : (
        // Placeholder para manter espaço enquanto carrega
        <div style={{ minHeight: '10px' }} />
      )}
    </div>
  );
}

export default memo(LazyLoad);