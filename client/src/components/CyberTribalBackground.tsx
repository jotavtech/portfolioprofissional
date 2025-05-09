import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CyberTribalBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [gridOpacity, setGridOpacity] = useState(0.1);
  const [patternRotation, setPatternRotation] = useState(0);
  const [patternScale, setPatternScale] = useState(1);
  
  // Effect para monitorar o scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current) return;
      
      // Calcula a posição de scroll em relação ao documento inteiro
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      
      // Calcula o progresso de scroll (0 a 1)
      const scrollPercentage = scrollY / (docHeight - winHeight);
      setScrollProgress(scrollPercentage);
      
      // Altera opacidade do grid baseado no scroll
      const newOpacity = 0.05 + (scrollPercentage * 0.2);
      setGridOpacity(Math.min(0.3, newOpacity));
      
      // Altera rotação do padrão baseado no scroll
      setPatternRotation(scrollY * 0.05 % 360);
      
      // Altera escala do padrão com efeito de pulsação suave
      const pulseEffect = Math.sin(scrollY * 0.005) * 0.2 + 1;
      setPatternScale(pulseEffect);
    };
    
    // Throttling para melhorar performance
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
    
    // Inicializa
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);
  
  return (
    <div ref={backgroundRef} className="cyber-tribal-background">
      {/* Grid de fundo cyberpunk */}
      <div 
        className="cyber-grid"
        style={{
          opacity: gridOpacity,
          backgroundSize: `${50 + scrollProgress * 100}px ${50 + scrollProgress * 100}px`
        }}
      ></div>
      
      {/* Padrões tribais que giram */}
      <motion.div 
        className="tribal-patterns"
        style={{
          opacity: 0.2 + scrollProgress * 0.3,
          rotate: patternRotation,
          scale: patternScale
        }}
      >
        {/* Círculo tribal central */}
        <svg 
          className="tribal-circle" 
          width="100%" 
          height="100%" 
          viewBox="0 0 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="250" r="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="10 5" />
          <circle cx="250" cy="250" r="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="250" cy="250" r="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="20 10" />
          <circle cx="250" cy="250" r="50" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          
          {/* Linhas radiantes */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line 
              key={i}
              x1="250" 
              y1="250" 
              x2={250 + 200 * Math.cos(i * Math.PI / 6)} 
              y2={250 + 200 * Math.sin(i * Math.PI / 6)} 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="1" 
              strokeDasharray="5 5"
            />
          ))}
          
          {/* Símbolos tribais */}
          <path d="M250 50L270 80L250 110L230 80L250 50Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M250 390L270 420L250 450L230 420L250 390Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M50 250L80 270L110 250L80 230L50 250Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M390 250L420 270L450 250L420 230L390 250Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        </svg>
      </motion.div>
      
      {/* Fluxo de linhas que se move com o scroll */}
      <div
        className="cyber-flow"
        style={{
          opacity: 0.1 + scrollProgress * 0.2,
          backgroundPositionY: `${scrollProgress * 1000}px`
        }}
      ></div>
      
      {/* Linhas de escaneamento horizontal */}
      <div className="scan-lines"></div>
      
      {/* Overlay de gradiente para dar profundidade */}
      <div 
        className="depth-overlay"
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 20}% ${50 - scrollProgress * 20}%, transparent 0%, rgba(0,0,0,0.8) 80%)`
        }}
      ></div>
    </div>
  );
}