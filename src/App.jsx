import React, { useState, useEffect } from 'react';
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
import { sound } from './utils/audio';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Theme state: defaults to saved preference or system preference, fallback to light
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    sound.playThemeSwitch(!isDark);
    setIsDark((prev) => !prev);
  };

  const handleOpenTerminal = () => {
    sound.playClick();
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#080C14] text-slate-900 dark:text-slate-100 selection:bg-[#60C1E5]/30 selection:text-slate-950 dark:selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* Bespoke Futuristic Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} isDark={isDark} />}
      </AnimatePresence>

      {/* Interactive Custom Cursor (Desktop Only) */}
      <CustomCursor isDark={isDark} />

      {/* Particle Constellation Background Canvas */}
      <ParticleCanvas isDark={isDark} />

      {/* Floating Island Navigation with Theme Switcher */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          isDark={isDark}
          onOpenTerminal={handleOpenTerminal}
          onToggleTheme={toggleTheme}
        />
        <Projects isDark={isDark} />
        <SkillsMatrix isDark={isDark} />
        <InteractiveTerminal isDark={isDark} onToggleTheme={toggleTheme} />
        <Journey isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      {/* Modern Dock Footer */}
      <Footer
        isDark={isDark}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
    </div>
  );
}

export default App;
