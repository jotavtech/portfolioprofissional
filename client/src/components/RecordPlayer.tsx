import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RecordPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function RecordPlayer({ isPlaying, togglePlay }: RecordPlayerProps) {
  return (
    <div className="relative mb-8 w-64 h-64 md:w-80 md:h-80 clickable" onClick={togglePlay}>
      <motion.div
        className="vinyl-record rounded-full bg-black border-4 border-white w-full h-full relative"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ 
          repeat: isPlaying ? Infinity : 0, 
          duration: 10, 
          ease: "linear" 
        }}
      >
        <motion.div
          className="vinyl-arm absolute top-[20%] right-[30%] w-20 h-0.5 bg-white"
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
        />
        
        {/* Vinyl center */}
        <div className="absolute top-1/2 left-1/2 w-[20%] h-[20%] bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-1/2 w-[5%] h-[5%] bg-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
        
        {/* Vinyl grooves */}
        <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[40%] h-[40%] rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
    </div>
  );
}
