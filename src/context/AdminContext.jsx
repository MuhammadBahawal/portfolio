import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

// Create the context
const AdminContext = createContext();

// Hook to use the context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Real-time user tracking utilities
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const getActiveSessions = () => {
  const sessions = localStorage.getItem('active_sessions');
  return sessions ? JSON.parse(sessions) : {};
};

const updateActiveSessions = (sessionId, isActive = true) => {
  const sessions = getActiveSessions();
  const now = Date.now();
  
  if (isActive) {
    sessions[sessionId] = now;
  } else {
    delete sessions[sessionId];
  }
  
  // Clean up old sessions (older than 5 minutes)
  const fiveMinutesAgo = now - (5 * 60 * 1000);
  Object.keys(sessions).forEach(key => {
    if (sessions[key] < fiveMinutesAgo) {
      delete sessions[key];
    }
  });
  
  localStorage.setItem('active_sessions', JSON.stringify(sessions));
  return Object.keys(sessions).length;
};

// Provider component
export const AdminProvider = ({ children }) => {
  // Load from localStorage or use data from portfolioData file
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem('portfolio_projects');
    return stored ? JSON.parse(stored) : portfolioData.projects;
  });

  const [certificates, setCertificates] = useState(() => {
    const stored = localStorage.getItem('portfolio_certificates');
    return stored ? JSON.parse(stored) : portfolioData.certificates;
  });

  const [blogs, setBlogs] = useState(() => {
    const stored = localStorage.getItem('portfolio_blogs');
    return stored ? JSON.parse(stored) : portfolioData.blogs;
  });

  const [blogCategories, setBlogCategories] = useState(() => {
    const stored = localStorage.getItem('portfolio_blog_categories');
    return stored ? JSON.parse(stored) : portfolioData.blogCategories;
  });

  // Analytics state
  const [analytics, setAnalytics] = useState(() => {
    const stored = localStorage.getItem('portfolio_analytics');
    return stored ? JSON.parse(stored) : portfolioData.analytics;
  });

  // Real-time user tracking state
  const [liveUsers, setLiveUsers] = useState(0);
  const [sessionId, setSessionId] = useState('');

  // Initialize session tracking
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    
    // Update active sessions and get current count
    const currentUsers = updateActiveSessions(newSessionId, true);
    setLiveUsers(currentUsers);
    
    // Update analytics with live user count
    setAnalytics(prev => ({
      ...prev,
      onlineUsers: currentUsers
    }));

    // Set up periodic updates for live user count
    const interval = setInterval(() => {
      const currentUsers = updateActiveSessions(newSessionId, true);
      setLiveUsers(currentUsers);
      setAnalytics(prev => ({
        ...prev,
        onlineUsers: currentUsers
      }));
    }, 30000); // Update every 30 seconds

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      updateActiveSessions(newSessionId, false);
    };
  }, []);

  // Handle page visibility changes to update session status
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, mark session as inactive
        updateActiveSessions(sessionId, false);
      } else {
        // Page is visible again, mark session as active
        const currentUsers = updateActiveSessions(sessionId, true);
        setLiveUsers(currentUsers);
        setAnalytics(prev => ({
          ...prev,
          onlineUsers: currentUsers
        }));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sessionId]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('portfolio_blog_categories', JSON.stringify(blogCategories));
  }, [blogCategories]);

  useEffect(() => {
    localStorage.setItem('portfolio_analytics', JSON.stringify(analytics));
  }, [analytics]);

  // Increment site visits on mount
  useEffect(() => {
    setAnalytics(prev => ({
      ...prev,
      siteVisits: prev.siteVisits + 1
    }));
  }, []);

  // CRUD operations for projects
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      technologies: typeof project.technologies === 'string' 
        ? project.technologies.split(',').map(tech => tech.trim())
        : project.technologies
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? {
            ...updatedProject,
            id,
            technologies: typeof updatedProject.technologies === 'string'
              ? updatedProject.technologies.split(',').map(tech => tech.trim())
              : updatedProject.technologies
          }
        : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // CRUD operations for certificates
  const addCertificate = (certificate) => {
    const newCertificate = {
      ...certificate,
      id: Date.now(),
      name: certificate.title, // For compatibility with certificates component
      image: certificate.file || certificate.image
    };
    setCertificates(prev => [...prev, newCertificate]);
  };

  const updateCertificate = (id, updatedCertificate) => {
    setCertificates(prev => prev.map(certificate => 
      certificate.id === id 
        ? {
            ...updatedCertificate,
            id,
            name: updatedCertificate.title,
            image: updatedCertificate.file || updatedCertificate.image
          }
        : certificate
    ));
  };

  const deleteCertificate = (id) => {
    setCertificates(prev => prev.filter(certificate => certificate.id !== id));
  };

  // CRUD operations for blogs
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: Date.now(),
      date: blog.date || new Date().toISOString().slice(0, 10),
      tags: typeof blog.tags === 'string' 
        ? blog.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : blog.tags
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === id 
        ? {
            ...updatedBlog,
            id,
            tags: typeof updatedBlog.tags === 'string'
              ? updatedBlog.tags.split(',').map(tag => tag.trim()).filter(Boolean)
              : updatedBlog.tags
          }
        : blog
    ));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  const toggleBlogPublish = (id) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === id ? { ...blog, published: !blog.published } : blog
    ));
  };

  // Category management functions
  const addBlogCategory = (category) => {
    if (!blogCategories.includes(category)) {
      setBlogCategories(prev => [...prev, category]);
    }
  };

  const updateBlogCategory = (oldCategory, newCategory) => {
    setBlogCategories(prev => prev.map(cat => cat === oldCategory ? newCategory : cat));
    // Update all blogs that use this category
    setBlogs(prev => prev.map(blog => 
      blog.category === oldCategory ? { ...blog, category: newCategory } : blog
    ));
  };

  const deleteBlogCategory = (category) => {
    setBlogCategories(prev => prev.filter(cat => cat !== category));
    // Set blogs with this category to "Uncategorized"
    setBlogs(prev => prev.map(blog => 
      blog.category === category ? { ...blog, category: "Uncategorized" } : blog
    ));
  };

  // Update analytics
  const updateAnalytics = (newAnalytics) => {
    setAnalytics(prev => ({ ...prev, ...newAnalytics }));
  };

  // Export current data for persistence
  const exportData = () => {
    const currentData = {
      projects,
      certificates,
      blogs,
      blogCategories,
      analytics
    };
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const value = {
    // Data
    projects,
    certificates,
    blogs,
    blogCategories,
    analytics,
    
    // Project operations
    addProject,
    updateProject,
    deleteProject,
    
    // Certificate operations
    addCertificate,
    updateCertificate,
    deleteCertificate,
    
    // Blog operations
    addBlog,
    updateBlog,
    deleteBlog,
    toggleBlogPublish,
    
    // Blog category operations
    addBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    
    // Analytics operations
    updateAnalytics,
    
    // Export function
    exportData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};