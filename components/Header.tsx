import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, Search, Leaf } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, searchTerm, setSearchTerm }) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Nama Brand */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-700 transition-colors">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
              ZhafMart
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <div className="relative w-full text-gray-600 focus-within:text-green-600">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 sm:text-sm"
                placeholder="Cari sayur, buah, atau daging segar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className={`relative p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200 ${isPulsing ? 'scale-110' : 'scale-100'}`}
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-sm ring-2 ring-white transition-transform duration-300 ${isPulsing ? 'scale-125' : 'scale-100'}`}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-500 hover:text-green-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
         <div className="relative w-full text-gray-600 focus-within:text-green-600">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-green-500 transition-all text-sm"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
      </div>
    </header>
  );
};