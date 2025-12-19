import React from 'react';
import { ArrowRight, Anchor, ShieldCheck, Ruler, Clock } from 'lucide-react'; // Changed icons
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />

      {/* 4 KEY FEATURES SECTION (Interactive & Colored) */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold">Why Leading Architects Choose GRC</h2>
             <div className="h-1 w-20 bg-brand-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<ShieldCheck size={40} />} 
              title="High Durability" 
              desc="Resistant to weather, corrosion, and fire." 
            />
            <FeatureCard 
              icon={<Anchor size={40} />} 
              title="Lightweight" 
              desc="Reduces structural load by up to 75%." 
            />
            <FeatureCard 
              icon={<Ruler size={40} />} 
              title="Design Freedom" 
              desc="Moldable into complex, intricate shapes." 
            />
            <FeatureCard 
              icon={<Clock size={40} />} 
              title="Fast Install" 
              desc="Modular systems speed up project timelines." 
            />
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-end mb-12">
           <div>
             <span className="text-brand-gold font-bold uppercase tracking-widest">Our Portfolio</span>
             <h2 className="text-4xl font-bold mt-2">Recent Executions</h2>
           </div>
           <Link to="/projects" className="hidden md:flex items-center gap-2 font-bold border-b-2 border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
             View All Projects <ArrowRight size={20} />
           </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
           {/* Mock Data for Preview */}
           {[1, 2, 3].map((item) => (
             <div key={item} className="group relative h-80 overflow-hidden cursor-pointer">
               <img src={`https://source.unsplash.com/random/800x600?architecture,building&sig=${item}`} alt="Project" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
               <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                 <h3 className="text-xl font-bold">Project Title {item}</h3>
                 <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">Location, India</p>
               </div>
             </div>
           ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/projects" className="font-bold text-brand-gold">View All Projects →</Link>
        </div>
      </section>
    </div>
  );
};

// Interactive Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-transparent hover:border-brand-gold group">
    <div className="text-gray-400 mb-6 group-hover:text-brand-gold transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-dark">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;