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

export const GitTimelineGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-80): Timeline draws from left to right
  const timelineProgress = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const timelineLabelOpacity = interpolate(frame, [20, 45, 60, 80], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Phase 2 (80-200): Dots appear one by one on timeline
  const dots = [
    { label: 'First page', x: 280, frame: 80 },
    { label: 'Added styles', x: 460, frame: 120 },
    { label: 'New feature', x: 640, frame: 160 },
  ];

  // Phase 3 (200-310): Branch splits off
  const branchProgress = interpolate(frame, [200, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const branchDotOpacity = frame >= 260
    ? spring({ frame: frame - 260, fps, config: { damping: 12, stiffness: 180 } })
    : 0;
  const mainContinueDotOpacity = frame >= 270
    ? spring({ frame: frame - 270, fps, config: { damping: 12, stiffness: 180 } })
    : 0;

  // Phase 4 (310-390): Merge back
  const mergeProgress = interpolate(frame, [310, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const checkmarkOpacity = frame >= 370
    ? spring({ frame: frame - 370, fps, config: { damping: 12, stiffness: 180 } })
    : 0;
  const mergeLabelOpacity = interpolate(frame, [375, 395], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (400-480): Hold, final label
  const finalLabelOpacity = interpolate(frame, [410, 435], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Timeline coordinates
  const timelineY = 360;
  const timelineStartX = 160;
  const timelineEndX = 1120;
  const timelineCurrentX = timelineStartX + (timelineEndX - timelineStartX) * timelineProgress;

  // Branch coordinates
  const branchStartX = 640;
  const branchEndX = 820;
  const branchY = 240;
  const mergeX = 900;

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Timeline line */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
        width="1280"
        height="720"
        viewBox="0 0 1280 720"
      >
        {/* Main timeline */}
        <line
          x1={timelineStartX}
          y1={timelineY}
          x2={timelineCurrentX}
          y2={timelineY}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Branch line (diagonal up) */}
        {frame >= 200 && (
          <path
            d={`M ${branchStartX} ${timelineY} Q ${branchStartX + 60} ${timelineY - 40} ${branchStartX + (branchEndX - branchStartX) * branchProgress} ${timelineY - (timelineY - branchY) * branchProgress}`}
            stroke={GREEN}
            strokeWidth={2.5}
            fill="none"
            opacity={0.7}
            strokeLinecap="round"
          />
        )}

        {/* Merge line (back down) */}
        {frame >= 310 && (
          <path
            d={`M ${branchEndX} ${branchY} Q ${branchEndX + 40} ${branchY + 40} ${branchEndX + (mergeX - branchEndX) * mergeProgress} ${branchY + (timelineY - branchY) * mergeProgress}`}
            stroke={GREEN}
            strokeWidth={2.5}
            fill="none"
            opacity={0.7}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* "Your project timeline" label */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: timelineY + 50,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 20,
          color: 'white',
          opacity: timelineLabelOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 20,
        }}
      >
        Your project timeline
      </div>

      {/* Save point dots on main timeline */}
      {dots.map((dot, i) => {
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
                top: timelineY - 10,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'white',
                border: `3px solid ${GREEN}`,
                transform: `scale(${dotScale})`,
                zIndex: 30,
                boxShadow: `0 0 12px ${GREEN}44`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: dot.x,
                top: timelineY - 50,
                transform: 'translateX(-50%)',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 14,
                color: 'rgba(255,255,255,0.8)',
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

      {/* Branch dot ("Experiment") */}
      {frame >= 260 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: branchEndX - 10,
              top: branchY - 10,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: GREEN,
              transform: `scale(${branchDotOpacity})`,
              zIndex: 30,
              boxShadow: `0 0 16px ${GREEN}66`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: branchEndX,
              top: branchY - 40,
              transform: 'translateX(-50%)',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              color: GREEN,
              opacity: branchDotOpacity,
              whiteSpace: 'nowrap',
              textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              zIndex: 20,
            }}
          >
            Experiment
          </div>
        </>
      )}

      {/* Main continue dot ("Main work") */}
      {frame >= 270 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 820 - 10,
              top: timelineY - 10,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'white',
              border: `3px solid ${GREEN}`,
              transform: `scale(${mainContinueDotOpacity})`,
              zIndex: 30,
              boxShadow: `0 0 12px ${GREEN}44`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 820,
              top: timelineY - 50,
              transform: 'translateX(-50%)',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              opacity: mainContinueDotOpacity,
              whiteSpace: 'nowrap',
              textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              zIndex: 20,
            }}
          >
            Main work
          </div>
        </>
      )}

      {/* Merge checkmark */}
      {frame >= 370 && (
        <div
          style={{
            position: 'absolute',
            left: mergeX - 16,
            top: timelineY - 45,
            transform: `scale(${checkmarkOpacity})`,
            zIndex: 40,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill={GREEN} opacity={0.2} />
            <path d="M10 16l4 4 8-8" stroke={GREEN} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* "Changes combined!" label */}
      {frame >= 375 && (
        <div
          style={{
            position: 'absolute',
            left: mergeX,
            top: timelineY + 40,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            color: GREEN,
            opacity: mergeLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
        >
          Changes combined!
        </div>
      )}

      {/* Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 550,
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
          You can always go back to any save point
        </div>
      )}
    </AbsoluteFill>
  );
};
