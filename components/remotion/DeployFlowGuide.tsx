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

// Simple laptop icon drawn with divs
const LaptopIcon: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      top: 260,
      transform: `scale(${scale})`,
      opacity,
      zIndex: 20,
    }}
  >
    {/* Screen */}
    <div
      style={{
        width: 200,
        height: 130,
        background: '#1a1a2e',
        border: '2px solid #444',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
      }}
    >
      {/* File icons inside */}
      {['#3b82f6', '#f59e0b', '#ef4444', '#22c55e'].map((color, i) => (
        <div
          key={i}
          style={{
            width: 32,
            height: 40,
            background: '#222',
            border: `1px solid ${color}`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 16, height: 2, background: color, borderRadius: 1 }} />
        </div>
      ))}
    </div>
    {/* Base */}
    <div
      style={{
        width: 230,
        height: 12,
        background: '#333',
        borderRadius: '0 0 4px 4px',
        marginLeft: -15,
        border: '1px solid #444',
        borderTop: 'none',
      }}
    />
  </div>
);

// Cloud shape
const CloudIcon: React.FC<{ opacity: number; scale: number; processing?: boolean; frame: number }> = ({ opacity, scale, processing, frame }) => (
  <div
    style={{
      position: 'absolute',
      left: 520,
      top: 240,
      transform: `scale(${scale})`,
      opacity,
      zIndex: 20,
    }}
  >
    <svg width="200" height="140" viewBox="0 0 200 140">
      <path
        d="M160 90 C180 90 190 75 185 60 C185 40 165 30 148 38 C140 20 115 15 95 25 C80 15 55 20 48 40 C25 38 10 55 15 75 C10 90 25 100 45 98 L160 98 C170 98 180 95 160 90Z"
        fill="rgba(74,222,128,0.08)"
        stroke={GREEN}
        strokeWidth="2"
        opacity={0.8}
      />
      {/* Gear icon for processing */}
      {processing && (
        <g transform={`translate(90, 60) rotate(${(frame % 60) * 6})`}>
          <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <rect
              key={angle}
              x="-3"
              y="-18"
              width="6"
              height="8"
              rx="2"
              fill="rgba(255,255,255,0.4)"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      )}
    </svg>
  </div>
);

// Globe/browser icon
const GlobeIcon: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => (
  <div
    style={{
      position: 'absolute',
      left: 920,
      top: 250,
      transform: `scale(${scale})`,
      opacity,
      zIndex: 20,
    }}
  >
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="60" fill="rgba(74,222,128,0.08)" stroke={GREEN} strokeWidth="2" opacity={0.8} />
      <ellipse cx="80" cy="80" rx="30" ry="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="20" y1="80" x2="140" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="80" y1="20" x2="80" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    </svg>
  </div>
);

