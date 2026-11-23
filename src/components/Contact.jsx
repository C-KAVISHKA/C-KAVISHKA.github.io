import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, MessageSquare, Clock, MapPin, Sparkles, Phone, FileDown, ExternalLink, Loader2, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Contact = ({ isDark }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(personalInfo.email);
    } catch (err) {
      // fallback
    }
    sound.playSuccess();
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#60c1e5', '#0284c7', '#10b981']
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '56ea8b1a-8bb7-4b71-b0db-b1b7454f738a',
          from_name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          to: personalInfo.email,
        }),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        sound.playSuccess();
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        triggerMailtoFallback();
      }
    } catch (err) {
      triggerMailtoFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailtoFallback = () => {
    sound.playSuccess();
    setSubmitted(true);
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 bg-white dark:bg-[#080C14] overflow-hidden border-t border-slate-200/80 dark:border-slate-800 scroll-mt-20">
      {/* Watermark Typography (Dribbble Signature) */}
      <div className="absolute top-10 right-4 sm:right-10 watermark-text pointer-events-none select-none">
        CONTACT
      </div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#60C1E5]/12 dark:bg-[#60C1E5]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#0284C7] dark:text-[#60C1E5] bg-[#60C1E5]/15 border border-[#60C1E5]/30 px-2.5 py-1 rounded-md">
              /04
            </span>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              / INITIATE CONVERSATION
            </span>
          </div>
          <div className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
            [ AVAILABLE FOR 2026 ROLES ]
          </div>
        </div>

        {/* Dribbble Kinetic Callout Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#60C1E5]" />
            <span>LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.08]"
          >
            HAVE A PROJECT <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">IN MIND?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-2xl mx-auto"
          >
            Looking for a driven Software Engineering Intern, Trainee Developer, or full-stack 3D collaborator? I'm ready to contribute immediately.
          </motion.p>

          {/* Quick Action Pill Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSuccess()}
              className="px-6 py-3.5 rounded-2xl bg-[#60C1E5] hover:bg-[#48B5DD] text-slate-950 font-bold font-mono text-xs sm:text-sm flex items-center gap-2 shadow-[0_6px_24px_rgba(96,193,229,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Send Direct Email ↗</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.cvDownloadUrl}
              download="Channa_Kavishka_Sadaruwan_CV.pdf"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSuccess()}
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold font-mono text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5]" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with Copy Button */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#60C1E5]/50 space-y-3.5 shadow-sm hover:shadow-[0_10px_28px_rgba(96,193,229,0.18)] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#60C1E5]/15 border border-[#60C1E5]/40 flex items-center justify-center text-[#0284C7] dark:text-[#60C1E5]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">DIRECT INBOX</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">{personalInfo.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#F0F9FD] dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:border-[#60C1E5] text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone / WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">PHONE / WHATSAPP</div>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-slate-900 dark:text-white font-mono hover:text-[#0284C7] dark:hover:text-[#60C1E5] transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">Direct</span>
            </div>

            {/* Location & Status Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#60C1E5]/15 border border-[#60C1E5]/40 flex items-center justify-center text-[#0284C7] dark:text-[#60C1E5]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">LOCATION</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">Sri Lanka (UTC +5:30)</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#0284C7] dark:text-[#60C1E5] bg-[#60C1E5]/15 px-2.5 py-1 rounded-full border border-[#60C1E5]/30">Hybrid / Remote</span>
            </div>

            {/* GitHub Profile Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#60C1E5] shadow-sm flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-[#0284C7] dark:group-hover:text-[#60C1E5] group-hover:border-[#60C1E5]/50 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">GITHUB REPOSITORIES</div>
                  <div className="text-sm font-bold font-mono text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#60C1E5] transition-colors">
                    github.com/C-KAVISHKA
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#60C1E5] shadow-sm flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-[#0284C7] dark:group-hover:text-[#60C1E5] group-hover:border-[#60C1E5]/50 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">LINKEDIN NETWORK</div>
                  <div className="text-sm font-bold font-mono text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#60C1E5] transition-colors">
                    linkedin.com/in/channa-sandaruwan
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#0284C7] dark:text-[#60C1E5] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#60C1E5]/40 shadow-[0_16px_40px_rgba(96,193,229,0.16)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Message Transmitted!</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-[#0284C7] dark:text-[#60C1E5]">{formData.name}</strong>! Your inquiry has been routed directly to <strong className="text-[#0284C7] dark:text-[#60C1E5]">{personalInfo.email}</strong>. I'll get back to you promptly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#60C1E5] focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#60C1E5] focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Subject / Role Opportunity</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Trainee / Software Developer Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#60C1E5] focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, role requirements, or collaboration scope..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#60C1E5] focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#60C1E5] to-[#0284C7] hover:from-[#48B5DD] hover:to-[#0369A1] disabled:opacity-60 text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(96,193,229,0.35)] hover:shadow-[0_6px_25px_rgba(96,193,229,0.5)] flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
