import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  const toggleVisibilityAndRotate = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    setIsVisible(scrollTop > 300);

    const scrollPercent = (scrollTop / maxScroll) * 360;
    setRotation(scrollPercent);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibilityAndRotate);
    return () => window.removeEventListener("scroll", toggleVisibilityAndRotate);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-800 text-white shadow-lg scroll-arrow"
          style={{
            "--rotation": `${rotation}deg`
          }}
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
