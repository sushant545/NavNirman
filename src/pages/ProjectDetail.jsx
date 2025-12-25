import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Maximize2, X, Box, User, Building2, Ruler, Calendar, CheckCircle2, Layers, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchData } from '../utils/sheets';

// Helper to create slug
const createSlug = (name) => {
  if (!name) return 'untitled-project'; 
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const findProject = async () => {
      try {
        const data = await fetchData('project');
        if (data) {
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
      <div className="min-h-screen bg-white flex items-center justify-center pt-36">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-36">
        <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
        <Link to="/projects" className="text-brand-gold mt-4 hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  // --- DYNAMIC DATA MAPPING ---
  const overview = {
    client: project.client || "Private Client",
    architect: project.architect || "Design Well India Pvt. Ltd.",
    contractor: project.contractor || "BL Infra Projects",
    area: project.area || "28,500 sq. ft.",
    year: project.year || "2024",
  };

  // Try to read specific columns from sheet, otherwise use default
  const techSpecs = [
    { property: "Material Grade", value: project.spec_grade || "GRC-1200 High Performance" },
    { property: "Panel Thickness", value: project.spec_thickness || "15mm - 25mm (Variable)" },
    { property: "Surface Finish", value: project.spec_finish || "Sandblasted / Acid Etched" },
    { property: "Tensile Strength", value: project.spec_tensile || "> 10 MPa (LOP)" },
    { property: "Fire Rating", value: project.spec_fire || "Class A1 (Non-Combustible)" },
    { property: "Fixing System", value: project.spec_fixing || "Concealed SS304 Anchors" },
  ];

  const productsList = project.products_used 
    ? project.products_used.split(',').map(p => p.trim()) 
    : ["GRC Jali Screens", "Decorative Cornices", "Column Capitals", "3D Cladding Panels"];

  const galleryImages = project.gallery_images 
    ? project.gallery_images.split(',').map(url => url.trim()) 
    : [
       project.image_url,
       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
       "https://images.unsplash.com/photo-1599632890692-7f32f3c02d96?q=80&w=2070"
    ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Navigation */}
        <Link to="/projects" className="inline-flex items-center text-gray-500 hover:text-brand-gold mb-10 transition-colors font-medium group">
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-brand-gold group-hover:text-white transition-all mr-3">
             <ArrowLeft size={18} />
          </div>
          Back to Projects
        </Link>

        {/* 1. TOP SECTION: SPLIT LAYOUT (Image Left / Info Right) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
          
          {/* LEFT: Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] bg-gray-100 group relative">
            <img 
              src={project.image_url} 
              alt={project.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* RIGHT: Header Info */}
          <div className="flex flex-col justify-center">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              {project.category || "Architectural Landmark"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {project.name}
            </h1>
            <div className="flex items-center text-gray-500 text-lg mb-8">
               <MapPin className="text-brand-gold mr-2" size={22} />
               {project.location || "New Delhi, India"}
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 px-5 py-2.5 rounded-full w-fit">
               <CheckCircle2 size={16} /> Project Completed
            </div>
          </div>
        </div>

        {/* 2. MIDDLE CONTENT: Left (About + Products) & Right (Overview Box) */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20 items-start">
          
          {/* LEFT COLUMN (Content) - Spans 8 cols */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About Text with INTRO PARAGRAPH */}
            <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Project</h2>
               <div className="prose prose-lg text-gray-600 leading-relaxed text-justify">
                  {/* Dynamic Intro */}
                  <p className="mb-4">
                    NavNirman is honoured to have been a part of the construction of the iconic <strong>{project.name}</strong>{project.location ? ` in ${project.location}` : ''}. This grand structure is a perfect blend of modern functionality and classical architectural elements, emphasising strength, authority, and professionalism.
                  </p>
                  {/* Original Description from Sheet */}
                  <p>{project.description || "The facade features a blend of classical and modern elements, utilizing high-performance Glass Reinforced Concrete to achieve intricate geometries that traditional materials could not support. Our team worked closely with the architects to ensure every detail, from the structural cladding to the decorative jali work, was executed to perfection."}</p>
               </div>
            </div>

            {/* Products Implemented */}
            <div>
               <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 <Box className="text-brand-gold" size={24} /> Products Implemented
               </h3>
               <div className="grid sm:grid-cols-2 gap-4">
                 {productsList.map((prod, idx) => (
                   <div 
                     key={idx} 
                     className="group relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-gold/30 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-white hover:to-orange-50"
                   >
                     <div className="flex items-center z-10">
                        <div className="h-2 w-2 rounded-full bg-brand-gold mr-4 transition-all duration-300 group-hover:scale-150"></div>
                        <span className="font-bold text-gray-700 text-base group-hover:text-brand-dark transition-colors">{prod}</span>
                     </div>
                     
                     <div className="text-gray-300 transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-gold">
                        <ArrowRight size={18} />
                     </div>
                     
                     <div className="absolute right-0 top-0 h-full w-1 bg-brand-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Sidebar) - Spans 4 cols */}
          <div className="lg:col-span-4">
             <div className="bg-white p-8 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.1)] border border-gray-100 sticky top-40">
               <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 uppercase tracking-wider">
                 Project Overview
               </h3>
               
               <div className="space-y-6">
                 <OverviewItem icon={<User />} label="Client" value={overview.client} />
                 <OverviewItem icon={<Building2 />} label="Architect" value={overview.architect} />
                 <OverviewItem icon={<User />} label="Contractor" value={overview.contractor} />
                 <OverviewItem icon={<Ruler />} label="Total Area" value={overview.area} />
                 <OverviewItem icon={<Calendar />} label="Year" value={overview.year} />
               </div>
             </div>
          </div>

        </div>

        {/* 3. PROJECT SPECIFICATIONS TABLE */}
        <div className="mb-20">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText size={20} className="text-brand-gold" /> Technical Specifications
              </h3>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold hidden sm:block">Detailed Breakdown</span>
            </div>
            
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                      <th className="px-6 py-4">Specification Parameter</th>
                      <th className="px-6 py-4">Value / Standard</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {techSpecs.map((spec, index) => (
                      <tr key={index} className="hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                          <Layers size={14} className="text-brand-gold" /> {spec.property}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PHOTO GALLERY */}
        <div>
           <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-brand-gold pl-4">
             Site Gallery
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
             {galleryImages.map((img, idx) => (
               <div 
                 key={idx} 
                 className={`rounded-lg overflow-hidden cursor-pointer group relative bg-gray-100 ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[400px]' : 'h-[190px]'}`}
                 onClick={() => setSelectedImage(img)}
               >
                 <img 
                   src={img} 
                   alt={`Gallery ${idx}`} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all drop-shadow-md" size={32} />
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full Preview" 
              className="max-w-full max-h-[90vh] rounded shadow-2xl border border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

const OverviewItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="text-brand-gold mt-1 p-2 bg-brand-gold/10 rounded-lg shrink-0">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-gray-900 font-medium leading-tight mt-1">{value}</p>
    </div>
  </div>
);

export default ProjectDetail;