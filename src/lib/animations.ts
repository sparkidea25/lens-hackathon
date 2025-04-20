
import { useEffect, useState } from 'react';

export const usePageTransition = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Initial delay for better effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return isVisible;
};

export const getTransitionClasses = (isVisible: boolean, delay: number = 0) => {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`
  };
};

export const getStaggeredChildren = (isVisible: boolean, count: number, baseDelay: number = 0.1) => {
  return Array.from({ length: count }, (_, i) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out ${baseDelay + i * 0.1}s, transform 0.5s ease-out ${baseDelay + i * 0.1}s`
  }));
};
