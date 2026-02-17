
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ChevronDown } from 'lucide-react';
import { ShinyText } from '../components/Animations';
import Terminal, { CopyButton } from '../components/Terminal';
import AnimatedContent from '../components/AnimatedContent';

const DeployFlowPlayer = lazy(() => import('../components/remotion/DeployFlowPlayer'));

const Step7: React.FC = () => {
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const [showWhatIsVercel, setShowWhatIsVercel] = useState(false);
  const [showWhyMain, setShowWhyMain] = useState(false);
  const [showDetailedSetup, setShowDetailedSetup] = useState(false);
  const [showEnvVars, setShowEnvVars] = useState(false);

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
          <Rocket className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Deploy to the World
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-8">
          Go from your laptop to a live URL that anyone can visit. <span className="text-white">Vercel</span> makes deployment a one-command operation.
        </p>

        {/* Expandable: What is Vercel? */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-6"
        >
          <button
            onClick={() => setShowWhatIsVercel(!showWhatIsVercel)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showWhatIsVercel ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="What is Vercel?" speed={2.5} delay={0.3} />
          </button>
          <AnimatePresence>
            {showWhatIsVercel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                      Vercel is a platform that simplifies the process of making a website <span className="text-white">"live"</span> so that anyone in the world can visit it using a URL.
                    </p>
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">How Vercel Works</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-0.5 flex-shrink-0 w-24">The Landlord</span>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Just like a physical store needs a building, a website needs "hosting" — a computer (server) that stays on 24/7. Vercel provides this space automatically so you don't have to manage your own server hardware.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-0.5 flex-shrink-0 w-24">The Translator</span>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          When developers write code, it's like a complex blueprint. Vercel takes your raw code, <span className="text-white">"builds"</span> it into a finished website, and places it on the internet for you.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-0.5 flex-shrink-0 w-24">The CDN</span>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Instead of keeping your website in one location, Vercel copies it to dozens of "Edge" locations around the world. A user in London gets served from a nearby server, making the site load almost instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expandable: Why push to Main? */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <button
            onClick={() => setShowWhyMain(!showWhyMain)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showWhyMain ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="Why do you only push to Main to deploy?" speed={2.5} delay={0.5} />
          </button>
          <AnimatePresence>
            {showWhyMain && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <div className="space-y-4">
                      <div>
                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">The Storefront Rule</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Your <span className="text-white font-mono">main</span> branch is the actual storefront that customers see. You wouldn't start painting the walls while customers are shopping. By working on other branches (drafts), you can make changes and test them privately.
                        </p>
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">Automatic Publishing</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          Vercel watches your <span className="text-white font-mono">main</span> branch constantly. The moment you push code to Main, Vercel assumes you're saying <span className="text-white">"This is ready for the world!"</span> and immediately updates the live website.
                        </p>
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">The Safety Net (Previews)</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          When you work on a branch that isn't Main, Vercel gives you a secret "Preview URL." This lets you see exactly how changes will look on the real internet without affecting your main website. You only merge into Main once you're 100% sure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expandable: Deployment flow visual guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowDeployGuide(!showDeployGuide)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showDeployGuide ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="How does deployment work?" speed={2.5} delay={0.7} />
          </button>
          <AnimatePresence>
            {showDeployGuide && (
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
                    <DeployFlowPlayer />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Three Steps */}
        <div className="space-y-6 max-w-md mx-auto mb-10">
          <AnimatedContent delay={0.2}>
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="text-white text-sm font-bold mb-1">Install Vercel's Command-Line Tool</p>
                <p className="text-zinc-500 text-sm">A one-time install (works everywhere on your computer). This gives you the <span className="text-white font-mono">vercel</span> command.</p>
              </div>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.3}>
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-white text-sm font-bold mb-1">Login & Connect</p>
                <p className="text-zinc-500 text-sm">Create an account or sign in. Vercel links to your GitHub automatically.</p>
              </div>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <div className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="text-white text-sm font-bold mb-1">Deploy</p>
                <p className="text-zinc-500 text-sm">One command. Your site is live with a real URL anyone can visit.</p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* Expandable: Detailed Setup Walkthrough */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowDetailedSetup(!showDetailedSetup)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showDetailedSetup ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="See the full setup walkthrough" speed={2.5} delay={0.9} />
          </button>
          <AnimatePresence>
            {showDetailedSetup && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {/* Step 1: Install & Log In */}
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Step 1: Install and Log In</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      Install the Vercel CLI so your terminal can talk to Vercel, then link it to your account.
                    </p>
                    <Terminal
                      title="Install Vercel CLI"
                      commands={[
                        { text: '# Install globally', isComment: true },
                        { text: 'npm install -g vercel' },
                        { text: '# Link your account (opens browser)', isComment: true },
                        { text: 'vercel login' },
                      ]}
                    />
                  </div>

                  {/* Step 2: Connect Your Project */}
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Step 2: Connect Your Project</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      Navigate to your project folder and type <span className="text-white font-mono">vercel</span>. It will ask you a series of questions:
                    </p>
                    <div className="space-y-2 text-sm">
                      {[
                        { q: '"Set up and deploy?"', a: 'Type Y and press Enter.' },
                        { q: '"Which scope?"', a: 'Choose your personal account.' },
                        { q: '"Link to existing project?"', a: 'Type N for your first time.' },
                        { q: '"What\'s your project\'s name?"', a: 'Press Enter to use your folder name.' },
                        { q: '"In which directory is your code?"', a: 'Press Enter for the default ./' },
                        { q: '"Override settings?"', a: 'Type N — Vercel auto-detects React/Vite.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-white font-mono text-xs flex-shrink-0">{item.q}</span>
                          <span className="text-zinc-500 text-xs">{item.a}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-zinc-500 text-xs mt-3">
                      Vercel will build your site and give you a Preview URL to check your work.
                    </p>
                  </div>

                  {/* Step 3: Daily Workflow */}
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Step 3: Your Daily Workflow</p>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      After the initial setup, you only need two commands:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-500 font-mono text-xs flex-shrink-0 mt-0.5">vercel</span>
                        <p className="text-zinc-400 text-xs">Get a private Preview URL — your rough draft to check things look right.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-white font-mono text-xs flex-shrink-0 mt-0.5">vercel --prod</span>
                        <p className="text-zinc-400 text-xs">Push to your main, public website. The world can see it.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Terminal
          title="Install & Deploy"
          commands={[
            { text: '# Install Vercel globally (so it works everywhere)', isComment: true },
            { text: 'npm i -g vercel' },
            { text: '# Verify installation', isComment: true },
            { text: 'vercel --version' },
            { text: 'Vercel CLI 33.0.0', isOutput: true },
            { text: '# Login (opens browser)', isComment: true },
            { text: 'vercel login' },
            { text: '✓ Credentials saved', isOutput: true },
            { text: '# Deploy the live version!', isComment: true },
            { text: 'vercel --prod' },
            { text: '✓ Production: https://my-website.vercel.app', isOutput: true }
          ]}
        />

        {/* Continuous Deployment */}
        <AnimatedContent delay={0.5}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-10 mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">Automatic Updates</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Once deployed, updating is effortless. Just tell Claude what to change, save, and push to GitHub.
              Vercel detects the push and <span className="text-white">automatically updates your live site</span> in seconds.
            </p>
          </div>
        </AnimatedContent>

        <Terminal
          title="Update Your Live Site"
          commands={[
            { text: '# Tell Claude to make a change:', isComment: true },
            { text: "Update the phone number in the footer to 555-0199. Save the changes and push to GitHub." },
            { text: '✓ Updated footer, saved, pushed to GitHub', isOutput: true },
            { text: '✓ Vercel auto-deployed — live in 30 seconds', isOutput: true }
          ]}
        />

        <AnimatedContent delay={0.6}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-8 mb-8">
            <p className="text-zinc-400 text-sm mb-2 font-bold uppercase tracking-widest text-[11px]">Pro Tip</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              For your first deploy, use <span className="text-white font-mono">vercel</span> (without --prod) to get a preview URL.
              Check everything looks right, then run <span className="text-white font-mono">vercel --prod</span> to push the live version.
            </p>
          </div>
        </AnimatedContent>

        {/* Expandable: Environment Variables */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <button
            onClick={() => setShowEnvVars(!showEnvVars)}
            className="flex items-center gap-2 mx-auto text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-colors"
          >
            <motion.div
              animate={{ rotate: showEnvVars ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.div>
            <ShinyText text="Managing environment variables (API keys)" speed={2.5} delay={1.1} />
          </button>
          <AnimatePresence>
            {showEnvVars && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left">
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      Environment variables let you store secrets (like API keys) without putting them directly in your code.
                    </p>

                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Adding a Variable</p>
                    <Terminal
                      title="Add Environment Variable"
                      commands={[
                        { text: '# Add a secret (e.g., an API key)', isComment: true },
                        { text: 'vercel env add STRIPE_KEY' },
                        { text: '# Vercel will ask: value, environments (Production/Preview/Dev), branch', isComment: true },
                      ]}
                    />

                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3 mt-4">Syncing to Your Computer</p>
                    <Terminal
                      title="Pull Environment Variables"
                      commands={[
                        { text: '# Pull secrets into a local .env.local file', isComment: true },
                        { text: 'vercel env pull' },
                      ]}
                    />

                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Quick Reference</p>
                    <div className="space-y-1.5 text-xs">
                      {[
                        { cmd: 'vercel env add [key]', desc: 'Add a new secret' },
                        { cmd: 'vercel env pull', desc: 'Download secrets to your IDE' },
                        { cmd: 'vercel env ls', desc: 'View all stored variables' },
                        { cmd: 'vercel env rm [key]', desc: 'Delete a variable' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-white font-mono flex-shrink-0">{item.cmd}</span>
                          <span className="text-zinc-500">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-zinc-500 text-xs mt-3">
                      After adding or changing a variable, redeploy with <span className="text-white font-mono">vercel --prod</span> for the live site to use it.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Post-launch refinement */}
        <AnimatedContent delay={0}>
          <div className="bg-black/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-left max-w-2xl mx-auto mb-8">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">
              Your site is live — now keep improving it
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Deploying isn't the end — it's the beginning of refinement. The same workflow that built your site works for <span className="text-white">every future change</span>:
            </p>
            <div className="space-y-2">
              {[
                { icon: '📸', text: 'Screenshot what you want to change and show Claude — visuals beat words' },
                { icon: '🔄', text: 'Iterate in rounds: get the basics right, then polish the details' },
                { icon: '✨', text: 'Push past "correct" to "excellent" — ask Claude for hover effects, transitions, and the premium feel' },
                { icon: '🌍', text: 'Every change auto-deploys when you push to GitHub — your live site updates in seconds' },
              ].map((item, i) => (
                <AnimatedContent key={i} delay={0.08 * i} direction="left" distance={10}>
                  <div className="flex items-start gap-3">
                    <span className="text-sm mt-0.5">{item.icon}</span>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </AnimatedContent>

        <Terminal
          title="Refine After Launch"
          commands={[
            { text: '# Compare your live site to a design you love:', isComment: true },
            { text: 'Look at this screenshot of my site and this Dribbble reference. What specific elements are different? Give me the exact changes to make.' },
            { text: '✓ Identified 4 differences: spacing, shadow depth, font weight, border radius', isOutput: true },
            { text: '✓ Applying fixes...', isOutput: true },
            { text: '✓ Pushed to GitHub — live in 30 seconds', isOutput: true },
          ]}
        />

        <AnimatedContent delay={0}>
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mt-8">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">The Secret</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              The difference between a good site and a great one is <span className="text-white">iteration</span>. Don't stop at "it works." Keep showing Claude references, keep refining, keep pushing. Three rounds of feedback beats one perfect prompt every time.
            </p>
          </div>
        </AnimatedContent>
      </motion.div>
    </div>
  );
};

export default Step7;
