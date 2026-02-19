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
const CURSOR_PURPLE = '#8B5CF6';

// Cursor IDE logo
const CursorLogo: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
}> = ({ x, y, opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      zIndex: 30,
    }}
  >
    <div
      style={{
        width: 100,
        height: 100,
        background: `linear-gradient(135deg, ${CURSOR_PURPLE}, #6d28d9)`,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 8px 32px rgba(139,92,246,0.3)`,
      }}
    >
      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 36, fontWeight: 700, color: 'white' }}>
        {'{ }'}
      </span>
    </div>
  </div>
);

// Download arrow animation
const DownloadArrow: React.FC<{
  progress: number;
  opacity: number;
}> = ({ progress, opacity }) => {
  const yOffset = interpolate(progress, [0, 1], [-30, 30]);
  return (
    <div
      style={{
        position: 'absolute',
        left: 640,
        top: 300 + yOffset,
        transform: 'translateX(-50%)',
        opacity: opacity * (1 - progress * 0.5),
        zIndex: 35,
      }}
    >
      <svg width="32" height="40" viewBox="0 0 32 40">
        <path d="M16 0 L16 28" stroke={GREEN} strokeWidth="3" />
        <path d="M8 20 L16 30 L24 20" stroke={GREEN} strokeWidth="3" fill="none" />
      </svg>
    </div>
  );
};

// Cursor IDE window
const CursorWindow: React.FC<{
  opacity: number;
  scale: number;
  showFiles: boolean;
  highlightSpec: boolean;
  frame: number;
}> = ({ opacity, scale, showFiles, highlightSpec, frame }) => {
  const files = [
    { name: 'spec.md', color: GREEN, glow: highlightSpec },
    { name: 'index.html', color: '#f59e0b' },
    { name: 'style.css', color: '#3b82f6' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '48%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 700,
        height: 380,
        opacity,
        zIndex: 25,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1e1e1e',
          borderRadius: 10,
          border: '2px solid #444',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            background: '#323233',
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            my-website — Cursor
          </span>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <div
            style={{
              width: 200,
              background: '#252526',
              borderRight: '1px solid #333',
              padding: '12px 0',
            }}
          >
            <div style={{ padding: '0 12px', marginBottom: 12 }}>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Explorer
              </span>
            </div>
            <div style={{ padding: '0 12px', marginBottom: 8 }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                my-website
              </span>
            </div>

            {/* File list */}
            {showFiles && files.map((file, i) => {
              const fileDelay = i * 12;
              const fileOpacity = interpolate(frame - fileDelay, [220, 240], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    padding: '4px 12px 4px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    opacity: fileOpacity,
                    background: file.glow ? 'rgba(74,222,128,0.1)' : 'transparent',
                    borderLeft: file.glow ? `2px solid ${GREEN}` : '2px solid transparent',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: file.color,
                      opacity: 0.7,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: 12,
                      color: file.glow ? GREEN : 'rgba(255,255,255,0.6)',
                      fontWeight: file.glow ? 600 : 400,
                    }}
                  >
                    {file.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Editor area */}
          <div style={{ flex: 1, padding: 20, position: 'relative' }}>
            {!showFiles && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.15)' }}>
                  Open a file to start editing
                </span>
              </div>
            )}
            {showFiles && (
              <div>
                {[60, 120, 80, 100, 50, 90, 70].map((width, i) => (
                  <div
                    key={i}
                    style={{
                      width,
                      height: 6,
                      background: `rgba(255,255,255,${0.05 + (i % 3) * 0.03})`,
                      borderRadius: 3,
                      marginBottom: 8,
                      marginLeft: i > 0 && i < 5 ? 20 : 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const IDESetupGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-80): Cursor icon appears
  const logoSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 160 } })
    : 0;
  const logoLabelOpacity = interpolate(frame, [20, 45, 65, 80], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (80-150): Download arrow
  const downloadProgress = interpolate(frame, [80, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const downloadOpacity = interpolate(frame, [80, 90, 130, 145], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const installingOpacity = interpolate(frame, [100, 115, 140, 150], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (150-220): Cursor window opens
  const windowSpring = frame >= 155
    ? spring({ frame: frame - 155, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 4 (220-300): Files appear in sidebar
  const showFiles = frame >= 220;

  // Phase 5 (300-380): spec.md highlighted
  const highlightSpec = frame >= 310;
  const specLabelOpacity = interpolate(frame, [320, 350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 6 (380-480): Checkmark + final label
  const checkSpring = frame >= 390
    ? spring({ frame: frame - 390, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const finalLabelOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo fades as window appears
  const logoFade = interpolate(frame, [150, 170], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Cursor logo */}
      {frame < 180 && (
        <CursorLogo
          x={640}
          y={280}
          opacity={logoSpring * logoFade}
          scale={interpolate(logoSpring, [0, 1], [0.6, 1])}
        />
      )}

      {/* "Cursor" label */}
      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 360,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          color: 'white',
          fontWeight: 600,
          opacity: logoLabelOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Cursor
      </div>

      {/* Download arrow */}
      {frame >= 80 && frame < 150 && (
        <DownloadArrow progress={downloadProgress} opacity={downloadOpacity} />
      )}

      {/* "Installing..." label */}
      {frame >= 100 && (
        <div
          style={{
            position: 'absolute',
            left: 640,
            top: 380,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            opacity: installingOpacity,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Installing...
        </div>
      )}

      {/* Cursor window */}
      {frame >= 155 && (
        <CursorWindow
          opacity={windowSpring}
          scale={interpolate(windowSpring, [0, 1], [0.8, 1])}
          showFiles={showFiles}
          highlightSpec={highlightSpec}
          frame={frame}
        />
      )}

      {/* "Your blueprint lives here" label */}
      {frame >= 320 && (
        <div
          style={{
            position: 'absolute',
            left: 340,
            top: 530,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            fontWeight: 600,
            opacity: specLabelOpacity,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          ← Your blueprint lives here
        </div>
      )}

      {/* Green checkmark */}
      {frame >= 390 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 80,
            transform: `translateX(-50%) scale(${checkSpring})`,
            zIndex: 40,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill={GREEN} opacity={0.15} />
            <path d="M14 24l7 7 13-13" stroke={GREEN} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 640,
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
          Your workspace is ready
        </div>
      )}
    </AbsoluteFill>
  );
};
