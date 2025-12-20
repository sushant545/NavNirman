import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    // CHANGED: 
    // 1. Removed 'max-w-7xl mx-auto mt-6 rounded-2xl' to restore Full Width.
    // 2. Kept 'h-[70vh]' as per your request.
    <div className="relative w-full h-[70vh] flex items-center shadow-md">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/1fmXwrwf/Whats-App-Image-2025-12-20-at-12-03-08-PM.jpg" 
          alt="Architectural Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl animate-fade-in-up">
          
          <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
            Since 2023
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevating Architecture with GRC Excellence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light">
            Premium Glass Reinforced Concrete solutions for modern facades, complex geometries, and sustainable construction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/projects" 
              className="bg-brand-gold text-brand-dark px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
            >
              Explore Our Work <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 text-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;