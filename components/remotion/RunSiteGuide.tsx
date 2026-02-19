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
const ZINC_400 = '#a1a1aa';

// Terminal window component
const TerminalWindow: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  scale: number;
  title: string;
  children: React.ReactNode;
}> = ({ x, y, width, height, opacity, scale, title, children }) => (
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
        minHeight: height,
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
            fontFamily: 'system-ui, sans-serif',
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ padding: '14px 16px' }}>{children}</div>
    </div>
  </div>
);

// File icon component
const FileIcon: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  label: string;
  glowing?: boolean;
}> = ({ x, y, opacity, scale, label, glowing }) => {
  const frame = useCurrentFrame();
  const pulse = glowing ? 0.6 + 0.4 * Math.sin(frame * 0.1) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale}) translateX(-50%)`,
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {glowing && (
        <div
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(74,222,128,${pulse * 0.3}) 0%, transparent 70%)`,
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
        <path
          d="M4 4 H36 L52 20 V60 H4 Z"
          fill="#1a2e1a"
          stroke={GREEN}
          strokeWidth="2"
        />
        <path d="M36 4 V20 H52" fill="none" stroke={GREEN} strokeWidth="2" />
        <text x="28" y="44" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill={GREEN}>
          .md
        </text>
      </svg>
      <span
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 13,
          color: GREEN,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Typing text helper
