
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Terminal from '../components/Terminal';
import { STEPS } from '../constants';

const Step7: React.FC = () => {
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
          <Search className="text-white opacity-40" size={48} strokeWidth={1.5} />
        </div>

        <h2 className="font-display text-5xl sm:text-7xl font-bold uppercase mb-6">
          Optimize SEO
        </h2>

        <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-12">
          Make your site discoverable. Add keywords, meta tags, and track your growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12">
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">SurferSEO</h3>
            <p className="text-zinc-500 text-sm">Analyze your content and get keyword suggestions for better rankings.</p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/10">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Google Analytics</h3>
            <p className="text-zinc-500 text-sm">Track visitors, page views, and understand your audience.</p>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 text-left max-w-xl mx-auto mb-12">
          <p className="text-zinc-400 text-sm mb-2">Quick SEO wins:</p>
          <ul className="text-zinc-300 text-sm space-y-1">
            <li>• Add relevant keywords to your page titles</li>
            <li>• Write descriptive meta descriptions</li>
            <li>• Use headers (H1, H2) for structure</li>
          </ul>
        </div>

        <Terminal command={STEPS[7].command} />
      </motion.div>
    </div>
  );
};

export default Step7;
