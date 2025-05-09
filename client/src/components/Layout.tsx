import { ReactNode, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import CustomCursor from "./ui/custom-cursor";
import { UniverseButton } from "./UniverseButton";
import PorscheCar from "./PorscheCar";
import ScrollAnimatedDecorations from "./ScrollAnimatedDecorations";

/**
 * Layout principal otimizado
 * - Removido efeitos de scanline e noise texture para melhorar performance
 * - Removido imports não utilizados
 * - Removido motion import desnecessário
 */
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Removidos efeitos de scanline e noise texture para melhorar performance
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-mono relative" ref={containerRef}>
      <CustomCursor />
      <Navbar />
      
      {/* Botão Universo - fixo na página */}
      <UniverseButton />
      
      {/* Carro Porsche que se move com scroll */}
      <PorscheCar />
      
      {/* Elementos cibertribais animados com scroll */}
      <ScrollAnimatedDecorations />
      
      <main className="flex-grow">
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
}