import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Layers, Cpu } from 'lucide-react';

const statusSteps = [
  { threshold: 15, text: "INITIALIZING PORTFOLIO ENGINE..." },
  { threshold: 45, text: "OPTIMIZING 3D WEBXR PIPELINES..." },
  { threshold: 75, text: "PREPARING FULL-STACK & AI SHOWCASE..." },
  { threshold: 95, text: "SYSTEM ARCHITECTURE READY..." },
  { threshold: 100, text: "WELCOME // CHANNA KAVISHKA" },
];

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // Snappy 1.2s smooth loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  const currentStatus =
    statusSteps.find((s) => progress <= s.threshold)?.text || statusSteps[statusSteps.length - 1].text;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white select-none overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#60C1E5]/15 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      <div className="absolute w-72 h-72 bg-sky-200/40 rounded-full blur-[80px] pointer-events-none top-1/4 right-1/4" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm sm:max-w-md w-full">
        {/* Animated Emblem with Rotating Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Outer dashed spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#60C1E5]/40"
          />

          {/* Middle counter-rotating ring with accent beads */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-[#60C1E5]/30"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#60C1E5] shadow-[0_0_10px_#60C1E5]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#60C1E5] shadow-[0_0_10px_#60C1E5]" />
          </motion.div>

          {/* Center glowing logo card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-[#60C1E5] shadow-[0_4px_25px_rgba(96,193,229,0.4)] flex flex-col items-center justify-center"
          >
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
              C<span className="text-[#60C1E5]">K</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-[#0284C7] -mt-1">
              ENGINEER
            </span>
          </motion.div>
        </div>

        {/* Name and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="space-y-1.5 mb-8"
        >
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Channa Kavishka
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/30 text-xs font-mono font-semibold text-[#0369A1]">
            <Sparkles className="w-3.5 h-3.5 text-[#60C1E5]" />
            <span>Full-Stack &bull; 3D WebXR &bull; Enterprise</span>
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-medium truncate max-w-[200px] sm:max-w-[260px] text-left">
              {currentStatus}
            </span>
            <span className="font-bold text-[#0284C7] ml-2">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#60C1E5] via-[#38BDF8] to-[#0284C7] shadow-[0_0_12px_rgba(96,193,229,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Quick Footer hint on mobile */}
        <div className="mt-8 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60C1E5] animate-ping" />
          <span>Cardiff Metropolitan University &bull; 2026</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
