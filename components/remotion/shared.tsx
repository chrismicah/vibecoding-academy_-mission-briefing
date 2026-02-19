import React from 'react';
import { useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

const GREEN = '#4ade80';

// Animated cursor that moves to target positions
export const AnimatedCursor: React.FC<{
  x: number;
  y: number;
  visible?: boolean;
  clicking?: boolean;
}> = ({ x, y, visible = true, clicking = false }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 100,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      }}
    >
      {/* Cursor arrow */}
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path
          d="M4 2L4 22L9.5 17L14.5 26L18 24.5L13 16L20 14L4 2Z"
          fill="white"
          stroke="#222"
          strokeWidth="1.5"
        />
      </svg>
      {/* Click ripple */}
      {clicking && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: `2px solid ${GREEN}`,
            opacity: 0.6,
            transform: 'translate(-8px, -8px)',
            animation: 'none',
          }}
        />
      )}
    </div>
  );
};

// Click ripple effect
export const ClickRipple: React.FC<{
  x: number;
  y: number;
  progress: number;
}> = ({ x, y, progress }) => {
  const scale = interpolate(progress, [0, 1], [0.3, 2]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0.8, 0.4, 0]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 15,
        top: y - 15,
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: `2px solid ${GREEN}`,
        transform: `scale(${scale})`,
        opacity,
        zIndex: 99,
      }}
    />
  );
};

// Fade-in label
export const Label: React.FC<{
  text: string;
  x: number;
  y: number;
  opacity: number;
  fontSize?: number;
  color?: string;
}> = ({ text, x, y, opacity, fontSize = 18, color = 'white' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translateX(-50%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize,
        color,
        opacity,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        zIndex: 50,
      }}
    >
      {text}
    </div>
  );
};

// Annotation arrow pointing to something
export const AnnotationArrow: React.FC<{
  x: number;
  y: number;
  label: string;
  opacity: number;
  direction?: 'up' | 'down';
}> = ({ x, y, label, opacity, direction = 'up' }) => {
  const arrowY = direction === 'up' ? -30 : 30;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translateX(-50%)',
        opacity,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {direction === 'down' && (
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
      <svg width="20" height="24" viewBox="0 0 20 24" style={{ transform: direction === 'down' ? 'rotate(180deg)' : 'none' }}>
        <path d="M10 24L10 4" stroke={GREEN} strokeWidth="2" />
        <path d="M3 10L10 3L17 10" stroke={GREEN} strokeWidth="2" fill="none" />
      </svg>
      {direction === 'up' && (
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            marginTop: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// Typing text that reveals characters over time
export const TypingText: React.FC<{
  text: string;
  startFrame: number;
  framesPerChar?: number;
  style?: React.CSSProperties;
}> = ({ text, startFrame, framesPerChar = 3, style }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed / framesPerChar), text.length);
  return (
    <span style={{ fontFamily: 'ui-monospace, monospace', ...style }}>
      {text.slice(0, charsToShow)}
      {charsToShow < text.length && charsToShow > 0 && (
        <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
      )}
    </span>
  );
};

// Key icon for keyboard shortcuts
export const KeyIcon: React.FC<{
  label: string;
  pressed: boolean;
  x: number;
  y: number;
}> = ({ label, pressed, x, y }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const pressScale = pressed
    ? spring({ frame, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const yOffset = interpolate(pressScale, [0, 1], [0, 3]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + yOffset,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: pressed ? '#333' : '#222',
          border: pressed ? `2px solid ${GREEN}` : '2px solid #444',
          borderRadius: 8,
          padding: '8px 16px',
          minWidth: 50,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 16,
          fontWeight: 600,
          color: pressed ? GREEN : '#999',
          boxShadow: pressed
            ? `0 1px 2px rgba(0,0,0,0.3), 0 0 12px ${GREEN}33`
            : '0 3px 6px rgba(0,0,0,0.4)',
          transition: 'none',
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Blinking terminal cursor
export const BlinkingCursor: React.FC<{ color?: string }> = ({ color = 'white' }) => {
  const frame = useCurrentFrame();
  const visible = frame % 20 < 12;
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 16,
        backgroundColor: color,
        opacity: visible ? 0.9 : 0,
        marginLeft: 2,
        verticalAlign: 'middle',
      }}
    />
  );
};

export { GREEN };
