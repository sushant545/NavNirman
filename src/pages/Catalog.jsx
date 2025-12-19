import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchData } from '../utils/sheets';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will fetch from your Google Sheet eventually
    fetchData('products').then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(() => {
      // Fallback if sheet is not connected yet
      setProducts([
        { name: "Decorative GRC Jali", category: "Facade", description: "Premium mesh design for ventilation and aesthetics.", image_url: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80", features: "High Strength" },
        { name: "Column Cladding", category: "Structural", description: "Durable GRC wraps for structural columns.", image_url: "https://images.unsplash.com/photo-1590483734724-3881744a338e?auto=format&fit=crop&q=80", features: "Weatherproof" }
      ]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Product Exploration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Browse our digital catalog of GRC elements designed for the modern builder.</p>
        </header>

        {loading ? (
          <div className="text-center py-20">Loading our finest work...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;