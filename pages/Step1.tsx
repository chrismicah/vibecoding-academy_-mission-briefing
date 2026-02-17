
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, GitBranch, Key } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';

const Step1: React.FC = () => {
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
          <TerminalIcon className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Understand Your Tools
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-12">
          Before you build anything, you need to understand a few key tools. Don't worry — they're simpler than they sound.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-12">
          <AnimatedContent delay={0.2}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TerminalIcon size={18} className="text-zinc-400" />
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                    <ShinyText text="The Cockpit" />
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  The terminal isn't about memorizing commands. It's your <span className="text-white">chat interface with the AI</span>.
                  Unlike web-based Claude, terminal Claude Code has "hands" — it can read your files, create folders, and modify code directly.
                </p>
              </div>
            </TiltedCard>
          </AnimatedContent>

          <AnimatedContent delay={0.3}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={18} className="text-zinc-400" />
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                    <ShinyText text="Time Machine" />
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Git saves "snapshots" of your project at specific moments. If something breaks, <span className="text-white">rewind to before the error</span>.
                  Think of it as save points in a video game. You won't learn Git commands — Claude handles them.
                </p>
              </div>
            </TiltedCard>
          </AnimatedContent>

          <AnimatedContent delay={0.4}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Key size={18} className="text-zinc-400" />
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                    <ShinyText text="The Fuel" />
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Your API Key (your personal access pass) connects your terminal to powerful AI servers. It's like a <span className="text-white">digital credit card</span> —
                  every instruction costs money based on words processed. Set a billing limit to prevent surprises.
                </p>
              </div>
            </TiltedCard>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.45}>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-6">
            <p className="text-zinc-400 text-sm leading-relaxed">
              You'll also need an <span className="text-white">IDE</span> (code editor) — we'll set up <span className="text-white">Cursor</span> in Step 3. It's the app where your AI writes and organizes all your project files.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.5}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-12">
            <p className="text-zinc-400 text-sm mb-2 font-bold uppercase tracking-widest text-[11px]">Pro Tip</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              You don't need to learn any terminal commands. Just tell Claude what you want in plain English.
              Claude translates your intent into the exact code required.
            </p>
          </div>
        </AnimatedContent>

      </motion.div>
    </div>
  );
};

export default Step1;
