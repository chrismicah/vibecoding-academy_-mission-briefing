
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Eye, CheckCircle2, Rocket } from 'lucide-react';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';

const StepRefinement: React.FC = () => {
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
          <Sparkles className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          The Art of Refinement
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-16">
          Great design is never a single prompt away. It's a conversation — each round gets you closer to something that makes people say <span className="text-white italic">"oh, that's nice."</span>
        </p>

        {/* The Design Details Hierarchy */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Layers size={20} className="text-zinc-500" />
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">The 8 Layers of Design Quality</p>
        </div>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-6">
          When something looks "off" but you can't explain why, the problem lives in one of these layers. Learn to name them and your prompts get sharper.
        </p>

        <div className="space-y-3 text-left max-w-2xl mx-auto mb-16">
          {[
            { layer: 'Color System', desc: 'Backgrounds, text hierarchy, accents, borders', mistake: 'Flat gray instead of tinted gray (e.g. #1e1e1e vs #2A2939 with blue undertone)' },
            { layer: 'Typography', desc: 'Font family, size scale, weight, line height', mistake: 'Using system fonts when a specific font creates the intended personality' },
            { layer: 'Spacing', desc: 'Padding, margins, gaps — the consistent rhythm', mistake: 'Inconsistent padding: 24px on one card, 20px on another' },
            { layer: 'Elevation & Depth', desc: 'Shadows, layering, glassmorphism, backdrop blur', mistake: 'Flat cards with no shadow vs subtle elevation that creates depth' },
            { layer: 'Borders & Radii', desc: 'Border widths, colors, corner radius values', mistake: 'Harsh visible borders vs subtle rgba borders that blend' },
            { layer: 'Iconography', desc: 'Icon style, size, color, stroke weight', mistake: 'Using emoji instead of monochrome SVG icons' },
            { layer: 'Motion', desc: 'Hover states, transitions, timing functions', mistake: 'Static elements that don\'t respond to interaction' },
            { layer: 'Atmosphere', desc: 'Gradients, glows, lighting — the overall mood', mistake: 'Functional but flat UI missing the "wow factor"' },
          ].map((item, idx) => (
            <AnimatedContent key={item.layer} delay={0.15 + idx * 0.05}>
              <TiltedCard tiltAmount={6} className="border border-zinc-800 rounded-xl bg-zinc-900/10">
                <div className="p-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-white text-sm font-bold">{item.layer}</span>
                    <span className="text-zinc-500 text-xs">{item.desc}</span>
                  </div>
                  <p className="text-zinc-600 text-xs">
                    Common mistake: <span className="text-zinc-400">{item.mistake}</span>
                  </p>
                </div>
              </TiltedCard>
            </AnimatedContent>
          ))}
        </div>

        {/* The Wow Factor Search */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Eye size={20} className="text-zinc-500" />
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Finding the "Wow Factor"</p>
        </div>
        <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-6">
          When your design is technically correct but still feels flat, ask Claude to search for these finishing touches. They're the difference between <span className="text-zinc-300">"it works"</span> and <span className="text-white">"it's beautiful."</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-16">
          {[
            { title: 'Atmospheric Backgrounds', desc: 'Radial gradients, subtle color shifts, layered depth' },
            { title: 'Glassmorphism', desc: 'Backdrop blur, semi-transparent surfaces, frosted glass' },
            { title: 'Accent Glows', desc: 'Colored box-shadows, luminous borders, halo effects' },
            { title: 'Micro-interactions', desc: 'Hover transitions, subtle scale changes, shadow on interaction' },
            { title: 'Lighting Coherence', desc: 'Elements that feel like they exist in a space with consistent light' },
          ].map((item, idx) => (
            <AnimatedContent key={item.title} delay={0.6 + idx * 0.05}>
              <TiltedCard tiltAmount={8} className="border border-zinc-800 rounded-xl bg-zinc-900/10">
                <div className="p-4">
                  <p className="text-white text-sm font-bold mb-1">{item.title}</p>
                  <p className="text-zinc-500 text-xs">{item.desc}</p>
                </div>
              </TiltedCard>
            </AnimatedContent>
          ))}
        </div>

        {/* Resource Discovery */}
        <AnimatedContent delay={0.85}>
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-16">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Use What Already Exists</p>
          <p className="text-zinc-400 text-sm mb-3">
            Before asking Claude to create new styles, always search for what's already there. Most design systems have tokens, variables, and effects built in. Duplicating them creates inconsistency.
          </p>
          <div className="space-y-2">
            <p className="text-zinc-300 text-sm"><span className="text-white">1.</span> Tell Claude: <span className="text-white font-mono text-xs">"Find all existing color tokens and design variables in this project."</span></p>
            <p className="text-zinc-300 text-sm"><span className="text-white">2.</span> Specify: <span className="text-white font-mono text-xs">"Do not create new CSS files. Use what already exists."</span></p>
            <p className="text-zinc-300 text-sm"><span className="text-white">3.</span> Request: <span className="text-white font-mono text-xs">"Show me the actual values, not descriptions."</span></p>
          </div>
        </div>
        </AnimatedContent>

        {/* Quick Reference Checklist */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle2 size={20} className="text-zinc-500" />
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Refinement Session Checklist</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-16">
          <AnimatedContent delay={0.95}>
            <TiltedCard className="bg-zinc-900/30 border border-zinc-800 rounded-2xl">
              <div className="p-5">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Before You Prompt</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Screenshot the current state</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Screenshot the reference you want</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Name the layer that feels "off"</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>State the problem, not just the wish</p>
                </div>
              </div>
            </TiltedCard>
          </AnimatedContent>

          <AnimatedContent delay={1.0}>
            <TiltedCard className="bg-zinc-900/30 border border-zinc-800 rounded-2xl">
              <div className="p-5">
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">After Each Change</p>
                <div className="space-y-2 text-sm">
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Check every page, not just the one you edited</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Check modals, mobile views, hover states</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Compare side-by-side with the reference</p>
                  <p className="text-zinc-400"><span className="text-zinc-600 mr-2">&mdash;</span>Ask Claude: "What's still different?"</p>
                </div>
              </div>
            </TiltedCard>
          </AnimatedContent>
        </div>

        {/* Encouraging Message */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Rocket size={20} className="text-zinc-500" />
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">You're Part of Something New</p>
        </div>

        <AnimatedContent delay={1.1}>
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 text-left max-w-xl mx-auto mb-8">
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            Vibe coding is rewriting the rules of who gets to build. People without years of programming experience are shipping real products, launching businesses, and turning ideas into reality — all by learning to communicate clearly with AI.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            The best vibe coders aren't the ones who write the most prompts. They're the ones who <span className="text-white">define intent before they start</span>, <span className="text-white">break big asks into small steps</span>, and <span className="text-white">review what the AI produces</span> instead of accepting it blindly. Structure beats shortcuts — every time.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            Document your process. Keep a prompt log. Note what worked and what didn't. Your future self — and anyone who works with you — will thank you.
          </p>
          <p className="text-white text-sm leading-relaxed font-medium">
            The only limit to what you can build is the clarity of your vision and the patience to refine it. You already have both. Now go make something beautiful.
          </p>
        </div>
        </AnimatedContent>

        <Terminal
          commands={[
            { text: '# Continuous refinement in action:', isComment: true },
            { text: "Screenshot my site and compare it to this Dribbble reference. What's different?" },
            { text: 'Analyzing... Found 6 differences: color temperature, shadow depth,\nborder treatment, spacing rhythm, typography weight, missing hover states.', isOutput: true },
            { text: 'Fix all 6 issues. Use existing design tokens. Apply globally across every page.' },
            { text: '✓ All 6 issues resolved across 4 pages.', isOutput: true },
            { text: "Now add the wow factor — search for atmospheric effects in this project and apply them." },
            { text: '✓ Added backdrop blur, accent glow, and micro-interactions.\n  Your site now has that premium feel.', isOutput: true },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default StepRefinement;
