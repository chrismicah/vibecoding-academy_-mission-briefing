
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Starfield from './components/Starfield';
import Navigation from './components/Navigation';

import Home from './pages/Home';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import Step5 from './pages/Step5';
import Step6 from './pages/Step6';
import Step7 from './pages/Step7';
import Step8 from './pages/Step8';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/step-1-planning" element={<Step1 />} />
        <Route path="/step-2-content" element={<Step2 />} />
        <Route path="/step-3-design" element={<Step3 />} />
        <Route path="/step-4-build" element={<Step4 />} />
        <Route path="/step-5-advanced" element={<Step5 />} />
        <Route path="/step-6-host" element={<Step6 />} />
        <Route path="/step-7-optimize" element={<Step7 />} />
        <Route path="/step-8-iterate" element={<Step8 />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white selection:text-black">
        <Starfield />
        
        {/* Subtle vignette effect */}
        <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />
        
        <main className="relative z-20">
          <AnimatedRoutes />
        </main>

        <Navigation />
      </div>
    </Router>
  );
};

export default App;
