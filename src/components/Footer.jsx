import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { Github } from './Icons';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
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

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#040508] pt-12 pb-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              CK
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">Channa Kavishka</div>
              <div className="text-xs font-mono text-slate-400">Full-Stack & 3D WebXR Software Engineer</div>
            </div>
          </div>

          {/* Live System Time */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS_TIME: {time || '12:00:00'}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-cyan-400 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>&copy; {new Date().getFullYear()} Channa Kavishka (C-KAVISHKA). All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Engineered with React 18, Three.js, TailwindCSS & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
