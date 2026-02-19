import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
  AbsoluteFill,
} from 'remotion';

const GREEN = '#4ade80';

// Browser window component
const BrowserWindow: React.FC<{
  opacity: number;
  scale: number;
  children?: React.ReactNode;
}> = ({ opacity, scale, children }) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
      width: 800,
      opacity,
      zIndex: 20,
    }}
  >
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: 12,
        border: '2px solid #444',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}
    >
      {/* URL bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          background: '#252525',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div
          style={{
            flex: 1,
            height: 24,
            background: '#1a1a1a',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
          }}
        >
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            dribbble.com
          </span>
        </div>
      </div>
      {/* Content area */}
      <div style={{ minHeight: 380, position: 'relative' }}>
        {children}
      </div>
    </div>
  </div>
);

// Design card in the grid
const DesignCard: React.FC<{
  color: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  selected?: boolean;
}> = ({ color, x, y, opacity, scale, selected }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 160,
      height: 120,
      background: color,
      borderRadius: 8,
      opacity: opacity * 0.85,
      transform: `scale(${scale})`,
      border: selected ? `3px solid ${GREEN}` : '2px solid rgba(255,255,255,0.1)',
      boxShadow: selected ? `0 0 20px ${GREEN}44` : '0 4px 12px rgba(0,0,0,0.3)',
    }}
  >
    {/* Placeholder content lines */}
    <div style={{ padding: 12 }}>
      <div style={{ width: '60%', height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 3, marginBottom: 6 }} />
      <div style={{ width: '80%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 4 }} />
      <div style={{ width: '40%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
    </div>
  </div>
);

// Screenshot thumbnail
const Thumbnail: React.FC<{
  color: string;
  x: number;
  y: number;
  opacity: number;
  index: number;
}> = ({ color, x, y, opacity, index }) => (
  <div
    style={{
      position: 'absolute',
      left: x + index * 55,
      top: y,
      width: 50,
      height: 38,
      background: color,
      borderRadius: 4,
      opacity,
      border: `2px solid ${GREEN}`,
      boxShadow: `0 2px 8px rgba(0,0,0,0.4), 0 0 8px ${GREEN}22`,
      transform: `rotate(${(index - 1) * 3}deg)`,
      zIndex: 40 + index,
    }}
  />
);

export const DribbbleBrowseGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = [
    { color: '#1e3a5f', x: 40, y: 80 },
    { color: '#5f1e3a', x: 220, y: 80 },
    { color: '#3a5f1e', x: 400, y: 80 },
    { color: '#5f3a1e', x: 580, y: 80 },
    { color: '#1e5f5f', x: 40, y: 220 },
    { color: '#4a1e5f', x: 220, y: 220 },
  ];

  // Phase 1 (0-80): Browser window appears
  const browserSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 2 (80-160): Search + cards appear
  const searchOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 3 (160-240): Cursor clicks on a card
  const selectedCard = 1; // second card
  const selectOpacity = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 4 (240-340): Screenshot capture flash
  const flashOpacity = interpolate(frame, [245, 255, 265], [0, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savedLabelOpacity = interpolate(frame, [270, 290], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 5 (340-400): Thumbnails stack up
  const thumbColors = ['#5f1e3a', '#3a5f1e', '#1e3a5f'];

  // Phase 6 (400-480): Final label
  const countOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalLabelOpacity = interpolate(frame, [410, 440], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Browser */}
      <BrowserWindow
        opacity={browserSpring}
        scale={interpolate(browserSpring, [0, 1], [0.85, 1])}
      >
        {/* Search bar */}
        {frame >= 80 && (
          <div
            style={{
              margin: '16px 20px',
              height: 32,
              background: '#2a2a2a',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 12,
              opacity: searchOpacity,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span style={{ marginLeft: 8, fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              {frame >= 100 ? (() => {
                const text = 'portfolio website';
                const elapsed = Math.max(0, frame - 100);
                const chars = Math.min(Math.floor(elapsed / 3), text.length);
                return text.slice(0, chars);
              })() : ''}
              {frame >= 100 && frame < 160 && (
                <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
              )}
            </span>
          </div>
        )}

        {/* Design cards grid */}
        {cards.map((card, i) => {
          const cardFrame = 110 + i * 10;
          const cardSpring = frame >= cardFrame
            ? spring({ frame: Math.max(0, frame - cardFrame), fps, config: { damping: 14, stiffness: 160 } })
            : 0;
          return (
            <DesignCard
              key={i}
              color={card.color}
              x={card.x}
              y={card.y}
              opacity={cardSpring}
              scale={interpolate(cardSpring, [0, 1], [0.7, 1])}
              selected={i === selectedCard && frame >= 190}
            />
          );
        })}

        {/* Flash overlay */}
        {frame >= 245 && frame < 270 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'white',
              opacity: flashOpacity,
              zIndex: 50,
            }}
          />
        )}
      </BrowserWindow>

      {/* "Saved!" label */}
      {frame >= 270 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 120,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            color: GREEN,
            fontWeight: 600,
            opacity: savedLabelOpacity,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 60,
          }}
        >
          Screenshot saved!
        </div>
      )}

      {/* Stacked thumbnails */}
      {thumbColors.map((color, i) => {
        const thumbFrame = 310 + i * 30;
        const thumbSpring = frame >= thumbFrame
          ? spring({ frame: Math.max(0, frame - thumbFrame), fps, config: { damping: 12, stiffness: 180 } })
          : 0;
        return (
          <Thumbnail
            key={i}
            color={color}
            x={950}
            y={540}
            opacity={thumbSpring}
            index={i}
          />
        );
      })}

      {/* Count label */}
      {frame >= 350 && (
        <div
          style={{
            position: 'absolute',
            left: 1010,
            top: 590,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 14,
            color: GREEN,
            fontWeight: 600,
            opacity: countOpacity,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        >
          3/5 saved
        </div>
      )}

      {/* Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 650,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: finalLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
        >
          Save 3–5 designs that inspire you
        </div>
      )}
    </AbsoluteFill>
  );
};
