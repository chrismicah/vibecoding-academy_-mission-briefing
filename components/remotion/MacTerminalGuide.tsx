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
  KeyIcon,
  BlinkingCursor,
  GREEN,
} from './shared';

// Simplified Mac desktop
const MacDesktop: React.FC<{ opacity: number }> = ({ opacity }) => (
  <AbsoluteFill style={{ opacity }}>
    {/* Wallpaper - dark gradient */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      }}
    />
    {/* Menu bar */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        background: 'rgba(30,30,30,0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        gap: 16,
      }}
    >
      <svg width="14" height="17" viewBox="0 0 14 17" fill="white" opacity={0.8}>
        <path d="M11.5 12.5c-.7 1.2-1.4 2.3-2.5 2.3-1.1 0-1.4-.7-2.7-.7-1.3 0-1.7.7-2.7.7-1.1 0-2-1.2-2.7-2.4C.1 10.9-.2 9.1.3 7.7c.4-.9 1.2-1.5 2.1-1.5 1.1 0 1.7.7 2.7.7.9 0 1.5-.7 2.7-.7.8 0 1.6.4 2.1 1.1-1.8 1-1.5 3.6.3 4.4-.4.9-.8 1.5-1.2 2.1-.4-.7 0 0 0 0zM9.2 4.4c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.8 1-.4.5-.7 1.2-.6 1.9.7 0 1.4-.4 1.8-1z" />
      </svg>
      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>Finder</span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>File</span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>Edit</span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>View</span>
    </div>
    {/* Dock */}
    <div
      style={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        height: 56,
        background: 'rgba(40,40,40,0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Dock icons - simplified colored squares */}
      {['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#ec4899', '#06b6d4'].map((color, i) => (
        <div
          key={i}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: color,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  </AbsoluteFill>
);

// Spotlight search bar
const SpotlightBar: React.FC<{
  opacity: number;
  scale: number;
  children?: React.ReactNode;
}> = ({ opacity, scale, children }) => (
  <div
    style={{
      position: 'absolute',
      top: 180,
      left: '50%',
      transform: `translateX(-50%) scale(${scale})`,
      width: 560,
      opacity,
      zIndex: 60,
    }}
  >
    <div
      style={{
        background: 'rgba(40,40,42,0.95)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}
    >
      {/* Search input area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px 16px',
          gap: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <div style={{ flex: 1, fontSize: 18, color: 'white', fontFamily: 'system-ui, sans-serif' }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

// Spotlight search result
const SpotlightResult: React.FC<{
  opacity: number;
  highlighted: boolean;
}> = ({ opacity, highlighted }) => (
  <div
    style={{
      position: 'absolute',
      top: 232,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 560,
      opacity,
      zIndex: 60,
    }}
  >
    <div
      style={{
        background: 'rgba(40,40,42,0.95)',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        border: '1px solid rgba(255,255,255,0.15)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        padding: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 12px',
          borderRadius: 8,
          background: highlighted ? 'rgba(74,222,128,0.15)' : 'transparent',
          border: highlighted ? `1px solid ${GREEN}44` : '1px solid transparent',
          gap: 10,
          transition: 'none',
        }}
      >
        {/* Terminal icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #333',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#eee', fontSize: 14, fontFamily: 'ui-monospace, monospace', fontWeight: 700 }}>{'>_'}</span>
        </div>
        <div>
          <div style={{ color: 'white', fontSize: 14, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>Terminal</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'system-ui, sans-serif' }}>Application</div>
        </div>
      </div>
    </div>
  </div>
);

// Mac terminal window
const MacTerminalWindow: React.FC<{
  scale: number;
  opacity: number;
}> = ({ scale, opacity }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 600,
        opacity,
        zIndex: 70,
      }}
    >
      <div
        style={{
          background: '#1a1a1a',
          borderRadius: 10,
          border: '1px solid #333',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 14px',
            background: '#2a2a2a',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>Terminal — zsh</span>
        </div>
        {/* Terminal body */}
        <div style={{ padding: '16px 20px', minHeight: 120 }}>
          <span style={{ color: '#888', fontFamily: 'ui-monospace, monospace', fontSize: 14 }}>
            user@mac ~ %{' '}
          </span>
          <BlinkingCursor />
        </div>
      </div>
    </div>
  );
};

export const MacTerminalGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-55): Desktop fades in with label (label fades out before keys appear)
  const desktopOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const desktopLabelOpacity = interpolate(frame, [15, 30, 40, 55], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  // Phase 2 (60-120): Keys appear and press
  const keysOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' });
  const keysPressed = frame >= 85;
  const keysFadeOut = interpolate(frame, [100, 115], [1, 0], { extrapolateRight: 'clamp' });
  const keysLabelOpacity = interpolate(frame, [65, 80, 100, 115], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  // Phase 3 (120-160): Spotlight appears
  const spotlightSpring = frame >= 120
    ? spring({ frame: frame - 120, fps, config: { damping: 15, stiffness: 180 } })
    : 0;
  const spotlightOpacity = interpolate(spotlightSpring, [0, 0.5], [0, 1], { extrapolateRight: 'clamp' });
  const spotlightScale = interpolate(spotlightSpring, [0, 1], [0.9, 1], { extrapolateRight: 'clamp' });

  // Phase 4 (160-240): Typing "Terminal", result appears
  const resultOpacity = interpolate(frame, [200, 215], [0, 1], { extrapolateRight: 'clamp' });
  const resultHighlighted = frame >= 225;

  // Phase 5 (240-290): Cursor moves to result and clicks, spotlight closes
  const cursorToResultX = interpolate(frame, [240, 260], [400, 640], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const cursorToResultY = interpolate(frame, [240, 260], [300, 256], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const clickHappens = frame >= 265 && frame < 273;
  const clickRippleProgress = frame >= 265
    ? interpolate(frame, [265, 280], [0, 1], { extrapolateRight: 'clamp' })
    : 0;
  const spotlightDismiss = interpolate(frame, [268, 282], [1, 0], { extrapolateRight: 'clamp' });

  // Phase 6 (290-380): Terminal window opens
  const terminalSpring = frame >= 290
    ? spring({ frame: frame - 290, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const terminalScale = interpolate(terminalSpring, [0, 1], [0.7, 1], { extrapolateRight: 'clamp' });
  const terminalOpacity = interpolate(terminalSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const terminalLabelOpacity = interpolate(frame, [325, 345], [0, 1], { extrapolateRight: 'clamp' });

  // Phase 7 (380-480): Hold, annotation
  const annotationOpacity = interpolate(frame, [390, 410], [0, 1], { extrapolateRight: 'clamp' });

  // Cursor visibility phases
  const showCursor = frame >= 240 && frame < 290;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Desktop */}
      <MacDesktop opacity={desktopOpacity} />

      {/* "Your Mac desktop" label — fades out completely before keys appear */}
      <Sequence from={0} durationInFrames={55}>
        <Label text="Your Mac desktop" x={640} y={380} opacity={desktopLabelOpacity} />
      </Sequence>

      {/* Keys: ⌘ + Space */}
      <Sequence from={60} durationInFrames={60}>
        <div style={{ opacity: keysOpacity * keysFadeOut }}>
          <KeyIcon label="⌘" pressed={keysPressed} x={580} y={300} />
          <div style={{ position: 'absolute', left: 632, top: 308, color: '#666', fontSize: 20, fontWeight: 700 }}>+</div>
          <KeyIcon label="Space" pressed={keysPressed} x={700} y={300} />
          <Label text="Press Command + Space" x={640} y={380} opacity={keysLabelOpacity} fontSize={16} color="#ccc" />
        </div>
      </Sequence>

      {/* Spotlight */}
      {frame >= 120 && frame < 290 && (
        <div style={{ opacity: frame >= 268 ? spotlightDismiss : 1 }}>
          <SpotlightBar opacity={spotlightOpacity} scale={spotlightScale}>
            {frame >= 160 && <TypingText text="Terminal" startFrame={160} framesPerChar={5} style={{ color: 'white' }} />}
          </SpotlightBar>
          {frame >= 200 && (
            <SpotlightResult opacity={resultOpacity * (frame >= 268 ? spotlightDismiss : 1)} highlighted={resultHighlighted} />
          )}
        </div>
      )}

      {/* Cursor moving to result */}
      {showCursor && (
        <>
          <AnimatedCursor x={cursorToResultX} y={cursorToResultY} clicking={clickHappens} />
          {frame >= 265 && <ClickRipple x={cursorToResultX + 4} y={cursorToResultY + 4} progress={clickRippleProgress} />}
        </>
      )}

      {/* Terminal window */}
      {frame >= 290 && (
        <>
          <MacTerminalWindow scale={terminalScale} opacity={terminalOpacity} />
          <Label text="You're in! This is your terminal." x={640} y={480} opacity={terminalLabelOpacity} fontSize={16} color={GREEN} />
        </>
      )}

      {/* Final annotation */}
      {frame >= 380 && (
        <AnnotationArrow
          x={370}
          y={520}
          label="This is where you'll paste commands"
          opacity={annotationOpacity}
          direction="up"
        />
      )}
    </AbsoluteFill>
  );
};
