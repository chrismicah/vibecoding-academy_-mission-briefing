
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';
import { STEPS } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-40 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-10"
        >
          <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="text-white" size={32} strokeWidth={1.5} />
          </div>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase mb-8 leading-[0.9]">
          Build Websites<br />with AI Vibes
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-8 font-medium leading-relaxed">
          No coding required. Create professional websites in minutes using AI tools.
          Perfect for entrepreneurs, creators, and dreamers.
        </p>

        {/* Video placeholder */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 max-w-lg mx-auto mb-8">
          <p className="text-zinc-500 text-sm">Video: "How To Build the PERFECT Website Using AI"</p>
        </div>

        <button
          onClick={() => navigate('/step-1-planning')}
          className="relative px-12 py-5 bg-white text-black rounded-full font-bold text-sm uppercase tracking-[0.3em] overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          <span className="relative z-10">Start Vibecoding</span>
          <motion.div
            className="absolute inset-0 bg-zinc-200"
            initial={false}
            whileHover={{ scale: 1.5 }}
          />
        </button>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-md mx-auto"
        >
          <div className="flex justify-center mb-4">
            <Quote className="text-zinc-600" size={24} />
          </div>
          <p className="text-zinc-400 text-sm italic mb-2">
            "You (with zero coding experience) can now create websites from scratch using AI in less than 20 minutes."
          </p>
          <p className="text-zinc-600 text-xs">— @rileybrown</p>
        </motion.div>

        <Terminal command={STEPS[0].command} />
      </motion.div>
    </div>
  );
};

export default Home;
