import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Download, Calendar, MapPin, Trophy, X, FileText, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const FORMSPREE_ID = "xlgeranj"; 

// --- Components ---

const NavItem = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-gray-500 hover:text-white transition-colors duration-300 text-xs md:text-sm tracking-[0.2em] uppercase block py-4 md:py-0"
  >
    {children}
  </a>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-5xl mx-auto relative z-10 scroll-mt-20">
    <motion.h2 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-2xl md:text-4xl font-thin mb-16 tracking-[0.2em] border-b border-white/10 pb-6 text-white"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

const TimelineItem = ({ date, title, subtitle, desc }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative pl-8 border-l border-gray-800 pb-12 last:pb-0"
  >
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-black border border-white rounded-full"></div>
    <div className="text-xs text-gray-500 tracking-widest mb-2 flex items-center gap-2">
      <Calendar size={12} /> {date}
    </div>
    <h3 className="text-xl text-white tracking-wider mb-1">{title}</h3>
    <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
      <MapPin size={12} /> {subtitle}
    </div>
    <p className="text-gray-500 text-sm leading-relaxed font-thin max-w-2xl">
      {desc}
    </p>
  </motion.div>
);

const AchievementItem = ({ title, org, date, desc, pdfLink, onPreview }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    onClick={() => onPreview(pdfLink)}
    className="flex gap-4 mb-8 border border-white/5 p-4 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group"
  >
    <div className="mt-1 text-yellow-500 group-hover:scale-110 transition-transform">
      <Trophy size={20} />
    </div>
    <div className="w-full">
      <div className="flex justify-between items-start">
        <h3 className="text-lg text-white tracking-wider group-hover:text-yellow-400 transition-colors">{title}</h3>
        <span className="text-[10px] text-gray-500 border border-white/10 px-2 py-1 rounded flex items-center gap-1 group-hover:border-white/40">
           <FileText size={10} /> VIEW CERTIFICATE
        </span>
      </div>
      <div className="text-xs text-gray-400 mb-2 flex gap-3 uppercase tracking-widest mt-1">
        <span>{org}</span> <span>|</span> <span>{date}</span>
      </div>
      <p className="text-gray-500 text-xs font-thin leading-relaxed">
        {desc}
      </p>
    </div>
  </motion.div>
);

const ProjectCard = ({ title, desc, tags, link, featured }) => {
  const Component = link ? motion.a : motion.div;
  const props = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component 
      {...props}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`block border bg-black/50 backdrop-blur-sm p-6 transition-all duration-300 group relative overflow-hidden ${
        featured 
          ? 'border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
          : 'border-white/10 hover:border-white/40'
      } ${link ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default'}`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[8px] tracking-widest px-2 py-1 uppercase">
          Featured
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl tracking-wider group-hover:text-white text-gray-200 transition-colors">{title}</h3>
        {link && <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-colors" />}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 font-thin">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-1 group-hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </Component>
  );
};

