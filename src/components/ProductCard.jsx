import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowPreview(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* --- STANDARD CARD --- */}
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative"
      >
        {/* Image Area */}
        <div className="h-64 overflow-hidden bg-gray-100 relative">
          <img 
            src={product.image_url || "https://placehold.co/400x400?text=No+Image"} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Tag (Top Left) */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider text-brand-dark shadow-sm z-10">
            {product.category || 'Standard'}
          </div>

          {/* INNOVATIVE ZOOM BUTTON (Top Right) */}
          <button
            onClick={() => setShowPreview(true)}
            className="absolute top-3 right-3 bg-black/20 hover:bg-brand-gold hover:text-white text-white backdrop-blur-md border border-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110 z-10 group/btn shadow-lg"
            title="Zoom Preview"
          >
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
            {product.description || "Premium GRC architectural element designed for durability and aesthetics."}
          </p>
          
          <Link 
            to="/contact" 
            className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-50 hover:bg-brand-gold hover:text-white text-gray-600 font-bold py-3 rounded-lg transition-all text-sm group-hover:shadow-md"
          >
            <Box size={16} /> Enquire Now
          </Link>
        </div>
      </motion.div>

      {/* --- ZOOM PREVIEW MODAL (Lightbox) --- */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setShowPreview(false)} // Click backdrop to close
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              onClick={() => setShowPreview(false)}
            >
              <X size={32} />
            </button>

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img 
                  src={product.image_url || "https://placehold.co/800x600?text=No+Image"} 
                  alt={product.name} 
                  className="max-h-[85vh] w-auto object-contain"
                />
                
                {/* Image Details Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white pt-12">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <p className="text-gray-300 text-sm mt-1">{product.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;