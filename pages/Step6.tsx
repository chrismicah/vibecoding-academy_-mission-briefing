
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Terminal from '../components/Terminal';
import { STEPS } from '../constants';

const Step6: React.FC = () => {
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
          Host & Launch
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-12">
          Get your site online for free. No bandwidth limits. No credit card required.
        </p>

        <div className="space-y-6 max-w-md mx-auto mb-12">
          <div className="flex items-start gap-4 text-left">
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0">1</div>
            <p className="text-zinc-300 text-sm">Sign up for <span className="text-white">InfinityFree</span> - free hosting with no limits.</p>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0">2</div>
            <p className="text-zinc-300 text-sm">Link your domain from <span className="text-white">Freenom</span> (also free).</p>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 flex-shrink-0">3</div>
            <p className="text-zinc-300 text-sm">Upload your files and <span className="text-white">go live</span> in minutes.</p>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-12">
          <p className="text-zinc-400 text-sm">Create a powerful website with AI in just 5 minutes - completely free.</p>
        </div>

        <Terminal command={STEPS[6].command} />
      </motion.div>
    </div>
  );
};

export default Step6;
