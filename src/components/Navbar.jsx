import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles, Layers, Send, User, FileDown } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { label: 'Projects', href: '#projects', icon: Layers },
  { label: 'Skills', href: '#skills', icon: Sparkles },
  { label: 'Terminal', href: '#terminal', icon: Terminal },
  { label: 'Journey', href: '#journey', icon: User },
  { label: 'Contact', href: '#contact', icon: Send },
];

const Navbar = ({ soundEnabled, setSoundEnabled }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['projects', 'skills', 'terminal', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isNowOn = sound.toggleSound();
    setSoundEnabled(isNowOn);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onMouseEnter={() => sound.playHover()}
          className="group flex items-center gap-2.5 text-slate-100 no-underline"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            CK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Channa Kavishka
            </span>
            <span className="text-[11px] font-mono text-slate-400 tracking-wider">
              FULLSTACK // 3D WEBXR
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-cyan-400/10 border border-cyan-400/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Sound, CV Download, GitHub, LinkedIn, Contact CTA) */}
        <div className="flex items-center gap-2.5">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Futuristic Sound FX'}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              soundEnabled
                ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Download CV Button */}
          <a
            href={personalInfo.cvDownloadUrl}
            download="Channa_Kavishka_CV.pdf"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSuccess()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/40 text-xs font-mono text-purple-300 hover:text-purple-200 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            title="Download Professional CV (PDF)"
          >
            <FileDown className="w-4 h-4 text-purple-400" />
            <span>CV / Resume</span>
          </a>

          {/* GitHub Button */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-cyan-400/40 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span className="font-mono">GitHub</span>
          </a>

          {/* Hire Me / Let's Talk CTA */}
          <a
            href="#contact"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transform hover:-translate-y-0.5"
          >
            Contact
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-white/[0.1] px-6 py-5 mt-3 space-y-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sound.playClick();
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_CV.pdf"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/15 border border-purple-400/40 text-xs font-mono text-purple-300"
              >
                <FileDown className="w-4 h-4 text-purple-400" />
                <span>Download CV / Resume (PDF)</span>
              </a>
              <div className="flex items-center justify-between px-3 pt-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-cyan-400"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/C-KAVISHKA</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-blue-400"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
