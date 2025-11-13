import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (text, speed = 30, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted || currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed + Math.random() * 20); // Slight randomness for natural feel

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isStarted]);

  const reset = useCallback(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsStarted(false);
  }, []);

  return { 
    displayText, 
    reset, 
    isComplete: currentIndex === text.length,
    progress: (currentIndex / text.length) * 100
  };
};