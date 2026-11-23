import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Terminal, ArrowRight, Mail, CheckCircle, ExternalLink, Code2, Cpu, Box, FileDown, MapPin, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Hero = ({ onOpenTerminal }) => {
  const [copied, setCopied] = React.useState(false);
  const cardRef = useRef(null);

  // 3D Tilt Physics (Dribbble Signature)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(personalInfo.email);
    } catch (err) {}
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#60C1E5]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-sky-200/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Framed Architecture Card Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Giant Watermark Typography behind Hero (Dribbble Signature) */}
        <div className="absolute -top-10 sm:-top-16 left-0 right-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="font-display font-black text-[13vw] uppercase tracking-tighter text-slate-900/[0.035] leading-none whitespace-nowrap">
            CHANNA KAVISHKA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-700 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>UI/UX &bull; Full-Stack &bull; 3D WebXR</span>
            </motion.div>

            {/* Dribbble Style Display Headline with Stroke & Solid Contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.05] uppercase">
                <span className="text-stroke-cyan block text-5xl sm:text-7xl xl:text-8xl">
                  CHANNA
                </span>
                <span className="text-slate-900 block drop-shadow-sm">
                  KAVISHKA
                </span>
              </h1>
              <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-bold pt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Cardiff Metropolitan University &bull; Alawatugoda, Sri Lanka</span>
              </div>
            </motion.div>

            {/* Editorial Descriptive Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              Designing digital products and engineering full-stack software that is <span className="font-semibold text-slate-900">clean</span>, <span className="font-semibold text-[#0284C7]">high-performance</span>, and <span className="font-semibold text-[#0284C7]">interactive</span> with React, Node.js, Three.js WebXR, and Java Spring Boot.
            </motion.p>

            {/* Dribbble Style Pill Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* Primary Pill "Let's collaborate ↗" */}
              <a
                href="#contact"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-xl flex items-center gap-1.5 group transform hover:-translate-y-0.5"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-4 h-4 text-[#60C1E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Download CV CTA */}
              <a
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                onClick={handleDownloadCV}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3 rounded-full bg-white hover:bg-[#F0F9FD] border-2 border-[#60C1E5] text-slate-900 font-mono font-bold text-xs tracking-wide transition-all shadow-sm hover:shadow-[0_4px_16px_rgba(96,193,229,0.35)] flex items-center gap-2 group transform hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 text-[#0284C7] group-hover:-translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </a>

              {/* CLI Terminal Pill */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Terminal className="w-4 h-4 text-[#0284C7]" />
                <span>/cli</span>
              </button>

              {/* Copy Email Pill */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="px-4 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700 transition-all flex items-center gap-2 shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
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

          {/* Right Column: 3D Holographic Portrait Card with Head / Cursor Tracking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mx-auto max-w-md perspective-1000"
            >
              {/* Outer atmospheric glowing aura in #60C1E5 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#60C1E5] via-sky-300 to-[#0284C7] rounded-[32px] blur-xl opacity-35 animate-pulse-glow" />

              <motion.div
                style={{ rotateX, rotateY }}
                className="relative bg-white/95 backdrop-blur-xl rounded-[28px] p-5 sm:p-6 border-2 border-[#60C1E5]/40 space-y-4 shadow-[0_20px_50px_rgba(96,193,229,0.18)]"
              >
                {/* Header bar with traffic lights */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[10.5px] text-[#0284C7] font-bold tracking-wider">
                    CHANNA_PORTRAIT::ACTIVE
                  </span>
                </div>

                {/* Portrait Cutout with Layered Depth */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#60C1E5]/40 group/photo shadow-md bg-slate-100">
                  <img
                    src="/profile.jpg"
                    alt="Channa Kavishka Sadaruwan"
                    className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Pill Status */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#60C1E5]/50 text-[11px] font-mono text-slate-800 font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Available</span>
                  </div>

                  {/* Bottom Pill Credentials */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-mono shadow-md">
                    <span className="text-[#0284C7] font-bold">Channa Kavishka</span>
                    <span className="text-slate-600 text-[11px] font-semibold">Cardiff Met &bull; 2026</span>
                  </div>
                </div>

                {/* Technical Configuration Snippet */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-1">
                  <div className="text-slate-400">// Software Architecture Stack</div>
                  <div className="text-slate-800 font-bold">const engineer = &#123;</div>
                  <div className="pl-4 text-[#0284C7]">degree: <span className="text-slate-700 font-medium">'BSc (Hons) Software Engineering'</span>,</div>
                  <div className="pl-4 text-[#0284C7]">focus: [<span className="text-emerald-700">'MERN'</span>, <span className="text-emerald-700">'Three.js WebXR'</span>, <span className="text-emerald-700">'Spring Boot'</span>],</div>
                  <div className="pl-4 text-[#0284C7]">phone: <span className="text-slate-700 font-medium">'{personalInfo.phone}'</span></div>
                  <div className="text-slate-800 font-bold">&#125;;</div>
                </div>

                {/* Social Actions (Dribbble Style Pills) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-full bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-xs font-mono font-bold text-slate-700 hover:text-[#0284C7] flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                  >
                    <Github className="w-4 h-4 text-[#0284C7] group-hover/btn:scale-110 transition-transform" />
                    <span>GitHub ↗</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    className="py-2.5 px-3 rounded-full bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-xs font-mono font-bold text-slate-700 hover:text-[#0284C7] flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                  >
                    <Linkedin className="w-4 h-4 text-[#0284C7] group-hover/btn:scale-110 transition-transform" />
                    <span>LinkedIn ↗</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
