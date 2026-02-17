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

// File icon component
const FileIcon: React.FC<{
  name: string;
  label: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  color: string;
  glow?: boolean;
}> = ({ name, label, x, y, opacity, scale, color, glow }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `scale(${scale})`,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      zIndex: 30,
    }}
  >
    {/* File shape */}
    <div
      style={{
        width: 44,
        height: 54,
        background: glow ? 'rgba(74,222,128,0.12)' : '#1a1a1a',
        border: `2px solid ${color}`,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: glow ? `0 0 20px ${GREEN}44` : '0 4px 12px rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}
    >
      {/* Corner fold */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 12,
          height: 12,
          background: '#111',
          borderLeft: `1px solid ${color}`,
          borderBottom: `1px solid ${color}`,
          borderRadius: '0 0 0 4px',
        }}
      />
      {/* Lines */}
      <div style={{ width: 22, height: 2, background: color, borderRadius: 1, marginBottom: 3, opacity: 0.7 }} />
      <div style={{ width: 16, height: 2, background: color, borderRadius: 1, opacity: 0.5 }} />
    </div>
    <div>
      <div
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 15,
          color: glow ? GREEN : 'white',
          fontWeight: 600,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 13,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  </div>
);

export const FolderStructureGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-70): Folder icon appears
  const folderSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 160 } })
    : 0;
  const folderLabelOpacity = interpolate(frame, [20, 45, 55, 70], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (70-100): Folder opens (lid flips)
  const lidAngle = interpolate(frame, [70, 100], [0, -60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Phase 3 (100-260): Files appear one by one
  const files = [
    { name: 'index.html', label: 'Your main page', color: '#f59e0b', frame: 110, x: 480, y: 180 },
    { name: 'style.css', label: 'How it looks', color: '#3b82f6', frame: 150, x: 480, y: 260 },
    { name: 'script.js', label: 'How it works', color: '#ef4444', frame: 190, x: 480, y: 340 },
    { name: 'CLAUDE.md', label: 'Instructions for Claude', color: GREEN, frame: 240, x: 480, y: 420, glow: true },
  ];

  // Phase 4 (300-380): Arrow from CLAUDE.md to Claude icon
  const arrowProgress = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const claudeIconSpring = frame >= 340
    ? spring({ frame: frame - 340, fps, config: { damping: 12, stiffness: 180 } })
    : 0;
  const claudeLabelOpacity = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (400-480): Final label
  const finalLabelOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Folder icon */}
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 250,
          transform: `scale(${interpolate(folderSpring, [0, 1], [0.6, 1])})`,
          opacity: folderSpring,
          zIndex: 20,
        }}
      >
        {/* Folder body */}
        <div
          style={{
            width: 200,
            height: 150,
            background: '#2a2a2a',
            border: '2px solid #555',
            borderRadius: '0 8px 8px 8px',
            position: 'relative',
          }}
        >
          {/* Folder tab */}
          <div
            style={{
              position: 'absolute',
              top: -22,
              left: 0,
              width: 80,
              height: 22,
              background: '#2a2a2a',
              border: '2px solid #555',
              borderBottom: 'none',
              borderRadius: '6px 6px 0 0',
            }}
          />
          {/* Folder lid */}
          <div
            style={{
              position: 'absolute',
              top: -2,
              left: -2,
              width: 204,
              height: 30,
              background: '#333',
              border: '2px solid #555',
              borderRadius: '0 8px 0 0',
              transformOrigin: 'bottom left',
              transform: `rotateX(${lidAngle}deg)`,
            }}
          />
        </div>
      </div>

      {/* "my-website" label */}
      <div
        style={{
          position: 'absolute',
          left: 250,
          top: 430,
          transform: 'translateX(-50%)',
          fontFamily: 'ui-monospace, monospace',
          fontSize: 18,
          color: 'white',
          fontWeight: 600,
          opacity: folderLabelOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        my-website/
      </div>

      {/* Connecting lines from folder to files */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {files.map((file, i) => {
          const fileSpring = file.frame <= frame
            ? spring({ frame: Math.max(0, frame - file.frame), fps, config: { damping: 14, stiffness: 160 } })
            : 0;
          return (
            <line
              key={i}
              x1={370}
              y1={330}
              x2={370 + (file.x - 370) * fileSpring}
              y2={330 + (file.y + 20 - 330) * fileSpring}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Arrow from CLAUDE.md to Claude sparkle */}
        {frame >= 300 && (
          <line
            x1={700}
            y1={445}
            x2={700 + (850 - 700) * arrowProgress}
            y2={445 + (320 - 445) * arrowProgress}
            stroke={GREEN}
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0.6}
          />
        )}
      </svg>

      {/* File icons */}
      {files.map((file, i) => {
        const fileSpring = file.frame <= frame
          ? spring({ frame: Math.max(0, frame - file.frame), fps, config: { damping: 14, stiffness: 160 } })
          : 0;
        return (
          <FileIcon
            key={i}
            name={file.name}
            label={file.label}
            x={file.x}
            y={file.y}
            opacity={fileSpring}
            scale={interpolate(fileSpring, [0, 1], [0.7, 1])}
            color={file.color}
            glow={file.glow}
          />
        );
      })}

      {/* Claude sparkle icon */}
      {frame >= 340 && (
        <div
          style={{
            position: 'absolute',
            left: 860,
            top: 270,
            transform: `scale(${claudeIconSpring})`,
            zIndex: 30,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="rgba(74,222,128,0.08)" stroke={GREEN} strokeWidth="2" opacity={0.8} />
            {/* Sparkle/star */}
            <path
              d="M40 18 L44 32 L58 32 L46 42 L50 56 L40 48 L30 56 L34 42 L22 32 L36 32 Z"
              fill={GREEN}
              opacity={0.6}
            />
          </svg>
        </div>
      )}

      {/* "Claude reads this file" label */}
      {frame >= 350 && (
        <div
          style={{
            position: 'absolute',
            left: 900,
            top: 360,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            opacity: claudeLabelOpacity,
            textAlign: 'center',
            maxWidth: 220,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Claude reads this file to understand your project
        </div>
      )}

      {/* Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 580,
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
          Claude can read, create, and edit all these files
        </div>
      )}
    </AbsoluteFill>
  );
};
