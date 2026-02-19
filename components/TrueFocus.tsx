
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  text: string;
  className?: string;
  focusColor?: string;
  dimColor?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  text,
  className = '',
  focusColor = 'text-white',
  dimColor = 'text-zinc-600',
}) => {
  const words = text.split(' ');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            className={`inline-block cursor-default transition-colors duration-200 ${
              hoveredIndex === null
                ? focusColor
                : hoveredIndex === i
                ? focusColor
                : dimColor
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              filter: hoveredIndex === null
                ? 'blur(0px)'
                : hoveredIndex === i
                ? 'blur(0px)'
                : 'blur(1.5px)',
            }}
            transition={{ duration: 0.2 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
};

export default TrueFocus;
