
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import { DecryptedText, ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';
import Magnet from '../components/Magnet';
import ElectricBorder from '../components/ElectricBorder';

const SpecDocPlayer = lazy(() => import('../components/remotion/SpecDocPlayer'));

const Step3: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

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
          <FileText className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          <DecryptedText text="The Architect Phase" speed={60} sequential revealDirection="start" animateOn="view" className="text-white" />
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-8">
          The most common failure is "Empty Prompt Syndrome" — typing "Make a website" without constraints.
          Separate your <span className="text-white">thinking</span> from your <span className="text-white">coding</span>.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-left"
        >
          <p className="text-zinc-300 text-sm leading-relaxed">
            Use a reasoning-heavy AI (like ChatGPT or Claude web) to <span className="text-white font-semibold">PLAN</span> your
            site before you <span className="text-white font-semibold">BUILD</span> it. This creates a "contract" for your coding agent,
            preventing hallucination and ensuring consistency across multiple sessions.
          </p>
        </motion.div>

        {/* Screenshots → Spec Doc flow */}
        <AnimatedContent>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Turn your screenshots into a spec doc
            </p>
            <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
              <p>1. Go to <span className="text-white">claude.ai</span> and start a new conversation</p>
              <p>2. <span className="text-white">Drag your Dribbble screenshots</span> directly into the chat — Claude can see images</p>
              <p>3. Tell Claude what you like about each screenshot and what you want built</p>
              <p>4. Ask Claude to output it as a <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">spec.md</code> file you can download</p>
              <p>5. Keep refining until you're happy — then download the file</p>
            </div>
          </div>
        </AnimatedContent>

        {/* Visual Guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <ShinyText text="Watch: Screenshots to spec doc" speed={2.5} delay={0.7} />
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
                    <SpecDocPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Architect Prompt Template */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">The Architect Prompt Template</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
          <AnimatedContent delay={0.25}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-5">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Role Definition</h3>
                <p className="text-zinc-500 text-sm">"Act as a Senior Product Manager and Software Architect. I am a non-technical user utilizing Claude Code to build a website."</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-5">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Project Goal</h3>
                <p className="text-zinc-500 text-sm">"I want to build a [type of site]. The vibe should be [adjective — modern, cozy, bold, etc.]."</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.35}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-5">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Technical Constraint</h3>
                <p className="text-zinc-500 text-sm">"Specify simple, modern tools: HTML + Tailwind CSS for static sites, or React + Vite for apps. Avoid complex backends."</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <div className="p-5">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Required Output</h3>
                <p className="text-zinc-500 text-sm">"Generate a design_spec.md with: File Structure, Color Palette (color codes like #FF0000), Typography, Page Requirements, and Hero Copy."</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
        </div>

        {/* Prompt engineering tips */}
        <AnimatedContent>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              How to write prompts that actually work
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Every great design prompt follows the same structure. Use this checklist when talking to AI:
            </p>
            <div className="space-y-2">
              {[
                { num: '1', text: 'State the problem clearly — what are you building? What\'s not working?' },
                { num: '2', text: 'Show visual references — attach your Dribbble screenshots' },
                { num: '3', text: 'Set constraints — "Use React + Tailwind. No complex backends."' },
                { num: '4', text: 'Request specific output — "Give me a spec.md with color codes, file structure, and page layouts"' },
                { num: '5', text: 'Define success — "I should be able to hand this to Claude Code and get a working site"' },
              ].map((item) => (
                <div key={item.num} className="flex gap-3 items-start">
                  <span className="text-green-400 text-xs font-mono font-bold mt-0.5">{item.num}</span>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Key phrases */}
        <AnimatedContent>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-4">
              Phrases that get better results
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                '"From a UI/UX perspective..."',
                '"Show me the actual values..."',
                '"Use existing resources from..."',
                '"Fix globally across..."',
                '"What specific elements..."',
              ].map((phrase, i) => (
                <AnimatedContent key={i} delay={0.05 * i}>
                  <Magnet strength={0.3} range={60}>
                    <div className="px-3 py-1.5 rounded-full border border-zinc-800 bg-black/30 text-green-400 text-xs font-mono cursor-default">
                      {phrase}
                    </div>
                  </Magnet>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Common pitfalls */}
        <AnimatedContent>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Pitfalls to avoid
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-red-400 text-xs font-bold mb-1">Saying "make it modern" without references</p>
                <p className="text-zinc-500 text-xs leading-relaxed">Subjective words mean different things. Always attach screenshots.</p>
              </div>
              <div>
                <p className="text-red-400 text-xs font-bold mb-1">Skipping the spec and jumping to code</p>
                <p className="text-zinc-500 text-xs leading-relaxed">Without a plan, Claude will hallucinate decisions you didn't intend.</p>
              </div>
              <div>
                <p className="text-red-400 text-xs font-bold mb-1">Stopping after the first attempt</p>
                <p className="text-zinc-500 text-xs leading-relaxed">Three rounds of iteration beats one "perfect" prompt every time. Keep refining.</p>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Save the spec doc */}
        <AnimatedContent>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Save the spec doc
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-2">
              Ask Claude: <span className="text-white">"Can you give me this as a downloadable markdown file called spec.md?"</span>
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              A markdown file is just a text file with simple formatting. The file extension is <code className="text-green-400 bg-zinc-900 px-1 py-0.5 rounded">.md</code>. Save it to your Desktop or project folder — your coding agent will understand it perfectly.
            </p>
          </div>
        </AnimatedContent>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-zinc-900/10 border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-8"
        >
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Pro Tip</p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Save the output as <span className="text-white font-mono">design_spec.md</span> on your Desktop. This file is the "contract" for your coding agent.
            Don't say "build a site" — say <span className="text-white">"Build the site described in design_spec.md."</span>
          </p>
        </motion.div>

        <Terminal
          commands={[
            { text: '# Example prompt for Claude.ai:', isComment: true },
            { text: '# "I have some design screenshots attached.', isComment: true },
            { text: '#  Build me a spec doc for a portfolio site', isComment: true },
            { text: '#  with this style. Output as spec.md"', isComment: true },
            { text: '' },
            { text: '# Once you have spec.md, tell Claude Code:', isComment: true },
            { text: 'Read design-spec.md and build the site described in it.' },
            { text: '✓ Reading design-spec.md...', isOutput: true },
            { text: '✓ Generating site structure from spec', isOutput: true },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Step3;
