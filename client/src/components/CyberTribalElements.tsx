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
  
  // Inicializa elementos tribais em posições aleatórias
  useEffect(() => {
    const initialElements = [];
    
    // Criar elementos tribais distribuídos pela página
    for (let i = 0; i < 15; i++) {
      const type = Math.random() > 0.5 ? 'tribal' : 'geometric';
      const subType = Math.floor(Math.random() * 5); // 5 variações de cada tipo
      
      initialElements.push({
        id: i,
        type: `${type}-${subType}`,
        x: Math.random() * 100, // % da largura da tela
        y: Math.random() * 300 + (i * 50), // % da altura da tela, distribuídos ao longo do scroll
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.5,
        visible: false
      });
    }
    
    setElements(initialElements);
  }, []);
  
  // Gerencia eventos de scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Atualiza os elementos com base na posição do scroll
      setElements(prevElements => 
        prevElements.map(element => {
          // Verifica se o elemento está visível com base na proximidade do scroll
          const elementScrollPosition = (element.y / 3); // Converte a posição Y em uma posição de scroll equivalente
          const distanceFromView = Math.abs(currentScrollY - elementScrollPosition);
          
          // O elemento será visível quando o scroll se aproximar da sua posição "ideal"
          const isVisible = distanceFromView < 800; // 800px de janela de visibilidade
          
          // Calcula a opacidade com base na proximidade do scroll
          let newOpacity = element.opacity;
          if (isVisible) {
            // Quanto mais próximo do "ponto ideal" de scroll, mais opaco
            newOpacity = Math.max(0.2, Math.min(0.9, element.opacity * (1 - distanceFromView / 1000)));
          } else {
            newOpacity = 0;
          }
          
          // Elementos de fundo movem-se em parallax inverso
          const parallaxOffset = currentScrollY * 0.05;
          const newY = element.type.includes('geometric') 
            ? (element.y + parallaxOffset * 0.2) % 3000 // Movimento lento para geométricos
            : (element.y - parallaxOffset * 0.1) % 3000; // Movimento contrário para tribais
          
          return {
            ...element,
            visible: isVisible,
            opacity: newOpacity,
            y: newY,
            rotation: element.rotation + (currentScrollY * 0.01) % 360 // Rotação lenta baseada no scroll
          };
        })
      );
    };
    
    // Throttling para melhorar a performance do scroll
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Inicializar
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);
  
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
              filter: element.type.includes('tribal') 
                ? `drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))`
                : 'none',
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