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
    return location.pathname === path ? "text-brand-gold" : "text-gray-600 hover:text-brand-gold";
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Height remains h-32 to fit the large logo */}
        <div className="flex justify-between h-32 items-center">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="https://i.ibb.co/vCt1Kqmm/Gemini-Generated-Image-jxvl6yjxvl6yjxvl-1-removebg-preview.png" 
              alt="Navnirman Logo" 
              className="h-32 w-auto object-contain" 
            />
          </Link>

          {/* 2. Desktop Menu (Added Emojis) */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-sm uppercase tracking-widest">
            <Link to="/" className={`transition-colors duration-300 ${isActive('/')}`}>
              🏠 Home
            </Link>
            <Link to="/catalog" className={`transition-colors duration-300 ${isActive('/catalog')}`}>
              📦 Catalog
            </Link>
            <Link to="/projects" className={`transition-colors duration-300 ${isActive('/projects')}`}>
              🏗️ Projects
            </Link>
            <Link to="/contact" className="bg-brand-dark text-white px-6 py-3 rounded-sm hover:bg-brand-gold transition-colors duration-300 font-bold text-xs">
              💬 Get Quote
            </Link>
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-brand-dark hover:text-brand-gold transition-colors focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu (Added Emojis) */}
      <div 
        className={`md:hidden absolute w-full bg-gray-100 border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center uppercase text-sm font-medium tracking-widest">
          <Link to="/" className="block py-2 text-gray-600 hover:text-brand-gold w-full text-center">
            🏠 Home
          </Link>
          <Link to="/catalog" className="block py-2 text-gray-600 hover:text-brand-gold w-full text-center">
            📦 Catalog
          </Link>
          <Link to="/projects" className="block py-2 text-gray-600 hover:text-brand-gold w-full text-center">
            🏗️ Projects
          </Link>
          <Link to="/contact" className="block w-full text-center bg-brand-dark text-white px-6 py-3 mt-4 rounded-sm font-bold hover:bg-brand-gold transition">
            💬 Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;