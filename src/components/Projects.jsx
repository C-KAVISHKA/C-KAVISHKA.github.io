import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, Box, CheckCircle2, X, Code, Server, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import { projectsData } from '../data/portfolioData';
import { sound } from '../utils/audio';

const categories = ['All', '3D WebXR', 'Full Stack', 'Enterprise Java', 'AI & Research'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 relative z-10">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-mono text-cyan-300"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO & GITHUB REPOSITORIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
          >
            Featured <span className="text-gradient-cyan">Engineering Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Architected for immersive user experiences, computational performance, and rock-solid backend reliability.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 pt-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-2xl glass-card overflow-hidden border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Project Image & Overlay */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-[#090b11]/60 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-400/30 text-xs font-mono font-medium text-cyan-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-lg bg-purple-500/20 backdrop-blur-md border border-purple-400/40 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-400" /> Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-cyan-400 font-mono">{project.tagline}</p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 5).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 5 && (
                      <span className="px-2 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-slate-400">
                        +{project.tags.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Card Bottom CTA Links */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedProject(project);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                    >
                      <span>Deep Dive Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playHover()}
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Deep Dive Architecture Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-400/40 p-6 sm:p-8 space-y-6 shadow-2xl z-10"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-mono text-cyan-400">{selectedProject.tagline}</p>
              </div>

              {/* Architecture Blueprint Card */}
              <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-xs space-y-2">
                <div className="text-slate-400 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-cyan-300">SYSTEM ARCHITECTURE:</span>
                </div>
                <div className="text-slate-200 pl-6">{selectedProject.architecture}</div>
              </div>

              {/* Key Technical Highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono font-semibold text-purple-300 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  KEY INNOVATIONS & ENGINEERING HIGHLIGHTS:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedProject.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 leading-relaxed font-light">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Tech Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400">TECHNOLOGY STACK:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.09] text-xs font-mono text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-white flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>Explore Source Code on GitHub</span>
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
