import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Universo() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Ajustar tipo para corresponder à nossa implementação com Web Audio API
  interface AudioControl {
    play: () => void;
    pause: () => void;
  }
  
  const audioRef = useRef<AudioControl | null>(null);
  
  // Adicionando mais estados para melhorar a experiência da página
  const [showGuitarEffect, setShowGuitarEffect] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  useEffect(() => {
    // Usando Web Audio API para criar um som de rock sintético
    // ao invés de depender de arquivo MP3 real
    let audioContext: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;
    
    // Função para criar um som de "guitarra" sintético
    const setupSyntheticRockSound = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.gain.value = 0.3; // Volume mais baixo para não incomodar
        gainNode.connect(audioContext.destination);
        
        // Oscilador para o som de "guitarra"
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 110; // Frequência de nota A2 (grave)
        
        // Aplicar distorção para soar mais como rock
        const distortion = audioContext.createWaveShaper();
        
        // Função pré-definida fora do escopo da função principal para evitar erros de strict mode
        const makeDistortionCurve = (amount: number): Float32Array => {
          const k = amount;
          const samples = 44100;
          const curve = new Float32Array(samples);
          const deg = Math.PI / 180;
          
          for (let i = 0; i < samples; ++i) {
            const x = (i * 2) / samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
          }
          return curve;
        };
        
        distortion.curve = makeDistortionCurve(400);
        distortion.oversample = '4x';
        
        oscillator.connect(distortion);
        distortion.connect(gainNode);
        
        // Preparar para tocar quando solicitado
        oscillator.start();
        
        // Inicialmente sem volume
        gainNode.gain.value = 0;
        
        audioRef.current = {
          play: () => {
            if (gainNode) {
              // Aumento gradual do volume
              gainNode.gain.setValueAtTime(0, audioContext!.currentTime);
              gainNode.gain.linearRampToValueAtTime(0.3, audioContext!.currentTime + 0.5);
            }
          },
          pause: () => {
            if (gainNode) {
              // Diminuição gradual do volume
              gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext!.currentTime);
              gainNode.gain.linearRampToValueAtTime(0, audioContext!.currentTime + 0.5);
            }
          }
        };
      } catch (error) {
        console.error('Erro ao criar áudio sintético:', error);
      }
    };
    
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
        setupSyntheticRockSound();
        document.removeEventListener('click', handleUserInteraction);
      }
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    // Iniciar a configuração se for a primeira vez
    if (!audioRef.current) {
      setupSyntheticRockSound();
    }
    
    return () => {
      if (oscillator) {
        oscillator.stop();
      }
      if (audioContext) {
        audioContext.close();
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
          <Link to="/">
            <motion.h1 
              className="text-6xl font-bold metal-text mb-8 text-center cursor-pointer universe-return"
              data-text="JOTAVERSO"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0 0 15px #fff, 0 0 25px #f00, 0 0 35px #f00" 
              }}
              title="Voltar para o portfolio original"
              onClick={() => {
                // Parar a música ao voltar
                if (audioRef.current && isPlaying) {
                  audioRef.current.pause();
                }
              }}
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
                Audio Wave
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
                Digital Audio
              </div>
            </motion.div>
          </div>
        </main>
        
        <footer className="mt-20 text-center pb-10">
          <div className="flame-divider mb-6"></div>
          <p className="metal-text text-sm" data-text="© 2025 UNIVERSO ROCK - TODOS OS DIREITOS RESERVADOS">© 2025 UNIVERSO ROCK - TODOS OS DIREITOS RESERVADOS</p>
        </footer>
      </div>
    </div>
  );
}