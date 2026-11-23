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
    <footer className="relative border-t border-slate-200 bg-slate-50 pt-12 pb-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#60C1E5] flex items-center justify-center font-mono font-bold text-[#0284C7] text-sm shadow-sm">
              CK
            </div>
            <div>
              <div className="font-display font-extrabold text-base text-slate-900">Channa Kavishka</div>
              <div className="text-xs font-mono text-slate-500 font-medium">Full-Stack &amp; 3D WebXR Software Engineer</div>
            </div>
          </div>

          {/* Live System Time */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">SYS_TIME: {time || '12:00:00'}</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#0284C7] transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-[#60C1E5] hover:bg-[#48B5DD] text-slate-950 font-bold transition-all shadow-[0_2px_12px_rgba(96,193,229,0.35)] hover:shadow-[0_4px_16px_rgba(96,193,229,0.5)] transform hover:-translate-y-0.5"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>&copy; {new Date().getFullYear()} Channa Kavishka (C-KAVISHKA). All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Engineered with React, Three.js, TailwindCSS &amp; Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
