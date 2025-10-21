import React, { createContext, useContext, useState } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.about": { es: "Sobre mí", en: "About" },
  "nav.skills": { es: "Tecnologias", en: "technologies" },
  "nav.projects": { es: "Proyectos", en: "Projects" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  
  // Loading & Enter
  "loading.text": { es: "Cargando experiencia...", en: "Loading experience..." },
  "enter.text": { es: "Pulsa Enter para entrar", en: "Press Enter to enter" },
  
  // Hero
  "hero.greeting": { es: "Hola, soy", en: "Hi, I'm" },
  "hero.title": { es: "Desarrollador Web", en: "Web Developer" },
  "hero.subtitle": { 
    es: "Apasionado por la tecnología y la creación de experiencias digitales interactivas",
    en: "Passionate about technology and creating interactive digital experiences"
  },
  "hero.cta": { es: "Ver proyectos", en: "View projects" },
  "hero.cv": { es: "Ver currículum", en: "View CV" },
  
  // About
  "about.title": { es: "Sobre mí", en: "About Me" },
  "about.description": {
    es: "Soy un desarrollador web apasionado por crear experiencias digitales únicas e innovadoras. Me especializo en frontend y backend, con experiencia en múltiples lenguajes y frameworks modernos. Siempre busco aprender nuevas tecnologías y mejorar mis habilidades.",
    en: "I'm a web developer passionate about creating unique and innovative digital experiences. I specialize in frontend and backend, with experience in multiple modern languages and frameworks. Always looking to learn new technologies and improve my skills."
  },
  // About card highlights
  "about.card1.title": { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  "about.card1.desc": { es: "Frontend y Backend", en: "Frontend & Backend" },
  "about.card2.title": { es: "Diseñador Creativo", en: "Creative Designer" },
  "about.card2.desc": { es: "UI/UX y Visual", en: "UI/UX & Visual" },
  "about.card3.title": { es: "Apasionado por la Tecnología", en: "Tech Enthusiast" },
  "about.card3.desc": { es: "Siempre aprendiendo", en: "Always Learning" },
  
  // Skills
  "skills.title": { es: "Habilidades", en: "Skills" },
  "skills.frontend": { es: "Frontend", en: "Frontend" },
  "skills.backend": { es: "Backend", en: "Backend" },
  "skills.databases": { es: "Bases de datos", en: "Databases" },
  "skills.tools": { es: "Herramientas", en: "Tools" },
  
  // Projects
  "projects.title": { es: "Proyectos", en: "Projects" },
  "projects.view": { es: "Ver proyecto", en: "View project" },
  "projects.project1.title": { es: "Diseño UI/UX en Figma", en: "UI/UX Design in Figma" },
  "projects.project1.desc": { 
    es: "Diseño de interfaces modernas y sistemas de diseño completos",
    en: "Modern interface design and complete design systems"
  },
  "projects.project2.title": { es: "Página Web Interactiva", en: "Interactive Website" },
  "projects.project2.desc": { 
    es: "Sitio web creado con JavaScript, HTML y CSS con animaciones avanzadas",
    en: "Website created with JavaScript, HTML and CSS with advanced animations"
  },
  "projects.project3.title": { es: "Aplicación Next.js", en: "Next.js Application" },
  "projects.project3.desc": { 
    es: "Aplicación web full-stack con Next.js y tecnologías modernas",
    en: "Full-stack web application with Next.js and modern technologies"
  },
  
  // Contact
  "contact.title": { es: "Contacto", en: "Contact" },
  "contact.subtitle": {
    es: "¿Tienes un proyecto en mente? ¡Hablemos!",
    en: "Have a project in mind? Let's talk!"
  },
  "contact.email": { es: "Correo electrónico", en: "Email" },
  "contact.github": { es: "GitHub", en: "GitHub" },
  "contact.linkedin": { es: "LinkedIn", en: "LinkedIn" },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
