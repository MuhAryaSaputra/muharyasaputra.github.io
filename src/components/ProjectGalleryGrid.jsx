import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectGalleryGrid({ gallery, projectTitle }) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight' && activeLightboxIndex !== null) {
        const imageItems = gallery.filter((item) => item.type === 'image' && item.imageSrc);
        if (imageItems.length > 0) {
          const currentImageIndex = imageItems.findIndex((item) => item.id === gallery[activeLightboxIndex]?.id);
          const nextIndex = (currentImageIndex + 1) % imageItems.length;
          const nextGalleryIndex = gallery.findIndex((item) => item.id === imageItems[nextIndex].id);
          setActiveLightboxIndex(nextGalleryIndex);
        }
      } else if (e.key === 'ArrowLeft' && activeLightboxIndex !== null) {
        const imageItems = gallery.filter((item) => item.type === 'image' && item.imageSrc);
        if (imageItems.length > 0) {
          const currentImageIndex = imageItems.findIndex((item) => item.id === gallery[activeLightboxIndex]?.id);
          const prevIndex = (currentImageIndex - 1 + imageItems.length) % imageItems.length;
          const prevGalleryIndex = gallery.findIndex((item) => item.id === imageItems[prevIndex].id);
          setActiveLightboxIndex(prevGalleryIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, gallery]);

  if (!gallery || gallery.length === 0) return null;

  const isPhotoGallery = gallery.some((item) => item.type === 'image' && item.imageSrc);

  return (
    <div className="case-study-gallery-section">
      <div className="gallery-header">
        <span className="gallery-section-tag">
          {isPhotoGallery ? 'FIELD DOCUMENTATION & HARDWARE' : 'TECHNICAL ARCHITECTURE & EMPIRICAL CHARTS'}
        </span>
        <h3 className="gallery-section-title">
          {isPhotoGallery ? 'Visual Prototype & Assembly Showcase' : 'Empirical Analytics & Architecture Models'}
        </h3>
        <p className="gallery-section-subtitle">
          {isPhotoGallery
            ? 'Photographic records of the hardware assembly, sensor integration, and field deployment (Click any image to enlarge).'
            : 'Interactive structural vector models, algorithmic evaluations, and statistical telemetry.'}
        </p>
      </div>

      <div className={`gallery-grid ${isPhotoGallery ? 'photo-strip-grid' : 'diagram-grid'}`}>
        {gallery.map((item, index) => {
          const isPhoto = item.type === 'image' && item.imageSrc;

          return (
            <div
              key={item.id}
              className={`gallery-card ${isPhoto ? 'polaroid-card' : 'vector-diagram-card'}`}
              style={isPhoto ? { cursor: 'pointer' } : undefined}
              onClick={() => isPhoto && setActiveLightboxIndex(index)}
            >
              <div className="gallery-card-topbar">
                <span className="gallery-item-tag">{item.tag || `MODULE 0${index + 1}`}</span>
                {isPhoto ? (
                  <span className="gallery-expand-hint">⤢ Enlarge</span>
                ) : (
                  <span className="gallery-status-badge">SVG Vector</span>
                )}
              </div>

              {/* Visual Content */}
              <div className="gallery-visual-wrapper">
                {isPhoto ? (
                  <div className="photo-media-container">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="polaroid-photo"
                      loading="lazy"
                    />
                    <div className="photo-hover-overlay">
                      <span className="photo-zoom-icon">🔍 Click to inspect full image</span>
                    </div>
                  </div>
                ) : (
                  <DiagramRenderer type={item.type} />
                )}
              </div>

              {/* Caption & Title */}
              <div className="gallery-card-footer">
                <h4 className="gallery-item-title">{item.title}</h4>
                <p className="gallery-item-caption">{item.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pure Image Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && gallery[activeLightboxIndex] && (
          <motion.div
            className="pure-image-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveLightboxIndex(null)}
          >
            <motion.div
              className="lightbox-dialog"
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Controls Topbar */}
              <div className="lightbox-topbar">
                <div className="lightbox-info">
                  <span className="lightbox-project-tag">{projectTitle}</span>
                  <span className="lightbox-counter">
                    Photo {activeLightboxIndex + 1} of {gallery.length}
                  </span>
                </div>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close Lightbox"
                >
                  ✕ Close [ESC]
                </button>
              </div>

              {/* Full Image */}
              <div className="lightbox-image-container">
                <img
                  src={gallery[activeLightboxIndex].imageSrc}
                  alt={gallery[activeLightboxIndex].title}
                  className="lightbox-full-image"
                />
              </div>

              {/* Lightbox Caption Footer */}
              <div className="lightbox-footer">
                <h4 className="lightbox-caption-title">{gallery[activeLightboxIndex].title}</h4>
                <p className="lightbox-caption-text">{gallery[activeLightboxIndex].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * DiagramRenderer renders crisp, beautiful, technical architectural charts/diagrams
 * for machine learning, software systems, and empirical academic research.
 */
function DiagramRenderer({ type }) {
  switch (type) {
    case 'roc-curve':
      return (
        <div className="vector-chart-container">
          <svg viewBox="0 0 400 240" className="chart-svg">
            {/* Grid Lines */}
            <line x1="50" y1="30" x2="370" y2="30" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="50" y1="80" x2="370" y2="80" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="50" y1="130" x2="370" y2="130" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="50" y1="180" x2="370" y2="180" stroke="#e0e0e0" />
            <line x1="50" y1="30" x2="50" y2="180" stroke="#e0e0e0" />
            <line x1="130" y1="30" x2="130" y2="180" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="210" y1="30" x2="210" y2="180" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="290" y1="30" x2="290" y2="180" stroke="#f0f0f0" strokeDasharray="3 3" />
            <line x1="370" y1="30" x2="370" y2="180" stroke="#f0f0f0" strokeDasharray="3 3" />

            {/* Random Guess Line */}
            <line x1="50" y1="180" x2="370" y2="30" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />

            {/* AUC Fill Area */}
            <path
              d="M 50 180 Q 70 50, 160 40 T 370 30 L 370 180 Z"
              fill="rgba(0, 154, 220, 0.12)"
            />

            {/* Main ROC Curve */}
            <path
              d="M 50 180 Q 70 50, 160 40 T 370 30"
              fill="none"
              stroke="#009adc"
              strokeWidth="3"
            />

            {/* Optimal Operating Point */}
            <circle cx="110" cy="44" r="5" fill="#009adc" stroke="#ffffff" strokeWidth="2" />
            <rect x="125" y="38" width="135" height="26" rx="4" fill="#080808" />
            <text x="133" y="55" fill="#ffffff" fontSize="11" fontFamily="Space Mono, monospace">
              AUC = 0.923 (Optimal)
            </text>

            {/* Axis Labels */}
            <text x="50" y="202" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">0.0</text>
            <text x="200" y="202" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">0.5</text>
            <text x="360" y="202" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">1.0</text>
            <text x="155" y="222" fill="#475569" fontSize="11" fontFamily="Instrument Sans, sans-serif" fontWeight="600">
              False Positive Rate (1 - Specificity)
            </text>

            <text x="32" y="184" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">0.0</text>
            <text x="32" y="110" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">0.5</text>
            <text x="32" y="34" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">1.0</text>
          </svg>
        </div>
      );

    case 'shap-summary':
      return (
        <div className="shap-chart-container">
          <div className="shap-row">
            <span className="shap-label">Customer Service Calls</span>
            <div className="shap-bar-track">
              <div className="shap-bar-fill fill-high" style={{ width: '92%' }}>
                <span>+0.412</span>
              </div>
            </div>
          </div>
          <div className="shap-row">
            <span className="shap-label">Cart Abandonment Rate</span>
            <div className="shap-bar-track">
              <div className="shap-bar-fill fill-high" style={{ width: '78%' }}>
                <span>+0.324</span>
              </div>
            </div>
          </div>
          <div className="shap-row">
            <span className="shap-label">Customer Lifetime Value</span>
            <div className="shap-bar-track">
              <div className="shap-bar-fill fill-low" style={{ width: '64%' }}>
                <span>-0.285</span>
              </div>
            </div>
          </div>
          <div className="shap-row">
            <span className="shap-label">Account Tenure (Months)</span>
            <div className="shap-bar-track">
              <div className="shap-bar-fill fill-low" style={{ width: '51%' }}>
                <span>-0.198</span>
              </div>
            </div>
          </div>
          <div className="shap-row">
            <span className="shap-label">Promo Code Sensitivity</span>
            <div className="shap-bar-track">
              <div className="shap-bar-fill fill-neutral" style={{ width: '36%' }}>
                <span>+0.114</span>
              </div>
            </div>
          </div>
          <div className="shap-legend">
            <span className="legend-item"><span className="legend-dot dot-red" /> Increases Churn Risk</span>
            <span className="legend-item"><span className="legend-dot dot-blue" /> Promotes Retention</span>
          </div>
        </div>
      );

    case 'conf-matrix':
      return (
        <div className="matrix-chart-container">
          <div className="matrix-grid-2x2">
            <div className="matrix-cell cell-tn">
              <span className="matrix-tag">True Negative</span>
              <span className="matrix-val">37,840</span>
              <span className="matrix-pct">91.4% Correct Non-Churn</span>
            </div>
            <div className="matrix-cell cell-fp">
              <span className="matrix-tag">False Positive</span>
              <span className="matrix-val">3,560</span>
              <span className="matrix-pct">Type I Error (8.6%)</span>
            </div>
            <div className="matrix-cell cell-fn">
              <span className="matrix-tag">False Negative</span>
              <span className="matrix-val">1,270</span>
              <span className="matrix-pct">Type II Attrition (2.5%)</span>
            </div>
            <div className="matrix-cell cell-tp">
              <span className="matrix-tag">True Positive</span>
              <span className="matrix-val">7,330</span>
              <span className="matrix-pct">85.2% Correct Churn Captured</span>
            </div>
          </div>
        </div>
      );

    case 'smote-dist':
      return (
        <div className="smote-chart-container">
          <div className="smote-column">
            <span className="smote-heading">Raw Imbalanced Dataset</span>
            <div className="smote-dual-bars">
              <div className="smote-bar bar-majority" style={{ height: '140px' }}>
                <span>83.6% Majority (41.8k)</span>
              </div>
              <div className="smote-bar bar-minority" style={{ height: '32px' }}>
                <span>16.4% Churn (8.2k)</span>
              </div>
            </div>
          </div>
          <div className="smote-arrow">➔ SMOTE ➔</div>
          <div className="smote-column">
            <span className="smote-heading">Resampled Training Fold</span>
            <div className="smote-dual-bars">
              <div className="smote-bar bar-balanced-1" style={{ height: '120px' }}>
                <span>50% Non-Churn (41.8k)</span>
              </div>
              <div className="smote-bar bar-balanced-2" style={{ height: '120px' }}>
                <span>50% Synthetic (41.8k)</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'system-arch':
      return (
        <div className="arch-diagram-container">
          <div className="arch-flow-row">
            <div className="arch-node client-node">
              <span className="arch-icon">💻</span>
              <span className="arch-title">Client Layer</span>
              <span className="arch-desc">React 19 + TypeScript</span>
            </div>
            <span className="arch-connector">── REST / WS ──▶</span>
            <div className="arch-node gateway-node">
              <span className="arch-icon">⚡</span>
              <span className="arch-title">API Gateway</span>
              <span className="arch-desc">Reverse Proxy &amp; Auth</span>
            </div>
            <span className="arch-connector">── Sub-100ms ──▶</span>
            <div className="arch-node cluster-node">
              <span className="arch-icon">🗄️</span>
              <span className="arch-title">Storage &amp; Cache</span>
              <span className="arch-desc">PostgreSQL + Redis</span>
            </div>
          </div>
          <div className="arch-meta-badge">
            <span>● Microservices Architecture Benchmark: 99.98% Uptime &amp; Sub-100ms Latency</span>
          </div>
        </div>
      );

    case 'kanban-flow':
      return (
        <div className="kanban-preview-container">
          <div className="kanban-column col-backlog">
            <span className="kanban-col-header">Sprint Backlog (14)</span>
            <div className="kanban-mini-ticket">User Auth OAuth2</div>
            <div className="kanban-mini-ticket">Microservice Event Queue</div>
          </div>
          <div className="kanban-column col-progress">
            <span className="kanban-col-header">In Progress (6)</span>
            <div className="kanban-mini-ticket active">Sprint Retrospective UI</div>
            <div className="kanban-mini-ticket active">Redis Pipeline Cache</div>
          </div>
          <div className="kanban-column col-done">
            <span className="kanban-col-header">Done &amp; Deployed (38)</span>
            <div className="kanban-mini-ticket done">Docker Container Orchestration</div>
            <div className="kanban-mini-ticket done">API Telemetry Stream</div>
          </div>
        </div>
      );

    case 'api-telemetry':
      return (
        <div className="telemetry-chart-container">
          <svg viewBox="0 0 380 180" className="chart-svg">
            <path
              d="M 30 150 Q 80 145, 120 120 T 180 40 T 260 140 T 360 150"
              fill="rgba(16, 185, 129, 0.12)"
            />
            <path
              d="M 30 150 Q 80 145, 120 120 T 180 40 T 260 140 T 360 150"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            <line x1="180" y1="20" x2="180" y2="160" stroke="#10b981" strokeDasharray="3 3" />
            <circle cx="180" cy="40" r="5" fill="#10b981" />
            <text x="190" y="38" fill="#065f46" fontSize="11" fontFamily="Space Mono, monospace" fontWeight="bold">
              p95 = 88ms (Peak)
            </text>
            <text x="30" y="172" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">0ms</text>
            <text x="170" y="172" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">88ms</text>
            <text x="330" y="172" fill="#64748b" fontSize="10" fontFamily="Space Mono, monospace">200ms</text>
          </svg>
        </div>
      );

    case 'rbac-topology':
      return (
        <div className="rbac-grid-container">
          <div className="rbac-item">
            <span className="rbac-badge badge-admin">Lead / Admin</span>
            <span className="rbac-perms">Full Microservice Deployment, Schema Migrations, Sprint Planning</span>
          </div>
          <div className="rbac-item">
            <span className="rbac-badge badge-dev">Developer</span>
            <span className="rbac-perms">Task Lifecycle, PR Submissions, Unit Testing, Telemetry Metrics</span>
          </div>
          <div className="rbac-item">
            <span className="rbac-badge badge-viewer">Stakeholder / PM</span>
            <span className="rbac-perms">Gantt Roadmaps, Sprint Velocity Reports, Retrospective Logs</span>
          </div>
        </div>
      );

    case 'sem-model':
      return (
        <div className="sem-diagram-container">
          <svg viewBox="0 0 420 200" className="chart-svg">
            {/* Predictor */}
            <rect x="20" y="70" width="130" height="60" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
            <text x="85" y="96" textAnchor="middle" fill="#9a3412" fontSize="12" fontWeight="bold" fontFamily="Instrument Sans">
              AI Literacy
            </text>
            <text x="85" y="114" textAnchor="middle" fill="#c2410c" fontSize="10" fontFamily="Space Mono">
              (Predictor X)
            </text>

            {/* Arrows */}
            <path d="M 150 85 L 260 50" stroke="#080808" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 150 115 L 260 150" stroke="#080808" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Beta labels */}
            <rect x="175" y="48" width="80" height="22" rx="4" fill="#080808" />
            <text x="215" y="63" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Space Mono">
              β = 0.918***
            </text>

            <rect x="175" y="130" width="80" height="22" rx="4" fill="#080808" />
            <text x="215" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="Space Mono">
              β = 0.919***
            </text>

            {/* Dependent 1 */}
            <rect x="270" y="25" width="140" height="55" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
            <text x="340" y="48" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold" fontFamily="Instrument Sans">
              Academic Integrity
            </text>
            <text x="340" y="66" textAnchor="middle" fill="#047857" fontSize="10" fontFamily="Space Mono">
              R² = 0.842 (84.2%)
            </text>

            {/* Dependent 2 */}
            <rect x="270" y="120" width="140" height="55" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="340" y="143" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold" fontFamily="Instrument Sans">
              Digital Trust
            </text>
            <text x="340" y="161" textAnchor="middle" fill="#2563eb" fontSize="10" fontFamily="Space Mono">
              R² = 0.843 (84.3%)
            </text>

            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#080808" />
              </marker>
            </defs>
          </svg>
        </div>
      );

    case 'spss-variance':
      return (
        <div className="spss-table-container">
          <table className="spss-mini-table">
            <thead>
              <tr>
                <th>Model Criterion</th>
                <th>R Value</th>
                <th>R Square (R²)</th>
                <th>Adjusted R²</th>
                <th>Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Academic Integrity</td>
                <td>0.918</td>
                <td><strong>0.842</strong></td>
                <td>0.841</td>
                <td>p &lt; 0.001***</td>
              </tr>
              <tr>
                <td>Digital Trust</td>
                <td>0.919</td>
                <td><strong>0.843</strong></td>
                <td>0.842</td>
                <td>p &lt; 0.001***</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'sample-demographics':
      return (
        <div className="demographics-grid">
          <div className="demo-stat-box">
            <span className="demo-num">213</span>
            <span className="demo-lbl">Total Undergraduates</span>
          </div>
          <div className="demo-stat-box">
            <span className="demo-num">100%</span>
            <span className="demo-lbl">Valid Response Rate</span>
          </div>
          <div className="demo-stat-box">
            <span className="demo-num">Bekasi City</span>
            <span className="demo-lbl">Geographic Locus</span>
          </div>
          <div className="demo-stat-box">
            <span className="demo-num">SPSS 26</span>
            <span className="demo-lbl">Statistical Engine</span>
          </div>
        </div>
      );

    case 'research-framework':
      return (
        <div className="framework-container">
          <div className="framework-pillar">
            <span className="pillar-num">01</span>
            <span className="pillar-title">Cognitive &amp; Operational</span>
            <span className="pillar-desc">Prompt engineering &amp; LLM output synthesis literacy</span>
          </div>
          <div className="framework-pillar">
            <span className="pillar-num">02</span>
            <span className="pillar-title">Critical &amp; Verification</span>
            <span className="pillar-desc">Hallucination detection &amp; primary source auditing</span>
          </div>
          <div className="framework-pillar">
            <span className="pillar-num">03</span>
            <span className="pillar-title">Ethical &amp; Normative</span>
            <span className="pillar-desc">Academic citations, plagiarism prevention &amp; SDG 4 trust</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="default-diagram-fallback">
          <span>Technical Architecture Visualization</span>
        </div>
      );
  }
}
