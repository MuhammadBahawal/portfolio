import React, { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const outerRef = useRef(null);
  const requestRef = useRef(null);
  const coords = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      coords.current.x += (target.current.x - coords.current.x) * 0.1;
      coords.current.y += (target.current.y - coords.current.y) * 0.1;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${coords.current.x - 20}px, ${coords.current.y - 20}px)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    const mouseEnter = () => setIsHovering(true);
    const mouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, p, h1, h2, h3, span, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(requestRef.current);
      document.querySelectorAll("a, button, p, h1, h2, h3, span, input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", mouseEnter);
        el.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner Ball (follows directly) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        <div
          className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
            isHovering ? "bg-transparent border border-green-300" : "bg-green-300"
          }`}
        />
      </div>

      {/* Outer Circle (with lag) */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <div
          className={`w-10 h-10 rounded-full border-2 ${
            isHovering ? "border-white opacity-30" : "border-white opacity-40"
          } transition-all duration-300 ease-in-out`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
