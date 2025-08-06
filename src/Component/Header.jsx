import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Box } from "@react-three/drei";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import emailjs from '@emailjs/browser';

// 3D Floating Elements Component
function FloatingElements() {
  const elements = useRef([]);
  useFrame((state) => {
    elements.current.forEach((element, index) => {
      if (element) {
        element.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.5;
        element.rotation.y = Math.cos(state.clock.elapsedTime + index) * 0.5;
        element.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 2;
      }
    });
  });
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Box
            ref={(el) => (elements.current[i] = el)}
            args={[0.2, 0.2, 0.2]}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 20
            ]}
          >
            <meshStandardMaterial
              color={`hsl(${200 + i * 30}, 70%, 60%)`}
              transparent
              opacity={0.6}
            />
          </Box>
        </Float>
      ))}
    </>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingElements />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

function Header() {
  const headerRef = useRef();
  const svgRef = useRef();
  // Typewriter effect state
  const texts = [
    'Muhammad Bahawal',
    'MERN Stack Developer',
    'AI Agentic Developer'
  ];
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // for animation
  const modalRef = useRef();
  const [hireForm, setHireForm] = useState({ name: '', email: '', contact: '', description: '' });
  const [hireError, setHireError] = useState('');
  const [hireSuccess, setHireSuccess] = useState(false);
  const [hireSending, setHireSending] = useState(false);

  useEffect(() => {
    let timer;
    const currentText = texts[textIndex];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1200;
    const pauseAfterDeleting = 500;

    if (typing) {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          timer = setTimeout(() => setCharIndex(charIndex + 1), typingSpeed);
        } else {
          setDisplayText(currentText);
          timer = setTimeout(() => {
            setIsDeleting(true);
            setTyping(false);
          }, pauseAfterTyping);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          timer = setTimeout(() => setCharIndex(charIndex - 1), deletingSpeed);
        } else {
          setDisplayText('');
          timer = setTimeout(() => {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
            setTyping(false);
          }, pauseAfterDeleting);
        }
      }
    } else {
      // Pause before next typing or deleting
      timer = setTimeout(() => setTyping(true), 50);
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, typing, texts]);

  useEffect(() => {
    // Animate the SVG path around the image
    const svgPath = svgRef.current;
    if (svgPath) {
      gsap.to(svgPath, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    // Animate text elements
    const tl = gsap.timeline();
    tl.fromTo(
      ".profile-image",
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".typewriter-text",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".description-text",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
    )
    .fromTo(
      ".social-icons",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2"
    );
  }, []);

  // Animate modal open/close
  useEffect(() => {
    if (showContactModal) {
      setModalVisible(true);
    }
  }, [showContactModal]);

  useEffect(() => {
    if (modalVisible && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: -100, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [modalVisible]);

  const closeModalAnimated = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          setModalVisible(false);
          setShowContactModal(false);
        }
      });
    } else {
      setModalVisible(false);
      setShowContactModal(false);
    }
  };

  const handleHireChange = e => {
    setHireForm({ ...hireForm, [e.target.name]: e.target.value });
    setHireError('');
  };
  const handleHireSubmit = async e => {
    e.preventDefault();
    if (!hireForm.name || !hireForm.email || !hireForm.description) {
      setHireError('Please fill in all required fields.');
      return;
    }
    if (!hireForm.email.match(/^\S+@\S+\.\S+$/)) {
      setHireError('Please enter a valid email address.');
      return;
    }
    setHireSending(true);
    setHireError('');
    try {
      await emailjs.send(
        'service_5fee6mb',
        'template_vg8yvg8',
        {
          from_name: hireForm.name,
          from_email: hireForm.email,
          contact: hireForm.contact,
          description: hireForm.description,
        },
        'coqd8TXoL3rGNrfy_'
      );
      setHireSuccess(true);
      setTimeout(() => {
        setShowContactModal(false);
        setHireSuccess(false);
        setHireForm({ name: '', email: '', contact: '', description: '' });
      }, 1800);
    } catch (err) {
      setHireError('Failed to send. Please try again.');
    } finally {
      setHireSending(false);
    }
  };

  return (
    <section ref={headerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Profile Image with Animated SVG */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              {/* Animated SVG circle around the image */}
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 300 300"
              >
                <circle
                  ref={svgRef}
                  cx="150"
                  cy="150"
                  r="140"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray="879.6"
                  strokeDashoffset="879.6"
                  className="animate-spin-slow"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Profile Image */}
              <div className="profile-image relative z-10">
                <img
                  src="./public/mypic.jpg"
                  alt="Muhammad Bahawal"
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl"
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    e.target.style.display = 'none';
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 border-4 border-purple-500/30 shadow-2xl flex items-center justify-center text-white text-4xl font-bold';
                    fallbackDiv.textContent = 'MB';
                    e.target.parentNode.appendChild(fallbackDiv);
                  }}
                />
              </div>
              {/* Floating particles around the image */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                    style={{
                      top: `${20 + (i * 15)}%`,
                      left: `${10 + (i * 20)}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          {/* Right side - Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="space-y-6">
              {/* Typewriter Effect for Name and Titles */}
              <div className="typewriter-text">
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent min-h-[5rem] lg:min-h-[7rem] flex items-center justify-center lg:justify-start">
                  {displayText}
                  <span className="animate-pulse">|</span>
          </h1>
              </div>
              {/* Description */}
              <p className="description-text text-lg lg:text-xl text-gray-300 leading-relaxed">
                Crafting innovative digital solutions with cutting-edge technologies. 
                Specializing in full-stack development and artificial intelligence applications.
              </p>
        {/* Social Icons */}
              <div className="social-icons flex justify-center lg:justify-start gap-6 pt-4">
                <a href="https://github.com/muhammadbahawal" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaGithub />
          </a>
                <a href="https://www.linkedin.com/in/muhammadbahawal/" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaLinkedin />
          </a>
                <a href="https://x.com/Bahawal_Trainer" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaXTwitter />
          </a>
                <a href="https://www.youtube.com/@MuhammadBahawalOfficial" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
            <FaYoutube />
          </a>
        </div>
        {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                <button
                  className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  onClick={() => setShowContactModal(true)}
                >
            Hire Me
          </button>
          <Link to="/blog" className="px-8 py-2 border-2 border-purple-500 text-purple-400 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105">
            Read My Blog
          </Link>
        </div>
      </div>
          </div>
        </div>
      </div>
      {/* Custom Hire Me Modal */}
      {showContactModal && modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in"
          onClick={e => {
            if (e.target === e.currentTarget) closeModalAnimated();
          }}
        >
          <div
            ref={modalRef}
            className="w-full min-w-[280px] max-w-md bg-gray-900 rounded-2xl shadow-2xl px-4 py-6 sm:px-8 sm:py-8 border border-purple-700/40 relative flex flex-col gap-4 overflow-auto justify-center items-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <button
              onClick={closeModalAnimated}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold px-2 z-10"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-purple-400 mb-2">Hire Me</h2>
            {hireSuccess ? (
              <div className="text-green-400 text-center py-8 text-xl font-semibold">Thank you! I will contact you soon.</div>
            ) : (
              <form onSubmit={handleHireSubmit} className="w-full flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={hireForm.name}
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={hireForm.email}
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={hireForm.contact}
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Project Description *</label>
                  <textarea
                    name="description"
                    value={hireForm.description}
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
                    required
                  />
                </div>
                {hireError && <p className="text-red-400 text-sm mt-1">{hireError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg mt-2 disabled:opacity-60"
                  disabled={hireSending}
                >
                  {hireSending ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
          <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.3s ease; }
          `}</style>
        </div>
      )}
    </section>
  );
}

export default Header;
