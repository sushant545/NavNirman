import React, { useState, useEffect } from 'react';
import { ArrowRight, Anchor, ShieldCheck, Ruler, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Hero from '../components/Hero';
import ConstructionSite from '../components/ConstructionSite';
import ClientLogos from '../components/ClientLogos'; // The new logos section

// UTILS
import { fetchData } from '../utils/sheets';

const Home = () => {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchData('project');
        // Get the first 3 projects for the preview
        if (data && Array.isArray(data)) {
          setRecentProjects(data.slice(0, 3));
        }
      } catch (err) {
        console.warn("Could not load projects, showing default layout.");
      }
    };
    loadProjects();
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      
      {/* 1. HERO CAROUSEL */}
      <Hero />

      {/* 2. COMPACT FEATURES SECTION */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Leading Architects Choose GRC</h2>
          </div>
          
          {/* Compact Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <FeatureCard 
              icon={<ShieldCheck size={32} />} 
              title="High Durability" 
              desc="Resistant to weather, corrosion, and fire." 
            />
            <FeatureCard 
              icon={<Anchor size={32} />} 
              title="Lightweight" 
              desc="Reduces structural load by up to 75%." 
            />
            <FeatureCard 
              icon={<Ruler size={32} />} 
              title="Design Freedom" 
              desc="Moldable into complex, intricate shapes." 
            />
            <FeatureCard 
              icon={<Clock size={32} />} 
              title="Fast Install" 
              desc="Modular systems speed up project timelines." 
            />
          </div>
        </div>
      </section>

      {/* 3. WORKFLOW / 3D ANIMATION SECTION */}
      <section className="bg-white">
         <ConstructionSite />
      </section>

      {/* 4. PORTFOLIO PREVIEW SECTION */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-end mb-10">
           <div>
             <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Our Portfolio</span>
             <h2 className="text-3xl font-bold mt-1">Recent Executions</h2>
           </div>
           <Link to="/projects" className="hidden md:flex items-center gap-2 font-bold border-b-2 border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
             View All Projects <ArrowRight size={18} />
           </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
           {recentProjects.length > 0 ? (
             recentProjects.map((item, index) => (
               <Link to="/projects" key={index} className="group relative h-64 overflow-hidden cursor-pointer block bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all">
                 <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                 
                 <div className="absolute bottom-0 left-0 p-5 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h3 className="text-lg font-bold">{item.name}</h3>
                   <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity delay-100">{item.location || "India"}</p>
                 </div>
               </Link>
             ))
           ) : (
             <div className="col-span-3 text-center py-10 text-gray-400 bg-gray-50 rounded border border-dashed border-gray-200">
               <p>Projects loading...</p>
             </div>
           )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/projects" className="font-bold text-brand-gold text-sm">View All Projects →</Link>
        </div>
      </section>

      {/* 5. CLIENT LOGOS SCROLL (Last Section) */}
      <ClientLogos />

    </div>
  );
};

// --- Sub-Component: Feature Card ---
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-5 rounded-lg border border-transparent hover:border-brand-gold hover:bg-white hover:shadow-lg transition-all duration-300 group text-center md:text-left">
    <div className="text-gray-400 mb-3 group-hover:text-brand-gold transition-colors duration-300 flex justify-center md:justify-start">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 group-hover:text-brand-dark">{title}</h3>
    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

export default Home;