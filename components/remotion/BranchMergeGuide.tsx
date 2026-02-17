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
const BLUE = '#60a5fa';

export const BranchMergeGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- SCENE 1: THE MAIN ROAD (0-120) ---

  // Main timeline draws
  const mainLineProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const mainLabelOp = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main dots
  const mainDots = [
    { label: 'Homepage done', x: 280, frame: 40 },
    { label: 'Added contact page', x: 480, frame: 70 },
    { label: 'Styled everything', x: 680, frame: 100 },
  ];

  // --- SCENE 2: BRANCHING = MAKING A COPY (120-250) ---

  // "Imagine you want to try something new..." label
  const tryLabelOp = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tryLabelFade = interpolate(frame, [180, 200], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Branch splits off
  const branchProgress = interpolate(frame, [160, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Branch dot
  const branchDotScale = frame >= 220
    ? spring({ frame: frame - 220, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const branchDot2Scale = frame >= 260
    ? spring({ frame: frame - 260, fps, config: { damping: 12, stiffness: 200 } })
    : 0;

  // Branch label
  const branchLabelOp = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Your original stays safe" label
  const safeLabelOp = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main continues dot during branching
  const mainContinueDot = frame >= 250
    ? spring({ frame: frame - 250, fps, config: { damping: 12, stiffness: 200 } })
    : 0;

  // --- SCENE 3: MERGING = COMBINING BACK (290-400) ---

  const mergeLabelOp = interpolate(frame, [290, 320], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Merge line back down
  const mergeProgress = interpolate(frame, [320, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Checkmark at merge point
  const checkScale = frame >= 380
    ? spring({ frame: frame - 380, fps, config: { damping: 12, stiffness: 180 } })
    : 0;

  const mergedLabelOp = interpolate(frame, [390, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- SCENE 4: MAIN = FINAL COPY (430-520) ---

  const finalLabelOp = interpolate(frame, [440, 470], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mainGlow = frame >= 440
    ? 0.4 + 0.3 * Math.sin((frame - 440) * 0.06)
    : 0;

  // Coordinates
  const mainY = 400;
  const mainStartX = 140;
  const mainEndX = 1140;
  const mainCurrentX = mainStartX + (mainEndX - mainStartX) * mainLineProgress;

  const branchStartX = 680;
  const branchEndX = 900;
  const branchY = 260;
  const mergeX = 980;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* SVG layer for lines */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
      >
        {/* Main timeline line */}
        <line
          x1={mainStartX}
          y1={mainY}
          x2={mainCurrentX}
          y2={mainY}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* Main glow overlay */}
        {frame >= 440 && (
          <line
            x1={mainStartX}
            y1={mainY}
            x2={mainEndX}
            y2={mainY}
            stroke={GREEN}
            strokeWidth={3.5}
            strokeLinecap="round"
            opacity={mainGlow}
          />
        )}

        {/* Branch line (curves up) */}
        {frame >= 160 && (
          <path
            d={`M ${branchStartX} ${mainY} Q ${branchStartX + 60} ${mainY - 50} ${branchStartX + (branchEndX - branchStartX) * branchProgress} ${mainY - (mainY - branchY) * branchProgress}`}
            stroke={ORANGE}
            strokeWidth={2.5}
            fill="none"
            opacity={0.7}
            strokeLinecap="round"
          />
        )}

        {/* Merge line (curves back down) */}
        {frame >= 320 && (
          <path
            d={`M ${branchEndX} ${branchY} Q ${branchEndX + 40} ${branchY + 50} ${branchEndX + (mergeX - branchEndX) * mergeProgress} ${branchY + (mainY - branchY) * mergeProgress}`}
            stroke={ORANGE}
            strokeWidth={2.5}
            fill="none"
            opacity={0.7}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* "main" label on timeline */}
      <div
        style={{
          position: 'absolute',
          left: mainStartX - 10,
          top: mainY + 20,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 16,
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 600,
          opacity: mainLabelOp,
          zIndex: 20,
        }}
      >
        main
      </div>

      {/* "= your final copy" label */}
      <div
        style={{
          position: 'absolute',
          left: mainStartX - 10,
          top: mainY + 42,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 12,
          color: GREEN,
          opacity: mainLabelOp,
          zIndex: 20,
        }}
      >
        your final copy
      </div>

      {/* Main timeline dots */}
      {mainDots.map((dot, i) => {
        const dotScale = dot.frame <= frame
          ? spring({ frame: Math.max(0, frame - dot.frame), fps, config: { damping: 12, stiffness: 200 } })
          : 0;
        const labelOp = interpolate(frame, [dot.frame + 5, dot.frame + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: dot.x - 10,
                top: mainY - 10,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'white',
                border: '3px solid rgba(255,255,255,0.5)',
                transform: `scale(${dotScale})`,
                zIndex: 30,
                boxShadow: '0 0 10px rgba(255,255,255,0.15)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: dot.x,
                top: mainY + 30,
                transform: 'translateX(-50%)',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                opacity: labelOp,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                zIndex: 20,
              }}
            >
              {dot.label}
            </div>
          </React.Fragment>
        );
      })}

      {/* "You want to try something new..." prompt */}
      {frame >= 120 && frame < 210 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 120,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: tryLabelOp * tryLabelFade,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 40,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          You want to try something new...
        </div>
      )}

      {/* Branch label "experiment" */}
      {frame >= 200 && (
        <div
          style={{
            position: 'absolute',
            left: branchStartX + 40,
            top: branchY - 80,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            opacity: branchLabelOp,
            zIndex: 30,
            textAlign: 'center',
          }}
        >
          <div style={{ color: ORANGE, fontWeight: 600, marginBottom: 4 }}>
            Make a copy to experiment
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
            (this is called a "branch")
          </div>
        </div>
      )}

      {/* Branch dots */}
      {frame >= 220 && (
        <div
          style={{
            position: 'absolute',
            left: branchEndX - 50,
            top: branchY - 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: ORANGE,
            transform: `scale(${branchDotScale})`,
            zIndex: 30,
            boxShadow: `0 0 12px ${ORANGE}55`,
          }}
        />
      )}
      {frame >= 260 && (
        <div
          style={{
            position: 'absolute',
            left: branchEndX - 8,
            top: branchY - 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: ORANGE,
            transform: `scale(${branchDot2Scale})`,
            zIndex: 30,
            boxShadow: `0 0 12px ${ORANGE}55`,
          }}
        />
      )}

      {/* "Your original stays safe" label */}
      {frame >= 240 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: mainY + 70,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 15,
            color: GREEN,
            opacity: safeLabelOp,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
        >
          Your original stays safe on main
        </div>
      )}

      {/* Main continues dot */}
      {frame >= 250 && (
        <div
          style={{
            position: 'absolute',
            left: 850 - 10,
            top: mainY - 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'white',
            border: '3px solid rgba(255,255,255,0.5)',
            transform: `scale(${mainContinueDot})`,
            zIndex: 30,
            boxShadow: '0 0 10px rgba(255,255,255,0.15)',
          }}
        />
      )}

      {/* "Happy with it? Combine back!" label */}
      {frame >= 290 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 120,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: mergeLabelOp,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 40,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Happy with it? Merge it back in!
        </div>
      )}

      {/* Merge checkmark */}
      {frame >= 380 && (
        <div
          style={{
            position: 'absolute',
            left: mergeX - 16,
            top: mainY - 45,
            transform: `scale(${checkScale})`,
            zIndex: 40,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill={GREEN} opacity={0.2} />
            <path d="M10 16l4 4 8-8" stroke={GREEN} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* "Merged!" label */}
      {frame >= 390 && (
        <div
          style={{
            position: 'absolute',
            left: mergeX,
            top: mainY + 30,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            fontWeight: 600,
            opacity: mergedLabelOp,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
        >
          Combined! (this is called "merging")
        </div>
      )}

      {/* Final message */}
      {frame >= 440 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 560,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: finalLabelOp,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 20,
            lineHeight: 1.6,
          }}
        >
          Main always has your finished, working code
        </div>
      )}
    </AbsoluteFill>
  );
};
