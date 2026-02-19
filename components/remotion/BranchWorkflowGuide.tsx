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
const ORANGE = '#fb923c';

// Chat prompt bubble showing what you'd say to Claude
const PromptBubble: React.FC<{
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}> = ({ text, x, y, opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `scale(${scale})`,
      zIndex: 50,
    }}
  >
    <div
      style={{
        background: '#1a1a2e',
        border: '1.5px solid #444',
        borderRadius: 12,
        borderBottomLeftRadius: 4,
        padding: '10px 14px',
        maxWidth: 340,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginBottom: 6,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 9,
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Tell Claude
        </span>
      </div>
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 13,
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  </div>
);

// Step number badge
const StepBadge: React.FC<{
  step: number;
  label: string;
  x: number;
  y: number;
  opacity: number;
  active?: boolean;
}> = ({ step, label, x, y, opacity, active = false }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      zIndex: 45,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: active ? GREEN : 'transparent',
        border: `2px solid ${active ? GREEN : '#555'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 13,
        fontWeight: 700,
        color: active ? '#111' : '#888',
      }}
    >
      {step}
    </div>
    <span
      style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        color: active ? 'white' : 'rgba(255,255,255,0.5)',
        fontWeight: active ? 600 : 400,
        textShadow: '0 2px 6px rgba(0,0,0,0.5)',
      }}
    >
      {label}
    </span>
  </div>
);

export const BranchWorkflowGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Track positions
  const mainY = 440;
  const branchY = 300;
  const trackStartX = 200;
  const trackEndX = 1080;

  // "You are here" dot position (animated)
  const youDotX = (() => {
    if (frame < 100) return trackStartX + 60;
    if (frame < 200) return interpolate(frame, [100, 150], [trackStartX + 60, trackStartX + 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    if (frame < 300) return interpolate(frame, [200, 250], [trackStartX + 180, trackStartX + 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    if (frame < 420) return interpolate(frame, [300, 380], [trackStartX + 320, trackStartX + 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    if (frame < 510) return interpolate(frame, [420, 480], [trackStartX + 580, trackStartX + 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    if (frame < 600) return interpolate(frame, [510, 560], [trackStartX + 680, trackStartX + 760], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    return trackStartX + 760;
  })();

  const youDotY = (() => {
    // On main until step 3 (switch), then on branch, then back to main at step 6
    if (frame < 200) return mainY;
    if (frame < 250) return interpolate(frame, [200, 250], [mainY, branchY], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    if (frame < 510) return branchY;
    if (frame < 560) return interpolate(frame, [510, 560], [branchY, mainY], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    return mainY;
  })();

  // Phase timings
  // Step 1 (0-100): "You're on main"
  const step1Op = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Active = frame >= 0 && frame < 100;

  // Step 2 (100-200): "Create a branch"
  const step2Op = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Active = frame >= 100 && frame < 200;
  const branchLineProgress = interpolate(frame, [110, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  // Step 3 (200-300): "Switch to branch"
  const step3Op = interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Active = frame >= 200 && frame < 300;

  // Step 4 (300-420): "Make your changes"
  const step4Op = interpolate(frame, [300, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step4Active = frame >= 300 && frame < 420;
  const workDot1 = frame >= 340 ? spring({ frame: frame - 340, fps, config: { damping: 12, stiffness: 200 } }) : 0;
  const workDot2 = frame >= 370 ? spring({ frame: frame - 370, fps, config: { damping: 12, stiffness: 200 } }) : 0;

  // Step 5 (420-510): "Switch back to main"
  const step5Op = interpolate(frame, [420, 450], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step5Active = frame >= 420 && frame < 510;

  // Step 6 (510-620): "Merge into main"
  const step6Op = interpolate(frame, [510, 540], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step6Active = frame >= 510 && frame < 620;
  const mergeLineProgress = interpolate(frame, [560, 610], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  const checkScale = frame >= 610 ? spring({ frame: frame - 610, fps, config: { damping: 12, stiffness: 180 } }) : 0;

  // Final (620-700)
  const finalOp = interpolate(frame, [630, 660], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Main track line
  const mainLineOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Branch track line appears
  const branchTrackOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "You are here" pulse
  const youPulse = 0.7 + 0.3 * Math.sin(frame * 0.1);

  // Merge point
  const mergeX = trackStartX + 760;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* SVG lines */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
      >
        {/* Main track */}
        <line
          x1={trackStartX}
          y1={mainY}
          x2={trackEndX}
          y2={mainY}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={mainLineOp}
        />

        {/* Branch track (parallel line above) */}
        {frame >= 110 && (
          <>
            {/* Diagonal from main up to branch */}
            <path
              d={`M ${trackStartX + 180} ${mainY} Q ${trackStartX + 220} ${mainY - 40} ${trackStartX + 260 * branchLineProgress + 180 * (1 - branchLineProgress)} ${mainY - (mainY - branchY) * branchLineProgress}`}
              stroke={ORANGE}
              strokeWidth={2.5}
              fill="none"
              opacity={0.6 * branchTrackOp}
              strokeLinecap="round"
            />
            {/* Horizontal branch line */}
            {branchLineProgress > 0.8 && (
              <line
                x1={trackStartX + 280}
                y1={branchY}
                x2={trackStartX + 700}
                y2={branchY}
                stroke={ORANGE}
                strokeWidth={2.5}
                strokeLinecap="round"
                opacity={0.4 * branchTrackOp}
              />
            )}
          </>
        )}

        {/* Merge line (branch back down to main) */}
        {frame >= 560 && (
          <path
            d={`M ${trackStartX + 680} ${branchY} Q ${trackStartX + 720} ${branchY + 40} ${trackStartX + 680 + (mergeX - trackStartX - 680) * mergeLineProgress} ${branchY + (mainY - branchY) * mergeLineProgress}`}
            stroke={ORANGE}
            strokeWidth={2.5}
            fill="none"
            opacity={0.6}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Track labels */}
      <div
        style={{
          position: 'absolute',
          left: trackStartX - 80,
          top: mainY - 10,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 600,
          opacity: mainLineOp,
          zIndex: 20,
        }}
      >
        main
      </div>
      {frame >= 140 && (
        <div
          style={{
            position: 'absolute',
            left: trackStartX - 80,
            top: branchY - 10,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 13,
            color: ORANGE,
            fontWeight: 600,
            opacity: branchTrackOp * 0.7,
            zIndex: 20,
          }}
        >
          add-blog
        </div>
      )}

      {/* "YOU ARE HERE" dot */}
      <div
        style={{
          position: 'absolute',
          left: youDotX - 10,
          top: youDotY - 10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: GREEN,
          boxShadow: `0 0 16px ${GREEN}88, 0 0 32px ${GREEN}44`,
          opacity: youPulse,
          zIndex: 60,
        }}
      />
      {/* "You" label follows the dot */}
      <div
        style={{
          position: 'absolute',
          left: youDotX,
          top: youDotY - 35,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11,
          color: GREEN,
          fontWeight: 600,
          opacity: 0.8,
          zIndex: 60,
          whiteSpace: 'nowrap',
        }}
      >
        YOU ARE HERE
      </div>

      {/* Work dots on branch */}
      {frame >= 340 && (
        <div
          style={{
            position: 'absolute',
            left: trackStartX + 440 - 7,
            top: branchY - 7,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: ORANGE,
            transform: `scale(${workDot1})`,
            zIndex: 30,
            boxShadow: `0 0 10px ${ORANGE}44`,
          }}
        />
      )}
      {frame >= 370 && (
        <div
          style={{
            position: 'absolute',
            left: trackStartX + 530 - 7,
            top: branchY - 7,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: ORANGE,
            transform: `scale(${workDot2})`,
            zIndex: 30,
            boxShadow: `0 0 10px ${ORANGE}44`,
          }}
        />
      )}

      {/* Merge checkmark */}
      {frame >= 610 && (
        <div
          style={{
            position: 'absolute',
            left: mergeX - 16,
            top: mainY - 45,
            transform: `scale(${checkScale})`,
            zIndex: 55,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill={GREEN} opacity={0.25} />
            <path d="M10 16l4 4 8-8" stroke={GREEN} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* ── STEP BADGES (left column) ── */}
      <StepBadge step={1} label="Start on main" x={40} y={50} opacity={step1Op} active={step1Active} />
      <StepBadge step={2} label="Create a branch" x={40} y={90} opacity={step2Op} active={step2Active} />
      <StepBadge step={3} label="Switch to branch" x={40} y={130} opacity={step3Op} active={step3Active} />
      <StepBadge step={4} label="Make your changes" x={40} y={170} opacity={step4Op} active={step4Active} />
      <StepBadge step={5} label="Switch back to main" x={40} y={210} opacity={step5Op} active={step5Active} />
      <StepBadge step={6} label="Merge into main" x={40} y={250} opacity={step6Op} active={step6Active} />

      {/* ── PROMPT BUBBLES (what to tell Claude) ── */}

      {/* Step 1: Context */}
      {step1Active && (
        <PromptBubble
          text="You're working on main — this is your finished, safe version."
          x={700}
          y={80}
          opacity={step1Op}
          scale={interpolate(step1Op, [0, 1], [0.9, 1])}
        />
      )}

      {/* Step 2: Create branch */}
      {step2Active && (
        <PromptBubble
          text={'"Create a new branch called add-blog"'}
          x={700}
          y={80}
          opacity={step2Op}
          scale={interpolate(step2Op, [0, 1], [0.9, 1])}
        />
      )}

      {/* Step 3: Switch */}
      {step3Active && (
        <PromptBubble
          text={'"Switch to the add-blog branch"'}
          x={700}
          y={60}
          opacity={step3Op}
          scale={interpolate(step3Op, [0, 1], [0.9, 1])}
        />
      )}
      {/* Extra note for step 3 */}
      {frame >= 250 && frame < 300 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: mainY + 50,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            opacity: interpolate(frame, [250, 275], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 20,
            textAlign: 'center',
          }}
        >
          Now your changes happen on the copy, not the original
        </div>
      )}

      {/* Step 4: Make changes */}
      {step4Active && (
        <PromptBubble
          text={'"Add a blog page with a list of posts and a featured article section"'}
          x={700}
          y={80}
          opacity={step4Op}
          scale={interpolate(step4Op, [0, 1], [0.9, 1])}
        />
      )}

      {/* Step 5: Switch back */}
      {step5Active && (
        <PromptBubble
          text={'"Switch back to main"'}
          x={700}
          y={80}
          opacity={step5Op}
          scale={interpolate(step5Op, [0, 1], [0.9, 1])}
        />
      )}

      {/* Step 6: Merge */}
      {step6Active && (
        <PromptBubble
          text={'"Merge add-blog into main"'}
          x={700}
          y={80}
          opacity={step6Op}
          scale={interpolate(step6Op, [0, 1], [0.9, 1])}
        />
      )}

      {/* Final message */}
      {frame >= 630 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: mainY + 60,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: finalOp,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 20,
            lineHeight: 1.5,
          }}
        >
          Your blog is now part of the final site!
        </div>
      )}
    </AbsoluteFill>
  );
};
