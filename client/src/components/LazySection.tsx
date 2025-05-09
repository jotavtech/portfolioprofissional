import { ReactNode, useRef, useEffect, useState, memo } from "react";
import { useInView } from "@/hooks/use-in-view";
import { motion, AnimatePresence } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Delay adicional em ms
  rootMargin?: string; // Personalizar quando começar a carregar
  animation?: "fadeIn" | "slideUp" | "zoomIn" | "none"; // Tipo de animação
  duration?: number; // Duração da animação em segundos
}

/**
 * Componente que carrega seu conteúdo apenas quando está visível ou próximo de ser visível
 * Implementa animações de entrada otimizadas
 */
function LazySection({
  children,
  className = "",
  delay = 0,
  rootMargin = "0px 0px 200px 0px",
  animation = "fadeIn",
  duration = 0.6
}: LazySectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    rootMargin,
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [shouldRender, setShouldRender] = useState(false);
  
  // Aplica o delay antes de renderizar
  useEffect(() => {
    if (isInView && !shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, shouldRender]);
  
  // Configurações de animação com base no tipo solicitado
  const getAnimationVariants = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration }
          }
        };
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration }
          }
        };
      case "zoomIn":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration }
          }
        };
      case "none":
        return {
          hidden: {},
          visible: {}
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration }
          }
        };
    }
  };
  
  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {shouldRender && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={getAnimationVariants()}
            style={{ width: '100%', height: '100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Aplicando memo para evitar re-renders desnecessários
export default memo(LazySection);