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
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
      drop.style.opacity = `${Math.random() * 0.3 + 0.1}`;

      rainRef.current?.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 1000);
    };

    const interval = setInterval(createRainDrop, 50);
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
