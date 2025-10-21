import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface EnterScreenProps {
  onEnter: () => void;
}

const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [pulse, setPulse] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onEnter();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    const pulseInterval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1500);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(pulseInterval);
    };
  }, [onEnter]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="water-gradient absolute inset-0 opacity-30" />
      
      <div className="relative z-10 text-center space-y-8 px-4">
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground">
            Alejandro Buendía
          </h1>
          
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
        
        <button
          onClick={onEnter}
          className={`group relative px-8 py-4 text-lg font-medium text-foreground glass rounded-xl transition-all duration-300 hover:scale-105 ${
            pulse ? "scale-105" : ""
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            {t("enter.text")}
            <span className="text-primary">↵</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default EnterScreen;
