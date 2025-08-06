import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaDownload, FaEye, FaTimes } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

function Certificates() {
  const { certificates } = useAdmin();
  const sectionRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.certificate-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 }
    );
  }, []);

  const filteredCerts = selectedCategory === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleDownloadCertificate = (certificate) => {
    const filePath = `/src/certificates/${certificate.file}`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = certificate.file;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const CertificateModal = () => {
    if (!selectedCertificate) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="relative w-full max-w-3xl bg-gray-900 rounded-2xl shadow-2xl border border-purple-700/40 max-h-[90vh] flex flex-col overflow-auto">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold px-2 z-10"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <div className="flex-shrink-0 flex flex-col gap-2 p-6 pb-0">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">{selectedCertificate.name}</h3>
            <span className="text-gray-400 mb-2">Category: {selectedCertificate.category}</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 pt-0 overflow-auto">
            {selectedCertificate.file.endsWith('.pdf') ? (
              <iframe
                src={`/src/certificates/${selectedCertificate.file}`}
                className="w-full h-[60vh] min-h-[300px] border-0 rounded-lg bg-white"
                title={selectedCertificate.name}
              />
            ) : (
              <img
                src={`/src/certificates/${selectedCertificate.file}`}
                alt={selectedCertificate.name}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg bg-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="flex-shrink-0 flex justify-end items-center gap-4 p-6 pt-0 border-t border-gray-700">
            <button
              onClick={() => handleDownloadCertificate(selectedCertificate)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Certificates
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional achievements and certifications.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Programming", "AI/ML", "Web Development", "Digital Marketing", "Business"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((certificate) => (
            <div key={certificate.id} className="certificate-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {certificate.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                    {certificate.category}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewCertificate(certificate)}
                      className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                      title="View Certificate"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleDownloadCertificate(certificate)}
                      className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                      title="Download Certificate"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certificate Modal */}
      {isModalOpen && <CertificateModal />}
    </section>
  );
}

export default Certificates; 