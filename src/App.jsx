import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { personalInfo, projectsData, skillsData, educationAndExperience } from './data/portfolioData';
import { sound } from './utils/audio';

const terminalBanner = `
   ______   __    __        ______  ________  __     __ 
  /      \\ /  |  /  |      /      \\/        |/  |   /  |
 /$$$$$$  |$$ | /$$/      /$$$$$$  |$$$$$$$$/ $$ |   $$ |
 $$ |  $$/ $$ |/$$/       $$ |  $$ |$$ |__    $$ |   $$ |
 $$ |      $$  $$<        $$ |  $$ |$$    |   $$  \\ /$$/ 
 $$ |   __ $$$$$  \\       $$ |  $$ |$$$$$/     $$  /$$/  
 $$ \\__/  |$$ |$$  \\      $$ \\__$$ |$$ |_____   $$ $$/   
 $$    $$/ $$ | $$  |     $$    $$/ $$       |   $$$/    
  $$$$$$/  $$/   $$/       $$$$$$/  $$$$$$$$/     $/     
                                                         
  Cardiff Met Final-Year Software Engineering Undergraduate
  Type 'help' to see commands, 'cv' to download resume, or 'theme' to switch mode.
`;

export default function App() {
  // Theme state: defaults to saved preference or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Project filtering
  const [filter, setFilter] = useState('all');

  // Selected project for wipe-up case study drawer (#project)
  const [selectedProject, setSelectedProject] = useState(null);

  // Active accordion row in capabilities / service section
  const [activeRow, setActiveRow] = useState(0);

  // Terminal modal state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'banner', text: terminalBanner },
    { type: 'system', text: `Connected to ${personalInfo.name} Terminal [v3.2.0]` },
    { type: 'system', text: `Type 'help' or click quick pills below to explore.` }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalCmdHistory, setTerminalCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Copy email feedback
  const [copied, setCopied] = useState(false);

  // Experience floating preview element state
  const [floatActive, setFloatActive] = useState(false);
  const [floatInfo, setFloatInfo] = useState({ title: '', meta: '', color: '' });
  const floatRef = useRef(null);
  const mouseState = useRef({ tx: 0, ty: 0, x: 0, y: 0, vx: 0, raf: null });

  // Update theme on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    sound.playThemeSwitch(!isDark);
    setIsDark(prev => !prev);
  };

  // 1-Click Copy Email with Audio and Confetti
  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#60c1e5', '#38bdf8', '#ffffff', '#1e293b']
    });
    setTimeout(() => setCopied(false), 2400);
  };

  // Scroll Reveal & Parallax Physics (from reference)
  useEffect(() => {
    // 1. Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target;
          target.classList.add('in');
          setTimeout(() => {
            target.classList.add('done');
          }, 1700);
          io.unobserve(target);
        }
      });
    }, { threshold: 0.12 });

    const revealElements = document.querySelectorAll('.rv, .ghost');
    revealElements.forEach(el => io.observe(el));

    // 2. Parallax physics on scroll
    const ghosts = document.querySelectorAll('[data-p]');
    const hero = document.querySelector('.hero');
    const nameEl = document.querySelector('.name');
    const portraitEl = document.querySelector('.portrait');
    const heroLeftEl = document.querySelector('.hero-l');
    const socialsEl = document.querySelector('.socials');
    const expEl = document.querySelector('.exp');

    const handleScroll = () => {
      if (hero && nameEl && portraitEl && heroLeftEl && socialsEl) {
        const hr = hero.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -hr.top / Math.max(hr.height, 1)));
        nameEl.style.transform = `translateY(${p * -90}px)`;
        nameEl.style.opacity = `${Math.max(0, 1 - p * 1.2)}`;
        portraitEl.style.transform = `translate(-50%, ${p * 70}px) scale(${1 + p * 0.08})`;
        heroLeftEl.style.transform = `translateY(${p * -50}px)`;
        socialsEl.style.transform = `translateY(${p * -50}px)`;
      }

      if (expEl) {
        const er = expEl.getBoundingClientRect();
        const q = Math.max(0, Math.min(1, (window.innerHeight - er.top) / (window.innerHeight * 0.75)));
        expEl.style.transform = `scale(${0.94 + 0.06 * q})`;
        expEl.style.borderRadius = `${28 * (1 - q)}px`;
      }

      ghosts.forEach((g) => {
        const r = g.parentNode.getBoundingClientRect();
        g.style.setProperty('--py', `${r.top * -0.12}px`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync hash routing with selected project
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash !== '#project' && selectedProject) {
        setSelectedProject(null);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [selectedProject]);

  const openProjectDrawer = (project) => {
    sound.playClick();
    setSelectedProject(project);
    window.location.hash = 'project';
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDrawer = () => {
    sound.playClick();
    setSelectedProject(null);
    document.body.style.overflow = '';
    if (window.location.hash === '#project') {
      window.history.back();
    }
  };

  // Cursor velocity follower loop for experience section (#float)
  const handleJobMouseEnter = (e, job) => {
    const st = mouseState.current;
    st.tx = st.x = e.clientX;
    st.ty = st.y = e.clientY;
    setFloatInfo({
      title: job.title,
      meta: job.organization,
      color: job.period.includes('2026') ? 'linear-gradient(135deg, #60c1e5, #ffffff 40%, #0f172a)' : 'linear-gradient(135deg, #38bdf8, #ffffff 50%, #1e293b)'
    });
    setFloatActive(true);

    const loop = () => {
      st.x += (st.tx - st.x) * 0.14;
      st.y += (st.ty - st.y) * 0.14;
      st.vx = (st.tx - st.x) * 0.08;
      if (floatRef.current) {
        floatRef.current.style.transform = `translate(${st.x + 24}px, ${st.y - 70}px) rotate(${Math.max(-14, Math.min(14, st.vx))}deg)`;
      }
      st.raf = requestAnimationFrame(loop);
    };

    if (!st.raf) {
      st.raf = requestAnimationFrame(loop);
    }
  };

  const handleJobMouseMove = (e) => {
    mouseState.current.tx = e.clientX;
    mouseState.current.ty = e.clientY;
  };

  const handleJobMouseLeave = () => {
    setFloatActive(false);
    if (mouseState.current.raf) {
      cancelAnimationFrame(mouseState.current.raf);
      mouseState.current.raf = null;
    }
  };

  // Terminal Command Processing
  const handleTerminalCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    sound.playClick();
    setTerminalCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `COMMAND REFERENCE:
  help       - Display available CLI commands
  about      - Personal summary & Cardiff Met background
  skills     - Technical proficiencies & stack
  projects   - Flagship projects & repositories
  education  - Academic credentials & degrees
  cv         - Trigger download of official ATS CV
  contact    - Contact channels & social links
  theme      - Toggle dual Light / Dark mode
  clear      - Clear terminal screen
  exit       - Close terminal window`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `ENGINEER PROFILE:
  Name:        ${personalInfo.name}
  Role:        ${personalInfo.role}
  University:  Cardiff Metropolitan University (Final-Year)
  Degree:      BSc (Hons) Software Engineering
  Location:    ${personalInfo.location}
  Focus:       Full-stack web systems, 3D WebGL interfaces, Java Spring Boot backends, ML/XAI.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `CORE TECHNICAL STACK:
  • Frontend:      React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion
  • 3D & WebXR:    Three.js, WebGL, GSAP ScrollTrigger, Lenis Smooth Scroll, WebXR
  • Backend & DB:  Java (Spring Boot, Hibernate), Node.js, Express.js, MySQL, MongoDB
  • Tools & AI:    Git, GitHub, Postman, Vercel, Python, Streamlit, XGBoost, SHAP`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `FEATURED REPOSITORIES:
  [1] Café Nuwara      - 3D Burger Café Web Experience (Three.js + GSAP + Lenis)
                         Live: https://cafe-nuwara.vercel.app/
  [2] iFurnish Shop    - 3D Furniture E-Commerce + WebXR AR (MERN + Stripe)
                         Live: https://i-furnish-shop.vercel.app/
  [3] ApparelFlow ERP  - Garment Manufacturing Batch Terminal (Next.js + RBAC)
                         Live: https://apparelflow-erp-one.vercel.app/
  [4] AnimeVerse       - High-Performance Media Platform (HLS.js + Express Proxy)
                         Live: https://animeverse.lol/
  [5] Oceanview Resort - Enterprise Hotel Reservation (Spring Boot + MySQL)
  [6] HealthShield AI  - Explainable Health Diagnostics (Streamlit + XGBoost + SHAP)`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          text: `ACADEMIC MILESTONES:
  • Cardiff Metropolitan University (2023 - 2026 Expected)
    BSc (Hons) Software Engineering — Final Year
  • ICBT Campus (Completed)
    Higher National Diploma (HND) in Software Engineering
  • British Way English Academy (Completed)
    Professional Diploma in English & Communication`
        });
        break;

      case 'cv':
        newHistory.push({
          type: 'success',
          text: `✓ Initiating download: /Channa_Kavishka_Sadaruwan_CV.pdf`
        });
        const cvLink = document.createElement('a');
        cvLink.href = personalInfo.cvDownloadUrl;
        cvLink.download = 'Channa_Kavishka_Sadaruwan_CV.pdf';
        cvLink.click();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `DIRECT CHANNELS:
  • Email:    ${personalInfo.email}
  • Phone:    ${personalInfo.phone}
  • GitHub:   ${personalInfo.github}
  • LinkedIn: ${personalInfo.linkedin}
  • Status:   ${personalInfo.availability}`
        });
        break;

      case 'theme':
        toggleTheme();
        newHistory.push({
          type: 'success',
          text: `✓ Toggled theme to: ${!isDark ? 'Dark Mode' : 'Light Mode'}`
        });
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      case 'exit':
      case 'quit':
        setTerminalOpen(false);
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `bash: command not found: ${trimmed}. Type 'help' for valid options.`
        });
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Filtered projects
  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'all') return true;
    if (filter === '3D & WebGL') return p.category.includes('3D') || p.tags.includes('Three.js');
    if (filter === 'Full Stack') return p.category.includes('Full Stack') || p.tags.includes('MERN');
    if (filter === 'Enterprise Java') return p.category.includes('Java') || p.tags.includes('Spring Boot');
    if (filter === 'AI & ML') return p.category.includes('AI') || p.category.includes('Machine Learning');
    return true;
  });

  return (
    <div className="relative">
      {/* Outer Dymas Alfin Frame */}
      <div className="frame">

        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="sec hero" id="top">
          {/* Smooth Wash In Overlay */}
          <div className="wash" aria-hidden="true"></div>

          {/* Clean Dymas Navigation Bar */}
          <nav>
            <span className="avail fade">
              <i className="dot"></i>
              Available for 2026 Roles
            </span>

            <a className="fade" href="#work" onClick={() => sound.playHover()}>
              Work<sup>[{projectsData.length}]</sup>
            </a>
            <a className="fade" href="#service" onClick={() => sound.playHover()}>
              Capabilities<sup>[4]</sup>
            </a>
            <a className="fade" href="#experience" onClick={() => sound.playHover()}>
              Education<sup>[2026]</sup>
            </a>

            {/* Interactive Terminal Trigger */}
            <button
              className="fade font-medium text-xs hover:text-[#60c1e5] transition-colors"
              onClick={() => {
                sound.playClick();
                setTerminalOpen(true);
                setTimeout(() => terminalInputRef.current?.focus(), 150);
              }}
              title="Open Developer CLI Terminal"
            >
              Terminal<sup style={{ color: 'var(--cyan-dark)' }}>[/cli]</sup>
            </button>

            {/* Theme Toggle Sun / Moon */}
            <button
              className="fade font-medium text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] hover:border-[#60c1e5] transition-all shadow-sm"
              onClick={toggleTheme}
              title="Toggle Light / Dark Mode"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Direct CTA */}
            <a className="btn fade" href="#contact" onClick={() => sound.playClick()}>
              Let’s Talk <i>↗</i>
            </a>
          </nav>

          {/* Giant Outline + Solid Kinetic Typography */}
          <h1 className="name" aria-label="Channa Kavishka">
            <span className="o"><b>CHANNA</b></span>{' '}
            <span className="s"><b>KAVISHKA</b></span>
          </h1>

          {/* Centerpiece Cutout Portrait with Rise Animation & Grayscale Hover */}
          <div
            className="portrait"
            aria-hidden="true"
            title="Channa Kavishka Sadaruwan"
            onClick={() => sound.playHover()}
          >
            <img
              src="/profile_headshot.png"
              alt="Channa Kavishka Sadaruwan"
              loading="eager"
            />
          </div>

          {/* Hero Left Content Bio */}
          <div className="hero-l fade">
            <h2>Software Engineering Student</h2>
            <p>
              Final-year BSc (Hons) undergraduate at Cardiff Metropolitan University building responsive full-stack web applications, interactive 3D WebGL experiences, and enterprise Java services.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a className="btn" href="#contact" onClick={() => sound.playClick()}>
                Let’s collaborate <i>↗</i>
              </a>
              <a
                className="btn ghosty"
                href={personalInfo.cvDownloadUrl}
                download="Channa_Kavishka_Sadaruwan_CV.pdf"
                onClick={() => {
                  sound.playSuccess();
                  confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                }}
              >
                Get CV <i>↓</i>
              </a>
            </div>
          </div>

          {/* Hero Right Socials Dock */}
          <div className="socials fade">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playHover()}
            >
              GitHub ↗
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playHover()}
            >
              LinkedIn ↗
            </a>
            <a
              href={personalInfo.cvDownloadUrl}
              download="Channa_Kavishka_Sadaruwan_CV.pdf"
              onClick={() => sound.playSuccess()}
            >
              CV (PDF) ↓
            </a>
            <button
              onClick={copyEmail}
              style={{ textAlign: 'left', cursor: 'pointer' }}
              title="Copy Email to Clipboard"
            >
              {copied ? 'Copied! ✓' : 'Copy Email 📋'}
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SELECTED WORK SECTION                                                     */}
        {/* ========================================================================= */}
        <section className="sec" id="work">
          <div className="ghost" data-p>PORTFOLIO</div>
          <h2 className="title rv">/SELECTED WORK</h2>

          {/* Filter Pills */}
          <div className="tools rv" style={{ '--i': 1 }}>
            <button
              className={filter === 'all' ? 'on' : ''}
              onClick={() => { sound.playClick(); setFilter('all'); }}
            >
              All
            </button>
            <button
              className={filter === '3D & WebGL' ? 'on' : ''}
              onClick={() => { sound.playClick(); setFilter('3D & WebGL'); }}
            >
              3D & WebGL
            </button>
            <button
              className={filter === 'Full Stack' ? 'on' : ''}
              onClick={() => { sound.playClick(); setFilter('Full Stack'); }}
            >
              Full Stack
            </button>
            <button
              className={filter === 'Enterprise Java' ? 'on' : ''}
              onClick={() => { sound.playClick(); setFilter('Enterprise Java'); }}
            >
              Enterprise Java
            </button>
            <button
              className={filter === 'AI & ML' ? 'on' : ''}
              onClick={() => { sound.playClick(); setFilter('AI & ML'); }}
            >
              AI & ML
            </button>
            <a
              className="btn ghosty"
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playHover()}
            >
              All Repos <i>↗</i>
            </a>
          </div>

          {/* 2-Column Responsive Card Grid */}
          <div className="grid">
            {filteredProjects.map((project, index) => (
              <button
                key={project.id}
                className="card"
                onClick={() => openProjectDrawer(project)}
                title={`View case study: ${project.title}`}
              >
                <div
                  className="thumb"
                  style={{
                    background: project.image
                      ? `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.55)), url(${project.image}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #0f172a, #1e293b 60%, #60c1e5)'
                  }}
                >
                  <em>{project.category.toUpperCase()}</em>
                </div>

                <h3>{project.title}</h3>

                <div className="tags">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                  {project.demoUrl && (
                    <span style={{ color: 'var(--cyan-dark)', fontWeight: 700 }}>
                      Live Demo ↗
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TECHNICAL CAPABILITIES SECTION (ACCORDION)                                */}
        {/* ========================================================================= */}
        <section className="sec" id="service">
          <div className="ghost" data-p>SERVICE</div>
          <div className="svc">
            <h2 className="title rv">/TECHNICAL CAPABILITIES</h2>

            {/* Row 1: Full-Stack */}
            <div
              className={`row ${activeRow === 0 ? 'open' : ''}`}
            >
              <button
                aria-expanded={activeRow === 0}
                onClick={() => {
                  sound.playClick();
                  setActiveRow(activeRow === 0 ? -1 : 0);
                }}
              >
                Full-Stack & Web Engineering <span className="x">↗</span>
              </button>
              <div className="more">
                Designing scalable web applications with React.js, Next.js, Node.js, Express, and modern CSS/Tailwind. Architecting clean RESTful APIs, JWT authentication, and relational/document schemas with MySQL and MongoDB.
              </div>
              <div
                className="pic"
                style={{
                  background: 'linear-gradient(135deg, #1e293b, #0f172a 60%, #60c1e5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px',
                  color: '#fff',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ color: '#60c1e5', fontWeight: 'bold' }}>// MERN STACK</div>
                <div style={{ opacity: 0.8, marginTop: '4px' }}>&lt;React.js /&gt;</div>
                <div style={{ opacity: 0.8 }}>Express.Router()</div>
                <div style={{ opacity: 0.8 }}>MongoDB + MySQL</div>
              </div>
            </div>

            {/* Row 2: 3D & WebGL */}
            <div
              className={`row ${activeRow === 1 ? 'open' : ''}`}
            >
              <button
                aria-expanded={activeRow === 1}
                onClick={() => {
                  sound.playClick();
                  setActiveRow(activeRow === 1 ? -1 : 1);
                }}
              >
                3D & Interactive Web (WebGL) <span className="x">↗</span>
              </button>
              <div className="more">
                Creating interactive WebGL scenes with Three.js, GSAP timeline animations, scroll-driven anatomy breakdowns, smooth 60 FPS viewport scrolling with Lenis, and WebXR mobile augmented reality.
              </div>
              <div
                className="pic"
                style={{
                  background: 'linear-gradient(135deg, #091e3a, #102a45 50%, #60c1e5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px',
                  color: '#fff',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ color: '#60c1e5', fontWeight: 'bold' }}>// 3D REAL-TIME</div>
                <div style={{ opacity: 0.8, marginTop: '4px' }}>new THREE.Scene()</div>
                <div style={{ opacity: 0.8 }}>GSAP.ScrollTrigger()</div>
                <div style={{ opacity: 0.8 }}>WebXR AR Session</div>
              </div>
            </div>

            {/* Row 3: Enterprise Java */}
            <div
              className={`row ${activeRow === 2 ? 'open' : ''}`}
            >
              <button
                aria-expanded={activeRow === 2}
                onClick={() => {
                  sound.playClick();
                  setActiveRow(activeRow === 2 ? -1 : 2);
                }}
              >
                Enterprise Java & Backend <span className="x">↗</span>
              </button>
              <div className="more">
                Developing robust enterprise backend services with Java, Spring Boot, Spring Data JPA, and Hibernate ORM. Designing relational database schemas in MySQL with strict ACID transaction management.
              </div>
              <div
                className="pic"
                style={{
                  background: 'linear-gradient(135deg, #2a1b18, #3e2723 60%, #e07a5f)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px',
                  color: '#fff',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ color: '#e07a5f', fontWeight: 'bold' }}>// SPRING BOOT</div>
                <div style={{ opacity: 0.8, marginTop: '4px' }}>@RestController</div>
                <div style={{ opacity: 0.8 }}>@Autowired Service</div>
                <div style={{ opacity: 0.8 }}>MySQL JPA / ACID</div>
              </div>
            </div>

            {/* Row 4: AI & ML */}
            <div
              className={`row ${activeRow === 3 ? 'open' : ''}`}
            >
              <button
                aria-expanded={activeRow === 3}
                onClick={() => {
                  sound.playClick();
                  setActiveRow(activeRow === 3 ? -1 : 3);
                }}
              >
                AI & Machine Learning Systems <span className="x">↗</span>
              </button>
              <div className="more">
                Engineering predictive machine learning pipelines in Python using soft-voting ensembles (XGBoost, LightGBM, CatBoost) with SHAP explainability, and computer vision classification pipelines.
              </div>
              <div
                className="pic"
                style={{
                  background: 'linear-gradient(135deg, #112d26, #164e63 60%, #60c1e5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px',
                  color: '#fff',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              >
                <div style={{ color: '#60c1e5', fontWeight: 'bold' }}>// ML & XAI</div>
                <div style={{ opacity: 0.8, marginTop: '4px' }}>XGBoost + LightGBM</div>
                <div style={{ opacity: 0.8 }}>shap.TreeExplainer()</div>
                <div style={{ opacity: 0.8 }}>Streamlit App UI</div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* EDUCATION & EXPERIENCE SECTION (DARK CARD SHEET)                          */}
        {/* ========================================================================= */}
        <section className="sec exp" id="experience">
          <div className="ghost" data-p>EXPERIENCE</div>
          
          <div className="head rv">
            <h2>/EDUCATION & JOURNEY</h2>
            <span>Cardiff Metropolitan University & Core Milestones</span>
          </div>

          <div className="jobs">
            {educationAndExperience.map((item, idx) => (
              <div
                key={idx}
                className="job"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleJobMouseEnter(e, item)}
                onMouseMove={handleJobMouseMove}
                onMouseLeave={handleJobMouseLeave}
              >
                <div>
                  <p style={{ fontWeight: 700, fontSize: '14px' }}>{item.organization}</p>
                  <p>{item.title}</p>
                  <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
                    {item.description}
                  </p>
                </div>
                <time style={{ fontWeight: 600, fontSize: '11px' }}>{item.period}</time>
              </div>
            ))}

            {/* Additional Production Experience Row */}
            <div
              className="job"
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => handleJobMouseEnter(e, {
                title: 'Full-Stack Developer (Live Web Apps)',
                organization: 'Independent Software Engineering',
                period: '2024 — Present'
              })}
              onMouseMove={handleJobMouseMove}
              onMouseLeave={handleJobMouseLeave}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: '14px' }}>Independent Software Engineering</p>
                <p>Full-Stack Developer — Café Nuwara, iFurnish Shop, ApparelFlow ERP</p>
                <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
                  Delivered and deployed 3 live production web applications featuring WebGL, WebXR AR, MERN stack, and garment manufacturing RBAC workflows.
                </p>
              </div>
              <time style={{ fontWeight: 600, fontSize: '11px' }}>2024 — Present</time>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTACT & CALL TO ACTION SECTION                                          */}
        {/* ========================================================================= */}
        <section className="sec cta" id="contact">
          <span
            className="avail"
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              padding: '7px 14px',
              borderRadius: '99px',
              background: 'var(--card)',
              fontSize: '11px',
              fontWeight: 600,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              border: '1px solid var(--line)'
            }}
          >
            <i className="dot"></i>
            Available for 2026 Internship & Trainee Roles
          </span>

          <h2 className="rv">HAVE A ROLE OR PROJECT IN MIND?</h2>

          <p className="rv" style={{ '--i': 1 }}>
            Final-year Software Engineering undergraduate ready to bring fresh engineering rigor, modern web development, and proactive problem solving to your engineering team.
          </p>

          <div
            className="rv"
            style={{
              '--i': 2,
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '6px'
            }}
          >
            <a
              className="btn"
              href={`mailto:${personalInfo.email}?subject=Software%20Engineering%20Opportunity`}
              onClick={() => sound.playClick()}
            >
              Email Me Directly <i>↗</i>
            </a>

            <button
              className="btn ghosty"
              onClick={copyEmail}
              title="Copy Email Address"
            >
              {copied ? 'Email Copied! ✓' : 'Copy Email Address 📋'}
            </button>

            <a
              className="btn ghosty"
              href={personalInfo.cvDownloadUrl}
              download="Channa_Kavishka_Sadaruwan_CV.pdf"
              onClick={() => {
                sound.playSuccess();
                confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
              }}
            >
              Download CV (PDF) <i>↓</i>
            </a>
          </div>

          {/* Bottom Dock Navigation */}
          <div className="foot">
            <a href="#top" onClick={() => sound.playHover()}>{personalInfo.name}</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" onClick={() => sound.playHover()}>GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => sound.playHover()}>LinkedIn</a>
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} onClick={() => sound.playHover()}>{personalInfo.phone}</a>
            <button
              onClick={() => {
                sound.playClick();
                setTerminalOpen(true);
              }}
              style={{
                padding: '7px 13px',
                borderRadius: '99px',
                background: 'var(--card)',
                fontSize: '10px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid var(--line)',
                cursor: 'pointer'
              }}
            >
              CLI Terminal [/cli]
            </button>
            <button
              onClick={toggleTheme}
              style={{
                padding: '7px 13px',
                borderRadius: '99px',
                background: 'var(--card)',
                fontSize: '10px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                border: '1px solid var(--line)',
                cursor: 'pointer'
              }}
            >
              {isDark ? 'Theme: Dark 🌙' : 'Theme: Light ☀️'}
            </button>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* FLOATING CURSOR VELOCITY PREVIEW FOR EXPERIENCE SECTION                   */}
      {/* ========================================================================= */}
      <div
        id="float"
        ref={floatRef}
        className={floatActive ? 'on' : ''}
        style={{
          background: floatInfo.color || 'linear-gradient(135deg, #60c1e5, #ffffff 40%, #0f172a)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '12px',
          color: '#fff',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)'
        }}
      >
        <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#60c1e5' }}>
          {floatInfo.meta || 'Milestone'}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.25, marginTop: '4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {floatInfo.title || 'Software Engineering'}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL PROJECT DETAIL CASE STUDY DRAWER (#project WIPE-UP TRANSITION)        */}
      {/* ========================================================================= */}
      <div
        id="project"
        role="dialog"
        aria-label="Project Case Study"
        className={selectedProject ? 'open' : ''}
      >
        <div className="top">
          <button className="back" onClick={closeProjectDrawer}>
            ← Back to Portfolio
          </button>
          <span className="back">
            <i className="dot" style={{ display: 'inline-block', marginRight: '8px' }}></i>
            Available for 2026 Roles
          </span>
        </div>

        {selectedProject && (
          <div className="pg">
            <div>
              <div className="tags in-r" style={{ margin: 0 }}>
                <span style={{ background: 'var(--card)' }}>{selectedProject.category}</span>
                {selectedProject.featured && (
                  <span style={{ background: 'var(--card)', color: 'var(--cyan-dark)', fontWeight: 700 }}>
                    ★ Flagship Project
                  </span>
                )}
              </div>

              <h1 className="in-r" style={{ '--i': 1 }}>
                <span>{selectedProject.title}</span>
                <small>/{selectedProject.category}</small>
              </h1>

              <p className="in-r" style={{ '--i': 2 }}>
                {selectedProject.summary}
              </p>

              {/* Action Buttons */}
              <div className="in-r" style={{ '--i': 3, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedProject.demoUrl && (
                  <a
                    className="btn"
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                  >
                    Live Preview <i>↗</i>
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    className="btn ghosty"
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                  >
                    GitHub Source <i>↗</i>
                  </a>
                )}
                <a
                  className="btn ghosty"
                  href="#contact"
                  onClick={() => {
                    closeProjectDrawer();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact About This
                </a>
              </div>

              {/* Highlights Bullet Points */}
              {selectedProject.highlights && (
                <div className="in-r" style={{ '--i': 4, marginTop: '28px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', color: 'var(--ink)' }}>
                    Engineering Key Highlights:
                  </h4>
                  <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '12px', lineHeight: 1.8, color: 'var(--mute)' }}>
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Metadata Sidebar */}
            <div className="meta in-r" style={{ '--i': 2 }}>
              <div>
                Service / Focus
                <b>{selectedProject.category}</b>
              </div>
              <div>
                Architecture
                <b>{selectedProject.architecture || 'Modular Modern Stack'}</b>
              </div>
              <div>
                Core Technologies
                <b style={{ fontSize: '11px', fontWeight: 600 }}>
                  {selectedProject.tags.join(', ')}
                </b>
              </div>
              <div>
                Deployment
                <b>{selectedProject.demoUrl ? 'Vercel (Live Production)' : 'GitHub Open Source'}</b>
              </div>
            </div>
          </div>
        )}

        {/* Project Large Screenshot / Cover */}
        {selectedProject && (
          <div
            className="shot in-r"
            style={{
              '--i': 5,
              backgroundImage: selectedProject.image ? `url(${selectedProject.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '360px'
            }}
          />
        )}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DEVELOPER TERMINAL MODAL (/cli)                                */}
      {/* ========================================================================= */}
      <div
        id="terminal-modal"
        className={terminalOpen ? 'open' : ''}
        onClick={(e) => {
          if (e.target.id === 'terminal-modal') {
            sound.playClick();
            setTerminalOpen(false);
          }
        }}
      >
        <div className="term-box">
          {/* Terminal Window Header */}
          <div className="term-head">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                onClick={() => { sound.playClick(); setTerminalOpen(false); }}
                style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', cursor: 'pointer' }}
                title="Close"
              />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ marginLeft: '12px', color: '#94a3b8', fontSize: '11px' }}>
                channa@portfolio-terminal:~
              </span>
            </div>
            <button
              onClick={() => { sound.playClick(); setTerminalOpen(false); }}
              style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* Terminal Content Body */}
          <div className="term-body" ref={terminalBodyRef}>
            {terminalHistory.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                {item.type === 'banner' && (
                  <pre style={{ color: '#60c1e5', fontSize: '10px', lineHeight: 1.2, margin: 0, overflowX: 'auto' }}>
                    {item.text}
                  </pre>
                )}
                {item.type === 'system' && (
                  <div style={{ color: '#94a3b8', fontSize: '11px' }}>{item.text}</div>
                )}
                {item.type === 'user' && (
                  <div style={{ color: '#f8fafc', fontWeight: 600 }}>{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', margin: 0, fontSize: '11px', lineHeight: 1.5 }}>
                    {item.text}
                  </pre>
                )}
                {item.type === 'success' && (
                  <div style={{ color: '#4ade80', fontSize: '11px' }}>{item.text}</div>
                )}
                {item.type === 'error' && (
                  <div style={{ color: '#f87171', fontSize: '11px' }}>{item.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Command Action Pills */}
          <div
            style={{
              padding: '8px 16px',
              background: '#070d18',
              borderTop: '1px solid #1e293b',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto'
            }}
          >
            {['help', 'about', 'skills', 'projects', 'education', 'cv', 'contact', 'theme', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleTerminalCommand(cmd)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '99px',
                  background: '#131e31',
                  color: '#60c1e5',
                  fontSize: '10px',
                  fontWeight: 600,
                  border: '1px solid rgba(96, 193, 229, 0.25)',
                  whiteSpace: 'nowrap'
                }}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Command Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTerminalCommand(terminalInput);
            }}
            style={{
              padding: '10px 16px',
              background: '#0b1320',
              borderTop: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ color: '#60c1e5', fontWeight: 'bold' }}>$&gt;</span>
            <input
              ref={terminalInputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (terminalCmdHistory.length > 0) {
                    const nextIdx = historyIndex + 1;
                    if (nextIdx < terminalCmdHistory.length) {
                      setHistoryIndex(nextIdx);
                      setTerminalInput(terminalCmdHistory[terminalCmdHistory.length - 1 - nextIdx]);
                    }
                  }
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  if (historyIndex > 0) {
                    const nextIdx = historyIndex - 1;
                    setHistoryIndex(nextIdx);
                    setTerminalInput(terminalCmdHistory[terminalCmdHistory.length - 1 - nextIdx]);
                  } else if (historyIndex === 0) {
                    setHistoryIndex(-1);
                    setTerminalInput('');
                  }
                }
              }}
              placeholder="type 'help', 'cv', or click buttons..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: '12px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                background: '#60c1e5',
                color: '#0b0f17',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              Run
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
