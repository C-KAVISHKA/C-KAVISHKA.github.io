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
    <section id="skills" className="py-24 relative z-10 bg-white">
      {/* Ambient background glow in #60C1E5 */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#60C1E5]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>SPECIALIZED CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Core <span className="text-gradient-cyan">Engineering Skills</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 text-base sm:text-lg"
          >
            A high-performance technical stack built across production web applications, real-time 3D pipelines, and enterprise systems.
          </motion.p>
        </div>

        {/* Category Navigation Pills (Mobile Scrollable) */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 mb-12 overflow-x-auto pb-2 no-scrollbar px-1">
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
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-[#60C1E5] text-slate-950 font-bold border border-[#60C1E5] shadow-[0_4px_16px_rgba(96,193,229,0.4)] scale-105'
                    : 'bg-white hover:bg-[#F0F9FD] border border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-[#0284C7]'}`} />
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
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillsData[selectedCategoryIndex].skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#60C1E5] shadow-sm hover:shadow-[0_10px_28px_rgba(96,193,229,0.18)] transition-all duration-300 space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#60C1E5]/15 border border-[#60C1E5]/40 flex items-center justify-center font-mono text-[#0284C7] text-xs font-bold">
                    0{index + 1}
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">{skill.name}</h4>
                </div>
                <span className="font-mono text-xs font-bold text-[#0284C7]">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar in #60C1E5 */}
              <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#60C1E5] to-[#0284C7] shadow-sm"
                />
              </div>

              <p className="text-xs font-mono text-slate-500 leading-relaxed font-normal">
                {skill.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
