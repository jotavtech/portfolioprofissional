import { Link } from 'wouter';
import React, { useState, useEffect } from 'react';

export function UniverseButton() {
  const [showLightning, setShowLightning] = useState(false);
  
  // Efeito de raio aleatório
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLightning(true);
      setTimeout(() => {
        setShowLightning(false);
      }, 500);
    }, Math.random() * 10000 + 5000); // Entre 5 e 15 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Link to="/universo">
      <button 
        className="universo-button"
        aria-label="Ir para o universo rock n' roll"
      >
        {showLightning && (
          <>
            <div className="lightning" style={{ left: "-20px" }} />
            <div className="lightning" style={{ left: "35px" }} />
          </>
        )}
        Universo
      </button>
    </Link>
  );
}

export default UniverseButton;