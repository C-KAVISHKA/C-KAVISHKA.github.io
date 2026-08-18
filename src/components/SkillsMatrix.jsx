import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Layout, Server, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { sound } from '../utils/audio';

const iconMap = {
  Boxes: Boxes,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
};

const SkillsMatrix = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-400/30 text-xs font-mono text-purple-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>SPECIALIZED CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Core <span className="text-gradient-cyan">Engineering Skills</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            A high-performance technical stack built across production web applications, real-time 3D pipelines, and enterprise systems.
          </motion.p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {skillsData.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Boxes;
            const isSelected = selectedCategoryIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategoryIndex(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-105'
                    : 'glass-panel hover:bg-white/[0.06] border border-white/[0.08] text-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Skills Grid */}
        <motion.div
          key={selectedCategoryIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsData[selectedCategoryIndex].skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/30 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-mono text-cyan-400 text-xs font-bold">
                    0{index + 1}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">{skill.name}</h4>
                </div>
                <span className="font-mono text-xs font-semibold text-cyan-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                />
              </div>

              {/* Practical description */}
              <p className="text-xs text-slate-300 font-light leading-relaxed flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{skill.desc}</span>
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
