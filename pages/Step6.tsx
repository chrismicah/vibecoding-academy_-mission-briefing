
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ChevronDown, ShieldCheck } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';
import ElectricBorder from '../components/ElectricBorder';

const GitVsGitHubPlayer = lazy(() => import('../components/remotion/GitVsGitHubPlayer'));
const BranchMergePlayer = lazy(() => import('../components/remotion/BranchMergePlayer'));
const BranchWorkflowPlayer = lazy(() => import('../components/remotion/BranchWorkflowPlayer'));
const GitignorePlayer = lazy(() => import('../components/remotion/GitignorePlayer'));

const VideoFallback = () => (
  <div className="w-full aspect-video bg-black/40 rounded-xl border border-zinc-800 flex items-center justify-center">
    <div className="text-zinc-600 text-sm">Loading animation...</div>
  </div>
);

const Step6: React.FC = () => {
  const [showGitGuide, setShowGitGuide] = useState(false);
  const [showBranchGuide, setShowBranchGuide] = useState(false);
  const [showWorkflowGuide, setShowWorkflowGuide] = useState(false);
  const [showGitignoreGuide, setShowGitignoreGuide] = useState(false);

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
          <GitBranch className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Save &amp; Back Up Your Work
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-10">
          Two tools keep your project safe. <span className="text-white">Git</span> saves your progress on your computer.{' '}
          <span className="text-white">GitHub</span> backs it up in the cloud. You never type complicated commands — just talk to Claude.
        </p>

        {/* ── SECTION 1: What is Git? ── */}
        <AnimatedContent delay={0.15}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">What is Git?</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Think of Git like <span className="text-white">save points in a video game</span>. Every time you finish something that works,
              you save your progress. If a future change breaks things, you can rewind to the last save. You never lose work.
            </p>
            <p className="text-zinc-500 text-xs mt-3">
              Git lives on your computer. It tracks every change you make and lets you go back in time.
            </p>
          </div>
        </AnimatedContent>

        {/* ── SECTION 2: What is GitHub? ── */}
        <AnimatedContent delay={0.25}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">What is GitHub?</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              If Git is saving your game on your console, <span className="text-white">GitHub is cloud storage for your saves</span>.
              It keeps a backup of your entire project online so it's safe even if your computer crashes. It's also how deployment tools like Vercel know when to update your live site.
            </p>
          </div>
        </AnimatedContent>

        {/* Expandable: Git vs GitHub animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowGitGuide(!showGitGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showGitGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="See how Git and GitHub work together" speed={2.5} delay={0.7} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showGitGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <Suspense fallback={<VideoFallback />}>
                    <GitVsGitHubPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── SECTION 3: Branching & Merging ── */}
        <AnimatedContent delay={0.35}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-4 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Branching — Make a Safe Copy</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Imagine you're writing a book and you have a finished chapter. You want to try rewriting the ending, but you don't want to mess up what you already have.
              So you <span className="text-white">photocopy the chapter and experiment on the copy</span>. That's branching — you make a separate copy of your project to try new things, while the original stays untouched.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.4}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-4 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Merging — Combine Your Work</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              If you like the new ending you wrote on the photocopy, you <span className="text-white">fold it back into the original book</span>. That's merging — you take the changes from your experiment and combine them into the main project. If you don't like it, you just throw the copy away. No harm done.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.45}>
          <div className="bg-zinc-900/30 border border-green-900/20 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Main = The Final Copy</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              The <span className="text-white font-mono">main</span> branch is your <span className="text-white">finished, polished version</span> — the one
              that gets deployed as your live website. You only merge into main when you're happy with the result. Think of it as the
              published edition of your book.
            </p>
          </div>
        </AnimatedContent>

        {/* Expandable: Branch & Merge animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowBranchGuide(!showBranchGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showBranchGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="Watch branching and merging in action" speed={2.5} delay={1.2} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showBranchGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <Suspense fallback={<VideoFallback />}>
                    <BranchMergePlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── SECTION 4: How You Actually Do It ── */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">How you actually do it (just talk to Claude)</p>

        <Terminal
          title="Save Your Progress"
          commands={[
            { text: '# Save your work for the first time:', isComment: true },
            { text: "Set up version control and save everything with the message 'Homepage complete'." },
            { text: '✓ Initialized Git repository', isOutput: true },
            { text: "✓ Saved: 'Homepage complete'", isOutput: true },
          ]}
        />

        <div className="h-10" />

        {/* ── Branching Walkthrough ── */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Trying something new without breaking your site</p>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-6">
          When you want to add a feature or experiment, you don't edit your final copy directly.
          You make a <span className="text-white">separate copy</span>, work on it safely, and combine it back when you're happy.
          Here's the step-by-step:
        </p>

        {/* Numbered steps */}
        <div className="space-y-4 max-w-md mx-auto mb-8 text-left">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">1</div>
            <div>
              <p className="text-white text-sm font-bold mb-0.5">Create a branch</p>
              <p className="text-zinc-500 text-xs">This makes a safe copy of your project. Name it after what you're building.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">2</div>
            <div>
              <p className="text-white text-sm font-bold mb-0.5">Switch to the branch</p>
              <p className="text-zinc-500 text-xs">This tells your computer: "I'm now working on the copy." Any changes you make happen here, not on your final version.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">3</div>
            <div>
              <p className="text-white text-sm font-bold mb-0.5">Make your changes</p>
              <p className="text-zinc-500 text-xs">Build your new feature, experiment freely. Your original is untouched.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">4</div>
            <div>
              <p className="text-white text-sm font-bold mb-0.5">Switch back to main</p>
              <p className="text-zinc-500 text-xs">Go back to your final version so you can bring in the changes.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">5</div>
            <div>
              <p className="text-white text-sm font-bold mb-0.5">Merge the branch into main</p>
              <p className="text-zinc-500 text-xs">Combine your experiment into the final version. If you don't like it, skip this step — the original is still safe.</p>
            </div>
          </motion.div>
        </div>

        {/* Expandable: Branch workflow animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowWorkflowGuide(!showWorkflowGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showWorkflowGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="Watch the full branching workflow" speed={2.5} delay={1.5} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showWorkflowGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <Suspense fallback={<VideoFallback />}>
                    <BranchWorkflowPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Terminal showing the actual prompts */}
        <Terminal
          title="The Full Branching Flow (tell Claude each step)"
          commands={[
            { text: '# Step 1 — Create a safe copy:', isComment: true },
            { text: 'Create a new branch called "add-blog".' },
            { text: '✓ Created branch: add-blog', isOutput: true },
            { text: '# Step 2 — Switch to the copy:', isComment: true },
            { text: 'Switch to the add-blog branch.' },
            { text: '✓ Switched to branch: add-blog', isOutput: true },
            { text: '# Step 3 — Build your feature:', isComment: true },
            { text: 'Add a blog page with a list of recent posts.' },
            { text: '✓ Blog page created with post list', isOutput: true },
            { text: '# Step 4 — Save your progress on the copy:', isComment: true },
            { text: "Save my changes with the message 'Added blog page'." },
            { text: "✓ Saved: 'Added blog page'", isOutput: true },
            { text: '# Step 5 — Go back to your final version:', isComment: true },
            { text: 'Switch back to the main branch.' },
            { text: '✓ Switched to branch: main', isOutput: true },
            { text: '# Step 6 — Bring the feature into your final version:', isComment: true },
            { text: 'Merge add-blog into main.' },
            { text: '✓ Merged add-blog into main. Blog is now live!', isOutput: true },
          ]}
        />

        <div className="h-6" />

        <Terminal
          title="Back Up to GitHub"
          commands={[
            { text: '# Push your project to the cloud:', isComment: true },
            { text: 'Connect this project to my GitHub repository and push everything.' },
            { text: '✓ Connected to GitHub', isOutput: true },
            { text: '✓ Pushed to github.com/you/my-website', isOutput: true },
          ]}
        />

        {/* ── SECTION 5: .gitignore ── */}
        <div className="mt-12 mb-6 flex justify-center">
          <ShieldCheck className="text-white opacity-40" size={32} strokeWidth={1.5} />
        </div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Protect your secrets</p>

        <AnimatedContent>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">What is .gitignore?</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              A <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.gitignore</code> file is a <span className="text-white">list of files Git should pretend don't exist</span>. Anything listed in it won't get saved to GitHub — perfect for keeping secrets like API keys private.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Think of it like a bouncer at a club. When you push your code to GitHub, the bouncer checks the list. If a file is on the <span className="text-white">.gitignore list</span>, it doesn't get in. Your <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.env</code> file (which holds your secret API keys) should <span className="text-white">always</span> be on this list.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.1}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Why this matters</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              If you push your <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.env</code> file to GitHub, <span className="text-white">anyone can see your API keys</span>. Bots actively scan GitHub for exposed keys. Within minutes, your key could be stolen and used to rack up charges on your account.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              The <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.gitignore</code> file prevents this entirely. Set it up once and never worry about it again.
            </p>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.15}>
          <Terminal
            title="Ask Claude to Create .gitignore"
            commands={[
              { text: 'Create a .gitignore file for this project. Make sure .env and node_modules are ignored.' },
              { text: '✓ Created .gitignore', isOutput: true },
              { text: '' },
              { text: '# What Claude creates:', isComment: true },
              { text: '# .env', isComment: true },
              { text: '# .env.local', isComment: true },
              { text: '# node_modules/', isComment: true },
              { text: '# .DS_Store', isComment: true },
            ]}
          />
        </AnimatedContent>

        {/* Gitignore Visual Guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10 mt-8"
        >
          <ElectricBorder>
          <button
            onClick={() => setShowGitignoreGuide(!showGitignoreGuide)}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-zinc-400 hover:text-white text-sm uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showGitignoreGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} />
            </motion.div>
            <ShinyText text="Watch: How .gitignore protects your secrets" speed={2.5} delay={0.7} />
          </button>
          </ElectricBorder>
          <AnimatePresence>
            {showGitignoreGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <Suspense fallback={<VideoFallback />}>
                    <GitignorePlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatedContent delay={0.2}>
          <div className="bg-zinc-900/10 border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-8">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Pro Tip</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Always create your <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.gitignore</code> file <span className="text-white">before</span> your first push to GitHub. If you push secrets first and add .gitignore later, the secrets are already in your history. Ask Claude: <span className="text-white">"Create a .gitignore before we push anything."</span>
            </p>
          </div>
        </AnimatedContent>

        {/* Conflict tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900/30 border border-yellow-900/20 rounded-2xl p-5 text-left max-w-xl mx-auto mt-10 flex items-start gap-3"
        >
          <div className="text-yellow-400/80 text-sm flex-shrink-0 mt-0.5">!</div>
          <div>
            <p className="text-yellow-400/80 text-xs font-bold uppercase tracking-widest mb-1">When Two Changes Clash</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Sometimes two changes edit the same spot. Don't panic — just tell Claude:{' '}
              <span className="text-white">"There's a conflict. Keep my latest changes and fix it."</span>{' '}
              Claude handles the rest.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Step6;
