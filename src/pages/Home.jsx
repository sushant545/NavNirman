import React from 'react';
import { ArrowRight, Box, Shield, Zap } from 'lucide-react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Trust Bar */}
      <div className="bg-brand-gray py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-8 opacity-50 grayscale">
          <span className="font-bold text-xl italic">ARCHITECTS CHOICE</span>
          <span className="font-bold text-xl italic">GRC CERTIFIED</span>
          <span className="font-bold text-xl italic">ISO 9001</span>
          <span className="font-bold text-xl italic">EST. 1998</span>
        </div>
      </div>

      {/* GRC Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">Engineering Excellence</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                Revolutionizing Construction with GRC Technology.
              </h3>
            </div>
            <button className="flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">
              Download Tech Specs <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Box size={32} />}
              title="Lightweight Strength"
              desc="80% lighter than pre-cast concrete, significantly reducing structural load requirements."
            />
            <FeatureCard 
              icon={<Shield size={32} />}
              title="Weather Proof"
              desc="Unmatched resistance to corrosion, UV rays, and extreme temperature fluctuations."
            />
            <FeatureCard 
              icon={<Zap size={32} />}
              title="Rapid Installation"
              desc="Modular designs engineered for speed, cutting down site labor costs by half."
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-brand-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="aspect-[4/5] bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518005020470-588a32759937?auto=format&fit=crop&q=80" 
                  alt="Industrial Architecture" 
                  className="w-full h-full object-cover opacity-80"
                />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-brand-gold p-8 rounded-lg hidden lg:block">
                <p className="text-5xl font-bold">25+</p>
                <p className="text-sm uppercase tracking-widest">Years of Expertise</p>
             </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Innovative Facades & Architectural Elements</h2>
            <p className="text-gray-400 text-lg mb-8">
              At NavNirman, we don't just supply GRC; we provide structural solutions. From intricate decorative Jalis to heavy-duty column cladding, our products are the backbone of modern Indian architecture.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 italic text-brand-gold">
                <span>✔</span> Custom Mold Fabrication
              </li>
              <li className="flex items-center gap-3 italic text-brand-gold">
                <span>✔</span> Site Mapping & Installation
              </li>
              <li className="flex items-center gap-3 italic text-brand-gold">
                <span>✔</span> Structural Consultation
              </li>
            </ul>
            <a href="/catalog" className="bg-white text-brand-dark px-8 py-4 font-bold rounded hover:bg-brand-gold hover:text-white transition-all inline-block">
              View Our Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 border border-gray-100 rounded-2xl hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10">
    <div className="text-brand-gold mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;