import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react'
import heroImg from './assets/images/Hero-Img.png'
import { projectsData } from './data/projectsData'
import ProjectDetailModal from './components/ProjectDetailModal'
import './App.css'

function generateTypingSteps(target) {
  const steps = []

  function getCharDelay(char, prevChar) {
    let d = Math.floor(Math.random() * 9) + 12 // 12 - 20ms keystroke speed
    if (char === ' ') d += 10
    if (prevChar === '.' || prevChar === ',') d += 95
    return d
  }

  const prefix1 = 'Bridging strategic vision with te'
  if (target.startsWith(prefix1)) {
    // Phase 1: Up to typo 1
    for (let i = 1; i <= prefix1.length; i++) {
      steps.push({
        cur: prefix1.slice(0, i),
        rem: target.slice(i),
        delay: getCharDelay(prefix1[i - 1], i > 1 ? prefix1[i - 2] : '')
      })
    }

    // Typo 1: types "h" then "c" ("tehc")
    steps.push({ cur: prefix1 + 'h', rem: target.slice(prefix1.length), delay: 18 })
    steps.push({ cur: prefix1 + 'hc', rem: target.slice(prefix1.length), delay: 20 })
    // Recognition pause
    steps.push({ cur: prefix1 + 'hc', rem: target.slice(prefix1.length), delay: 130 })
    // Backspaces
    steps.push({ cur: prefix1 + 'h', rem: target.slice(prefix1.length), delay: 45 })
    steps.push({ cur: prefix1, rem: target.slice(prefix1.length), delay: 45 })
    // Brief hesitation before typing correctly
    steps.push({ cur: prefix1, rem: target.slice(prefix1.length), delay: 65 })

    // Phase 2: Up to typo 2 ("driving digitali")
    const part2Target = 'Bridging strategic vision with technical execution. driving digitali'
    for (let i = prefix1.length + 1; i <= part2Target.length; i++) {
      steps.push({
        cur: part2Target.slice(0, i),
        rem: target.slice(i),
        delay: getCharDelay(part2Target[i - 1], part2Target[i - 2])
      })
    }

    // Typo 2: types "s" ("digitalis")
    steps.push({ cur: part2Target + 's', rem: target.slice(part2Target.length), delay: 20 })
    // Recognition pause
    steps.push({ cur: part2Target + 's', rem: target.slice(part2Target.length), delay: 120 })
    // Backspace
    steps.push({ cur: part2Target, rem: target.slice(part2Target.length), delay: 45 })
    // Brief hesitation before typing "z"
    steps.push({ cur: part2Target, rem: target.slice(part2Target.length), delay: 60 })

    // Phase 3: Resume to end
    for (let i = part2Target.length + 1; i <= target.length; i++) {
      steps.push({
        cur: target.slice(0, i),
        rem: target.slice(i),
        delay: getCharDelay(target[i - 1], target[i - 2])
      })
    }
  } else {
    for (let i = 1; i <= target.length; i++) {
      steps.push({
        cur: target.slice(0, i),
        rem: target.slice(i),
        delay: getCharDelay(target[i - 1], i > 1 ? target[i - 2] : '')
      })
    }
  }

  return steps
}

function TypewriterSubheadline({ text }) {
  const [displayedText, setDisplayedText] = useState('')
  const [remainderText, setRemainderText] = useState(text)
  const [isDone, setIsDone] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const steps = generateTypingSteps(text)
    let timeoutId = null
    let stepIndex = 0

    const runStep = () => {
      if (stepIndex >= steps.length) {
        setIsDone(true)
        return
      }
      const { cur, rem, delay } = steps[stepIndex]
      setDisplayedText(cur)
      setRemainderText(rem)
      stepIndex++
      timeoutId = setTimeout(runStep, delay)
    }

    // Initial brief delay before typing starts when section is scrolled into view
    timeoutId = setTimeout(runStep, 150)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isInView, text])

  return (
    <p className="subheadline-text" ref={ref}>
      <span>{displayedText}</span>
      {!isDone && <span className="typewriter-cursor">|</span>}
      <span style={{ opacity: 0, userSelect: 'none', pointerEvents: 'none' }}>
        {remainderText}
      </span>
    </p>
  )
}

