import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Initial data
const initialProjects = [
  {
    id: 1,
    title: 'Tech Hub Institute',
    description: 'A comprehensive educational platform for tech learning and skill development.',
    image: './public/projects/tech hub tech institute  .png',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/bahawal/tech-hub',
    price: '$299'
  },
  {
    id: 2,
    title: 'Hypernexis Software House',
    description: 'Professional software development company website with modern design.',
    image: '/src/projects/hypernexis software house .png',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://github.com/bahawal/hypernexis',
    price: '$499'
  },
  {
    id: 3,
    title: 'Cravy Crunch Restaurant',
    description: 'Restaurant website with online ordering and menu management system.',
    image: '/src/projects/cravy crunch restourent .png',
    technologies: ['React', 'Express', 'MySQL'],
    link: 'https://github.com/bahawal/cravy-crunch',
    price: '$399'
  },
  {
    id: 4,
    title: 'Teqtronics',
    description: 'Technology company website showcasing innovative solutions and services.',
    image: '/src/projects/teqtronics.png',
    technologies: ['React', 'Three.js', 'GSAP'],
    link: 'https://github.com/bahawal/teqtronics',
    price: '$450'
  },
  {
    id: 5,
    title: 'Color-On',
    description: 'Creative design and branding platform with interactive color tools.',
    image: '/src/projects/color-on.png',
    technologies: ['React', 'Canvas API', 'CSS3'],
    link: 'https://github.com/bahawal/color-on',
    price: '$350'
  }
];

const initialCertificates = [
  { id: 1, title: "Python Basic", name: "Python Basic", file: "pyton basic certificate.pdf", category: "Programming", issuer: "Coursera", date: "2024", description: "Basic Python programming fundamentals" },
  { id: 2, title: "Python Data Structure", name: "Python Data Structure", file: "python data structure certificate.pdf", category: "Programming", issuer: "Coursera", date: "2024", description: "Advanced Python data structures and algorithms" },
  { id: 3, title: "Deep Learning AI", name: "Deep Learning AI", file: "deep learning ai.pdf", category: "AI/ML", issuer: "DeepLearning.AI", date: "2024", description: "Comprehensive deep learning course covering neural networks and AI applications" },
  { id: 4, title: "Web Development", name: "Web Development", file: "Web development certificate.jpg", category: "Web Development", issuer: "FreeCodeCamp", date: "2024", description: "Full stack web development certification" },
  { id: 5, title: "SEO", name: "SEO", file: "Seo.pdf", category: "Digital Marketing", issuer: "Google", date: "2024", description: "Search Engine Optimization fundamentals" },
  { id: 6, title: "Digital Marketing", name: "Digital Marketing", file: "digital markiting.pdf", category: "Digital Marketing", issuer: "Google", date: "2024", description: "Google Digital Marketing certification" },
  { id: 7, title: "Freelancer", name: "Freelancer", file: "freelancer.pdf", category: "Business", issuer: "Upwork", date: "2024", description: "Professional freelancing and business development" },
  { id: 8, title: "E-commerce Management", name: "E-commerce Management", file: "E-commerce management.pdf", category: "Business", issuer: "Shopify", date: "2024", description: "E-commerce store management and optimization" },
  { id: 9, title: "React", name: "React", file: "React certificate.pdf", category: "Web Development", issuer: "Meta", date: "2024", description: "Advanced React development and best practices" }
];

const initialBlogs = [];

const initialBlogCategories = [
  "Web Development",
  "AI/ML", 
  "Animation",
  "Performance",
  "Backend",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Database",
  "DevOps",
  "UI/UX"
];

// Provider component
export const AdminProvider = ({ children }) => {
  // Load from localStorage or use initial data
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem('portfolio_projects');
    return stored ? JSON.parse(stored) : initialProjects;
  });

  const [certificates, setCertificates] = useState(() => {
    const stored = localStorage.getItem('portfolio_certificates');
    return stored ? JSON.parse(stored) : initialCertificates;
  });

  const [blogs, setBlogs] = useState(() => {
    const stored = localStorage.getItem('portfolio_blogs');
    return stored ? JSON.parse(stored) : initialBlogs;
  });

  const [blogCategories, setBlogCategories] = useState(() => {
    const stored = localStorage.getItem('portfolio_blog_categories');
    return stored ? JSON.parse(stored) : initialBlogCategories;
  });

  // Analytics state
  const [analytics, setAnalytics] = useState(() => {
    const stored = localStorage.getItem('portfolio_analytics');
    return stored ? JSON.parse(stored) : {
      siteVisits: 1250,
      onlineUsers: 3,
      monthlyGrowth: {
        projects: 12,
        blogs: 7,
        visits: 89,
        certificates: 5
      }
    };
  });

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
    updateAnalytics
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};