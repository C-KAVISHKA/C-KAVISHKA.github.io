import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Sparkles, FileDown, Sun, Moon, Volume2, VolumeX, Terminal as TerminalIcon } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Footer = ({ isDark, onToggleTheme, soundEnabled, setSoundEnabled }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAudioToggle = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070C16] pt-14 pb-10 z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Dock Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-200/80 dark:border-slate-800">
          {/* Brand Info with Live Status */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#60C1E5] flex items-center justify-center font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] text-base shadow-[0_4px_16px_rgba(96,193,229,0.3)]">
              CK
            </div>
            <div>
              <div className="font-display font-black text-lg text-slate-900 dark:text-white tracking-tight">
                Channa Kavishka
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Q1/Q2 2026 Roles</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-[#60C1E5] text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all"
            >
              Work [8]
            </a>
            <a
              href="#skills"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-[#60C1E5] text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all"
            >
              Skills [15+]
            </a>
            <a
              href="#journey"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-[#60C1E5] text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all"
            >
              Journey [2026]
            </a>
            <a
              href="#terminal"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-[#60C1E5] text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all flex items-center gap-1"
            >
              <TerminalIcon className="w-3 h-3 text-[#0284C7] dark:text-[#60C1E5]" />
              <span>/cli</span>
            </a>
          </div>

          {/* Live System Time, Theme Switch & Back to Top */}
          <div className="flex items-center gap-2.5">
            {/* Live System Time Clock */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#60C1E5] animate-ping" />
              <span className="font-semibold">{time || '12:00:00'}</span>
            </div>

            {/* Theme Toggle Button in Footer */}
            <button
              onClick={onToggleTheme}
              onMouseEnter={() => sound.playHover()}
              title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Audio Toggle in Footer */}
            <button
              onClick={handleAudioToggle}
              onMouseEnter={() => sound.playHover()}
              title={soundEnabled ? "Disable UI Sound FX" : "Enable UI Sound FX"}
              aria-label="Toggle UI Audio"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-all shadow-sm"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* GitHub Profile */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-[#60C1E5] hover:bg-[#48B5DD] text-slate-950 font-bold transition-all shadow-[0_2px_14px_rgba(96,193,229,0.4)] hover:shadow-[0_4px_20px_rgba(96,193,229,0.55)] transform hover:-translate-y-0.5"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} Channa Kavishka (C-KAVISHKA). All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span>Cardiff Met BSc (Hons) Software Engineering</span>
            <span>•</span>
            <span className="text-[#0284C7] dark:text-[#60C1E5] font-semibold">White &amp; #60C1E5 Theme System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
