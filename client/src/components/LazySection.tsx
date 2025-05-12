import { ReactNode, useEffect, useState, memo } from "react";
import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
  animation?: "fadeIn" | "slideUp" | "zoomIn" | "none";
  duration?: number;
}

/**
 * Componente otimizado que carrega seu conteúdo quando está próximo da viewport
 * Versão simplificada e corrigida para melhor desempenho
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
  
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);
  
  // Variantes de animação simplificadas
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration } }
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration } }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration } }
    },
    none: {
      hidden: {},
      visible: {}
    }
  };
  
  // Seleciona a variante correta
  const selectedVariant = variants[animation] || variants.fadeIn;
  
  // Placeholder para o mesmo tamanho enquanto carrega
  return (
    <div ref={ref} className={className}>
      {showContent ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={selectedVariant}
        >
          {children}
        </motion.div>
      ) : (
        <div style={{ minHeight: "10px" }}></div> 
      )}
    </div>
  );
}

export default memo(LazySection);