import { Link, useLocation } from 'wouter';
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
  
  // Efeito sonoro ao passar mouse usando Web Audio API em vez de arquivo MP3
  const playHoverSound = () => {
    try {
      // Criar contexto de áudio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1; // Volume baixo
      gainNode.connect(audioContext.destination);
      
      // Criar oscilador para som de "zap elétrico"
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
      
      // Conectar e iniciar
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio effect error:', e);
    }
    
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
  
  // Verificar se estamos na página universo para alternar o destino do botão
  const [location] = useLocation();
  const isUniversePage = location === '/universo';
  
  return (
    <Link to={isUniversePage ? '/' : '/universo'}>
      <motion.button 
        ref={buttonRef}
        className="universo-button"
        aria-label={isUniversePage ? "Voltar ao portfolio original" : "Ir para o universo rock n' roll"}
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