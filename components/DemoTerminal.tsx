
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

interface DemoTerminalProps {
  isBooting?: boolean;
  onBootComplete?: () => void;
}

const DEMO_COMMAND = 'Build me a sleek portfolio site with a dark theme, smooth animations, and a contact form.';

const DEMO_RESPONSE_LINES = [
  '✓ Creating project structure...',
  '  → Setting up React + Tailwind CSS',
  '  → Building responsive dark-themed layout',
  '  → Adding scroll-triggered animations',
  '  → Creating contact form with validation',
  '✓ Your site is ready. Run npm start to preview.',
];

const BOOT_LINES = [
  '[BOOT] Initializing mission systems...',
  '[OK]   Claude Code agent loaded',
  '[OK]   Terminal interface connected',
  '[OK]   Project scaffolding ready',
  '[OK]   Design engine online',
  '[OK]   Build pipeline configured',
  '[BOOT] All systems nominal',
  '[>>>>] Launching mission...',
];

const DemoTerminal: React.FC<DemoTerminalProps> = ({ isBooting = false, onBootComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState<'typing-claude' | 'welcome' | 'typing-prompt' | 'response' | 'pause'>('typing-claude');
  const [visibleResponseCount, setVisibleResponseCount] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Demo auto-typing loop
  useEffect(() => {
    if (isBooting) return;

    let cancelled = false;

    const typeText = (text: string, speed: number, onChar: (partial: string) => void, onDone: () => void) => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i < text.length) {
          i++;
          onChar(text.slice(0, i));
          timerRef.current = setTimeout(tick, speed + Math.random() * (speed * 0.5));
        } else {
          onDone();
        }
      };
      timerRef.current = setTimeout(tick, speed);
    };

    const startCycle = () => {
      if (cancelled) return;
      setPhase('typing-claude');
      setTypedText('');
      setVisibleResponseCount(0);

      // Step 1: Type "claude"
      typeText('claude', 80, setTypedText, () => {
        if (cancelled) return;
        // Step 2: Show welcome message
        timerRef.current = setTimeout(() => {
          if (cancelled) return;
          setPhase('welcome');
          // Step 3: Type the prompt
          timerRef.current = setTimeout(() => {
            if (cancelled) return;
            setPhase('typing-prompt');
            setTypedText('');
            typeText(DEMO_COMMAND, 25, setTypedText, () => {
              if (cancelled) return;
              // Step 4: Show response lines
              timerRef.current = setTimeout(() => {
                if (cancelled) return;
                setPhase('response');
                let lineIdx = 0;
                const showNextLine = () => {
                  if (cancelled) return;
                  if (lineIdx < DEMO_RESPONSE_LINES.length) {
                    lineIdx++;
                    setVisibleResponseCount(lineIdx);
                    timerRef.current = setTimeout(showNextLine, 350 + Math.random() * 200);
                  } else {
                    // Pause then restart
                    setPhase('pause');
                    timerRef.current = setTimeout(startCycle, 3000);
                  }
                };
                showNextLine();
              }, 500);
            });
          }, 600);
        }, 400);
      });
    };

    timerRef.current = setTimeout(startCycle, 1000);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [isBooting]);

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;

    let cancelled = false;
    setBootLines([]);
    let lineIdx = 0;

    const showNextBoot = () => {
      if (cancelled) return;
      if (lineIdx < BOOT_LINES.length) {
        const line = BOOT_LINES[lineIdx];
        lineIdx++;
        setBootLines(prev => [...prev, line]);
        timerRef.current = setTimeout(showNextBoot, 70 + Math.random() * 30);
      } else {
        timerRef.current = setTimeout(() => {
          if (!cancelled) onBootComplete?.();
        }, 200);
      }
    };

    timerRef.current = setTimeout(showNextBoot, 100);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [isBooting, onBootComplete]);

  const showClaude = phase !== 'typing-claude' || typedText.length > 0;
  const showWelcome = phase === 'welcome' || phase === 'typing-prompt' || phase === 'response' || phase === 'pause';
  const showPrompt = phase === 'typing-prompt' || phase === 'response' || phase === 'pause';
  const showResponse = phase === 'response' || phase === 'pause';

  // Boot mode render
  if (isBooting) {
    return (
      <motion.div className="w-full max-w-2xl mx-auto mt-8 overflow-hidden border border-zinc-800 rounded-xl bg-black/40 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-30" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-30" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <TerminalIcon size={14} className="text-green-400" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest text-green-400 font-medium">
                System Boot
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 font-mono text-xs leading-relaxed overflow-hidden">
          {bootLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.05 }}
              className={
                line.startsWith('[>>>>]')
                  ? 'text-white font-bold'
                  : line.startsWith('[OK]')
                    ? 'text-green-400'
                    : 'text-green-400/70'
              }
            >
              {line}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="w-2 h-3 bg-green-400/80 mt-1 inline-block align-middle"
          />
        </div>
      </motion.div>
    );
  }

  // Demo mode render
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-8 overflow-hidden border border-zinc-800 rounded-xl bg-black/40 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-30" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-30" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-30" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <TerminalIcon size={14} className="text-zinc-500" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">
              Terminal — sh
            </span>
          </div>
        </div>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[180px]">
        {/* Line 1: $ claude */}
        {showClaude && (
          <div className="flex gap-3">
            <span className="text-zinc-500 select-none">$</span>
            <span className="text-white">
              {phase === 'typing-claude' ? typedText : 'claude'}
            </span>
          </div>
        )}

        {/* Line 2: Welcome message */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-400 pl-5 mt-1.5"
          >
            Welcome to Claude Code! How can I help you today?
          </motion.div>
        )}

        {/* Line 3: User prompt */}
        {showPrompt && (
          <div className="flex gap-3 mt-3">
            <span className="text-purple-400 select-none">›</span>
            <span className="text-white">
              {phase === 'typing-prompt' ? typedText : DEMO_COMMAND}
            </span>
          </div>
        )}

        {/* Response lines */}
        {showResponse && visibleResponseCount > 0 && (
          <div className="mt-2">
            {DEMO_RESPONSE_LINES.slice(0, visibleResponseCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={`pl-5 mt-1 ${line.startsWith('✓') ? 'text-green-400' : 'text-zinc-500'}`}
              >
                {line}
              </motion.div>
            ))}
          </div>
        )}

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-white/80 ml-5 mt-2 inline-block align-middle"
        />
      </div>
    </motion.div>
  );
};

export default DemoTerminal;
