import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

interface RecordPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function RecordPlayer({ isPlaying, togglePlay }: RecordPlayerProps) {
  const { currentSong, previousSong } = useContext(MusicPlayerContext);
  const [isChangingDisc, setIsChangingDisc] = useState(false);
  const [currentDiscDesign, setCurrentDiscDesign] = useState(0);
  
  // Record sleeve designs - different patterns for different songs
  const discDesigns = [
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
  ];

  // Detect song changes and trigger disc swap animation
  useEffect(() => {
    if (previousSong !== null && previousSong !== currentSong) {
      setIsChangingDisc(true);
      setTimeout(() => {
        setCurrentDiscDesign(currentSong);
        setIsChangingDisc(false);
      }, 750);
    }
  }, [currentSong, previousSong]);

  return (
    <div className="relative mb-8 w-72 h-72 md:w-96 md:h-96 clickable perspective-container" onClick={togglePlay}>
      {/* Record player base */}
      <div className="absolute inset-0 bg-gray-900 rounded-lg border border-white/30 shadow-glow transform rotate-1 -z-10"></div>
      
      <AnimatePresence>
        <motion.div
          key={isChangingDisc ? 'changing' : 'static'}
          className={`vinyl-record rounded-full border-4 border-white w-[90%] h-[90%] relative mx-auto mt-4 overflow-hidden ${isChangingDisc ? 'disc-swap' : ''}`}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            repeat: isPlaying ? Infinity : 0, 
            duration: 12, 
            ease: "linear" 
          }}
        >
          {/* Main Record Body */}
          <div className={`absolute inset-0 ${discDesigns[currentDiscDesign].mainColor}`}></div>
          
          <motion.div
            className="vinyl-arm absolute top-[10%] right-[20%] w-24 h-1 bg-white shadow-glow"
            style={{ 
              originX: 1, 
              originY: 0.5 
            }}
            animate={{ 
              rotate: isPlaying ? 25 : 10 
            }}
            transition={{ 
              duration: 0.5 
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
          
          {/* Vinyl grooves with reflective effect */}
          <div className="absolute top-1/2 left-1/2 w-[90%] h-[90%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[50%] h-[50%] rounded-full border border-white/10 -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Light reflection effect */}
          <div className="absolute top-[10%] left-[20%] w-[20%] h-[30%] bg-white/10 rounded-full blur-md transform rotate-45"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Player controls */}
      <div className="absolute bottom-2 right-8 flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <div className="w-5 h-1 bg-white/70 self-center"></div>
      </div>
    </div>
  );
}
