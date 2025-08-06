import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [hoverContent, setHoverContent] = useState(null);

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-b from-purple-900 to-black py-20 px-6 text-white flex justify-center items-center relative overflow-hidden"
    >
      {/* 🔥 Floating Center Popup for Any Hovered Element */}
      <AnimatePresence>
        {hoverContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md px-12 py-6 rounded-xl border border-white/30 shadow-2xl max-w-xl text-center"
          >
            <p className="text-xl md:text-2xl font-semibold text-green-300">{hoverContent}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👇 Main Glass Card Section */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-10 w-full max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-400 mb-10">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Side - Name */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3
              className="text-2xl font-bold cursor-pointer text-white transition hover:text-green-400"
              onMouseEnter={() => setHoverContent("Muhammad Bahawal")}
              onMouseLeave={() => setHoverContent(null)}
            >
              Muhammad Bahawal
            </h3>
            <p
              className="text-green-300 text-lg cursor-pointer"
              onMouseEnter={() => setHoverContent("MERN Stack Developer")}
              onMouseLeave={() => setHoverContent(null)}
            >
              MERN Stack Developer
            </p>
          </div>

          {/* Right Side - Paragraphs */}
          <div className="md:w-1/2 text-gray-300 space-y-4 text-base">
            <p
              className="cursor-pointer hover:text-green-300 transition duration-300"
              onMouseEnter={() =>
                setHoverContent(
                  "I build clean, scalable, and intelligent web apps using the MERN stack."
                )
              }
              onMouseLeave={() => setHoverContent(null)}
            >
              I'm a full-stack developer passionate about building clean, scalable, and intelligent
              web apps using the MERN stack.
            </p>
            <p
              className="cursor-pointer hover:text-green-300 transition duration-300"
              onMouseEnter={() =>
                setHoverContent(
                  "I aim to develop tools that are fast, smart, and beautiful — blending frontend, backend, and AI."
                )
              }
              onMouseLeave={() => setHoverContent(null)}
            >
              Whether it's frontend, backend, or AI, I aim to develop tools that make work easier,
              smarter, and faster — with performance and beauty in mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
