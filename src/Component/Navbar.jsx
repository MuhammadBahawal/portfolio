import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = ({ aboutRef, projectsRef, certificatesRef, contactRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <div className="w-9 h-7 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 text-center font-bold text-white">
            M.B
          </div>
          <span className="text-lg font-semibold">M.Bahawal</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {isHomePage ? (
            <>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection(projectsRef)}
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection(certificatesRef)}
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
              >
                Certificates
              </button>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
              >
                Contact
              </button>
            </>
          ) : (
            <Link to="/" className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
              Back to Portfolio
            </Link>
          )}
          <Link to="/blog" className="text-gray-300 hover:text-white hover:scale-105 transition-all duration-300">
            Blog
          </Link>
        </div>

        {/* Social Icons + Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            <a href="https://github.com/muhammadbahawal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300">
              <FaGithub size={20} />
            </a>
            <a href="https://x.com/Bahawal_Trainer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300">
              <FaXTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/in/muhammadbahawal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300">
              <FaLinkedin size={20} />
            </a>
          </div>
          
          {isHomePage && (
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300"
            >
              Hire Me
            </button>
          )}
          
          <Link to="/admin" className="hidden md:block bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold px-4 py-2 rounded-full hover:from-gray-700 hover:to-gray-800 hover:scale-105 transition-all duration-300">
            Admin
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-purple-400 transition-colors"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50">
          <div className="px-6 py-4 space-y-4">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection(aboutRef)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection(projectsRef)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection(certificatesRef)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Certificates
                </button>
                <button 
                  onClick={() => scrollToSection(contactRef)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2"
                >
                  Contact
                </button>
              </>
            ) : (
              <Link to="/" className="block text-gray-300 hover:text-white py-2">
                Back to Portfolio
              </Link>
            )}
            <Link to="/blog" className="block text-gray-300 hover:text-white py-2">
              Blog
            </Link>
            <Link to="/admin" className="block text-gray-300 hover:text-white py-2">
              Admin
            </Link>
            
            <div className="flex gap-4 pt-4 border-t border-gray-700/50">
              <a href="https://github.com/muhammadbahawal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaGithub size={20} />
              </a>
              <a href="https://x.com/Bahawal_Trainer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/muhammadbahawal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
