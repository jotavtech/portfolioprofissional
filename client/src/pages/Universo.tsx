import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function Universo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Criar elemento de áudio para reproduzir rock
    const audio = new Audio('/rock.mp3');
    audio.loop = true;
    audioRef.current = audio;
    
    // Tentar iniciar o áudio automaticamente (pode ser bloqueado pelos navegadores)
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play foi bloqueado
        setIsPlaying(false);
      });
    }
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);
  
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
          
          <button 
            onClick={toggleAudio}
            className="audio-toggle"
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          >
            {isPlaying ? 'Pausar Rock' : 'Tocar Rock'}
          </button>
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