// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Rithik Marian",
  handle: "rithik",
  title: "Full-Stack Developer | AI/ML Engineer",
  roles: [
    "builds logistics platforms at scale",
    "ships LLM & multi-agent apps",
    "designs microservices & SaaS",
    "turns messy data into products",
  ],
  tagline:
    "I build multi-tenant SaaS and AI-powered products, from freight management systems to BERT-based NLP models.",
  location: "Bengaluru, India",
  status: "Open to relocate | Available immediately",
  email: "marianrithik@gmail.com",
  phone: "+91 9886209003",
  github: "https://github.com/katashiiii",
  linkedin: "https://linkedin.com/in/rithikmarian1009",
};

export const stats = [
  { value: 50, suffix: "+", label: "Enterprise clients served" },
  { value: 10000, suffix: "+", label: "Transactions handled daily" },
  { value: 35, suffix: "%", label: "UX improvement shipped" },
  { value: 94, suffix: "%", label: "Fake-news model accuracy" },
];

export const experience = [
  {
    id: "bleu",
    company: "Bleu Iris Technologies Pvt Ltd",
    role: "Full-Stack Developer (AI Specialist)",
    period: "Jan 2025 - Present",
    place: "Bengaluru & Chennai",
    points: [
      "Architected a logistics software platform using microservices and a multi-tenant SaaS model, serving 50+ enterprise clients.",
      "Built React front-end modules across Air, Ocean, Road, Warehousing, Customs Clearance, Finance, HR, CRM and Customer Self-Service, improving user experience by 35%.",
      "Designed a Freight Management System with PostgreSQL and React, handling 10,000+ transactions daily.",
      "Developed Transport and Warehouse Management Systems with real-time tracking and automated workflow optimization.",
      "Engineered a Mini ERP for SMBs with integrated billing, inventory and financial modules.",
      "Integrated card-swiping machines through an Android app with embedded APIs for real-time transactions and cloud sync.",
      "Implemented AR/AP, General Ledger, Stock Integration, P&L, Balance Sheet and Cash Flow modules.",
      "Managed GCP infrastructure and CentOS servers, with CI/CD pipelines and GitHub-based version control.",
    ],
  },
  {
    id: "cognito",
    company: "Cognito Logix Technologies",
    role: "Android App Developer & AI Engineer",
    period: "May 2024 - Dec 2024",
    place: "Bengaluru",
    points: [
      "Redesigned critical UI flows, increasing average session duration by 15% and improving app stability by 40%.",
      "Integrated an intelligent push-notification system: +20% daily engagement and +10% retention over three months.",
      "Resolved 25+ bugs, including 5 critical security vulnerabilities, through structured testing and debugging.",
      "Developed AI-enhanced Android applications using the Android SDK.",
    ],
  },
];

export const projects = [
  {
    id: "logistics",
    title: "Enterprise Logistics Management Platform",
    blurb:
      "Freight, transport and warehouse management with real-time tracking and multi-tenant architecture.",
    tags: ["React", "Node.js", "PostgreSQL", "GCP", "Microservices"],
    metric: "50+ enterprise clients",
    links: { github: "", demo: "" },
    details: [
      "Modules for Air, Ocean, Road, Warehousing, Customs Clearance, Finance, HR, CRM and Customer Self-Service.",
      "Real-time tracking and automated workflows across freight, transport and warehouse operations.",
      "Multi-tenant SaaS model on a microservices architecture, deployed on GCP.",
      "Freight Management System handling 10,000+ transactions per day.",
    ],
  },
  {
    id: "erp",
    title: "Mini ERP for Small Businesses",
    blurb:
      "Billing, inventory, payments and full financial reporting, with card-swiping hardware integration.",
    tags: ["React", "Node.js", "PostgreSQL", "Android", "Payment APIs"],
    metric: "Billing to balance sheet",
    links: { github: "", demo: "" },
    details: [
      "Billing, inventory and payment processing in one product for SMBs.",
      "AR/AP, General Ledger, Stock Integration, P&L, Balance Sheet and Cash Flow analysis.",
      "Android app with embedded APIs connects card-swiping machines for real-time transactions.",
      "Cloud synchronization keeps terminals and back office in step.",
    ],
  },
  {
    id: "fakenews",
    title: "AI-Powered Fake News Detection",
    blurb:
      "A BERT-based NLP model that flags misleading information from unstructured text in real time.",
    tags: ["Python", "TensorFlow", "BERT", "NLP", "Flask"],
    metric: "94% accuracy",
    links: { github: "", demo: "" },
    details: [
      "BERT-based classifier for detecting misleading information.",
      "Data-processing pipeline that cleans and prepares unstructured text.",
      "Real-time prediction served through a Flask app.",
      "Reached 94% accuracy.",
    ],
  },
];

