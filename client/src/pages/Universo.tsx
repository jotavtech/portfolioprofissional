import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Universo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Adicionando mais estados para melhorar a experiência da página
  const [showGuitarEffect, setShowGuitarEffect] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  useEffect(() => {
    // Criar elemento de áudio para reproduzir rock
    const audio = new Audio('/rock.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;
    
    // Devido às políticas dos navegadores, o áudio só pode ser reproduzido após interação do usuário
    // Por isso temos o botão de tocar explícito
    
    // Animação de guitarra a cada 10 segundos
    const guitarInterval = setInterval(() => {
      if (isPlaying) {
        setShowGuitarEffect(true);
        setTimeout(() => setShowGuitarEffect(false), 2000);
      }
    }, 10000);
    
    // Detecta primeiro clique na página para permitir áudio
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        document.removeEventListener('click', handleUserInteraction);
      }
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      clearInterval(guitarInterval);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [isPlaying, hasUserInteracted]);
  
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="rock-universe min-h-screen bg-black text-white relative">
      {/* Fundo estilo rock dos anos 90 */}
      <div className="rock-background absolute inset-0 z-0"></div>
      
      {/* Animação de guitarra que aparece ocasionalmente */}
      <AnimatePresence>
        {showGuitarEffect && (
          <motion.div 
            className="guitar-effect" 
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
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
            animate={isPlaying ? { 
              boxShadow: ["0 0 10px #f00", "0 0 20px #f00", "0 0 10px #f00"]
            } : {}}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          >
            {isPlaying ? 'Pausar Rock 🤘' : 'Tocar Rock 🎸'}
          </motion.button>
        </header>
        
        <main>
          <motion.h1 
            className="text-6xl font-bold metal-text mb-8 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            UNIVERSO ROCK
          </motion.h1>
          
          <div className="flame-divider mb-12"></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="rock-card">
              <h2 className="rock-title">SOBRE</h2>
              <p>
                Bem-vindo ao Universo Rock, uma experiência alternativa do meu portfolio 
                inspirada na estética rebelde do rock dos anos 90. Aqui você encontra projetos
                com uma abordagem mais pesada e artística.
              </p>
            </div>
            
            <div className="rock-card">
              <h2 className="rock-title">PROJETOS</h2>
              <ul className="rock-projects">
                <li>Metal Madness - Design de UI para banda de heavy metal</li>
                <li>Riff Master - App de ensino de guitarra</li>
                <li>Crowd Surf - Plataforma para bandas independentes</li>
              </ul>
            </div>
          </motion.div>
          
          <div className="mt-16">
            <motion.h2 
              className="text-4xl font-bold metal-text mb-8 text-center"
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
              <div className="rock-image-card">Rock Project 1</div>
              <div className="rock-image-card">Rock Project 2</div>
              <div className="rock-image-card">Rock Project 3</div>
              <div className="rock-image-card">Rock Project 4</div>
              <div className="rock-image-card">Rock Project 5</div>
              <div className="rock-image-card">Rock Project 6</div>
            </motion.div>
          </div>
        </main>
        
        <footer className="mt-20 text-center pb-10">
          <div className="flame-divider mb-6"></div>
          <p className="metal-text text-sm">© 2025 UNIVERSO ROCK - TODOS OS DIREITOS RESERVADOS</p>
        </footer>
      </div>
    </div>
  );
}