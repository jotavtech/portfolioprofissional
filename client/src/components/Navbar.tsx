import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ZapIcon } from 'lucide-react';
import { scrollToSection } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isSticky ? 'bg-black/90 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          {/* Easter egg: Logo snake game trigger */}
          <span 
            className="font-pixel text-sm md:text-base animate-glitch relative group cursor-pointer"
            onClick={(e) => {
              const clicks = parseInt(e.currentTarget.getAttribute('data-clicks') || '0') + 1;
              if (clicks >= 10) {
                alert('🐍 Snake Game desbloqueado! Clique para jogar. Implmentação em breve.');
                e.currentTarget.setAttribute('data-clicks', '0');
              } else {
                e.currentTarget.setAttribute('data-clicks', clicks.toString());
              }
            }}
          >
            JVC.MARTINSS
            <motion.span 
              className="absolute -right-5 top-0 opacity-0 group-hover:opacity-100"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ZapIcon size={14} className="text-white/70" />
            </motion.span>
          </span>
        </motion.div>

        <div className="hidden md:flex space-x-8">
          <motion.button 
            onClick={() => handleNavClick("home")} 
            className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable relative"
            whileHover={{ y: -2 }}
          >
            INÍCIO
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
          
          <motion.button 
            onClick={() => handleNavClick("about")} 
            className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable relative"
            whileHover={{ y: -2 }}
          >
            SOBRE
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
          
          <motion.button 
            onClick={() => handleNavClick("skills")} 
            className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable relative"
            whileHover={{ y: -2 }}
          >
            HABILIDADES
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
          
          <motion.button 
            onClick={() => handleNavClick("projects")} 
            className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable relative"
            whileHover={{ y: -2 }}
          >
            PROJETOS
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
          
          <motion.button 
            onClick={() => handleNavClick("contact")} 
            className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable relative"
            whileHover={{ y: -2 }}
          >
            CONTATO
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        <div className="md:hidden">
          <button className="text-white clickable" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div 
              className="container mx-auto px-4 py-3 flex flex-col space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.05 }}
            >
              <motion.button 
                onClick={() => handleNavClick("home")} 
                className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ x: 5 }}
              >
                INÍCIO
              </motion.button>
              <motion.button 
                onClick={() => handleNavClick("about")} 
                className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                whileHover={{ x: 5 }}
              >
                SOBRE
              </motion.button>
              <motion.button 
                onClick={() => handleNavClick("skills")} 
                className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                whileHover={{ x: 5 }}
              >
                HABILIDADES
              </motion.button>
              <motion.button 
                onClick={() => handleNavClick("projects")} 
                className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                whileHover={{ x: 5 }}
              >
                PROJETOS
              </motion.button>
              <motion.button 
                onClick={() => handleNavClick("contact")} 
                className="nav-link font-retro text-lg hover:text-gray-300 py-2 text-left clickable"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                CONTATO
              </motion.button>
              
              {/* Easter egg hidden mini-game trigger */}
              <motion.div 
                className="mt-6 p-2 border border-dashed border-white/10 text-center cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                whileHover={{ opacity: 1, borderColor: "rgba(255, 255, 255, 0.3)" }}
                onClick={(e) => {
                  const clicks = parseInt(e.currentTarget.getAttribute('data-clicks') || '0') + 1;
                  if (clicks >= 5) {
                    alert('🎮 Tetris desbloqueado! Implementação em breve.');
                    e.currentTarget.setAttribute('data-clicks', '0');
                  } else {
                    e.currentTarget.setAttribute('data-clicks', clicks.toString());
                  }
                }}
              >
                <span className="font-pixel text-xs text-white/50">・・・</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
