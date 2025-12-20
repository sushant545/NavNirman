import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Define the Slides Data
  const slides = [
    {
      id: 1,
      // Your Original Image
      image: "https://i.ibb.co/1fmXwrwf/Whats-App-Image-2025-12-20-at-12-03-08-PM.jpg",
      subtitle: "Since 2023",
      title: "Elevating Architecture with GRC Excellence",
      desc: "Premium Glass Reinforced Concrete solutions for modern facades, complex geometries, and sustainable construction.",
      ctaPrimary: "Explore Our Work",
      ctaSecondary: "Get a Quote",
      linkPrimary: "/projects",
      linkSecondary: "/contact"
    },
    {
      id: 2,
      // Image: Modern Curved Architecture (GRC Strength)
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      subtitle: "Limitless Design",
      title: "Moulding Complex Geometries",
      desc: "From fluid curves to sharp angles, our GRC technology turns the most ambitious architectural drawings into structural reality.",
      ctaPrimary: "View Catalog",
      ctaSecondary: "Contact Us",
      linkPrimary: "/catalog",
      linkSecondary: "/contact"
    },
    {
      id: 3,
      // Image: Intricate Detailing / Jali Work
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
      subtitle: "Precision Engineering",
      title: "Intricate Jali & Cladding",
      desc: "Lightweight, durable, and weather-resistant decorative elements that redefine the aesthetics of your building exterior.",
      ctaPrimary: "Our Services",
      ctaSecondary: "Get a Quote",
      linkPrimary: "/projects",
      linkSecondary: "/contact"
    }
  ];

  // Auto-Play Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Manual Navigation Handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div 
      className="relative w-full h-[70vh] overflow-hidden group shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Slides Container */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms]"
              style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>

          {/* Text Content */}
          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className={`max-w-3xl transition-all duration-1000 delay-300 transform ${
              index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              
              <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in">
                {slide.subtitle}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light">
                {slide.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={slide.linkPrimary}
                  className="bg-brand-gold text-brand-dark px-8 py-4 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
                >
                  {slide.ctaPrimary} <ArrowRight size={20} />
                </Link>
                
                <Link 
                  to={slide.linkSecondary}
                  className="border-2 border-white text-white px-8 py-4 rounded-sm font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 text-center"
                >
                  {slide.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Hidden on mobile, visible on hover/desktop) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-brand-gold text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-brand-gold text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-brand-gold" : "w-4 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;