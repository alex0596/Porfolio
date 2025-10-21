import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import projectFigma from "@/assets/project-figma.jpg";
import projectWeb from "@/assets/project-web.jpg";
import projectNextjs from "@/assets/project-nextjs.jpg";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects.project1.title"),
      description: t("projects.project1.desc"),
      image: projectFigma,
      technologies: ["Figma", "UI/UX", "Design Systems"],
      link: "https://www.figma.com/proto/xrXiVDQBv1UR5PiY0C8S3t/Proyecto-clase-OASIS-APP?node-id=12-2698&p=f&t=E0Iw474kQE5uzDpi-0&scaling=scale-down&content-scaling=fixed&page-id=3%3A433&starting-point-node-id=12%3A2698",
    },
    {
      title: t("projects.project2.title"),
      description: t("projects.project2.desc"),
      image: projectWeb,
      technologies: ["JavaScript", "HTML5", "CSS"],
      link: "http://restaurantebarrio.rf.gd/?i=1",
    },
    {
      title: t("projects.project3.title"),
      description: t("projects.project3.desc"),
      image: projectNextjs,
      technologies: ["Next.js", "React", "TypeScript"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("projects.title")}
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-accent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group/btn"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <span className="flex items-center gap-2">
                      {t("projects.view")}
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
