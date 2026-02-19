
import { FC, CSSProperties, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

// Inject keyframes once
let stylesInjected = false;
function injectGlitchStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch-after {
      0% { clip-path: inset(20% 0 50% 0); }
      5% { clip-path: inset(10% 0 60% 0); }
      10% { clip-path: inset(15% 0 55% 0); }
      15% { clip-path: inset(25% 0 35% 0); }
      20% { clip-path: inset(30% 0 40% 0); }
      25% { clip-path: inset(40% 0 20% 0); }
      30% { clip-path: inset(10% 0 60% 0); }
      35% { clip-path: inset(15% 0 55% 0); }
      40% { clip-path: inset(25% 0 35% 0); }
      45% { clip-path: inset(30% 0 40% 0); }
      50% { clip-path: inset(20% 0 50% 0); }
      55% { clip-path: inset(10% 0 60% 0); }
      60% { clip-path: inset(15% 0 55% 0); }
      65% { clip-path: inset(25% 0 35% 0); }
      70% { clip-path: inset(30% 0 40% 0); }
      75% { clip-path: inset(40% 0 20% 0); }
      80% { clip-path: inset(20% 0 50% 0); }
      85% { clip-path: inset(10% 0 60% 0); }
      90% { clip-path: inset(15% 0 55% 0); }
      95% { clip-path: inset(25% 0 35% 0); }
      100% { clip-path: inset(30% 0 40% 0); }
    }
    .glitch-text {
      position: relative;
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }
    .glitch-text::after,
    .glitch-text::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      color: white;
      overflow: hidden;
      clip-path: inset(0 0 0 0);
      opacity: 0.4;
    }
    .glitch-text::after {
      left: 2px;
      text-shadow: var(--after-shadow);
      animation: glitch-after var(--after-duration) infinite linear alternate-reverse;
    }
    .glitch-text::before {
      left: -2px;
      text-shadow: var(--before-shadow);
      animation: glitch-after var(--before-duration) infinite linear alternate-reverse;
    }
    .glitch-text-hover::after,
    .glitch-text-hover::before {
      content: '';
      opacity: 0;
    }
    .glitch-text-hover:hover::after {
      content: attr(data-text);
      opacity: 1;
      text-shadow: var(--after-shadow);
      animation: glitch-after var(--after-duration) infinite linear alternate-reverse;
    }
    .glitch-text-hover:hover::before {
      content: attr(data-text);
      opacity: 1;
      text-shadow: var(--before-shadow);
      animation: glitch-after var(--before-duration) infinite linear alternate-reverse;
    }
  `;
  document.head.appendChild(style);
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  useEffect(() => {
    injectGlitchStyles();
  }, []);

  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-2px 0 rgba(120, 80, 255, 0.5)' : 'none',
    '--before-shadow': enableShadows ? '2px 0 rgba(80, 200, 255, 0.4)' : 'none'
  };

  return (
    <div
      style={inlineStyles}
      data-text={children}
      className={`glitch-text ${enableOnHover ? 'glitch-text-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlitchText;
