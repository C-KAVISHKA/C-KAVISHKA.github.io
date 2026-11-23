import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileDown, Terminal as TerminalIcon, Sparkles, Code2, Layers, Cpu, CheckCircle2, Copy } from 'lucide-react';
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
  const cardRef = useRef(null);

  // 3D Magnetic Physics for Avatar Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden flex flex-col justify-between">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-[#60C1E5]/12 dark:bg-[#60C1E5]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-35 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Status Announcement Pill */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE FOR SWE TRAINEE / 3D WEBXR ROLES (2026)</span>
          </motion.div>
        </div>

        {/* Hero Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Big Kinetic Headline & Pitch */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-500 dark:text-slate-400 font-bold">
                / HELLO WORLD &bull; I AM
              </div>

              {/* Bold Dribbble Display Typography Sandwich */}
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight leading-[1.05] text-slate-900 dark:text-white">
                <span className="block text-stroke-dark dark:text-stroke-cyan tracking-wide font-extrabold">
                  CHANNA
                </span>
                <span className="block text-slate-900 dark:text-white">
                  KAVISHKA
                </span>
              </h1>

              <div className="text-lg sm:text-2xl font-display font-bold text-[#0284C7] dark:text-[#60C1E5] flex items-center justify-center sm:justify-start gap-2 pt-1">
                <Sparkles className="w-5 h-5 text-[#60C1E5] shrink-0" />
                <span>Creative Developer &amp; Full-Stack Software Engineer</span>
              </div>
            </motion.div>

            {/* Subheading & Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mx-auto sm:mx-0"
            >
              Final-year <strong className="text-slate-900 dark:text-white font-semibold">BSc (Hons) Software Engineering</strong> student at <span className="text-[#0284C7] dark:text-[#60C1E5] font-semibold">Cardiff Metropolitan University</span>. I build immersive 3D WebGL interfaces, high-concurrency Spring Boot microservices, and modern React web applications with rock-solid reliability.
            </motion.p>

            {/* Quick Action Button Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
              transition={{ duration: 0.5, delay: 0.4 }}
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

          {/* Right Column: 3D Magnetic Bento Hologram Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-white dark:bg-slate-900/90 border-2 border-[#60C1E5]/50 dark:border-[#60C1E5]/60 p-6 sm:p-7 shadow-[0_20px_60px_rgba(96,193,229,0.25)] space-y-5"
            >
              {/* Corner Watermark */}
              <div className="absolute top-3 right-5 font-mono text-xs font-bold text-slate-300 dark:text-slate-700 pointer-events-none select-none">
                DEV_ID: ST20295190
              </div>

              {/* Card Header Profile Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#60C1E5] to-[#0284C7] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center font-display font-extrabold text-2xl text-slate-900 dark:text-white">
                      CK
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Channa Kavishka
                  </h3>
                  <p className="text-xs font-mono text-[#0284C7] dark:text-[#60C1E5] font-semibold">
                    Cardiff Metropolitan University
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    BSc (Hons) Software Engineering
                  </p>
                </div>
              </div>

              {/* Floating Live Tech Badges */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                  <span>ENGINEERING SPECIALIZATION</span>
                  <span className="text-[#0284C7] dark:text-[#60C1E5]">ACTIVE</span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Layers className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                      <span>3D WebXR &bull; Three.js / WebGL</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#60C1E5]/20 text-[#0284C7] dark:text-[#60C1E5] font-bold text-[10px]">
                      60 FPS
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Code2 className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                      <span>Enterprise Java &bull; Spring Boot</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                      ACID DB
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Cpu className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                      <span>MERN Full-Stack &bull; React / Next</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-400 font-bold text-[10px]">
                      PROD VITE
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="#contact"
                  className="text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] hover:underline flex items-center gap-1"
                >
                  <span>Open Collaboration</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
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
