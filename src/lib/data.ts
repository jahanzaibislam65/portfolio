export const profile = {
  name: "Jahanzaib Islam",
  firstName: "Jahanzaib",
  role: "Software Engineer",
  tagline: "I build fast, polished web & mobile products.",
  location: "Lahore, Pakistan",
  email: "jahanzaibislam65@gmail.com",
  phone: "+92 316 4344054",
  phoneRaw: "+923164344054",
  resume: "/Jahanzaib_Islam_Resume.pdf",
  available: true,
  summary:
    "Software engineer with 5 years of experience building production web and mobile applications across React, Next.js, React Native and Node.js. Proficient in JavaScript, TypeScript, responsive design, and modern front-end development practices.",
  summary2:
    "I care about clean, maintainable code, performance budgets that actually hold, and interfaces that feel effortless — from AI-powered workflows to microservice-backed dashboards.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/", icon: "github" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" as const },
  { label: "WhatsApp", href: `https://wa.me/${profile.phoneRaw.replace("+", "")}`, icon: "whatsapp" as const },
];

export const roles = [
  "Software Engineer",
  "React & Next.js Developer",
  "React Native Developer",
  "Full-Stack Engineer",
  "AI Engineer",
  "MERN Stack Developer",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years building" },
  { value: 30, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "", label: "Platforms — web, mobile, API" },
];

export const marqueeItems = [
  "TypeScript", "React.js", "Next.js", "React Native", "Node.js", "Nest.js",
  "GraphQL", "PostgreSQL", "MongoDB", "Tailwind CSS", "AWS", "Docker",
  "Redux", "Express.js", "MySQL", "GitHub Actions",
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "code" as const,
    items: ["TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "Frontend",
    icon: "layout" as const,
    items: ["React.js", "Next.js", "React Native (Expo)", "HTML5", "CSS3", "Tailwind CSS", "MUI", "Redux"],
  },
  {
    title: "Backend",
    icon: "server" as const,
    items: ["Node.js", "Express.js", "Nest.js", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    icon: "database" as const,
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud" as const,
    items: ["AWS Cognito", "AWS S3", "EC2", "Lambda", "Docker", "GitHub Actions"],
  },
  {
    title: "Ways of working",
    icon: "sparkles" as const,
    items: ["Microservices", "AI agents & workflows", "Performance tuning", "Cross-functional teams"],
  },
];

export const experience = [
  {
    company: "MeissaSoft",
    role: "Software Engineer",
    period: "Dec 2021 — Present",
    location: "Lahore, Pakistan",
    duration: "4 yrs 6 mos",
    current: true,
    points: [
      "Developed and maintained responsive web and mobile applications using React.js, Next.js and React Native.",
      "Worked with microservices-based architectures, integrating multiple distributed services into scalable, maintainable solutions.",
      "Contributed to the development and integration of AI-powered features, AI agents and intelligent workflows.",
      "Built high-quality, user-friendly and responsive interfaces across web and mobile.",
      "Optimized application performance to improve speed, scalability and overall user experience.",
      "Integrated RESTful APIs, ensuring seamless communication between frontend and backend services.",
    ],
    stack: ["React", "Next.js", "React Native", "Node.js", "AWS"],
  },
  {
    company: "Regbits (Pvt.) Ltd",
    role: "Frontend Developer",
    period: "Apr 2021 — Sep 2021",
    location: "Lahore, Pakistan",
    duration: "6 mos",
    current: false,
    points: [
      "Converted UI/UX designs into pixel-perfect, responsive web pages using HTML, CSS, JavaScript and Bootstrap.",
      "Performed functional, regression and user-acceptance testing to verify behaviour before releases.",
      "Worked closely with QA engineers to reproduce, track and resolve reported issues.",
      "Assisted in deploying updates and verifying releases across staging and production.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"],
  },
];

export const projects = [
  {
    title: "Lilbit",
    subtitle: "Betting Platform",
    year: "2024",
    description:
      "A responsive betting platform where users place bets across a range of games. Built for speed and a streamlined, low-friction betting flow.",
    highlights: ["Real-time odds UI", "Streamlined bet slip", "Fully responsive"],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    href: "https://www.lilb.it",
    accent: "from-teal-300/25 to-sky-500/10",
  },
  {
    title: "Crispa",
    subtitle: "Accounting & Forecasting",
    year: "2023",
    description:
      "A full-featured platform for digital business accounting and forecasting — dashboards, projections and reporting for finance teams.",
    highlights: ["Forecasting dashboards", "Data-dense tables", "Role-based access"],
    stack: ["React.js", "Redux", "REST APIs", "AWS"],
    href: "https://crispa.ai/",
    accent: "from-indigo-400/25 to-fuchsia-500/10",
  },
  {
    title: "Eaglance",
    subtitle: "Freelancing Marketplace",
    year: "2022",
    description:
      "A two-sided freelancing marketplace with Stripe payments and Socket.IO-powered real-time messaging between clients and freelancers.",
    highlights: ["Stripe payments", "Socket.IO chat", "Escrow-style milestones"],
    stack: ["React.js", "Node.js", "Socket.IO", "Stripe"],
    href: null,
    accent: "from-fuchsia-400/25 to-rose-500/10",
  },
];

export const education = [
  {
    degree: "MS in Computer Science",
    school: "University of Engineering & Technology",
    period: "2026 — Present",
    location: "Lahore, Pakistan",
  },
  {
    degree: "BS in Computer Science",
    school: "COMSATS Institute of Information Technology",
    period: "2017 — 2021",
    location: "Lahore, Pakistan",
  },
];

export const languages = [
  { name: "Urdu", level: "Native proficiency" },
  { name: "English", level: "Professional working proficiency" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
