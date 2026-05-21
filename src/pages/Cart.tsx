import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  Truck,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getItemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto px-4 pt-56 pb-32 text-center">
          <div className="max-w-xl mx-auto space-y-12">
            <div className="relative inline-block">
              <div className="w-32 h-32 border-4 border-black flex items-center justify-center mx-auto mb-8 bg-zinc-50 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
                <ShoppingBag size={56} className="text-black" />
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">GIỎ HÀNG <span className="text-dole-orange">TRỐNG</span></h2>
            <p className="text-black/50 font-black uppercase tracking-[0.2em] text-xs">CÓ VẺ NHƯ BẠN CHƯA CHỌN ĐƯỢC THIẾT BỊ ƯNG Ý.</p>
            <Link to="/" className="inline-block bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-sm hover:bg-dole-orange transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              TIẾP TỤC MUA SẮM →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-48 pb-20 border-b-2 border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
                <Link to="/" className="hover:text-black">HOME</Link>
                <ChevronRight size={10} />
                <span className="text-dole-orange">SHOPPING CART</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
                GIỎ <span className="text-dole-orange">HÀNG</span>
              </h1>
            </div>
            <p className="text-sm font-black uppercase tracking-widest border-l-4 border-dole-orange pl-6 mb-2">
              BẠN ĐANG CÓ {getItemCount()} SẢN PHẨM TRONG GIỎ
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: PRODUCTS LIST */}
          <div className="lg:col-span-8 space-y-10">
            <div className="hidden md:grid grid-cols-12 pb-6 border-b border-black/10 text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
              <div className="col-span-6">SẢN PHẨM</div>
              <div className="col-span-3 text-center">SỐ LƯỢNG</div>
              <div className="col-span-3 text-right">TỔNG CỘNG</div>
            </div>

            {cart.map((item) => (
              <motion.div 
                key={item._id + (item.selectedSize || '') + (item.selectedColor || '')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-10 border-b-2 border-black group"
              >
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex gap-8 items-center">
                  <div className="w-32 h-32 border-2 border-black p-2 bg-zinc-50 shrink-0 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] group-hover:shadow-none transition-all">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-dole-orange">{item.category}</span>
                    <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-dole-orange transition-colors truncate">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {item.selectedSize && (
                        <span className="px-3 py-1 border border-black font-black text-[9px] uppercase tracking-widest">SIZE: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className="px-3 py-1 border border-black font-black text-[9px] uppercase tracking-widest">MÀU: {item.selectedColor}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controller */}
                <div className="col-span-1 md:col-span-3 flex justify-center">
                   <div className="flex items-center border-2 border-black bg-white">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all border-r-2 border-black"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-14 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all border-l-2 border-black"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                   </div>
                </div>

                {/* Price & Remove */}
                <div className="col-span-1 md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-4">
                   <p className="text-2xl font-black text-black tracking-tighter leading-none">
                      {(item.price * item.quantity).toLocaleString()}₫
                   </p>
                   <button 
                      onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                      className="text-black/20 hover:text-dole-orange transition-colors flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"
                    >
                      <Trash2 size={16} /> <span className="hidden md:inline">LOẠI BỎ</span>
                   </button>
                </div>
              </motion.div>
            ))}

            <Link to="/" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] hover:text-dole-orange transition-all mt-12 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> 
              QUAY LẠI CỬA HÀNG
            </Link>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="border-4 border-black p-10 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-10 border-b-2 border-black pb-6">
                  TÓM TẮT <span className="text-dole-orange">ĐƠN HÀNG</span>
                </h3>
                
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between font-black uppercase text-[10px] tracking-widest">
                    <span className="text-black/40">SỐ LƯỢNG:</span>
                    <span>{getItemCount()} MÓN</span>
                  </div>
                  <div className="flex justify-between font-black uppercase text-[10px] tracking-widest">
                    <span className="text-black/40">TẠM TÍNH:</span>
                    <span className="text-xl tracking-tighter">{getCartTotal().toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between font-black uppercase text-[10px] tracking-widest">
                    <span className="text-black/40">VẬN CHUYỂN:</span>
                    <span className="text-dole-orange font-black">MIỄN PHÍ</span>
                  </div>
                </div>

                <div className="pt-8 border-t-4 border-black mb-12">
                  <div className="flex justify-between items-end">
                    <span className="font-black uppercase tracking-tighter text-sm italic">TỔNG CỘNG:</span>
                    <span className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none">
                      {getCartTotal().toLocaleString()}₫
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full">
                  <button className="w-full bg-black text-white h-20 font-black uppercase tracking-[0.3em] text-xs hover:bg-dole-orange transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-4 group/btn">
                    TIẾN HÀNH THANH TOÁN
                    <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-6 p-6 border-2 border-black/5">
                  <Truck size={32} className="text-dole-orange" strokeWidth={2.5} />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">GIAO HÀNG HỎA TỐC</h4>
                    <p className="text-[10px] text-black/40 font-black uppercase mt-1">TRONG VÒNG 24H LÀM VIỆC</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 border-2 border-black/5">
                  <ShieldCheck size={32} className="text-black" strokeWidth={2.5} />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">BẢO HÀNH CHÍNH HÃNG</h4>
                    <p className="text-[10px] text-black/40 font-black uppercase mt-1">CAM KẾT CHẤT LƯỢNG TUYỆT ĐỐI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
