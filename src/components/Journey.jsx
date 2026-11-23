import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Sparkles, CheckCircle2, ArrowUpRight, FileDown } from 'lucide-react';
import { educationAndExperience, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audio';

const Journey = () => {
  return (
    <section id="journey" className="py-20 sm:py-28 relative z-10 bg-slate-100/60 overflow-hidden scroll-mt-20">
      {/* Physical Dark Modal Sheet (Dribbble Signature Transition) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-[#0B1320] text-slate-100 border border-cyan-500/30 shadow-[0_30px_90px_rgba(11,19,32,0.45)] p-7 sm:p-12 lg:p-16 overflow-hidden">
          {/* Watermark Dark Typography */}
          <div className="absolute top-8 right-6 sm:right-12 watermark-text-dark pointer-events-none select-none">
            EXPERIENCE
          </div>

          {/* Cyan Glow Accent */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#60C1E5]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#60C1E5]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10">
            {/* Editorial Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#60C1E5] bg-[#60C1E5]/15 border border-[#60C1E5]/30 px-2.5 py-1 rounded-md">
                  /03
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-slate-300 uppercase">
                  / CAREER &amp; ACADEMIC TIMELINE
                </span>
              </div>
              <div className="font-mono text-xs text-slate-400 font-semibold tracking-wider">
                [ 2022 — 2026+ ]
              </div>
            </div>

            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#60C1E5]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#60C1E5]" />
                  <span>ACADEMIC FOUNDATION &amp; ROLES</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                  Education &amp; <span className="text-gradient-cyan">Milestones</span>
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Final-year BSc (Hons) Software Engineering student at Cardiff Metropolitan University, coupling theoretical computer science rigor with hands-on production builds.
                </p>
              </div>

              {/* Ready for Trainee / Intern Roles Pill CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={personalInfo.cvDownloadUrl}
                  download="Channa_Kavishka_Sadaruwan_CV.pdf"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playSuccess()}
                  className="px-5 py-3 rounded-2xl bg-[#60C1E5] hover:bg-[#48B5DD] text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-[0_4px_20px_rgba(96,193,229,0.35)] transition-all transform hover:-translate-y-0.5"
                >
                  <FileDown className="w-4 h-4 text-slate-950" />
                  <span>Download CV (PDF) ↗</span>
                </a>
              </div>
            </div>

            {/* Timeline Line & Cards */}
            <div className="relative border-l-2 border-[#60C1E5]/30 ml-3 sm:ml-8 space-y-10 sm:space-y-12 pl-6 sm:pl-10">
              {educationAndExperience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative group"
                >
                  {/* Glowing Milestone Node Icon */}
                  <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B1320] border-2 border-[#60C1E5] flex items-center justify-center shadow-[0_0_16px_rgba(96,193,229,0.8)] group-hover:scale-110 transition-transform">
                    {item.badge.includes('Degree') ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#60C1E5]" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 text-[#60C1E5]" />
                    )}
                  </div>

                  {/* Dark Timeline Card Content */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#60C1E5]/70 shadow-lg hover:shadow-[0_12px_36px_rgba(96,193,229,0.18)] transition-all duration-300 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-lg bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#60C1E5]">
                        {item.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700 font-semibold">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#60C1E5] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-sm font-mono text-[#60C1E5] font-semibold">{item.organization}</div>

                    <p className="text-sm text-slate-300 font-normal leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Status Banner inside Sheet */}
            <div className="mt-12 pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Full-time Internship / Trainee Developer Roles (2026)</span>
              </div>
              <div className="text-slate-500">
                Cardiff Met ID: ST20295190
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
