import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LazyLoad from "@/components/LazyLoad";

/**
 * Página principal com carregamento progressivo dos componentes
 * 
 * - Hero é carregado imediatamente (sem lazy)
 * - Os demais componentes são carregados conforme o scroll
 * - Cada seção tem uma animação e delay diferentes para criar efeito fluído
 */
export default function Home() {
  return (
    <>
      {/* Hero é carregado imediatamente */}
      <Hero />
      
      {/* About carrega quando está próximo de ser visível */}
      <LazyLoad animation="fade" rootMargin="0px 0px 300px 0px">
        <About />
      </LazyLoad>
      
      {/* Skills carrega com animação de deslizar para cima */}
      <LazyLoad animation="slideUp" delay={100} rootMargin="0px 0px 250px 0px">
        <Skills />
      </LazyLoad>
      
      {/* Projects carrega com animação de zoom */}
      <LazyLoad animation="zoom" delay={150} rootMargin="0px 0px 200px 0px">
        <Projects />
      </LazyLoad>
      
      {/* Contact carrega por último com fade-in */}
      <LazyLoad animation="fade" delay={200} rootMargin="0px 0px 150px 0px">
        <Contact />
      </LazyLoad>
    </>
  );
}
