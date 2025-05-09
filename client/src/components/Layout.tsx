import { ReactNode, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import CustomCursor from "./ui/custom-cursor";
import { motion, useScroll, useTransform } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<{id: number, x: number}[]>([]);
  const trailIdRef = useRef(0);
  
  // Transformação baseada no scroll para o movimento horizontal do carro
  const carX = useTransform(scrollYProgress, [0, 1], ["-15%", "110%"]);
  
  // Transformação para a rotação das rodas baseado no scroll
  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  
  // Cria efeito de rastro do carro quando há movimento de scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeout: NodeJS.Timeout;
    let frameId: number;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Só cria rastros quando há movimento significativo
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        const carElement = document.querySelector('.car-element') as HTMLElement;
        if (carElement) {
          const carRect = carElement.getBoundingClientRect();
          const newX = carRect.left + carRect.width / 2;
          
          // Adiciona um novo rastro
          setTrails(prevTrails => {
            const newTrail = { id: trailIdRef.current++, x: newX };
            return [...prevTrails, newTrail].slice(-10); // Mantém apenas os 10 últimos
          });
          
          // Remove rastros após um tempo
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            setTrails([]);
          }, 2000);
        }
      }
      
      lastScrollY = currentScrollY;
      frameId = requestAnimationFrame(handleScroll);
    };
    
    frameId = requestAnimationFrame(handleScroll);
    
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout);
    };
  }, []);

  // Create the scanline effect
  useEffect(() => {
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.body.appendChild(scanline);

    return () => {
      document.body.removeChild(scanline);
    };
  }, []);

  // Create the noise texture overlay
  useEffect(() => {
    const noiseTexture = document.createElement('div');
    noiseTexture.className = 'fixed inset-0 bg-repeat opacity-5 pointer-events-none z-10 animate-noise';
    noiseTexture.style.backgroundImage = "url('data:image/png;base64,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')";
    document.body.appendChild(noiseTexture);

    return () => {
      document.body.removeChild(noiseTexture);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-mono relative" ref={containerRef}>
      <CustomCursor />
      <Navbar />
      
      {/* Efeitos de rastro do carro */}
      {trails.map(trail => (
        <div
          key={trail.id}
          className="car-trail fixed bottom-12 z-40 pointer-events-none"
          style={{ left: trail.x + 'px' }}
        />
      ))}
      
      {/* Carro esportivo que se move com o scroll */}
      <motion.div 
        className="fixed bottom-8 z-50 pointer-events-none car-element"
        style={{ x: carX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Ferrari F40 simplificada em SVG */}
        <svg width="200" height="80" viewBox="0 0 200 80" className="transform scale-150">
          {/* Body principal */}
          <path 
            d="M20,50 L30,50 L40,35 L120,35 L150,50 L170,50 L175,45 L175,40 L165,30 L140,25 L100,25 L80,20 L50,20 L30,35 L20,40 Z" 
            fill="#FF2800" 
            stroke="black" 
            strokeWidth="1"
          />
          
          {/* Teto */}
          <path 
            d="M60,35 L80,22 L120,22 L130,35 Z" 
            fill="#FF2800" 
            stroke="black" 
            strokeWidth="1"
          />
          
          {/* Janela */}
          <path 
            d="M65,33 L82,23 L118,23 L125,33 Z" 
            fill="#111111" 
            stroke="black" 
            strokeWidth="0.5"
          />
          
          {/* Detalhes */}
          <path d="M150,50 L155,45 L170,50" stroke="black" strokeWidth="0.5" fill="none"/>
          <path d="M30,50 L40,37" stroke="black" strokeWidth="0.5" fill="none"/>
          <rect x="125" y="40" width="20" height="5" fill="#111111" />
          <rect x="40" y="40" width="15" height="5" fill="#111111" />
          
          {/* Faróis */}
          <rect x="25" y="40" width="10" height="3" fill="#FFFF00" rx="1" />
          <rect x="165" y="40" width="8" height="3" fill="#FF0000" rx="1" />
          
          {/* Rodas */}
          <g>
            <motion.g 
              style={{ transformOrigin: "50px 58px", rotate: wheelRotation }}
            >
              {/* Roda frontal */}
              <circle cx="50" cy="58" r="12" fill="#111111" stroke="black" strokeWidth="1" />
              <circle cx="50" cy="58" r="8" fill="#333333" stroke="black" strokeWidth="0.5" />
              <circle cx="50" cy="58" r="3" fill="#777777" />
              
              {/* Detalhes da roda frontal */}
              <path d="M50,50 L50,66" stroke="#DDD" strokeWidth="1" />
              <path d="M42,58 L58,58" stroke="#DDD" strokeWidth="1" />
              <path d="M45,53 L55,63" stroke="#DDD" strokeWidth="1" />
              <path d="M45,63 L55,53" stroke="#DDD" strokeWidth="1" />
            </motion.g>
            
            <motion.g 
              style={{ transformOrigin: "140px 58px", rotate: wheelRotation }}
            >
              {/* Roda traseira */}
              <circle cx="140" cy="58" r="12" fill="#111111" stroke="black" strokeWidth="1" />
              <circle cx="140" cy="58" r="8" fill="#333333" stroke="black" strokeWidth="0.5" />
              <circle cx="140" cy="58" r="3" fill="#777777" />
              
              {/* Detalhes da roda traseira */}
              <path d="M140,50 L140,66" stroke="#DDD" strokeWidth="1" />
              <path d="M132,58 L148,58" stroke="#DDD" strokeWidth="1" />
              <path d="M135,53 L145,63" stroke="#DDD" strokeWidth="1" />
              <path d="M135,63 L145,53" stroke="#DDD" strokeWidth="1" />
            </motion.g>
          </g>
        </svg>
      </motion.div>
      
      <main className="flex-grow">
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
}
