import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
  Sequence,
  AbsoluteFill,
} from 'remotion';
import {
  AnimatedCursor,
  ClickRipple,
  Label,
  AnnotationArrow,
  TypingText,
  BlinkingCursor,
  GREEN,
} from './shared';

// Simplified Windows desktop
const WindowsDesktop: React.FC<{ opacity: number }> = ({ opacity }) => (
  <AbsoluteFill style={{ opacity }}>
    {/* Wallpaper */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #0c1929 0%, #1b2838 40%, #172135 100%)',
      }}
    />
    {/* Taskbar */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 48,
        background: 'rgba(24,24,28,0.95)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        gap: 8,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Windows icon / Start button */}
      <div
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white" opacity={0.9}>
          <rect x="1" y="1" width="8" height="8" rx="1" />
          <rect x="11" y="1" width="8" height="8" rx="1" />
          <rect x="1" y="11" width="8" height="8" rx="1" />
          <rect x="11" y="11" width="8" height="8" rx="1" />
        </svg>
      </div>
      {/* Search icon */}
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      {/* Taskbar icons */}
      {['#3b82f6', '#f59e0b', '#22c55e', '#8b5cf6'].map((color, i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: color,
            opacity: 0.6,
          }}
        />
      ))}
      {/* System tray */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>11:42 AM</span>
      </div>
    </div>
  </AbsoluteFill>
);

// Windows Start button glow
const StartButtonGlow: React.FC<{ intensity: number }> = ({ intensity }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 6,
      left: 6,
      width: 44,
      height: 44,
      borderRadius: 8,
      boxShadow: `0 0 ${20 * intensity}px ${GREEN}${Math.round(intensity * 80).toString(16).padStart(2, '0')}`,
      border: `2px solid ${GREEN}${Math.round(intensity * 200).toString(16).padStart(2, '0')}`,
      zIndex: 55,
      pointerEvents: 'none',
    }}
  />
);

