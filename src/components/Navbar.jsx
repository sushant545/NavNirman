import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Menu, MessageSquare, ArrowUpRight, Download } from 'lucide-react';
import { fetchData } from '../utils/sheets';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Data Stores
  const [allProjects, setAllProjects] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // 1. Fetch BOTH Projects and Products
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, prodData] = await Promise.all([
          fetchData('project'),
          fetchData('products')
        ]);
        
        if (projData) setAllProjects(projData);
        // Fallback: If 'products' tab fails, try 'catalog'
        if (prodData && prodData.length > 0) {
            setAllProducts(prodData);
        } else {
            const catalogData = await fetchData('catalog');
            if (catalogData) setAllProducts(catalogData);
        }
      } catch (err) {
        console.error("Search data load error:", err);
      }
    };
    loadData();

    // Close search on outside click
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Universal Search Logic
  const handleSearch = (e) => {
    const text = e.target.value;
    setQuery(text);
    
    if (text.length > 0) {
      setIsSearching(true);
      const lowerText = text.toLowerCase();

      // Search Projects (Name or Location)
      const matchingProjects = allProjects.filter(p => 
        (p.name && p.name.toLowerCase().includes(lowerText)) ||
        (p.location && p.location.toLowerCase().includes(lowerText))
      ).map(p => ({ ...p, type: 'PROJECT', path: '/projects' }));

      // Search Products (Name or Category)
      const matchingProducts = allProducts.filter(p => 
        (p.name && p.name.toLowerCase().includes(lowerText)) ||
        (p.category && p.category.toLowerCase().includes(lowerText))
      ).map(p => ({ ...p, type: 'PRODUCT', path: '/catalog' }));

      // Combine & Limit Results (Top 3 of each, or just top 6 total)
      const combined = [...matchingProjects, ...matchingProducts].slice(0, 6);
      setResults(combined);
    } else {
      setIsSearching(false);
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  };

  const handleResultClick = (item) => {
    clearSearch();
    navigate(item.path); 
  };

  return (
    <nav className="bg-gray-900 shadow-xl fixed w-full z-50 top-0 border-b border-gray-800">
      <div className="max-w-[1800px] mx-auto px-6">
        
        <div className="flex items-center justify-between h-36">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex-shrink-0">
             <img 
               src="https://i.ibb.co/vCt1Kqmm/Gemini-Generated-Image-jxvl6yjxvl6yjxvl-1-removebg-preview.png" 
               alt="NavNirman Logo" 
               className="h-32 w-auto object-contain"
             />
          </Link>

          {/* 2. RIGHT SIDE (Nav + Search) */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            
            {/* Links */}
            <div className="flex items-center space-x-8 border-r border-gray-700 pr-8">
              <NavLink to="/" text="Home" />
              <NavLink to="/catalog" text="Catalog" />
              <NavLink to="/projects" text="Projects" />
            </div>

            {/* ✅ NEW: Download Catalog Button */}
            <a 
              href="https://drive.google.com/uc?export=download&id=1gbhYtzSBX9iKtYXS2hla9d76FJyzsM9M" 
              className="text-gray-300 hover:text-brand-gold font-bold text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
              title="Download PDF Catalog"
            >
              <Download size={18} /> <span className="hidden xl:inline">Catalog PDF</span>
            </a>

            {/* Quote Button */}
            <Link 
              to="/contact" 
              className="bg-brand-gold text-brand-dark px-6 py-3 rounded hover:bg-white hover:text-brand-dark transition-all duration-300 font-bold text-sm shadow-md flex items-center gap-2"
            >
              <MessageSquare size={16} /> Get Quote
            </Link>

            {/* 3. UNIVERSAL SEARCH BAR */}
            <div className="w-72 relative" ref={searchRef}>
              <div className="relative group">
                <input 
                  type="text" 
                  value={query}
                  onChange={handleSearch}
                  onFocus={() => query.length > 0 && setIsSearching(true)}
                  placeholder="Search products & projects..." 
                  className="w-full bg-gray-800 text-white rounded-full py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all border border-gray-700 focus:bg-gray-700 placeholder-gray-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-gold transition-colors" size={20} />
                
                {query && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* LIVE RESULTS DROPDOWN */}
              {isSearching && results.length > 0 && (
                <div className="absolute top-full right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-down z-50">
                  <div className="max-h-[400px] overflow-y-auto">
                    {results.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleResultClick(item)}
                        className="flex gap-4 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none transition-colors group"
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-200">
                          <img 
                            src={item.image_url || "https://placehold.co/100"} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                              item.type === 'PROJECT' 
                                ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                : 'bg-orange-50 text-orange-600 border-orange-100'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <h4 className="text-gray-800 font-bold text-sm truncate group-hover:text-brand-dark">
                            {item.name}
                          </h4>
                          <p className="text-gray-400 text-xs truncate">
                            {item.type === 'PROJECT' ? item.location : item.category}
                          </p>
                        </div>

                        {/* Arrow Icon */}
                        <div className="text-gray-300 group-hover:text-brand-gold self-center">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Footer hint */}
                  <div className="bg-gray-50 p-2 text-center text-xs text-gray-400 border-t border-gray-100">
                    Press Enter to see all results
                  </div>
                </div>
              )}
              
              {/* No Results State */}
              {isSearching && results.length === 0 && query.length > 1 && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center z-50">
                  <p className="text-gray-500 text-sm">No matches found for "{query}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-brand-gold focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 absolute w-full shadow-xl">
          <div className="px-4 pt-6 pb-2">
             <input 
                type="text" 
                placeholder="Search products & projects..." 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mb-4 text-sm focus:outline-none focus:border-brand-gold"
                onChange={handleSearch}
             />
          </div>
          <div className="px-4 pb-6 space-y-2">
            <MobileNavLink to="/" text="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/catalog" text="Catalog" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/projects" text="Projects" onClick={() => setIsOpen(false)} />
            {/* Mobile Download Link */}
            <a 
              href="https://drive.google.com/uc?export=download&id=1gbhYtzSBX9iKtYXS2hla9d76FJyzsM9M" 
              className="block px-3 py-3 rounded-md text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-b border-gray-800 last:border-0 flex items-center gap-2"
            >
              <Download size={18} /> Download Catalog
            </a>
            <MobileNavLink to="/contact" text="Get Quote" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link 
    to={to} 
    className="text-gray-300 hover:text-brand-gold font-bold text-base uppercase tracking-wider transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-gold"
  >
    {text}
  </Link>
);

const MobileNavLink = ({ to, text, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block px-3 py-3 rounded-md text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-b border-gray-800 last:border-0"
  >
    {text}
  </Link>
);

export default Navbar;