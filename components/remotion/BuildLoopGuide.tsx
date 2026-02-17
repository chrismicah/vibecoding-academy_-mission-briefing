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

// Chat bubble icon
const ChatBubble: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  text: string;
  typingFrame: number;
}> = ({ x, y, opacity, scale, text, typingFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - typingFrame);
  const charsToShow = Math.min(Math.floor(elapsed / 2), text.length);
  const displayText = typingFrame > 0 && frame >= typingFrame ? text.slice(0, charsToShow) : '';

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
          width: 280,
          minHeight: 100,
          background: '#1a1a2e',
          border: '2px solid #444',
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          padding: 16,
          position: 'relative',
        }}
      >
        {/* Chat icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>You</span>
        </div>
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 13,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.5,
            minHeight: 40,
          }}
        >
          {displayText}
          {charsToShow < text.length && charsToShow > 0 && (
            <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Code editor icon
const CodeEditor: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  showCode: boolean;
}> = ({ x, y, opacity, scale, showCode }) => {
  const frame = useCurrentFrame();
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
          width: 280,
          height: 140,
          background: '#1a1a1a',
          border: '2px solid #444',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', background: '#252525', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 8, fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>index.html</span>
        </div>
        {/* Code lines */}
        <div style={{ padding: '10px 12px' }}>
          {showCode && (
            <>
              {[
                { color: '#ef4444', width: 60 },
                { color: '#3b82f6', width: 120 },
                { color: '#f59e0b', width: 90 },
                { color: '#22c55e', width: 70 },
                { color: '#ef4444', width: 40 },
              ].map((line, i) => {
                const lineDelay = i * 8;
                const lineOpacity = interpolate(frame - lineDelay, [70, 90], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                return (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, opacity: lineOpacity }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)', width: 16, textAlign: 'right' }}>{i + 1}</span>
                    <div style={{ width: line.width, height: 8, background: line.color, borderRadius: 2, opacity: 0.4 }} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Browser preview
const BrowserPreview: React.FC<{
  x: number;
  y: number;
  opacity: number;
  scale: number;
  showContent: boolean;
}> = ({ x, y, opacity, scale, showContent }) => {
  const frame = useCurrentFrame();
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
          width: 280,
          height: 150,
          background: '#1a1a1a',
          border: '2px solid #444',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {/* URL bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', background: '#252525', gap: 8 }}>
          <div style={{ flex: 1, height: 18, background: '#1a1a1a', borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>localhost:3000</span>
          </div>
        </div>
        {/* Preview content */}
        <div style={{ padding: 12 }}>
          {showContent && (
            <>
              <div style={{ width: 160, height: 14, background: 'white', borderRadius: 3, opacity: 0.8, marginBottom: 8 }} />
              <div style={{ width: 200, height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 4 }} />
              <div style={{ width: 140, height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 10 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 60, height: 24, background: GREEN, borderRadius: 4, opacity: 0.7 }} />
                <div style={{ width: 60, height: 24, background: '#3b82f6', borderRadius: 4, opacity: 0.5 }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const BuildLoopGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Layout: triangle arrangement
  // Chat bubble: top-left    Code editor: top-right
  //            Browser: bottom-center

  // Phase 1 (0-90): Chat bubble appears + text types
  const chatSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const chatLabelOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (90-180): Arrow to code editor + code appears
  const arrow1Progress = interpolate(frame, [90, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const editorSpring = frame >= 100
    ? spring({ frame: frame - 100, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const editorLabelOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (180-280): Arrow to browser + preview renders
  const arrow2Progress = interpolate(frame, [180, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const browserSpring = frame >= 200
    ? spring({ frame: frame - 200, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const browserLabelOpacity = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (280-380): Arrow back to chat + new text
  const arrow3Progress = interpolate(frame, [280, 330], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const refineLabelOpacity = interpolate(frame, [310, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (380-480): Cycle loop arrow + final label
  const loopOpacity = interpolate(frame, [390, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalLabelOpacity = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const loopPulse = frame >= 390 ? 0.7 + 0.3 * Math.sin((frame - 390) * 0.08) : 0;

  // Positions
  const chatX = 80;
  const chatY = 130;
  const editorX = 900;
  const editorY = 130;
  const browserX = 490;
  const browserY = 440;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Chat bubble */}
      <ChatBubble
        x={chatX}
        y={chatY}
        opacity={chatSpring}
        scale={interpolate(chatSpring, [0, 1], [0.8, 1])}
        text="Build me a hero section with a big headline and green button..."
        typingFrame={10}
      />

      {/* "1. Describe what you want" label */}
      <div
        style={{
          position: 'absolute',
          left: chatX + 140,
          top: chatY + 130,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 15,
          color: GREEN,
          fontWeight: 600,
          opacity: chatLabelOpacity,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        1. Describe what you want
      </div>

      {/* Arrow 1: Chat → Editor */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        {frame >= 90 && (
          <>
            <line
              x1={chatX + 280}
              y1={chatY + 60}
              x2={chatX + 280 + (editorX - chatX - 280) * arrow1Progress}
              y2={chatY + 60}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            {arrow1Progress > 0.9 && (
              <path
                d={`M${editorX - 10} ${chatY + 55} L${editorX} ${chatY + 60} L${editorX - 10} ${chatY + 65}`}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
            )}
          </>
        )}

        {/* Arrow 2: Editor → Browser */}
        {frame >= 180 && (
          <>
            <line
              x1={editorX + 140}
              y1={editorY + 150}
              x2={editorX + 140 + (browserX + 140 - editorX - 140) * arrow2Progress}
              y2={editorY + 150 + (browserY - editorY - 150) * arrow2Progress}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            {arrow2Progress > 0.9 && (
              <circle cx={browserX + 140} cy={browserY - 5} r="3" fill="rgba(255,255,255,0.3)" />
            )}
          </>
        )}

        {/* Arrow 3: Browser → Chat */}
        {frame >= 280 && (
          <>
            <line
              x1={browserX}
              y1={browserY + 75}
              x2={browserX + (chatX + 140 - browserX) * arrow3Progress}
              y2={browserY + 75 + (chatY + 100 - browserY - 75) * arrow3Progress}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            {arrow3Progress > 0.9 && (
              <circle cx={chatX + 140} cy={chatY + 105} r="3" fill="rgba(255,255,255,0.3)" />
            )}
          </>
        )}
      </svg>

      {/* Code editor */}
      <CodeEditor
        x={editorX}
        y={editorY}
        opacity={editorSpring}
        scale={interpolate(editorSpring, [0, 1], [0.8, 1])}
        showCode={frame >= 120}
      />

      {/* "2. Claude writes the code" label */}
      {frame >= 110 && (
        <div
          style={{
            position: 'absolute',
            left: editorX + 140,
            top: editorY + 155,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: editorLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          2. Claude writes the code
        </div>
      )}

      {/* Browser preview */}
      <BrowserPreview
        x={browserX}
        y={browserY}
        opacity={browserSpring}
        scale={interpolate(browserSpring, [0, 1], [0.8, 1])}
        showContent={frame >= 220}
      />

      {/* "3. Preview the result" label */}
      {frame >= 210 && (
        <div
          style={{
            position: 'absolute',
            left: browserX + 140,
            top: browserY + 165,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: browserLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          3. Preview the result
        </div>
      )}

      {/* "4. Refine with feedback" label */}
      {frame >= 310 && (
        <div
          style={{
            position: 'absolute',
            left: 220,
            top: 410,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            fontWeight: 600,
            opacity: refineLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          4. Refine with feedback
        </div>
      )}

      {/* Cycle loop symbol */}
      {frame >= 390 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 340,
            transform: 'translateX(-50%)',
            opacity: loopPulse,
            zIndex: 40,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="12 4" opacity={0.6} />
            <path d="M42 24 L48 30 L42 36" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Final label */}
      {frame >= 420 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 645,
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
          Keep going until it's perfect!
        </div>
      )}
    </AbsoluteFill>
  );
};
