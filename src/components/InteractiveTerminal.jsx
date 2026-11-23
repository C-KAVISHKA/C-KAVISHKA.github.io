import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play, X, Trash2, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { personalInfo, projectsData, skillsData } from '../data/portfolioData';

const banner = `
   ______   __    __        ______  ________  __     __ 
  /      \\ /  |  /  |      /      \\/        |/  |   /  |
 /$$$$$$  |$$ | /$$/      /$$$$$$  |$$$$$$$$/ $$ |   $$ |
 $$ |  $$/ $$ |/$$/       $$ |  $$ |$$ |__    $$ |   $$ |
 $$ |      $$  $$<        $$ |  $$ |$$    |   $$  \\ /$$/ 
 $$ |   __ $$$$$  \\       $$ |  $$ |$$$$$/     $$  /$$/  
 $$ \\__/  |$$ |$$  \\      $$ \\__$$ |$$ |_____   $$ $$/   
 $$    $$/ $$ | $$  |     $$    $$/ $$       |   $$$/    
  $$$$$$/  $$/   $$/       $$$$$$/  $$$$$$$$/     $/     
                                                         
  Type 'help' to see available commands or 'cv' to download resume.
`;

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'banner', text: banner },
    { type: 'system', text: `Connected to ${personalInfo.name} Dev Terminal [v2.5.0-release]` },
    { type: 'system', text: `Type 'help' or click quick actions below to inspect profile.` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdList, setCmdList] = useState([]);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Only scroll the terminal container itself, NEVER the whole webpage window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    sound.playClick();
    setCmdList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help        - List all commands
  about       - Detailed engineer background & degree
  skills      - Inspect core technical stack
  projects    - Show flagship software repositories
  cv / resume - Download official resume PDF
  github      - Open GitHub profile in new tab
  linkedin    - Open LinkedIn profile
  contact     - Display direct phone, email & socials
  sudo hire   - Launch priority collaboration mode 🚀
  clear       - Clear the terminal screen`
        });
        break;

      case 'about':
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `NAME: ${personalInfo.name} (${personalInfo.handle})
ROLE: ${personalInfo.role}
EDUCATION: Cardiff Metropolitan University — BSc (Hons) Software Engineering (Expected 2026)
HND: ICBT Campus (2021 — 2023)
LOCATION: ${personalInfo.location}
PHONE: ${personalInfo.phone}
BIO: ${personalInfo.bio}`
        });
        break;

      case 'skills':
        const skillsOutput = skillsData
          .map((cat) => `\n[${cat.category}]\n` + cat.skills.map((s) => `  • ${s.name} (${s.level}%) - ${s.desc}`).join('\n'))
          .join('\n');
        newHistory.push({ type: 'output', text: skillsOutput });
        break;

      case 'projects':
        const projectsOutput = projectsData
          .map((p, idx) => {
            const hasLive = p.demoUrl && !p.demoUrl.includes('github.com');
            const demoLine = hasLive ? `\n    • Live Hosted App: ${p.demoUrl}` : '';
            return `[${idx + 1}] ${p.title}\n    • Category: ${p.category}\n    • Stack: ${p.tags.join(', ')}\n    • Repo: ${p.repoUrl}${demoLine}`;
          })
          .join('\n\n');
        newHistory.push({ type: 'output', text: projectsOutput });
        break;

      case 'cv':
      case 'resume':
        sound.playSuccess();
        const link = document.createElement('a');
        link.href = personalInfo.cvDownloadUrl;
        link.download = 'Channa_Kavishka_Sadaruwan_CV.pdf';
        link.click();
        newHistory.push({
          type: 'success',
          text: `>>> INITIATING CV DOWNLOAD: Channa_Kavishka_Sadaruwan_CV.pdf ... <<<
