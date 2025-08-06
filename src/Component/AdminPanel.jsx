import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaSave, FaTimes, FaSignOutAlt, FaUserShield, FaLock, FaFileUpload, FaCog, FaChartLine, FaUsers, FaBlog, FaCertificate, FaProjectDiagram, FaBell, FaSearch } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAdmin } from '../context/AdminContext';

// Admin credentials stored in localStorage with proper encryption simulation
const getStoredCredentials = () => {
  const stored = localStorage.getItem('adminCredentials');
  return stored ? JSON.parse(stored) : { username: 'admin', password: 'admin123' };
};

const saveCredentials = (username, password) => {
  localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
};

// Helper to convert file to data URL
const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Remove the static BLOG_CATEGORIES since we're using dynamic categories from context

const AdminPanel = () => {
  // Get data and functions from AdminContext
  const {
    projects,
    certificates,
    blogs,
    blogCategories,
    analytics,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addBlog,
    updateBlog,
    deleteBlog,
    toggleBlogPublish,
    addBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    exportData
  } = useAdmin();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  // Admin panel state
  const [activeTab, setActiveTab] = useState('projects');

  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    link: '',
    file: '', // For certificates
    fileName: '' // For certificates
  });

  const [blogForm, setBlogForm] = useState({
    id: null,
    title: '',
    content: '',
    excerpt: '',
    category: blogCategories[0] || 'Web Development',
    tags: '',
    image: '',
    date: '',
    published: false
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [blogImagePreview, setBlogImagePreview] = useState('');
  
  // Category management state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '' });

  // Check authentication on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('adminAuthToken');
    const authTime = localStorage.getItem('adminAuthTime');
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (authToken && authTime && (Date.now() - parseInt(authTime) < sessionDuration)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('adminAuthToken');
      localStorage.removeItem('adminAuthTime');
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = getStoredCredentials();
    
    if (
      loginData.username === credentials.username &&
      loginData.password === credentials.password
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      // Store auth token and time for session management
      localStorage.setItem('adminAuthToken', 'authenticated');
      localStorage.setItem('adminAuthTime', Date.now().toString());
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  // Handle change password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePasswordError('');
    
    const credentials = getStoredCredentials();
    
    if (changePasswordData.currentPassword !== credentials.password) {
      setChangePasswordError('Current password is incorrect.');
      return;
    }
    
    if (changePasswordData.newPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters long.');
      return;
    }
    
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setChangePasswordError('New passwords do not match.');
      return;
    }
    
    // Save new password
    saveCredentials(credentials.username, changePasswordData.newPassword);
    setChangePasswordSuccess(true);
    
    setTimeout(() => {
      setShowChangePasswordModal(false);
      setChangePasswordSuccess(false);
      setChangePasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 2000);
  };

  // Forgot password logic (simulated)
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess(false);
    if (!forgotEmail.match(/^\S+@\S+\.\S+$/)) {
      setForgotError('Please enter a valid email address.');
      return;
    }
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2000);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
    setLoginError('');
    // Clear auth session
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('adminAuthTime');
  };

  // CRUD Handlers (same as before)
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
      link: item.link || '',
      file: item.image, // For certificates
      fileName: item.image.split('/').pop() // For certificates
    });
  };

  const handleSave = () => {
    if (editingItem) {
      const updatedData = {
        ...editingItem,
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        image: formData.image,
        file: formData.file
      };

      if (activeTab === 'projects') {
        updateProject(editingItem.id, updatedData);
      } else {
        updateCertificate(editingItem.id, updatedData);
      }
    } else if (isAdding) {
      const newItem = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        image: formData.image,
        file: formData.file
      };

      if (activeTab === 'projects') {
        addProject(newItem);
      } else {
        addCertificate(newItem);
      }
    }

    setEditingItem(null);
    setIsAdding(false);
    setFormData({ title: '', description: '', image: '', technologies: '', link: '', file: '', fileName: '' });
  };

  const handleDelete = (id) => {
    if (activeTab === 'projects') {
      deleteProject(id);
    } else {
      deleteCertificate(id);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({ title: '', description: '', image: '', technologies: '', link: '', file: '', fileName: '' });
  };

  // Add file upload to formData
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setFormData({
      ...formData,
      image: dataUrl,
      file: dataUrl, // for certificates
      fileName: file.name
    });
  };



  // --- Blog CRUD logic ---
  const handleBlogImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBlogForm({ ...blogForm, image: ev.target.result });
      setBlogImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleBlogChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };
  const handleAddBlog = () => {
    setIsAddingBlog(true);
    setEditingBlog(null);
    setBlogForm({
      id: null,
      title: '',
      content: '',
      excerpt: '',
      category: BLOG_CATEGORIES[0],
      tags: '',
      image: '',
      date: '',
      published: false
    });
    setBlogImagePreview('');
  };
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsAddingBlog(true);
    setBlogForm({ ...blog, tags: blog.tags ? blog.tags.join(', ') : '' });
    setBlogImagePreview(blog.image);
  };
  const handleSaveBlog = () => {
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      date: blogForm.date || new Date().toISOString().slice(0, 10)
    };
    
    if (editingBlog) {
      updateBlog(blogForm.id, blogData);
    } else {
      addBlog(blogData);
    }
    setIsAddingBlog(false);
    setEditingBlog(null);
    setBlogForm({ id: null, title: '', content: '', excerpt: '', category: BLOG_CATEGORIES[0], tags: '', image: '', date: '', published: false });
    setBlogImagePreview('');
  };
  const handleDeleteBlog = (id) => {
    deleteBlog(id);
  };
  const handlePublishBlog = (id) => {
    toggleBlogPublish(id);
  };
  const handleCancelBlog = () => {
    setIsAddingBlog(false);
    setEditingBlog(null);
    setBlogForm({ id: null, title: '', content: '', excerpt: '', category: blogCategories[0] || 'Web Development', tags: '', image: '', date: '', published: false });
    setBlogImagePreview('');
  };

  // Category management functions
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '' });
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = () => {
    if (categoryForm.name.trim()) {
      if (editingCategory) {
        updateBlogCategory(editingCategory, categoryForm.name.trim());
      } else {
        addBlogCategory(categoryForm.name.trim());
      }
      setShowCategoryModal(false);
      setCategoryForm({ name: '' });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"? Blogs in this category will be moved to "Uncategorized".`)) {
      deleteBlogCategory(category);
    }
  };

  const handleCancelCategory = () => {
    setShowCategoryModal(false);
    setCategoryForm({ name: '' });
    setEditingCategory(null);
  };

  // Render login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-md border border-purple-700/40 relative"
        >
          <div className="flex flex-col items-center mb-8">
            <FaUserShield className="text-5xl text-purple-500 mb-2" />
            <h2 className="text-3xl font-bold text-white mb-1">Admin Login</h2>
            <p className="text-gray-400">Enter your admin credentials</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={loginData.username}
              onChange={e => setLoginData({ ...loginData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
              autoFocus
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
              required
            />
          </div>
          {loginError && <div className="mb-2 text-red-400 text-center">{loginError}</div>}
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              className="text-sm text-blue-400 hover:underline focus:outline-none"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg"
          >
            Login
          </button>
        </form>
        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={e => { if (e.target === e.currentTarget) setShowForgotModal(false); }}>
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-purple-700/40 relative animate-slide-in flex flex-col gap-4 overflow-auto justify-center items-center">
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold px-2 z-10"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2"><FaLock /> Forgot Password</h3>
              {forgotSuccess ? (
                <div className="text-green-400 text-center py-8 text-lg font-semibold">A reset link has been sent to your email (simulated).</div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="w-full flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Admin Email</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  {forgotError && <p className="text-red-400 text-sm mt-1">{forgotError}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg mt-2"
                  >
                    Send Reset Link
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
        
        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in" onClick={e => { if (e.target === e.currentTarget) setShowChangePasswordModal(false); }}>
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-purple-700/40 relative animate-slide-in flex flex-col gap-4 overflow-auto justify-center items-center">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold px-2 z-10"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2"><FaLock /> Change Password</h3>
              {changePasswordSuccess ? (
                <div className="text-green-400 text-center py-8 text-lg font-semibold">Password changed successfully!</div>
              ) : (
                <form onSubmit={handleChangePassword} className="w-full flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      value={changePasswordData.currentPassword}
                      onChange={e => setChangePasswordData({...changePasswordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      value={changePasswordData.newPassword}
                      onChange={e => setChangePasswordData({...changePasswordData, newPassword: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={changePasswordData.confirmPassword}
                      onChange={e => setChangePasswordData({...changePasswordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  {changePasswordError && <p className="text-red-400 text-sm mt-1">{changePasswordError}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg mt-2"
                  >
                    Change Password
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render admin panel
  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Projects Management</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 px-4 py-2 rounded-xl transition-all border border-blue-600/30"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-white">{project.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="w-8 h-8 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="w-8 h-8 flex items-center justify-center bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-lg text-xs font-medium border border-purple-600/30">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1">
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Certificates Management</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-xl transition-all border border-purple-600/30"
        >
          <FaPlus /> Add Certificate
        </button>
      </div>

      <div className="grid gap-4">
        {certificates.map(certificate => (
          <div key={certificate.id} className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-white">{certificate.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(certificate.image, '_blank')}
                  className="w-8 h-8 flex items-center justify-center bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all"
                  title="View Certificate"
                >
                  <FaEye className="text-sm" />
                </button>
                <button
                  onClick={() => handleEdit(certificate)}
                  className="w-8 h-8 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleDelete(certificate.id)}
                  className="w-8 h-8 flex items-center justify-center bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">{certificate.description}</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Issuer: {certificate.issuer}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Date: {certificate.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Update renderForm to use file input and preview
  const renderForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {editingItem ? 'Edit' : 'Add'} {activeTab === 'projects' ? 'Project' : 'Certificate'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white h-24"
              placeholder="Enter project/certificate description..."
            />
          </div>
          {/* File upload for image or certificate */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {activeTab === 'projects' ? 'Project Image' : 'Certificate File (Image or PDF)'}
            </label>
            <input
              type="file"
              accept={activeTab === 'projects' ? 'image/*' : 'image/*,application/pdf'}
              onChange={handleFileChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
            {/* Preview */}
            {formData.image && activeTab === 'projects' && (
              <img src={formData.image} alt="Preview" className="mt-2 rounded shadow max-h-32" />
            )}
            {formData.file && activeTab === 'certificates' && (
              formData.file.startsWith('data:application/pdf') ? (
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-2"><FaFileUpload /> {formData.fileName || 'PDF uploaded'}</div>
              ) : (
                <img src={formData.file} alt="Preview" className="mt-2 rounded shadow max-h-32" />
              )
            )}
          </div>
          {activeTab === 'projects' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            </>
          )}
          {activeTab === 'certificates' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Issuer</label>
                <input
                  type="text"
                  value={formData.issuer || ''}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // --- Blog render ---
  const renderBlogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Blog Management</h3>
        <div className="flex gap-3">
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-xl transition-all border border-purple-600/30"
          >
            <FaPlus /> Manage Categories
          </button>
          <button
            onClick={handleAddBlog}
            className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 px-4 py-2 rounded-xl transition-all border border-green-600/30"
          >
            <FaPlus /> Add Blog
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-white">{blog.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="w-8 h-8 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all"
                >
                  <FaEdit className="text-sm" />
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="w-8 h-8 flex items-center justify-center bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all"
                >
                  <FaTrash className="text-sm" />
                </button>
                <button
                  onClick={() => handlePublishBlog(blog.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${blog.published ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'}`}
                  title={blog.published ? 'Unpublish' : 'Publish'}
                >
                  {blog.published ? 'Published' : 'Draft'}
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {blog.image && <img src={blog.image} alt="Blog" className="w-32 h-20 object-cover rounded-lg" />}
              <div className="flex-1">
                <div className="text-gray-400 text-xs mb-2 flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    {blog.date}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags && blog.tags.map((tag, i) => (
                    <span key={i} className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-lg text-xs font-medium border border-purple-600/30">{tag}</span>
                  ))}
                </div>
                <div className="text-gray-300 mb-2 text-sm leading-relaxed line-clamp-2">{blog.excerpt}</div>
                <div className="text-gray-500 text-xs line-clamp-1">{blog.content.slice(0, 60)}...</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Blog add/edit form ---
  const renderBlogForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{editingBlog ? 'Edit' : 'Add'} Blog</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={blogForm.title}
              onChange={handleBlogChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <input
              type="text"
              name="excerpt"
              value={blogForm.excerpt}
              onChange={handleBlogChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={blogForm.content}
              onChange={handleBlogChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white h-32"
              placeholder="Write your blog content here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={blogForm.category}
              onChange={handleBlogChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            >
              {blogCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={blogForm.tags}
              onChange={handleBlogChange}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBlogImage}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            />
            {blogImagePreview && (
              <img src={blogImagePreview} alt="Preview" className="mt-2 rounded shadow max-h-32" />
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSaveBlog}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={handleCancelBlog}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Sample analytics data for charts
  const visitsData = [
    { name: 'Jan', visits: 1200, projects: 3 },
    { name: 'Feb', visits: 1400, projects: 4 },
    { name: 'Mar', visits: 1100, projects: 2 },
    { name: 'Apr', visits: 1600, projects: 5 },
    { name: 'May', visits: 1800, projects: 6 },
    { name: 'Jun', visits: analytics.siteVisits, projects: projects.length },
  ];

  const contentData = [
    { name: 'Projects', value: projects.length, color: '#3B82F6' },
    { name: 'Blogs', value: blogs.length, color: '#8B5CF6' },
    { name: 'Certificates', value: certificates.length, color: '#F59E0B' },
  ];

  // --- Analytics render ---
  const renderAnalyticsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Projects */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
            <FaProjectDiagram className="text-blue-400 text-xl" />
          </div>
          <div className="text-blue-400 text-sm font-medium">+{analytics.monthlyGrowth.projects}% From last month</div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{projects.length}</div>
        <div className="text-gray-400 text-sm">Total Projects</div>
      </div>
      
      {/* Blog Posts */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
            <FaBlog className="text-purple-400 text-xl" />
          </div>
          <div className="text-purple-400 text-sm font-medium">+{analytics.monthlyGrowth.blogs}% From last month</div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{blogs.length}</div>
        <div className="text-gray-400 text-sm">Blog Posts</div>
      </div>
      
      {/* Site Visits */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
            <FaChartLine className="text-green-400 text-xl" />
          </div>
          <div className="text-green-400 text-sm font-medium">+{analytics.monthlyGrowth.visits}% From last month</div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{analytics.siteVisits.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Site Visits</div>
      </div>
      
      {/* Online Users */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center">
            <FaUsers className="text-cyan-400 text-xl" />
          </div>
          <div className="text-cyan-400 text-sm font-medium">Live</div>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{analytics.onlineUsers}</div>
        <div className="text-gray-400 text-sm">Online Users</div>
      </div>
    </div>
  );

  // Detailed Analytics Tab
  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="text-2xl font-bold text-white mb-6">Analytics Dashboard</div>
      
      {/* Overview Cards */}
      {renderAnalyticsOverview()}
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Visits Trend */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4">Site Visits Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
              <Line type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Distribution */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4">Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {contentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Projects Growth */}
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Monthly Projects Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={visitsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }} 
            />
            <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaUserShield className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-green-600/30"
                title="Export Data"
              >
                <FaFileUpload className="text-sm" /> Export Data
              </button>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-gray-600/30"
                title="Change Password"
              >
                <FaCog className="text-sm" /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm border border-red-600/30"
                title="Logout"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-lg text-gray-300 mb-6">MONDAY, MARCH 24</h2>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Administrator</h1>
        </div>
        {renderAnalyticsOverview()}
        
        {/* Navigation Sidebar and Content */}
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-72 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm h-fit">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'projects'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <FaProjectDiagram className="text-lg" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'certificates'
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <FaCertificate className="text-lg" />
                <span>Certificates</span>
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'blogs'
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <FaBlog className="text-lg" />
                <span>Blog Management</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <FaChartLine className="text-lg" />
                <span>Analytics</span>
              </button>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
              {/* Content */}
              {activeTab === 'projects' && renderProjects()}
              {activeTab === 'certificates' && renderCertificates()}
              {activeTab === 'blogs' && renderBlogs()}
              {activeTab === 'analytics' && renderAnalytics()}
            </div>
          </div>
        </div>
        
        {/* Form Modals */}
        {(editingItem || isAdding) && renderForm()}
        {isAddingBlog && renderBlogForm()}
        
        {/* Category Management Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4 text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ name: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    placeholder="Enter category name"
                    autoFocus
                  />
                </div>
                
                {/* Existing Categories */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Existing Categories</label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {blogCategories.map(category => (
                      <div key={category} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                        <span className="text-white">{category}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="w-6 h-6 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition-all"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="w-6 h-6 flex items-center justify-center bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-all"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveCategory}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  <FaSave /> {editingCategory ? 'Update' : 'Add'} Category
                </button>
                <button
                  onClick={handleCancelCategory}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 