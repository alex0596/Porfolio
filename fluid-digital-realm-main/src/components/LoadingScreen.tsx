import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="water-gradient absolute inset-0 opacity-20" />
      
      <div className="relative z-10 text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-fade-in-up">
          AB
        </h1>
        
        <div className="w-64 md:w-96 mx-auto space-y-3">
          <p className="text-sm md:text-base text-muted-foreground animate-fade-in-up">
            {t("loading.text")}
          </p>
          
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