export const skills = {
  Languages: ["Python", "JavaScript", "Java", "Kotlin", "SQL", "HTML5", "CSS3"],
  Frontend: [
    "React.js",
    "Next.js",
    "React Query",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Responsive Design",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "Microservices",
    "FastAPI",
    "Pydantic",
    "Async Python",
  ],
  "AI / ML": [
    "LLM Applications",
    "Multi-Agent AI",
    "RAG",
    "NLP",
    "BERT",
    "TensorFlow",
    "PySpark",
    "Scikit-learn",
    "Pandas",
    "OpenCV",
  ],
  Databases: ["PostgreSQL", "MySQL", "RDBMS Concepts", "Data Modeling"],
  "Cloud & DevOps": ["GCP", "AWS", "Azure", "Docker", "CentOS", "CI/CD", "Git/GitHub"],
  Tools: [
    "shadcn/ui",
    "React Testing Library",
    "Android SDK",
    "Jira",
    "Confluence",
    "VS Code",
  ],
};

export const education = {
  degree: "B.E. in Computer Science (AI & ML Specialization)",
  school: "City Engineering College, Bengaluru",
  period: "2020 - 2024",
  certs: [
    "Android App Development - Naresh Information Technologies (2024)",
    "Java Full Stack Development - Besant Technologies (2024)",
  ],
};

// Testimonials: add real quotes (with permission). The section stays hidden while empty.
// Example: { quote: "Rithik delivered...", name: "Jane Doe", role: "Engineering Manager, Company" }
export const testimonials = [];

// Notes / blog: short write-ups. The section stays hidden while empty.
// Example: { id: "multi-tenant", title: "Designing a multi-tenant SaaS",
//            date: "Nov 2026", summary: "One line.", body: ["Paragraph 1", "Paragraph 2"] }
export const notes = [];

// Architecture explorer. Illustrative only: generic layers drawn from the CV,
// with no client or proprietary detail. Edit freely.
export const architecture = {
  layers: [
    {
      id: "clients",
      label: "Clients",
      nodes: [
        { id: "web", name: "React web app", info: "Role-based front-end modules for Air, Ocean, Road, Warehousing, Customs, Finance, HR, CRM and Customer Self-Service." },
        { id: "android", name: "Android app", info: "Android app with embedded APIs that connects card-swiping machines for real-time transactions and cloud sync." },
      ],
    },
    {
      id: "api",
      label: "API layer",
      nodes: [
        { id: "gateway", name: "REST APIs", info: "REST APIs serving the web and Android clients within a multi-tenant SaaS model." },
      ],
    },
    {
      id: "services",
      label: "Microservices",
      nodes: [
        { id: "freight", name: "Freight", info: "Freight Management System handling 10,000+ transactions per day." },
        { id: "transport", name: "Transport & Warehouse", info: "Transport and Warehouse Management Systems with real-time tracking and automated workflow optimization." },
        { id: "customs", name: "Customs", info: "Customs Clearance module alongside the Air, Ocean and Road freight modules." },
        { id: "finance", name: "Finance", info: "AR/AP, General Ledger, Stock Integration, P&L, Balance Sheet and Cash Flow modules." },
        { id: "crm", name: "HR / CRM / Self-Service", info: "HR, CRM and Customer Self-Service modules for enterprise clients." },
      ],
    },
    {
      id: "data",
      label: "Data",
      nodes: [
        { id: "pg", name: "PostgreSQL", info: "Relational data store behind the platform, which serves 50+ enterprise clients." },
      ],
    },
    {
      id: "infra",
      label: "Infrastructure",
      nodes: [
        { id: "gcp", name: "GCP + CentOS", info: "Managed GCP infrastructure and CentOS servers." },
        { id: "cicd", name: "CI/CD", info: "CI/CD pipelines with GitHub-based version control." },
      ],
    },
  ],
};
