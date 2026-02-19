
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, ChevronDown } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';
import ElectricBorder from '../components/ElectricBorder';

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
          <ElectricBorder>
          <button
            onClick={() => setShowBuildGuide(!showBuildGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showBuildGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="How does the build process work?" speed={2.5} delay={0.7} />
          </button>
          </ElectricBorder>
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

        {/* Prompting Matters — Weakness Analysis */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Prompting Matters</p>

        {/* The weak prompt */}
        <AnimatedContent delay={0.45}>
          <div className="p-5 border border-red-900/30 rounded-2xl bg-red-950/10 text-left max-w-2xl mx-auto mb-6">
            <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Weak Prompt</h3>
            <p className="text-zinc-400 text-sm font-mono">"Using the design-spec.md, generate a basic HTML structure for the homepage. Include CSS for styling and JS for simple interactions like a menu toggle. Create files: index.html, styles.css, script.js."</p>
          </div>
        </AnimatedContent>

        {/* Key weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
          <AnimatedContent delay={0.5}>
            <div className="p-5 border border-red-900/20 rounded-2xl bg-red-950/5">
              <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Problem: "Basic"</h3>
              <p className="text-zinc-500 text-sm">The word <span className="text-red-300 font-mono">"basic"</span> anchors the output toward minimal, generic results. Claude will do the least possible. Remove it entirely and replace it with quality-signaling language.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.55}>
            <div className="p-5 border border-red-900/20 rounded-2xl bg-red-950/5">
              <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Problem: Vague Aesthetics</h3>
              <p className="text-zinc-500 text-sm"><span className="text-red-300 font-mono">"Looks really good"</span> means nothing to an AI. You need to specify <span className="text-white">what kind of good</span> — modern SaaS? Editorial? Bold and minimal? Dark luxury? Without direction, you get a generic Bootstrap-looking page.</p>
            </div>
          </AnimatedContent>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
          <AnimatedContent delay={0.65}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Specificity Beats Vagueness</h3>
              <p className="text-zinc-500 text-sm">Instead of "looks good," describe the <span className="text-white">feel and the techniques</span>. Instead of "CSS for styling," name the actual CSS patterns you want. Instead of "simple interactions," list each interaction explicitly.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.7}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Creative Brief, Not Task List</h3>
              <p className="text-zinc-500 text-sm">You're giving Claude a <span className="text-white">creative brief</span>, not just a task list. The more it reads like something a designer handed to a developer, the better the output.</p>
            </div>
          </AnimatedContent>
        </div>

        {/* Context & Errors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
          <AnimatedContent delay={0.75}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Managing Context</h3>
              <p className="text-zinc-500 text-sm">If Claude gives confused answers, type <span className="text-white font-mono">/compact</span> (clears Claude's memory to save space) to compress history and free up memory for new tasks.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.8}>
            <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-2">Handling Errors</h3>
              <p className="text-zinc-500 text-sm">Red text? Copy the error, paste it to Claude: <span className="text-white">"I got this error. Explain what's wrong and fix it."</span> Claude will self-heal.</p>
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.85}>
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-6">Stronger Version</p>
        </AnimatedContent>

        <Terminal
          title="Build Your Site"
          commands={[
            { text: 'Using design-spec.md, build a complete, production-quality website. Create all necessary files (index.html, about.html, [other pages from spec], styles.css, script.js) with a shared component structure so the design system is consistent across every page.' },
            { text: '' },
            { text: '— ANTI-VIBECODING RULES (read these first, they override everything else) —', isComment: true },
            { text: '' },
            { text: 'No purple or blue-purple gradients unless the brand spec explicitly calls for them — this is the single biggest tell of AI-generated design' },
            { text: 'Do not use Inter, Roboto, Poppins, Montserrat, or Arial as the primary typeface. Choose a font pairing that fits the brand\'s personality and feels deliberate' },
            { text: 'No sparkle emojis, no decorative emojis used as bullet points or section markers anywhere in the UI' },
            { text: 'No generic hero copy. Do not write "Transform your business", "Innovative solutions", "Built for the future", or any phrase that could describe any company. Copy must be specific to this brand' },
            { text: 'No three-column icon-grid feature sections — this is the most recognizable vibecoded layout pattern. Find a different way to present features' },
            { text: 'No fake testimonials with names like "Sarah P." and quotes like "This changed everything." Either use real copy from the spec or omit the section' },
            { text: 'No decorative social media icons in the footer that link to "#" or a homepage. Either link correctly or remove them' },
            { text: 'All border-radius values, shadow styles, button sizes, and spacing must come from the design token system — no one-off values that break the pattern' },
            { text: 'No AI-style code comments like "// TODO: add logic here" or "// This handles the main functionality". Comments should be meaningful or absent' },
            { text: 'Copyright year in the footer must be current (2026). Missing or wrong year is a detected vibecoding signal' },
            { text: 'All meta tags, OG tags, page titles, and favicons must be complete — missing metadata is a top vibecoding indicator' },
            { text: 'No placeholder text anywhere. If the spec doesn\'t provide copy for a section, flag it in a comment rather than writing filler' },
            { text: '' },
            { text: '— Design & visual standards —', isComment: true },
            { text: '' },
            { text: 'Every page should feel like it was designed for this specific brand, not adapted from a template. Sections should have distinct visual rhythm while remaining cohesive' },
            { text: 'Avoid the predictable pattern of: full-width hero → 3-column features → testimonials → CTA banner → footer. Break the formula where the spec allows' },
            { text: 'Color usage must feel disciplined — a tight palette used with intention. Accents should reinforce hierarchy, not decorate' },
            { text: 'No neon glow effects, box-shadow halos, or gradients used for novelty rather than purpose' },
            { text: 'Typography must have a clear, consistent rhythm: defined heading scale, body size, line height, and letter spacing — no ad hoc sizing' },
            { text: '' },
            { text: '— CSS architecture —', isComment: true },
            { text: '' },
            { text: 'No frameworks. Use custom properties for the full color, spacing, and type system' },
            { text: 'Fluid typography with clamp(), CSS Grid for page structure, Flexbox for component layout' },
            { text: 'Organize styles into logical sections: reset/base → tokens → layout → components → utilities → page-specific' },
            { text: 'All interactive elements have smooth, deliberate transitions. No abrupt state changes, no hover effects that jump or distort the layout' },
            { text: 'Dark mode support via prefers-color-scheme using the custom property system' },
            { text: 'Fully responsive from 320px to 1440px+ with at least three intentional breakpoints' },
            { text: '' },
            { text: '— JavaScript —', isComment: true },
            { text: '' },
            { text: 'Animated hamburger icon with a mobile nav that slides or fades in smoothly' },
            { text: 'Scroll-triggered animations via IntersectionObserver — section reveals should feel natural, not like a PowerPoint transition' },
            { text: 'Active nav state that updates on scroll' },
            { text: 'Smooth scroll on all anchor links' },
            { text: 'Any page-specific interactions from the spec (forms, modals, tabs, etc.)' },
            { text: 'No console.log left in the code. No unused functions.' },
            { text: '' },
            { text: '— Page structure —', isComment: true },
            { text: '' },
            { text: 'Shared header and footer logic handled in JS — no copy-pasted markup across files' },
            { text: 'Each page has a distinct hero or header treatment — not the same banner reskinned' },
            { text: 'Clear visual hierarchy per page: the user should always know where they are and what action to take next' },
            { text: '' },
            { text: '— Code quality —', isComment: true },
            { text: '' },
            { text: 'Semantic HTML with proper landmark elements, aria labels, and descriptive alt text — not generic strings like alt="image"' },
            { text: 'Clean, intentional code as if a senior front-end developer wrote it for a client who will read every line' },
            { text: 'No inline styles. No leftover boilerplate. Ready to deploy as-is.' },
            { text: '' },
            { text: '✓ Created index.html, about.html, contact.html, styles.css, script.js', isOutput: true },
            { text: '' },
            { text: '# Add a contact form:', isComment: true },
            { text: 'Add a contact form that emails submissions using Formspree (a free service that emails you when someone fills out your form). Integrate it into contact.html.' },
            { text: '✓ Created contact.html with Formspree integration', isOutput: true },
            { text: '' },
            { text: '# Optimize and add SEO:', isComment: true },
            { text: 'Make the site faster—optimize images and code. Generate SEO-friendly meta tags.' },
            { text: '✓ Optimized assets, added meta tags', isOutput: true }
          ]}
        />

      </motion.div>
    </div>
  );
};

export default Step5;
