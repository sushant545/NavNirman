import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/sheets';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Assuming you set up a 'projects' tab in your sheet logic
    // For now, we simulate data so the UI works immediately
    const mockProjects = [
      { id: 1, title: "Luxury Villa Facade", location: "New Delhi", image_url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80", description: "Complete GRC cladding solution with roman pillars and cornice molding." },
      { id: 2, title: "Corporate HQ Jali", location: "Gurgaon", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80", description: "High-density intricate jali work for solar shading and aesthetics." },
      { id: 3, title: "Heritage Restoration", location: "Jaipur", image_url: "https://images.unsplash.com/photo-1599639932453-61b6cb135e5d?q=80", description: "Restoring detailed architectural elements using lightweight GRC." }
    ];
    setProjects(mockProjects);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-brand-dark">Our <span className="text-brand-gold">Projects</span></h1>
        
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-xl group">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-brand-gold font-bold uppercase tracking-widest text-sm border-b border-gray-200 pb-2 inline-block">
                  {project.location}
                </div>
                <h2 className="text-4xl font-bold text-brand-dark">{project.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
                <div className="pt-4">
                  <span className="bg-brand-dark text-white px-6 py-3 text-sm font-bold uppercase tracking-wider">
                    View Case Study
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;