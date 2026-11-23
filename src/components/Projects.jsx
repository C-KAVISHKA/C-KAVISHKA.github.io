import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, Box, CheckCircle2, X, Code, Server, ArrowUpRight, Globe } from 'lucide-react';
import { Github } from './Icons';
import { projectsData } from '../data/portfolioData';
import { sound } from '../utils/audio';

const categories = ['All', 'Live Hosted Demos', '3D & Interactive', 'Full Stack', 'Enterprise Java', 'AI & Research'];

const Projects = ({ isDark }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : activeCategory === 'Live Hosted Demos'
      ? projectsData.filter((p) => p.demoUrl && !p.demoUrl.includes('github.com'))
      : activeCategory === '3D & Interactive'
      ? projectsData.filter((p) => p.category.toLowerCase().includes('3d') || p.category.toLowerCase().includes('gsap'))
      : activeCategory === 'Full Stack'
      ? projectsData.filter((p) => p.category.toLowerCase().includes('full stack') || p.category.toLowerCase().includes('mern'))
      : projectsData.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 bg-slate-50/70 dark:bg-[#070C16]/80 border-y border-slate-200/80 dark:border-slate-800/80 overflow-hidden scroll-mt-20">
      {/* Watermark Typography (Dribbble Signature) */}
      <div className="absolute top-10 right-4 sm:right-10 watermark-text pointer-events-none select-none">
        PORTFOLIO
      </div>

      {/* Background radial accent in #60C1E5 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#60C1E5]/10 dark:bg-[#60C1E5]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#0284C7] dark:text-[#60C1E5] bg-[#60C1E5]/15 border border-[#60C1E5]/30 px-2.5 py-1 rounded-md">
              /01
            </span>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              / SELECTED WORK &amp; LIVE DEMOS
            </span>
          </div>
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            [ 0{filteredProjects.length} / 0{projectsData.length} ]
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
            <Layers className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
            <span>PRODUCTION SOFTWARE &amp; 3D EXPERIENCES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight"
          >
            Featured <span className="text-gradient-cyan">Engineering Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg"
          >
            Architected for immersive user experiences, computational performance, and rock-solid backend reliability.
          </motion.p>

          {/* Category Filter Pills (Mobile Scrollable) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-start sm:justify-center gap-2 pt-4 overflow-x-auto pb-2 no-scrollbar px-1"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#60C1E5] text-slate-950 font-bold shadow-[0_4px_16px_rgba(96,193,229,0.45)] scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-[#F0F9FD] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                {cat === 'Live Hosted Demos' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-9">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const hasLiveDemo = Boolean(project.demoUrl && !project.demoUrl.includes('github.com'));

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#60C1E5] dark:hover:border-[#60C1E5] shadow-sm hover:shadow-[0_16px_36px_rgba(96,193,229,0.22)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Project Image & Dribbble Hover Action */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/25 to-transparent transition-opacity group-hover:opacity-90" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] shadow-sm">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {hasLiveDemo && (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 backdrop-blur-md border border-emerald-300 dark:border-emerald-700 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live App</span>
                          </span>
                        )}
                        {project.featured && (
                          <span className="px-3 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/80 backdrop-blur-md border border-sky-300 dark:border-sky-700 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] flex items-center gap-1.5 shadow-sm">
                            <Sparkles className="w-3 h-3 text-[#0284C7] dark:text-[#60C1E5]" /> Flagship
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dribbble Signature Center Hover Button (Circular ↗) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:scale-100 scale-75 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(96,193,229,0.5)]">
                        <ArrowUpRight className="w-7 h-7 text-[#0284C7] dark:text-[#60C1E5] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Hover Quick Action Buttons on Desktop */}
                    <div className="hidden lg:flex absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center gap-2.5 z-20">
                      {hasLiveDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => sound.playHover()}
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSuccess();
                          }}
                          className="px-4 py-2 rounded-xl bg-[#60C1E5] hover:bg-[#48B5DD] text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Launch Live</span>
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playHover()}
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                        }}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-mono font-bold text-xs flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-md"
                      >
                        <Github className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>

                  {/* Card Content Section */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#0284C7] dark:text-[#60C1E5]">
                          [ 0{index + 1} ]
                        </span>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {project.featured ? 'Featured Engineering' : 'Production Build'}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#60C1E5] transition-colors">
                        {hasLiveDemo ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => sound.playHover()}
                            onClick={() => sound.playClick()}
                            className="hover:underline inline-flex items-center gap-2"
                            title="Visit Live Application"
                          >
                            <span>{project.title}</span>
                            <ExternalLink className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>

                      <p className="text-xs font-mono text-[#0284C7] dark:text-[#60C1E5] font-semibold">{project.tagline}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {project.summary}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 5).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="px-2 py-1 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          +{project.tags.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Card Bottom CTA Links */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={() => sound.playHover()}
                        className="text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] hover:text-[#0369A1] dark:hover:text-[#92D5F0] flex items-center gap-1 group/btn"
                      >
                        <span>Deep Dive Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <div className="flex items-center gap-2">
                        {hasLiveDemo && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => sound.playHover()}
                            onClick={() => sound.playSuccess()}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all"
                            title="Open Hosted Live Application"
                          >
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                          </a>
                        )}

                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => sound.playHover()}
                          onClick={() => sound.playClick()}
                          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-medium shadow-sm"
                          title="GitHub Repository"
                        >
                          <Github className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                          <span className={hasLiveDemo ? "hidden sm:inline" : "inline"}>GitHub</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#60C1E5] p-6 sm:p-8 space-y-6 shadow-2xl z-10"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5]">
                    {selectedProject.category}
                  </span>
                  {selectedProject.demoUrl && !selectedProject.demoUrl.includes('github.com') && (
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Hosted Demo
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-mono text-[#0284C7] dark:text-[#60C1E5] font-semibold">{selectedProject.tagline}</p>
              </div>

              {/* Modal Body: Architecture Details */}
              <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5">
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                    Overview &amp; Purpose
                  </h4>
                  <p>{selectedProject.summary}</p>
                </div>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Key Architectural Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feat, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#60C1E5] mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                    Full Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
                {selectedProject.demoUrl && !selectedProject.demoUrl.includes('github.com') && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playSuccess()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-mono font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
                  <span>View Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
