import { Link } from 'wouter';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function UniverseButton() {
  const [showLightning, setShowLightning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Efeito de raio aleatório automático
  useEffect(() => {
    const triggerLightning = () => {
      setShowLightning(true);
      setTimeout(() => {
        setShowLightning(false);
      }, 500);
    };
    
    // Dispara raio a cada 7-15 segundos
    const interval = setInterval(() => {
      if (!isHovering) {
        triggerLightning();
      }
    }, Math.random() * 8000 + 7000);
    
    return () => clearInterval(interval);
  }, [isHovering]);
  
  // Efeito sonoro ao passar mouse
  const playHoverSound = () => {
    const audio = new Audio('/electric-zap.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio error:', e));
    setIsHovering(true);
    setShowLightning(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) {
        setShowLightning(false);
      }
    }, 500);
  };
  
  // Efeito de vibração ao hover
  const buttonVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -1, 1, -1, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 0.2
        }
      }
    }
  };
  
  return (
    <Link to="/universo">
      <motion.button 
        ref={buttonRef}
        className="universo-button"
        aria-label="Ir para o universo rock n' roll"
        onMouseEnter={playHoverSound}
        onMouseLeave={handleMouseLeave}
        variants={buttonVariants}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        {showLightning && (
          <>
            <div className="lightning" style={{ left: "-20px" }} />
            <div className="lightning" style={{ left: "35px" }} />
          </>
        )}
        UNIVERSO
      </motion.button>
    </Link>
  );
}

export default UniverseButton;