import { useEffect, useState, memo } from "react";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(24);
  const [isHovering, setIsHovering] = useState(false);

  // Otimizar tratamento de eventos com throttling
  useEffect(() => {
    // Limitador de taxa para melhorar desempenho
    let lastUpdateTime = 0;
    const throttleInterval = 16; // ~60fps
    
    // Simplifica a detecção de movimento do mouse
    const mouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleInterval) return;
      
      lastUpdateTime = now;
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Detectar apenas elementos clicáveis
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.classList.contains("clickable");
      
      if (isClickable && !isHovering) {
        setIsHovering(true);
        setCursorSize(32);
      } else if (!isClickable && isHovering) {
        setIsHovering(false);
        setCursorSize(24);
      }
    };

    // Listener único para movimento do mouse
    window.addEventListener("mousemove", mouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering]);

  // Renderiza um cursor estático em vez de usar motion
  const cursorStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: cursorSize,
    width: cursorSize,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${mousePosition.x - cursorSize/2}px, ${mousePosition.y - cursorSize/2}px)`,
    border: isHovering ? 'none' : '2px solid white',
    backgroundColor: isHovering ? 'white' : 'transparent',
    mixBlendMode: isHovering ? 'difference' : 'normal',
    transition: 'height 0.2s, width 0.2s, background-color 0.2s',
  } as React.CSSProperties;

  return <div style={cursorStyle} />;
}

// Exporta com memo para evitar re-renders desnecessários
export default memo(CustomCursor);
