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

// Editor sidebar showing file tree
const EditorSidebar: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  envHighlight: number;
}> = ({ x, y, opacity, scale, envHighlight }) => {
  const files = [
    { name: 'my-website/', indent: 0, isFolder: true },
    { name: 'index.html', indent: 1, isFolder: false },
    { name: 'styles.css', indent: 1, isFolder: false },
    { name: 'script.js', indent: 1, isFolder: false },
    { name: '.env', indent: 1, isFolder: false, isEnv: true },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 260,
          background: '#0a0a0a',
          border: '2px solid #333',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            background: '#1a1a1a',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Explorer
        </div>
        <div style={{ padding: '10px 12px' }}>
          {files.map((file, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                paddingLeft: file.indent * 16,
                marginBottom: 6,
                padding: file.isEnv
                  ? '4px 8px 4px ' + (file.indent * 16 + 8) + 'px'
                  : '2px 8px 2px ' + (file.indent * 16 + 8) + 'px',
                borderRadius: 4,
                background: file.isEnv
                  ? `rgba(74,222,128,${envHighlight * 0.15})`
                  : 'transparent',
                border: file.isEnv
                  ? `1px solid rgba(74,222,128,${envHighlight * 0.4})`
                  : '1px solid transparent',
              }}
            >
              {file.isFolder ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill={ZINC_400}>
                  <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={file.isEnv ? GREEN : ZINC_400} strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              )}
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 12,
                  color: file.isEnv ? GREEN : file.isFolder ? 'white' : ZINC_400,
                  fontWeight: file.isFolder || file.isEnv ? 600 : 400,
                }}
              >
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// File editor panel
const FileEditor: React.FC<{
  x: number;
  y: number;
  width: number;
  opacity: number;
  scale: number;
  title: string;
  children: React.ReactNode;
}> = ({ x, y, width, opacity, scale, title, children }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `scale(${scale})`,
      zIndex: 20,
    }}
  >
    <div
      style={{
        width,
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
          padding: '8px 12px',
          background: '#1a1a1a',
          gap: 6,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <span
          style={{
            marginLeft: 8,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 11,
            color: GREEN,
            fontWeight: 600,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ padding: '14px 16px' }}>{children}</div>
    </div>
  </div>
);

export const EnvSetupGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–100): Sidebar appears
  const sidebarSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const sidebarLabel = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (100–200): .env file highlights + editor appears
  const envHighlight = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const editorSpring = frame >= 110
    ? spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const envLabel = interpolate(frame, [160, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (200–320): Code comparison appears
  const comparisonSpring = frame >= 210
    ? spring({ frame: frame - 210, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const badOpacity = interpolate(frame, [230, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const goodOpacity = interpolate(frame, [260, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const compLabel = interpolate(frame, [290, 315], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (320–400): Shield icon
  const shieldSpring = frame >= 330
    ? spring({ frame: frame - 330, fps, config: { damping: 12, stiffness: 120 } })
    : 0;

  const shieldPulse = frame >= 350 ? 0.6 + 0.4 * Math.sin((frame - 350) * 0.1) : 0;

  // Phase 5 (400–480): Final label
  const finalOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Phase 1: Sidebar */}
      <EditorSidebar
        x={60}
        y={60}
        opacity={sidebarSpring}
        scale={interpolate(sidebarSpring, [0, 1], [0.8, 1])}
        envHighlight={envHighlight}
      />

      {/* Phase 1 label */}
      <div
        style={{
          position: 'absolute',
          left: 190,
          top: 330,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 15,
          color: GREEN,
          fontWeight: 600,
          opacity: sidebarLabel,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Your project files
      </div>

      {/* Arrow: sidebar → editor */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {frame >= 100 && (
          <line
            x1={320}
            y1={180}
            x2={320 + (380 - 320) * envHighlight}
            y2={180}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}
        {/* Arrow: editor → comparison */}
        {frame >= 200 && (
          <line
            x1={640}
            y1={280}
            x2={640}
            y2={280 + (420 - 280) * interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) })}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}
      </svg>

      {/* Phase 2: .env editor */}
      <FileEditor
        x={400}
        y={60}
        width={480}
        opacity={editorSpring}
        scale={interpolate(editorSpring, [0, 1], [0.8, 1])}
        title=".env"
      >
        <div style={{ lineHeight: 1.8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#555', userSelect: 'none', width: 20, textAlign: 'right' }}>1</span>
            <TypingText text="STRIPE_API_KEY=sk_test_4eC39HqLyjWD..." startFrame={125} speed={1.5} color={GREEN} fontSize={12} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#555', userSelect: 'none', width: 20, textAlign: 'right' }}>2</span>
            <TypingText text="DATABASE_URL=postgres://user:pass@..." startFrame={155} speed={1.5} color={GREEN} fontSize={12} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#555', userSelect: 'none', width: 20, textAlign: 'right' }}>3</span>
            <TypingText text="WEATHER_API_KEY=abc123def456" startFrame={180} speed={1.5} color={GREEN} fontSize={12} />
          </div>
        </div>
      </FileEditor>

      {/* Phase 2 label */}
      {frame >= 160 && (
        <div
          style={{
            position: 'absolute',
            left: 640,
            top: 280,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: ZINC_400,
            opacity: envLabel,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Secrets live here — never in your code
        </div>
      )}

      {/* Phase 3: Code comparison */}
      {frame >= 210 && (
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 420,
            opacity: comparisonSpring,
            transform: `scale(${interpolate(comparisonSpring, [0, 1], [0.8, 1])})`,
            zIndex: 20,
            display: 'flex',
            gap: 30,
          }}
        >
          {/* Bad: hardcoded */}
          <div
            style={{
              width: 440,
              background: '#0a0a0a',
              border: `2px solid rgba(248,113,113,${badOpacity * 0.5})`,
              borderRadius: 12,
              overflow: 'hidden',
              opacity: badOpacity,
            }}
          >
            <div style={{ padding: '8px 12px', background: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Red X */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="rgba(248,113,113,0.2)" stroke={RED} strokeWidth="2" />
                <path d="M8 8L16 16M16 8L8 16" stroke={RED} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: RED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Don't do this
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: ZINC_400 }}>
                const key = </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: RED }}>
                "sk_test_4eC39..."</span>
            </div>
          </div>

          {/* Good: from .env */}
          <div
            style={{
              width: 440,
              background: '#0a0a0a',
              border: `2px solid rgba(74,222,128,${goodOpacity * 0.5})`,
              borderRadius: 12,
              overflow: 'hidden',
              opacity: goodOpacity,
            }}
          >
            <div style={{ padding: '8px 12px', background: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Green check */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="rgba(74,222,128,0.2)" stroke={GREEN} strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: GREEN, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Do this instead
              </span>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: ZINC_400 }}>
                const key = </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: GREEN }}>
                process.env.STRIPE_API_KEY</span>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3 label */}
      {frame >= 290 && (
        <div
          style={{
            position: 'absolute',
            left: 640,
            top: 590,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: compLabel,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Read from .env — don't hardcode secrets
        </div>
      )}

      {/* Phase 4: Shield */}
      {frame >= 330 && (
        <div
          style={{
            position: 'absolute',
            left: 950,
            top: 100,
            opacity: shieldSpring,
            transform: `scale(${interpolate(shieldSpring, [0, 1], [0.5, 1])})`,
            zIndex: 25,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(74,222,128,${shieldPulse * 0.3}) 0%, transparent 70%)`,
              top: -10,
              left: -10,
            }}
          />
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M50 10 L85 30 V55 C85 75 68 90 50 95 C32 90 15 75 15 55 V30 Z"
              fill="rgba(74,222,128,0.1)"
              stroke={GREEN}
              strokeWidth="2.5"
            />
            <path
              d="M38 50 L47 59 L63 40"
              fill="none"
              stroke={GREEN}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 13,
              color: GREEN,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Protected
          </div>
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
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: finalOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Secrets stay safe, code stays clean
        </div>
      )}
    </AbsoluteFill>
  );
};
