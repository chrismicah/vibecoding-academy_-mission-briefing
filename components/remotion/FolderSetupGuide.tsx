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
const CURSOR_PURPLE = '#8B5CF6';

// Desktop folder icon
const DesktopFolder: React.FC<{
  x: number;
  y: number;
  name: string;
  opacity: number;
  scale: number;
  highlight?: boolean;
}> = ({ x, y, name, opacity, scale, highlight }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      zIndex: 20,
      textAlign: 'center',
    }}
  >
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: 64,
          height: 50,
          background: highlight ? 'rgba(74,222,128,0.15)' : '#3a3a3a',
          border: `2px solid ${highlight ? GREEN : '#555'}`,
          borderRadius: '0 6px 6px 6px',
          boxShadow: highlight ? `0 0 20px ${GREEN}33` : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -10,
          left: 0,
          width: 28,
          height: 10,
          background: highlight ? 'rgba(74,222,128,0.15)' : '#3a3a3a',
          border: `2px solid ${highlight ? GREEN : '#555'}`,
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
        }}
      />
    </div>
    <div
      style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 11,
        color: highlight ? GREEN : 'rgba(255,255,255,0.6)',
        marginTop: 6,
        fontWeight: highlight ? 600 : 400,
      }}
    >
      {name}
    </div>
  </div>
);

// Terminal mini window
const MiniTerminal: React.FC<{
  opacity: number;
  scale: number;
  frame: number;
}> = ({ opacity, scale, frame }) => {
  const mkdirText = 'mkdir my-website';
  const elapsed = Math.max(0, frame - 80);
  const chars = Math.min(Math.floor(elapsed / 2), mkdirText.length);
  const typedText = mkdirText.slice(0, chars);
  const showOutput = frame >= 120;

  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 200,
        transform: `scale(${scale})`,
        opacity,
        zIndex: 25,
      }}
    >
      <div
        style={{
          width: 400,
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
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>Terminal</span>
        </div>

        <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: GREEN }}>$</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              {typedText}
              {frame >= 80 && frame < 115 && (
                <span style={{ opacity: frame % 15 < 8 ? 1 : 0, color: 'white' }}>|</span>
              )}
            </span>
          </div>
          {showOutput && (
            <div style={{ marginTop: 6, color: GREEN, fontSize: 12, opacity: 0.8 }}>
              ✓ Created my-website/
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Cursor IDE window (simplified)
const CursorWindow: React.FC<{
  opacity: number;
  scale: number;
  showFolder: boolean;
  frame: number;
}> = ({ opacity, scale, showFolder, frame }) => {
  const menuOpacity = interpolate(frame, [260, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const folderOpacity = interpolate(frame, [320, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 700,
        height: 380,
        opacity,
        zIndex: 30,
      }}
    >
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
            Cursor
          </span>
        </div>

        {/* Menu bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 12px',
            background: '#2a2a3a',
            gap: 16,
            fontSize: 12,
            fontFamily: 'system-ui, sans-serif',
            color: 'rgba(255,255,255,0.5)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ color: frame >= 260 ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: frame >= 260 ? 600 : 400 }}>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Terminal</span>
        </div>

        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
          {/* File menu dropdown */}
          {frame >= 260 && frame < 320 && (
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 0,
                width: 180,
                background: '#2a2a3a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '4px 0',
                zIndex: 50,
                opacity: menuOpacity,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              {['New File', 'New Window', 'Open File...'].map((item, i) => (
                <div key={i} style={{ padding: '5px 14px', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {item}
                </div>
              ))}
              <div
                style={{
                  padding: '5px 14px',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 12,
                  color: 'white',
                  background: `${CURSOR_PURPLE}33`,
                  fontWeight: 600,
                }}
              >
                Open Folder...
              </div>
              {['Save', 'Close'].map((item, i) => (
                <div key={i} style={{ padding: '5px 14px', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Sidebar */}
          <div
            style={{
              width: 200,
              background: '#252536',
              borderRight: '1px solid #333',
              padding: '12px 0',
            }}
          >
            {showFolder && (
              <div style={{ opacity: folderOpacity }}>
                <div style={{ padding: '0 12px', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Explorer
                  </span>
                </div>
                <div
                  style={{
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(74,222,128,0.08)',
                    borderLeft: `2px solid ${GREEN}`,
                  }}
                >
                  <span style={{ fontSize: 14 }}>📁</span>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: GREEN, fontWeight: 600 }}>
                    my-website
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Editor area */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!showFolder ? (
              <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.12)' }}>
                Open a folder to get started
              </span>
            ) : (
              <div style={{ textAlign: 'center', opacity: folderOpacity }}>
                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>
                  Ready for your first file
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FolderSetupGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-60): Desktop with existing folders
  const desktopOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (60-140): Terminal appears and types mkdir
  const termSpring = frame >= 60
    ? spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 3 (140-200): New folder appears on desktop
  const newFolderSpring = frame >= 140
    ? spring({ frame: frame - 140, fps, config: { damping: 12, stiffness: 180 } })
    : 0;

  // Phase 4 (200-250): Terminal fades, Cursor window appears
  const termFade = interpolate(frame, [200, 230], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const desktopFade = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorSpring = frame >= 230
    ? spring({ frame: frame - 230, fps, config: { damping: 14, stiffness: 150 } })
    : 0;

  // Phase 5 (260-340): File → Open Folder menu
  const showFolder = frame >= 320;

  // Phase 6 (400-480): Checkmark + label
  const checkSpring = frame >= 400
    ? spring({ frame: frame - 400, fps, config: { damping: 12, stiffness: 200 } })
    : 0;
  const finalLabelOpacity = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      {/* Desktop background label */}
      {frame < 240 && (
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: 30,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 12,
            color: 'rgba(255,255,255,0.15)',
            opacity: desktopOpacity * desktopFade,
            zIndex: 5,
          }}
        >
          ~/Desktop
        </div>
      )}

      {/* Existing desktop folders */}
      {frame < 240 && (
        <>
          <DesktopFolder x={800} y={150} name="Documents" opacity={desktopOpacity * desktopFade * 0.4} scale={0.8} />
          <DesktopFolder x={950} y={150} name="Downloads" opacity={desktopOpacity * desktopFade * 0.4} scale={0.8} />
        </>
      )}

      {/* New folder appearing */}
      {frame >= 140 && frame < 240 && (
        <DesktopFolder
          x={800}
          y={300}
          name="my-website"
          opacity={newFolderSpring * desktopFade}
          scale={interpolate(newFolderSpring, [0, 1], [0.5, 1])}
          highlight
        />
      )}

      {/* Terminal */}
      {frame >= 60 && frame < 240 && (
        <MiniTerminal
          opacity={termSpring * termFade}
          scale={interpolate(termSpring, [0, 1], [0.85, 1])}
          frame={frame}
        />
      )}

      {/* Cursor IDE window */}
      {frame >= 230 && (
        <CursorWindow
          opacity={cursorSpring}
          scale={interpolate(cursorSpring, [0, 1], [0.8, 1])}
          showFolder={showFolder}
          frame={frame}
        />
      )}

      {/* Green checkmark */}
      {frame >= 400 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 40,
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
      {frame >= 420 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 640,
            transform: 'translateX(-50%)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: 'white',
            opacity: finalLabelOpacity,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        >
          Your project folder is ready
        </div>
      )}
    </AbsoluteFill>
  );
};
