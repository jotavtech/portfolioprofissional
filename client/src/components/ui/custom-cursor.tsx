import { useEffect, useRef, memo } from "react";

/**
 * Custom cursor ultra-otimizado para performance
 * - Manipula o DOM diretamente sem passar pelo React para evitar re-renders
 * - Limita atualização de posição via RAF para reduzir carga da CPU
 * - Usa delegação de eventos para detectar elementos clicáveis
 * - Condicional para dispositivos que suportam hover
 */
function CustomCursor() {
  // Referência para o elemento cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  // Referência para verificar se está sobre item clicável
  const isHoveringRef = useRef(false);
  // Referência para o tamanho atual do cursor
  const sizeRef = useRef(24);
  // Armazena se está com requisição de animação pendente
  const rafPendingRef = useRef(false);
  
  useEffect(() => {
    // Verifica se o dispositivo suporta hover (não é touch)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover || !cursorRef.current) return;
    
    // Obtém elemento cursor diretamente
    const cursor = cursorRef.current;
    
    // Inicializa cursor fora da tela
    cursor.style.opacity = "0";
    
    // Posição anterior para evitar atualizações desnecessárias
    let prevX = 0;
    let prevY = 0;
    
    // Super throttling - só atualiza posição via requestAnimationFrame
    const updateCursorPosition = (clientX: number, clientY: number) => {
      // Evita múltiplas chamadas de RAF
      if (rafPendingRef.current) return;
      
      rafPendingRef.current = true;
      
      requestAnimationFrame(() => {
        // Distância de movimento necessária para atualizar (reduz updates)
        const moveThreshold = 2;
        const deltaX = Math.abs(clientX - prevX);
        const deltaY = Math.abs(clientY - prevY);
        
        // Só atualiza se houver movimento significativo
        if (deltaX > moveThreshold || deltaY > moveThreshold) {
          // Manipula o DOM diretamente sem setState
          cursor.style.transform = `translate(${clientX - sizeRef.current/2}px, ${clientY - sizeRef.current/2}px)`;
          cursor.style.opacity = "1";
          
          prevX = clientX;
          prevY = clientY;
        }
        
        rafPendingRef.current = false;
      });
    };
    
    // Delegação de eventos - um único listener para todos elementos
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.classList.contains("clickable");
      
      // Verifica mudança de estado para evitar atualizações desnecessárias
      if (isClickable !== isHoveringRef.current) {
        isHoveringRef.current = isClickable;
        
        // Atualiza tamanho e aparência
        sizeRef.current = isClickable ? 32 : 24;
        
        // Manipula DOM diretamente sem setState
        cursor.style.width = `${sizeRef.current}px`;
        cursor.style.height = `${sizeRef.current}px`;
        cursor.style.border = isClickable ? 'none' : '2px solid white';
        cursor.style.backgroundColor = isClickable ? 'white' : 'transparent';
        cursor.style.mixBlendMode = isClickable ? 'difference' : 'normal';
      }
    };
    
    // Movimento de mouse com alta performance
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };
    
    // Esconde cursor quando sair da janela
    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };
    
    // Adiciona eventos com passive para melhor performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  // Estilos iniciais apenas - atualizações feitas via JS direto
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '24px',
        width: '24px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        border: '2px solid white',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s, opacity 0.2s',
      }}
    />
  );
}

// Memo para evitar re-renders desnecessários
export default memo(CustomCursor);
