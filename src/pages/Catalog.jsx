import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Added useLocation
import ProductCard from '../components/ProductCard';
import { fetchData } from '../utils/sheets';

// --- HARDCODED CATEGORY DATA ---
const CATEGORIES = [
  {
    id: 'GRC Panel (Jali)',
    title: 'Decorative Jali & Screens',
    description: 'Intricate geometric patterns providing shade, ventilation, and privacy.',
    image: 'https://i.pinimg.com/736x/57/78/f4/5778f43e719a33547f810eb4f3430851.jpg'
  },
  {
    id: 'GRC Capitals and Columns',
    title: 'Capitals & Columns',
    description: 'Classical and modern structural aesthetics for grand entrances.',
    image: 'https://i.pinimg.com/736x/df/35/7a/df357a558f6fc743f75b0f568cb74c5e.jpg'
  },
  {
    id: 'GRC Cladding',
    title: '3D Facade Cladding',
    description: 'Lightweight, durable skins that transform building exteriors.',
    image: 'https://i.pinimg.com/736x/4b/33/65/4b3365f38da1604968809b7b4bd2460d.jpg'
  },
  {
    id: 'GRC Dome',
    title: 'Domes & Restoration',
    description: 'Grand architectural domes and heritage restoration elements.',
    image: 'https://i.pinimg.com/736x/dd/ac/1c/ddac1c2438f85c6c673eff72fdfdfb45.jpg'
  },
  {
    id: 'GRC Balusters',
    title: 'Balusters & Railings',
    description: 'Elegant safety barriers for balconies, staircases, and terraces.',
    image: 'https://i.pinimg.com/736x/73/df/fe/73dffeda6fdd7f902ab476e2e3afc090.jpg'
  },
  {
    id: 'GRC Cornice',
    title: 'Cornices & Moldings',
    description: 'The finishing touch: decorative borders for rooflines and ceilings.',
    image: 'https://i.pinimg.com/736x/e8/d3/cd/e8d3cdf3d42e01ba0c9b13e12624f4df.jpg'
  },
  {
    id: 'GRC Mural',
    title: 'Murals & Statue',
    description: 'The finishing touch: decorative borders for rooflines and ceilings.',
    image: 'https://i.pinimg.com/736x/a9/d8/bb/a9d8bbed1c2967bd988792cebe7c4077.jpg'
  },
  {
    id: 'GRC Carving',
    title: 'Wall Carvings',
    description: 'The finishing touch: decorative borders for rooflines and ceilings.',
    image: 'https://i.pinimg.com/736x/12/99/86/1299865f8cdf4c489a63444884ea4d5b.jpg'
  },
  {
    id: 'GRC Planters',
    title: 'Planters',
    description: 'The finishing touch: decorative borders for rooflines and ceilings.',
    image: 'https://i.pinimg.com/736x/06/f1/df/06f1df05b62e98b9b37bec759896df17.jpg'
  }
];

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Hook to access URL

  // 1. Fetch Data on Mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchData('products');
        if (!data || data.length === 0) {
          const fallbackData = await fetchData('catalog');
          setProducts(fallbackData || []);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Handle URL Category Parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category');
    if (categoryId) {
      // Decode URI component just in case, though params.get handles most decoding
      setActiveCategory(decodeURIComponent(categoryId));
    }
  }, [location.search]);

  // 3. Helper to filter products
  const getFilteredProducts = () => {
    if (!activeCategory) return [];

    const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = normalize(activeCategory);

    return products.filter(p => {
      const cat = normalize(p.category);
      return cat.includes(target) || target.includes(cat);
    });
  };

  const filteredItems = getFilteredProducts();

  return (
    // ✅ CHANGED: Increased 'pt-32' to 'pt-48' to clear the taller Navbar
    <div className="min-h-screen bg-white pt-48 pb-16">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* --- VIEW 1: CATEGORY SELECTION --- */}
        {!activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 block">
                Our Collection
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Browse by Category
              </h1>
              <p className="text-gray-500 text-lg">
                Explore our comprehensive range of GRC architectural elements, designed for both modern and heritage applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((cat, index) => (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-gold font-bold text-sm uppercase tracking-wider">
                      View Products <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- VIEW 2: PRODUCT LISTING --- */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-brand-dark mb-2 transition-colors group"
                >
                  <div className="p-2 rounded-full bg-gray-100 group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <ArrowLeft size={18} />
                  </div>
                  <span className="font-medium">Back to Categories</span>
                </button>
                <h2 className="text-3xl font-bold text-gray-900">
                  {CATEGORIES.find(c => c.id === activeCategory)?.title || activeCategory}
                </h2>
              </div>

              <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium text-sm">
                Showing {filteredItems.length} Products
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
              </div>
            )}

            {/* Product Grid */}
            {!loading && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredItems.length > 0 ? (
                  filteredItems.map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No products found in this category yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Check back soon!</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Catalog;