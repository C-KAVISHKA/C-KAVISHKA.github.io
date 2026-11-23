import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileDown, Terminal as TerminalIcon, Sparkles, Code2, Layers, Cpu, CheckCircle2, Copy, Glasses } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

const marqueeItems = [
  "REACT 19 & NEXT.JS",
  "THREE.JS WEBGL SHADERS",
  "JAVA & SPRING BOOT",
  "GSAP SCROLLTRIGGER",
  "NODE.JS & EXPRESS",
  "TAILWIND CSS & CSS3",
  "MYSQL & MONGODB",
  "PYTHON COMPUTATIONAL AI",
  "CARDIFF METROPOLITAN UNIVERSITY",
  "LENIS SMOOTH SCROLL",
  "STABLE PRODUCTION DEPLOYMENTS"
];

const Hero = ({ onOpenTerminal, onToggleTheme, isDark }) => {
  const [copied, setCopied] = useState(false);
  const [glassesActive, setGlassesActive] = useState(false);
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  // 60fps Smooth Spring Physics (Dribbble Video Spec: stiffness 260, damping 28)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.15 });

  // 3D rotation & translation for head tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const headX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const headY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const bgParallaxX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const bgParallaxY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleGlasses = () => {
    sound.playClick();
    setGlassesActive((prev) => !prev);
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(personalInfo.email);
    } catch (e) {
      // fallback
    }
    sound.playSuccess();
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#60c1e5', '#0284c7', '#10b981']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] bg-[#60C1E5]/15 dark:bg-[#60C1E5]/18 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-35 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        {/* Top Status Announcement Pill */}
        <div className="flex items-center justify-center sm:justify-start mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE FOR SOFTWARE ENGINEERING &amp; 3D WEBXR ROLES (2026)</span>
          </motion.div>
        </div>

        {/* Main Hero Multi-Layer Sandwich Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center sm:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <div className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold">
                / HELLO WORLD &bull; I AM
              </div>

              {/* Dribbble Signature Typography Sandwich */}
              <div className="relative">
                <motion.div
                  style={{ x: bgParallaxX, y: bgParallaxY }}
                  className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] select-none"
                >
                  <span className="block text-stroke-dark dark:text-stroke-cyan tracking-wide font-extrabold">
                    CHANNA
                  </span>
                  <span className="block text-slate-900 dark:text-white">
                    KAVISHKA
                  </span>
                </motion.div>
              </div>

              <div className="text-base sm:text-xl font-display font-bold text-[#0284C7] dark:text-[#60C1E5] flex items-center justify-center sm:justify-start gap-2 pt-2">
                <Sparkles className="w-5 h-5 text-[#60C1E5] shrink-0" />
                <span>Creative Developer &amp; Full-Stack Software Engineer</span>
              </div>
            </motion.div>

            {/* Subheading & Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mx-auto sm:mx-0"
            >
              Final-year <strong className="text-slate-900 dark:text-white font-semibold">BSc (Hons) Software Engineering</strong> student at <span className="text-[#0284C7] dark:text-[#60C1E5] font-semibold">Cardiff Metropolitan University</span>. Crafting interactive 3D WebGL interfaces, real-time GSAP animations, and enterprise-grade Spring Boot &amp; MERN systems.
            </motion.p>

            {/* Quick Action Button Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2"
            >
              {/* Primary Explore Work */}
              <a
                href="#projects"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_6px_25px_rgba(96,193,229,0.4)] hover:shadow-[0_8px_30px_rgba(96,193,229,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Works [8]</span>
                <ArrowDown className="w-4 h-4 text-white" />
              </a>

              {/* Official CV Download */}
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSuccess()}
                className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <FileDown className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                <span>Download CV</span>
              </a>

              {/* Interactive Terminal Launcher */}
              <button
                onClick={onOpenTerminal}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Launch Terminal Emulator"
              >
                <TerminalIcon className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
                <span>/cli</span>
              </button>

              {/* Quick 1-Click Copy Email Pill */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Copy Email Address"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Metrics Counter Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
            >
              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  08+
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Featured Repos
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#0284C7] dark:text-[#60C1E5]">
                  15+
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Core Technologies
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  2026
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Graduation Year
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Production Delivery
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Res 60FPS 3D Cutout Portrait with Cursor Tracking */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <motion.div
              ref={portraitRef}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateX,
                rotateY,
                x: headX,
                y: headY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#60C1E5] dark:border-[#60C1E5] p-4 sm:p-5 shadow-[0_25px_70px_rgba(96,193,229,0.32)] dark:shadow-[0_25px_80px_rgba(96,193,229,0.38)] group cursor-pointer"
            >
              {/* Portrait Image Container */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                {/* Live Floating Status Header */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-emerald-400/50 text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Interactive 3D Tracking</span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#60C1E5] bg-slate-900/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#60C1E5]/40 shadow-md">
                    60 FPS
                  </span>
                </div>
                {/* Real High-Resolution Headshot */}
                <img
                  src="/profile_headshot.png"
                  alt="Channa Kavishka Sadaruwan - Software Engineer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.01] transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to profile.jpg if needed
                    e.currentTarget.src = "/profile.jpg";
                  }}
                />

                {/* Ambient Bottom Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent pointer-events-none" />

                {/* Dribbble 0:03 Signature: Interactive AR Wireframe Glasses Overlay */}
                <AnimatePresence>
                  {glassesActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute top-[28%] left-[24%] w-[52%] pointer-events-none z-20"
                    >
                      <svg viewBox="0 0 160 50" fill="none" className="w-full drop-shadow-[0_0_12px_#60C1E5]">
                        {/* Left Lens Wireframe */}
                        <rect x="5" y="8" width="60" height="34" rx="8" stroke="#60C1E5" strokeWidth="2.5" fill="rgba(96,193,229,0.2)" />
                        <line x1="12" y1="16" x2="40" y2="16" stroke="#60C1E5" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="20" cy="25" r="4" stroke="#60C1E5" strokeWidth="1.5" />
                        
                        {/* Bridge */}
                        <path d="M65 20 C75 14, 85 14, 95 20" stroke="#60C1E5" strokeWidth="2.5" />
                        
                        {/* Right Lens Wireframe */}
                        <rect x="95" y="8" width="60" height="34" rx="8" stroke="#60C1E5" strokeWidth="2.5" fill="rgba(96,193,229,0.2)" />
                        <line x1="102" y1="16" x2="130" y2="16" stroke="#60C1E5" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="140" cy="25" r="4" stroke="#60C1E5" strokeWidth="1.5" />
                        
                        {/* Futuristic HUD crosshairs */}
                        <line x1="35" y1="2" x2="35" y2="48" stroke="rgba(96,193,229,0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
                        <line x1="125" y1="2" x2="125" y2="48" stroke="rgba(96,193,229,0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
                      </svg>
                      <div className="text-[9px] font-mono font-bold text-[#60C1E5] text-center tracking-widest mt-0.5 bg-black/60 rounded px-1 w-max mx-auto border border-[#60C1E5]/40">
                        AR_VISOR::ACTIVE
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>



                {/* Bottom Overlay Label inside Photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs font-mono shadow-md z-10">
                  <div>
                    <span className="text-slate-900 dark:text-white font-bold block">Channa Kavishka</span>
                    <span className="text-[#0284C7] dark:text-[#60C1E5] text-[10px] font-semibold">Cardiff Met &bull; Final Year</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                    2026
                  </span>
                </div>
              </div>

              {/* Interactive AR Cyber Glasses Toggle Button (Dribbble Signature) */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={toggleGlasses}
                  onMouseEnter={() => sound.playHover()}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                    glassesActive
                      ? 'bg-[#60C1E5] text-slate-950 border-[#60C1E5] shadow-[0_0_15px_rgba(96,193,229,0.5)]'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Glasses className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                  <span>{glassesActive ? 'AR Visor: ON' : 'Toggle AR Visor'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Kinetic Running Marquee Ticker */}
      <div className="mt-16 sm:mt-20 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative z-10">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 font-mono text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wider">
              <span>{item}</span>
              <span className="text-[#60C1E5]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
