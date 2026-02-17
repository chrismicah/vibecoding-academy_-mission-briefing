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
const BLUE = '#60a5fa';

export const GitVsGitHubGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-60): Laptop appears with files
  const laptopSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const laptopLabelOp = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (60-150): Git save dots appear on laptop side
  const saveDots = [
    { label: 'Save 1', frame: 70 },
    { label: 'Save 2', frame: 100 },
    { label: 'Save 3', frame: 130 },
  ];
  const gitLabelOp = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (160-230): Arrow pushes up to cloud
  const arrowProgress = interpolate(frame, [160, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const pushLabelOp = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (230-310): Cloud / GitHub appears
  const cloudSpring = frame >= 230
    ? spring({ frame: frame - 230, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const githubLabelOp = interpolate(frame, [250, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (320-400): Summary labels
  const summaryOp = interpolate(frame, [330, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Positions
  const laptopX = 160;
  const laptopY = 300;
  const cloudX = 860;
  const cloudY = 300;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Laptop / Your Computer */}
      <div
        style={{
          position: 'absolute',
          left: laptopX,
          top: laptopY - 60,
          opacity: laptopSpring,
          transform: `scale(${interpolate(laptopSpring, [0, 1], [0.8, 1])})`,
          zIndex: 20,
        }}
      >
        {/* Laptop body */}
        <div
          style={{
            width: 200,
            height: 130,
            background: '#1a1a2e',
            border: '2px solid #444',
            borderRadius: 12,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Screen dots (file icons) */}
          <div style={{ display: 'flex', gap: 12, padding: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[GREEN, BLUE, '#f59e0b', '#ef4444', GREEN, BLUE].map((color, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 34,
                  background: '#222',
                  border: `1px solid ${color}44`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 14, height: 2, background: color, borderRadius: 1, opacity: 0.6 }} />
              </div>
            ))}
          </div>
        </div>
        {/* Laptop base */}
        <div
          style={{
            width: 240,
            height: 12,
            background: '#333',
            borderRadius: '0 0 8px 8px',
            marginLeft: -20,
            borderTop: '2px solid #555',
          }}
        />
      </div>

      {/* "Your Computer" label */}
      <div
        style={{
          position: 'absolute',
          left: laptopX + 100,
          top: laptopY - 100,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          color: 'white',
          fontWeight: 600,
          opacity: laptopLabelOp,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Your Computer
      </div>

      {/* Git = Save System label */}
      <div
        style={{
          position: 'absolute',
          left: laptopX + 100,
          top: laptopY + 110,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 14,
          color: GREEN,
          fontWeight: 500,
          opacity: gitLabelOp,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Git = Your save system
      </div>

      {/* Save point dots below laptop */}
      {saveDots.map((dot, i) => {
        const dotScale = dot.frame <= frame
          ? spring({ frame: Math.max(0, frame - dot.frame), fps, config: { damping: 12, stiffness: 200 } })
          : 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: laptopX + 40 + i * 60,
              top: laptopY + 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              transform: `scale(${dotScale})`,
              zIndex: 30,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'white',
                border: `3px solid ${GREEN}`,
                boxShadow: `0 0 10px ${GREEN}44`,
              }}
            />
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {dot.label}
            </span>
          </div>
        );
      })}

      {/* Arrow from laptop to cloud */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 15 }}
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
      >
        {frame >= 160 && (
          <>
            <line
              x1={laptopX + 220}
              y1={laptopY}
              x2={laptopX + 220 + (cloudX - laptopX - 220) * arrowProgress}
              y2={laptopY}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2.5}
              strokeDasharray="8 5"
            />
            {arrowProgress > 0.9 && (
              <path
                d={`M${cloudX - 15} ${laptopY - 6} L${cloudX - 2} ${laptopY} L${cloudX - 15} ${laptopY + 6}`}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2.5"
              />
            )}
          </>
        )}
      </svg>

      {/* "Push" label on arrow */}
      <div
        style={{
          position: 'absolute',
          left: (laptopX + 220 + cloudX) / 2,
          top: laptopY - 35,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 14,
          color: 'rgba(255,255,255,0.5)',
          opacity: pushLabelOp,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 20,
        }}
      >
        Upload to the cloud
      </div>

      {/* Cloud / GitHub */}
      <div
        style={{
          position: 'absolute',
          left: cloudX,
          top: cloudY - 70,
          opacity: cloudSpring,
          transform: `scale(${interpolate(cloudSpring, [0, 1], [0.8, 1])})`,
          zIndex: 20,
        }}
      >
        {/* Cloud shape */}
        <svg width="200" height="130" viewBox="0 0 200 130">
          <path
            d="M40 90 Q10 90 10 65 Q10 40 35 35 Q40 10 70 10 Q100 10 110 30 Q120 15 145 15 Q180 15 185 50 Q200 55 195 75 Q190 95 165 95 Z"
            fill="#1a1a2e"
            stroke={BLUE}
            strokeWidth="2"
            opacity={0.8}
          />
          {/* GitHub-like icon inside */}
          <circle cx="100" cy="55" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="6" fill="rgba(255,255,255,0.3)" />
          <path d="M88 62 Q100 70 112 62" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* "The Cloud (GitHub)" label */}
      <div
        style={{
          position: 'absolute',
          left: cloudX + 100,
          top: cloudY - 100,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          color: 'white',
          fontWeight: 600,
          opacity: githubLabelOp,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        The Cloud (GitHub)
      </div>

      {/* GitHub = Safe Backup label */}
      <div
        style={{
          position: 'absolute',
          left: cloudX + 100,
          top: cloudY + 80,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 14,
          color: BLUE,
          fontWeight: 500,
          opacity: githubLabelOp,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        GitHub = Your safe backup
      </div>

      {/* Summary at bottom */}
      {frame >= 330 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 560,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: summaryOp,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 20,
            lineHeight: 1.6,
          }}
        >
          Git saves your work locally. GitHub backs it up online.
        </div>
      )}
    </AbsoluteFill>
  );
};
