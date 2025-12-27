import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* 1. Brand / Logo Section */}
          <div className="flex flex-col items-start">
            <Link to="/" className="inline-block mb-4">
              {/* ✅ UPDATED: Removed the 'filter' so the original Gold color shows */}
              <img
                src="https://i.ibb.co/vCt1Kqmm/Gemini-Generated-Image-jxvl6yjxvl6yjxvl-1-removebg-preview.png"
                alt="NavNirman Logo"
                className="h-24 w-auto object-contain"
              />
            </Link>

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
              <FooterLink to="/admin" text="Admin Portal" />
            </ul>
          </div>

          {/* 3. Expertise */}
          <div>
            <h3 className="text-base font-bold mb-4 text-brand-gold">Expertise</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/catalog?category=GRC Panel (Jali)" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <ArrowRight size={14} className="text-brand-gold" /> GRC Jali & Screens
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=GRC Cladding" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <ArrowRight size={14} className="text-brand-gold" /> 3D Facade Cladding
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=GRC Capitals and Columns" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <ArrowRight size={14} className="text-brand-gold" /> Cornices & Columns
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=GRC Dome" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                  <ArrowRight size={14} className="text-brand-gold" /> Dome Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4 text-brand-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Plot no 512, Block-C, Vatika Kunj,<br />
                  Rithoj Dhani, Near Maruti Kunj,<br />
                  Gurgaon - 122102
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