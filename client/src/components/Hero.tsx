import { useState, useEffect, useRef, useContext, memo, useCallback } from "react";
import { motion } from "framer-motion";
import RecordPlayer from "./RecordPlayer";
import { scrollToSection } from "@/lib/utils";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

function Hero() {
  const { isPlaying, togglePlay } = useContext(MusicPlayerContext);
  const magneticTextRef = useRef<HTMLHeadingElement>(null);
  const magneticTextElementsRef = useRef<HTMLSpanElement[]>([]);

  // Create magnetic text effect for the title - otimizado
  useEffect(() => {
    if (!magneticTextRef.current) return;
    
    const text = "JOÃO\nVITOR";
    const magneticTextContainer = magneticTextRef.current;
    
    // Clear existing content
    magneticTextContainer.innerHTML = '';
    
    // Split the text into individual characters with spans, handling newlines
    text.split('\n').forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        magneticTextContainer.appendChild(document.createElement('br'));
      }
      
      line.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'magnetic-text inline-block';
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        magneticTextContainer.appendChild(charSpan);
        magneticTextElementsRef.current.push(charSpan);
      });
    });
    
    // Otimização: Criar uma throttle para limitar o número de chamadas de mousemove
    let lastExecution = 0;
    let isThrottled = false;
    let rafId: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;
    
    // Handle mouse movement for the magnetic effect - função normal sem useCallback
    const handleMouseMove = (e: MouseEvent) => {
      // Guarda a posição do mouse para uso no rAF
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      
      if (isThrottled) return;
      
      isThrottled = true;
      
      // Agenda o processamento para o próximo frame de animação
      rafId = requestAnimationFrame(() => {
        const now = Date.now();
        // Limita a execução a cada 16ms (aproximadamente 60fps)
        if (now - lastExecution >= 16) {
          // Executa a lógica apenas para caracteres próximos para poupar processamento
          const rect = magneticTextContainer.getBoundingClientRect();
          
          // Calcular distância do mouse ao centro do texto
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distToCenter = Math.sqrt(
            Math.pow(lastClientX - centerX, 2) + 
            Math.pow(lastClientY - centerY, 2)
          );
          
          // Só processa se o mouse estiver relativamente próximo do texto
          if (distToCenter < 300) {
            const relevantSpans = magneticTextElementsRef.current.filter(span => {
              const spanRect = span.getBoundingClientRect();
              const spanCenterX = spanRect.left + spanRect.width / 2;
              const spanCenterY = spanRect.top + spanRect.height / 2;
              const dist = Math.sqrt(
                Math.pow(lastClientX - spanCenterX, 2) + 
                Math.pow(lastClientY - spanCenterY, 2)
              );
              return dist < 250; // Processa apenas os spans próximos
            });
            
            relevantSpans.forEach(charSpan => {
              const charRect = charSpan.getBoundingClientRect();
              const charCenterX = charRect.left + charRect.width / 2;
              const charCenterY = charRect.top + charRect.height / 2;
              
              // Calculate distance from mouse to this character
              const distanceX = lastClientX - charCenterX;
              const distanceY = lastClientY - charCenterY;
              const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
              
              // Only affect characters within a certain radius
              const radius = 200;
              if (distance < radius) {
                // Calculate the effect strength based on distance (closer = stronger)
                const strength = (radius - distance) / radius;
                
                // Calculate the movement amount
                const moveX = distanceX * strength * 0.2;
                const moveY = distanceY * strength * 0.2;
                
                // Apply the transform
                charSpan.style.transform = `translate(${moveX}px, ${moveY}px)`;
                charSpan.style.textShadow = `0 0 ${5 * strength}px rgba(255, 255, 255, ${0.8 * strength})`;
              } else {
                // Reset the transform if the mouse is too far
                charSpan.style.transform = '';
                charSpan.style.textShadow = '';
              }
            });
          }
          
          lastExecution = now;
        }
        
        isThrottled = false;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 page-section">
      <motion.div 
        className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center md:items-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <RecordPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
        
        <motion.h1 
          ref={magneticTextRef}
          className="font-pixel text-center md:text-right text-3xl md:text-4xl lg:text-6xl mt-4 metal-text"
          data-text="JOÃO VITOR"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          JOÃO VITOR
        </motion.h1>
        
        <motion.p 
          className="font-retro text-center md:text-right text-xl mt-2 metal-text"
          data-text="DESIGNER GRÁFICO + DESENVOLVEDOR"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          DESIGNER GRÁFICO + DESENVOLVEDOR
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="w-full md:w-1/2 p-6 flex flex-col justify-center cyber-tribal bg-opacity-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="rock-card max-w-md mx-auto md:ml-8"
          whileHover={{ 
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 45, 85, 0.4)"
          }}
        >
          <div className="flex space-x-4 mb-6">
            <motion.div 
              className="w-3 h-3 rounded-full bg-white"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 500 }}
            ></motion.div>
            <motion.div 
              className="w-3 h-3 rounded-full bg-white"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 500 }}
            ></motion.div>
            <motion.div 
              className="w-3 h-3 rounded-full bg-white"
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 500 }}
            ></motion.div>
          </div>
          
          <h2 className="font-retro text-2xl mb-4 metal-text" data-text="RESUMO">RESUMO</h2>
          
          <motion.p 
            className="font-mono text-sm mb-4"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            Me chamo João Vitor, tenho 19 anos, possuo experiência com ferramentas como Figma, Canva, Kittl e GIMP. 
            Além disso estou cursando Sistemas para Internet, 3º periodo, possuo trabalhos freelance em React, HTML,
            CSS e JavaScript, e trabalhos da faculdade em Java.
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <motion.button 
              onClick={() => scrollToSection("contact")}
              className="clickable back-button"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              CONTATO
            </motion.button>
            <motion.a 
              href="/api/download-cv" 
              download
              className="clickable audio-toggle"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              BAIXAR CV
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Exporta componente com memo para evitar re-renders desnecessários
export default memo(Hero);
