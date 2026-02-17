
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ChevronDown, ExternalLink, FolderOpen } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';

const IDESetupPlayer = lazy(() => import('../components/remotion/IDESetupPlayer'));
const FolderSetupPlayer = lazy(() => import('../components/remotion/FolderSetupPlayer'));

const StepIDE: React.FC = () => {
  const [os, setOs] = useState<'mac' | 'windows'>('mac');
  const [showVideo, setShowVideo] = useState(false);
  const [showFolderVideo, setShowFolderVideo] = useState(false);

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
          <Monitor className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-4">
          Set Up Your IDE
        </h2>

        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-4">
          An IDE is where your AI writes code. Think of it as <span className="text-white">Microsoft Word, but for websites</span>.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-sm max-w-lg mx-auto mb-10"
        >
          You'll type instructions in plain English. The AI handles the actual code. You never need to understand what it writes.
        </motion.p>

        {/* What is an IDE */}
        <AnimatedContent><div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
            What is an IDE?
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            IDE stands for "Integrated Development Environment." It's just an app where people write code — like how Word is an app where people write documents. <span className="text-white">Cursor</span> is an AI-native code editor built for exactly this workflow, and it's free.
          </p>
        </div></AnimatedContent>

        {/* Download Cursor */}
        <AnimatedContent><div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
            Step 1: Download Cursor
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Go to the Cursor website and download it. The site auto-detects whether you're on Mac or Windows.
          </p>
          <a
            href="https://cursor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} />
            Download from cursor.com
          </a>
        </div></AnimatedContent>

        {/* OS Toggle */}
        <div className="flex justify-center gap-2 mb-2">
          <button
            onClick={() => setOs('mac')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
              os === 'mac'
                ? 'bg-white text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setOs('windows')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
              os === 'windows'
                ? 'bg-white text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            Windows
          </button>
        </div>

        <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-6">
          Choose your operating system
        </p>

        {/* Install Instructions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={os}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-left">
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
                Step 2: Install
              </p>
              {os === 'mac' ? (
                <div className="space-y-2 text-zinc-400 text-sm leading-relaxed">
                  <p>1. Open the downloaded <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.dmg</code> file</p>
                  <p>2. Drag <span className="text-white">Cursor</span> into your Applications folder</p>
                  <p>3. Open Cursor from Applications</p>
                  <p>4. If prompted, click "Open" to confirm</p>
                </div>
              ) : (
                <div className="space-y-2 text-zinc-400 text-sm leading-relaxed">
                  <p>1. Open the downloaded <code className="text-blue-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">.exe</code> file</p>
                  <p>2. Click "Next" through the setup wizard — leave defaults as-is</p>
                  <p>3. Click "Install" then "Finish"</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Visual Guide - IDE Setup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowVideo(!showVideo)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showVideo ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="Watch: Setting up Cursor" speed={2.5} delay={0.7} />
          </button>
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
                    <IDESetupPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Create Project Folder */}
        <AnimatedContent><div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-center mb-4">
            <FolderOpen className="text-zinc-500" size={24} strokeWidth={1.5} />
          </div>
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">
            Step 3: Create a Project Folder
          </p>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-left">
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              You need a folder on your computer where all the website files will live. Create one on your Desktop.
            </p>
            <div className="space-y-2 text-zinc-400 text-sm mb-3">
              <p>1. Open your <span className="text-white">Terminal</span> (you set this up in Step 2)</p>
              <p>2. Navigate to your Desktop and create the folder:</p>
            </div>
            <Terminal
              title="Create Project Folder"
              commands={[
                { text: 'cd ~/Desktop' },
                { text: 'mkdir my-website' },
              ]}
            />
          </div>
        </div></AnimatedContent>

        {/* Open in Cursor */}
        <AnimatedContent><div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
            Step 4: Open Folder in Cursor
          </p>
          <div className="space-y-2 text-zinc-400 text-sm leading-relaxed">
            <p>1. Open Cursor</p>
            <p>2. Click <span className="text-white">File → Open Folder</span></p>
            <p>3. Navigate to the <code className="text-green-400 text-xs bg-zinc-900 px-1.5 py-0.5 rounded">my-website</code> folder and select it</p>
            <p>4. You should see your folder in the <span className="text-white">left sidebar</span></p>
          </div>
        </div></AnimatedContent>

        {/* Visual Guide - Folder Setup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowFolderVideo(!showFolderVideo)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showFolderVideo ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="Watch: Creating & opening your project" speed={2.5} delay={0.7} />
          </button>
          <AnimatePresence>
            {showFolderVideo && (
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
                    <FolderSetupPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pro Tip */}
        <AnimatedContent><div className="bg-zinc-900/10 border border-zinc-800 rounded-2xl p-5 text-left max-w-xl mx-auto mb-8">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Pro Tip</p>
          <p className="text-zinc-300 text-sm leading-relaxed mb-3">
            You can also open a folder from the terminal — Cursor opens it instantly:
          </p>
          <Terminal
            title="Quick Open"
            command="cursor my-website"
          />
        </div></AnimatedContent>

        {/* Terminal */}
        <AnimatedContent><div>
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest mb-2">
            Terminal shortcut
          </p>
          <Terminal
            title="Open project in Cursor"
            commands={[
              { text: '# Navigate to your Desktop', isComment: true },
              { text: 'cd ~/Desktop' },
              { text: '' },
              { text: '# Create project folder', isComment: true },
              { text: 'mkdir my-website' },
              { text: '' },
              { text: '# Open it in Cursor', isComment: true },
              { text: 'cursor my-website' },
              { text: '✓ Cursor opened with my-website folder', isOutput: true },
            ]}
          />
        </div></AnimatedContent>

        {/* What's next callout */}
        <AnimatedContent><div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-10">
          <p className="text-zinc-400 text-sm mb-2 font-bold uppercase tracking-widest text-[11px]">What's next</p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Your IDE is ready. Next, you'll browse <span className="text-white">Dribbble</span> for design inspiration — screenshots that become the visual target for your AI.
          </p>
        </div></AnimatedContent>
      </motion.div>
    </div>
  );
};

export default StepIDE;
