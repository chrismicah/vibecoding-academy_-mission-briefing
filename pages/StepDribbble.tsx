
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, ExternalLink, Camera } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';
import Magnet from '../components/Magnet';
import ElectricBorder from '../components/ElectricBorder';

const DribbbleBrowsePlayer = lazy(() => import('../components/remotion/DribbbleBrowsePlayer'));

const StepDribbble: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const searchExamples = [
    'portfolio website',
    'restaurant landing page',
    'SaaS dashboard',
    'personal blog minimal',
    'agency website dark',
    'e-commerce modern',
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
          <Palette className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-4">
          Find Design Inspiration
        </h2>

        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-4">
          Before you prompt anything, you need a <span className="text-white">visual target</span>. Browse real designs and save what speaks to you.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-sm max-w-lg mx-auto mb-10"
        >
          Think of it like renovating a house — you tear out magazine pages you love <span className="text-white">before</span> talking to the architect.
        </motion.p>

        {/* What is Dribbble */}
        <AnimatedContent>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              What is Dribbble?
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Dribbble (yes, three b's) is where professional designers post screenshots of websites and apps. You're going to use it like a <span className="text-white">mood board</span> — not looking for one perfect design, but <span className="text-white">pieces</span> you like from several.
            </p>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              <ExternalLink size={14} />
              Open dribbble.com
            </a>
          </div>
        </AnimatedContent>

        {/* Why references matter for AI */}
        <AnimatedContent delay={0.1}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Why this step matters
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              <span className="text-white">AI cannot see what you see.</span> When you say "make it modern," you'll get AI's interpretation — which may be completely different from yours. Screenshots give AI a concrete visual target instead of guessing.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Your job is to be a <span className="text-white">translator</span> between what you feel looks good and what you can describe. The better your references, the better your results.
            </p>
          </div>
        </AnimatedContent>

        {/* What to look for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-4">
            What to notice in each design
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
            {[
              { label: 'Colors', detail: 'Dark vs light, accent colors, background tones' },
              { label: 'Layout', detail: 'How sections stack, spacing, grid patterns' },
              { label: 'Typography', detail: 'Big bold headings? Thin elegant text?' },
              { label: 'Vibe', detail: 'Minimal? Playful? Corporate? Moody?' },
            ].map((item, i) => (
              <AnimatedContent key={item.label} delay={0.05 * i}>
                <TiltedCard tiltAmount={12} className="border border-zinc-800 rounded-xl bg-black/30">
                  <div className="p-3">
                    <p className="text-white text-xs font-bold mb-1">{item.label}</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{item.detail}</p>
                  </div>
                </TiltedCard>
              </AnimatedContent>
            ))}
          </div>
        </motion.div>

        {/* How to Browse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-4">
            Search for what you're building
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchExamples.map((term, i) => (
              <AnimatedContent key={term} delay={0.05 * i}>
                <Magnet strength={0.3} range={60}>
                  <div className="px-4 py-2 rounded-full border border-zinc-800 bg-black/30 text-zinc-400 text-xs font-mono cursor-default">
                    "{term}"
                  </div>
                </Magnet>
              </AnimatedContent>
            ))}
          </div>
        </motion.div>

        {/* Visual Guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowVideo(!showVideo)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showVideo ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="Watch: How to browse Dribbble" speed={2.5} delay={0.7} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showVideo && (
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
                    <DribbbleBrowsePlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Screenshot Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex justify-center mb-4">
            <Camera className="text-zinc-500" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">
            Save 3–5 Screenshots
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-4 border border-zinc-800 rounded-xl bg-black/30">
              <p className="text-white text-sm font-semibold mb-2">Mac</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">4</kbd>
              </p>
              <p className="text-zinc-500 text-xs mt-1">Drag to select. Saves to Desktop.</p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-xl bg-black/30">
              <p className="text-white text-sm font-semibold mb-2">Windows</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Win</kbd> + <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">S</kbd>
              </p>
              <p className="text-zinc-500 text-xs mt-1">Drag to select. Copies to clipboard — paste directly into Claude chat.</p>
            </div>
          </div>
        </motion.div>

        {/* What to note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8"
        >
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
            Jot down what you like
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            For each screenshot, write a quick note. These notes become your <span className="text-white">prompt fuel</span> later.
          </p>
          <div className="space-y-2">
            {[
              '"Love the big hero image and the minimal navigation"',
              '"Like this color palette — dark background with gold accents"',
              '"This gallery grid layout is exactly what I want"',
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="text-zinc-500 text-xs font-mono pl-4 border-l border-zinc-700"
              >
                {note}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <AnimatedContent>
          <div className="bg-zinc-900/10 border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-8">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              You're not looking for one perfect design. Mix and match — the nav from one, the colors from another, the layout from a third. <span className="text-white">3–5 screenshots</span> is the sweet spot.
            </p>
          </div>
        </AnimatedContent>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-2">
            Your mood board checklist
          </p>
          <Terminal
            title="Inspiration — checklist"
            commands={[
              { text: '# 1. Open dribbble.com', isComment: true },
              { text: '# 2. Search for your site type', isComment: true },
              { text: '# 3. Screenshot 3-5 designs you like', isComment: true },
              { text: '# 4. Save screenshots to your Desktop', isComment: true },
              { text: '# 5. Write a quick note for each one', isComment: true },
              { text: '' },
              { text: '✓ Mood board ready. You have your visual target.', isOutput: true },
            ]}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepDribbble;
