export const personalInfo = {
  name: "Channa Kavishka Sadaruwan",
  handle: "C-KAVISHKA",
  role: "Software Engineering Intern | Trainee Software Engineer",
  tagline: "Final-year BSc (Hons) Software Engineering Student at Cardiff Metropolitan University | Seeking Software Engineering Internship / Trainee Opportunities",
  location: "No. 483, Matale Road, Alawatugoda, Sri Lanka",
  phone: "+94 70 457 3602",
  email: "channasadhruvan@gmail.com",
  github: "https://github.com/C-KAVISHKA",
  linkedin: "https://linkedin.com/in/channa-sandaruwan",
  cvDownloadUrl: "/Channa_Kavishka_CV.pdf",
  availability: "Actively Seeking Software Engineering Internship / Trainee Roles",
  stats: [
    { label: "Featured Projects", value: "8+" },
    { label: "Core Technologies", value: "15+" },
    { label: "Graduation Year", value: "2026" },
    { label: "University", value: "Cardiff Met" }
  ],
  bio: "Final-year BSc (Hons) Software Engineering student at Cardiff Metropolitan University (Expected 2026) with hands-on experience building full-stack web applications and backend systems through academic and personal projects. Experienced with Java, JavaScript, React, Node.js, Express, Spring Boot, MySQL, MongoDB, and REST APIs. Seeking a Software Engineering Internship / Trainee role to apply my skills, learn from experienced engineers, and contribute to real-world software projects."
};

