import React, { Suspense, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronDown, ChevronUp,
  Code2, Database, Download, ExternalLink, Github, Globe2, GraduationCap, Linkedin,
  Mail, MapPin, Menu, Moon, Phone, Rocket, Send, Server, Sparkles, Sun, Trophy, Twitter, X, Languages,
  Zap, Cpu, Layers3, MessageCircle, Terminal, Cloud, BrainCircuit
} from 'lucide-react'
import './styles.css'

const resume = '/Santtun-Ray-Resume.pdf'

const skills = {
  Frontend: { icon: Globe2, items: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Web Design'] },
  Backend: { icon: Server, items: ['Node.js', 'Express.js', 'Spring Boot', 'REST API', 'JWT', 'Microservices'] },
  Databases: { icon: Database, items: ['MySQL', 'MongoDB', 'Firebase Realtime DB'] },
  'AI / ML': { icon: BrainCircuit, items: ['Gemini LLM', 'RAG', 'Prompt Engineering', 'LangChain'] },
  'Cloud & DevOps': { icon: Cloud, items: ['Google Cloud Platform', 'Firebase', 'Git', 'GitHub', 'Version Control'] },
  'Core CS': { icon: Cpu, items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Software Engineering', 'System Design'] },
}

const projects = [
  {
    no: '01', title: 'CarbonClad', tag: 'Smart India Hackathon 2024 Winner', type: 'AI / Full-Stack',
    description: 'A safety-first platform digitizing coal mine shift handovers and emergency workflows.',
    problem: 'Manual shift handovers made safety information slow to communicate and difficult to track across teams.',
    solution: 'A responsive role-based platform centralizes shift records, worker alerts and safety communication with real-time updates.',
    architecture: 'React.js → Node.js / Express.js → MongoDB, with JWT/RBAC, Twilio SMS and Dialogflow integrations.',
    challenges: 'Designing reliable real-time alerts while keeping the interface simple for field workers.',
    results: 'Digitized 100+ daily handovers, cut incident notification time by 50%, and automated 200+ SMS alerts weekly.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Twilio', 'Dialogflow'],
    github: 'https://github.com/santtun1', live: '#'
  },
  {
    no: '02', title: 'SwarnBhoomi', tag: 'Google Solution Challenge 2025', type: 'AI / RAG',
    description: 'A context-aware AI assistant delivering practical agricultural guidance to small farmers.',
    problem: 'Farmers need useful, contextual answers rather than generic search results.',
    solution: 'A RAG-based assistant combines Gemini with a grounded knowledge workflow and Firebase-backed user services.',
    architecture: 'React.js → Firebase → Gemini / RAG / LangChain → Google Cloud Platform.',
    challenges: 'Maintaining useful context while supporting concurrent users and keeping interactions fast.',
    results: 'Served 100+ farmers, processed 150+ queries daily and supported 100+ concurrent users.',
    tech: ['React.js', 'Firebase', 'Gemini', 'RAG', 'LangChain', 'GCP'],
    github: 'https://github.com/santtun1', live: '#'
  },
  {
    no: '03', title: 'Smart E-Learning Platform', tag: 'AI-powered learning', type: 'Web / AI',
    description: 'An AI-powered learning platform with offline access and automated grading.',
    problem: 'Students needed accessible learning while instructors spent significant time on repetitive grading.',
    solution: 'Built a responsive learning experience with offline mode and automated grading workflows.',
    architecture: 'React.js frontend with Node.js APIs, MongoDB persistence, Firebase services and Gemini integration.',
    challenges: 'Balancing offline-first UX with synchronization and automated evaluation.',
    results: 'Adopted by 150+ users, increased engagement by 40%, and saved instructors 10+ hours per month.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Firebase', 'JavaScript', 'Gemini','Spring Boot'],
    github: 'https://github.com/santtun1', live: '#'
  }
]

