
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STEPS } from '../constants';
import MagneticArrow from './MagneticArrow';

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

      {/* Magnetic Arrow Navigation */}
      {!isFirst && (
        <MagneticArrow
          direction="back"
          label="Back"
          onClick={handleBack}
        />
      )}

      {!isLast ? (
        <MagneticArrow
          direction="next"
          label="Proceed"
          onClick={handleNext}
        />
      ) : (
        <MagneticArrow
          direction="next"
          label="Restart"
          onClick={() => navigate('/')}
        />
      )}
    </>
  );
};

export default Navigation;
