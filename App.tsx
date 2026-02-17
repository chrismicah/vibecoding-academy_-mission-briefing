
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Galaxy from './components/Galaxy';
import Navigation from './components/Navigation';
import SplashCursor from './components/SplashCursor';
import NoiseOverlay from './components/NoiseOverlay';

import Home from './pages/Home';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import StepDribbble from './pages/StepDribbble';
import StepIDE from './pages/StepIDE';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import Step5 from './pages/Step5';
import Step6 from './pages/Step6';
import Step7 from './pages/Step7';
import Step8 from './pages/Step8';
import StepRefinement from './pages/StepRefinement';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/step-1-tools" element={<Step1 />} />
        <Route path="/step-2-install" element={<Step2 />} />
        <Route path="/step-3-ide" element={<StepIDE />} />
        <Route path="/step-4-inspiration" element={<StepDribbble />} />
        <Route path="/step-5-architect" element={<Step3 />} />
        <Route path="/step-6-initialize" element={<Step4 />} />
        <Route path="/step-7-build" element={<Step5 />} />
        <Route path="/step-8-git" element={<Step6 />} />
        <Route path="/step-9-deploy" element={<Step7 />} />
        <Route path="/step-10-mastery" element={<Step8 />} />
        <Route path="/step-11-refinement" element={<StepRefinement />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white selection:text-black">
        {/* Galaxy background */}
        <div className="fixed inset-0 z-0">
          <Galaxy
            saturation={0.4}
            speed={0.6}
            glowIntensity={0.3}
            twinkleIntensity={0.3}
            rotationSpeed={0.05}
            density={1.2}
            transparent={false}
          />
        </div>

        {/* Subtle vignette effect */}
        <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.6)_100%)]" />

        {/* Noise/Grain overlay for text readability */}
        <NoiseOverlay opacity={0.035} />

        {/* Splash cursor trail effect */}
        <SplashCursor />

        <main className="relative z-20">
          <AnimatedRoutes />
        </main>

        <Navigation />
      </div>
    </Router>
  );
};

export default App;
