import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CyberTribalElements() {
  // Estados para controlar os elementos baseados no scroll
  const [scrollY, setScrollY] = useState(0);
  const [elements, setElements] = useState<{
    id: number;
    type: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
    visible: boolean;
  }[]>([]);
  
  // Referência para o container principal
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Inicializa elementos tribais sob demanda com base na posição de scroll
  useEffect(() => {
    // Função auxiliar para criar elementos apenas quando necessário
    const createElementsForPosition = (scrollPosition: number) => {
      const initialElements = [];
      const sectionHeight = 500; // Altura aproximada de cada "seção" virtual
      const maxSections = Math.ceil(document.body.scrollHeight / sectionHeight);
      
      // Número de seções a popular com base na posição atual do scroll
      const sectionsToPopulate = Math.min(
        3, // No máximo 3 seções para evitar sobrecarga
        Math.ceil((scrollPosition + window.innerHeight * 2) / sectionHeight)
      );
      
      // Limite o número total de elementos criados
      const maxElements = 8;
      const elementsPerSection = Math.floor(maxElements / sectionsToPopulate);
      
      for (let section = 0; section < sectionsToPopulate; section++) {
        const sectionOffset = section * sectionHeight;
        
        // Distribui os elementos dentro desta seção
        for (let i = 0; i < elementsPerSection; i++) {
          // Mais elementos geométricos (mais leves) que tribais
          const type = Math.random() > 0.7 ? 'tribal' : 'geometric';
          const subType = Math.floor(Math.random() * 5);
          
          initialElements.push({
            id: section * elementsPerSection + i,
            type: `${type}-${subType}`,
            x: Math.random() * 100,
            y: sectionOffset + Math.random() * sectionHeight, // Posicionado dentro da seção
            rotation: Math.random() * 360,
            scale: 0.4 + Math.random() * 0.6, // Escalas menores
            opacity: 0.2 + Math.random() * 0.3, // Menos opaco
            visible: false
          });
        }
      }
      
      setElements(initialElements);
    };
    
    // Criar elementos iniciais com base na posição atual da página
    createElementsForPosition(window.scrollY);
    
    // Atualiza os elementos quando houver scrolls significativos
    const handleScrollCreation = () => {
      // Se já temos elementos suficientes, não criamos mais
      if (elements.length >= 8) return;
      
      createElementsForPosition(window.scrollY);
    };
    
    // Adiciona evento com throttling agressivo
    window.addEventListener('scroll', handleScrollCreation, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollCreation);
    };
  }, [elements.length]);
  
  // Gerencia eventos de scroll - versão ultra otimizada
  useEffect(() => {
    // Última vez que processamos o scroll
    let lastProcessedScroll = 0;
    let scrollTimeout: any = null;
    
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      
      // Se processamos recentemente, não processar novamente (reduz drasticamente os cálculos)
      if (now - lastProcessedScroll < 150) { // Processamos no máximo a cada 150ms
        return;
      }
      
      lastProcessedScroll = now;
      setScrollY(currentScrollY);
      
      // Cria novo array em vez de fazer map para reduzir operações
      const newElements = [];
      
      // Otimizador: processa apenas elementos próximos a view atual (± 1200px)
      // Isso reduz significativamente o número de elementos processados
      const viewMin = currentScrollY - 1200;
      const viewMax = currentScrollY + 1200;
      
      for (const element of elements) {
        const elementScrollPosition = (element.y / 3);
        
        // Pula elementos fora da faixa de visibilidade
        if (elementScrollPosition < viewMin || elementScrollPosition > viewMax) {
          // Mantém o elemento como está, mas garantindo que não está visível
          newElements.push({...element, visible: false, opacity: 0});
          continue;
        }
        
        const distanceFromView = Math.abs(currentScrollY - elementScrollPosition);
        const isVisible = distanceFromView < 700; // Reduzida a janela de visibilidade
        
        // Cálculos simplificados para opacidade e movimentos
        let newOpacity = 0;
        if (isVisible) {
          // Cálculo simplificado de opacidade
          newOpacity = Math.max(0.1, 0.3 - (distanceFromView / 2000));
        }
        
        // Cálculo simplificado de parallax
        const parallaxOffset = Math.floor(currentScrollY / 20) * 20; // Suaviza mudanças, só muda a cada 20px
        const newY = element.type.includes('geometric')
          ? (element.y + parallaxOffset * 0.1) % 3000
          : (element.y - parallaxOffset * 0.05) % 3000;
        
        // Reduz a frequência de mudanças na rotação
        const rotation = element.rotation + Math.floor(parallaxOffset / 100);
        
        newElements.push({
          ...element,
          visible: isVisible,
          opacity: newOpacity,
          y: newY,
          rotation
        });
      }
      
      setElements(newElements);
    };
    
    // Super-throttling: usando debounce e throttle combinados
    const scrollListener = () => {
      // Limpa timeout anterior para implementar debounce
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Define novo timeout para assegurar que eventos muito frequentes serão processados eventualmente
      scrollTimeout = setTimeout(handleScroll, 100);
      
      // Executa imediatamente se o último processamento foi há mais tempo
      const now = Date.now();
      if (now - lastProcessedScroll > 150) {
        handleScroll();
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Inicializar - mas com um pequeno delay para evitar jank na renderização inicial
    setTimeout(handleScroll, 300);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [elements]);
  
  // Renderiza elementos tribais SVG
  const renderTribalElement = (type: string) => {
    const [mainType, subType] = type.split('-');
    
    if (mainType === 'tribal') {
      // Símbolos tribais
      switch (subType) {
        case '0':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="white" strokeWidth="2" />
              <path d="M50 20L80 50L50 80L20 50L50 20Z" stroke="white" strokeWidth="2" />
              <path d="M50 30L70 50L50 70L30 50L50 30Z" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
          );
        case '1':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L80 20L80 80L20 80L20 20Z" stroke="white" strokeWidth="2" />
              <path d="M35 35L65 35L65 65L35 65L35 35Z" stroke="white" strokeWidth="2" />
              <line x1="20" y1="50" x2="35" y2="50" stroke="white" strokeWidth="2" />
              <line x1="65" y1="50" x2="80" y2="50" stroke="white" strokeWidth="2" />
              <line x1="50" y1="20" x2="50" y2="35" stroke="white" strokeWidth="2" />
              <line x1="50" y1="65" x2="50" y2="80" stroke="white" strokeWidth="2" />
            </svg>
          );
        case '2':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" />
              <path d="M50 10L50 90" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
              <path d="M10 50L90 50" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
            </svg>
          );
        case '3':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50C10 27.9086 27.9086 10 50 10V10C72.0914 10 90 27.9086 90 50V50C90 72.0914 72.0914 90 50 90V90C27.9086 90 10 72.0914 10 50V50Z" stroke="white" strokeWidth="2" />
              <path d="M30 30L70 30L70 70L30 70L30 30Z" stroke="white" strokeWidth="2" />
              <circle cx="30" cy="30" r="5" fill="white" />
              <circle cx="70" cy="30" r="5" fill="white" />
              <circle cx="30" cy="70" r="5" fill="white" />
              <circle cx="70" cy="70" r="5" fill="white" />
            </svg>
          );
        case '4':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L65 30L50 50L35 30L50 10Z" stroke="white" strokeWidth="2" />
              <path d="M50 50L65 70L50 90L35 70L50 50Z" stroke="white" strokeWidth="2" />
              <path d="M10 50L30 65L50 50L30 35L10 50Z" stroke="white" strokeWidth="2" />
              <path d="M50 50L70 65L90 50L70 35L50 50Z" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
          );
        default:
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
            </svg>
          );
      }
    } else {
      // Elementos geométricos
      switch (subType) {
        case '0':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="60" height="60" stroke="white" strokeWidth="1" />
              <rect x="30" y="30" width="40" height="40" stroke="white" strokeWidth="1" />
              <rect x="40" y="40" width="20" height="20" stroke="white" strokeWidth="1" />
            </svg>
          );
        case '1':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="10" x2="90" y2="90" stroke="white" strokeWidth="1" />
              <line x1="10" y1="90" x2="90" y2="10" stroke="white" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          );
        case '2':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50C10 27.9086 27.9086 10 50 10V10V10C72.0914 10 90 27.9086 90 50V50V50C90 72.0914 72.0914 90 50 90V90V90C27.9086 90 10 72.0914 10 50V50V50Z" stroke="white" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" />
              <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
          );
        case '3':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="white" strokeWidth="1" />
              <path d="M25 25L75 25L75 75L25 75L25 25Z" stroke="white" strokeWidth="1" />
            </svg>
          );
        case '4':
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="20" x2="90" y2="20" stroke="white" strokeWidth="1" />
              <line x1="10" y1="40" x2="90" y2="40" stroke="white" strokeWidth="1" />
              <line x1="10" y1="60" x2="90" y2="60" stroke="white" strokeWidth="1" />
              <line x1="10" y1="80" x2="90" y2="80" stroke="white" strokeWidth="1" />
              <line x1="20" y1="10" x2="20" y2="90" stroke="white" strokeWidth="1" />
              <line x1="40" y1="10" x2="40" y2="90" stroke="white" strokeWidth="1" />
              <line x1="60" y1="10" x2="60" y2="90" stroke="white" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="90" stroke="white" strokeWidth="1" />
            </svg>
          );
        default:
          return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" />
            </svg>
          );
      }
    }
  };
  
  return (
    <div className="cyber-tribal-elements" ref={containerRef}>
      {elements.map(element => (
        element.visible && (
          <motion.div
            key={element.id}
            className={`tribal-element ${element.type.split('-')[0]}`}
            style={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}px`,
              width: element.type.includes('tribal') ? '80px' : '120px',
              height: element.type.includes('tribal') ? '80px' : '120px',
              opacity: element.opacity,
              zIndex: element.type.includes('tribal') ? 2 : 1,
              // Removido o efeito drop-shadow para melhorar performance
              pointerEvents: 'none'
            }}
            animate={{
              rotate: element.rotation,
              scale: element.scale,
              opacity: element.opacity
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            {renderTribalElement(element.type)}
          </motion.div>
        )
      ))}
    </div>
  );
}