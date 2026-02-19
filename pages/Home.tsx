
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BlurText } from '../components/Animations';
import DecryptedText from '../components/DecryptedText';
import DemoTerminal from '../components/DemoTerminal';
import AnimatedContent from '../components/AnimatedContent';
import TiltedCard from '../components/TiltedCard';
import Magnet from '../components/Magnet';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isBooting, setIsBooting] = useState(false);

  const handleStartMission = () => {
    setIsBooting(true);
  };

  const handleBootComplete = useCallback(() => {
    navigate('/step-1-tools');
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-40 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full flex flex-col items-center"
      >
        <h1 className="mb-6 w-full text-center font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase leading-[0.95]">
          <DecryptedText
            text="Ready to start building....?"
            speed={60}
            maxIterations={15}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className="text-white"
            encryptedClassName="text-zinc-500"
            parentClassName="text-center"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!.@#$%"
          />
        </h1>

        <div className="mb-8 w-full">
          <BlurText
            text="Build professional websites by talking to AI. No coding required. No syntax to memorize. Just describe what you want."
            className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto font-medium leading-relaxed"
            delay={100}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 max-w-2xl mx-auto mb-10 text-left"
        >
          <p className="text-zinc-300 text-sm leading-relaxed">
            The ability to build software is no longer gated by writing code by hand. You don't need to learn HTML, CSS, or JavaScript (the languages websites are built with).
            You need to learn to <span className="text-white font-semibold">communicate clearly</span>.
            This is the era of <span className="text-white font-semibold">Vibe Coding</span> — where the only limit to creation
            is the clarity of your thought.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-10">
          <AnimatedContent delay={0.35}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-black/30 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">You (The Architect)</h3>
                <p className="text-zinc-500 text-sm">Responsible for vision, constraints, content, and quality control.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-black/30 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Claude Code (The Agent)</h3>
                <p className="text-zinc-500 text-sm">Handles file creation, code writing, error resolution, and project history.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
          <AnimatedContent delay={0.45}>
            <TiltedCard className="border border-zinc-800 rounded-2xl bg-black/30 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-2">The Result</h3>
                <p className="text-zinc-500 text-sm">Professional-grade websites built through natural language conversation.</p>
              </div>
            </TiltedCard>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.5}>
          <div className="max-w-lg mx-auto mb-10">
            <div className="flex justify-center mb-3">
              <Quote className="text-zinc-600" size={20} />
            </div>
            <p className="text-zinc-400 text-sm italic mb-2">
              "The user who can clearly articulate 'what they want' and 'how it should feel' can now outperform a junior developer who knows code but lacks vision."
            </p>
          </div>
        </AnimatedContent>

        <DemoTerminal
          isBooting={isBooting}
          onBootComplete={handleBootComplete}
        />

        <AnimatedContent delay={0.6}>
          <Magnet strength={0.4} range={120}>
            <button
              onClick={handleStartMission}
              disabled={isBooting}
              className="relative mt-10 px-12 py-5 bg-white text-black rounded-full font-bold text-sm uppercase tracking-[0.3em] overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isBooting ? 'Booting...' : 'CLICK THIS TO GET STARTED TWIN!'}</span>
            </button>
          </Magnet>
        </AnimatedContent>
      </motion.div>
    </div>
  );
};

export default Home;
