import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import CyberTribalElements from './CyberTribalElements';
import CyberTribalBackground from './CyberTribalBackground';

export default function ScrollAnimatedDecorations() {
  // Estado para controlar a animação baseada no scroll
  const [scrollY, setScrollY] = useState(0);
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const decorRef = useRef<HTMLDivElement>(null);
  
  // Configuração dos símbolos tribais que aparecem ao rolar
  const tribalSymbols = useMemo(() => [
    {
      id: 'symbol1',
      path: 'M10 10L40 40M40 10L10 40M25 5L25 45M5 25L45 25',
      threshold: 200 // aparece quando scroll >= 200px
    },
    {
      id: 'symbol2',
      path: 'M25 5L45 25L25 45L5 25Z',
      threshold: 500
    },
    {
      id: 'symbol3',
      path: 'M5 5h40v40h-40z',
      threshold: 800
    },
    {
      id: 'symbol4',
      path: 'M25 5C38 5 45 12 45 25C45 38 38 45 25 45C12 45 5 38 5 25C5 12 12 5 25 5Z',
      threshold: 1200
    },
    {
      id: 'symbol5',
      path: 'M5 25C5 15 15 5 25 5C35 5 45 15 45 25C45 35 35 45 25 45C15 45 5 35 5 25ZM15 25C15 20 20 15 25 15C30 15 35 20 35 25C35 30 30 35 25 35C20 35 15 30 15 25Z',
      threshold: 1600
    }
  ], []);
  
  // Gerenciar o scroll
  useEffect(() => {
    // Função otimizada para gerenciar o scroll com throttling
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determina quais símbolos tribais devem estar ativos com base no scroll
      const active = tribalSymbols
        .filter(symbol => window.scrollY >= symbol.threshold)
        .map(symbol => symbol.id);
      
      setActiveSections(active);
    };
    
    // Throttling para melhor performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // inicializa
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [tribalSymbols]);
  
  // Calcula propriedades dinâmicas baseadas no scroll
  const dynamicProps = {
    opacityBase: Math.min(1, scrollY / 500), // Aumenta opacidade conforme rola
    rotationSpeed: Math.min(2, scrollY / 1000), // Velocidade de rotação aumenta com scroll
    scale: 1 + Math.min(0.5, scrollY / 2000), // Escala aumenta levemente
  };
  
  return (
    <>
      {/* Fundo cibertribal que reage ao scroll */}
      <CyberTribalBackground />
      
      {/* Elementos tribais dispersos pela página */}
      <CyberTribalElements />
      
      {/* Símbolos tribais que aparecem baseados na posição do scroll */}
      <div ref={decorRef} className="scroll-triggered-decorations">
        {tribalSymbols.map((symbol) => (
          <motion.div 
            key={symbol.id}
            className="tribal-symbol-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: activeSections.includes(symbol.id) ? 0.8 : 0,
              scale: activeSections.includes(symbol.id) ? 1 : 0.5,
              rotate: activeSections.includes(symbol.id) ? 
                [0, 10, -10, 5, -5, 0].map(r => r * dynamicProps.rotationSpeed) : 0
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.5 },
              rotate: { 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            style={{
              position: 'fixed',
              left: `${(parseInt(symbol.id.replace('symbol', '')) - 1) * 20 + 5}%`,
              top: `${symbol.threshold / 10}px`,
              width: 50,
              height: 50,
              zIndex: 0
            }}
          >
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 50 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="tribal-symbol"
            >
              <path d={symbol.path} stroke="white" strokeWidth="2" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Linha vertical que progride com o scroll */}
      <motion.div 
        className="scroll-progress-line"
        style={{
          position: 'fixed',
          left: '20px',
          top: '0',
          width: '2px',
          height: `${Math.min(100, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), rgba(255, 0, 204, 0.5))',
          zIndex: 10,
          opacity: Math.min(0.8, scrollY / 300)
        }}
      />
      
      {/* Linha vertical que progride com o scroll no lado direito */}
      <motion.div 
        className="scroll-progress-line-right"
        style={{
          position: 'fixed',
          right: '20px',
          top: '0',
          width: '2px',
          height: `${Math.min(100, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), rgba(0, 204, 255, 0.5))',
          zIndex: 10,
          opacity: Math.min(0.8, scrollY / 300)
        }}
      />
      
      {/* Símbolos tribais nas laterais */}
      <div className="side-tribal-markers">
        {[100, 300, 600, 900, 1200, 1500].map((position, index) => (
          <motion.div
            key={`marker-${index}`}
            className="tribal-side-marker"
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: scrollY > position ? 0.7 : 0,
              x: scrollY > position ? 0 : -50,
              rotate: scrollY > position ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              rotate: { 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }}
            style={{
              position: 'fixed',
              left: '10px',
              top: `${100 + (index * 100)}px`,
              width: '20px',
              height: '20px',
              zIndex: 10
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="white" strokeWidth="1" />
            </svg>
          </motion.div>
        ))}
        
        {[200, 500, 800, 1100, 1400, 1700].map((position, index) => (
          <motion.div
            key={`marker-right-${index}`}
            className="tribal-side-marker-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: scrollY > position ? 0.7 : 0,
              x: scrollY > position ? 0 : 50,
              rotate: scrollY > position ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              rotate: { 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }}
            style={{
              position: 'fixed',
              right: '10px',
              top: `${150 + (index * 100)}px`,
              width: '20px',
              height: '20px',
              zIndex: 10
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="16" height="16" stroke="white" strokeWidth="1" />
            </svg>
          </motion.div>
        ))}
      </div>
    </>
  );
}