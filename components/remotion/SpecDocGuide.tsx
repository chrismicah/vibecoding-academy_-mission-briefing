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

// Claude chat window
const ClaudeChat: React.FC<{
  opacity: number;
  scale: number;
  showImages: boolean;
  showTyping: boolean;
  showResponse: boolean;
  frame: number;
}> = ({ opacity, scale, showImages, showTyping, showResponse, frame }) => {
  const imageColors = ['#5f1e3a', '#1e3a5f', '#3a5f1e'];

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 120,
        transform: `scale(${scale})`,
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 420,
          minHeight: 360,
          background: '#1a1a2e',
          borderRadius: 14,
          border: '2px solid #444',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '10px 14px',
            background: '#252540',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#d4a574', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: '#1a1a2e', fontWeight: 700 }}>C</span>
          </div>
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Claude</span>
        </div>

        <div style={{ padding: 16 }}>
          {/* Screenshot thumbnails */}
          {showImages && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {imageColors.map((color, i) => {
                const imgDelay = i * 15;
                const imgOpacity = interpolate(frame - imgDelay, [20, 40], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                return (
                  <div
                    key={i}
                    style={{
                      width: 80,
                      height: 60,
                      background: color,
                      borderRadius: 6,
                      opacity: imgOpacity,
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* User message typing */}
          {showTyping && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>You</span>
              <div style={{ marginTop: 4, fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                {(() => {
                  const text = 'Build me a portfolio site with this style...';
                  const elapsed = Math.max(0, frame - 90);
                  const chars = Math.min(Math.floor(elapsed / 2), text.length);
                  return text.slice(0, chars);
                })()}
                {frame >= 90 && frame < 140 && (
                  <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
                )}
              </div>
            </div>
          )}

          {/* Claude response */}
          {showResponse && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: '#d4a574', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Claude</span>
              <div style={{ marginTop: 6 }}>
                {[
                  { width: 200, color: '#3b82f6' },
                  { width: 280, color: '#f59e0b' },
                  { width: 160, color: '#22c55e' },
                  { width: 240, color: '#ef4444' },
                  { width: 180, color: '#8b5cf6' },
                ].map((line, i) => {
                  const lineDelay = i * 10;
                  const lineOpacity = interpolate(frame - lineDelay, [140, 160], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        width: line.width,
                        height: 6,
                        background: line.color,
                        opacity: lineOpacity * 0.3,
                        borderRadius: 3,
                        marginBottom: 6,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Spec doc file icon
const SpecFileIcon: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  glow?: boolean;
}> = ({ x, y, opacity, scale, glow }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      zIndex: 35,
    }}
  >
    <div
      style={{
        width: 80,
        height: 100,
        background: glow ? 'rgba(74,222,128,0.12)' : '#1a1a1a',
        border: `2px solid ${glow ? GREEN : '#555'}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: glow ? `0 0 24px ${GREEN}44` : '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Corner fold */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 16,
          height: 16,
          background: '#111',
          borderLeft: `1px solid ${glow ? GREEN : '#555'}`,
          borderBottom: `1px solid ${glow ? GREEN : '#555'}`,
          borderRadius: '0 0 0 4px',
        }}
      />
      {/* Content lines */}
      <div style={{ width: 40, height: 3, background: glow ? GREEN : '#555', borderRadius: 1.5, marginBottom: 4, opacity: 0.7 }} />
      <div style={{ width: 30, height: 3, background: glow ? GREEN : '#555', borderRadius: 1.5, marginBottom: 4, opacity: 0.5 }} />
      <div style={{ width: 35, height: 3, background: glow ? GREEN : '#555', borderRadius: 1.5, opacity: 0.4 }} />
    </div>
    <div
      style={{
        textAlign: 'center',
        marginTop: 8,
        fontFamily: 'ui-monospace, monospace',
        fontSize: 14,
        color: glow ? GREEN : 'white',
        fontWeight: 600,
      }}
    >
      spec.md
    </div>
  </div>
);

// Folder icon
const FolderIcon: React.FC<{
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
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: 100,
          height: 70,
          background: '#2a2a2a',
          border: '2px solid #555',
          borderRadius: '0 6px 6px 6px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -14,
          left: 0,
          width: 40,
          height: 14,
          background: '#2a2a2a',
          border: '2px solid #555',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
        }}
      />
    </div>
    <div
      style={{
        textAlign: 'center',
        marginTop: 6,
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
      }}
    >
      my-website/
    </div>
  </div>
);

export const SpecDocGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-80): Claude chat appears with screenshots
  const chatSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 2 (80-160): Typing + response
  const showTyping = frame >= 80;
  const showResponse = frame >= 140;

  // Phase 3 (160-240): Spec file materializes
  const specSpring = frame >= 180
    ? spring({ frame: frame - 180, fps, config: { damping: 12, stiffness: 180 } })
    : 0;
  const specGlow = frame >= 200;

  // Phase 4 (240-320): Download animation - file floats to folder
  const fileX = interpolate(frame, [250, 320], [720, 1000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const fileY = interpolate(frame, [250, 320], [300, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const fileMoving = frame >= 250 && frame < 330;
  const fileArrived = frame >= 330;

  // Phase 5 (320-400): Folder with file
  const folderSpring = frame >= 280
    ? spring({ frame: frame - 280, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 6 (400-480): Checkmark + final label
  const checkSpring = frame >= 400
    ? spring({ frame: frame - 400, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const finalLabelOpacity = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Arrow from chat to spec file
  const arrowProgress = interpolate(frame, [170, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Claude chat */}
      <ClaudeChat
        opacity={chatSpring}
        scale={interpolate(chatSpring, [0, 1], [0.85, 1])}
        showImages={frame >= 10}
        showTyping={showTyping}
        showResponse={showResponse}
        frame={frame}
      />

      {/* Arrow from chat to spec file */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {frame >= 170 && (
          <>
            <line
              x1={520}
              y1={300}
              x2={520 + (680 - 520) * arrowProgress}
              y2={300}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            {arrowProgress > 0.9 && (
              <path d="M675 295 L685 300 L675 305" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            )}
          </>
        )}

        {/* Arrow from spec to folder */}
        {frame >= 250 && frame < 330 && (
          <line
            x1={720}
            y1={340}
            x2={fileX}
            y2={fileY - 20}
            stroke={GREEN}
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0.4}
          />
        )}
      </svg>

      {/* Spec file - static position before move, then moves */}
      {frame >= 180 && !fileMoving && !fileArrived && (
        <SpecFileIcon
          x={720}
          y={300}
          opacity={specSpring}
          scale={interpolate(specSpring, [0, 1], [0.6, 1])}
          glow={specGlow}
        />
      )}

      {/* Spec file - moving */}
      {fileMoving && (
        <SpecFileIcon
          x={fileX}
          y={fileY}
          opacity={1}
          scale={0.8}
          glow
        />
      )}

      {/* Spec file - arrived in folder */}
      {fileArrived && (
        <SpecFileIcon
          x={1000}
          y={370}
          opacity={1}
          scale={0.7}
          glow
        />
      )}

      {/* Folder */}
      <FolderIcon
        x={1000}
        y={440}
        opacity={folderSpring}
        scale={interpolate(folderSpring, [0, 1], [0.7, 1])}
      />

      {/* Green checkmark */}
      {frame >= 400 && (
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
      {frame >= 420 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 600,
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
          Your blueprint is ready for the builder
        </div>
      )}
    </AbsoluteFill>
  );
};
