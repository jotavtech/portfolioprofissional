import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import CustomCursor from "./ui/custom-cursor";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
    <div className="min-h-screen flex flex-col bg-black text-white font-mono">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
}
