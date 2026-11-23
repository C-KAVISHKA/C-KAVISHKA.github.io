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
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['projects', 'skills', 'terminal', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
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
          ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_24px_rgba(96,193,229,0.08)]'
          : 'py-5 sm:py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onMouseEnter={() => sound.playHover()}
          className="group flex items-center gap-2.5 text-slate-900 no-underline"
        >
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#60C1E5] flex items-center justify-center font-mono font-bold text-[#0284C7] group-hover:scale-105 group-hover:border-[#0284C7] transition-all duration-300 shadow-[0_2px_12px_rgba(96,193,229,0.25)]">
            CK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-slate-900 group-hover:text-[#0284C7] transition-colors">
              Channa Kavishka
            </span>
            <span className="text-[10.5px] font-mono text-[#0369A1] font-semibold tracking-wider">
              FULLSTACK // 3D WEBXR
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-md shadow-inner">
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
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Sound, CV Download, GitHub, Contact CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Futuristic Sound FX'}
            className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              soundEnabled
                ? 'bg-[#60C1E5]/20 border-[#60C1E5] text-[#0284C7] shadow-[0_0_15px_rgba(96,193,229,0.3)]'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-[#60C1E5]/40 shadow-sm'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Download CV Button */}
          <a
            href={personalInfo.cvDownloadUrl}
            download="Channa_Kavishka_Sadaruwan_CV.pdf"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSuccess()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#60C1E5]/15 hover:bg-[#60C1E5]/25 border border-[#60C1E5]/50 text-xs font-mono font-semibold text-[#0284C7] transition-all shadow-sm hover:shadow-[0_2px_12px_rgba(96,193,229,0.25)]"
            title="Download Professional CV (PDF)"
          >
            <FileDown className="w-4 h-4 text-[#0284C7]" />
            <span>CV / Resume</span>
          </a>

          {/* GitHub Button */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#60C1E5]/60 text-xs font-medium text-slate-700 hover:text-slate-900 transition-all shadow-sm"
          >
            <Github className="w-4 h-4 text-[#0284C7]" />
            <span className="font-mono">GitHub</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-bold text-xs tracking-wide transition-all shadow-[0_2px_14px_rgba(96,193,229,0.35)] hover:shadow-[0_4px_20px_rgba(96,193,229,0.5)] transform hover:-translate-y-0.5"
          >
            Contact
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            className="lg:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#60C1E5] shadow-sm transition-colors"
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
              const Icon = item.icon;
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    sound.playClick();
                  }}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#60C1E5]/15 text-[#0284C7] font-bold border border-[#60C1E5]/30'
                      : 'text-slate-700 hover:text-[#0284C7] hover:bg-[#F0F9FD]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0284C7]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
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
