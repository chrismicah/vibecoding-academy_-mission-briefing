
import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';
import Terminal from '../components/Terminal';
import { STEPS } from '../constants';

const Step4: React.FC = () => {
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
          <Layout className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Build Structure
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-12">
          Use no-code AI builders to construct your site. Answer a few questions and watch it come to life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12">
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Wix ADI</h3>
            <p className="text-zinc-500 text-sm">Answer questions about your business. Wix builds your site automatically.</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Durable AI</h3>
            <p className="text-zinc-500 text-sm">Generate a complete website in 30 seconds. Just describe your business.</p>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-12">
          <p className="text-zinc-400 text-sm mb-4">Pro tip: Use Claude templates for advanced vibes</p>
          <code className="text-white text-xs bg-zinc-800 px-3 py-2 rounded-lg block">
            "Build my site based on this design_doc.md"
          </code>
        </div>

        <Terminal command={STEPS[4].command} />
      </motion.div>
    </div>
  );
};

export default Step4;
