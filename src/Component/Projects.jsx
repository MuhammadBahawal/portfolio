import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export default function Projects() {
  const { projects } = useAdmin();
  const [openFormId, setOpenFormId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    info: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenForm = (id) => {
    setOpenFormId(id);
    setFormData({ name: '', contact: '', email: '', info: '' });
    setSubmitted(false);
  };
  const handleCloseForm = () => {
    setOpenFormId(null);
    setSubmitted(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpenFormId(null);
      setSubmitted(false);
    }, 1800);
  };

  return (
    <section className="py-20 px-6 bg-black text-white">
      <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        🚀 My Projects
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div key={proj.id} className="group relative">
            {/* Project Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105">
              {/* Project Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              {/* Project Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-gray-300 mb-4">{proj.description}</p>
                {/* Project Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all duration-300">
                    View Live
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all duration-300"
                    onClick={() => handleOpenForm(proj.id)}
                  >
                    Source
                  </button>
                </div>
              </div>
            </div>
            {/* Animated Form */}
            {openFormId === proj.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-purple-700/40 animate-slide-in">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-bold text-purple-400">Request Source</h4>
                    <button
                      onClick={handleCloseForm}
                      className="text-gray-400 hover:text-white text-2xl font-bold px-2"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mb-4 text-lg text-blue-400 font-semibold">Price: <span className="text-white">{proj.price}</span></div>
                  {submitted ? (
                    <div className="text-green-400 text-center py-8 text-xl font-semibold">Thank you! We received your request.</div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Contact Number</label>
                        <input
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Additional Info / Questions</label>
                        <textarea
                          name="info"
                          value={formData.info}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
                          placeholder="Let us know your requirements or questions..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg mt-2"
                      >
                        Submit Request
                      </button>
                    </form>
                  )}
                </div>
                {/* Animation keyframes */}
                <style>{`
                  @keyframes slide-in {
                    from { opacity: 0; transform: translateY(40px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                  }
                  .animate-slide-in {
                    animation: slide-in 0.4s cubic-bezier(.4,2,.6,1) both;
                  }
                `}</style>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