const experiences = [
  {
    date: 'Jun 2022 — Jun 2026', role: 'Software Developer', company: 'Academic & Hackathon Projects · CV Raman Global University',
    location: 'Bhubaneswar, Odisha',
    bullets: ['Led 3+ full-stack applications across the SDLC in Agile teams of up to 6.', 'Established Git/version-control and code-review workflows, reducing integration errors by 30%.', 'Coordinated testing, documentation and deployment, reducing delivery time by 20%.', 'Mentored 4+ junior developers on Git, REST APIs and collaboration.'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'REST APIs']
  }
]

const achievements = [
  ['Winner', 'Smart India Hackathon 2024', 'Ranked 1st among 50+ teams', Trophy],
  ['Runner-Up', 'Hack Fest · Jan 2025', 'Recognized for an innovative hackathon solution', Rocket],
  ['Top 100 Global Finalist', 'IDEATHON · 2025', 'Among 1,000+ entries · SCRS USA / FIU', Sparkles],
  ['Top 105', 'Google Solution Challenge · Mar 2025', 'Selected from 10,000+ teams', Zap],
]

const locales = {
  en: { code: 'EN', nav: ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'], status: 'Open to software engineering opportunities', role: 'SOFTWARE ENGINEER · FULL STACK · AI', title: ['Engineering', 'digital experiences', 'that matter.'], hero: 'Computer Science graduate focused on full-stack development, backend systems and AI-powered applications — from idea to production.', projects: 'View Projects', resume: 'Download Resume', connect: 'Connect with me', build: 'Build. Ship. Iterate.', scroll: 'Scroll to explore' },
  hi: { code: 'हिं', nav: ['होम', 'परिचय', 'स्किल्स', 'अनुभव', 'प्रोजेक्ट्स', 'उपलब्धियां', 'संपर्क'], status: 'सॉफ्टवेयर इंजीनियरिंग अवसरों के लिए उपलब्ध', role: 'सॉफ्टवेयर इंजीनियर · फुल स्टैक · AI', title: ['इंजीनियरिंग', 'डिजिटल अनुभव', 'जो मायने रखते हैं।'], hero: 'कंप्यूटर साइंस ग्रेजुएट, जो फुल-स्टैक डेवलपमेंट, बैकएंड सिस्टम और AI एप्लिकेशन बनाने पर केंद्रित है।', projects: 'प्रोजेक्ट देखें', resume: 'रिज्यूमे डाउनलोड करें', connect: 'मुझसे जुड़ें', build: 'बनाएं। लॉन्च करें। सुधारें।', scroll: 'आगे देखें' },
  de: { code: 'DE', nav: ['Start', 'Über mich', 'Skills', 'Erfahrung', 'Projekte', 'Erfolge', 'Kontakt'], status: 'Offen für Software-Engineering-Möglichkeiten', role: 'SOFTWARE ENGINEER · FULL STACK · KI', title: ['Engineering', 'digitale Erlebnisse', 'die zählen.'], hero: 'Informatik-Absolvent mit Fokus auf Full-Stack-Entwicklung, Backend-Systeme und KI-Anwendungen.', projects: 'Projekte ansehen', resume: 'Lebenslauf laden', connect: 'Kontakt aufnehmen', build: 'Bauen. Liefern. Verbessern.', scroll: 'Entdecken' },
  ja: { code: '日', nav: ['ホーム', '概要', 'スキル', '経験', 'プロジェクト', '実績', '連絡先'], status: 'ソフトウェアエンジニアリングの機会を探しています', role: 'ソフトウェアエンジニア · フルスタック · AI', title: ['エンジニアリング', 'デジタル体験を', '形にする。'], hero: 'フルスタック開発、バックエンド、AIアプリケーションに取り組むコンピュータサイエンス卒業生です。', projects: 'プロジェクトを見る', resume: '履歴書をダウンロード', connect: 'つながる', build: '作る。届ける。改善する。', scroll: 'もっと見る' },
  fr: { code: 'FR', nav: ['Accueil', 'À propos', 'Compétences', 'Expérience', 'Projets', 'Réalisations', 'Contact'], status: 'Ouvert aux opportunités en ingénierie logicielle', role: 'INGÉNIEUR LOGICIEL · FULL STACK · IA', title: ['Ingénierie', 'des expériences numériques', 'qui comptent.'], hero: "Diplômé en informatique, spécialisé dans le développement full-stack, les systèmes backend et les applications IA.", projects: 'Voir les projets', resume: 'Télécharger le CV', connect: 'Me contacter', build: 'Créer. Livrer. Améliorer.', scroll: 'Explorer' },
  es: { code: 'ES', nav: ['Inicio', 'Sobre mí', 'Habilidades', 'Experiencia', 'Proyectos', 'Logros', 'Contacto'], status: 'Disponible para oportunidades de ingeniería de software', role: 'INGENIERO DE SOFTWARE · FULL STACK · IA', title: ['Ingeniería', 'experiencias digitales', 'que importan.'], hero: 'Graduado en Informática enfocado en desarrollo full-stack, sistemas backend y aplicaciones con IA.', projects: 'Ver proyectos', resume: 'Descargar CV', connect: 'Conecta conmigo', build: 'Crear. Publicar. Mejorar.', scroll: 'Explorar' },
}

function GlowScene() {
  const group = useRef()
  const core = useRef()
  const rings = useRef([])
  const keys = useRef({})
  const manual = useRef({ x: 0, y: 0 })
  const auto = useRef(0)
  const { size, pointer } = useThree()

  useEffect(() => {
    const down = event => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      if (!event.key.startsWith('Arrow')) return
      event.preventDefault(); keys.current[event.key] = true
    }
    const up = event => { keys.current[event.key] = false }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    const fit = Math.min(1, Math.max(.28, size.width / 310))
    group.current.scale.lerp({ x: fit, y: fit, z: fit }, .12)
    auto.current += delta * .12
    const speed = delta * 1.4
    if (keys.current.ArrowLeft) manual.current.y -= speed
    if (keys.current.ArrowRight) manual.current.y += speed
    if (keys.current.ArrowUp) manual.current.x -= speed
    if (keys.current.ArrowDown) manual.current.x += speed
    const targetX = .2 - pointer.y * .34 + manual.current.x
    const targetY = auto.current + pointer.x * .42 + manual.current.y
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 5)
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 5)
    if (core.current) core.current.scale.setScalar(1 + Math.sin(performance.now() * .002) * .08)
    rings.current.forEach((ring, index) => { if (ring) ring.rotation.z += delta * (index % 2 ? -.18 : .12) })
  })

  return <group ref={group} rotation={[0.2, 0, 0]}>
    <mesh ref={core}><sphereGeometry args={[.72, 32, 32]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={.9}/></mesh>
    <mesh scale={1.45}><sphereGeometry args={[.72, 24, 24]} /><meshBasicMaterial color="#7c3aed" transparent opacity={.14} wireframe/></mesh>
    {[1.25, 1.65, 2.05].map((radius, index) => <mesh key={radius} ref={node => { rings.current[index] = node }} rotation={[index * .8, index * .45, index * .4]}><torusGeometry args={[radius, .018 + index * .008, 12, 96]}/><meshBasicMaterial color={index === 1 ? '#22d3ee' : '#8b5cf6'} transparent opacity={.78 - index * .12}/></mesh>)}
    {Array.from({ length: 28 }).map((_, i) => { const angle = i * 2.399; const radius = 1.35 + (i % 5) * .17; return <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 1.7) * .55, Math.sin(angle) * radius]}><sphereGeometry args={[i % 4 === 0 ? .07 : .035, 10, 10]}/><meshBasicMaterial color={i % 4 === 0 ? '#67e8f9' : '#a78bfa'} transparent opacity={.72}/></mesh> })}
  </group>
}

