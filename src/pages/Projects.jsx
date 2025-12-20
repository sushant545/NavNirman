import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { fetchData } from '../utils/sheets';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData('project');
        if (data) {
          setProjects(data);
          setFilteredProjects(data);
          const uniqueCats = ['All', ...new Set(data.map(item => item.category || 'General'))];
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => (p.category || 'General') === category));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Header Section */}
      <div className="bg-gray-50 pt-32 pb-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 block">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Crafting Landmarks
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Explore our diverse portfolio of Glass Reinforced Concrete executions.
          </p>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="sticky top-24 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex justify-center min-w-max gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-brand-dark text-white border-brand-dark shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:border-brand-gold hover:text-brand-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Uniform Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : (
          // CHANGED: Switched from 'columns-...' (Masonry) to 'grid grid-cols-...' (Uniform Grid)
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

// --- Individual Project Card Component ---
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100"
    >
      {/* CHANGED: 
         1. Added 'h-80' (320px fixed height)
         2. Added 'w-full' and 'object-cover'
         This forces every image to be the exact same rectangle size.
      */}
      <div className="h-80 w-full overflow-hidden">
        <img
          src={project.image_url}
          alt={project.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay (Visible on Hover) */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        
        {/* Category Tag */}
        <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {project.category || 'Architecture'}
        </span>

        {/* Title */}
        <h3 className="text-white text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {project.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-300 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          <MapPin size={14} className="mr-1" />
          {project.location || 'India'}
        </div>

        {/* View Button */}
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
            <span className="text-xs font-bold uppercase">View Details</span>
            <ArrowUpRight size={18} />
        </div>
      </div>
      
      {/* Mobile-Only Info (Bottom Bar) - Ensures title is visible on mobile without hover */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
         <h3 className="text-white font-bold">{project.name}</h3>
      </div>
    </motion.div>
  );
};

export default Projects;