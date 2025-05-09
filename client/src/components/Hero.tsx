import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import RecordPlayer from "./RecordPlayer";
import { scrollToSection } from "@/lib/utils";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

export default function Hero() {
  const { isPlaying, togglePlay } = useContext(MusicPlayerContext);
  const magneticTextRef = useRef<HTMLHeadingElement>(null);
  const magneticTextElementsRef = useRef<HTMLSpanElement[]>([]);

  // Create magnetic text effect for the title
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
    
    // Handle mouse movement for the magnetic effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = magneticTextContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      magneticTextElementsRef.current.forEach((charSpan, index) => {
        const charRect = charSpan.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;
        
        // Calculate distance from mouse to this character
        const distanceX = clientX - charCenterX;
        const distanceY = clientY - charCenterY;
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
          charSpan.style.transition = 'transform 0.1s, text-shadow 0.1s';
        } else {
          // Reset the transform if the mouse is too far
          charSpan.style.transform = '';
          charSpan.style.textShadow = '';
          charSpan.style.transition = 'transform 0.5s, text-shadow 0.5s';
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
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
          className="font-pixel text-center md:text-right text-3xl md:text-4xl lg:text-6xl mt-4 text-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          JOÃO VITOR
        </motion.h1>
        
        <motion.p 
          className="font-retro text-center md:text-right text-xl mt-2 animate-glitch"
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
          className="bg-black bg-opacity-80 p-6 border border-white/20 max-w-md mx-auto md:ml-8 shadow-glow"
          whileHover={{ 
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.15), 0 0 60px rgba(255, 255, 255, 0.1)" 
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
          
          <h2 className="font-retro text-2xl mb-4 animate-glitch">RESUMO</h2>
          
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
              className="clickable bg-white text-black font-pixel py-2 px-6 text-center border-2 border-white hover:bg-black hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTATO
            </motion.button>
            <motion.a 
              href="/api/download-cv" 
              download
              className="clickable bg-transparent text-white font-pixel py-2 px-6 text-center border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
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