export const DeployFlowGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-80): Laptop fades in
  const laptopSpring = frame >= 0
    ? spring({ frame, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const laptopLabelOpacity = interpolate(frame, [20, 50, 65, 80], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (80-180): Arrow + cloud appears
  const arrowProgress = interpolate(frame, [80, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const cloudSpring = frame >= 120
    ? spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const uploadLabelOpacity = interpolate(frame, [110, 140, 165, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (180-280): Cloud processing
  const cloudProcessing = frame >= 180 && frame < 280;
  const processingLabelOpacity = interpolate(frame, [190, 210, 260, 280], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (280-380): Globe + URL appears
  const globeSpring = frame >= 280
    ? spring({ frame: frame - 280, fps, config: { damping: 14, stiffness: 150 } })
    : 0;
  const arrow2Progress = interpolate(frame, [290, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const urlOpacity = interpolate(frame, [320, 350], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const liveLabelOpacity = interpolate(frame, [340, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (380-480): Checkmark + final label
  const checkSpring = frame >= 390
    ? spring({ frame: frame - 390, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const finalLabelOpacity = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Flying files animation
  const filePositions = [0, 1, 2].map((i) => {
    const fileFrame = frame - 100 - i * 15;
    const fileProgress = interpolate(fileFrame, [0, 50], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return {
      x: interpolate(fileProgress, [0, 1], [330, 520]),
      y: interpolate(fileProgress, [0, 1], [300 + i * 20, 310]),
      opacity: fileProgress > 0 && fileProgress < 1 ? interpolate(fileProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0,
    };
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Laptop */}
      <LaptopIcon opacity={laptopSpring} scale={interpolate(laptopSpring, [0, 1], [0.8, 1])} />

      {/* "Your computer" label */}
      <div
        style={{
          position: 'absolute',
          left: 220,
          top: 430,
          transform: 'translateX(-50%)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          color: 'white',
          opacity: laptopLabelOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Your computer
      </div>

      {/* Arrow: laptop → cloud (dashed) */}
      <svg style={{ position: 'absolute', inset: 0, zIndex: 15 }} width="1280" height="720" viewBox="0 0 1280 720">
        <line
          x1={340}
          y1={330}
          x2={340 + (510 - 340) * arrowProgress}
          y2={330}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={2}
          strokeDasharray="8 4"
        />
        {arrowProgress > 0.9 && (
          <path d="M505 325 L515 330 L505 335" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        )}
        {/* Arrow: cloud → globe */}
        {frame >= 290 && (
          <>
            <line
              x1={730}
              y1={330}
              x2={730 + (910 - 730) * arrow2Progress}
              y2={330}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
              strokeDasharray="8 4"
            />
            {arrow2Progress > 0.9 && (
              <path d="M905 325 L915 330 L905 335" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            )}
          </>
        )}
      </svg>

      {/* Flying file icons */}
      {filePositions.map((file, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: file.x,
            top: file.y,
            opacity: file.opacity,
            zIndex: 25,
          }}
        >
          <div
            style={{
              width: 16,
              height: 20,
              background: '#222',
              border: `1px solid ${GREEN}`,
              borderRadius: 2,
            }}
          />
        </div>
      ))}

      {/* Cloud */}
      <CloudIcon
        opacity={cloudSpring}
        scale={interpolate(cloudSpring, [0, 1], [0.7, 1])}
        processing={cloudProcessing}
        frame={frame}
      />

      {/* "Upload to Vercel" label */}
      <div
        style={{
          position: 'absolute',
          left: 450,
          top: 430,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 16,
          color: 'rgba(255,255,255,0.7)',
          opacity: uploadLabelOpacity,
          textShadow: '0 2px 6px rgba(0,0,0,0.5)',
          zIndex: 30,
        }}
      >
        Upload to Vercel
      </div>

      {/* Processing label */}
      {frame >= 190 && (
        <div
          style={{
            position: 'absolute',
            left: 620,
            top: 420,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 14,
            color: GREEN,
            opacity: processingLabelOpacity,
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Building your site...
        </div>
      )}

      {/* Globe */}
      <GlobeIcon opacity={globeSpring} scale={interpolate(globeSpring, [0, 1], [0.7, 1])} />

      {/* URL text */}
      {frame >= 320 && (
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 430,
            transform: 'translateX(-50%)',
            fontFamily: 'ui-monospace, monospace',
            fontSize: 14,
            color: GREEN,
            opacity: urlOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 6px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          yoursite.vercel.app
        </div>
      )}

      {/* "Live on the internet!" label */}
      {frame >= 340 && (
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 460,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 16,
            color: 'white',
            opacity: liveLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 30,
          }}
        >
          Live on the internet!
        </div>
      )}

      {/* Green checkmark */}
      {frame >= 390 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 160,
            transform: `translateX(-50%) scale(${checkSpring})`,
            zIndex: 40,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill={GREEN} opacity={0.15} />
            <path d="M14 24l7 7 13-13" stroke={GREEN} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Final label */}
      {frame >= 410 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 560,
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
          Anyone with the link can see your site
        </div>
      )}
    </AbsoluteFill>
  );
};