// Windows Start Menu
const StartMenu: React.FC<{
  opacity: number;
  translateY: number;
  children?: React.ReactNode;
}> = ({ opacity, translateY, children }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 56,
      left: 12,
      width: 500,
      opacity,
      transform: `translateY(${translateY}px)`,
      zIndex: 60,
    }}
  >
    <div
      style={{
        background: 'rgba(32,32,36,0.97)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}
    >
      {/* Search bar */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div
          style={{
            background: 'rgba(60,60,65,0.8)',
            borderRadius: 8,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <div style={{ fontSize: 14, color: 'white', fontFamily: 'system-ui, sans-serif', flex: 1 }}>
            {children}
          </div>
        </div>
      </div>
      {/* Pinned section */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>Pinned</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#ec4899'].map((color, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64, padding: '8px 0' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: color, opacity: 0.6 }} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'system-ui, sans-serif' }}>App</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Search result in start menu
const SearchResult: React.FC<{
  opacity: number;
  highlighted: boolean;
}> = ({ opacity, highlighted }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 56,
      left: 12,
      width: 500,
      opacity,
      zIndex: 61,
    }}
  >
    <div
      style={{
        background: 'rgba(32,32,36,0.97)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}
    >
      {/* Search bar with typed text */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div
          style={{
            background: 'rgba(60,60,65,0.8)',
            borderRadius: 8,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <div style={{ fontSize: 14, fontFamily: 'system-ui, sans-serif', color: 'white' }}>
            <TypingText text="PowerShell" startFrame={160} framesPerChar={5} />
          </div>
        </div>
      </div>
      {/* Result */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>Best match</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 12px',
            borderRadius: 8,
            background: highlighted ? 'rgba(74,222,128,0.15)' : 'rgba(50,50,55,0.5)',
            border: highlighted ? `1px solid ${GREEN}44` : '1px solid transparent',
            gap: 12,
          }}
        >
          {/* PowerShell icon */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              background: '#012456',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #1e3a6e',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#5b9bd5', fontSize: 16, fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>PS</span>
          </div>
          <div>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>Windows PowerShell</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'system-ui, sans-serif' }}>Desktop app</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// PowerShell terminal window
const PowerShellWindow: React.FC<{
  scale: number;
  opacity: number;
}> = ({ scale, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: '38%',
      left: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
      width: 620,
      opacity,
      zIndex: 70,
    }}
  >
    <div
      style={{
        background: '#012456',
        borderRadius: 8,
        border: '1px solid #1e3a6e',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          background: '#0c0c0c',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 3,
            background: '#012456',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#5b9bd5', fontSize: 9, fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>PS</span>
        </div>
        <span style={{ flex: 1, color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>Windows PowerShell</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>—</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>□</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>×</span>
        </div>
      </div>
      {/* Terminal body */}
      <div style={{ padding: '16px 20px', minHeight: 120 }}>
        <div style={{ color: '#cccccc', fontFamily: 'ui-monospace, monospace', fontSize: 13, marginBottom: 4 }}>
          Windows PowerShell
        </div>
        <div style={{ color: '#cccccc', fontFamily: 'ui-monospace, monospace', fontSize: 13, marginBottom: 4 }}>
          Copyright (C) Microsoft Corporation.
        </div>
        <div style={{ height: 16 }} />
        <span style={{ color: '#cccccc', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
          {'PS C:\\Users\\you> '}
        </span>
        <BlinkingCursor color="#cccccc" />
      </div>
    </div>
  </div>
);

export const WindowsTerminalGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-55): Desktop fades in (label fades out before next phase)
  const desktopOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const desktopLabelOpacity = interpolate(frame, [15, 30, 40, 55], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  // Phase 2 (60-115): Start button glows, cursor moves and clicks
  const glowIntensity = interpolate(frame, [60, 80, 100], [0, 1, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorToStartX = interpolate(frame, [65, 85], [300, 28], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const cursorToStartY = interpolate(frame, [65, 85], [400, 696], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const startClickRipple = frame >= 90
    ? interpolate(frame, [90, 105], [0, 1], { extrapolateRight: 'clamp' })
    : 0;
  const startLabelOpacity = interpolate(frame, [65, 80], [0, 1], { extrapolateRight: 'clamp' });

  // Phase 3 (120-160): Start menu opens
  const menuSpring = frame >= 120
    ? spring({ frame: frame - 120, fps, config: { damping: 15, stiffness: 160 } })
    : 0;
  const menuOpacity = interpolate(menuSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
  const menuTranslateY = interpolate(menuSpring, [0, 1], [20, 0], { extrapolateRight: 'clamp' });

  // Phase 4 (160-235): Typing "PowerShell", result appears
  const showSearchResult = frame >= 195;
  const resultHighlighted = frame >= 220;

  // Phase 5 (235-290): Cursor clicks result, menu closes
  const cursorToResultX = interpolate(frame, [235, 255], [28, 270], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const cursorToResultY = interpolate(frame, [235, 255], [696, 580], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const resultClickRipple = frame >= 260
    ? interpolate(frame, [260, 275], [0, 1], { extrapolateRight: 'clamp' })
    : 0;
  const menuDismiss = interpolate(frame, [263, 280], [1, 0], { extrapolateRight: 'clamp' });

  // Phase 6 (290-380): PowerShell opens
  const psSpring = frame >= 290
    ? spring({ frame: frame - 290, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const psScale = interpolate(psSpring, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });
  const psOpacity = interpolate(psSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const psLabelOpacity = interpolate(frame, [325, 345], [0, 1], { extrapolateRight: 'clamp' });

  // Phase 7 (380-480): Hold, annotation
  const annotationOpacity = interpolate(frame, [390, 410], [0, 1], { extrapolateRight: 'clamp' });

  // Cursor visibility
  const showCursorPhase1 = frame >= 65 && frame < 115;
  const showCursorPhase2 = frame >= 235 && frame < 285;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Desktop */}
      <WindowsDesktop opacity={desktopOpacity} />

      {/* Desktop label — fades out completely before next phase */}
      <Sequence from={0} durationInFrames={55}>
        <Label text="Your Windows desktop" x={640} y={380} opacity={desktopLabelOpacity} />
      </Sequence>

      {/* Start button glow */}
      {frame >= 60 && frame < 115 && <StartButtonGlow intensity={glowIntensity} />}

      {/* Start button label */}
      <Sequence from={60} durationInFrames={55}>
        <Label text="Click the Start button" x={120} y={650} opacity={startLabelOpacity} fontSize={16} color="#ccc" />
      </Sequence>

      {/* Cursor moving to start */}
      {showCursorPhase1 && (
        <>
          <AnimatedCursor x={cursorToStartX} y={cursorToStartY} />
          {frame >= 90 && <ClickRipple x={cursorToStartX + 4} y={cursorToStartY + 4} progress={startClickRipple} />}
        </>
      )}

      {/* Start Menu / Search results */}
      {frame >= 120 && frame < 285 && (
        <div style={{ opacity: frame >= 263 ? menuDismiss : 1 }}>
          {showSearchResult ? (
            <SearchResult opacity={1} highlighted={resultHighlighted} />
          ) : (
            <StartMenu opacity={menuOpacity} translateY={menuTranslateY}>
              {frame >= 160 && <TypingText text="PowerShell" startFrame={160} framesPerChar={5} />}
            </StartMenu>
          )}
        </div>
      )}

      {/* Cursor moving to result */}
      {showCursorPhase2 && (
        <>
          <AnimatedCursor x={cursorToResultX} y={cursorToResultY} />
          {frame >= 260 && <ClickRipple x={cursorToResultX + 4} y={cursorToResultY + 4} progress={resultClickRipple} />}
        </>
      )}

      {/* PowerShell window */}
      {frame >= 290 && (
        <>
          <PowerShellWindow scale={psScale} opacity={psOpacity} />
          <Label text="You're in! This is your terminal." x={640} y={470} opacity={psLabelOpacity} fontSize={16} color={GREEN} />
        </>
      )}

      {/* Final annotation */}
      {frame >= 380 && (
        <AnnotationArrow
          x={410}
          y={510}
          label="This is where you'll paste commands"
          opacity={annotationOpacity}
          direction="up"
        />
      )}
    </AbsoluteFill>
  );
};