function App() {
  const [dark, setDark] = useState(true)
  const [language, setLanguage] = useState('en')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [faq, setFaq] = useState(0)
  const [status, setStatus] = useState('idle')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const t = locales[language]

  useEffect(() => { document.documentElement.classList.toggle('light', !dark) }, [dark])
  useEffect(() => { document.documentElement.lang = language }, [language])
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setActiveProject(null)
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])

  const nav = t.nav.map((label, index) => ({ label, id: ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'][index] }))
  const go = id => { setMobileOpen(false); requestAnimationFrame(() => requestAnimationFrame(() => { const target = document.getElementById(id); if (!target) return; const offset = window.innerWidth <= 760 ? 82 : 96; window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: 'smooth' }) })) }

  const submit = async e => { e.preventDefault(); setStatus('loading'); const form = e.currentTarget; const data = new FormData(form); data.append('_subject', 'New portfolio contact from Santtun Ray'); data.append('_captcha', 'false'); try { const response = await fetch('https://formsubmit.co/ajax/santtunray@gmail.com', { method: 'POST', body: data, headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error(); form.reset(); setStatus('sent') } catch { setStatus('error') } }

  return <div className="theme-shell min-h-screen overflow-x-hidden selection:bg-violet-500/40">
    <motion.div className="progress" style={{ scaleX: progress }} />
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>

    <header className="nav-wrap">
      <nav className="nav glass">
        <button className="brand" onClick={() => go('home')}><span>SR</span><b>Santtun Ray</b></button>
        <div className="nav-links">{nav.map(n => <button key={n.id} className="nav-link" onClick={() => go(n.id)}>{n.label}</button>)}</div>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="theme" onClick={() => setDark(v => !v)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>
          <label className="language-picker" title="Language"><Languages size={15}/><select aria-label="Language" value={language} onChange={e => setLanguage(e.target.value)}><option value="en">EN</option><option value="hi">हिं</option><option value="de">DE</option><option value="ja">日</option><option value="fr">FR</option><option value="es">ES</option></select></label>
          <button className="talk" onClick={() => go('contact')}>{t.nav[6]} <Send size={15}/></button>
          <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </nav>
      <AnimatePresence>{mobileOpen && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="mobile-nav glass">
        {nav.map(n => <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>)}
      </motion.div>}</AnimatePresence>
    </header>

    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <div className="status"><i/> {t.status}</div>
          <p className="eyebrow">{t.role}</p>
          <h1>{t.title[0]} <span>{t.title[1]}</span><br className="desktop"/> {t.title[2]}</h1>
          <p className="hero-text">{t.hero}</p>
          <div className="hero-buttons"><button className="primary" onClick={() => go('projects')}>{t.projects} <ArrowRight size={18}/></button><a className="secondary" href={resume} download>{t.resume} <Download size={17}/></a></div>
          <div className="socials"><span>{t.connect}</span><a href="https://github.com/santtun1" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://x.com/santtunray" target="_blank" rel="noreferrer" aria-label="X"><Twitter/></a><a href="https://www.linkedin.com/in/santtun-ray-9bb121289" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:santtunray@gmail.com" aria-label="Email"><Mail/></a></div>
        </div>
        <div className="hero-visual"><div className="visual-label"><span>AI / FULL-STACK</span><span>01</span></div><Canvas camera={{ position:[0,0,5.5], fov:48 }}><Suspense fallback={null}><GlowScene/></Suspense></Canvas><div className="orb-copy"><Code2 size={18}/><span>{t.build}</span></div></div>
        <button className="scroll-cue" onClick={() => go('about')}><span>{t.scroll}</span><ArrowDown size={16}/></button>
      </section>

      <section id="about" className="section section-shell">
        <SectionTitle kicker="01 / ABOUT" title="Clarity first. Systems second. Polish always." text="I turn complex ideas into clean, scalable and useful software."/>
        <div className="about-grid">
          <div className="glass panel about-main"><div className="panel-icon"><Terminal/></div><h3>Software Engineer with an AI mindset.</h3><p>Computer Science graduate and Software Engineer with hands-on experience building and deploying full-stack web applications and AI-powered systems.</p><p>I work across frontend, backend, databases and cloud services, with a strong foundation in DSA, OOP, REST API design and SDLC.</p><div className="mini-stats"><Stat n="3+" label="Production apps"/><Stat n="300+" label="Users served"/><Stat n="20%" label="Faster delivery"/><Stat n="9.34" label="CGPA / 10"/></div></div>
          <div className="glass panel about-code"><div className="code-head"><span/> <span/> <span/><b>developer.js</b></div><pre>{`const developer = {\n  name: "Santtun Ray",\n  role: "Software Engineer",\n  focus: ["Full-Stack", "AI/ML", "Backend"],\n  stack: ["Java", "React", "Node.js"],\n  mindset: "Build useful things."\n}`}</pre><div className="location"><MapPin size={16}/> Bhubaneswar, Odisha, India</div></div>
        </div>
      </section>

      <section id="skills" className="section section-shell">
        <SectionTitle kicker="02 / TOOLKIT" title="Technologies I use to turn ideas into products." text="A practical stack spanning product UI, APIs, data, cloud and AI."/>
        <div className="skills-grid">{Object.entries(skills).map(([name, data], i) => { const Icon=data.icon; return <motion.div whileHover={{y:-5}} className="glass skill-card" key={name}><div className="skill-top"><div className="skill-icon"><Icon size={19}/></div><span>0{i+1}</span></div><h3>{name}</h3><div className="pills">{data.items.map(x => <span key={x}>{x}</span>)}</div></motion.div> })}</div>
      </section>

      <section id="experience" className="section section-shell">
        <SectionTitle kicker="03 / EXPERIENCE" title="Experience that compounds through shipping." text="Hands-on delivery, collaboration and measurable outcomes."/>
        <div className="timeline">{experiences.map((x,i)=><motion.article initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="timeline-item" key={i}><div className="timeline-node"/><div className="timeline-card glass"><div className="timeline-meta"><span>{x.date}</span><span><MapPin size={14}/>{x.location}</span></div><h3>{x.role}</h3><h4>{x.company}</h4><ul>{x.bullets.map(b=><li key={b}>{b}</li>)}</ul><div className="pills">{x.tech.map(t=><span key={t}>{t}</span>)}</div></div></motion.article>)}</div>
      </section>

      <section id="projects" className="section section-shell">
        <div className="section-heading-row"><SectionTitle kicker="04 / SELECTED WORK" title="Projects built around real problems." text="Open a project to inspect the thinking behind the implementation."/><button className="outline-btn" onClick={() => go('contact')}>Let's build <ArrowRight size={16}/></button></div>
        <div className="projects-grid">{projects.map(p=><motion.article key={p.no} whileHover={{y:-8}} className="project-card glass" onClick={() => setActiveProject(p)}><div className="project-art"><div className="grid-art"/><div className="project-number">{p.no}</div><div className="floating-cube"><Layers3/></div><span className="project-type">{p.type}</span></div><div className="project-body"><div className="tag">{p.tag}</div><h3>{p.title}</h3><p>{p.description}</p><div className="pills">{p.tech.slice(0,5).map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><span>{language === 'en' ? 'View details' : t.projects} <ArrowRight size={15}/></span><a href={p.github} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}><Github size={16}/></a></div></div></motion.article>)}</div>
      </section>

      <section id="achievements" className="section section-shell">
        <SectionTitle kicker="05 / ACHIEVEMENTS" title="Proof of execution." text="Recognition earned through building, competing and shipping."/>
        <div className="achievement-grid">{achievements.map(([label,title,desc,Icon])=><motion.div whileHover={{y:-5}} className="glass achievement" key={title}><div className="achievement-icon"><Icon size={21}/></div><span>{label}</span><h3>{title}</h3><p>{desc}</p></motion.div>)}</div>
      </section>

      <section id="resume" className="section section-shell resume-section"><div className="glass resume-card"><div><p className="eyebrow">06 / RESUME</p><h2>Ready for the next build.</h2><p>Software Engineer · Full-Stack · AI/ML · Backend</p></div><div className="resume-actions"><a className="primary" href={resume} target="_blank" rel="noreferrer">View Resume <ExternalLink size={17}/></a><a className="secondary" href={resume} download>Download PDF <Download size={17}/></a></div></div></section>

      <section id="contact" className="section section-shell contact-section">
        <div className="contact-copy"><SectionTitle kicker="07 / CONTACT" title="Let's build something meaningful." text="Have a project idea, role or collaboration in mind? Send a message and I’ll get back to you."/><div className="contact-list"><a href="mailto:santtunray@gmail.com"><Mail/><span><b>Email</b>santtunray@gmail.com</span></a><a href="tel:+917205616649"><Phone/><span><b>Phone</b>+91 72056 16649</span></a><div><MapPin/><span><b>Location</b>Bhubaneswar, Odisha, India</span></div></div></div>
        <form className="glass contact-form" onSubmit={submit}><h3>Get in touch</h3><p>Fill out the form and I'll get back to you.</p><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" required type="email" placeholder="you@example.com"/></label><label>Message<textarea name="message" required rows="5" placeholder="Tell me about your project..."/></label><button className="primary full" disabled={status==='loading'}>{status==='loading' ? 'Sending...' : status==='sent' ? <><Check size={17}/> Message sent</> : <>Send Message <Send size={17}/></>}</button>{status==='sent' && <small className="success">Thanks! Your message was sent to santtunray@gmail.com</small>}{status==='error' && <small className="form-error">Could not send your message. Please try again.</small>}</form>
      </section>
    </main>

    <footer className="footer section-shell"><div className="brand"><span>SR</span><b>Santtun Ray</b></div><p>© {new Date().getFullYear()} Santtun Ray. Built with React, Tailwind CSS &amp; curiosity.</p><div className="footer-links"><a href="https://github.com/santtun1" target="_blank" rel="noreferrer">GitHub</a><a href="https://x.com/santtunray" target="_blank" rel="noreferrer">X / Twitter</a><a href="https://www.linkedin.com/in/santtun-ray-9bb121289" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:santtunray@gmail.com">Email</a></div></footer>

    <AnimatePresence>{activeProject && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&setActiveProject(null)}><motion.div initial={{opacity:0,y:30,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:30,scale:.98}} className="project-modal glass"><button className="close-modal" onClick={()=>setActiveProject(null)}><X/></button><div className="modal-top"><span className="tag">{activeProject.tag}</span><span>{activeProject.no}</span></div><h2>{activeProject.title}</h2><p className="modal-lead">{activeProject.description}</p><div className="modal-grid"><Info title="Problem" text={activeProject.problem}/><Info title="Solution" text={activeProject.solution}/><Info title="Architecture" text={activeProject.architecture}/><Info title="Challenges" text={activeProject.challenges}/><Info title="Results" text={activeProject.results}/></div><div className="modal-tech"><b>Technologies</b><div className="pills">{activeProject.tech.map(t=><span key={t}>{t}</span>)}</div></div><div className="modal-actions"><a className="primary" href={activeProject.github} target="_blank" rel="noreferrer">GitHub <Github size={16}/></a><a className="secondary" href={activeProject.live}>Live Demo <ExternalLink size={16}/></a></div></motion.div></motion.div>}</AnimatePresence>
  </div>
}

function SectionTitle({kicker,title,text}) { return <div className="section-title"><p className="eyebrow">{kicker}</p><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function Stat({n,label}) { return <div><b>{n}</b><span>{label}</span></div> }
function Info({title,text}) { return <div className="info"><h4>{title}</h4><p>{text}</p></div> }

createRoot(document.getElementById('root')).render(<App />)
