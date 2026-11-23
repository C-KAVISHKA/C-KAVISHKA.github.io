import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight, Mail, CheckCircle, ExternalLink, Code2, Cpu, Box, FileDown, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Hero = ({ onOpenTerminal }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(personalInfo.email);
    } catch (err) {
      // fallback
    }
    sound.playSuccess();
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#60c1e5', '#38bdf8', '#0284c7']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCV = () => {
    sound.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#60c1e5', '#0284c7', '#10b981']
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex items-center justify-center overflow-hidden bg-white">
      {/* Ambient background glows in #60C1E5 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#60C1E5]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-sky-200/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.08] text-slate-900">
                Hi, I'm <br />
                <span className="text-gradient-cyan drop-shadow-[0_2px_15px_rgba(96,193,229,0.3)]">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-700 font-display">
                {personalInfo.role}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-semibold pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personalInfo.location} &bull; Cardiff Metropolitan University (2026)</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              Building immersive web applications with real-time <span className="text-[#0284C7] font-semibold">3D WebXR (Three.js)</span>, responsive <span className="text-slate-900 font-semibold">MERN Stack (React, Node.js, Express, MongoDB)</span>, and enterprise <span className="text-emerald-700 font-semibold">Java Spring Boot & MySQL</span>.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2"
            >
              {/* Download CV CTA */}
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                onClick={handleDownloadCV}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-bold text-xs font-mono tracking-wide transition-all shadow-[0_4px_18px_rgba(96,193,229,0.35)] hover:shadow-[0_6px_22px_rgba(96,193,229,0.5)] flex items-center gap-2 group transform hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download CV (PDF)</span>
              </a>

              {/* Explore Projects */}
              <a
                href="#projects"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 group transform hover:-translate-y-0.5"
              >
                <span>Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#60C1E5]" />
              </a>

              {/* CLI Terminal */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-xl bg-white hover:bg-[#F0F9FD] border border-[#60C1E5]/50 hover:border-[#60C1E5] text-xs font-mono font-bold text-[#0284C7] transition-all flex items-center gap-2 group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-[#0284C7] group-hover:rotate-6 transition-transform" />
                <span>/cli</span>
              </button>

              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#60C1E5]/60 text-xs font-medium text-slate-700 hover:text-slate-900 transition-all flex items-center gap-2 shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-mono font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#0284C7]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200"
            >
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Holographic Profile Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Outer decorative glowing ring in #60C1E5 */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#60C1E5] via-sky-300 to-[#0284C7] rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse-glow" />

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border-2 border-[#60C1E5]/40 space-y-4 shadow-2xl">
                {/* Header of card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[11px] text-[#0284C7] font-bold tracking-wider">
                    SOFTWARE_ENGINEER::PROFILE
                  </span>
                </div>

                {/* Profile Portrait Headshot with #60C1E5 Frame */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#60C1E5]/40 group/photo shadow-md bg-slate-100">
                  <img
                    src="/profile.jpg"
                    alt="Channa Kavishka Sadaruwan"
                    className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Status Pill over Photo */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#60C1E5]/50 text-[11px] font-mono text-slate-800 font-semibold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Active Developer</span>
                  </div>

                  {/* Bottom Credentials Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-mono shadow-md">
                    <span className="text-[#0284C7] font-bold">Channa Kavishka</span>
                    <span className="text-slate-600 text-[11px] font-medium">Cardiff Met &bull; 2026</span>
                  </div>
                </div>

                {/* Developer Configuration Snippet */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
                  <div className="text-slate-400">// Core Stack & Qualifications</div>
                  <div className="text-slate-800 font-semibold">const dev = &#123;</div>
                  <div className="pl-4 text-[#0284C7]">degree: <span className="text-slate-700">'BSc (Hons) Software Engineering'</span>,</div>
                  <div className="pl-4 text-[#0284C7]">stack: [<span className="text-emerald-700">'MERN'</span>, <span className="text-emerald-700">'Spring Boot'</span>, <span className="text-emerald-700">'Three.js'</span>],</div>
                  <div className="pl-4 text-[#0284C7]">phone: <span className="text-slate-700">'{personalInfo.phone}'</span></div>
                  <div className="text-slate-800 font-semibold">&#125;;</div>
                </div>

                {/* Social Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-xs font-mono text-slate-700 hover:text-[#0284C7] flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
                  >
                    <Github className="w-4 h-4 text-[#0284C7] group-hover/btn:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-xs font-mono text-slate-700 hover:text-[#0284C7] flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
                  >
                    <Linkedin className="w-4 h-4 text-[#0284C7] group-hover/btn:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
