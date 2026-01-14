import React from 'react';
import { X, Printer, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  orderId: string;
  date: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  total, 
  orderId,
  date 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Receipt Paper */}
      <div className="relative bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-green-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Pembayaran Berhasil</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 font-mono text-sm text-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">ZhafMart</h2>
            <p className="text-xs text-gray-500">Jl. Segar Selalu No. 123, Jakarta</p>
            <p className="text-xs text-gray-500">Telp: (021) 888-999</p>
          </div>

          <div className="border-t border-dashed border-gray-300 py-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>ID Transaksi:</span>
              <span>{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal:</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir:</span>
              <span>Sistem ZhafMart</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 py-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{item.name}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>{item.quantity} {item.unit} x Rp {item.price.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 py-4 space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>TOTAL</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Metode Bayar:</span>
              <span>Saldo Akun / COD</span>
            </div>
          </div>

          <div className="mt-6 text-center border-t border-dashed border-gray-300 pt-6">
            <p className="text-xs italic">Terima kasih telah belanja di ZhafMart!</p>
            <p className="text-xs mt-1">Simpan struk ini sebagai bukti pembayaran sah.</p>
          </div>

          <div className="mt-8 flex gap-2 no-print">
            <button 
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" /> Cetak
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Decorative Scalloped Edge */}
        <div className="flex justify-between px-1 absolute -bottom-1 w-full overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-50 rounded-full -mb-2" />
          ))}
        </div>
      </div>
    </div>
  );
};
