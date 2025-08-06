import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./Component/Navbar.jsx";
import Header from "./Component/Header.jsx";
import CustomCursor from "./CustomCursor.jsx";
import About from "./Component/About.jsx";
import Projects from "./Component/Projects.jsx";
import Certificates from "./Component/Certificates.jsx";
import Contact from "./Component/Contact.jsx";
import Blog from "./Component/Blog.jsx";
import AdminPanel from "./Component/AdminPanel.jsx";
import ScrollToTop from "./Component/ScrollToTop.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { gsap } from "gsap";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const certificatesRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize GSAP animations
        gsap.fromTo(
          ".animate-fade-in",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
        
        // Simulate loading time for smooth experience
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        console.error("App Error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Bahawal's Portfolio
          </h1>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white cursor-none scroll-smooth overflow-x-hidden">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={
              <>
                <Navbar 
                  aboutRef={aboutRef} 
                  projectsRef={projectsRef}
                  certificatesRef={certificatesRef}
                  contactRef={contactRef}
                />
                <Header />
                <div ref={aboutRef}>
                  <About />
                </div>
                <div ref={projectsRef}>
                  <Projects />
                </div>
                <div ref={certificatesRef}>
                  <Certificates />
                </div>
                <div ref={contactRef}>
                  <Contact />
                </div>
              </>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <CustomCursor />
          <ScrollToTop />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
