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
const RED = '#f87171';
const ZINC_400 = '#a1a1aa';

// Typing text helper
const TypingText: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
  color?: string;
  fontSize?: number;
}> = ({ text, startFrame, speed = 2, color = 'rgba(255,255,255,0.8)', fontSize = 13 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed / speed), text.length);
  const displayText = frame >= startFrame ? text.slice(0, charsToShow) : '';

  return (
    <span
      style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize,
        color,
        lineHeight: 1.6,
      }}
    >
      {displayText}
      {charsToShow > 0 && charsToShow < text.length && (
        <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
      )}
    </span>
  );
};

// File row in folder card
const FileRow: React.FC<{
  name: string;
  color: string;
  opacity?: number;
  glow?: boolean;
  glowColor?: string;
}> = ({ name, color, opacity = 1, glow = false, glowColor = RED }) => {
  const frame = useCurrentFrame();
  const pulse = glow ? 0.5 + 0.5 * Math.sin(frame * 0.12) : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px',
        borderRadius: 6,
        opacity,
        background: glow ? `rgba(248,113,113,${pulse * 0.12})` : 'transparent',
        border: glow ? `1px solid rgba(248,113,113,${pulse * 0.4})` : '1px solid transparent',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <span
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 13,
          color,
          fontWeight: 500,
        }}
      >
        {name}
      </span>
    </div>
  );
};

// Small file chip that moves in the push animation
const FileChip: React.FC<{
  name: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
}> = ({ name, x, y, color, opacity }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 10px',
      background: '#1a1a1a',
      border: `1px solid ${color}`,
      borderRadius: 6,
    }}
  >
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    </svg>
    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color, fontWeight: 500 }}>
      {name}
    </span>
  </div>
);

