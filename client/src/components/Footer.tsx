import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-black py-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-retro text-sm md:text-base">&copy; {new Date().getFullYear()} JOÃO VITOR. ALL RIGHTS RESERVED.</p>
          
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => scrollToSection("home")}
              className="font-pixel text-sm clickable"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
