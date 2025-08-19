// Portfolio Data - This file can be updated to persist changes across deployments
export const portfolioData = {
  projects: [
    {
      id: 1,
      title: 'Tech Hub Institute',
      description: 'A comprehensive educational platform for tech learning and skill development.',
      image: '/projects/tech hub tech institute  .png',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://techhubsystems.com',
      price: '$299'
    },
    {
      id: 2,
      title: 'Hypernexis Software House',
      description: 'Professional software development company website with modern design.',
      image: '/projects/hypernexis software house .png',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      link: 'https://hypernexis.tech',
      price: '$499'
    },
    {
      id: 3,
      title: 'Cravy Crunch Restaurant',
      description: 'Restaurant website with online ordering and menu management system.',
      image: '/projects/cravy crunch restourent .png',
      technologies: ['React', 'Express', 'MySQL'],
      link: 'https://cravycrunch.co.uk',
      price: '$399'
    },
    {
      id: 4,
      title: 'Teqtronics',
      description: 'Technology company website showcasing innovative solutions and services.',
      image: '/projects/teqtronics.png',
      technologies: ['React', 'Three.js', 'GSAP'],
      link: 'https://teqtronics.com',
      price: '$450'
    },
    {
      id: 5,
      title: 'Color-On',
      description: 'Creative design and branding platform with interactive color tools.',
      image: '/projects/color-on.png',
      technologies: ['React', 'Canvas API', 'CSS3'],
      link: 'https://color-on.in',
      price: '$350'
    }
  ],
  certificates: [
    { id: 1, title: "Python Basic", name: "Python Basic", file: "pyton basic certificate.pdf", category: "Programming", issuer: "Coursera", date: "2024", description: "Basic Python programming fundamentals" },
    { id: 2, title: "Python Data Structure", name: "Python Data Structure", file: "python data structure certificate.pdf", category: "Programming", issuer: "Coursera", date: "2024", description: "Advanced Python data structures and algorithms" },
    { id: 3, title: "Deep Learning AI", name: "Deep Learning AI", file: "deep learning ai.pdf", category: "AI/ML", issuer: "DeepLearning.AI", date: "2024", description: "Comprehensive deep learning course covering neural networks and AI applications" },
    { id: 4, title: "Web Development", name: "Web Development", file: "Web development certificate.jpg", category: "Web Development", issuer: "FreeCodeCamp", date: "2024", description: "Full stack web development certification" },
    { id: 5, title: "SEO", name: "SEO", file: "Seo.pdf", category: "Digital Marketing", issuer: "Google", date: "2024", description: "Search Engine Optimization fundamentals" },
    { id: 6, title: "Digital Marketing", name: "Digital Marketing", file: "digital markiting.pdf", category: "Digital Marketing", issuer: "Google", date: "2024", description: "Google Digital Marketing certification" },
    { id: 7, title: "Freelancer", name: "Freelancer", file: "freelancer.pdf", category: "Business", issuer: "Upwork", date: "2024", description: "Professional freelancing and business development" },
    { id: 8, title: "E-commerce Management", name: "E-commerce Management", file: "E-commerce management.pdf", category: "Business", issuer: "Shopify", date: "2024", description: "E-commerce store management and optimization" },
    { id: 9, title: "React", name: "React", file: "React certificate.pdf", category: "Web Development", issuer: "Meta", date: "2024", description: "Advanced React development and best practices" }
  ],
  blogs: [],
  blogCategories: [
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
  ],
  analytics: {
    siteVisits: 1250,
    onlineUsers: 3,
    monthlyGrowth: {
      projects: 12,
      blogs: 7,
      visits: 89,
      certificates: 5
    }
  }
}; 