import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchData } from '../utils/sheets';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true); // Default is true (loading started)

  // The EXACT Categories you requested
  const categories = [
    'All',
    'GRC Panel (Jali)',
    'GRC Capitals and Columns',
    'GRC Cladding',
    'GRC Dome',
    'GRC Balusters',
    'GRC Cornice'
  ];

  useEffect(() => {
    fetchData('products').then(data => {
      setProducts(data);
      setLoading(false); // Stop loading when data arrives
    }).catch(err => {
      console.log("Sheet not connected yet, using fallback");
      setLoading(false); // Stop loading even if error
    });
  }, []);

  // Filter Logic
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center text-4xl font-bold mb-12">Product Catalog</h1>

        {/* Categories Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wide border transition-all duration-300
                ${filter === cat 
                  ? 'bg-brand-gold text-white border-brand-gold' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-brand-dark hover:text-brand-dark'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid Area */}
        <div className="min-h-[300px]"> {/* Min-height prevents layout shift */}
          
          {/* 1. LOADING STATE */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Spinning Loader */}
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-brand-gold mb-4"></div>
              <p className="text-gray-400 font-medium animate-pulse">Loading architectural elements...</p>
            </div>
          ) : (
            
            /* 2. LOADED STATE */
            <div className="grid md:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))
              ) : (
                /* 3. EMPTY STATE (Only shows if loading is done AND list is empty) */
                <div className="col-span-3 text-center py-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p>No products found in <strong>{filter}</strong> category yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Catalog;