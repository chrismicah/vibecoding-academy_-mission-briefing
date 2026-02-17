
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import { GlitchText } from '../components/Animations';
import Terminal from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';

const Step8: React.FC = () => {
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
          <Shield className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Mastery & Troubleshooting
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-10">
          Everyone hits errors. The difference is knowing how to handle them. Here's your reference guide.
        </p>

        {/* Windows Errors */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Common Windows Errors</p>
        <div className="space-y-3 text-left max-w-2xl mx-auto mb-6">
          <AnimatedContent delay={0.2}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">
                <GlitchText text="'claude' is not recognized" speed={0.5} />
              </code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Run the PATH fix command from Step 2. <span className="text-white">Restart your terminal.</span></p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.25}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">scripts disabled</code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Windows is blocking scripts from running.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">EPERM: operation not permitted</code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Permission denied — your computer is blocking this action. Right-click terminal → <span className="text-white">"Run as Administrator"</span></p>
            </div>
          </AnimatedContent>
        </div>

        <Terminal
          title="Windows Fixes"
          commands={[
            { text: '# Fix "scripts disabled" error', isComment: true },
            { text: 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser' },
          ]}
        />

        {/* Mac Errors */}
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 mt-10">Common Mac Errors</p>
        <div className="space-y-3 text-left max-w-2xl mx-auto mb-6">
          <AnimatedContent delay={0.35}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">command not found: claude</code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Run the PATH fix command from Step 2.</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">Permission denied</code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Fix file ownership (lets your account access these files).</p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.45}>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <code className="text-red-400 text-xs font-mono flex-shrink-0">xcrun: invalid developer path</code>
              <span className="text-zinc-600 hidden sm:inline">→</span>
              <p className="text-zinc-400 text-xs">Mac developer tools aren't set up yet.</p>
            </div>
          </AnimatedContent>
        </div>

        <Terminal
          title="Mac Fixes"
          commands={[
            { text: '# Fix "Permission denied"', isComment: true },
            { text: 'sudo chown -R $(whoami) folder_name' },
            { text: '# Fix "xcrun: invalid developer path"', isComment: true },
            { text: 'xcode-select --install' },
          ]}
        />

        {/* Stuck Agent Protocol */}
        <AnimatedContent delay={0.5}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-10">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">The "Stuck Agent" Protocol</p>
            <div className="space-y-2">
              <p className="text-zinc-300 text-sm"><span className="text-white">1.</span> Press <span className="text-white font-mono">Ctrl + C</span> to stop the process</p>
              <p className="text-zinc-300 text-sm"><span className="text-white">2.</span> Type <span className="text-white font-mono">/clear</span> to reset session memory</p>
              <p className="text-zinc-300 text-sm"><span className="text-white">3.</span> Re-prompt with a reference to your design file</p>
            </div>
          </div>
        </AnimatedContent>

        {/* Cost Estimates */}
        <AnimatedContent delay={0.55}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Cost Estimates (Claude 3.5 Sonnet)</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-zinc-400">Initial Context Read</span><span className="text-zinc-300">$0.06 – $0.15</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Simple Bug Fix</span><span className="text-zinc-300">$0.01 – $0.03</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Full Page Redesign</span><span className="text-zinc-300">$0.15 – $0.30</span></div>
              <div className="h-px bg-zinc-800 my-1" />
              <div className="flex justify-between font-bold"><span className="text-white">Total Project</span><span className="text-white">$3.00 – $6.00</span></div>
            </div>
            <p className="text-zinc-500 text-xs mt-3">Set a "Hard Limit" in Anthropic Console billing to prevent overages.</p>
          </div>
        </AnimatedContent>

        {/* Security */}
        <AnimatedContent delay={0.6}>
          <div className="bg-zinc-900/30 border border-yellow-900/20 rounded-2xl p-5 text-left max-w-xl mx-auto mb-10 flex items-start gap-3">
            <AlertTriangle size={18} className="text-yellow-400/80 flex-shrink-0 mt-0.5" />
            <p className="text-zinc-300 text-sm">
              Treat your API key like a banking password. <span className="text-white">Never share it. Never paste it into public forums.</span> Regenerate immediately if compromised.
            </p>
          </div>
        </AnimatedContent>

        {/* Congratulations */}
        <AnimatedContent delay={0.65}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 text-center max-w-xl mx-auto mb-8">
            <p className="text-white text-2xl font-bold mb-2">You are now a Semantic Developer.</p>
            <p className="text-zinc-400 text-sm">The only limit to creation is the clarity of your thought.</p>
          </div>
        </AnimatedContent>

        <Terminal
          commands={[
            { text: '# If Claude gets stuck:', isComment: true },
            { text: '/compact' },
            { text: '✓ Conversation compressed. Context freed.', isOutput: true },
            { text: '# Reset and refocus:', isComment: true },
            { text: '/clear' },
            { text: '✓ Session cleared. Files intact.', isOutput: true },
            { text: "Read design_spec.md again and let's try the last step one more time." },
            { text: '✓ Design spec loaded. Ready to continue.', isOutput: true }
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Step8;