const SkillBadge = ({ skill, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
    className="border border-white/10 p-6 text-center hover:border-white transition-all duration-300 cursor-default"
  >
    <span className="text-xs tracking-[0.2em] text-gray-300">{skill}</span>
  </motion.div>
);

// --- PDF Modal Component ---
const PdfModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-gray-400 hover:text-white hover:rotate-90 transition-all z-50"
      >
        <X size={40} />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl h-[85vh] bg-[#1a1a1a] border border-white/20 flex flex-col shadow-2xl relative"
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/50">
          <span className="text-xs tracking-[0.2em] text-gray-400 uppercase flex items-center gap-2">
            <FileText size={14}/> Document Preview
          </span>
          <a 
            href={pdfUrl} 
            download 
            className="flex items-center gap-2 text-xs font-bold bg-white text-black px-4 py-2 hover:bg-gray-300 transition-colors tracking-widest"
          >
            <Download size={14}/> DOWNLOAD
          </a>
        </div>

        <div className="flex-1 bg-gray-900 relative">
          <iframe 
            src={`${pdfUrl}#toolbar=0`} 
            className="w-full h-full" 
            title="PDF Preview"
          >
             <div className="flex flex-col items-center justify-center h-full text-gray-500">
               <p>Preview not supported on this device.</p>
               <a href={pdfUrl} className="mt-4 text-white underline">Download File</a>
             </div>
          </iframe>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

function App() {
  const canvasRef = useRef(null);
  
  // State variables
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW STATE FOR MOBILE MENU

  const openPdf = (url) => {
    setCurrentPdf(url);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (FORMSPREE_ID === "YOUR_FORMSPREE_ID") {
      alert("Please update the FORMSPREE_ID in src/App.jsx with your actual ID from formspree.io");
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let ripples = [];
    let shootingStars = [];
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.opacity = 0.8; 
        this.growthSpeed = 24; 
      }
      update(delta) {
        this.radius += this.growthSpeed * delta;
        this.opacity -= 1.2 * delta; 
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1; 
        ctx.stroke();
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 300 + 200;
        this.opacity = 1;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      }
      update(delta) {
        this.x += Math.cos(this.angle) * this.speed * delta;
        this.y += Math.sin(this.angle) * this.speed * delta;
        this.opacity -= 0.8 * delta;
      }
      draw() {
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;
        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; 
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.8 + 0.3;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      }
      update(delta) {
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.opacity += this.twinkleSpeed * this.twinkleDirection * delta;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
          this.twinkleDirection *= -1;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      particles = [];
      ripples = [];
      shootingStars = [];
      const particleCount = isMobile ? 40 : 120;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = (currentTime) => {
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.draw());
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) return;
      
      const delta = Math.min(elapsed / 1000, 0.1);
      lastTime = currentTime - (elapsed % frameInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.15 * delta) {
        shootingStars.push(new ShootingStar());
      }
      
      shootingStars.forEach((star, index) => {
        star.update(delta);
        star.draw();
        if (star.opacity <= 0) shootingStars.splice(index, 1);
      });
      
      particles.forEach(p => { p.update(delta); p.draw(); });
      
      ripples.forEach((r, index) => {
        r.update(delta); r.draw();
        if (r.opacity <= 0) ripples.splice(index, 1);
      });
      
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i]; const p2 = particles[j];
            const dx = p1.x - p2.x; const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - distance/2000})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
            const minDistance = p1.size + p2.size + 2; 
            if (distance < minDistance) {
              ripples.push(new Ripple((p1.x + p2.x)/2, (p1.y + p2.y)/2));
              const overlap = minDistance - distance;
              const angle = Math.atan2(dy, dx);
              const moveX = Math.cos(angle) * overlap * 0.5;
              const moveY = Math.sin(angle) * overlap * 0.5;
              p1.x += moveX; p1.y += moveY;
              p2.x -= moveX; p2.y -= moveY;
              const tempVX = p1.speedX; const tempVY = p1.speedY;
              p1.speedX = p2.speedX; p1.speedY = p2.speedY;
              p2.speedX = tempVX; p2.speedY = tempVY;
            }
          }
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const skills = [
    'Python', 'Java', 'C++', 'TypeScript',
    'React', 'Next.js', 'FastAPI', 'SQL',
    'Docker', 'Linux', 'Git', 'Figma'
  ];

  return (
    <div className="relative min-h-screen bg-black text-gray-300 selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Nebula Glow Effect - optimized for cross-browser */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/8 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/8 rounded-full blur-[100px]"></div>
      </div>

      {/* PDF POPUP MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <PdfModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            pdfUrl={currentPdf} 
          />
        )}
      </AnimatePresence>

      {/* MOBILE MENU OVERLAY (NEW) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-8"
          >
             <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="absolute top-6 right-6 text-gray-500 hover:text-white"
              >
                <X size={30} />
              </button>
              
              <div className="flex flex-col gap-8 text-center">
                <NavItem href="#home" onClick={() => setMobileMenuOpen(false)}>Home</NavItem>
                <NavItem href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</NavItem>
                <NavItem href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</NavItem>
                <NavItem href="#education" onClick={() => setMobileMenuOpen(false)}>Logs</NavItem>
                <NavItem href="#awards" onClick={() => setMobileMenuOpen(false)}>Honors</NavItem>
                <NavItem href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavItem>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <a href="#home" className="text-white text-lg font-bold tracking-[0.3em] hover:opacity-80 transition-opacity">AVA_YUNUS</a>
          <div className="hidden md:flex gap-8">
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#projects">Projects</NavItem>
            <NavItem href="#skills">Skills</NavItem>
            <NavItem href="#education">Logs</NavItem>
            <NavItem href="#awards">Honors</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </div>
          {/* MOBILE MENU BUTTON (UPDATED) */}
          <button 
            className="md:hidden text-xs text-gray-500 tracking-widest flex items-center gap-2"
            onClick={() => setMobileMenuOpen(true)}
          >
             MENU <Menu size={16}/>
          </button>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section id="home" className="h-screen flex flex-col justify-center items-center relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center w-full"
        >
          
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-8xl text-white font-thin tracking-widest hero-glow">
              AVA YUNUS
            </h1>
            <span className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 ml-8 text-lg text-gray-600 tracking-[0.2em] font-normal border border-gray-800 px-3 py-1 rounded-full bg-white/5 whitespace-nowrap hover:border-gray-600 transition-colors cursor-help" title="Pronounced like 'Lava'">
              / AH-VA /
            </span>
          </div>

          <div className="md:hidden mb-8">
             <span className="text-xs text-gray-600 tracking-[0.2em] font-normal border border-gray-800 px-3 py-1 rounded-full bg-white/5">
              / AH-VA /
            </span>
          </div>
          
          <div className="h-6 md:h-8 overflow-hidden mb-12 w-full px-2">
            <motion.p 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "linear" }}
              /* CHANGED: Adjusted text size and tracking for mobile to prevent cutoff */
              className="text-[10px] md:text-sm text-gray-400 max-w-lg mx-auto leading-loose tracking-widest md:tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden border-r-2 border-white pr-2"
            >
              Software Engineer <span className="text-white mx-1 md:mx-2">|</span> Builder <span className="text-white mx-1 md:mx-2">|</span> Minimalist
            </motion.p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/avayunus" target="_blank" rel="noopener noreferrer" className="p-3 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/avayunus" target="_blank" rel="noopener noreferrer" className="p-3 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                <Github size={20} />
              </a>
            </div>
            
            <button 
              onClick={() => openPdf('/resume.pdf')}
              className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] flex items-center gap-2 hover:bg-gray-200 transition-colors uppercase"
            >
              <Download size={16} /> Preview Resume
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 opacity-50"
        >
          <ChevronDown size={30} />
        </motion.div>
      </section>

      {/* Projects Section */}
      <Section id="projects" title="01_PROJECTS">
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard 
            title="VIGIL" 
            link="https://github.com/avayunus/Vigil"
            desc="Real-time global event monitor with interactive map visualization. Aggregates data from GDELT and major news RSS feeds using a FastAPI backend." 
            tags={['Next.js', 'FastAPI', 'Python', 'Leaflet']}
            featured={true}
          />
          <ProjectCard 
            title="SCHOLAR AI" 
            link="https://github.com/avayunus/Scholar"
            desc="RAG-based study assistant that processes and summarizes academic documents using large language models and vector embeddings." 
            tags={['LangChain', 'Python', 'AI']} 
          />
          <ProjectCard 
            title="AI COUNCIL" 
            link="https://github.com/avayunus/ai_council"
            desc="Multi-agent debate system where different AI personas argue perspectives before synthesizing a final consensus answer." 
            tags={['LLM', 'System Design']} 
          />
          <ProjectCard 
            title="ZERO TRACKER" 
            link="https://github.com/avayunus/ZeroTracker"
            desc="Lightweight Valorant stats tracker focused on essential metrics. No ads, no bloat, just clean data." 
            tags={['Python', 'API', 'Minimal']} 
          />
          <ProjectCard 
            title="JUST NOTES" 
            link="https://github.com/avayunus/JustNotes"
            desc="Distraction-free note-taking app built for speed. Supports markdown with instant preview." 
            tags={['React', 'Minimal', 'Markdown']} 
          />
          <ProjectCard 
            title="FLEXX FITNESS" 
            link="https://github.com/avayunus/FlexxFitness"
            desc="Full-stack fitness tracker with workout logging and progress visualization. Reduced onboarding friction by 20% through UX iteration." 
            tags={['Java', 'SQL', 'App Dev']} 
          />
          <ProjectCard 
            title="PASS STRENGTH" 
            link="https://github.com/avayunus/password_strength_tool"
            desc="Security tool that estimates brute-force crack time for passwords based on entropy analysis and common attack patterns." 
            tags={['Security', 'Algorithms']} 
          />
          <ProjectCard 
            title="ROBORAMA BOT" 
            desc="Autonomous line-following robot using PID control for stable navigation through complex track patterns." 
            tags={['C++', 'Embedded', 'Robotics']} 
          />
          <ProjectCard 
            title="PLANT SYSTEM" 
            desc="IoT-based automatic plant watering system with soil moisture detection and scheduled irrigation." 
            tags={['Java', 'IoT', 'Hardware']} 
          />
          <ProjectCard 
            title="PORTFOLIO" 
            link="https://github.com/avayunus/portfolio-2025"
            desc="This site. A modular React portfolio with particle animations and minimalist design principles." 
            tags={['React', 'Tailwind', 'Framer']} 
          />
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="02_SKILLS">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} index={index} />
          ))}
        </div>
      </Section>

      {/* Education Timeline */}
      <Section id="education" title="03_LOGS">
        <div className="max-w-3xl">
          <TimelineItem 
            date="2025 - Present"
            title="Software Engineering (B.Eng)"
            subtitle="York University"
            desc="Continuing with focus on computer architecture and intelligent systems. Currently building full-stack projects and preparing for co-op placements."
          />
          <TimelineItem 
            date="2024"
            title="Technical Sabbatical"
            subtitle="Remote / Independent"
            desc="Planned leave for family responsibilities. Stayed sharp through independent projects including Scholar AI and Zero Tracker."
          />
           <TimelineItem 
            date="2021 - 2023"
            title="Software Engineering (B.Eng)"
            subtitle="York University"
            desc="Core engineering curriculum covering data structures, algorithms, OOP, and system design fundamentals."
          />
        </div>
      </Section>

      {/* Achievements Section */}
      <Section id="awards" title="04_HONORS">
        <div className="max-w-3xl">
          <AchievementItem 
            title="3rd Place Winner"
            org="UNHack 2021 - BEST Lassonde"
            date="NOV 2021"
            desc="Built a sustainability-focused solution targeting SDG #7 with a team of 5. Led system architecture and modular simulation design."
            pdfLink="/unhack.pdf"
            onPreview={openPdf}
          />
          <AchievementItem 
            title="Participation Award"
            org="Lassonde Roborama - Robotics Society"
            date="JAN 2023"
            desc="Competed in autonomous robotics challenge. Implemented PID-tuned movement logic for stable line-following performance."
            pdfLink="/roborama.pdf"
            onPreview={openPdf}
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="05_CONTACT">
        <div className="max-w-xl mx-auto w-full border border-white/10 p-8 backdrop-blur-sm bg-black/30">
          <p className="text-center text-gray-500 mb-8 font-light text-sm tracking-widest">
            INITIATE CONNECTION
          </p>
          <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
            <input 
              name="name"
              type="text" 
              placeholder="NAME" 
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-transparent border border-white/20 p-4 text-xs focus:outline-none focus:border-white text-white placeholder-gray-600 tracking-widest transition-colors" 
            />
            <input 
              name="email"
              type="email" 
              placeholder="EMAIL" 
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-transparent border border-white/20 p-4 text-xs focus:outline-none focus:border-white text-white placeholder-gray-600 tracking-widest transition-colors" 
            />
            <textarea 
              name="message"
              rows="4" 
              placeholder="MESSAGE" 
              value={formData.message}
              onChange={handleInputChange}
              required
              className="bg-transparent border border-white/20 p-4 text-xs focus:outline-none focus:border-white text-white placeholder-gray-600 tracking-widest transition-colors"
            ></textarea>
            
            {/* DYNAMIC BUTTON */}
            <button 
              type="submit" 
              disabled={status === 'submitting' || status === 'success'}
              className={`py-4 mt-4 text-xs font-bold tracking-[0.3em] uppercase transition-colors ${
                status === 'success' 
                  ? 'bg-green-500 text-black cursor-default' 
                  : status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-black hover:bg-gray-300'
              }`}
            >
              {status === 'submitting' ? 'TRANSMITTING...' : status === 'success' ? 'TRANSMISSION RECEIVED' : status === 'error' ? 'ERROR - TRY AGAIN' : 'SEND TRANSMISSION'}
            </button>
          </form>
          <div className="mt-12 flex justify-center items-center gap-2 text-xs text-gray-600 tracking-widest">
             <Mail size={14} /> <span>avayunus02@gmail.com</span>
          </div>
        </div>
      </Section>

      <footer className="py-12 text-center text-[10px] text-gray-800 tracking-[0.3em] uppercase">
        Designed by Ava Yunus &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
