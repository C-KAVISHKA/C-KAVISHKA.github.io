import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Terminal, Sparkles, Layers, Send, User, FileDown, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { label: 'Work [5]', href: '#projects', icon: Layers },
  { label: 'Skills [15+]', href: '#skills', icon: Sparkles },
  { label: 'Terminal [/cli]', href: '#terminal', icon: Terminal },
  { label: 'Experience [2026]', href: '#journey', icon: User },
  { label: 'Contact', href: '#contact', icon: Send },
];

const Navbar = ({ soundEnabled, setSoundEnabled }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['projects', 'skills', 'terminal', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
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
          ? 'py-2.5 sm:py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_24px_rgba(96,193,229,0.08)]'
          : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Availability Pill */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center gap-2.5 text-slate-900 no-underline"
          >
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#60C1E5] flex items-center justify-center font-mono font-bold text-[#0284C7] group-hover:scale-105 group-hover:border-[#0284C7] transition-all duration-300 shadow-[0_2px_12px_rgba(96,193,229,0.25)]">
              CK
            </div>
            <div className="hidden min-[420px]:flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                Channa Kavishka
              </span>
              <span className="text-[10px] sm:text-[10.5px] font-mono text-[#0284C7] font-semibold tracking-wider">
                SWE // 3D WEBXR
              </span>
            </div>
          </a>

          {/* Dribbble Style Availability Pill Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for New Projects</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links with Bracketed Counters */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/90 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#0284C7] font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-white border border-[#60C1E5]/60 shadow-[0_2px_10px_rgba(96,193,229,0.2)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Sound, CV Download, Contact Pill) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              soundEnabled
                ? 'bg-[#60C1E5]/20 border-[#60C1E5] text-[#0284C7] shadow-[0_0_15px_rgba(96,193,229,0.3)]'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-[#60C1E5]/40 shadow-sm'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Download CV Pill Button */}
          <a
            href={personalInfo.cvDownloadUrl}
            download="Channa_Kavishka_Sadaruwan_CV.pdf"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSuccess()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#60C1E5] text-xs font-mono font-bold text-slate-800 transition-all shadow-sm group"
            title="Download Professional CV (PDF)"
          >
            <FileDown className="w-3.5 h-3.5 text-[#0284C7] group-hover:-translate-y-0.5 transition-transform" />
            <span>CV / Resume</span>
          </a>

          {/* Dribbble Style Pill "Let's Talk ↗" */}
          <a
            href="#contact"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-1 group transform hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#60C1E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#60C1E5] shadow-sm transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0284C7]" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border border-slate-200/90 shadow-2xl rounded-2xl mx-3 sm:mx-4 px-5 py-4 mt-2 space-y-2"
          >
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sound.playClick();
                  }}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-mono transition-all ${
                    isActive
                      ? 'bg-[#60C1E5]/15 text-[#0284C7] font-bold border border-[#60C1E5]/30'
                      : 'text-slate-700 hover:text-[#0284C7] hover:bg-[#F0F9FD]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
              >
                <FileDown className="w-4 h-4 text-[#0284C7]" />
                <span>Download CV / Resume (PDF)</span>
              </a>
              <div className="flex items-center justify-between px-2 pt-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-[#0284C7] hover:underline"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/C-KAVISHKA</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-[#0284C7] hover:underline"
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
