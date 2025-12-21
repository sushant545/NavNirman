import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { fetchData } from '../utils/sheets';

// Helper to match the URL slug back to the project name
const createSlug = (name) => {
  if (!name) return 'untitled-project'; 
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findProject = async () => {
      try {
        const data = await fetchData('project');
        if (data) {
          // Find the project that matches the slug
          const found = data.find(p => p.name && createSlug(p.name) === slug);
          setProject(found);
        }
      } catch (err) {
        console.error("Error loading project detail:", err);
      } finally {
        setLoading(false);
      }
    };
    findProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-40">
        <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
        <Link to="/projects" className="text-brand-gold mt-4 hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    // PADDING FIX: pt-48 to clear the large navbar
    <div className="min-h-screen bg-white pt-48 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Navigation */}
        <Link to="/projects" className="inline-flex items-center text-gray-500 hover:text-brand-gold mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px] shadow-2xl">
            <img 
              src={project.image_url} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">
              {project.category || "Architectural GRC"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {project.name}
            </h1>
            
            <div className="flex items-center text-gray-500 mb-8 text-lg">
              <MapPin className="text-brand-gold mr-2" size={20} />
              {project.location || "Location not specified"}
            </div>

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{project.description || "This project represents a milestone in GRC application, showcasing our commitment to structural integrity and aesthetic precision."}</p>
            </div>

            {/* Simple Stats / Metadata if you have columns for them, otherwise static placeholders */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
              <div>
                <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Scope</h4>
                <p className="text-gray-500 text-sm">Design, Production & Installation</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Status</h4>
                <p className="text-green-600 text-sm font-bold flex items-center">
                  <CheckCircle2 size={14} className="mr-1" /> Completed
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;