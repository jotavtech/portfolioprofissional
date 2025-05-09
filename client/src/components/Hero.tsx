import { useState } from "react";
import { motion } from "framer-motion";
import RecordPlayer from "./RecordPlayer";
import { scrollToSection } from "@/lib/utils";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

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
          className="font-pixel text-center md:text-right text-3xl md:text-4xl lg:text-6xl mt-4 animate-glitch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          JOÃO VITOR
        </motion.h1>
        
        <motion.p 
          className="font-retro text-center md:text-right text-lg mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          GRAPHIC DESIGNER + DEVELOPER
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="w-full md:w-1/2 p-6 flex flex-col justify-center cyber-tribal bg-opacity-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-black bg-opacity-80 p-6 border border-white/20 max-w-md mx-auto md:ml-8">
          <div className="flex space-x-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          
          <h2 className="font-retro text-xl mb-4 animate-glitch">RESUMO</h2>
          
          <p className="font-mono text-sm mb-4">
            Me chamo João Vitor, tenho 19 anos, possuo experiência com ferramentas como Figma, Canva, Kittl e GIMP. 
            Além disso estou cursando Sistemas para Internet, 3º periodo, possuo trabalhos freelance em React, HTML,
            CSS e JavaScript, e trabalhos da faculdade em Java.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button 
              onClick={() => scrollToSection("contact")}
              className="clickable bg-white text-black font-pixel py-2 px-6 text-center border-2 border-white hover:bg-black hover:text-white transition-colors duration-300"
            >
              CONTACT
            </button>
            <a 
              href="/api/download-cv" 
              download
              className="clickable bg-transparent text-white font-pixel py-2 px-6 text-center border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
