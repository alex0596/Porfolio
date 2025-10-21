import { useLanguage } from "@/contexts/LanguageContext";
import { Code2, Sparkles, Rocket } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t("about.card1.title"),
      description: t("about.card1.desc"),
    },
    {
      icon: Sparkles,
      title: t("about.card2.title"),
      description: t("about.card2.desc"),
    },
    {
      icon: Rocket,
      title: t("about.card3.title"),
      description: t("about.card3.desc"),
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t("about.title")}
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-accent" />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed animate-fade-in-up">
            {t("about.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 space-y-4 hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
