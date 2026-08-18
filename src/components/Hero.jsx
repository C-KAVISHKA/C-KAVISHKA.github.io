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
      colors: ['#38bdf8', '#a855f7', '#ec4899']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCV = () => {
    sound.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#38bdf8', '#10b981']
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.availability}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.08] text-white">
                Hi, I'm <br />
                <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 font-display">
                {personalInfo.role}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personalInfo.location} &bull; Cardiff Metropolitan University (2026)</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed font-light"
            >
              Building immersive web applications with real-time <span className="text-cyan-300 font-medium">3D WebXR (Three.js)</span>, responsive <span className="text-purple-300 font-medium">MERN Stack (React, Node.js, Express, MongoDB)</span>, and enterprise <span className="text-emerald-300 font-medium">Java Spring Boot & MySQL</span>.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Download CV CTA */}
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_CV.pdf"
                onClick={handleDownloadCV}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wide transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center gap-2 group"
              >
                <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download CV (PDF)</span>
              </a>

              {/* Explore Projects */}
              <a
                href="#projects"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 group"
              >
                <span>Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
              </a>

              {/* CLI Terminal */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-xl glass-panel hover:bg-white/[0.08] border border-cyan-400/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all flex items-center gap-2 group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-6 transition-transform" />
                <span>/cli</span>
              </button>

              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-xl glass-panel hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-purple-400" />
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]"
            >
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Profile Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-glow" />

              <div className="relative glass-panel-glow rounded-2xl p-5 sm:p-6 border border-white/[0.12] space-y-5 shadow-2xl">
                {/* Header of hologram card */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-cyan-400 tracking-wider">
                    SOFTWARE_ENGINEER::PROFILE
                  </span>
                </div>

                {/* Profile Portrait Headshot with Cyber Frame */}
                <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden border border-cyan-500/30 group/photo shadow-inner bg-slate-950">
                  <img
                    src="/profile.jpg"
                    alt="Channa Kavishka Sadaruwan"
                    className="w-full h-full object-cover object-top filter brightness-105 contrast-105 group-hover/photo:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-black/20" />
                  <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

                  {/* Floating Status Pill over Photo */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active Developer</span>
                  </div>

                  {/* Bottom Credentials Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono">
                    <span className="text-cyan-300 font-semibold">Channa Kavishka</span>
                    <span className="text-purple-300 text-[11px]">Cardiff Met &bull; 2026</span>
                  </div>
                </div>

                {/* Developer Configuration Snippet */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs space-y-1">
                  <div className="text-slate-500">// Core Stack & Qualifications</div>
                  <div className="text-cyan-300">const dev = &#123;</div>
                  <div className="pl-4 text-purple-300">degree: <span className="text-amber-300">'BSc (Hons) Software Engineering'</span>,</div>
                  <div className="pl-4 text-purple-300">stack: [<span className="text-emerald-300">'MERN'</span>, <span className="text-emerald-300">'Spring Boot'</span>, <span className="text-emerald-300">'Three.js'</span>],</div>
                  <div className="pl-4 text-purple-300">phone: <span className="text-cyan-300">'{personalInfo.phone}'</span></div>
                  <div className="text-cyan-300">&#125;;</div>
                </div>

                {/* Social Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-400/40 text-xs font-mono text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all group/btn"
                  >
                    <Github className="w-4 h-4 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-blue-500/15 border border-white/[0.08] hover:border-blue-400/40 text-xs font-mono text-slate-200 hover:text-blue-300 flex items-center justify-center gap-2 transition-all group/btn"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
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
