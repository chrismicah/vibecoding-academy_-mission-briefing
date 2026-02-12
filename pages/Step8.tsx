
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Terminal from '../components/Terminal';
import { STEPS } from '../constants';

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
          <TrendingUp className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Iterate & Scale
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-12">
          Your site is live. Now keep improving, share with the community, and grow your vibe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-12">
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Update</h3>
            <p className="text-zinc-500 text-sm">Use AI to make changes anytime. Just describe what you want.</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Share</h3>
            <p className="text-zinc-500 text-sm">Post on X and get feedback from the community.</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Monetize</h3>
            <p className="text-zinc-500 text-sm">Advanced vibecoding can earn you $10k+ per site.</p>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-center max-w-xl mx-auto mb-12">
          <p className="text-white text-lg font-bold mb-2">Congratulations!</p>
          <p className="text-zinc-400 text-sm">You've completed the VibeCode journey. Keep building, keep vibing.</p>
        </div>

        <Terminal command={STEPS[8].command} />
      </motion.div>
    </div>
  );
};

export default Step8;
