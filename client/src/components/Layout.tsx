import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import CustomCursor from "./ui/custom-cursor";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