function CoreExpertiseSection() {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // 1-by-1 Sequential Unfolding:
  // Cards start stacked together neatly behind Card 1 in the center
  // Phase 1 (0.08 -> 0.42): Card 2 emerges from behind Card 1 to 155px
  // Pause   (0.42 -> 0.48): Brief rest
  // Phase 2 (0.48 -> 0.82): Card 3 emerges from behind Card 2 to 310px
  // Settled (0.82 -> 1.00): Fully opened & readable
  const card2TargetY = isMobile ? 134 : 155
  const card3TargetY = isMobile ? 286 : 310

  const card2InitialY = isMobile ? 6 : 8
  const card3InitialY = isMobile ? 12 : 16

  // Card 2 moves in Phase 1, then stays fixed
  const card2Y = useTransform(
    scrollYProgress,
    [0.08, 0.42, 1.0],
    [card2InitialY, card2TargetY, card2TargetY]
  )
  const card2Scale = useTransform(
    scrollYProgress,
    [0.08, 0.42, 1.0],
    [0.985, 1, 1]
  )

  // Card 3 travels with Card 2 in Phase 1, then slides down out of Card 2 in Phase 2
  const card3Y = useTransform(
    scrollYProgress,
    [0.08, 0.42, 0.48, 0.82, 1.0],
    [
      card3InitialY,
      card2TargetY + (isMobile ? 6 : 8),
      card2TargetY + (isMobile ? 6 : 8),
      card3TargetY,
      card3TargetY
    ]
  )
  const card3Scale = useTransform(
    scrollYProgress,
    [0.48, 0.82, 1.0],
    [0.97, 1, 1]
  )

  return (
    <section className="section core-expertise-section" id="expertise" ref={sectionRef}>
      <div className="expertise-sticky-wrapper">
        <div className="section-content">
          <h2 className="section-title">Core Expertise</h2>

          <div className="expertise-cards-stage">
            {/* Skill 1: Project Management (Top of stack) */}
            <motion.div className="expertise-card card-pm" style={{ zIndex: 3 }}>
              <h3 className="expertise-card-title">Project Management 📅</h3>
              <p className="expertise-card-desc">
                Agile Planning, Team Coordination, Technical Documentation, Communication.
              </p>
            </motion.div>

            {/* Skill 2: System Architecture (Slides out from behind Card 1) */}
            <motion.div
              className="expertise-card card-sys"
              style={{
                zIndex: 2,
                y: card2Y,
                scale: card2Scale,
              }}
            >
              <h3 className="expertise-card-title">System Architecture ⚙️</h3>
              <p className="expertise-card-desc">
                Workflow Design, UML Diagramming (Fishbone, Activity, State), ERD, Database Design.
              </p>
            </motion.div>

            {/* Skill 3: Artificial Intelligence (Slides out from behind Card 2) */}
            <motion.div
              className="expertise-card card-ai"
              style={{
                zIndex: 1,
                y: card3Y,
                scale: card3Scale,
              }}
            >
              <h3 className="expertise-card-title">Artificial Intelligence 🧠</h3>
              <p className="expertise-card-desc">
                Machine Learning, Deep Learning, Predictive Modeling, Data Processing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Navbar({ scrollToSection }) {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'expertise', 'selected-works', 'contact']
      const scrollPos = window.scrollY + 200

      let current = ''
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          current = sections[i]
          break
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Resume URL (Google Drive link to be updated)
  const RESUME_URL = '#'

  const navItems = [
    { id: 'about', label: 'ABOUT ME' },
    { id: 'expertise', label: 'CORE EXPERTISE' },
    { id: 'selected-works', label: 'SELECTED WORKS' },
    { id: 'contact', label: 'CONTACT' }
  ]

  const handleNavClick = (id) => {
    scrollToSection(id)
    setIsMenuOpen(false)
  }

  const handleResumeClick = (e) => {
    if (RESUME_URL === '#') {
      e.preventDefault()
      alert('Link resume Google Drive akan segera diupdate!')
    }
  }

  return (
    <nav className="minimal-navbar" aria-label="Main Navigation">
      <div className="minimal-navbar-inner">
        {/* Mobile Header Bar */}
        <div className="navbar-mobile-bar">
          <button
            type="button"
            className="navbar-mobile-brand"
            onClick={() => handleNavClick('hero')}
            aria-label="Back to top"
          >
            ARYA SAPUTRA
          </button>
          <button
            type="button"
            className={`navbar-hamburger-btn ${isMenuOpen ? 'is-active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="minimal-navbar-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                className={`minimal-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="navbar-active-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Resume Button on the rightmost */}
        <a
          href={RESUME_URL}
          target={RESUME_URL !== '#' ? '_blank' : undefined}
          rel={RESUME_URL !== '#' ? 'noopener noreferrer' : undefined}
          className="navbar-resume-btn"
          aria-label="View Resume"
          onClick={handleResumeClick}
        >
          <span>Resume</span>
          <span className="resume-icon">↗</span>
        </a>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="navbar-mobile-drawer-inner">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`minimal-mobile-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="nav-mobile-active-dot" />}
                  </button>
                )
              })}

              <a
                href={RESUME_URL}
                target={RESUME_URL !== '#' ? '_blank' : undefined}
                rel={RESUME_URL !== '#' ? 'noopener noreferrer' : undefined}
                className="navbar-resume-btn mobile-drawer-resume-btn"
                onClick={(e) => {
                  handleResumeClick(e)
                  setIsMenuOpen(false)
                }}
              >
                <span>Resume</span>
                <span className="resume-icon">↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default function App() {
  const [hoveredWorkId, setHoveredWorkId] = useState(null)
  const [isEmailHovered, setIsEmailHovered] = useState(false)
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false)
  const [hoveredPill, setHoveredPill] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCopyEmail = () => {
    const email = 'arya.saputra@example.com'
    navigator.clipboard.writeText(email)
    setToastMessage(`Email copied: ${email}`)
    setTimeout(() => setToastMessage(''), 3000)
    window.open(`mailto:${email}`, '_blank')
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="portfolio-container blueprint-grid">
      {/* ================= NAVBAR ================= */}
      <Navbar scrollToSection={scrollToSection} />

      {/* ================= HERO SECTION ================= */}
      <section className="section hero-section" id="hero">
        <div className="section-content">
          <motion.div
            className="hero-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-title-wrapper">
              <h1 className="hero-main-title">
                Hello, I'm Muhammad Arya Saputra <span className="wave-emoji">👋</span>
              </h1>
              <p className="hero-subtitle">
                Aspiring Project Manager &amp; AI Enthusiast
              </p>
            </div>

            <div className="photo-container">
              <div className="photo-card hero-tilt">
                <div className="photo-inner">
                  <img
                    src={heroImg}
                    alt="Muhammad Arya Saputra"
                    className="photo-image"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SUBHEADLINE SECTION ================= */}
      <section className="section subheadline-section" id="about">
        <div className="section-content">
          <TypewriterSubheadline
            text="Bridging strategic vision with technical execution. driving digitalization projects from concept to deployment trough agile planning, clear communication, and AI innovation."
          />

          <motion.div
            className="action-buttons-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div
              className="pill-btn-container"
              onMouseEnter={() => setHoveredPill('work')}
              onMouseLeave={() => setHoveredPill(null)}
            >
              <button
                type="button"
                className={`pill-button ${hoveredPill === 'work' ? 'hovered' : ''}`}
                onClick={() => scrollToSection('selected-works')}
              >
                View My Work
              </button>
              <AnimatePresence>
                {hoveredPill === 'work' && (
                  <motion.div
                    className="figma-hover-overlay pill-figma-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="corner-handle handle-top-left" />
                    <span className="corner-handle handle-top-right" />
                    <span className="corner-handle handle-bottom-left" />
                    <span className="corner-handle handle-bottom-right" />
                    <div className="figma-badge">View Work</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="pill-btn-container"
              onMouseEnter={() => setHoveredPill('collab')}
              onMouseLeave={() => setHoveredPill(null)}
            >
              <button
                type="button"
                className={`pill-button ${hoveredPill === 'collab' ? 'hovered' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                Let's COLLABORATE
              </button>
              <AnimatePresence>
                {hoveredPill === 'collab' && (
                  <motion.div
                    className="figma-hover-overlay pill-figma-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="corner-handle handle-top-left" />
                    <span className="corner-handle handle-top-right" />
                    <span className="corner-handle handle-bottom-left" />
                    <span className="corner-handle handle-bottom-right" />
                    <div className="figma-badge">Collaborate</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE EXPERTISE SECTION (UNFOLD ON SCROLL) ================= */}
      <CoreExpertiseSection />

      {/* ================= SELECTED WORKS SECTION ================= */}
      <section className="section selected-works-section" id="selected-works">
        <div className="section-content">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Works
          </motion.h2>

          <div className="works-list">
            {projectsData.map((work, index) => {
              const isHovered = hoveredWorkId === work.id

              return (
                <motion.div
                  key={work.id}
                  className="work-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => !isMobile && setHoveredWorkId(work.id)}
                  onMouseLeave={() => !isMobile && setHoveredWorkId(null)}
                  onClick={() => !isMobile && setSelectedProject(work)}
                >
                  <h3 className="work-item-title">{work.title}</h3>
                  <div className={`tag-category ${work.tagClass}`}>
                    {work.category}
                  </div>

                  {/* Mobile Action Button */}
                  <button
                    type="button"
                    className="mobile-view-detail-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProject(work)
                    }}
                  >
                    View Detail
                  </button>

                  {/* Figma-Cursor-Hovering Blueprint Inspection Overlay (Desktop) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="figma-inspect-overlay"
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.18 }}
                      >
                        <span className="corner-handle handle-top-left" />
                        <span className="corner-handle handle-top-right" />
                        <span className="corner-handle handle-bottom-left" />
                        <span className="corner-handle handle-bottom-right" />
                        <div className="figma-badge">View Work</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CTA SECTION ================= */}
      <section className="section footer-section" id="contact">
        <div className="section-content">
          <motion.div
            className="footer-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="footer-headline">let's build impactful systems.</h2>

            <div className="photo-container">
              <div className="photo-card footer-tilt">
                <div className="photo-inner">
                  <img
                    src={heroImg}
                    alt="Muhammad Arya Saputra"
                    className="photo-image"
                  />
                </div>
              </div>
            </div>

            {/* Massive Action Buttons */}
            <div className="massive-buttons-wrapper">
              <div
                className={`massive-btn-container email-btn-wrapper ${isEmailHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
              >
                <motion.button
                  type="button"
                  className={`btn-massive-email ${isEmailHovered ? 'hovered' : ''}`}
                  onClick={handleCopyEmail}
                  whileTap={{ scale: 0.96 }}
                >
                  Email
                </motion.button>

                {/* Figma Hover Overlay for Email Button */}
                <AnimatePresence>
                  {isEmailHovered && (
                    <motion.div
                      className="email-figma-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="corner-handle handle-top-left" />
                      <span className="corner-handle handle-top-right" />
                      <span className="corner-handle handle-bottom-left" />
                      <span className="corner-handle handle-bottom-right" />
                      <div className="figma-badge">Email Me</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className={`massive-btn-container linkedin-btn-wrapper ${isLinkedinHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setIsLinkedinHovered(true)}
                onMouseLeave={() => setIsLinkedinHovered(false)}
              >
                <motion.a
                  href="https://linkedin.com/in/muhammad-arya-saputra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-massive-linkedin ${isLinkedinHovered ? 'hovered' : ''}`}
                  whileTap={{ scale: 0.96 }}
                >
                  Linkedin
                </motion.a>

                {/* Figma Hover Overlay for LinkedIn Button */}
                <AnimatePresence>
                  {isLinkedinHovered && (
                    <motion.div
                      className="figma-hover-overlay linkedin-figma-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="corner-handle handle-top-left" />
                      <span className="corner-handle handle-top-right" />
                      <span className="corner-handle handle-bottom-left" />
                      <span className="corner-handle handle-bottom-right" />
                      <div className="figma-badge">LinkedIn</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="footer-credits">
              &copy; {new Date().getFullYear()} Muhammad Arya Saputra. Designed &amp; Engineered with Precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FULL-VIEWPORT CASE STUDY SHOWCASE MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            projects={projectsData}
            onClose={() => setSelectedProject(null)}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}
      </AnimatePresence>

      {/* ================= TOAST NOTIFICATION ================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            className="toast-notice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <span>📋</span> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
