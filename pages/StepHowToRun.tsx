
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronDown, RotateCcw, Lightbulb } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import ElectricBorder from '../components/ElectricBorder';

const RunSitePlayer = lazy(() => import('../components/remotion/RunSitePlayer'));

const StepHowToRun: React.FC = () => {
  const [showVisualGuide, setShowVisualGuide] = useState(false);

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
          <Play className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          How to Run Your Site
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-8">
          You've built something. Now let's make sure you can <span className="text-white">see it anytime</span> with one simple sentence.
        </p>

        {/* The Problem */}
        <AnimatedContent delay={0.15}>
          <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10 text-left max-w-2xl mx-auto mb-8">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-3">The Problem</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every time you want to preview your website, you'd normally need to remember technical commands —
              which folder to be in, what to type, what port number to use. That's annoying and easy to forget.
              So instead, we're going to create a <span className="text-white">cheat sheet</span> that Claude can read for you.
            </p>
          </div>
        </AnimatedContent>

        {/* The Solution */}
        <AnimatedContent delay={0.25}>
          <div className="p-5 border border-green-900/30 rounded-2xl bg-green-950/10 text-left max-w-2xl mx-auto mb-8">
            <h3 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">The Solution</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              You'll ask Claude to create a small file called <span className="text-white font-mono">how_to_run.md</span> that
              contains all the instructions needed to run your site. Then, every time you want to see your site,
              you just tell Claude: <span className="text-green-400">"refer to that file and run it."</span> That's it. One sentence.
            </p>
          </div>
        </AnimatedContent>

        {/* Visual guide expandable */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowVisualGuide(!showVisualGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showVisualGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="Watch how it works" speed={2.5} delay={0.7} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showVisualGuide && (
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
                    <RunSitePlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Step 1: Create the file */}
        <AnimatedContent delay={0.35}>
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-4">Step 1 — Create Your Run File</p>
        </AnimatedContent>

        <AnimatedContent delay={0.4}>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-6">
            Open Claude Code in your project folder and type this prompt. Claude will look at your project,
            figure out exactly what's needed to run it, and write it all down for you.
          </p>
        </AnimatedContent>

        <Terminal
          title="Claude Code"
          commands={[
            { text: "Create a 'how_to_run.md' file with instructions on how to run this project" },
            { text: '' },
            { text: "Claude will create a file that includes:", isComment: true },
            { text: "— What commands to run (e.g., npm install, npm start)", isComment: true },
            { text: "— What folder to be in", isComment: true },
            { text: "— What URL to open in your browser", isComment: true },
            { text: '' },
            { text: '✓ Created how_to_run.md', isOutput: true },
          ]}
        />

        {/* Step 2: The Magic Command */}
        <AnimatedContent delay={0.5}>
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-4 mt-12">Step 2 — Run Your Site (Every Time)</p>
        </AnimatedContent>

        <AnimatedContent delay={0.55}>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-6">
            Now, every single time you want to see your website, just open Claude Code and type this one sentence.
            Claude reads the file, follows the instructions, and your site starts running.
          </p>
        </AnimatedContent>

        <Terminal
          title="Claude Code — Your New Run Command"
          commands={[
            { text: "Refer to how_to_run.md to run this" },
            { text: '' },
            { text: '✓ Installing dependencies...', isOutput: true },
            { text: '✓ Starting development server...', isOutput: true },
            { text: '✓ Ready at http://localhost:3000', isOutput: true },
          ]}
        />

        {/* That's It */}
        <AnimatedContent delay={0.65}>
          <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10 text-left max-w-2xl mx-auto mt-12 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <RotateCcw size={16} className="text-green-400" />
              <h3 className="text-white text-xs font-bold uppercase tracking-widest">That's Your Whole Workflow</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every time you come back to your project and want to see it running, just type:
            </p>
            <p className="text-white font-mono text-sm mt-3 mb-3 pl-4 border-l-2 border-green-400/40">
              "Refer to how_to_run.md to run this"
            </p>
            <p className="text-zinc-500 text-sm">
              That's it. No memorizing commands. No Googling. One sentence, every time.
            </p>
          </div>
        </AnimatedContent>

        {/* Pro Tip */}
        <AnimatedContent delay={0.75}>
          <div className="p-5 border border-yellow-900/30 rounded-2xl bg-yellow-950/10 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb size={16} className="text-yellow-400" />
              <h3 className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Pro Tip</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Do this for <span className="text-white">every new project</span> you create. The first thing you ask Claude after building
              your site should be to create this file. Think of it like leaving yourself a note on how to start the car —
              future you will thank present you.
            </p>
          </div>
        </AnimatedContent>
      </motion.div>
    </div>
  );
};

export default StepHowToRun;
