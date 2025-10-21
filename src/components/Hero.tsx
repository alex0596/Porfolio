// Extiende la interfaz Window para TypeScript
declare global {
  interface Window {
    LiquidBackground: any;
  }
}
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let app: any | null = null;
    let mounted = true;

    if (!canvasRef.current) return;
  const scriptSrc = '/liquid1.min.js';
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${scriptSrc}"]`);
    const handleLoad = () => {
      try {
        const maybeGlobal = (window as any).LiquidBackground || (window as any).default || (window as any).liquid1;
        const LiquidBackground = maybeGlobal as any;
        if (!LiquidBackground) {
          console.error('LiquidBackground global not found');
          return;
        }
        app = LiquidBackground(canvasRef.current);
        app.loadImage(heroBg as unknown as string);
        if (app.liquidPlane && app.liquidPlane.material) {
          app.liquidPlane.material.metalness = 0.75;
          app.liquidPlane.material.roughness = 0.25;
        }
        if (app.liquidPlane && app.liquidPlane.uniforms && app.liquidPlane.uniforms.displacementScale) {
          app.liquidPlane.uniforms.displacementScale.value = 5;
        }
        if (app.setRain) app.setRain(false);
        console.log('LiquidBackground initialized');
      } catch (e) {
        console.error('LiquidBackground error:', e);
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.onload = handleLoad;
      document.body.appendChild(script);
    } else if ((script as any).readyState === 'complete' || (script as any).loaded) {
      handleLoad();
    } else {
      script.addEventListener('load', handleLoad);
    }


    return () => {
      mounted = false;
      try {
        if (app) {
          if (typeof app.destroy === 'function') app.destroy();
          if (typeof app.dispose === 'function') app.dispose();
        }
      } catch (e) {}
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Liquid background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Fallback: show image if canvas not loaded */}
      <img
        src={heroBg}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Fallback overlay to darken the background */}
      <div className="absolute inset-0 bg-background/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8 animate-fade-in-up">
        <p className="text-lg md:text-xl text-primary font-medium">
          {t("hero.greeting")}
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
          Alejandro Buendía
        </h1>

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <p className="text-2xl md:text-3xl text-primary font-semibold">
            {t("hero.title")}
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-8">
              <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
            <Button asChild variant="outline" size="lg">
              <a href="#projects" className="px-6">
                {t("hero.cta")}
              </a>
            </Button>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute -top-8">
              <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
            <Button asChild variant="outline" size="lg">
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="px-6">
                {t("hero.cv")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
