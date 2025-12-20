import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/sheets';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch rows marked as 'project' from your sheet
    fetchData('project').then(data => {
      setProjects(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white min-h-screen pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-brand-dark">Our <span className="text-brand-gold">Projects</span></h1>
        
        {loading ? (
           <div className="text-center py-20 text-xl animate-pulse">Loading Projects...</div>
        ) : (
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-lg shadow-xl group">
                  {project.image_url ? (
                    <img 
                      src={project.image_url} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  {/* Location Tag - Checks 'location' column, falls back to 'category' */}
                  <div className="text-brand-gold font-bold uppercase tracking-widest text-sm border-b border-gray-200 pb-2 inline-block">
                    {project.location || project.category || "India"}
                  </div>
                  
                  {/* Title - Checks 'name' column */}
                  <h2 className="text-4xl font-bold text-brand-dark">
                    {project.name || "Project Title Missing"}
                  </h2>
                  
                  {/* Description - Checks 'description' column */}
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {project.description || "Project details coming soon."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && projects.length === 0 && (
            <div className="text-center text-gray-500">
                No projects found. Check if your sheet has rows with <b>data_type = project</b>.
            </div>
        )}
      </div>
    </div>
  );
};

export default Projects;