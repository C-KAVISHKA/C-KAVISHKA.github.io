import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, Copy, MessageSquare, Clock, MapPin, Sparkles, Phone, FileDown, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
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
      particleCount: 50,
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
    <section id="contact" className="py-24 relative z-10 bg-white">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#60C1E5]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>LET'S CONNECT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Get In <span className="text-gradient-cyan">Touch</span>
          </motion.h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Seeking software developer, trainee, and full-stack engineering opportunities. Send me a direct message below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with Copy Button */}
            <div className="p-6 rounded-2xl bg-white border border-[#60C1E5]/50 space-y-3.5 shadow-sm hover:shadow-[0_8px_24px_rgba(96,193,229,0.18)] transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#60C1E5]/15 border border-[#60C1E5]/40 flex items-center justify-center text-[#0284C7]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">DIRECT EMAIL</div>
                  <div className="text-sm font-bold text-slate-900 font-mono">{personalInfo.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#F0F9FD] border border-slate-200 hover:border-[#60C1E5] text-xs font-mono font-bold text-[#0284C7] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">PHONE / WHATSAPP</div>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-slate-900 font-mono hover:text-[#0284C7] transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">Direct</span>
            </div>

            {/* Download Official CV Card */}
            <a
              href={personalInfo.cvDownloadUrl}
              download="Channa_Kavishka_Sadaruwan_CV.pdf"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSuccess()}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#F0F9FD] border border-[#60C1E5]/60 hover:border-[#60C1E5] shadow-sm hover:shadow-[0_8px_24px_rgba(96,193,229,0.22)] flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#60C1E5]/20 border border-[#60C1E5]/40 flex items-center justify-center text-[#0284C7]">
                  <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#0284C7] font-bold">OFFICIAL RESUME</div>
                  <div className="text-sm font-bold text-slate-900">
                    Download CV (PDF Document)
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform">
                Download &rarr;
              </span>
            </a>

            {/* GitHub Profile Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#60C1E5] shadow-sm flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-[#0284C7] group-hover:border-[#60C1E5]/50 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">GITHUB REPOSITORIES</div>
                  <div className="text-sm font-bold font-mono text-slate-900 group-hover:text-[#0284C7] transition-colors">
                    github.com/C-KAVISHKA
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* LinkedIn Profile Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#60C1E5] shadow-sm flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-[#0284C7] group-hover:border-[#60C1E5]/50 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 font-semibold">LINKEDIN PROFILE</div>
                  <div className="text-sm font-bold font-mono text-slate-900 group-hover:text-[#0284C7] transition-colors">
                    linkedin.com/in/channa-sandaruwan
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-[#60C1E5]/40 shadow-[0_12px_36px_rgba(96,193,229,0.16)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900">Message Transmitted!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-[#0284C7]">{formData.name}</strong>! Your inquiry has been routed directly to <strong className="text-[#0284C7]">{personalInfo.email}</strong>. I'll get back to you promptly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#60C1E5] focus:bg-white focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 placeholder-slate-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#60C1E5] focus:bg-white focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700">Subject / Role Opportunity</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Trainee / Software Developer Opportunity"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#60C1E5] focus:bg-white focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, role requirements, or collaboration scope..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#60C1E5] focus:bg-white focus:ring-2 focus:ring-[#60C1E5]/20 outline-none text-sm text-slate-900 placeholder-slate-400 transition-all resize-none"
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
