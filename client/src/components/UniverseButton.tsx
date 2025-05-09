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
  
  // Efeito sonoro ao passar mouse usando Web Audio API - estilo GTA VI
  const playHoverSound = () => {
    try {
      // Criar contexto de áudio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1; // Volume baixo
      gainNode.connect(audioContext.destination);
      
      // Criar oscilador principal com som futurista estilo GTA VI
      const oscillator1 = audioContext.createOscillator();
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.3);
      
      // Segundo oscilador para efeito mais rico
      const oscillator2 = audioContext.createOscillator();
      oscillator2.type = 'triangle';
      oscillator2.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.3);
      
      // Efeito de distorção para som mais digital
      const distortion = audioContext.createWaveShaper();
      
      // Criar a curva de distorção externamente para evitar error de strict mode
      const makeDistortionCurve = (amount: number): Float32Array => {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < n_samples; ++i) {
          const x = i * 2 / n_samples - 1;
          curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
      };
      
      distortion.curve = makeDistortionCurve(400);
      distortion.oversample = '4x';
      
      // Aplicar filtro passa-baixa para suavizar
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      
      // Conectar tudo
      oscillator1.connect(distortion);
      oscillator2.connect(distortion);
      distortion.connect(filter);
      filter.connect(gainNode);
      
      // Iniciar e parar os osciladores
      oscillator1.start();
      oscillator2.start();
      oscillator1.stop(audioContext.currentTime + 0.3);
      oscillator2.stop(audioContext.currentTime + 0.3);
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