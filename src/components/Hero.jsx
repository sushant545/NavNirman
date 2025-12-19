import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[80vh] bg-brand-dark flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
          className="w-full h-full object-cover opacity-40" 
          alt="Navnirman Hero"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight">
          Pioneering GRC <br/><span className="text-brand-gold">Excellence.</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-xl mb-10">
          Digital catalog of India's premium Glass Reinforced Concrete solutions for modern facades and landscapes.
        </p>
        <div className="flex gap-4">
          <a href="/catalog" className="bg-brand-gold px-8 py-4 font-bold uppercase text-sm tracking-widest">Explore Products</a>
        </div>
      </div>
    </div>
  );
};
export default Hero;