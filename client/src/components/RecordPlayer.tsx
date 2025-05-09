import { useState, useEffect, useContext, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

interface RecordPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

function RecordPlayer({ isPlaying, togglePlay }: RecordPlayerProps) {
  const { currentSong, previousSong } = useContext(MusicPlayerContext);
  const [isChangingDisc, setIsChangingDisc] = useState(false);
  const [currentDiscDesign, setCurrentDiscDesign] = useState(0);
  
  // Record sleeve designs - memoizado para evitar recriação em cada render
  const discDesigns = useMemo(() => [
    {
      mainColor: "bg-gradient-to-r from-gray-900 to-black",
      accent: "bg-red-600",
      label: "RED HOT" 
    },
    {
      mainColor: "bg-gradient-to-r from-black to-gray-800",
      accent: "bg-blue-700", 
      label: "AUDIO" 
    },
    { 
      mainColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      accent: "bg-purple-700", 
      label: "SLAVE" 
    }
  ], []);

  // Detect song changes and trigger disc swap animation - versão ainda mais otimizada
  useEffect(() => {
    if (previousSong !== null && previousSong !== currentSong) {
      setIsChangingDisc(true);
      
      // Tempo reduzido para 500ms para corresponder à nova animação CSS mais rápida
      const timeoutId = setTimeout(() => {
        setCurrentDiscDesign(currentSong);
        setIsChangingDisc(false);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentSong, previousSong]);

  return (
    <div className="relative mb-8 w-72 h-72 md:w-96 md:h-96 clickable perspective-container" onClick={togglePlay}>
      {/* Record player base - versão otimizada */}
      <div className="absolute inset-0 bg-gray-900 rounded-lg border border-white/20 transform rotate-1 -z-10"></div>
      
      <AnimatePresence>
        <motion.div
          key={isChangingDisc ? 'changing' : 'static'}
          className={`vinyl-record rounded-full border-4 border-white w-[90%] h-[90%] relative mx-auto mt-4 overflow-hidden ${isChangingDisc ? 'disc-swap' : ''}`}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            repeat: isPlaying ? Infinity : 0, 
            duration: 12, 
            ease: "linear",
            // Usar GPU para melhorar performance de animação
            type: "tween"
          }}
        >
          {/* Main Record Body */}
          <div className={`absolute inset-0 ${discDesigns[currentDiscDesign].mainColor}`}></div>
          
          <motion.div
            className="vinyl-arm absolute top-[10%] right-[20%] w-24 h-1 bg-white"
            style={{ 
              originX: 1, 
              originY: 0.5,
              // Adicionar willChange para melhorar performance
              willChange: "transform"
            }}
            animate={{ 
              rotate: isPlaying ? 25 : 10 
            }}
            transition={{ 
              duration: 0.5,
              // Menos pontos intermediários para performance
              type: "tween"
            }}
          >
            <div className="absolute right-0 w-3 h-3 bg-white rounded-full -translate-y-1/2"></div>
            <div className="absolute right-0 w-1 h-6 bg-white translate-x-1 translate-y-1"></div>
          </motion.div>
          
          {/* Vinyl center label */}
          <div className={`absolute top-1/2 left-1/2 w-[40%] h-[40%] ${discDesigns[currentDiscDesign].accent} rounded-full -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center`}>
            <div className="text-white font-pixel text-xs text-center">
              {discDesigns[currentDiscDesign].label}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 w-[5%] h-[5%] bg-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border border-white/50"></div>
          
          {/* Vinyl grooves - reduzido para melhorar performance */}
          <div className="absolute top-1/2 left-1/2 w-[90%] h-[90%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Light reflection effect simplificado */}
          <div className="absolute top-[10%] left-[20%] w-[20%] h-[30%] bg-white/5 rounded-full transform rotate-45"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Player controls - simplificados */}
      <div className="absolute bottom-2 right-8 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-5 h-1 bg-white/50 self-center"></div>
      </div>
    </div>
  );
}

// Aplicando memo ao componente para evitar re-renders desnecessários
export default memo(RecordPlayer);