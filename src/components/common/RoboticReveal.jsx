import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

const RoboticReveal = ({ text, delay = 0, duration = 2, style = {} }) => {
  const [displayText, setDisplayText] = useState('_'.repeat(text.length));
  const [hasPlayed, setHasPlayed] = useState(false);
  const timerRef = useRef(null);
  const delayRef = useRef(null);

  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasPlayed) {
      delayRef.current = setTimeout(() => {
        let currentIteration = 0;
        const maxIterations = text.length;

        timerRef.current = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < currentIteration) return text[index];
                return characters[Math.floor(Math.random() * characters.length)];
              })
              .join('')
          );

          currentIteration += 1;

          if (currentIteration >= maxIterations) {
            clearInterval(timerRef.current);
            setDisplayText(text);
            setHasPlayed(true);
          }
        }, 30);
      }, delay * 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(delayRef.current);
    };
  }, [inView, hasPlayed, text, delay]);

  return (
    <span
      ref={ref}
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        display: 'inline',
        ...style,
      }}
    >
      {displayText}
    </span>
  );
};

export default RoboticReveal;
