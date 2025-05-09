import { useEffect, useState, useRef, memo } from 'react';

// Componente memoizado para evitar re-renders desnecessários
const PorscheCar = memo(function PorscheCar() {
  const [position, setPosition] = useState(-150);
  const [direction, setDirection] = useState('forward');
  const [speed, setSpeed] = useState(0);
  const [speedLines, setSpeedLines] = useState<{id: number, left: number, width: number, top: number}[]>([]);
  const lastScrollY = useRef(0);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  
  // Linhas de velocidade super simplificadas
  useEffect(() => {
    if (speed > 5) { // Aumentamos ainda mais o limite para reduzir os efeitos
      // Gera linhas com muito menos frequência (apenas 20% das vezes)
      if (Math.random() > 0.8) {
        const newLine = {
          id: Date.now(),
          left: Math.random() * 100, // Posição horizontal aleatória (%)
          width: Math.random() * 60 + 20, // Largura ainda mais reduzida
          top: Math.random() * 10 // Posição vertical reduzida
        };
        
        // Manter apenas 3 linhas no máximo para economizar memória
        setSpeedLines(prev => [...prev, newLine].slice(-3));
      }
    }
  }, [speed > 5 ? Math.floor(speed / 3) : 0]); // Ainda menos atualizações
  
  useEffect(() => {
    // Variável para controlar o throttling do evento de scroll
    let isThrottled = false;
    let lastTimeScrolled = 0;
    
    // Função ultra otimizada para atualizar a posição do carro com base no scroll
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle super agressivo (apenas 15 frames por segundo - suficiente para efeito visual)
      if (isThrottled && now - lastTimeScrolled < 66) { // ~15fps (1000ms/15 ≈ 66ms)
        return;
      }
      
      isThrottled = true;
      lastTimeScrolled = now;
      
      setTimeout(() => {
        isThrottled = false;
      }, 66);
      
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Apenas processa diferenças mais significativas de scroll
      if (scrollDiff > 5) { // Aumentado o limiar para reduzir cálculos
        // Velocidade com cálculo simplificado
        const newSpeed = Math.min(8, scrollDiff * 0.1); // Reduzido o multiplicador
        
        // Batch de atualizações com um único setTimeout com delay zero para performance
        const isScrollingDown = currentScrollY > lastScrollY.current;
        
        // Usa setTimeout com delay zero para batchear atualizações
        setTimeout(() => {
          setSpeed(newSpeed);
          setDirection(isScrollingDown ? 'forward' : 'backward');
          setPosition(prev => {
            if (isScrollingDown) {
              return Math.min(window.innerWidth - 150, prev + scrollDiff * 0.5);
            } else {
              return Math.max(-150, prev - scrollDiff * 0.5);
            }
          });
        }, 0);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    // Efeito de diminuição de velocidade super otimizado
    const slowDownInterval = setInterval(() => {
      // Só atualiza se a velocidade for significativa e a página estiver visível
      if (!document.hidden && speed > 0.2) {
        // Redução mais agressiva para menos atualizações
        setSpeed(prev => prev * 0.8);
      } else if (speed <= 0.2 && speed > 0) {
        // Vai direto para zero para evitar múltiplas renderizações pequenas
        setSpeed(0);
      }
    }, 600); // Intervalo ainda mais longo para reduzir drasticamente atualizações
    
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
          transform: `${direction === 'forward' ? 'scaleX(1)' : 'scaleX(-1)'}`
        }}
      />
      
      {/* Linhas de velocidade - ultra simplificada para performance */}
      {speed > 5 && ( // Só mostra em velocidades maiores
        <div className="speed-lines" ref={speedLinesRef}>
          {speedLines.slice(0, 2).map(line => ( // Máximo 2 linhas
            <div 
              key={line.id}
              className="speed-line"
              style={{
                left: `${line.left}%`,
                width: `${line.width}px`,
                bottom: `${line.top}px`,
                opacity: 0.2 // Reduz opacidade
              }}
            />
          ))}
        </div>
      )}
    </>
  );
});

// Exporta o componente memoizado
export default PorscheCar;