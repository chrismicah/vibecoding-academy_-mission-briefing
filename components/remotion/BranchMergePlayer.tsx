import React, { useState, useCallback } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { BranchMergeGuide } from './BranchMergeGuide';

const FPS = 30;
const DURATION = 540;
const WIDTH = 1280;
const HEIGHT = 720;

const BranchMergePlayer: React.FC = () => {
  const playerRef = React.useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ended, setEnded] = useState(false);

  const handleTogglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleReplay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(0);
    player.play();
    setIsPlaying(true);
    setEnded(false);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 672, margin: '0 auto' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(63,63,70,0.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <Player
          ref={playerRef}
          component={BranchMergeGuide}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          durationInFrames={DURATION}
          fps={FPS}
          autoPlay
          loop={false}
          acknowledgeRemotionLicense
          style={{
            width: '100%',
            aspectRatio: '16/9',
          }}
          onEnded={() => {
            setIsPlaying(false);
            setEnded(true);
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginTop: 10,
        }}
      >
        <button
          onClick={handleTogglePlay}
          style={{
            background: 'none',
            border: '1px solid rgba(63,63,70,0.5)',
            borderRadius: 8,
            padding: '6px 16px',
            color: '#a1a1aa',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleReplay}
          style={{
            background: 'none',
            border: '1px solid rgba(63,63,70,0.5)',
            borderRadius: 8,
            padding: '6px 16px',
            color: '#a1a1aa',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase' as const,
            cursor: 'pointer',
            fontFamily: 'system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay
        </button>
      </div>
    </div>
  );
};

export default BranchMergePlayer;
