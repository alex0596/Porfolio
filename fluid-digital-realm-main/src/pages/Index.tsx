import { useState, useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";
import EnterScreen from "@/components/EnterScreen";
import WaterBackground from "@/components/WaterBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechCarousel from "@/components/TechCarousel";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Stage = "loading" | "enter" | "main";

const Index = () => {
  const [stage, setStage] = useState<Stage>("loading");
  const [transitioning, setTransitioning] = useState(false);

  const handleLoadingComplete = () => {
    setStage("enter");
  };

  const handleEnter = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStage("main");
      setTransitioning(false);
    }, 600);
  };

  // Prevent scroll during loading and enter stages
  useEffect(() => {
    if (stage !== "main") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [stage]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          {/* Loading screen */}
          {stage === "loading" && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}

          {/* Enter screen */}
          {stage === "enter" && (
            <div
              className={`transition-opacity duration-600 ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <EnterScreen onEnter={handleEnter} />
            </div>
          )}

          {/* Main portfolio */}
          {stage === "main" && (
            <div className="animate-fade-in-up">
              <WaterBackground />
              <CustomCursor />
              <Navbar />
              
              <main>
                <Hero />
                <About />
                <TechCarousel />
                <Projects />
                <Contact />
              </main>

              <Footer />
            </div>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
