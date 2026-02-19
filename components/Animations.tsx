
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SplitText - Animates each character individually
 */
export const SplitText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 30 }) => {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * (delay / 1000),
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * BlurText - Text that fades in from a blur
 */
export const BlurText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 100 }) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{
        delay: delay / 1000,
        duration: 0.8,
        ease: 'easeOut'
      }}
    >
      {text}
    </motion.p>
  );
};

/**
 * ShinyText - Text with a subtle shimmer animation
 */
export const ShinyText: React.FC<{
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}> = ({ text, className = '', speed = 2.5, delay = 0.7 }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(120deg, rgba(255,255,255,0.4) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['100% 0%', '-100% 0%'],
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
};

/**
 * DecryptedText - Matrix-style text decryption effect
 */
export const DecryptedText: React.FC<{
  text: string;
  className?: string;
  speed?: number;
}> = ({ text, className = '', speed = 50 }) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, '_'));
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        setDone(true);
        return;
      }
      setDisplay(prev => {
        const arr = prev.split('');
        // Reveal character at current index
        arr[index] = text[index];
        // Scramble upcoming characters
        for (let j = index + 1; j < Math.min(index + 4, text.length); j++) {
          if (text[j] !== ' ') {
            arr[j] = chars[Math.floor(Math.random() * chars.length)];
          }
        }
        return arr.join('');
      });
      index++;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      {display}
    </span>
  );
};

/**
 * GlitchText - Text with a glitch/distortion effect
 */
export const GlitchText: React.FC<{
  text: string;
  className?: string;
  speed?: number;
}> = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        x: [0, -1, 2, -1, 0],
        opacity: [1, 0.8, 1, 0.9, 1],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {text}
    </motion.span>
  );
};
