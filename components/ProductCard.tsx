import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/90 backdrop-blur text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border border-green-100">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">per {product.unit}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
             <span className="text-xs text-gray-400 font-medium">Harga</span>
             <span className="text-lg font-bold text-green-700">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 active:scale-90 shadow-sm hover:shadow-md"
            aria-label="Tambah ke keranjang"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};