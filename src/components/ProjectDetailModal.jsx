import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectGalleryGrid from './ProjectGalleryGrid';
import './ProjectDetailModal.css';

export default function ProjectDetailModal({ project, projects, onClose, onSelectProject }) {
  const containerRef = useRef(null);

  // Lock body & html scroll when modal is active
  useEffect(() => {
    if (!project) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Keyboard ESC to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Scroll to top whenever project changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project?.id]);

  if (!project) return null;

  // Calculate Next Project for cyclic navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextIndex];

  const handleBackToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="full-case-study-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        ref={containerRef}
        data-lenis-prevent="true"
      >
        <div className="case-study-blueprint-bg blueprint-grid">
          {/* ================= STICKY TOPBAR ================= */}
          <header className="case-study-sticky-bar">
            <div className="case-study-bar-content">
              <div className="case-study-topbar-center">
                <span className="topbar-project-num">{project.number || `0${currentIndex + 1} -`}</span>
                <span className={`tag-category ${project.tagClass || 'tag-ml'}`}>
                  {project.category || project.tag}
                </span>
              </div>

              <button
                type="button"
                className="case-study-close-btn"
                onClick={onClose}
                aria-label="Close Case Study"
              >
                ✕
              </button>
            </div>
          </header>

          {/* ================= MAIN CASE STUDY CONTENT CONTAINER ================= */}
          <main className="case-study-main-container">
            {/* 1. HERO CASE STUDY */}
            <section className="case-study-hero">
              <div className="hero-meta-row">
                <span className="hero-project-number">{project.number || `0${currentIndex + 1} -`}</span>
                <span className={`tag-category ${project.tagClass || 'tag-ml'}`}>
                  {project.tag || project.category}
                </span>
                {project.role && (
                  <span className="hero-role-badge">
                    <span className="role-dot" /> {project.role}
                  </span>
                )}
              </div>

              <h1 className="case-study-main-title">{project.title}</h1>

              <p className="case-study-lead-summary">
                {project.leadDescription || project.summary}
              </p>
            </section>

            {/* 2. KEY EMPIRICAL METRICS */}
            {project.metrics && project.metrics.length > 0 && (
              <section className="case-study-metrics-section">
                <div className="metrics-section-header">
                  <span className="metrics-section-tag">EMPIRICAL PERFORMANCE METRICS</span>
                  <h3 className="metrics-section-heading">Quantitative Milestones &amp; Validations</h3>
                </div>

                <div className="metrics-cards-grid">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="metric-stat-card">
                      <div className="metric-card-inner">
                        <span className="metric-index-num">0{idx + 1}</span>
                        <div className="metric-value-display">{metric.value}</div>
                        <div className="metric-label-title">{metric.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. PROJECT MEDIA & ARCHITECTURE SHOWCASE */}
            <ProjectGalleryGrid gallery={project.gallery} projectTitle={project.title} />

            {/* 4. METHODOLOGY & KEY HIGHLIGHTS */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="case-study-methodology-section">
                <div className="section-label-header">
                  <span className="section-tag-mono">ENGINEERING SCOPE &amp; METHODOLOGY</span>
                  <h3 className="section-block-title">Key Technical Achievements</h3>
                </div>

                <div className="highlights-ordered-list">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item-card">
                      <div className="highlight-index-box">
                        <span className="highlight-checkmark">✓</span>
                        <span className="highlight-step-number">0{idx + 1}</span>
                      </div>
                      <div className="highlight-text-content">
                        <p className="highlight-body-text">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. HARDWARE BILL OF MATERIALS (BOM) TABLE (Conditional for Hardware/IoT) */}
            {project.hardwareBOM && (
              <section className="case-study-bom-section">
                <div className="bom-header-wrapper">
                  <div>
                    <span className="section-tag-mono">BILL OF MATERIALS (BOM)</span>
                    <h3 className="section-block-title">Hardware Architecture &amp; Component Sourcing</h3>
                    <p className="bom-subtitle">
                      Comprehensive expenditure audit and technical component specification breakdown.
                    </p>
                  </div>
                  <div className="bom-budget-badge">
                    <span className="budget-tag-lbl">Total Budget Allocation:</span>
                    <span className="budget-tag-val">{project.hardwareBOM.budget}</span>
                  </div>
                </div>

                <div className="bom-table-wrapper">
                  <table className="bom-data-table">
                    <thead>
                      <tr>
                        <th className="th-idx">#</th>
                        <th className="th-name">Hardware / Component Specification</th>
                        <th className="th-cost">Procurement Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.hardwareBOM.items.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                          <td className="td-idx">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</td>
                          <td className="td-name">
                            <span className="component-name-text">{item.name}</span>
                          </td>
                          <td className="td-cost">
                            <span className="cost-pill-badge">{item.cost}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2" className="tf-total-label">Verified Total Sourced Expenditure:</td>
                        <td className="tf-total-val">{project.hardwareBOM.budget}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            )}

            {/* 6. TECHNOLOGIES & TOOLS USED */}
            {project.stack && project.stack.length > 0 && (
              <section className="case-study-tech-section">
                <div className="section-label-header">
                  <span className="section-tag-mono">SYSTEM STACK &amp; METHODOLOGIES</span>
                  <h3 className="section-block-title">Technologies &amp; Libraries Deployed</h3>
                </div>

                <div className="tech-pills-cloud">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="tech-blueprint-pill">
                      <span className="tech-pill-dot" />
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* ================= BOTTOM NAVIGATION ================= */}
            <footer className="case-study-bottom-nav">
              <button
                type="button"
                className="bottom-nav-btn btn-back-top"
                onClick={handleBackToTop}
              >
                <span>↑</span>
                <span>Back to Top</span>
              </button>

              {nextProject && (
                <button
                  type="button"
                  className="bottom-nav-btn btn-next-project"
                  onClick={() => onSelectProject(nextProject)}
                >
                  <div className="next-project-meta">
                    <span className="next-project-hint">Next Case Study</span>
                    <span className="next-project-title">{nextProject.title}</span>
                  </div>
                  <span className="next-arrow">→</span>
                </button>
              )}
            </footer>
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
