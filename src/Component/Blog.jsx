import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { FaArrowLeft, FaCalendar, FaUser, FaTags, FaEye } from "react-icons/fa";
import { useAdmin } from "../context/AdminContext";

function Blog() {
  const { blogs, blogCategories } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const sectionRef = useRef();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  
  // Filter only published blogs
  const publishedBlogs = blogs.filter(blog => blog.published);
  
  // Generate categories from published blogs
  const categories = publishedBlogs.length > 0
    ? ["All", ...new Set(publishedBlogs.map(post => post.category))]
    : ["All"];

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll('.blog-card');
    gsap.fromTo(elements, 
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 }
    );
  }, [selectedCategory]);

  const filteredPosts = selectedCategory === "All" 
    ? publishedBlogs 
    : publishedBlogs.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeError("");
    setSubscribeSuccess(false);
    // Simple email validation
    if (!subscribeEmail.match(/^\S+@\S+\.\S+$/)) {
      setSubscribeError("Please enter a valid email address.");
      return;
    }
    setSubscribeSuccess(true);
    setTimeout(() => {
      setShowSubscribeModal(false);
      setSubscribeSuccess(false);
      setSubscribeEmail("");
    }, 1800);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <FaArrowLeft />
            Back to Blog
          </button>
          
          <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-xl mb-8"
            />
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <FaCalendar />
                {formatDate(selectedPost.date)}
              </span>
              <span className="flex items-center gap-1">
                <FaUser />
                {selectedPost.author}
              </span>
              <span>{selectedPost.readTime}</span>
              <span className="flex items-center gap-1">
                <FaEye />
                {selectedPost.views} views
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPost.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                {selectedPost.content}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                This is a detailed blog post about {selectedPost.title.toLowerCase()}. 
                The content would continue with comprehensive information, code examples, 
                and practical insights about the topic.
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
            <FaArrowLeft />
            Back to Portfolio
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
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

        {/* Blog Posts Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600/80 text-white rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FaCalendar />
                    {formatDate(post.date)}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {post.views} views
                  </span>
                </div>
              </div>
            </article>
          ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-12 border border-gray-700/50">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  {selectedCategory === "All" 
                    ? "No published blog posts available. Check back soon for new content!"
                    : `No published blog posts in the "${selectedCategory}" category.`
                  }
                </p>
                {selectedCategory !== "All" && (
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6">
              Get notified when I publish new articles about web development and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                value={subscribeEmail}
                onChange={e => setSubscribeEmail(e.target.value)}
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                onClick={() => setShowSubscribeModal(true)}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Subscribe Modal */}
        {showSubscribeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-purple-700/40 relative animate-slide-in">
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold px-2"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Subscribe to Newsletter</h3>
              {subscribeSuccess ? (
                <div className="text-green-400 text-center py-8 text-xl font-semibold">Thank you for subscribing!</div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={subscribeEmail}
                      onChange={e => setSubscribeEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    {subscribeError && <p className="text-red-400 text-sm mt-1">{subscribeError}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg mt-2"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
            <style>{`
              @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
              .animate-fade-in { animation: fade-in 0.3s ease; }
              @keyframes slide-in { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
              .animate-slide-in { animation: slide-in 0.4s cubic-bezier(.4,2,.6,1) both; }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog; 