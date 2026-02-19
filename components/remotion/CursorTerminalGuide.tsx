import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const GREEN = '#4ade80';
const CURSOR_PURPLE = '#8B5CF6';

// Cursor IDE with built-in terminal at bottom
const CursorWithTerminal: React.FC<{
  opacity: number;
  scale: number;
  frame: number;
  showCode: boolean;
  terminalActive: boolean;
  label?: string;
}> = ({ opacity, scale, frame, showCode, terminalActive, label }) => {
  const claudeCmd = 'claude';
  const promptText = 'Add a hero section with my name and a tagline';

  // Terminal typing
  const claudeElapsed = terminalActive ? Math.max(0, frame - 60) : 0;
  const claudeChars = Math.min(Math.floor(claudeElapsed / 4), claudeCmd.length);
  const typedClaude = claudeCmd.slice(0, claudeChars);
  const claudeDone = claudeElapsed > claudeCmd.length * 4 + 10;

  const promptElapsed = claudeDone ? Math.max(0, frame - 110) : 0;
  const promptChars = Math.min(Math.floor(promptElapsed / 1.5), promptText.length);
  const typedPrompt = promptText.slice(0, promptChars);
  const promptDone = promptElapsed > promptText.length * 1.5 + 10;

  // Code appearing in editor
  const codeLines = [
    '<section class="hero">',
    '  <h1>Alex Chen</h1>',
    '  <p>Building the future,',
    '     one prompt at a time</p>',
    '</section>',
  ];
  const codeStart = frame - 180;
  const visibleLines = showCode ? Math.min(Math.floor(Math.max(0, codeStart) / 8), codeLines.length) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 800,
        height: 460,
        opacity,
        zIndex: 30,
      }}
    >
      {label && (
        <div
          style={{
            position: 'absolute',
            top: -32,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 13,
            color: CURSOR_PURPLE,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1e1e1e',
          borderRadius: 10,
          border: `2px solid ${CURSOR_PURPLE}55`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${CURSOR_PURPLE}11`,
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
            background: '#2d2d3d',
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

        {/* Editor area */}
        <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
          {/* Sidebar */}
          <div
            style={{
              width: 160,
              background: '#252536',
              borderRight: '1px solid #333',
              padding: '10px 0',
            }}
          >
            <div style={{ padding: '0 10px', marginBottom: 8 }}>
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Explorer
              </span>
            </div>
            <div
              style={{
                padding: '3px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span style={{ fontSize: 12 }}>📁</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                my-website
              </span>
            </div>
            {visibleLines > 0 && (
              <div
                style={{
                  padding: '3px 10px 3px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(139,92,246,0.1)',
                }}
              >
                <span style={{ fontSize: 10 }}>📄</span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: CURSOR_PURPLE, fontWeight: 500 }}>
                  index.html
                </span>
              </div>
            )}
          </div>

          {/* Code editor */}
          <div style={{ flex: 1, padding: '14px 16px', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
            {visibleLines > 0 ? (
              <div>
                <div style={{ marginBottom: 6, fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
                  index.html
                </div>
                {codeLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, lineHeight: 1.7 }}>
                    <span style={{ color: 'rgba(255,255,255,0.15)', minWidth: 20, textAlign: 'right', fontSize: 11 }}>{i + 1}</span>
                    <span style={{ color: line.includes('class=') || line.includes('<') ? '#7dd3fc' : 'rgba(255,255,255,0.7)' }}>{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.1)' }}>
                  index.html
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Built-in terminal panel */}
        <div
          style={{
            height: 130,
            background: '#1a1a2e',
            borderTop: `1px solid ${CURSOR_PURPLE}33`,
            flexShrink: 0,
          }}
        >
          {/* Terminal tab bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 10px',
              background: '#222238',
              gap: 14,
              fontSize: 10,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Problems</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Output</span>
            <span
              style={{
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
                borderBottom: `2px solid ${CURSOR_PURPLE}`,
                paddingBottom: 2,
              }}
            >
              Terminal
            </span>
          </div>

          {/* Terminal content */}
          <div style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
            {/* Line 1: claude command */}
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: GREEN }}>$</span>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>
                {typedClaude}
                {!claudeDone && terminalActive && (
                  <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
                )}
              </span>
            </div>

            {/* Line 2: Claude ready */}
            {claudeDone && (
              <div style={{ marginTop: 4, color: GREEN, fontSize: 11, opacity: 0.8 }}>
                ✓ Claude Code ready
              </div>
            )}

            {/* Line 3: User prompt */}
            {claudeDone && (
              <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
                <span style={{ color: CURSOR_PURPLE }}>{'>'}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                  {typedPrompt}
                  {!promptDone && (
                    <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
                  )}
                </span>
              </div>
            )}

            {/* Line 4: Working... */}
            {promptDone && !showCode && (
              <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                Working...
              </div>
            )}
            {showCode && (
              <div style={{ marginTop: 4, color: GREEN, fontSize: 11, opacity: 0.8 }}>
                ✓ Created index.html with hero section
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Small split-view: external terminal
const ExternalTerminal: React.FC<{
  opacity: number;
  scale: number;
  frame: number;
  startFrame: number;
}> = ({ opacity, scale, frame, startFrame }) => {
  const claudeCmd = 'claude';
  const promptText = 'Add a contact form below the hero';

  const elapsed1 = Math.max(0, frame - startFrame - 20);
  const chars1 = Math.min(Math.floor(elapsed1 / 4), claudeCmd.length);
  const typed1 = claudeCmd.slice(0, chars1);
  const cmd1Done = elapsed1 > claudeCmd.length * 4 + 10;

  const elapsed2 = cmd1Done ? Math.max(0, frame - startFrame - 70) : 0;
  const chars2 = Math.min(Math.floor(elapsed2 / 1.5), promptText.length);
  const typed2 = promptText.slice(0, chars2);
  const cmd2Done = elapsed2 > promptText.length * 1.5 + 10;

  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        top: '50%',
        transform: `translateY(-50%) scale(${scale})`,
        width: 440,
        opacity,
        zIndex: 30,
      }}
    >
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11,
          color: GREEN,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        External Terminal
      </div>
      <div
        style={{
          width: '100%',
          background: '#1a1a2e',
          borderRadius: 10,
          border: '2px solid #444',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            background: '#252540',
            gap: 6,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>Terminal — ~/Desktop/my-website</span>
        </div>

        <div style={{ padding: '10px 14px', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: GREEN }}>$</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              {typed1}
              {!cmd1Done && (
                <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
              )}
            </span>
          </div>
          {cmd1Done && (
            <div style={{ marginTop: 3, color: GREEN, fontSize: 11, opacity: 0.8 }}>
              ✓ Claude Code ready
            </div>
          )}
          {cmd1Done && (
            <div style={{ marginTop: 3, display: 'flex', gap: 8 }}>
              <span style={{ color: CURSOR_PURPLE }}>{'>'}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                {typed2}
                {!cmd2Done && (
                  <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
                )}
              </span>
            </div>
          )}
          {cmd2Done && (
            <div style={{ marginTop: 3, color: GREEN, fontSize: 11, opacity: 0.8 }}>
              ✓ Created contact form
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mini Cursor window (just shows code appearing)
const MiniCursorView: React.FC<{
  opacity: number;
  scale: number;
  frame: number;
  startFrame: number;
}> = ({ opacity, scale, frame, startFrame }) => {
  const codeLines = [
    '<form class="contact">',
    '  <input placeholder="Name">',
    '  <input placeholder="Email">',
    '  <button>Send</button>',
    '</form>',
  ];
  const codeElapsed = Math.max(0, frame - startFrame - 100);
  const visibleLines = Math.min(Math.floor(Math.max(0, codeElapsed) / 8), codeLines.length);

  return (
    <div
      style={{
        position: 'absolute',
        right: 50,
        top: '50%',
        transform: `translateY(-50%) scale(${scale})`,
        width: 440,
        height: 320,
        opacity,
        zIndex: 30,
      }}
    >
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11,
          color: CURSOR_PURPLE,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        Cursor — just watching
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1e1e1e',
          borderRadius: 10,
          border: `2px solid ${CURSOR_PURPLE}55`,
          boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${CURSOR_PURPLE}11`,
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
            padding: '6px 10px',
            background: '#2d2d3d',
            gap: 6,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
            Cursor
          </span>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <div style={{ width: 120, background: '#252536', borderRight: '1px solid #333', padding: '8px 0' }}>
            <div style={{ padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10 }}>📁</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>my-website</span>
            </div>
            <div style={{ padding: '2px 8px 2px 20px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 9 }}>📄</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>index.html</span>
            </div>
          </div>

          {/* Code area */}
          <div style={{ flex: 1, padding: '10px 12px', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
            {visibleLines > 0 ? (
              codeLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, lineHeight: 1.7 }}>
                  <span style={{ color: 'rgba(255,255,255,0.15)', minWidth: 16, textAlign: 'right', fontSize: 10 }}>{i + 1}</span>
                  <span style={{ color: line.includes('class=') || line.includes('<') ? '#7dd3fc' : 'rgba(255,255,255,0.7)' }}>{line}</span>
                </div>
              ))
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.08)' }}>
                  Watching for changes...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrow showing connection between terminal and IDE
const ConnectionArrow: React.FC<{
  opacity: number;
  frame: number;
}> = ({ opacity, frame }) => {
  const pulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 35,
        opacity: opacity * pulse,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M12 20h16" stroke={GREEN} strokeWidth="2" fill="none" />
          <path d="M22 14l6 6-6 6" stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: GREEN, opacity: 0.7 }}>
          same files
        </span>
      </div>
    </div>
  );
};

export const CursorTerminalGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === PHASE 1 (0-50): Title card ===
  const titleOpacity = interpolate(frame, [0, 20, 40, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // === PHASE 2 (50-250): Cursor IDE with built-in terminal ===
  const cursorSpring = frame >= 50
    ? spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const cursorFade = interpolate(frame, [230, 260], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const showCode1 = frame >= 180;

  // === PHASE 3 (260-300): "OR" divider ===
  const orOpacity = interpolate(frame, [260, 275, 290, 310], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // === PHASE 4 (300-440): Split view: external terminal + Cursor ===
  const splitSpring = frame >= 300
    ? spring({ frame: frame - 300, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const splitFade = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowOpacity = interpolate(frame, [350, 370, 420, 440], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // === PHASE 5 (440-480): Checkmark + final message ===
  const checkSpring = frame >= 440
    ? spring({ frame: frame - 440, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const finalOpacity = interpolate(frame, [450, 470], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>

      {/* Phase 1: Title */}
      {frame < 60 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            opacity: titleOpacity,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 28,
              color: 'white',
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Where do you run Claude?
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Two options — same result
          </div>
        </div>
      )}

      {/* Phase 2: Cursor with built-in terminal */}
      {frame >= 50 && frame < 270 && (
        <CursorWithTerminal
          opacity={cursorSpring * cursorFade}
          scale={interpolate(cursorSpring, [0, 1], [0.85, 1])}
          frame={frame}
          showCode={showCode1}
          terminalActive={frame >= 60}
          label="Option 1 — Cursor's Built-in Terminal"
        />
      )}

      {/* Phase 2 annotation: code appears */}
      {frame >= 190 && frame < 260 && (
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 100,
            opacity: interpolate(frame, [190, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * cursorFade,
            zIndex: 40,
          }}
        >
          <div
            style={{
              background: `${GREEN}15`,
              border: `1px solid ${GREEN}44`,
              borderRadius: 8,
              padding: '6px 12px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 12,
              color: GREEN,
              whiteSpace: 'nowrap',
            }}
          >
            Code appears here as Claude writes it ↑
          </div>
        </div>
      )}

      {/* Phase 3: OR divider */}
      {frame >= 260 && frame < 310 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: orOpacity,
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 40,
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 200,
              letterSpacing: '0.2em',
            }}
          >
            OR
          </div>
        </div>
      )}

      {/* Phase 4: Split view */}
      {frame >= 300 && frame < 455 && (
        <>
          <ExternalTerminal
            opacity={splitSpring * splitFade}
            scale={interpolate(splitSpring, [0, 1], [0.85, 1])}
            frame={frame}
            startFrame={300}
          />
          <MiniCursorView
            opacity={splitSpring * splitFade}
            scale={interpolate(splitSpring, [0, 1], [0.85, 1])}
            frame={frame}
            startFrame={300}
          />
          <ConnectionArrow opacity={arrowOpacity} frame={frame} />
        </>
      )}

      {/* Phase 4 annotation */}
      {frame >= 380 && frame < 440 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 50,
            transform: 'translateX(-50%)',
            opacity: interpolate(frame, [380, 400, 420, 440], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
            }}
          >
            Claude works in the terminal. Cursor shows you what changed.
          </div>
        </div>
      )}

      {/* Phase 5: Green checkmark */}
      {frame >= 440 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            transform: `translate(-50%, -50%) scale(${checkSpring})`,
            zIndex: 50,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill={GREEN} opacity={0.15} />
            <path d="M18 32l10 10 18-18" stroke={GREEN} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Phase 5: Final message */}
      {frame >= 450 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '60%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: finalOpacity,
            zIndex: 50,
          }}
        >
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 22,
              color: 'white',
              fontWeight: 600,
              marginBottom: 8,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Same project. Pick your style.
          </div>
          <div
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            The IDE is your window — the terminal is where you talk.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
