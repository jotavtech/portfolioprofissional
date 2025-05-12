import { useState, useEffect, useRef, RefObject } from "react";

interface InViewOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Hook customizado para detectar quando um elemento está visível na viewport
 * Versão simplificada e mais robusta
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: InViewOptions = {}
): [RefObject<T>, boolean] {
  const { 
    rootMargin = "0px 0px 200px 0px",
    threshold = 0.1,
    triggerOnce = true
  } = options;
  
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);
  const seenRef = useRef(false);

  useEffect(() => {
    // Se já vimos o elemento e só queremos detectar uma vez, não precisamos criar um observer
    if (seenRef.current && triggerOnce) return;
    
    const currentRef = ref.current;
    if (!currentRef) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      const inView = entry.isIntersecting;
      
      if (inView) {
        setIsInView(true);
        seenRef.current = true;
        
        // Se triggerOnce é true, podemos desconectar o observer após ver o elemento
        if (triggerOnce && observer) {
          observer.disconnect();
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin,
      threshold
    });
    
    observer.observe(currentRef);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Dependências vazias para não recriar o observer

  return [ref, isInView];
}