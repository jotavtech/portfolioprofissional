import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Otimizar tratamento de eventos com throttling
  useEffect(() => {
    // Variáveis para throttling
    let isThrottled = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let rafId: number | null = null;
    
    // Função otimizada com requestAnimationFrame
    const mouseMove = (e: MouseEvent) => {
      // Armazena a posição atual do mouse
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      // Evita atualizações excessivas durante movimento rápido do mouse
      if (isThrottled) return;
      
      isThrottled = true;
      
      // Agenda a atualização para o próximo frame de animação
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: lastMouseX,
          y: lastMouseY,
        });
        isThrottled = false;
      });
    };

    // Funções simplificadas sem useCallback
    const mouseDown = () => setCursorVariant("clicked");
    const mouseUp = () => setCursorVariant("default");
    
    // Otimizado para verificar apenas uma vez, sem acessar classList em cada movimentação
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      // Verificação simplificada para melhor performance
      if (tagName === "a" || tagName === "button" || target.classList.contains("clickable")) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    // Todos os event listeners com passive: true para melhor performance
    window.addEventListener("mousemove", mouseMove, { passive: true });
    window.addEventListener("mousedown", mouseDown, { passive: true });
    window.addEventListener("mouseup", mouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      // Limpeza adequada dos event listeners e cancelamento do rAF
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "transparent",
      border: "2px solid white",
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "white",
      mixBlendMode: "difference" as "difference",
    },
    clicked: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "white",
      mixBlendMode: "difference" as "difference",
    },
  };

  // Otimizado para usar um objeto pré-memoizado de variantes
  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-50 pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={{ duration: 0, ease: "linear" }}
    />
  );
}

// Exporta com memo para evitar re-renders desnecessários
export default memo(CustomCursor);
