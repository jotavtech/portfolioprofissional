import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from 'lucide-react';
import { scrollToSection } from "@/lib/utils";

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
        <div className="flex items-center">
          <span className="font-pixel text-sm md:text-base animate-glitch">JVC.MARTINSS</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <button onClick={() => handleNavClick("home")} className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable">HOME</button>
          <button onClick={() => handleNavClick("about")} className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable">ABOUT</button>
          <button onClick={() => handleNavClick("projects")} className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable">PROJECTS</button>
          <button onClick={() => handleNavClick("contact")} className="nav-link font-retro text-lg hover:text-gray-300 transition-colors duration-300 clickable">CONTACT</button>
        </div>

        <div className="md:hidden">
          <button className="text-white clickable" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-black border-t border-white/10 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <button onClick={() => handleNavClick("home")} className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable">HOME</button>
          <button onClick={() => handleNavClick("about")} className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable">ABOUT</button>
          <button onClick={() => handleNavClick("projects")} className="nav-link font-retro text-lg hover:text-gray-300 py-2 border-b border-white/10 text-left clickable">PROJECTS</button>
          <button onClick={() => handleNavClick("contact")} className="nav-link font-retro text-lg hover:text-gray-300 py-2 text-left clickable">CONTACT</button>
        </div>
      </div>
    </nav>
  );
}
