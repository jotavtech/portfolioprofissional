import { useEffect, useState, useRef, memo } from 'react';

// Componente memoizado para evitar re-renders desnecessários
const PorscheCar = memo(function PorscheCar() {
  const [position, setPosition] = useState(-150);
  const [direction, setDirection] = useState('forward');
  const [speed, setSpeed] = useState(0);
  const [speedLines, setSpeedLines] = useState<{id: number, left: number, width: number, top: number}[]>([]);
  const lastScrollY = useRef(0);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  
  // Criar linhas de velocidade de forma otimizada
  useEffect(() => {
    if (speed > 3) {
      // Adiciona linhas apenas quando a velocidade é significativa
      const linesCount = Math.min(5, Math.floor(speed / 3));
      
      // Reduz a frequência de atualizações para performance
      if (linesCount > 0 && Math.random() > 0.5) {
        const newLines: {id: number, left: number, width: number, top: number}[] = [];
        
        for (let i = 0; i < linesCount; i++) {
          newLines.push({
            id: Date.now() + i,
            left: Math.random() * 100, // Posição horizontal aleatória (%)
            width: Math.random() * 100 + 50, // Largura aleatória
            top: Math.random() * 25 // Posição vertical aleatória
          });
        }
        
        setSpeedLines(prev => [...prev, ...newLines].slice(-10)); // Limita a 10 linhas
      }
    }
  }, [speed > 3 ? Math.floor(speed) : 0]); // Dependência simplificada
  
  useEffect(() => {
    // Variável para controlar o throttling do evento de scroll
    let isThrottled = false;
    let lastTimeScrolled = 0;
    
    // Função para atualizar a posição do carro com base no scroll (com throttle)
    const handleScroll = () => {
      const now = Date.now();
      
      // Aplicar throttle (limitar execuções) para melhorar performance
      if (isThrottled && now - lastTimeScrolled < 16) { // ~60fps (1000ms/60 ≈ 16ms)
        return;
      }
      
      isThrottled = true;
      lastTimeScrolled = now;
      
      // Libera throttle no próximo frame
      requestAnimationFrame(() => {
        isThrottled = false;
      });
      
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calcular velocidade baseada na diferença de scroll
      const newSpeed = Math.min(10, scrollDiff * 0.2);
      setSpeed(newSpeed);
      
      // Determina a direção do scroll (para cima ou para baixo)
      if (currentScrollY > lastScrollY.current) {
        // Rolando para baixo - carro se move para frente
        setDirection('forward');
        setPosition(prev => {
          // Calcula nova posição com base no scroll (mais scroll = mais movimento)
          return Math.min(
            window.innerWidth - 150, // Limita ao tamanho da tela - largura do carro
            prev + scrollDiff * 0.8 // Velocidade de movimento
          );
        });
      } else if (currentScrollY < lastScrollY.current) {
        // Rolando para cima - carro dá ré
        setDirection('backward');
        setPosition(prev => {
          // Move o carro para trás quando rola para cima
          return Math.max(
            -150, // Não deixa o carro sair totalmente para fora da tela
            prev - scrollDiff * 0.8 // Velocidade de ré
          );
        });
      } else {
        // Sem movimento - reduz velocidade gradualmente
        setSpeed(prev => Math.max(0, prev - 0.5));
      }
      
      // Atualiza o último valor de scroll conhecido
      lastScrollY.current = currentScrollY;
    };
    
    // Efeito de diminuição de velocidade quando parado (intervalo mais longo)
    const slowDownInterval = setInterval(() => {
      if (!document.hidden) {
        setSpeed(prev => {
          if (prev > 0.1) return prev * 0.95;
          return 0;
        });
      }
    }, 200); // Intervalo maior para menos atualizações
    
    // Registra o event listener para o scroll com passive true para performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpa o event listener e o intervalo quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(slowDownInterval);
    };
  }, []);
  
  return (
    <>
      <img 
        src="/assets/porsche.png" 
        alt="Porsche Car"
        className={`porsche-car ${direction === 'forward' ? 'moving-forward' : 'moving-backward'}`}
        style={{ 
          left: `${position}px`,
          transform: `${direction === 'forward' ? 'scaleX(1)' : 'scaleX(-1)'} ${speed > 2 ? `translateY(${Math.sin(Date.now() * 0.01) * 2}px)` : ''}`,
          filter: `drop-shadow(0 0 ${Math.min(15, speed * 1.5)}px rgba(255, ${100 - speed * 5}, 50, 0.${5 + Math.floor(speed * 0.3)}))`
        }}
      />
      
      {/* Linhas de velocidade */}
      <div className="speed-lines" ref={speedLinesRef}>
        {speed > 2 && speedLines.map(line => (
          <div 
            key={line.id}
            className="speed-line"
            style={{
              left: `${line.left}%`,
              width: `${line.width}px`,
              bottom: `${line.top}px`,
              opacity: Math.min(0.8, speed * 0.08),
              animation: `speedLines ${0.8 - speed * 0.05}s linear infinite`
            }}
          />
        ))}
      </div>
    </>
  );
});

// Exporta o componente memoizado
export default PorscheCar;