const TypingText: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
  color?: string;
  fontSize?: number;
  mono?: boolean;
}> = ({ text, startFrame, speed = 2, color = 'rgba(255,255,255,0.8)', fontSize = 13, mono = true }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed / speed), text.length);
  const displayText = frame >= startFrame ? text.slice(0, charsToShow) : '';

  return (
    <span
      style={{
        fontFamily: mono ? 'ui-monospace, monospace' : 'system-ui, sans-serif',
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

export const RunSiteGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–100): Terminal appears + prompt types out
  const termSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const step1LabelOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (100–200): File appears in center
  const fileSpring = frame >= 110
    ? spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 120 } })
    : 0;

  const arrowProgress1 = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const fileLabelOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (200–320): Second terminal appears with "refer to" command
  const term2Spring = frame >= 210
    ? spring({ frame: frame - 210, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const step2LabelOpacity = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowProgress2 = interpolate(frame, [200, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Phase 4 (320–400): Browser preview appears
  const browserSpring = frame >= 330
    ? spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  const arrowProgress3 = interpolate(frame, [320, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Phase 5 (400–480): "Repeat anytime" loop label
  const finalOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const loopPulse = frame >= 400 ? 0.6 + 0.4 * Math.sin((frame - 400) * 0.08) : 0;

  // Positions
  const term1X = 60;
  const term1Y = 80;
  const fileX = 590;
  const fileY = 100;
  const term2X = 60;
  const term2Y = 400;
  const browserX = 820;
  const browserY = 380;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Step 1: Terminal with create prompt */}
      <TerminalWindow
        x={term1X}
        y={term1Y}
        width={420}
        height={120}
        opacity={termSpring}
        scale={interpolate(termSpring, [0, 1], [0.8, 1])}
        title="Claude Code"
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: ZINC_400 }}>$</span>
          <TypingText
            text={`Create a 'how_to_run.md' with instructions on how to run this project`}
            startFrame={15}
            speed={1.5}
          />
        </div>
        {frame >= 85 && (
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 12,
                color: GREEN,
                opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              Created how_to_run.md
            </span>
          </div>
        )}
      </TerminalWindow>

      {/* Step 1 label */}
      <div
        style={{
          position: 'absolute',
          left: term1X + 210,
          top: term1Y + 170,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 15,
          color: GREEN,
          fontWeight: 600,
          opacity: step1LabelOpacity,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        1. Ask Claude to create the file
      </div>

      {/* Arrow 1: Terminal → File */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {frame >= 100 && (
          <line
            x1={term1X + 420}
            y1={term1Y + 80}
            x2={term1X + 420 + (fileX - term1X - 420) * arrowProgress1}
            y2={term1Y + 80 + (fileY + 32 - term1Y - 80) * arrowProgress1}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}

        {/* Arrow 2: File → Terminal 2 */}
        {frame >= 200 && (
          <line
            x1={fileX}
            y1={fileY + 80}
            x2={fileX + (term2X + 420 - fileX) * arrowProgress2}
            y2={fileY + 80 + (term2Y + 40 - fileY - 80) * arrowProgress2}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}

        {/* Arrow 3: Terminal 2 → Browser */}
        {frame >= 320 && (
          <line
            x1={term2X + 420}
            y1={term2Y + 60}
            x2={term2X + 420 + (browserX - term2X - 420) * arrowProgress3}
            y2={term2Y + 60 + (browserY + 50 - term2Y - 60) * arrowProgress3}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        )}
      </svg>

      {/* File icon */}
      <FileIcon
        x={fileX}
        y={fileY}
        opacity={fileSpring}
        scale={interpolate(fileSpring, [0, 1], [0.7, 1])}
        label="how_to_run.md"
        glowing={frame >= 150}
      />

      {/* File label */}
      {frame >= 130 && (
        <div
          style={{
            position: 'absolute',
            left: fileX,
            top: fileY + 110,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: ZINC_400,
            opacity: fileLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
            textAlign: 'center',
          }}
        >
          Your personal cheat sheet
        </div>
      )}

      {/* Step 2: Terminal with "refer to" command */}
      <TerminalWindow
        x={term2X}
        y={term2Y}
        width={420}
        height={100}
        opacity={term2Spring}
        scale={interpolate(term2Spring, [0, 1], [0.8, 1])}
        title="Claude Code"
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: ZINC_400 }}>$</span>
          <TypingText
            text="Refer to how_to_run.md to run this"
            startFrame={230}
            speed={2}
          />
        </div>
        {frame >= 290 && (
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: 12,
                color: GREEN,
                opacity: interpolate(frame, [290, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              }}
            >
              Server running at localhost:3000
            </span>
          </div>
        )}
      </TerminalWindow>

      {/* Step 2 label */}
      {frame >= 220 && (
        <div
          style={{
            position: 'absolute',
            left: term2X + 210,
            top: term2Y + 140,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: step2LabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          2. Tell Claude to follow the file
        </div>
      )}

      {/* Browser preview */}
      <div
        style={{
          position: 'absolute',
          left: browserX,
          top: browserY,
          opacity: browserSpring,
          transform: `scale(${interpolate(browserSpring, [0, 1], [0.8, 1])})`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 340,
            height: 200,
            background: '#1a1a1a',
            border: '2px solid #444',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#252525',
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 20,
                background: '#1a1a1a',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
              }}
            >
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 10,
                  color: GREEN,
                }}
              >
                localhost:3000
              </span>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            {frame >= 350 && (
              <>
                <div
                  style={{
                    width: 180,
                    height: 16,
                    background: 'white',
                    borderRadius: 3,
                    opacity: 0.85,
                    marginBottom: 10,
                  }}
                />
                <div
                  style={{
                    width: 240,
                    height: 8,
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: 2,
                    marginBottom: 5,
                  }}
                />
                <div
                  style={{
                    width: 160,
                    height: 8,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    marginBottom: 14,
                  }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <div
                    style={{
                      width: 70,
                      height: 28,
                      background: GREEN,
                      borderRadius: 6,
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      width: 70,
                      height: 28,
                      border: `1px solid ${GREEN}`,
                      borderRadius: 6,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Browser label */}
      {frame >= 350 && (
        <div
          style={{
            position: 'absolute',
            left: browserX + 170,
            top: browserY + 215,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: interpolate(frame, [350, 380], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          3. Your site is live!
        </div>
      )}

      {/* Cycle loop + final message */}
      {frame >= 400 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 310,
              transform: 'translateX(-50%)',
              opacity: loopPulse,
              zIndex: 40,
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="18"
                fill="none"
                stroke={GREEN}
                strokeWidth="2"
                strokeDasharray="10 4"
                opacity={0.5}
              />
              <path
                d="M35 20 L40 25 L35 30"
                fill="none"
                stroke={GREEN}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
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
              zIndex: 20,
            }}
          >
            Use this every time you want to run your site
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
