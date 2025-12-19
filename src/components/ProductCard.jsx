const ProductCard = ({ product }) => (
  <div className="group bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
    <div className="h-64 overflow-hidden relative">
      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
        {product.category || 'GRC'}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
      <div className="text-xs font-bold text-brand-gold uppercase">{product.features}</div>
    </div>
  </div>
);
export default ProductCard;