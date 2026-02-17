
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ChevronDown, Monitor, TerminalSquare } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';

const CursorTerminalPlayer = lazy(() => import('../components/remotion/CursorTerminalPlayer'));

const Step4: React.FC = () => {
  const [showTerminalVideo, setShowTerminalVideo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-40 text-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <div className="flex justify-center mb-8">
          <FolderOpen className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Initialize Your Project
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-4">
          Open your project folder, launch Claude, and give your AI a memory.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-zinc-500 text-sm max-w-lg mx-auto mb-12"
        >
          Remember: <span className="text-white">Cursor</span> is just for viewing your files. The terminal is where you actually talk to Claude.
        </motion.p>

        {/* Where to run Claude */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-4">
            Where do you run Claude?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <AnimatedContent delay={0.2}>
              <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Monitor size={16} className="text-purple-400" />
                    <p className="text-white text-sm font-bold">Inside Cursor</p>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Cursor has a <span className="text-white">built-in terminal</span> at the bottom of the window. You can type <span className="text-white font-mono text-xs">claude</span> right there — and see your code update above in real time.
                  </p>
                </div>
              </TiltedCard>
            </AnimatedContent>
            <AnimatedContent delay={0.25}>
              <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <TerminalSquare size={16} className="text-green-400" />
                    <p className="text-white text-sm font-bold">In a separate terminal</p>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Open Terminal (Mac) or PowerShell (Windows) as a <span className="text-white">separate app</span>. Claude works the same way — and Cursor still shows your code updating live.
                  </p>
                </div>
              </TiltedCard>
            </AnimatedContent>
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-8"
        >
          <p className="text-zinc-400 text-sm leading-relaxed">
            <span className="text-white">The IDE is your window.</span> It lets you see what Claude is building — the folders, the files, the code. But you don't type code there. You talk to Claude in the terminal, and <span className="text-white">watch the results appear</span> in Cursor.
          </p>
        </motion.div>

        {/* Remotion video toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowTerminalVideo(!showTerminalVideo)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showTerminalVideo ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="Watch: Terminal inside vs. outside Cursor" speed={2.5} delay={0.7} />
          </button>
          <AnimatePresence>
            {showTerminalVideo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <Suspense
                    fallback={
                      <div className="w-full aspect-video bg-black/40 rounded-xl border border-zinc-800 flex items-center justify-center">
                        <div className="text-zinc-600 text-sm">Loading animation...</div>
                      </div>
                    }
                  >
                    <CursorTerminalPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 max-w-md mx-auto mb-10">
          <AnimatedContent>
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="text-white text-sm font-bold mb-1">Navigate to your project & launch Claude</p>
                <p className="text-zinc-500 text-sm">Open a terminal (inside Cursor or separately), go to your project folder, and type <span className="text-white font-mono text-xs">claude</span>. The first time, it opens your browser for a quick sign-in. After that, it remembers you.</p>
              </div>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.1}>
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-white text-sm font-bold mb-1">Create the CLAUDE.md memory file</p>
                <p className="text-zinc-500 text-sm">This is your project's instruction manual for Claude. It remembers your design decisions, tools, and rules — even across sessions.</p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        <Terminal
          title="Project Setup"
          commands={[
            { text: '# Navigate to your project folder', isComment: true },
            { text: 'cd ~/Desktop/my-website' },
            { text: '# Launch Claude Code', isComment: true },
            { text: 'claude' },
            { text: '✓ Authenticated. Welcome to Claude Code!', isOutput: true }
          ]}
        />

        {/* CLAUDE.md explanation */}
        <AnimatedContent>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-10 mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">CLAUDE.md — Your AI's Memory</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Think of this as a briefing document. It tells Claude your design style, the tech you're using, and any rules to follow. Without it, Claude might "forget" what you told it earlier.
            </p>
          </div>
        </AnimatedContent>

        <Terminal
          title="Create Memory File"
          commands={[
            { text: '# Tell Claude to create its own memory file:', isComment: true },
            { text: 'Create a CLAUDE.md file in the root of the project. In this file, summarize the core design principles from the spec, the tools we\'re using (e.g., React/Tailwind), and the rule that you should always check this file before writing code.' },
            { text: '✓ Created CLAUDE.md', isOutput: true }
          ]}
        />

        <AnimatedContent>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-8 mb-8">
            <p className="text-zinc-400 text-sm mb-2 font-bold uppercase tracking-widest text-[11px]">Pro Tip</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              You can <span className="text-white">drag and drop</span> your design_spec.md file directly into the terminal window.
              It automatically converts the file into a path that Claude can read.
            </p>
          </div>
        </AnimatedContent>

        {/* The iteration mindset */}
        <AnimatedContent>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              The refinement loop
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Building with AI is a <span className="text-white">conversation, not a one-shot request</span>. The best results come from structured rounds of feedback:
            </p>
            <div className="space-y-2">
              {[
                { round: 'Round 1', label: 'Foundations', desc: 'Get the layout, colors, and basic structure right' },
                { round: 'Round 2', label: 'Consistency', desc: 'Make sure every page matches — no leftover rough spots' },
                { round: 'Round 3', label: 'Refinement', desc: 'Fix details: spacing, font sizes, alignment' },
                { round: 'Round 4', label: 'Polish', desc: 'Add hover effects, transitions, and the "wow factor"' },
              ].map((item, i) => (
                <AnimatedContent key={i} delay={0.08 * i}>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-[10px] font-mono font-bold whitespace-nowrap mt-0.5">{item.round}</span>
                    <div>
                      <span className="text-white text-sm font-bold">{item.label}</span>
                      <span className="text-zinc-500 text-sm"> — {item.desc}</span>
                    </div>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Show don't tell */}
        <AnimatedContent>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Key Principle</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              <span className="text-white">Show, don't just tell.</span> When something doesn't look right, screenshot it and ask Claude <span className="text-white">"What's different between my site and this reference?"</span> — giving Claude an image beats describing the problem in words every time.
            </p>
          </div>
        </AnimatedContent>
      </motion.div>
    </div>
  );
};

export default Step4;
