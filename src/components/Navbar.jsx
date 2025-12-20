import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Helper to highlight active link
  const isActive = (path) => {
    return location.pathname === path 
      ? "text-brand-gold bg-gray-50" 
      : "text-gray-700 hover:text-brand-gold hover:bg-gray-50";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Height h-32 to fit the large logo */}
        <div className="flex justify-between h-32 items-center">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="https://i.ibb.co/vCt1Kqmm/Gemini-Generated-Image-jxvl6yjxvl6yjxvl-1-removebg-preview.png" 
              alt="Navnirman Logo" 
              className="h-32 w-auto object-contain" 
            />
          </Link>

          {/* 2. Desktop Menu (Increased Size & Emojis) */}
          <div className="hidden md:flex space-x-6 items-center font-bold text-lg uppercase tracking-wide">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive('/')}`}
            >
              <span>🏠</span> Home
            </Link>
            <Link 
              to="/catalog" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive('/catalog')}`}
            >
              <span>📦</span> Catalog
            </Link>
            <Link 
              to="/projects" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive('/projects')}`}
            >
              <span>🏗️</span> Projects
            </Link>
            
            {/* Bigger 'Get Quote' Button */}
            <Link 
              to="/contact" 
              className="ml-4 bg-brand-dark text-white px-8 py-3 rounded shadow-md hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 font-bold text-sm flex items-center gap-2"
            >
              <span>💬</span> GET QUOTE
            </Link>
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-brand-dark hover:text-brand-gold transition-colors focus:outline-none p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu (Larger Text) */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-6 pb-8 space-y-6 flex flex-col items-center uppercase text-xl font-bold tracking-widest">
          <Link to="/" className="flex items-center gap-3 py-3 text-gray-700 hover:text-brand-gold w-full justify-center">
            <span>🏠</span> Home
          </Link>
          <Link to="/catalog" className="flex items-center gap-3 py-3 text-gray-700 hover:text-brand-gold w-full justify-center">
            <span>📦</span> Catalog
          </Link>
          <Link to="/projects" className="flex items-center gap-3 py-3 text-gray-700 hover:text-brand-gold w-full justify-center">
            <span>🏗️</span> Projects
          </Link>
          <Link to="/contact" className="w-full text-center bg-brand-dark text-white px-6 py-4 mt-4 rounded shadow hover:bg-brand-gold hover:text-brand-dark transition flex items-center justify-center gap-3">
            <span>💬</span> Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;