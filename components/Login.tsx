import React, { useState } from 'react';
import { Leaf, ArrowRight, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Silakan masukkan nama Anda');
      return;
    }

    setIsLoading(true);
    
    // Simulasi loading network
    setTimeout(() => {
      onLogin(username);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-green-900">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/60 to-transparent" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-500 p-3 rounded-2xl shadow-lg shadow-green-500/30 mb-4 animate-bounce">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">ZhafMart</h1>
            <p className="text-green-100 text-sm">Segar, Hemat, dan Terpercaya</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-50 ml-1">Nama Pengguna</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-green-200 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/10 transition-all duration-200"
                  placeholder="Masukkan nama Anda"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-50 ml-1">Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-200 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-green-200/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/10 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-300 text-sm text-center bg-red-500/20 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-green-100/60 text-xs">
              © 2025 ZhafMart Indonesia. Akses terbuka untuk umum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};