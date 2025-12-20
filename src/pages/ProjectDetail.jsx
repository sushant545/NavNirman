import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeft, Building2, User } from 'lucide-react';
import { fetchData } from '../utils/sheets';

const ProjectDetail = () => {
  const { slug } = useParams(); // Get the "vedic-center" part from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to match slug to project name
  const createSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      const data = await fetchData('project');
      
      // Find the project that matches the URL slug
      const found = data.find(p => createSlug(p.name) === slug);
      setProject(found);
      setLoading(false);
    };
    getProject();
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div></div>;
  if (!project) return <div className="h-screen flex flex-col items-center justify-center"><h1>Project Not Found</h1><Link to="/projects" className="text-brand-gold mt-4">Back to Projects</Link></div>;

  // Parsing "site_photos" from the sheet (assuming comma-separated URLs)
  // If your column is named differently, change 'site_photos' below
  const galleryImages = project.site_photos 
    ? project.site_photos.split(',').map(url => url.trim()) 
    : [];

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION (Image + Intro) */}
      <div className="relative h-[60vh] w-full">
        <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-brand-gold mb-6 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="block text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">
            {project.category || "Project Execution"}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-6 text-white/90 text-sm md:text-base">
            <div className="flex items-center"><MapPin size={18} className="mr-2 text-brand-gold" /> {project.location || "India"}</div>
            {/* Assuming 'year' column exists in sheet */}
            <div className="flex items-center"><Calendar size={18} className="mr-2 text-brand-gold" /> Started: {project.year || "2023"}</div>
            {/* Assuming 'client' column exists in sheet */}
            {project.client && <div className="flex items-center"><User size={18} className="mr-2 text-brand-gold" /> {project.client}</div>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
        
        {/* 2. PROJECT OVERVIEW (Left Column) */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-brand-gold sticky top-24">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Building2 className="mr-2 text-brand-dark" /> Project Scope
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {project.description || "Detailed GRC implementation including facade cladding, decorative cornices, and structural column casing."}
            </p>
            
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase text-gray-400">Key Deliverables</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {/* Assuming 'features' column exists, or using defaults */}
                <li className="flex items-start"><span className="text-brand-gold mr-2">•</span> Custom Mould Fabrication</li>
                <li className="flex items-start"><span className="text-brand-gold mr-2">•</span> Structural GRC Installation</li>
                <li className="flex items-start"><span className="text-brand-gold mr-2">•</span> Weather-proof Coating</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. WORKING LOG / SITE PHOTOS (Right Column - Wider) */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Construction Log</h2>
            <div className="h-1 w-20 bg-brand-gold"></div>
            <p className="text-gray-500 mt-4">
              A visual timeline of our work on-site, from initial structural framing to final GRC installation and finishing.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Show Main Image as first item in gallery if no specific site photos */}
            <div className="aspect-video rounded-lg overflow-hidden shadow-md group">
               <img 
                 src={project.image_url} 
                 alt="Main view" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
               />
            </div>

            {/* Map through additional site photos */}
            {galleryImages.length > 0 ? (
              galleryImages.map((img, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-md group">
                  <img 
                    src={img} 
                    alt={`Site work ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
              ))
            ) : (
              // Placeholder if no extra photos exist yet
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                <p className="text-sm">Additional site photos coming soon.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;