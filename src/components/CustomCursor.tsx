import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className="w-full h-full rounded-full bg-primary/60 blur-sm" />
      </div>
      
      {/* Cursor trail */}
      <div
        className="fixed w-8 h-8 pointer-events-none z-40 transition-all duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary/30" />
      </div>
    </>
  );
};

export default CustomCursor;
