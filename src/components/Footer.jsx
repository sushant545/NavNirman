import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    // Reduced top padding from pt-16 to pt-10 for compact height
    <footer className="bg-gray-900 text-white pt-10 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* 1. Brand / Logo Section (Text Removed) */}
          <div className="flex flex-col items-start">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="https://i.ibb.co/q30pjtv4/Gemini-Generated-Image-uty2d5uty2d5uty2-removebg-preview.png" 
                alt="NavNirman Logo" 
                className="h-20 w-auto object-contain" 
              />
            </Link>
            {/* Social Icons moved up since text is gone */}
            <div className="flex gap-4 mt-2">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 text-brand-gold">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/projects" text="Projects" />
              <FooterLink to="/catalog" text="Product Catalog" />
              <FooterLink to="/contact" text="Contact Us" />
            </ul>
          </div>

          {/* 3. Our Services */}
          <div>
            <h3 className="text-base font-bold mb-4 text-brand-gold">Expertise</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" /> GRC Jali & Screens</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" /> 3D Facade Cladding</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" /> Cornices & Columns</li>
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-brand-gold" /> Dome Restoration</li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4 text-brand-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Plot No. 45, Industrial Area,<br />
                  Sector 62, Noida - 201301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>info@navnirman.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} NavNirman GRC. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-brand-gold cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-brand-gold cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ to, text }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group">
       <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> {text}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-gray-900 transition-all hover:scale-110">
    {icon}
  </a>
);

export default Footer;