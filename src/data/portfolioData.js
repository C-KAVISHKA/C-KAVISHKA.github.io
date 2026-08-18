export const personalInfo = {
  name: "Channa Kavishka Sadaruwan",
  handle: "C-KAVISHKA",
  role: "Full-Stack & 3D WebXR Software Developer",
  tagline: "Final-year BSc (Hons) Software Engineering Student at Cardiff Metropolitan University | Full-Stack MERN & Java Spring Boot Developer",
  location: "Kandy, Sri Lanka",
  phone: "+94 70 457 3602",
  email: "channasadhruvan@gmail.com",
  github: "https://github.com/C-KAVISHKA",
  linkedin: "https://linkedin.com/in/channa-sandaruwan",
  cvDownloadUrl: "/Channa_Kavishka_CV.pdf",
  availability: "Seeking Trainee / Internship / Full-Stack Opportunities",
  stats: [
    { label: "Flagship Projects", value: "8+" },
    { label: "Core Technologies", value: "15+" },
    { label: "Graduation Year", value: "2026" },
    { label: "University", value: "Cardiff Met" }
  ],
  bio: "Final-year BSc (Hons) Software Engineering student at Cardiff Metropolitan University (Expected 2026). Skilled in Java, JavaScript, TypeScript, and Python, with hands-on experience building full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js), Java Spring Boot, and Three.js 3D WebXR rendering. Seeking a trainee or software developer role to apply and grow technical skills in a high-impact engineering environment."
};

