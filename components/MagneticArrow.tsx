
import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ShinyText } from './Animations';

interface MagneticArrowProps {
  direction?: 'next' | 'back';
  label?: string;
  onClick?: () => void;
}

const MagneticArrow: React.FC<MagneticArrowProps> = ({
  direction = 'next',
  label = 'PROCEED',
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Subtle scale on hover via spring
  const scale = useSpring(1, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
    scale.set(1.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const isNext = direction === 'next';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x, y, scale }}
      className={`fixed top-1/2 -translate-y-1/2 cursor-pointer z-50 flex flex-col items-center ${
        isNext ? 'right-5 sm:right-8' : 'left-5 sm:left-8'
      }`}
    >
      {/* Arrow */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700/50 bg-black/20 backdrop-blur-sm group-hover:border-zinc-500 transition-colors">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: isNext ? 'none' : 'rotate(180deg)' }}
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Label */}
      <div className="mt-2">
        <ShinyText
          text={label}
          speed={3}
          delay={1}
          className="text-[9px] tracking-[0.3em] uppercase font-medium"
        />
      </div>
    </motion.div>
  );
};

export default MagneticArrow;
