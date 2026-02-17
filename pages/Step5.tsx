
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, ChevronDown } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';

const BuildLoopPlayer = lazy(() => import('../components/remotion/BuildLoopPlayer'));

const Step5: React.FC = () => {
  const [showBuildGuide, setShowBuildGuide] = useState(false);

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
          <Hammer className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Build with Vibe Coding
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-8">
          The core loop: <span className="text-white">Prompt</span> → <span className="text-white">Preview</span> → <span className="text-white">Refine</span>.
          You describe what you want. Claude writes the code. Repeat until it's perfect.
        </p>

        {/* Expandable: Build loop visual guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowBuildGuide(!showBuildGuide)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showBuildGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="How does the build process work?" speed={2.5} delay={0.7} />
          </button>
          <AnimatePresence>
            {showBuildGuide && (
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
                    <BuildLoopPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* The Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-10">
          <AnimatedContent delay={0.2}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Prompt</h3>
                <p className="text-zinc-500 text-sm">Describe what you want in natural language. Be specific about the vibe, not the code.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Preview</h3>
                <p className="text-zinc-500 text-sm">Run the site locally to see the result. Use a preview tool to see it in your browser.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Refine</h3>
                <p className="text-zinc-500 text-sm">Tell Claude what to change. Focus on how it looks and feels, not the technical fix.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
        </div>

        {/* Good vs Bad prompting */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Prompting Matters</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
          <AnimatedContent delay={0.45}>
            <div className="p-5 border border-red-900/30 rounded-2xl bg-red-950/10">
              <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Bad Prompt</h3>
              <p className="text-zinc-400 text-sm font-mono">"Fix the nav bar."</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.5}>
            <div className="p-5 border border-green-900/30 rounded-2xl bg-green-950/10">
              <h3 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Good Prompt (Vibe Coding)</h3>
              <p className="text-zinc-400 text-sm font-mono">"The navigation bar feels too cramped. Increase the space between the links. Make the logo bigger and change the background to a translucent blur, like frosted glass."</p>
            </div>
          </AnimatedContent>
        </div>

        {/* Context & Errors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
          <AnimatedContent delay={0.55}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Managing Context</h3>
              <p className="text-zinc-500 text-sm">If Claude gives confused answers, type <span className="text-white font-mono">/compact</span> (clears Claude's memory to save space) to compress history and free up memory for new tasks.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.6}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Handling Errors</h3>
              <p className="text-zinc-500 text-sm">Red text? Copy the error, paste it to Claude: <span className="text-white">"I got this error. Explain what's wrong and fix it."</span> Claude will self-heal.</p>
            </div>
          </AnimatedContent>
        </div>

        <Terminal
          title="Build Your Site"
          commands={[
            { text: '# Generate the initial structure from your spec:', isComment: true },
            { text: 'Using the design-spec.md, generate a basic HTML structure for the homepage. Include CSS for styling and JS for simple interactions like a menu toggle. Create files: index.html, styles.css, script.js.' },
            { text: '✓ Created index.html, styles.css, script.js', isOutput: true },
            { text: '# Add a contact form:', isComment: true },
            { text: 'Add a contact form that emails submissions using Formspree (a free service that emails you when someone fills out your form). Integrate it into contact.html.' },
            { text: '✓ Created contact.html with Formspree integration', isOutput: true },
            { text: '# Optimize and add SEO:', isComment: true },
            { text: 'Make the site faster—optimize images and code. Generate SEO-friendly meta tags.' },
            { text: '✓ Optimized assets, added meta tags', isOutput: true }
          ]}
        />

        <Terminal
          title="Preview Locally"
          commands={[
            { text: 'npm install -g live-server' },
            { text: 'live-server' },
            { text: 'Serving at http://localhost:8080', isOutput: true }
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Step5;
