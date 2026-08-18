import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Sparkles, CheckCircle } from 'lucide-react';
import { educationAndExperience } from '../data/portfolioData';

const Journey = () => {
  return (
    <section id="journey" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-pink-400/30 text-xs font-mono text-pink-300"
          >
            <GraduationCap className="w-3.5 h-3.5 text-pink-400" />
            <span>BACKGROUND & MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Engineering <span className="text-gradient-cyan">Journey & Education</span>
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Academic rigor combined with hands-on architectural and real-time 3D software engineering.
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {educationAndExperience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#08090d] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                {item.badge.includes('Degree') ? (
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                )}
              </div>

              {/* Timeline Card Content */}
              <div className="p-6 sm:p-7 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-medium text-cyan-300">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {item.title}
                </h3>
                <div className="text-sm font-mono text-slate-400">{item.organization}</div>

                <p className="text-sm text-slate-300 font-light leading-relaxed pt-2">
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