export const skillsData = [
  {
    category: "Full-Stack & Web Engineering",
    description: "MERN stack architectures, responsive UI, and state management",
    icon: "Layout",
    skills: [
      { name: "React.js & Next.js", level: 92, desc: "Component hierarchies, hooks, state management, Vite" },
      { name: "Node.js & Express.js", level: 90, desc: "RESTful API development, JWT authentication, middleware" },
      { name: "Tailwind CSS & Modern CSS3", level: 94, desc: "Responsive design systems, fluid UI, layout structure" },
      { name: "JavaScript (ES6+) & TypeScript", level: 90, desc: "Async/await, DOM APIs, clean modular code" },
      { name: "Framer Motion & Swiper.js", level: 88, desc: "Interactive UI animations, gestures, and carousel sliders" }
    ]
  },
  {
    category: "3D & Interactive Web",
    description: "Real-time 3D WebGL rendering and GSAP scroll animations",
    icon: "Boxes",
    skills: [
      { name: "Three.js & WebGL", level: 88, desc: "WebGL scene rendering, lighting, materials, and 3D geometries" },
      { name: "GSAP & ScrollTrigger", level: 88, desc: "Timeline animations and scroll-driven interactive breakdowns" },
      { name: "Lenis Smooth Scroll", level: 85, desc: "Smooth 60 FPS viewport scrolling and responsive motion" },
      { name: "WebXR (AR / VR)", level: 82, desc: "Augmented Reality product preview in supported mobile browsers" }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Enterprise Java services, Spring Boot, and database modeling",
    icon: "Server",
    skills: [
      { name: "Java & Spring Boot", level: 88, desc: "MVC architecture, dependency injection, REST services" },
      { name: "MySQL & Relational SQL", level: 90, desc: "Schema design, complex queries, ACID transactions" },
      { name: "MongoDB & Mongoose", level: 90, desc: "Document schemas, indexing, CRUD pipelines" },
      { name: "REST APIs & Integrations", level: 90, desc: "API endpoint design, Stripe payment workflows, Cloudinary" }
    ]
  },
  {
    category: "Programming Languages & Tools",
    description: "Core programming and collaborative developer workflows",
    icon: "Cpu",
    skills: [
      { name: "Java (Core & OOP)", level: 90, desc: "Object-oriented design, data structures, collections" },
      { name: "Python", level: 85, desc: "Scripting, data processing, backend automation" },
      { name: "Git & GitHub", level: 92, desc: "Version control, branching workflows, repository management" },
      { name: "Postman & API Testing", level: 88, desc: "Endpoint validation, header configuration, payload debugging" }
    ]
  }
];

export const projectsData = [
  {
    id: "cafe-nuwara",
    title: "Café Nuwara — 3D Interactive Restaurant Experience",
    category: "3D Web & GSAP",
    tagline: "Interactive 3D Burger Café Web Experience with Three.js & GSAP",
    summary: "Built an interactive 3D web platform for a gourmet burger café featuring WebGL entrance sequences, GSAP scroll-driven layer-by-layer burger anatomy animations, smooth Lenis scrolling, and responsive mobile UI.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/cafe-nuwara",
    demoUrl: "https://cafe-nuwara.vercel.app",
    featured: true,
    tags: ["JavaScript (ES6+)", "Three.js (WebGL)", "GSAP", "ScrollTrigger", "Lenis", "TailwindCSS", "Vercel"],
    highlights: [
      "Interactive 3D WebGL entrance sequence with custom camera animation.",
      "Scroll-triggered GSAP layer-by-layer 'Monster Burger' anatomy breakdown.",
      "Smooth 60 FPS viewport scrolling powered by Lenis.",
      "Responsive layout optimized across desktop, tablet, and mobile screens."
    ],
    architecture: "JavaScript (ES6+) + Three.js WebGL Scene + GSAP ScrollTrigger + Lenis Smooth Scroll"
  },
  {
    id: "ifurnish-shop",
    title: "iFurnish Shop — 3D E-Commerce Application",
    category: "Full Stack & 3D",
    tagline: "Full-Stack Furniture E-Commerce Web Application",
    summary: "Developed a full-stack furniture e-commerce application with product search and filtering, 3D WebGL customization, mobile WebXR AR room projection, persistent shopping cart management, user authentication, and responsive mobile-first UI.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/iFurnish_Shop",
    demoUrl: "https://i-furnish-shop.vercel.app/",
    featured: true,
    tags: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "Three.js", "Stripe", "TailwindCSS"],
    highlights: [
      "Real-time 3D product customization (materials, colors, textures) with Three.js.",
      "Augmented Reality (WebXR) room projection directly in mobile browsers.",
      "Persistent shopping cart management, user authentication, and Stripe payment integration.",
      "Admin dashboard for product inventory tracking."
    ],
    architecture: "MERN Stack (MongoDB, Express.js, React.js, Node.js) + Three.js / WebXR"
  },
  {
    id: "animeverse",
    title: "AnimeVerse — Interactive Discovery Platform",
    category: "Full Stack",
    tagline: "Dynamic Content Exploration Platform with REST APIs & Dark Mode",
    summary: "Built an anime discovery platform with dynamic search and filtering, external REST API integration, client-side caching, and responsive dark-mode UI.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/anime-site",
    demoUrl: "https://animeverse.up.railway.app/",
    featured: true,
    tags: ["React.js", "Node.js", "Express.js", "REST APIs", "MongoDB", "TailwindCSS"],
    highlights: [
      "Dynamic catalog browsing and search with real-time query filtering.",
      "Modern dark UI with interactive hero sliders and catalog cards.",
      "RESTful API backend for metadata retrieval and user watchlists.",
      "Mobile-first responsive styling optimized for speed and readability."
    ],
    architecture: "React.js + Node.js Express API + MongoDB Database"
  },
  {
    id: "oceanview-reservation",
    title: "Oceanview Reservation System",
    category: "Enterprise Java",
    tagline: "Hotel & Resort Booking System with Spring Boot & MySQL",
    summary: "Developed a hotel and resort reservation system with room availability, booking workflows, guest check-in/out, and MySQL persistence using Spring Boot and Hibernate.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/oceanview-reservation-system",
    demoUrl: "https://github.com/C-KAVISHKA/oceanview-reservation-system",
    featured: true,
    tags: ["Java", "Spring Boot", "MySQL", "Hibernate", "MVC Architecture", "REST API"],
    highlights: [
      "Backend reservation services with Spring Boot and Spring Data JPA.",
      "Room availability checking, booking workflow, and checkout lifecycles.",
      "Relational MySQL database schema with transaction handling.",
      "Role-based access management for receptionists and administrators."
    ],
    architecture: "Spring Boot MVC + Hibernate + MySQL Database"
  },
  {
    id: "healthshield-ai",
    title: "HealthShield AI",
    category: "Enterprise Java",
    tagline: "Healthcare Management & Electronic Health Records Backend",
    summary: "Developed a healthcare management backend supporting EHR, patient data tracking, role-based access control, and transactional MySQL persistence.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA/healthshield_ai",
    demoUrl: "https://github.com/C-KAVISHKA/healthshield_ai",
    featured: false,
    tags: ["Java", "Spring Boot", "MySQL", "REST API", "Role-Based Access"],
    highlights: [
      "Electronic health records (EHR) and patient record management.",
      "RESTful API endpoints for patient tracking and appointment workflows.",
      "Transactional data persistence with MySQL and Spring Data JPA."
    ],
    architecture: "Java Spring Boot + MySQL + RESTful Backend Services"
  },
  {
    id: "siteguard-plant-ai",
    title: "SiteGuard AI & Plant Pathology Classifier",
    category: "AI & Research",
    tagline: "Computer Vision & Deep Learning Diagnostics",
    summary: "Applied research and neural network models utilizing Computer Vision for plant disease diagnosis and intelligent site safety monitoring.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    repoUrl: "https://github.com/C-KAVISHKA",
    demoUrl: "https://github.com/C-KAVISHKA",
    featured: false,
    tags: ["Python", "Computer Vision", "Deep Learning", "TensorFlow/PyTorch"],
    highlights: [
      "Convolutional Neural Network (CNN) pipeline for crop leaf disease classification.",
      "Image pre-processing, augmentation, and confidence score calculation.",
      "Academic proposal and architecture design for BSc Software Engineering research."
    ],
    architecture: "Python ML Pipeline + Computer Vision Preprocessing"
  }
];

export const educationAndExperience = [
  {
    period: "2023 — 2026 (Expected)",
    title: "BSc (Hons) Software Engineering",
    organization: "Cardiff Metropolitan University",
    badge: "Undergraduate Degree",
    description: "Final-year student focusing on Software Engineering principles, Web Technologies, Database Systems, Distributed Computing, and Object-Oriented Software Design."
  },
  {
    period: "Completed",
    title: "Higher National Diploma (HND) in Software Engineering",
    organization: "ICBT Campus",
    badge: "Higher National Diploma",
    description: "Completed comprehensive coursework in Object-Oriented Programming (Java/C#), Database Design (SQL), Web Technologies, Data Structures, and Software Development lifecycles."
  },
  {
    period: "Completed",
    title: "Diploma in English",
    organization: "British Way English Academy",
    badge: "Professional Diploma",
    description: "Developed professional and technical English communication, presentations, and collaborative documentation skills."
  },
  {
    period: "Completed",
    title: "Secondary Education (G.C.E. A/L & O/L)",
    organization: "Secondary Education",
    badge: "Completed",
    description: "Completed national secondary education credentials with a focus on mathematics and science foundations."
  }
];
