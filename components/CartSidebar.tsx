import React from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${isOpen ? '' : 'overflow-hidden'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />
      
      {/* Panel */}
      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex pointer-events-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full w-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-green-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-green-600 text-white p-1 rounded">
                <ShoppingBag className="w-5 h-5" /> 
              </span>
              Keranjang
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                <div className="bg-gray-50 p-6 rounded-full">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                </div>
                <p className="text-lg font-medium text-gray-600">Keranjang masih kosong</p>
                <p className="text-sm">Ayo mulai belanja sayur dan buah segar!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-0.5 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-base font-medium text-gray-600">Total Belanja</span>
                <span className="text-2xl font-bold text-gray-900">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-green-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transform transition active:scale-95"
              >
                Checkout Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};