import { Link, useLocation } from 'wouter';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * COMPONENTE JOTAVERSO - TEMPORARIAMENTE COMENTADO
 * Este componente está sendo guardado para implementação futura.
 * Para reativar basta remover os comentários desta função e 
 * importá-la normalmente onde for necessário.
 */

// Versão comentada que preserva o código para implementação futura
/*
export function UniverseButton() {
  const [showLightning, setShowLightning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Efeito de raio foi removido para otimização (mantido apenas no hover)
  // Não usamos mais o intervalo para poupar recursos
  
  // Efeito visual simplificado ao passar o mouse (sem áudio para otimização)
  const playHoverSound = () => {
    // Removido efeito de áudio para melhorar performance
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
  
  // Efeito visual simplificado (sem áudio)
  const handlePortalEffect = () => {
    if (!isUniversePage) {
      setShowPortal(true);
      
      // Esconder o portal após um tempo reduzido
      setTimeout(() => {
        setShowPortal(false);
      }, 500); // Reduzido para melhorar performance
    }
  };
  
  // Verificar se estamos na página jotaverso para alternar o destino do botão
  const [location] = useLocation();
  const isUniversePage = location === '/jotaverso' || location === '/universo';
  
  return (
    <>
      {showPortal && <div className="portal" />}
      <Link to={isUniversePage ? '/' : '/jotaverso'}>
        <motion.button 
          ref={buttonRef}
          className="universo-button"
          aria-label={isUniversePage ? "Voltar ao portfolio original" : "Ir para o Jotaverso"}
          onMouseEnter={playHoverSound}
          onMouseLeave={handleMouseLeave}
          onClick={handlePortalEffect}
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
          JOTAVERSO
        </motion.button>
      </Link>
    </>
  );
}
*/

// Placeholder para evitar erros de importação
export function UniverseButton() {
  return null;
}

export default UniverseButton;