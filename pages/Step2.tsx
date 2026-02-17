
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Download, ChevronDown, RotateCcw, Clipboard, CornerDownLeft, ExternalLink } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal, { CopyButton } from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';

// Lazy-load the Remotion player so it doesn't block initial render
const TerminalGuidePlayer = lazy(() => import('../components/remotion/TerminalGuidePlayer'));

// Typing animation that triggers when scrolled into view
const TypingTerminal: React.FC<{
  lines: { text: string; isOutput?: boolean; isComment?: boolean }[];
  title?: string;
}> = ({ lines, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (!isInView) return;
    if (visibleLines >= lines.length) return;

    const line = lines[visibleLines];

    // For outputs/comments, show instantly after a short pause
    if (line.isOutput || line.isComment) {
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1);
        setTypingIndex(0);
        setCurrentText('');
      }, line.isOutput ? 400 : 200);
      return () => clearTimeout(timer);
    }

    // For commands, type character by character
    if (typingIndex < line.text.length) {
      const timer = setTimeout(() => {
        setCurrentText(line.text.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timer);
    }

    // Done typing this line, pause then move to next
    const timer = setTimeout(() => {
      setVisibleLines(v => v + 1);
      setTypingIndex(0);
      setCurrentText('');
    }, 500);
    return () => clearTimeout(timer);
  }, [isInView, visibleLines, typingIndex, lines]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mx-auto mt-6 overflow-hidden border border-zinc-800 rounded-xl bg-black/40 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium ml-4">
            {title || 'Terminal'}
          </span>
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[80px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={`flex gap-3 ${i > 0 ? 'mt-1.5' : ''}`}>
              {line.isComment ? (
                <span className="text-zinc-600 select-none">{line.text}</span>
              ) : line.isOutput ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-400 pl-5"
                >
                  {line.text}
                </motion.span>
              ) : (
                <>
                  <span className="text-zinc-500 select-none">$</span>
                  <span className="text-white">{line.text}</span>
                </>
              )}
            </div>
          ))}
          {/* Currently typing line */}
          {visibleLines < lines.length && !lines[visibleLines].isOutput && !lines[visibleLines].isComment && (
            <div className={`flex gap-3 ${visibleLines > 0 ? 'mt-1.5' : ''}`}>
              <span className="text-zinc-500 select-none">$</span>
              <span className="text-white">
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-white/80 ml-0.5 align-middle"
                />
              </span>
            </div>
          )}
          {visibleLines >= lines.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-4 bg-white/80 ml-5 mt-2 inline-block align-middle"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Copy → Paste → Enter micro-animation
const CopyPasteAnimation: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const steps = [
    { icon: Clipboard, label: 'Copy', color: 'text-zinc-500' },
    { icon: Clipboard, label: 'Paste', color: 'text-green-400' },
    { icon: CornerDownLeft, label: 'Enter', color: 'text-white' },
  ];

  return (
    <div ref={ref} className="flex items-center justify-center gap-6 my-6">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = step > i;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-px bg-zinc-600 origin-left"
              />
            )}
            <motion.div
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                scale: isActive ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`p-2 rounded-lg border ${isActive ? 'border-zinc-600 bg-zinc-800/50' : 'border-zinc-800'}`}>
                <Icon size={16} className={isActive ? s.color : 'text-zinc-700'} />
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-medium ${isActive ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {s.label}
              </span>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Sequential reveal install steps with replay
const SequentialInstall: React.FC<{
  steps: { title: string; description: string; command: string; color: string }[];
}> = ({ steps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const [revealed, setRevealed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;
    setHasStarted(true);
    setRevealed(0);
  }, [isInView]);

  useEffect(() => {
    if (!hasStarted) return;
    if (revealed >= steps.length) return;
    const timer = setTimeout(() => setRevealed(r => r + 1), 800);
    return () => clearTimeout(timer);
  }, [hasStarted, revealed, steps.length]);

  const handleReplay = () => {
    setRevealed(0);
    setHasStarted(false);
    setTimeout(() => {
      setHasStarted(true);
    }, 100);
  };

  return (
    <div ref={ref} className="space-y-3 relative">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: i < revealed ? 1 : 0.15,
            x: i < revealed ? 0 : -20,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="p-4 border border-zinc-800 rounded-xl bg-black/30 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
              i < revealed ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-600'
            }`}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold mb-1">{step.title}</p>
              <p className="text-zinc-500 text-xs mb-2">{step.description}</p>
              <div className="flex items-center gap-2 bg-zinc-900 rounded-lg overflow-hidden">
                <code className={`${step.color} text-xs px-3 py-1.5 block overflow-x-auto font-mono flex-1`}>
                  {step.command}
                </code>
                <CopyButton text={step.command} className="flex-shrink-0 mr-1" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      {revealed >= steps.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-2"
        >
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-widest transition-colors"
          >
            <RotateCcw size={12} />
            Replay
          </button>
        </motion.div>
      )}
    </div>
  );
};

const Step2: React.FC = () => {
  const [os, setOs] = useState<'mac' | 'windows'>('mac');
  const [showTerminalHelp, setShowTerminalHelp] = useState(false);

  const macSteps = [
    {
      title: 'Install Homebrew (a tool manager for Mac)',
      description: 'Homebrew lets you install developer tools with simple commands. Paste this into Terminal.',
      command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      color: 'text-green-400',
    },
    {
      title: 'Install Git (tracks your project history)',
      description: 'Git saves snapshots of your work so you can undo mistakes. Homebrew handles the install.',
      command: 'brew install git',
      color: 'text-green-400',
    },
    {
      title: 'Install Claude Code (your AI coding partner)',
      description: 'This is the AI agent that writes code for you based on your descriptions.',
      command: 'curl -fsSL https://claude.ai/install.sh | bash',
      color: 'text-green-400',
    },
    {
      title: 'Fix PATH if needed',
      description: 'If "claude" gives a "command not found" error, run this to tell your Mac where to find it.',
      command: 'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc',
      color: 'text-green-400',
    },
  ];

  const windowsSteps = [
    {
      title: 'Install Git (tracks your project history)',
      description: 'Open PowerShell as Administrator, then paste this command.',
      command: 'winget install --id Git.Git -e --source winget',
      color: 'text-blue-400',
    },
    {
      title: 'Install Node.js (runs JavaScript tools)',
      description: 'Node.js powers the build tools behind modern websites.',
      command: 'winget install OpenJS.NodeJS.LTS',
      color: 'text-blue-400',
    },
    {
      title: 'Install Claude Code (your AI coding partner)',
      description: 'This is the AI agent that writes code for you based on your descriptions.',
      command: 'irm https://claude.ai/install.ps1 | iex',
      color: 'text-blue-400',
    },
    {
      title: 'Fix PATH if needed',
      description: 'If "claude" gives a "command not found" error, run this to update your system path.',
      command: '[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\\.local\\bin", "User")',
      color: 'text-blue-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-40 text-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl w-full"
      >
        <div className="flex justify-center mb-8">
          <Download className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-4">
          Install Your Toolchain
        </h2>

        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-4">
          Everything you need, installed in under 10 minutes. Just copy, paste, and press enter.
        </p>

        {/* What is a terminal? */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-sm max-w-lg mx-auto mb-6"
        >
          A <span className="text-white">terminal</span> is a text window where you type commands to control your computer — think of it as texting your machine directly.
        </motion.p>

        {/* OS Toggle — placed early so the Remotion guide and install steps reflect the choice */}
        <div className="flex justify-center gap-2 mt-4 mb-2">
          <button
            onClick={() => setOs('mac')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
              os === 'mac'
                ? 'bg-white text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setOs('windows')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
              os === 'windows'
                ? 'bg-white text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Windows
          </button>
        </div>

        <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-8">
          Choose your operating system
        </p>

        {/* Expandable: How to open Terminal with Remotion animated guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <button
            onClick={() => setShowTerminalHelp(!showTerminalHelp)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showTerminalHelp ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="How do I open a terminal?" speed={2.5} delay={0.7} />
          </button>
          <AnimatePresence>
            {showTerminalHelp && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {/* Quick text instructions */}
                  <div className="p-4 border border-zinc-800 rounded-xl bg-black/30 text-left text-sm space-y-2">
                    <p className="text-zinc-300">
                      <span className="text-white font-semibold">Mac:</span>{' '}
                      Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Space</kbd>, type "Terminal", press Enter.
                    </p>
                    <p className="text-zinc-300">
                      <span className="text-white font-semibold">Windows:</span>{' '}
                      Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Win</kbd> key, type "PowerShell", right-click → Run as Administrator.
                    </p>
                  </div>

                  {/* Animated visual guide */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-2 text-center">
                      Visual guide — {os === 'mac' ? 'macOS' : 'Windows'}
                    </p>
                    <Suspense
                      fallback={
                        <div className="w-full aspect-video bg-black/40 rounded-xl border border-zinc-800 flex items-center justify-center">
                          <div className="text-zinc-600 text-sm">Loading animation...</div>
                        </div>
                      }
                    >
                      <TerminalGuidePlayer os={os} />
                    </Suspense>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Copy-Paste-Enter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">For every command below</p>
          <CopyPasteAnimation />
        </motion.div>

        {/* Step 0: Download Node.js */}
        <AnimatedContent><div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-6 text-left">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
            First: Download Node.js
          </p>
          <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
            Node.js runs JavaScript tools behind the scenes. Download the installer, open it, and click "Next" until it's done — just like installing any app.
          </p>
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            Download from nodejs.org (LTS version)
          </a>
        </div></AnimatedContent>

        {/* Verify Node.js - typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-1">
            After installing, verify it works
          </p>
          <TypingTerminal
            title="Verify Node.js"
            lines={[
              { text: 'node --version' },
              { text: 'v20.11.0', isOutput: true },
            ]}
          />
        </motion.div>

        {/* Sequential reveal install steps */}
        <div className="max-w-2xl mx-auto mb-8 text-left">
          <AnimatePresence mode="wait">
            {os === 'mac' ? (
              <motion.div
                key="mac-steps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SequentialInstall steps={macSteps} />
              </motion.div>
            ) : (
              <motion.div
                key="win-steps"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SequentialInstall steps={windowsSteps} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Troubleshooting */}
        <AnimatedContent><div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8">
          <p className="text-zinc-400 text-sm mb-2 font-bold uppercase tracking-widest text-[11px]">Troubleshooting</p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            If you get "command not found" after installing, <span className="text-white">close and reopen your terminal</span>.
            This refreshes the system PATH — it's the #1 fix for installation issues.
          </p>
        </div></AnimatedContent>

        {/* Full install terminal - typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-1">
            Full install sequence
          </p>
          <TypingTerminal
            title={os === 'mac' ? 'Full Mac Install' : 'Full Windows Install'}
            lines={
              os === 'mac'
                ? [
                    { text: '# Step 1: Install Homebrew', isComment: true },
                    { text: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
                    { text: '# Step 2: Install Git', isComment: true },
                    { text: 'brew install git' },
                    { text: '# Step 3: Install Claude Code', isComment: true },
                    { text: 'curl -fsSL https://claude.ai/install.sh | bash' },
                    { text: '# Step 4: Verify', isComment: true },
                    { text: 'git --version' },
                    { text: 'git version 2.44.0', isOutput: true },
                    { text: 'claude' },
                    { text: '✓ Claude Code ready', isOutput: true },
                  ]
                : [
                    { text: '# Step 1: Install Git (Admin PowerShell)', isComment: true },
                    { text: 'winget install --id Git.Git -e --source winget' },
                    { text: '# Step 2: Install Node.js', isComment: true },
                    { text: 'winget install OpenJS.NodeJS.LTS' },
                    { text: '# Step 3: Install Claude Code', isComment: true },
                    { text: 'irm https://claude.ai/install.ps1 | iex' },
                    { text: '# Step 4: Verify', isComment: true },
                    { text: 'git --version' },
                    { text: 'git version 2.44.0', isOutput: true },
                    { text: 'claude' },
                    { text: '✓ Claude Code ready', isOutput: true },
                  ]
            }
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Step2;
