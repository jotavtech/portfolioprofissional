import { useEffect, useState, useRef } from 'react';

export function PorscheCar() {
  const [position, setPosition] = useState(-150);
  const [direction, setDirection] = useState('forward');
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    // Função para atualizar a posição do carro com base no scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determina a direção do scroll (para cima ou para baixo)
      if (currentScrollY > lastScrollY.current) {
        // Rolando para baixo - carro se move para frente
        setDirection('forward');
        setPosition(prev => {
          // Calcula nova posição com base no scroll (mais scroll = mais movimento)
          const newPosition = Math.min(
            window.innerWidth - 150, // Limita ao tamanho da tela - largura do carro
            prev + (currentScrollY - lastScrollY.current) * 0.5 // Velocidade de movimento
          );
          return newPosition;
        });
      } else if (currentScrollY < lastScrollY.current) {
        // Rolando para cima - carro dá ré
        setDirection('backward');
        setPosition(prev => {
          // Move o carro para trás quando rola para cima
          const newPosition = Math.max(
            -150, // Não deixa o carro sair totalmente para fora da tela
            prev - (lastScrollY.current - currentScrollY) * 0.5 // Velocidade de ré
          );
          return newPosition;
        });
      }
      
      // Atualiza o último valor de scroll conhecido
      lastScrollY.current = currentScrollY;
    };
    
    // Registra o event listener para o scroll
    window.addEventListener('scroll', handleScroll);
    
    // Limpa o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <img 
      src="/assets/porsche.png" 
      alt="Porsche Car"
      className={`porsche-car ${direction === 'forward' ? 'moving-forward' : 'moving-backward'}`}
      style={{ 
        left: `${position}px`,
        transform: direction === 'forward' ? 'scaleX(1)' : 'scaleX(-1)'
      }}
    />
  );
}

export default PorscheCar;