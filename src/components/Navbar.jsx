import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sun, Moon, ArrowUpRight, Terminal as TerminalIcon, Sparkles, FileDown } from 'lucide-react';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'Work', href: '#projects', badge: '8' },
  { name: 'Skills', href: '#skills', badge: '15+' },
  { name: 'Journey', href: '#journey', badge: '2026' },
  { name: 'Terminal', href: '#terminal', badge: '/cli' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ isDark, onToggleTheme, soundEnabled, setSoundEnabled }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between border ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0B1320]/90 backdrop-blur-xl border-slate-200/90 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
            : 'bg-white/70 dark:bg-[#0B1320]/70 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-sm'
        }`}
      >
        {/* Left: Brand Monogram & Live Status */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => sound.playClick()}
            className="group flex items-center gap-2.5"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#60C1E5] flex items-center justify-center font-display font-black text-sm text-slate-900 dark:text-white shadow-sm group-hover:scale-105 transition-transform">
              C<span className="text-[#60C1E5]">K</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                <span>Channa Kavishka</span>
              </div>
              <div className="text-[10px] font-mono text-[#0284C7] dark:text-[#60C1E5] font-semibold">
                SWE // 3D WEBXR
              </div>
            </div>
          </a>

          {/* Availability Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for 2026 Roles</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Segment */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="text-[10px] text-[#0284C7] dark:text-[#60C1E5] opacity-80">
                  [{link.badge}]
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right: Actions, Theme Switcher, Sound & CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button (Light ↔ Dark) */}
          <button
            onClick={onToggleTheme}
            onMouseEnter={() => sound.playHover()}
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            aria-label="Toggle Theme"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-[#F0F9FD] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all shadow-sm active:scale-95"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 rotate-0 transition-transform duration-300" />
            )}
          </button>

          {/* Sound FX Toggle Button */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? "Disable UI Sound FX" : "Enable UI Sound FX"}
            aria-label="Toggle UI Audio"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-[#F0F9FD] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all shadow-sm active:scale-95"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Download CV (Desktop) */}
          <a
            href={personalInfo.cvDownloadUrl}
            download="Channa_Kavishka_Sadaruwan_CV.pdf"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playSuccess()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
            <span>CV</span>
          </a>

          {/* Primary Let's Talk CTA */}
          <a
            href="#contact"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(96,193,229,0.35)] hover:shadow-[0_6px_22px_rgba(96,193,229,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-white/95 dark:bg-[#0B1320]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5]">
                NAVIGATION // MENU
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleTheme}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold flex items-center gap-1 text-slate-700 dark:text-slate-200"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2.5 rounded-xl text-sm font-mono font-semibold text-slate-800 dark:text-slate-200 hover:bg-[#F0F9FD] dark:hover:bg-slate-800/80 hover:text-[#0284C7] dark:hover:text-[#60C1E5] flex items-center justify-between transition-colors"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs text-[#0284C7] dark:text-[#60C1E5] font-bold">
                      [{link.badge}]
                    </span>
                  )}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-center text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#60C1E5] text-slate-950 text-xs font-mono font-bold text-center shadow-md flex items-center justify-center gap-1"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
