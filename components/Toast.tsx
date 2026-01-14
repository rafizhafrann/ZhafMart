import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ToastProps {
  product: Product | null;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ product, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!product) return null;

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-green-100 p-2 pr-6 flex items-center gap-4 min-w-[320px]">
        <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-green-600 mb-0.5">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Berhasil Ditambahkan</span>
          </div>
          <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
          <p className="text-[11px] text-gray-500">Tersimpan di keranjang belanja</p>
        </div>
        <div className="bg-green-50 p-2 rounded-full">
          <ShoppingBag className="w-5 h-5 text-green-600" />
        </div>
      </div>
    </div>
  );
};