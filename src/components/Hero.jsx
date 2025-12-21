import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      title: "Redefining Facades with GRC",
      subtitle: "Lightweight. Durable. Limitless Design Possibilities.",
      cta: "Explore Projects"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      title: "Precision Engineering",
      subtitle: "State-of-the-art manufacturing for complex architectural forms.",
      cta: "View Catalog"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop",
      title: "Sustainable Architecture",
      subtitle: "Eco-friendly materials building the future of construction.",
      cta: "Contact Us"
    }
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full bg-white pt-4 pb-8">
      
      {/* CHANGED: 
         1. Removed 'max-w-...' restriction.
         2. Used 'mx-4 md:mx-6' to give just a little gap on the edges.
         3. Kept rounded-3xl for the floating card look.
      */}
      <div className="relative h-[85vh] mx-4 md:mx-6 overflow-hidden rounded-3xl shadow-2xl group">
        
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image with overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-105 animate-slow-zoom" 
              style={{ animation: index === currentSlide ? 'zoom 20s infinite alternate' : 'none' }}
            />

            {/* Text Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-24 max-w-7xl">
              <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                NavNirman GRC
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                {slide.subtitle}
              </p>
              <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <Link 
                  to="/projects" 
                  className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded font-bold hover:bg-white transition-all duration-300 transform hover:translate-x-2"
                >
                  {slide.cta} <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight size={32} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Custom Keyframes for Zoom Effect */}
      <style>{`
        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slow-zoom {
          animation: zoom 20s infinite alternate;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;