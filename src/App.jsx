import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsMatrix from './components/SkillsMatrix';
import InteractiveTerminal from './components/InteractiveTerminal';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleOpenTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-[#60C1E5]/30 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      {/* Bespoke Futuristic Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Interactive Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Particle Constellation Background Canvas */}
      <ParticleCanvas />

      {/* Floating Glass Navigation */}
      <Navbar soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenTerminal={handleOpenTerminal} />
        <Projects />
        <SkillsMatrix />
        <InteractiveTerminal />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
