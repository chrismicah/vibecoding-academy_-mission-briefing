
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { STEPS } from '../constants';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentIndex = STEPS.findIndex(s => s.path === location.pathname);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) navigate(STEPS[currentIndex + 1].path);
  };

  const handleBack = () => {
    if (!isFirst) navigate(STEPS[currentIndex - 1].path);
  };

  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {STEPS.map((step, idx) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => navigate(step.path)}
          >
            <motion.div 
              className={`h-0.5 transition-all duration-500 rounded-full ${
                idx <= currentIndex ? 'bg-white w-8 sm:w-12' : 'bg-zinc-800 w-4 sm:w-6'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-12 left-0 right-0 z-50 px-6 sm:px-12 flex justify-between items-center max-w-5xl mx-auto w-full pointer-events-none">
        <div className="pointer-events-auto">
          {!isFirst && (
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 px-6 py-3 text-zinc-400 hover:text-white transition-all bg-black/20 backdrop-blur-md border border-zinc-800 rounded-full hover:border-zinc-600"
            >
              <ChevronLeft size={18} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-medium">Back</span>
            </button>
          )}
        </div>

        <div className="pointer-events-auto">
          {!isLast ? (
            <button
              onClick={handleNext}
              className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Proceed</span>
              <ChevronRight size={20} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-4 px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full hover:bg-black transition-all"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Reset Mission</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
