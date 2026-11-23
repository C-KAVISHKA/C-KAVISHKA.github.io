import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Heart, Sparkles, FileDown, Terminal as TerminalIcon } from 'lucide-react';
import { Github, Linkedin } from './Icons';
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
    <footer className="relative border-t border-slate-200 bg-white pt-14 pb-10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Dock Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-200/80">
          {/* Brand Info with Live Status */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-white border-2 border-[#60C1E5] flex items-center justify-center font-mono font-bold text-[#0284C7] text-base shadow-[0_4px_16px_rgba(96,193,229,0.3)]">
              CK
            </div>
            <div>
              <div className="font-display font-black text-lg text-slate-900 tracking-tight">
                Channa Kavishka
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-medium">
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
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-slate-700 hover:text-[#0284C7] transition-all"
            >
              Work [5]
            </a>
            <a
              href="#skills"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-slate-700 hover:text-[#0284C7] transition-all"
            >
              Skills [15+]
            </a>
            <a
              href="#journey"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-slate-700 hover:text-[#0284C7] transition-all"
            >
              Journey [2026]
            </a>
            <a
              href="#terminal"
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-slate-700 hover:text-[#0284C7] transition-all flex items-center gap-1"
            >
              <TerminalIcon className="w-3 h-3 text-[#0284C7]" />
              <span>/cli</span>
            </a>
          </div>

          {/* Live System Time & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#60C1E5] animate-ping" />
              <span className="font-semibold text-slate-800">SYS: {time || '12:00:00'}</span>
            </div>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0284C7] transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0284C7] transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

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
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} Channa Kavishka (C-KAVISHKA). All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Cardiff Met BSc (Hons) Software Engineering</span>
            <span>•</span>
            <span className="text-[#0284C7] font-semibold">White &amp; #60C1E5 Palette</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
