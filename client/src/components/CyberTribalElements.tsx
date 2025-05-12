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
  
  // Versão simplificada: inicializa todos os elementos de uma vez, mas em quantidade reduzida
  useEffect(() => {
    // Cria um número fixo de elementos tribais e geométricos distribuídos pelo documento
    const createFixedElements = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        3000 // Altura mínima para garantir elementos suficientes
      );
      
      const totalElements = 8; // Número fixo e reduzido de elementos
      const initialElements = [];
      
      for (let i = 0; i < totalElements; i++) {
        // Distribuição mais uniforme ao longo do documento
        const verticalPosition = (i / totalElements) * docHeight;
        
        // Mais elementos geométricos (mais leves) que tribais
        const type = Math.random() > 0.7 ? 'tribal' : 'geometric';
        const subType = Math.floor(Math.random() * 5);
        
        initialElements.push({
          id: i,
          type: `${type}-${subType}`,
          x: Math.random() * 100, // Posição horizontal aleatória
          y: verticalPosition + (Math.random() * 200 - 100), // Variação em torno da posição uniforme
          rotation: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.6, // Escalas menores
          opacity: 0.2 + Math.random() * 0.3, // Menos opaco
          visible: false
        });
      }
      
      setElements(initialElements);
    };
    
    // Cria elementos uma única vez ao carregar
    createFixedElements();
    
    // Não precisamos mais de evento de scroll para criar elementos
  }, []);
  
  // Versão super simplificada para atualizar elementos com base no scroll
  useEffect(() => {
    // Variáveis para throttling
    let ticking = false;
    
    const updateElementsVisibility = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Janela de visibilidade ampliada para melhor experiência
      const viewMin = currentScrollY - 1000;
      const viewMax = currentScrollY + 1500;
      
      // Atualiza somente elementos que precisam mudar (melhor performance)
      setElements(prevElements => 
        prevElements.map(element => {
          // Posição simplificada e normalizada
          const elementYPosition = element.y;
          
          // Verifica se está na janela de visibilidade
          const isInViewRange = elementYPosition >= viewMin && elementYPosition <= viewMax;
          
          // Se não estiver no range de visibilidade, retorna com visibilidade desativada
          if (!isInViewRange) {
            if (!element.visible) return element; // Não mudou, reutiliza
            return { ...element, visible: false, opacity: 0 };
          }
          
          // Cálculo de distância simplificado
          const distanceFromCenter = Math.abs(currentScrollY + window.innerHeight/2 - elementYPosition);
          const viewFactor = 1 - Math.min(1, distanceFromCenter / 1000);
          
          // Opacidade baseada na distância do centro da tela
          const newOpacity = Math.max(0.15, viewFactor * 0.5);
          
          // Efeito parallax simples
          const parallaxOffset = currentScrollY * 0.1;
          
          // Deslocamento baseado no tipo
          const newY = element.type.includes('geometric')
            ? elementYPosition + (parallaxOffset * 0.05)
            : elementYPosition - (parallaxOffset * 0.02);
          
          // Rotação suave
          const newRotation = element.rotation + (currentScrollY % 10) * 0.1;
          
          // Mudança significativa ou mantém estado atual
          const hasChanged = 
            element.visible !== true || 
            Math.abs(element.opacity - newOpacity) > 0.05 ||
            Math.abs(element.y - newY) > 5;
          
          // Só atualiza se houver mudança significativa
          return hasChanged 
            ? {
                ...element,
                visible: true,
                opacity: newOpacity,
                y: newY,
                rotation: newRotation
              }
            : element;
        })
      );
      
      ticking = false;
    };
    
    // Função throttle para o evento de scroll
    const handleScroll = () => {
      if (!ticking) {
        // Usa requestAnimationFrame para otimizar e sincronizar com o refresh da tela
        window.requestAnimationFrame(() => {
          updateElementsVisibility();
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Adiciona evento com passive para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Inicializa visibilidade após carregamento
    setTimeout(updateElementsVisibility, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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