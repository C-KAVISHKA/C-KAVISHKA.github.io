import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Sparkles, CheckCircle } from 'lucide-react';
import { educationAndExperience } from '../data/portfolioData';

const Journey = () => {
  return (
    <section id="journey" className="py-24 relative z-10 bg-white">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#60C1E5]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>BACKGROUND &amp; MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Engineering <span className="text-gradient-cyan">Journey &amp; Education</span>
          </motion.h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Academic rigor combined with hands-on architectural and real-time 3D software engineering.
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative border-l-2 border-[#60C1E5]/40 ml-3 sm:ml-8 space-y-10 sm:space-y-12 pl-6 sm:pl-10">
          {educationAndExperience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#60C1E5] flex items-center justify-center shadow-[0_0_12px_rgba(96,193,229,0.5)]">
                {item.badge.includes('Degree') ? (
                  <GraduationCap className="w-3.5 h-3.5 text-[#0284C7]" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                )}
              </div>

              {/* Timeline Card Content */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#60C1E5] shadow-sm hover:shadow-[0_10px_28px_rgba(96,193,229,0.18)] transition-all duration-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7]">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200 font-semibold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  {item.title}
                </h3>
                <div className="text-sm font-mono text-[#0284C7] font-semibold">{item.organization}</div>

                <p className="text-sm text-slate-600 font-normal leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
