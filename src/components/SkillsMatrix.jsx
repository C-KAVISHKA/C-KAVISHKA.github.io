import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, Layout, Server, Cpu, Sparkles, CheckCircle2, ChevronRight, ArrowUpRight, Code, Layers } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { sound } from '../utils/audio';

const iconMap = {
  Boxes: Boxes,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
};

const capabilityPreviews = [
  {
    badge: 'FRONTEND & MERN',
    metric: '94% CSS & UI Mastery',
    highlight: 'Production Single-Page & SSR Applications',
    tags: ['React.js', 'Next.js', 'TailwindCSS', 'TypeScript', 'Framer Motion', 'REST APIs'],
    codeSnippet: 'const App = () => <InteractiveExperience brand="#60C1E5" />;',
  },
  {
    badge: 'WEBGL & SHADERS',
    metric: '60 FPS 3D Engine',
    highlight: 'Immersive Real-Time 3D & GSAP Scroll Magic',
    tags: ['Three.js', 'WebGL', 'GSAP ScrollTrigger', 'Lenis Smooth', 'WebXR AR/VR'],
    codeSnippet: 'const scene = new THREE.Scene(); renderer.render(scene, camera);',
  },
  {
    badge: 'ENTERPRISE ARCHITECTURE',
    metric: 'ACID Compliant DBs',
    highlight: 'Spring Boot REST APIs & High-Concurrency Systems',
    tags: ['Java', 'Spring Boot', 'MySQL', 'MongoDB', 'JWT Auth', 'Stripe API'],
    codeSnippet: '@RestController @RequestMapping("/api/v1") class Service {}',
  },
  {
    badge: 'CORE & AUTOMATION',
    metric: 'OOP & Clean Code',
    highlight: 'Data Structures, Python Pipelines & CI/CD',
    tags: ['Core Java', 'Python 3', 'Git / GitHub', 'Postman API', 'Vite', 'Docker'],
    codeSnippet: 'def execute_pipeline(): return {"status": "optimized", "code": 200}',
  },
];

const SkillsMatrix = ({ isDark }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10 bg-white dark:bg-[#080C14] overflow-hidden border-b border-slate-200/80 dark:border-slate-800 scroll-mt-20">
      {/* Watermark Typography (Dribbble Signature) */}
      <div className="absolute top-10 right-4 sm:right-10 watermark-text pointer-events-none select-none">
        SKILLS
      </div>

      {/* Ambient background glow in #60C1E5 */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#60C1E5]/10 dark:bg-[#60C1E5]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#0284C7] dark:text-[#60C1E5] bg-[#60C1E5]/15 border border-[#60C1E5]/30 px-2.5 py-1 rounded-md">
              /02
            </span>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              / SPECIALIZED SERVICES &amp; CAPABILITIES
            </span>
          </div>
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            [ 0{skillsData.length} DOMAINS ]
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
            <span>ENGINEERING ARSENAL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight"
          >
            Capabilities &amp; <span className="text-gradient-cyan">Technical Stack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg"
          >
            From modern responsive interfaces to real-time 3D graphics and enterprise-grade backend systems.
          </motion.p>
        </div>

        {/* Category Navigation Pills (Mobile Scrollable) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar px-1">
          {skillsData.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Boxes;
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setActiveIndex(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs font-mono whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-[#60C1E5] text-slate-950 font-bold border border-[#60C1E5] shadow-[0_4px_18px_rgba(96,193,229,0.45)] scale-105'
                    : 'bg-white dark:bg-slate-900 hover:bg-[#F0F9FD] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-[#0284C7] dark:text-[#60C1E5]'}`} />
                <span>[0{idx + 1}] {cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Dribbble Expandable Accordion & 3D Tilt Mockup Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Skills List */}
          <div className="lg:col-span-7 space-y-4">
            {skillsData.map((cat, idx) => {
              const Icon = iconMap[cat.icon] || Boxes;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveIndex(idx);
                  }}
                  onMouseEnter={() => {
                    if (activeIndex !== idx) sound.playHover();
                  }}
                  className={`cursor-pointer rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-slate-50/90 dark:bg-slate-900/90 border-[#60C1E5] shadow-[0_8px_28px_rgba(96,193,229,0.2)] p-6'
                      : 'bg-white dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800 hover:border-[#60C1E5]/60 hover:bg-[#F8FCFE] dark:hover:bg-slate-800/80 p-5 shadow-sm'
                  }`}
                >
                  {/* Row Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#60C1E5] text-slate-950 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0284C7] dark:text-[#60C1E5]'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{cat.category}</span>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#60C1E5] animate-pulse" />
                          )}
                        </h3>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                        {cat.skills.length} Skills
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                          isActive
                            ? 'bg-[#60C1E5]/20 text-[#0284C7] dark:text-[#60C1E5] rotate-90'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Skills Detail Grid */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-6 border-t border-slate-200/80 dark:border-slate-800 mt-5 space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {cat.skills.map((skill, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 shadow-sm space-y-2 hover:border-[#60C1E5] transition-colors"
                            >
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                                <span className="font-bold text-[#0284C7] dark:text-[#60C1E5]">{skill.level}%</span>
                              </div>

                              {/* Progress bar in #60C1E5 */}
                              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.7, delay: sIdx * 0.05 }}
                                  className="h-full rounded-full bg-gradient-to-r from-[#60C1E5] to-[#0284C7]"
                                />
                              </div>

                              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 line-clamp-2">
                                {skill.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dribbble 3D Floating Perspective Mockup */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#60C1E5] shadow-[0_20px_50px_rgba(96,193,229,0.28)] space-y-6 relative overflow-hidden group hover:rotate-0 transition-transform duration-500"
            >
              {/* Corner Watermark */}
              <div className="absolute top-2 right-4 text-7xl font-display font-black text-slate-100 dark:text-slate-800 pointer-events-none select-none">
                0{activeIndex + 1}
              </div>

              {/* Header Badge */}
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#60C1E5]/20 border border-[#60C1E5]/50 font-mono text-xs font-bold text-[#0284C7] dark:text-[#60C1E5]">
                  {capabilityPreviews[activeIndex]?.badge}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Verified Tech
                </span>
              </div>

              {/* Title & Metric */}
              <div className="space-y-2 relative z-10">
                <h4 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white leading-snug">
                  {skillsData[activeIndex].category}
                </h4>
                <div className="text-sm font-mono text-[#0284C7] dark:text-[#60C1E5] font-bold">
                  {capabilityPreviews[activeIndex]?.metric}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {capabilityPreviews[activeIndex]?.highlight}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 dark:bg-black/90 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner overflow-x-auto relative z-10">
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="ml-2">terminal ~ engine.preview()</span>
                </div>
                <code className="text-[#60C1E5]">
                  {capabilityPreviews[activeIndex]?.codeSnippet}
                </code>
              </div>

              {/* Technology Tags */}
              <div className="space-y-2 relative z-10">
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Core Toolset
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {capabilityPreviews[activeIndex]?.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Micro Indicator */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 relative z-10">
                <span>Architecture Verified</span>
                <span className="text-[#0284C7] dark:text-[#60C1E5] font-bold">Cardiff Met Standard</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
