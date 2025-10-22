import { useEffect, useRef } from "react";

const WaterBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "20px";
      ripple.style.height = "20px";

      canvasRef.current.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!rainRef.current) return;

    const createRainDrop = () => {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      // position across the screen
      drop.style.left = `${Math.random() * 100}%`;
      // much slower and varied durations so the rain falls noticeably slower
      const duration = Math.random() * 1.2 + 1.6; // ~1.6s - 2.8s
      drop.style.animationDuration = `${duration}s`;
      // make drops more visible: higher minimum opacity
      drop.style.opacity = `${Math.random() * 0.4 + 0.5}`;
      // randomize thickness and length a bit (JS overrides defaults)
      const width = Math.random() * 2 + 2; // 2-4px
      const height = Math.random() * 70 + 70; // 70-140px
      drop.style.width = `${width}px`;
      drop.style.height = `${height}px`;

      // when the drop animation ends (reaches bottom), spawn a splash
      const handleAnimationEnd = () => {
        // compute left in pixels to position splash precisely
        const leftVal = drop.style.left || "0%";
        let leftPx = 0;
        if (leftVal.endsWith("%")) {
          const pct = parseFloat(leftVal) || 0;
          leftPx = (pct / 100) * window.innerWidth;
        } else if (leftVal.endsWith("px")) {
          leftPx = parseFloat(leftVal) || 0;
        }

        const splash = document.createElement("div");
        splash.className = "rain-splash";
        // position splash slightly above bottom so it's visible
        splash.style.left = `${leftPx - 6}px`;
        splash.style.top = `${window.innerHeight - 12}px`;

        rainRef.current?.appendChild(splash);

        // remove splash after its animation
        setTimeout(() => splash.remove(), 600);

        // cleanup drop
        drop.removeEventListener("animationend", handleAnimationEnd);
        drop.remove();
      };
      drop.addEventListener("animationend", handleAnimationEnd);

      rainRef.current?.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 1000);
    };

    // spawn drops at a reasonable density; slower drops + denser spawn
    const interval = setInterval(createRainDrop, 28);
  return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 water-gradient opacity-10" />
      <div ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
      <div ref={rainRef} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" />
      
      {/* Floating orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
    </>
  );
};

export default WaterBackground;
