import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Hook customizado para detectar quando um elemento está visível na viewport
 * Com opções de rootMargin para carregar antes de entrar completamente na tela
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options = {
    rootMargin: "0px 0px 200px 0px", // Carrega quando está a 200px de entrar na tela
    threshold: 0.1, // 10% do elemento visível é suficiente para considerar "em view"
    triggerOnce: true // Por padrão, dispara apenas uma vez
  }
): [RefObject<T>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // Se já está marcado como visível e triggerOnce é true, não precisa observar mais
    if (isInView && options.triggerOnce) return;
    
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Só atualiza o estado se mudar para evitar re-renders desnecessários
      if (entry.isIntersecting !== isInView) {
        setIsInView(entry.isIntersecting);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isInView, options.rootMargin, options.threshold, options.triggerOnce]);

  return [ref, isInView];
}