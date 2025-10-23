import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "alejandrobuendiacruz@gmail.com",
      link: "mailto:alejandrobuendiacruz@gmail.com",
    },
    {
      icon: Github,
      label: t("contact.github"),
      value: "github.com/alejandro-buendia",
      link: "https://github.com/alex0596",
    },
    {
      icon: Linkedin,
      label: t("contact.linkedin"),
      value: "linkedin.com/in/alejandro-buendia",
      link: "https://www.linkedin.com/in/alejandro-buendia-cruz/",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("contact.title")}
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-accent" />
            <p className="text-xl text-muted-foreground pt-4">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl flex items-center gap-3 hover:scale-105 transition-all duration-300 group border border-border/50 w-64 h-16 justify-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <method.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground text-base">{method.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