export const skillsData = [
  {
    category: "Full-Stack & Web Engineering",
    description: "MERN stack architectures, responsive UI, and state management",
    icon: "Layout",
    skills: [
      { name: "React.js & Next.js", level: 95, desc: "Component hierarchies, hooks, SSR, dynamic routing, Vite" },
      { name: "Node.js & Express.js", level: 92, desc: "RESTful API development, JWT authentication, middleware" },
      { name: "Tailwind CSS & Modern CSS3", level: 95, desc: "Responsive design systems, glassmorphism, fluid UI" },
      { name: "JavaScript (ES6+) & TypeScript", level: 90, desc: "Async/await, DOM APIs, strict typing, modular code" },
      { name: "Framer Motion & Swiper.js", level: 90, desc: "Micro-interactions, gestures, and carousel sliders" }
    ]
  },
  {
    category: "3D & Immersive WebXR",
    description: "Real-time 3D WebGL rendering and spatial AR experiences",
    icon: "Boxes",
    skills: [
      { name: "Three.js", level: 90, desc: "WebGL scene rendering, lighting, materials, and 3D geometries" },
      { name: "@react-three/fiber & Drei", level: 90, desc: "Declarative 3D canvas integration in React applications" },
      { name: "WebXR (AR / VR)", level: 85, desc: "Augmented Reality product placement directly in browsers" },
      { name: "@tweenjs/tween.js", level: 88, desc: "Smooth camera interpolations and interactive rotations" }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Enterprise Java services, Spring Boot, and database modeling",
    icon: "Server",
    skills: [
      { name: "Java & Spring Boot", level: 88, desc: "MVC architecture, dependency injection, REST services" },
      { name: "MySQL & Relational SQL", level: 90, desc: "Schema design, complex queries, ACID transactions" },
      { name: "MongoDB & Mongoose", level: 92, desc: "Document schemas, indexing, aggregation pipelines" },
      { name: "Stripe & Cloudinary APIs", level: 88, desc: "Payment workflows, cloud image uploads and transformations" }
    ]
  },
  {
    category: "Programming Languages & Tools",
    description: "Multi-language development and DevOps workflows",
    icon: "Cpu",
    skills: [
      { name: "Java (Core & OOP)", level: 92, desc: "Object-oriented design, multithreading, collections framework" },
      { name: "Python", level: 85, desc: "Data processing, automated scripts, AI/ML pipelines" },
      { name: "Git & GitHub", level: 94, desc: "Version control, branching workflows, open-source repositories" },
      { name: "Postman & REST Testing", level: 90, desc: "API endpoint testing, authorization headers, payload debugging" }
    ]
  }
];

export const projectsData = [
  {
    id: "ifurnish-shop",
    title: "iFurnish Shop — 3D WebXR Furniture Platform",
    category: "3D WebXR",
    tagline: "Full-Stack 3D & Augmented Reality E-Commerce Experience",
    summary: "A production-grade e-commerce platform that allows customers to browse furniture catalogs, customize materials in real-time 3D, preview models in their rooms via WebXR Augmented Reality, and checkout securely with Stripe.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/iFurnish_Shop",
    demoUrl: "https://github.com/C-KAVISHKA/iFurnish_Shop",
    featured: true,
    tags: ["React 18", "Three.js", "WebXR", "Node.js", "Express", "MongoDB", "Stripe", "Framer Motion", "TailwindCSS"],
    highlights: [
      "Real-time 3D model customization (materials, colors, textures) with Three.js and @react-three/fiber.",
      "Augmented Reality (WebXR) room projection in mobile browsers with zero external app dependencies.",
      "Full e-commerce flow: dynamic product catalog, shopping cart, user authentication, and Stripe payments.",
      "Dedicated Admin panel for inventory management, orders, and sales tracking."
    ],
    architecture: "MERN Stack + Three.js / WebXR Layer + Stripe API + Cloudinary CDN"
  },
  {
    id: "animeverse",
    title: "AnimeVerse — Interactive Discovery Platform",
    category: "Full Stack",
    tagline: "Dynamic Content Exploration Platform with REST APIs & Dark Mode",
    summary: "An interactive anime exploration platform enabling users to search, discover, and filter thousands of titles dynamically with client-side caching, REST APIs, and responsive dark-mode styling.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/onisaga-clone",
    demoUrl: "https://github.com/C-KAVISHKA/onisaga-clone",
    featured: true,
    tags: ["MERN Stack", "Next.js / React", "Node.js", "Express", "MongoDB", "TailwindCSS", "Swiper.js"],
    highlights: [
      "Dynamic catalog browsing and search with real-time query filtering.",
      "Sleek cyberpunk dark UI with interactive hero sliders and rank badge cards.",
      "RESTful API backend for title metadata, episode feeds, and user watchlists.",
      "Responsive mobile-first layout optimized for low-latency media loading."
    ],
    architecture: "React / Next.js + Express.js API + MongoDB Database"
  },
  {
    id: "oceanview-reservation",
    title: "Oceanview Reservation System",
    category: "Enterprise Java",
    tagline: "Hotel & Resort Booking Platform with Spring Boot & MySQL",
    summary: "An enterprise-grade hotel reservation management system built with Java Spring Boot and MySQL, enabling automated room booking, real-time availability management, and backend data persistence.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA",
    demoUrl: "https://github.com/C-KAVISHKA",
    featured: true,
    tags: ["Java", "Spring Boot", "MySQL", "Hibernate / JPA", "REST API", "MVC Architecture"],
    highlights: [
      "Robust backend services with Spring Boot and Spring Data JPA for persistent booking records.",
      "Dynamic room availability tracking, conflict resolution, and automated price calculations.",
      "Normalized MySQL relational schema with transactional integrity and ACID compliance.",
      "Role-based access management for front-desk receptionists and administrators."
    ],
    architecture: "Spring Boot MVC + Spring Data JPA + MySQL Database"
  },
  {
    id: "healthshield-ai",
    title: "HealthShield AI",
    category: "Enterprise Java",
    tagline: "Health Data Management & Analytics Application",
    summary: "A health-focused application integrating backend Spring Boot services with a MySQL database to securely store, manage, and analyze patient health records and vital metrics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA",
    demoUrl: "https://github.com/C-KAVISHKA",
    featured: false,
    tags: ["Java", "Spring Boot", "MySQL", "REST API", "Data Analytics"],
    highlights: [
      "Secure health record management with encrypted data persistence in MySQL.",
      "RESTful API endpoints for patient tracking, vital health metrics, and doctor appointments.",
      "Integration-ready architecture designed for predictive health indicators."
    ],
    architecture: "Java Spring Boot + MySQL + REST Services"
  },
  {
    id: "siteguard-plant-ai",
    title: "SiteGuard AI & Plant Pathology Classifier",
    category: "AI & Research",
    tagline: "Computer Vision & Deep Learning Diagnostics",
    summary: "Applied research and neural network proposals utilizing Computer Vision for plant disease diagnosis and intelligent site safety monitoring.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA",
    demoUrl: "https://github.com/C-KAVISHKA",
    featured: false,
    tags: ["Python", "Computer Vision", "Deep Learning", "TensorFlow/PyTorch", "Data Pipelines"],
    highlights: [
      "Convolutional Neural Network (CNN) pipeline for early leaf disease classification across crop species.",
      "Image pre-processing, augmentation, and confidence score calculation.",
      "Academic proposal and architecture design for BSc Software Engineering research."
    ],
    architecture: "Python ML Pipeline + Computer Vision Preprocessing + Classification Models"
  }
];

export const educationAndExperience = [
  {
    period: "2023 — Expected 2026",
    title: "BSc (Hons) in Software Engineering",
    organization: "Cardiff Metropolitan University (Kandy Campus)",
    badge: "Undergraduate Degree",
    description: "Final-year student specializing in Advanced Software Engineering, Distributed Systems, 3D Web Graphics, Database Engineering, and Enterprise Java / Spring Boot architectures."
  },
  {
    period: "2021 — 2023",
    title: "Higher National Diploma (HND) in Software Engineering",
    organization: "ICBT Campus",
    badge: "Higher National Diploma",
    description: "Completed comprehensive coursework in Object-Oriented Programming (Java/C#), Database Design (SQL), Web Technologies, Data Structures & Algorithms, and Software Project Management."
  },
  {
    period: "Completed",
    title: "Diploma in English",
    organization: "British Way English Academy",
    badge: "Professional Diploma",
    description: "Developed advanced professional and technical English communication, presentation, and collaborative documentation skills."
  },
  {
    period: "Completed",
    title: "G.C.E. Advanced Level (A/L) & Ordinary Level (O/L)",
    organization: "Secondary Education",
    badge: "School Education",
    description: "Completed national secondary education credentials with a strong focus on mathematics and science foundations."
  }
];
