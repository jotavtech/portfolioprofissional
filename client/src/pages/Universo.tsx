import { useState } from 'react';
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
            <motion.h1 
              className="text-6xl font-bold metal-text mb-8 text-center cursor-pointer universe-return"
              data-text="JOTAVERSO"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              title="Voltar para o portfolio original"
            >
              JOTAVERSO
            </motion.h1>
          </Link>
          
          <div className="flame-divider mb-12"></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
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
          </motion.div>
          
          <div className="mt-16">
            <motion.h2 
              className="text-4xl font-bold metal-text mb-8 text-center"
              data-text="GALERIA"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              GALERIA
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* Placeholders para imagens de projetos rock */}
              <div className="rock-image-card" onClick={(e) => {
                // Efeito de clique com ondas
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
              }}>
                Neon Dreams
              </div>
              <div className="rock-image-card" onClick={(e) => {
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
              }}>
                Digital Wave
              </div>
              <div className="rock-image-card" onClick={(e) => {
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
              }}>
                Cyber Portal
              </div>
              <div className="rock-image-card" onClick={(e) => {
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
              }}>
                GTA Inspired
              </div>
              <div className="rock-image-card" onClick={(e) => {
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
              }}>
                Neon City
              </div>
              <div className="rock-image-card" onClick={(e) => {
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
              }}>
                Vice City UI
              </div>
            </motion.div>
          </div>
        </main>
        
        <footer className="mt-20 pb-16">
          <div className="flame-divider mb-10"></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
              <div className="flex space-x-4 justify-center">
                <motion.a 
                  href="#" 
                  className="social-icon" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon" 
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-icon" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </motion.a>
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
          </motion.div>
          
          <div className="grid-background h-20 relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 grid-overlay"></div>
            <h2 
              className="text-2xl font-bold relative z-10 neon-text"
            >
              JOTAVERSO
            </h2>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="metal-text text-sm mb-3" data-text="© 2025 JOTAVERSO - TODOS OS DIREITOS RESERVADOS">
              © 2025 JOTAVERSO - TODOS OS DIREITOS RESERVADOS
            </p>
            <p className="text-xs opacity-70">
              Inspirado na estética neon do GTA VI e cultura cybertribal
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}