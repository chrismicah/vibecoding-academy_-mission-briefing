
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';

interface TerminalLine {
  text: string;
  isOutput?: boolean;
  isComment?: boolean;
}

interface TerminalProps {
  command?: string;
  commands?: TerminalLine[];
  title?: string;
}

/**
 * CopyConfirmText — Staggered character reveal with spring physics
 * Inspired by reactbits.dev CountUp/SplitText pattern.
 * On first copy: characters spring in one-by-one.
 * On subsequent copies: instant reveal (minimal animation for returning users).
 */
const CopyConfirmText: React.FC<{ show: boolean; fast: boolean }> = ({ show, fast }) => {
  const text = 'Command Copied';
  const staggerDelay = fast ? 0 : 0.025;

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className="flex items-center gap-[1px] text-[10px] uppercase tracking-widest font-medium text-green-400 overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: fast ? 0.1 : 0.2 }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * staggerDelay,
                type: 'spring',
                stiffness: fast ? 400 : 200,
                damping: fast ? 30 : 15,
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

/**
 * CopyButton — Reusable copy button with icon swap and confirmation text.
 * Tracks copy count to speed up animation for returning users.
 */
export const CopyButton: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const copyCount = useRef(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      copyCount.current += 1;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!text) return null;

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 p-1.5 rounded-md hover:bg-zinc-800 transition-colors group ${className}`}
    >
      <CopyConfirmText show={copied} fast={copyCount.current > 1} />
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Check size={14} className="text-green-400" />
          </motion.div>
        ) : (
          <motion.div key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Copy size={14} className="text-zinc-500 group-hover:text-zinc-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const Terminal: React.FC<TerminalProps> = ({ command, commands, title }) => {
  const lines: TerminalLine[] = commands
    ? commands
    : command
      ? [{ text: command }]
      : [];

  const copyableText = lines
    .filter(l => !l.isOutput && !l.isComment)
    .map(l => l.text)
    .join('\n');

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
              {title || 'Terminal — sh'}
            </span>
          </div>
        </div>
        <CopyButton text={copyableText} />
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`flex gap-3 ${index > 0 ? 'mt-1.5' : ''}`}
          >
            {line.isComment ? (
              <span className="text-zinc-600 select-none">{line.text}</span>
            ) : line.isOutput ? (
              <span className="text-zinc-400 pl-5">{line.text}</span>
            ) : (
              <>
                <span className="text-zinc-500 select-none">$</span>
                <span className="text-white">{line.text}</span>
              </>
            )}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-white/80 ml-5 mt-2 inline-block align-middle"
        />
      </div>
    </motion.div>
  );
};

export default Terminal;
