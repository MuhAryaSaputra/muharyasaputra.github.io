import smartAppImg1 from '../assets/SmartApp/IMG_4419.JPG';
import smartAppImg2 from '../assets/SmartApp/IMG_4448.JPG';
import smartAppImg3 from '../assets/SmartApp/IMG_4459.JPG';
import smartAppImg4 from '../assets/SmartApp/IMG_4483.JPG';

export const projectsData = [
  {
    id: 'churn-prediction',
    number: '01 -',
    title: 'E-Commerce Customer Churn Prediction',
    category: 'MACHINE LEARNING',
    tag: 'MACHINE LEARNING',
    tagClass: 'tag-ml',
    role: 'Lead ML Engineer & Data Architect',
    summary: 'End-to-end predictive machine learning pipeline designed to detect churn patterns with high accuracy across 50,000 customer records, empowering retention marketing strategies through Explainable AI (SHAP).',
    leadDescription: 'Developed an end-to-end predictive machine learning pipeline designed to detect churn patterns with high accuracy. Formulated comprehensive data cleansing, feature engineering, and ensemble modeling (XGBoost, LightGBM, Random Forest) to empower retention marketing strategies and reduce customer attrition loss.',
    highlights: [
      'Built and benchmarked Machine Learning models (Random Forest, XGBoost, Decision Tree, Logistic Regression) using a 50,000 e-commerce customer dataset.',
      'Handled severe class imbalance by exclusively applying SMOTE (Synthetic Minority Over-sampling Technique) to the training fold, rigorously preventing data leakage during validation.',
      'Attained 91.4% AUC-ROC score, 90.34% testing accuracy, and 0.828 macro F1-score with optimized hyperparameter tuning.',
      'Implemented Explainable AI (XAI) using SHAP values to extract global and local feature importance, discovering "Customer Service Calls", "Lifetime Value", and "Cart Abandonment Rate" as primary turnover predictors.',
      'Engineered automated cohort scoring pipelines, projected to reduce customer attrition loss by 14% through targeted retention campaigns.'
    ],
    metrics: [
      { label: 'Testing Accuracy', value: '90.34%' },
      { label: 'F1-Score (Macro)', value: '0.828' },
      { label: 'ROC-AUC Score', value: '0.923' },
      { label: 'Cohort Dataset', value: '50,000 Rows' }
    ],
    stack: ['Python', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'SMOTE', 'SHAP (XAI)', 'Pandas', 'FastAPI', 'Streamlit'],
    visualType: 'churn-metrics',
    gallery: [
      {
        id: 'p1-g1',
        title: 'Receiver Operating Characteristic (ROC-AUC = 0.923)',
        caption: 'ROC curve validating exceptional true positive rate and high discriminatory power on minority churn class.',
        tag: 'ROC / AUC ANALYSIS',
        type: 'roc-curve'
      },
      {
        id: 'p1-g2',
        title: 'SHAP Explainable AI Feature Importance',
        caption: 'SHAP value summary highlighting Customer Service Inquiries and LTV as primary churn triggers.',
        tag: 'EXPLAINABLE AI',
        type: 'shap-summary'
      },
      {
        id: 'p1-g3',
        title: 'SMOTE Class Resampling Distribution',
        caption: 'Synthetic oversampling applied strictly to training fold to eliminate majority class bias without leakage.',
        tag: 'DATA PREPROCESSING',
        type: 'smote-dist'
      },
      {
        id: 'p1-g4',
        title: 'Confusion Matrix & Precision-Recall Breakdown',
        caption: 'Performance matrix detailing 90.34% accuracy and minimal false negative churn predictions.',
        tag: 'PERFORMANCE MATRIX',
        type: 'conf-matrix'
      }
    ]
  },
  {
    id: 'smartsawit',
    number: '02 -',
    title: 'SmartSawit AI & IoT Dashboard',
    category: 'ARTIFICIAL INTELLIGENCE & IOT',
    tag: 'ARTIFICIAL INTELLIGENCE & IOT',
    tagClass: 'tag-iot',
    role: 'Full-Stack IoT & AI System Developer',
    summary: 'Centralized real-time smart agriculture telemetry monitoring interface and AI precision irrigation controller for oil palm plantations, consolidating ESP32 hardware sensors with predictive yield analytics.',
    leadDescription: 'Engineered a centralized real-time smart agriculture telemetry monitoring interface. Consolidated hardware IoT sensor streams with predictive yield modeling and automated alert triggers to maximize plantation harvesting efficiency and prevent water/fertilizer waste.',
    highlights: [
      'Developed a real-time digital monitoring web dashboard utilizing Internet of Things (IoT) hardware (ESP32, DHT11, and Soil Hygrometer sensors) tracking plantation microclimate metrics.',
      'Implemented low-latency MQTT and HTTP telemetry streaming processing over 100 sensor data points per minute.',
      'Integrated an AI-driven assistant within the platform to evaluate environmental soil conditions and automate dual-channel relay pump actuation.',
      'Designed resilient offline sync caching and local LCD1602 telemetry feedback for low-connectivity agricultural field stations.',
      'Optimized resource efficiency, targeting a 5-10% reduction in water and fertilizer expenditure while enhancing Fresh Fruit Bunch (TBS) yields.'
    ],
    metrics: [
      { label: 'Target Resource Savings', value: '5 - 10%' },
      { label: 'Telemetry Latency', value: '< 500ms' },
      { label: 'Sensors Sample Rate', value: '100+ / Min' },
      { label: 'Hardware Budget', value: 'Rp600.000' }
    ],
    hardwareBOM: {
      budget: 'Rp600.000',
      items: [
        { name: 'ESP32 Dual-Core Microcontroller NodeMCU', cost: 'Rp75.800' },
        { name: 'DHT11 Temperature & Relative Humidity Sensor Module', cost: 'Rp10.900' },
        { name: 'Soil Hygrometer Moisture Probe & Sensor Module', cost: 'Rp11.910' },
        { name: '5V Optocoupler Dual-Channel Relay Module', cost: 'Rp16.900' },
        { name: 'Solderless Breadboard & Male-to-Female Jumper Pack', cost: 'Rp44.200' },
        { name: '4mm & 8mm Flexible Irrigation Tubing', cost: 'Rp5.400' },
        { name: 'LCD1602 Display with I2C Serial Backpack', cost: 'Rp32.200' },
        { name: 'Elaeis Guineensis Palm Seedlings Sample Pack (x9)', cost: 'Rp78.500' },
        { name: 'Heavy-Duty Water Reservoir Container', cost: 'Rp120.000' },
        { name: 'Structural Adhesives, Thermal Glue & Waterproof Tape', cost: 'Rp27.000' },
        { name: 'Field Testing Logistics & SMB Deployment Transport', cost: 'Rp40.000' },
        { name: 'App Expedited Component Shipping & Packaging Fees', cost: 'Rp3.206' }
      ]
    },
    stack: ['ESP32', 'C++ / Arduino', 'DHT11 Sensor', 'Soil Hygrometer', 'Python', 'FastAPI', 'React', 'MQTT Telemetry', 'Docker'],
    visualType: 'iot-schematic',
    gallery: [
      {
        id: 'p2-g1',
        title: 'Hardware Circuit & Sensor Assembly',
        caption: 'Assembly and pinout wiring configuration of the ESP32 microcontroller, 5V dual-channel relay module, DHT11 sensor, and soil hygrometer probe.',
        tag: 'ASSEMBLY DOCUMENTATION',
        type: 'image',
        imageSrc: smartAppImg1
      },
      {
        id: 'p2-g2',
        title: 'Field Calibration & Sensor Diagnostics',
        caption: 'Real-time empirical testing and multi-point calibration of soil moisture telemetry readings and automated relay pump actuation triggers.',
        tag: 'CALIBRATION & TESTING',
        type: 'image',
        imageSrc: smartAppImg2
      },
      {
        id: 'p2-g3',
        title: 'Irrigation Piping & Hydraulic Integration',
        caption: 'Installation and pressure routing of 4mm and 8mm precision irrigation tubing across the oil palm seedling nursery prototype container.',
        tag: 'PROTOTYPE INTEGRATION',
        type: 'image',
        imageSrc: smartAppImg3
      },
      {
        id: 'p2-g4',
        title: 'Full SmartSawit System Deployment',
        caption: 'Comprehensive field demonstration of the integrated smart telemetry monitoring system powered by ESP32 edge processing and real-time AI assistant feedback.',
        tag: 'SYSTEM DEPLOYMENT',
        type: 'image',
        imageSrc: smartAppImg4
      }
    ]
  },
  {
    id: 'samesphere',
    number: '03 -',
    title: 'SameSphere Platform',
    category: 'WEB DEVELOPMENT',
    tag: 'WEB DEVELOPMENT',
    tagClass: 'tag-web',
    role: 'Fullstack Lead & Technical PM',
    summary: 'High-performance team collaboration platform connecting cross-functional product squads with real-time sprint workflows, task Kanban boards, and sub-100ms microservice responses.',
    leadDescription: 'Architected and implemented a high-performance collaboration platform connecting cross-functional project teams. Featuring real-time task workflows, sprint backlogs, automated status tracking, and technical documentation management with sub-100ms API response latency.',
    highlights: [
      'Constructed scalable microservices architecture delivering sub-100ms API response times across high-concurrency workloads.',
      'Engineered interactive Kanban sprint boards with optimistic UI updates and real-time state synchronization.',
      'Facilitated agile rituals (daily standups, sprint planning, milestone retrospectives) for distributed engineering teams.',
      'Integrated role-based access control (RBAC), activity audit trails, and automated GitHub sprint deployment webhooks.',
      'Maintained 92.5% unit and integration test coverage across frontend components and RESTful microservices.'
    ],
    metrics: [
      { label: 'API Response Latency', value: '< 100ms' },
      { label: 'Sprint Velocity Gain', value: '+28%' },
      { label: 'Automated Test Coverage', value: '92.5%' },
      { label: 'Architecture', value: 'Microservices' }
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST API', 'Node.js', 'Redis'],
    visualType: 'software-architecture',
    gallery: [
      {
        id: 'p3-g1',
        title: 'Distributed Microservices Architecture',
        caption: 'Service mesh diagram demonstrating decoupled client interface, API gateway, cache tier, and relational store.',
        tag: 'SYSTEM ARCHITECTURE',
        type: 'system-arch'
      },
      {
        id: 'p3-g2',
        title: 'Agile Kanban & Sprint Workflow Pipeline',
        caption: 'Real-time lifecycle states from Sprint Backlog, In Progress, Review to Production Release.',
        tag: 'SPRINT LIFECYCLE',
        type: 'kanban-flow'
      },
      {
        id: 'p3-g3',
        title: 'API Performance & Response Distribution',
        caption: 'Telemetry latency curve confirming p95 latency under 94ms across 1,000 simulated team requests.',
        tag: 'API LATENCY',
        type: 'api-telemetry'
      },
      {
        id: 'p3-g4',
        title: 'Role-Based Access & Security Topology',
        caption: 'Security architecture protecting sprint artifacts with scoped JWT tokens and RBAC middleware.',
        tag: 'SECURITY & RBAC',
        type: 'rbac-topology'
      }
    ]
  },
  {
    id: 'ai-literacy-research',
    number: '04 -',
    title: 'The Impact of AI Literacy on Academic Integrity and Digital Trust',
    category: 'RESEARCH',
    tag: 'RESEARCH',
    tagClass: 'tag-research',
    role: 'Lead Academic Researcher & Author',
    summary: 'Empirical research study evaluating the influence of generative AI literacy on academic performance, ethical considerations, and digital trust dynamics in higher education institutions.',
    leadDescription: 'Authored an empirical research study evaluating the influence of generative AI literacy on academic performance, ethical considerations, and digital trust dynamics in higher education institutions. Surveyed 213 university undergraduates and analyzed data through structural equation modeling.',
    highlights: [
      'Co-authored a quantitative correlational study involving 213 university undergraduates in Bekasi City supporting UN SDG 4 (Quality Education).',
      'Coordinated the proposal drafting process and conducted an extensive literature review to establish the conceptual framework of AI literacy.',
      'Analyzed survey data using IBM SPSS, demonstrating that AI literacy is a powerful positive predictor of both academic integrity (R² = 0.842) and digital trust (R² = 0.843).',
      'Extracted standardized regression weights (β = 0.918 & β = 0.919, p < 0.001), showing ethical literacy prevents academic misconduct.',
      'Published actionable institutional policy recommendations for academic curriculum designers and ethics oversight committees.'
    ],
    metrics: [
      { label: 'Academic Integrity Predictor', value: 'R² = 0.842' },
      { label: 'Digital Trust Predictor', value: 'R² = 0.843' },
      { label: 'Surveyed Sample (N)', value: '213 Students' },
      { label: 'Global Initiative', value: 'UN SDG 4' }
    ],
    stack: ['IBM SPSS', 'Structural Equation Modeling (SEM)', 'Multivariate Regression', 'Survey Methodology', 'Hypothesis Testing', 'Python'],
    visualType: 'research-sem',
    gallery: [
      {
        id: 'p4-g1',
        title: 'SEM Structural Path Model Diagram',
        caption: 'Structural Equation Model showing standardized regression weights (β=0.918 & β=0.919, p<0.001).',
        tag: 'STATISTICAL MODEL',
        type: 'sem-model'
      },
      {
        id: 'p4-g2',
        title: 'Regression Variance Analysis (R² = 0.843)',
        caption: 'Explained variance breakdown across Academic Integrity and Digital Trust constructs.',
        tag: 'SPSS REGRESSION',
        type: 'spss-variance'
      },
      {
        id: 'p4-g3',
        title: 'Demographic Cohort Distribution (N = 213)',
        caption: 'Sample distribution of university undergraduates across faculties in Bekasi City.',
        tag: 'SAMPLE DEMOGRAPHICS',
        type: 'sample-demographics'
      },
      {
        id: 'p4-g4',
        title: 'Conceptual Framework & UN SDG 4 Mapping',
        caption: 'Mapping generative AI literacy dimensions to ethical educational metrics under UN SDG 4.',
        tag: 'RESEARCH FRAMEWORK',
        type: 'research-framework'
      }
    ]
  }
];
