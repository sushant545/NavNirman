import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            NAV<span className="text-brand-gold">NIRMAN</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center font-medium text-sm uppercase tracking-widest">
            <Link to="/" className="hover:text-brand-gold transition">Home</Link>
            <Link to="/catalog" className="hover:text-brand-gold transition">Catalog</Link>
            <Link to="/contact" className="bg-brand-dark text-white px-5 py-2 rounded-sm hover:bg-brand-gold transition">Get Quote</Link>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;