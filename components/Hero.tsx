import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-green-800 text-white overflow-hidden mb-8 rounded-b-3xl md:rounded-3xl shadow-lg md:mx-4 md:mt-4">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
          alt="Fresh market vegetables" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-600/30" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Segar Langsung dari Kebun
        </h1>
        <p className="text-lg md:text-xl text-green-100 max-w-2xl mb-8">
          Belanja kebutuhan dapur harian Anda dengan kualitas terbaik. 
          Pesan sekarang, kami antar sampai depan pintu rumah Anda.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <span className="text-2xl">🥬</span>
            <span className="font-medium">Sayuran Organik</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <span className="text-2xl">🍎</span>
            <span className="font-medium">Buah Segar</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <span className="text-2xl">🚚</span>
            <span className="font-medium">Pengiriman Cepat</span>
          </div>
        </div>
      </div>
    </div>
  );
};