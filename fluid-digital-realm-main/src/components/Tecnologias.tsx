import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaFigma, FaGithub, FaTrello, FaGitAlt, FaPhp, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiMysql, SiMongodb, SiTypescript, SiTailwindcss, SiBootstrap, SiDocker, SiVisualstudiocode, SiFirebase, SiPnpm, SiNetlify, SiJest, SiCypress, SiGithubactions } from "react-icons/si";
import { BsCodeSlash } from "react-icons/bs";
import cursorLogo from './img/cursor-logo.svg';
import intellijLogo from './img/intellij-logo.svg';

const tecnologias = {
  frontend: [
    { nombre: "HTML", icono: <FaHtml5 color="#e34c26" />, url: "https://developer.mozilla.org/docs/Web/HTML" },
    { nombre: "CSS", icono: <FaCss3Alt color="#264de4" />, url: "https://developer.mozilla.org/docs/Web/CSS" },
    { nombre: "JavaScript", icono: <FaJs color="#f0db4f" />, url: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { nombre: "TypeScript", icono: <SiTypescript color="#3178c6" />, url: "https://www.typescriptlang.org/" },
    { nombre: "React", icono: <FaReact color="#61dafb" />, url: "https://react.dev/" },
    { nombre: "Next.js", icono: <SiNextdotjs color="#000" />, url: "https://nextjs.org/" },
    { nombre: "Tailwind", icono: <SiTailwindcss color="#38bdf8" />, url: "https://tailwindcss.com/" },
    { nombre: "Bootstrap", icono: <SiBootstrap color="#7952b3" />, url: "https://getbootstrap.com/" },
  ],
  backend: [
    { nombre: "Node.js", icono: <FaNodeJs color="#339933" />, url: "https://nodejs.org/" },
    { nombre: "JavaScript", icono: <FaJs color="#f0db4f" />, url: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { nombre: "TypeScript", icono: <SiTypescript color="#3178c6" />, url: "https://www.typescriptlang.org/" },
    { nombre: "Java", icono: <FaJava color="#007396" />, url: "https://www.java.com/" },
    { nombre: "Python", icono: <FaPython color="#306998" />, url: "https://www.python.org/" },
    { nombre: "PHP", icono: <FaPhp color="#777BB4" />, url: "https://www.php.net/" },
    { nombre: "Firebase", icono: <SiFirebase color="#FFCA28" />, url: "https://firebase.google.com/" },
    { nombre: "APIs", icono: <BsCodeSlash color="#4CAF50" />, url: "https://developer.mozilla.org/docs/Web/API" },
  ],
  database: [
    { nombre: "PostgreSQL", icono: <SiPostgresql color="#336791" />, url: "https://www.postgresql.org/" },
    { nombre: "MySQL", icono: <SiMysql color="#00758f" />, url: "https://www.mysql.com/" },
    { nombre: "MongoDB", icono: <SiMongodb color="#47A248" />, url: "https://www.mongodb.com/" },
  ],
  tools: [
    { nombre: "Docker", icono: <SiDocker color="#2496ed" />, url: "https://www.docker.com/" },
    { nombre: "Visual Studio Code", icono: <SiVisualstudiocode color="#0078d4" />, url: "https://code.visualstudio.com/" },
    { nombre: "IntelliJ IDEA", icono: <img src={intellijLogo} alt="IntelliJ IDEA" style={{width:24, height:24, borderRadius:6}} />, url: "https://www.jetbrains.com/idea/" },
    { nombre: "Figma", icono: <FaFigma color="#a259ff" />, url: "https://www.figma.com/" },
    { nombre: "Git", icono: <FaGitAlt color="#f34f29" />, url: "https://git-scm.com/" },
    { nombre: "GitHub", icono: <FaGithub color="#333" />, url: "https://github.com/" },
    { nombre: "Trello", icono: <FaTrello color="#0079bf" />, url: "https://trello.com/" },
    { nombre: "Cursor", icono: <img src={cursorLogo} alt="Cursor" style={{width:24, height:24, borderRadius:6}} />, url: "https://www.cursor.so/" },
    { nombre: "pnpm", icono: <SiPnpm color="#F69220" />, url: "https://pnpm.io/" },
    { nombre: "Netlify", icono: <SiNetlify color="#00AD9F" />, url: "https://www.netlify.com/" },
    { nombre: "Jest", icono: <SiJest color="#C21325" />, url: "https://jestjs.io/" },
    { nombre: "Cypress", icono: <SiCypress color="#17202C" />, url: "https://www.cypress.io/" },
    { nombre: "GitHub Actions", icono: <SiGithubactions color="#2088FF" />, url: "https://github.com/features/actions" },
  ]
};

const sectionTitles = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de datos',
  tools: 'Herramientas',
};

export { tecnologias };

export default function Tecnologias({ language, translations, isMobile }) {
  const techSections = translations?.techSections || sectionTitles;
  
  return (
    <section 
      className="tecnologias w-full my-16 flex flex-col items-center main-section" 
      data-aos="fade-up"
      data-aos-offset={isMobile ? "150" : "400"}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white bounce-on-hover" style={{marginBottom: '2.5rem'}} data-aos="fade-up" data-aos-delay="100">{language === 'es' ? 'Tecnologías' : 'Technologies'}</h2>
      <div className="w-full flex flex-col md:flex-row md:justify-center gap-10">
        {Object.entries(tecnologias).map(([key, techs], idx) => (
          <div key={key} className="flex-1 flex flex-col items-center" data-aos="fade-up" data-aos-delay={150 * (idx + 1)}>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 bounce-on-hover">{techSections[key]}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {techs.map((tec, tecIdx) => (
                <a
                  key={tec.nombre}
                  href={tec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-xl px-3 py-2 shadow hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700 bounce-on-hover tap-on-active"
                  style={{ minWidth: 0 }}
                  title={tec.nombre}
                  data-aos="fade-up"
                  data-aos-delay={100 + (tecIdx * 50)}
                >
                  <span className="text-2xl">{tec.icono}</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">{tec.nombre}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