export const GitignoreGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–100): Folder card appears
  const folderSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const folderLabel = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (100–180): .env glows red + danger label
  const envGlow = frame >= 100;
  const dangerOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (180–280): .gitignore card appears + typing
  const gitignoreSpring = frame >= 190
    ? spring({ frame: frame - 190, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const arrowProgress1 = interpolate(frame, [180, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const gitignoreLabel = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (280–400): Git push animation
  const pushArrowProgress = interpolate(frame, [280, 320], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const cloudSpring = frame >= 290
    ? spring({ frame: frame - 290, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // File chip positions: they fly from folder to cloud
  const chipStartX = 320;
  const chipEndX = 950;
  const chipY1Base = 440;

  const chip1Progress = interpolate(frame, [320, 360], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const chip2Progress = interpolate(frame, [335, 375], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const chip3Progress = interpolate(frame, [350, 390], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  // .env blocked animation
  const envChipProgress = interpolate(frame, [340, 365], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const envBounce = frame >= 365
    ? interpolate(frame, [365, 380], [0.4, 0.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.6, 0, 0.4, 1) })
    : envChipProgress;
  const shieldFlash = frame >= 365
    ? interpolate(frame, [365, 380], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const blockedLabel = interpolate(frame, [370, 390], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cloudLabel = interpolate(frame, [380, 400], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (400–480): Final label
  const finalOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Positions
  const folderX = 80;
  const folderY = 80;
  const gitignoreX = 500;
  const gitignoreY = 100;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Phase 1: Folder card */}
      <div
        style={{
          position: 'absolute',
          left: folderX,
          top: folderY,
          opacity: folderSpring,
          transform: `scale(${interpolate(folderSpring, [0, 1], [0.8, 1])})`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 280,
            background: '#0a0a0a',
            border: '2px solid #333',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 14px',
              background: '#1a1a1a',
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={ZINC_400}>
              <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'white', fontWeight: 600 }}>
              my-website/
            </span>
          </div>
          <div style={{ padding: '8px 6px' }}>
            <FileRow name="index.html" color={ZINC_400} />
            <FileRow name="styles.css" color={ZINC_400} />
            <FileRow name="script.js" color={ZINC_400} />
            <FileRow name=".env" color={envGlow ? RED : ZINC_400} glow={envGlow} />
          </div>
        </div>
      </div>

      {/* Phase 1 label */}
      <div
        style={{
          position: 'absolute',
          left: folderX + 140,
          top: folderY + 270,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 15,
          color: GREEN,
          fontWeight: 600,
          opacity: folderLabel,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Your project folder
      </div>

      {/* Phase 2: Danger label */}
      {frame >= 110 && (
        <div
          style={{
            position: 'absolute',
            left: folderX + 290,
            top: folderY + 195,
            opacity: dangerOpacity,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 30,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 22h20L12 2z" fill="rgba(248,113,113,0.15)" stroke={RED} strokeWidth="2" />
            <path d="M12 9v5M12 17h.01" stroke={RED} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 12, color: RED, fontWeight: 600 }}>
            Contains your secret keys!
          </span>
        </div>
      )}

      {/* SVG arrows */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {/* Arrow: folder → gitignore */}
        {frame >= 180 && (
          <line
            x1={folderX + 280}
            y1={folderY + 140}
            x2={folderX + 280 + (gitignoreX - folderX - 280) * arrowProgress1}
            y2={folderY + 140 + (gitignoreY + 60 - folderY - 140) * arrowProgress1}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}
        {/* Arrow: folder → cloud */}
        {frame >= 280 && (
          <line
            x1={folderX + 140}
            y1={folderY + 270 + 30}
            x2={folderX + 140 + (900 - folderX - 140) * pushArrowProgress}
            y2={folderY + 300 + (440 - folderY - 300) * pushArrowProgress}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={2}
            strokeDasharray="8 4"
          />
        )}
      </svg>

      {/* Phase 3: .gitignore card */}
      <div
        style={{
          position: 'absolute',
          left: gitignoreX,
          top: gitignoreY,
          opacity: gitignoreSpring,
          transform: `scale(${interpolate(gitignoreSpring, [0, 1], [0.8, 1])})`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 340,
            background: '#0a0a0a',
            border: `2px solid rgba(74,222,128,0.4)`,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 14px',
              background: '#1a1a1a',
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: GREEN, fontWeight: 600 }}>
              .gitignore
            </span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ marginBottom: 4 }}>
              <TypingText text=".env" startFrame={210} speed={3} color={GREEN} fontSize={13} />
            </div>
            <div style={{ marginBottom: 4 }}>
              <TypingText text=".env.local" startFrame={225} speed={3} color={GREEN} fontSize={13} />
            </div>
            <div>
              <TypingText text="node_modules/" startFrame={245} speed={2} color={GREEN} fontSize={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Phase 3 label */}
      {frame >= 240 && (
        <div
          style={{
            position: 'absolute',
            left: gitignoreX + 170,
            top: gitignoreY + 210,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: ZINC_400,
            opacity: gitignoreLabel,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Tell Git to ignore these files
        </div>
      )}

      {/* Phase 4: Cloud icon */}
      {frame >= 290 && (
        <div
          style={{
            position: 'absolute',
            left: 980,
            top: 400,
            opacity: cloudSpring,
            transform: `scale(${interpolate(cloudSpring, [0, 1], [0.7, 1])})`,
            zIndex: 20,
            textAlign: 'center',
          }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M30 60 C10 60 0 50 0 40 C0 28 10 18 22 18 C25 8 35 0 50 0 C65 0 77 10 78 22 C92 22 105 32 105 45 C105 58 92 66 80 66 L30 66 Z"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <text x="52" y="48" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="12" fill="white" fontWeight="600">
              GitHub
            </text>
          </svg>
        </div>
      )}

      {/* Flying file chips */}
      {frame >= 320 && (
        <>
          <FileChip
            name="index.html"
            x={chipStartX + (chipEndX - chipStartX) * chip1Progress}
            y={chipY1Base - 30}
            color={GREEN}
            opacity={chip1Progress > 0 ? 1 : 0}
          />
          <FileChip
            name="styles.css"
            x={chipStartX + (chipEndX - chipStartX) * chip2Progress}
            y={chipY1Base}
            color={GREEN}
            opacity={chip2Progress > 0 ? 1 : 0}
          />
          <FileChip
            name="script.js"
            x={chipStartX + (chipEndX - chipStartX) * chip3Progress}
            y={chipY1Base + 30}
            color={GREEN}
            opacity={chip3Progress > 0 ? 1 : 0}
          />
        </>
      )}

      {/* .env blocked */}
      {frame >= 340 && (
        <>
          <FileChip
            name=".env"
            x={chipStartX + (chipEndX - chipStartX) * envBounce}
            y={chipY1Base + 65}
            color={RED}
            opacity={1}
          />
          {/* Shield barrier */}
          {shieldFlash > 0 && (
            <div
              style={{
                position: 'absolute',
                left: chipStartX + (chipEndX - chipStartX) * 0.4 - 15,
                top: chipY1Base + 30,
                width: 4,
                height: 80,
                background: RED,
                opacity: shieldFlash,
                borderRadius: 2,
                boxShadow: `0 0 20px ${RED}`,
                zIndex: 35,
              }}
            />
          )}
        </>
      )}

      {/* BLOCKED label */}
      {frame >= 370 && (
        <div
          style={{
            position: 'absolute',
            left: chipStartX + (chipEndX - chipStartX) * 0.4,
            top: chipY1Base + 115,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 13,
            color: RED,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: blockedLabel,
            textShadow: `0 0 10px ${RED}`,
            zIndex: 30,
          }}
        >
          BLOCKED
        </div>
      )}

      {/* Cloud label */}
      {frame >= 380 && (
        <div
          style={{
            position: 'absolute',
            left: 1040,
            top: 490,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 12,
            color: GREEN,
            opacity: cloudLabel,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Only safe files uploaded
        </div>
      )}

      {/* Phase 5: Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 660,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: finalOpacity,
            zIndex: 30,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 20,
              color: 'white',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Your secrets stay on your computer
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