PDF Document downloaded successfully! Also available at: ${personalInfo.cvDownloadUrl}`
        });
        break;

      case 'github':
        newHistory.push({ type: 'output', text: `Opening GitHub profile: ${personalInfo.github}...` });
        window.open(personalInfo.github, '_blank');
        break;

      case 'linkedin':
        newHistory.push({ type: 'output', text: `Opening LinkedIn profile: ${personalInfo.linkedin}...` });
        window.open(personalInfo.linkedin, '_blank');
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `PHONE: ${personalInfo.phone}
EMAIL: ${personalInfo.email}
GITHUB: ${personalInfo.github}
LINKEDIN: ${personalInfo.linkedin}
STATUS: ${personalInfo.availability}`
        });
        break;

      case 'sudo hire':
      case 'hire':
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#60c1e5', '#38bdf8', '#0284c7']
        });
        sound.playSuccess();
        newHistory.push({
          type: 'success',
          text: `>>> INITIATING PRIORITY COLLABORATION PROTOCOL <<<
Direct Phone: ${personalInfo.phone}
Direct Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}
Thank you for reaching out! Let's build something extraordinary together.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: '${trimmed}'. Type 'help' or 'cv' to see commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    sound.playKeypress();
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdList.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(cmdList[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdList.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(cmdList[nextIndex]);
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-24 relative z-10 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#60C1E5]/15 border border-[#60C1E5]/40 text-xs font-mono font-bold text-[#0284C7] shadow-sm"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>INTERACTIVE DEVELOPER CONSOLE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight"
          >
            Terminal <span className="text-gradient-cyan">Shell Interface</span>
          </motion.h2>

          <p className="text-slate-600 text-sm sm:text-base">
            For engineers &amp; recruiters who love the command line. Run commands or tap quick triggers below.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl bg-[#0B1320] border-2 border-[#60C1E5]/40 overflow-hidden shadow-[0_16px_50px_rgba(96,193,229,0.22)]">
          {/* Terminal Window Bar */}
          <div className="px-4 py-3 bg-[#070D18] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/90" />
              <div className="w-3 h-3 rounded-full bg-amber-500/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
              <span className="font-mono text-xs text-slate-400 ml-2">bash — ckavishka@devbox:~</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHistory([])}
                title="Clear Terminal"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Clear Terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalBodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-4 sm:p-6 bg-[#0B1320]/95 min-h-[360px] sm:min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 space-y-3 cursor-text"
          >
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'banner' && (
                  <pre className="text-[#60C1E5] font-mono text-[9px] sm:text-xs leading-none overflow-x-auto pb-2">
                    {item.text}
                  </pre>
                )}
                {item.type === 'system' && (
                  <div className="text-slate-400 font-light">{item.text}</div>
                )}
                {item.type === 'user' && (
                  <div className="text-[#38BDF8] font-bold">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 font-mono whitespace-pre-wrap pl-2 border-l border-[#60C1E5]/40 my-1">
                    {item.text}
                  </pre>
                )}
                {item.type === 'success' && (
                  <pre className="text-emerald-400 font-mono whitespace-pre-wrap pl-2 border-l border-emerald-400/40 my-1 bg-emerald-950/30 p-2.5 rounded-lg">
                    {item.text}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 pl-2 border-l border-rose-400/50">{item.text}</div>
                )}
              </div>
            ))}

            {/* Live Command Prompt */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[#60C1E5] font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'cv', 'skills'..."
                className="flex-1 bg-transparent outline-none text-[#60C1E5] placeholder-slate-600 font-mono text-xs sm:text-sm"
              />
              <span className="animate-pulse w-2 h-4 bg-[#60C1E5] inline-block" />
            </div>
          </div>

          {/* Quick Command Pills */}
          <div className="px-4 py-3 bg-[#070D18] border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 mr-1 font-semibold">Quick:</span>
            {['help', 'cv', 'skills', 'projects', 'contact', 'sudo hire', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-[#60C1E5]/25 border border-slate-700 hover:border-[#60C1E5] text-[11px] font-mono text-[#60C1E5] transition-all flex items-center gap-1 shadow-sm active:scale-95"
              >
                {cmd === 'cv' ? <FileDown className="w-2.5 h-2.5 text-[#60C1E5]" /> : <Play className="w-2.5 h-2.5 text-[#60C1E5]" />}
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
