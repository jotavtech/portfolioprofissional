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
    if (speed > 4) { // Aumentamos o limite de velocidade para reduzir os efeitos
      // Adiciona linhas apenas quando a velocidade é significativa
      // Reduz significativamente a quantidade de linhas
      const linesCount = Math.min(2, Math.floor(speed / 4));
      
      // Reduz ainda mais a frequência (apenas 30% das vezes)
      if (linesCount > 0 && Math.random() > 0.7) {
        const newLines: {id: number, left: number, width: number, top: number}[] = [];
        
        for (let i = 0; i < linesCount; i++) {
          newLines.push({
            id: Date.now() + i,
            left: Math.random() * 100, // Posição horizontal aleatória (%)
            width: Math.random() * 80 + 20, // Largura reduzida
            top: Math.random() * 15 // Posição vertical reduzida
          });
        }
        
        // Manter apenas 5 linhas no máximo para economizar memória
        setSpeedLines(prev => [...prev, ...newLines].slice(-5));
      }
    }
  }, [speed > 4 ? Math.floor(speed / 2) : 0]); // Reduzimos a frequência das atualizações
  
  useEffect(() => {
    // Variável para controlar o throttling do evento de scroll
    let isThrottled = false;
    let lastTimeScrolled = 0;
    
    // Função otimizada para atualizar a posição do carro com base no scroll
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle mais agressivo (apenas 30 frames por segundo)
      if (isThrottled && now - lastTimeScrolled < 33) { // ~30fps (1000ms/30 ≈ 33ms)
        return;
      }
      
      isThrottled = true;
      lastTimeScrolled = now;
      
      // Usa setTimeout em vez de requestAnimationFrame para maior controle da frequência
      setTimeout(() => {
        isThrottled = false;
      }, 33);
      
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Apenas se a diferença de scroll for significativa (reduz cálculos)
      if (scrollDiff > 3) {
        // Calcular velocidade baseada na diferença de scroll (velocidade máxima reduzida)
        const newSpeed = Math.min(8, scrollDiff * 0.15);
        setSpeed(newSpeed);
        
        // Determina a direção do scroll de forma simplificada
        const isScrollingDown = currentScrollY > lastScrollY.current;
        
        // Combina as atualizações de estado para reduzir re-renders
        if (isScrollingDown) {
          setDirection('forward');
          setPosition(prev => Math.min(window.innerWidth - 150, prev + scrollDiff * 0.6));
        } else {
          setDirection('backward');
          setPosition(prev => Math.max(-150, prev - scrollDiff * 0.6));
        }
      }
      
      // Atualiza o último valor de scroll conhecido
      lastScrollY.current = currentScrollY;
    };
    
    // Efeito de diminuição de velocidade quando parado (intervalo muito mais longo)
    const slowDownInterval = setInterval(() => {
      if (!document.hidden && speed > 0.1) {
        setSpeed(prev => prev * 0.9);
      } else if (speed <= 0.1 && speed > 0) {
        setSpeed(0); // Define como 0 imediatamente se for muito baixo
      }
    }, 400); // Intervalo muito maior para minimizar atualizações
    
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
      
      {/* Linhas de velocidade - versão simplificada */}
      <div className="speed-lines" ref={speedLinesRef}>
        {speed > 3 && speedLines.slice(0, 3).map(line => (
          <div 
            key={line.id}
            className="speed-line"
            style={{
              left: `${line.left}%`,
              width: `${line.width}px`,
              bottom: `${line.top}px`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
    </>
  );
});

// Exporta o componente memoizado
export default PorscheCar;