import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Universo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuitarEffect, setShowGuitarEffect] = useState(false);
  
  // Versão simplificada sem audio real para melhorar performance
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    
    // Mostrar efeito da guitarra uma vez quando tocar
    if (!isPlaying) {
      setShowGuitarEffect(true);
      setTimeout(() => setShowGuitarEffect(false), 2000);
    }
  };
  
  return (
    <div className="rock-universe min-h-screen bg-black text-white relative">
      {/* Fundo simplificado */}
      <div className="rock-background absolute inset-0 z-0"></div>
      
      {/* Animação de guitarra otimizada */}
      <AnimatePresence>
        {showGuitarEffect && (
          <div className="guitar-effect">
            <svg width="150" height="400" viewBox="0 0 150 400" className="guitar-svg">
              <path d="M70,20 L80,20 L85,100 L90,120 L90,300 L75,350 L65,350 L50,300 L50,120 L55,100 L60,20 Z" fill="#600" />
              <rect x="55" y="320" width="30" height="60" rx="5" fill="#300" />
              <rect x="60" y="100" width="20" height="200" fill="#900" />
              <rect x="55" y="70" width="30" height="30" rx="2" fill="#111" />
              <rect x="60" y="30" width="20" height="40" fill="#333" />
              <circle cx="70" cy="335" r="15" fill="#111" />
              <line x1="70" y1="320" x2="70" y2="350" stroke="#fff" strokeWidth="1" />
              <line x1="55" y1="335" x2="85" y2="335" stroke="#fff" strokeWidth="1" />
            </svg>
          </div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="mb-12 flex justify-between items-center">
          <Link to="/">
            <motion.button 
              className="back-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Voltar
            </motion.button>
          </Link>
          
          <motion.button 
            onClick={toggleAudio}
            className="audio-toggle"
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isPlaying ? { opacity: [0.8, 1, 0.8] } : {}}
            transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
          >
            {isPlaying ? 'Pausar Rock 🤘' : 'Tocar Rock 🎸'}
          </motion.button>
        </header>
        
        <main>
          <Link to="/">
            {/* Título simplificado para melhor performance */}
            <h1 
              className="text-6xl font-bold metal-text mb-8 text-center cursor-pointer universe-return hover:scale-105 transition-transform duration-300"
              data-text="JOTAVERSO"
              title="Voltar para o portfolio original"
            >
              JOTAVERSO
            </h1>
          </Link>
          
          <div className="flame-divider mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
            <div className="rock-card">
              <h2 className="rock-title" data-content="SOBRE">SOBRE</h2>
              <p>
                Bem-vindo ao Jotaverso, uma experiência alternativa do meu portfolio 
                inspirada na estética futurista do GTA VI. Aqui você encontra projetos
                com uma abordagem mais moderna e interativa.
              </p>
            </div>
            
            <div className="rock-card">
              <h2 className="rock-title" data-content="PROJETOS">PROJETOS</h2>
              <ul className="rock-projects">
                <li>Neon Dreams - Design de UI futurista com efeitos neon</li>
                <li>Digital Wave - Desenvolvimento de websites interativos</li>
                <li>Cyber Portal - Plataforma com interfaces modernas</li>
                <li>GTA Inspired - Website com inspiração visual em jogos</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            {/* Título otimizado sem Framer Motion */}
            <h2 
              className="text-4xl font-bold metal-text mb-8 text-center animate-fade-in"
              data-text="GALERIA"
            >
              GALERIA
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {/* Cards de imagem com efeito de clique otimizado */}
              {[
                "Neon Dreams", 
                "Digital Wave", 
                "Cyber Portal", 
                "GTA Inspired", 
                "Neon City", 
                "Vice City UI"
              ].map((title, index) => (
                <div 
                  key={index} 
                  className="rock-image-card" 
                  onClick={(e) => {
                    // Efeito de clique otimizado com menor frequência
                    if (window.innerWidth > 768) { // Só aplica em telas grandes
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      const span = document.createElement('span');
                      span.style.left = x + 'px';
                      span.style.top = y + 'px';
                      e.currentTarget.appendChild(span);
                      
                      setTimeout(() => {
                        span.remove();
                      }, 700);
                    }
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <footer className="mt-20 pb-16">
          <div className="flame-divider mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 animate-fade-in">
            <div className="neon-footer-box">
              <h3 className="text-xl font-bold mb-4 neon-text pink-shadow">Contato</h3>
              <ul className="space-y-2">
                <li className="hover:text-pink-400 transition-colors">
                  <span className="mr-2">📱</span> 83 999290376
                </li>
                <li className="hover:text-pink-400 transition-colors">
                  <span className="mr-2">📧</span> martinsjoao1227@gmail.com
                </li>
              </ul>
            </div>
            
            <div className="neon-footer-box">
              <h3 className="text-xl font-bold mb-4 neon-text blue-shadow">Redes Sociais</h3>
              {/* Ícones de redes sociais gerados dinamicamente */}
              <div className="flex space-x-4 justify-center">
                {[
                  {
                    id: 'facebook',
                    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  },
                  {
                    id: 'instagram',
                    path: "M8 3a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5H8zm9 2.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                  },
                  {
                    id: 'linkedin',
                    path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                  }
                ].map((icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="social-icon hover:scale-110 transition-transform"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                      <path d={icon.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="neon-footer-box">
              <h3 className="text-xl font-bold mb-4 neon-text yellow-shadow">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-yellow-400 transition-colors">Portfolio Principal</Link>
                </li>
                <li>
                  <a href="/api/download-cv" className="hover:text-yellow-400 transition-colors">Baixar CV</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid-background h-20 relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 grid-overlay"></div>
            <h2 
              className="text-2xl font-bold relative z-10 neon-text"
            >
              JOTAVERSO
            </h2>
          </div>
          
          <div className="text-center animate-fade-in">
            <p className="metal-text text-sm mb-3" data-text="© 2025 JOTAVERSO - TODOS OS DIREITOS RESERVADOS">
              © 2025 JOTAVERSO - TODOS OS DIREITOS RESERVADOS
            </p>
            <p className="text-xs opacity-70">
              Inspirado na estética neon do GTA VI e cultura cybertribal
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}