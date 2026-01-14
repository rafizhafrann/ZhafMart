import { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ReceiptModal } from './components/ReceiptModal';
import { Toast } from './components/Toast';
import { Product, CartItem, Category } from './types';

// Mock Data
const PRODUCTS: Product[] = [
  // FRUITS
  { id: 1, name: 'Apel Segar', price: 35000, category: Category.FRUIT, unit: 'kg', image: 'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Pisang Cavendish', price: 22000, category: Category.FRUIT, unit: 'sisir', image: 'https://i.pinimg.com/736x/58/3a/5a/583a5a4d9271cc68e6776e711f390d94.jpg' },
  { id: 13, name: 'Mangga Harum Manis', price: 28000, category: Category.FRUIT, unit: 'kg', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600' },
  { id: 14, name: 'Jeruk Medan', price: 32000, category: Category.FRUIT, unit: 'kg', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600' },
  { id: 15, name: 'Semangka', price: 15000, category: Category.FRUIT, unit: 'butir', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600' },
  { id: 16, name: 'Anggur Merah', price: 55000, category: Category.FRUIT, unit: '500g', image: 'https://i.pinimg.com/736x/24/98/8f/24988ff8ecbeca2ab1ae2dc279bc6b42.jpg' },
  { id: 17, name: 'Alpukat Mentega', price: 40000, category: Category.FRUIT, unit: 'kg', image: 'https://i.pinimg.com/1200x/fe/87/0c/fe870c3fdba066b473e5ef2e0d2b7ea2.jpg' },

  // VEGETABLES
  { id: 3, name: 'Brokoli Organik', price: 15000, category: Category.VEGETABLE, unit: 'bonggol', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Wortel Brastagi', price: 12000, category: Category.VEGETABLE, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600' },
  { id: 11, name: 'Bawang Merah', price: 45000, category: Category.VEGETABLE, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600' },
  { id: 12, name: 'Cabai Merah Keriting', price: 60000, category: Category.VEGETABLE, unit: 'kg', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=600' },
  { id: 18, name: 'Bayam Hijau Segar', price: 5000, category: Category.VEGETABLE, unit: 'ikat', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600' },
  { id: 19, name: 'Kentang', price: 18000, category: Category.VEGETABLE, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600' },
  { id: 20, name: 'Tomat', price: 14000, category: Category.VEGETABLE, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600' },

  // MEAT & FISH
  { id: 5, name: 'Daging Sapi Slice', price: 145000, category: Category.MEAT, unit: '500g', image: 'https://i.pinimg.com/736x/10/11/6d/10116dda8e7e52fc1e8caef5021dc11e.jpg' },
  { id: 6, name: 'Ayam Kampung Utuh', price: 85000, category: Category.MEAT, unit: 'ekor', image: 'https://i.pinimg.com/1200x/dd/43/59/dd4359981ab45bffea80f2806645d852.jpg' },
  { id: 21, name: 'Ikan Salmon Filet', price: 220000, category: Category.MEAT, unit: '500g', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600' },
  { id: 22, name: 'Udang Segar', price: 125000, category: Category.MEAT, unit: 'kg', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600' },
  
  // DAIRY
  { id: 7, name: 'Telur Ayam Negeri', price: 28000, category: Category.DAIRY, unit: 'kg', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Susu UHT Full Cream', price: 18000, category: Category.DAIRY, unit: 'liter', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600' },
  { id: 23, name: 'Keju batang', price: 25000, category: Category.DAIRY, unit: '165g', image: 'https://i.pinimg.com/1200x/27/fe/85/27fe85194c5a50c364cb8c8bedf2470b.jpg' },
  { id: 24, name: 'Yogurt Plain', price: 45000, category: Category.DAIRY, unit: '500ml', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600' },

  // PANTRY
  { id: 9, name: 'Minyak Goreng', price: 38000, category: Category.PANTRY, unit: '2L', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600' },
  { id: 10, name: 'Beras Pandan Wangi', price: 75000, category: Category.PANTRY, unit: '5kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
  { id: 25, name: 'Tepung Terigu', price: 12000, category: Category.PANTRY, unit: 'kg', image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&q=80&w=600' },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  
  // States for Toast
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  // States for Receipt
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<{
    items: CartItem[];
    total: number;
    orderId: string;
    date: string;
  } | null>(null);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Tampilkan Toast, bukan membuka sidebar
    setLastAddedProduct(product);
    setShowToast(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `ZM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const date = new Date().toLocaleString('id-ID', { 
      day: '2-digit', month: 'long', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });

    setLastOrder({
      items: [...cartItems],
      total,
      orderId,
      date
    });

    setCartItems([]);
    setIsCartOpen(false);
    setIsReceiptOpen(true);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="flex-grow">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Category Filter */}
          <div className="flex overflow-x-auto space-x-2 pb-6 mb-4 no-scrollbar">
            {Object.values(Category).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200 ring-2 ring-green-600 ring-offset-2'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            <button
               onClick={() => setSelectedCategory('Semua')}
               className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'Semua'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 ring-2 ring-green-600 ring-offset-2'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Semua
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 ZhafMart Indonesia. All rights reserved.</p>
          <p className="text-sm mt-2">Dibuat dengan cingtah untuk pecinta makanan segar.</p>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Toast 
        product={lastAddedProduct} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {lastOrder && (
        <ReceiptModal 
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          items={lastOrder.items}
          total={lastOrder.total}
          orderId={lastOrder.orderId}
          date={lastOrder.date}
        />
      )}
    </div>
  );
}