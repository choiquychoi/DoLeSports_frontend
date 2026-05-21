import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  CreditCard, 
  Truck,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from '@/lib/axios';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    note: '',
    paymentMethod: 'COD' as 'COD' | 'Bank Transfer'
  });

  if (cart.length === 0 && !orderSuccess) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          province: formData.province,
          district: formData.district,
          note: formData.note
        },
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          variantLabel: [
            item.selectedSize ? `Size: ${item.selectedSize}` : '',
            item.selectedColor ? `Màu: ${item.selectedColor}` : ''
          ].filter(Boolean).join(', ')
        })),
        totalAmount: getCartTotal(),
        paymentMethod: formData.paymentMethod
      };

      const { data } = await api.post('/orders', orderData);

      if (data) {
        setOrderNumber(data.orderNumber);
        setPlacedOrder({
          ...orderData,
          orderNumber: data.orderNumber,
          createdAt: new Date().toISOString()
        });
        setOrderSuccess(true);
        clearCart();
        window.scrollTo(0, 0);
      }
    } catch (error: any) {
      console.error('Lỗi đặt hàng:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess && placedOrder) {
    return (
      <div className="min-h-screen bg-white font-sans text-black">
        <Navbar />
        <main className="container mx-auto px-4 pt-48 pb-32 text-center">
          <div className="max-w-4xl mx-auto">
            {/* SUCCESS HEADER */}
            <div className="mb-20">
              <div className="w-24 h-24 border-4 border-black bg-white flex items-center justify-center mx-auto mb-10 shadow-[10px_10px_0px_0px_rgba(34,197,94,1)]">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
                THANKS. <br/>ORDER <span className="text-dole-orange">RECEIVED.</span>
              </h2>
              <p className="text-black/50 font-black uppercase tracking-[0.3em] text-xs">CHÚNG TÔI SẼ SỚM LIÊN HỆ ĐỂ XÁC NHẬN ĐƠN HÀNG CỦA BẠN.</p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-4 border-black mb-16 bg-white text-left">
              {[
                { label: 'MÃ ĐƠN', val: placedOrder.orderNumber, isOrder: true },
                { label: 'NGÀY ĐẶT', val: new Date(placedOrder.createdAt).toLocaleDateString('vi-VN') },
                { label: 'TỔNG CỘNG', val: `${placedOrder.totalAmount.toLocaleString()}₫`, isOrange: true },
                { label: 'THANH TOÁN', val: placedOrder.paymentMethod === 'Bank Transfer' ? 'CHUYỂN KHOẢN' : 'COD' }
              ].map((stat, i) => (
                <div key={i} className={`p-8 border-black ${
                  i % 2 === 0 ? 'sm:border-r-2' : ''
                } ${
                  i < 2 ? 'border-b-2 sm:border-b-2 md:border-b-0' : 'border-b-2 sm:border-b-0'
                } ${
                  i === 0 || i === 1 ? 'md:border-r-2' : i === 2 ? 'md:border-r-2' : ''
                }`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-2">{stat.label}</p>
                  <p className={`text-lg md:text-xl font-black tracking-tighter break-all ${stat.isOrange ? 'text-dole-orange' : ''} ${stat.isOrder ? 'leading-tight' : ''}`}>
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left mb-20">
              {/* DETAILS */}
              <div className="border-2 border-black p-10 space-y-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-black pb-6">CHI TIẾT <span className="text-dole-orange">ĐƠN HÀNG</span></h3>
                <div className="space-y-6">
                  {placedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 border-2 border-black p-1 bg-zinc-50 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black uppercase tracking-tighter truncate">{item.name}</p>
                          <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">{item.quantity} X {item.price.toLocaleString()}₫</p>
                        </div>
                      </div>
                      <span className="font-black text-lg tracking-tighter">{(item.price * item.quantity).toLocaleString()}₫</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              <div className="border-2 border-black p-10 space-y-10 bg-zinc-50">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic border-b-2 border-black pb-6">ĐỊA CHỈ <span className="text-dole-orange">GIAO HÀNG</span></h3>
                <div className="space-y-6 font-black uppercase text-xs tracking-widest leading-loose">
                  <div className="flex items-center gap-4"><User size={18} className="text-dole-orange" /> {placedOrder.customer.name}</div>
                  <div className="flex items-center gap-4"><Phone size={18} className="text-dole-orange" /> {placedOrder.customer.phone}</div>
                  <div className="flex items-start gap-4"><MapPin size={18} className="text-dole-orange shrink-0 mt-1" /> {placedOrder.customer.address}, {placedOrder.customer.district}, {placedOrder.customer.province}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/" className="bg-black text-white px-16 py-7 font-black uppercase tracking-widest text-xs hover:bg-dole-orange transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
                TIẾP TỤC MUA SẮM
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      
      <div className="pt-48 pb-20 border-b-2 border-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
            <Link to="/cart" className="hover:text-black">CART</Link>
            <ChevronRight size={10} />
            <span className="text-dole-orange">CHECKOUT</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mt-4">
            THANH <span className="text-dole-orange">TOÁN</span>
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-20">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white"><User size={20} /></div>
                THÔNG TIN <span className="text-dole-orange">KHÁCH HÀNG</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">HỌ VÀ TÊN *</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full h-16 px-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">SỐ ĐIỆN THOẠI *</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-16 px-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">EMAIL (TÙY CHỌN)</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-16 px-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">TỈNH / THÀNH PHỐ *</label>
                  <input required name="province" value={formData.province} onChange={handleInputChange} className="w-full h-16 px-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">QUẬN / HUYỆN *</label>
                  <input required name="district" value={formData.district} onChange={handleInputChange} className="w-full h-16 px-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">ĐỊA CHỈ CHI TIẾT *</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} className="w-full min-h-[120px] p-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors resize-none" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">GHI CHÚ ĐƠN HÀNG (TÙY CHỌN)</label>
                <textarea name="note" value={formData.note} onChange={handleInputChange} placeholder="VÍ DỤ: GIAO NGOÀI GIỜ HÀNH CHÍNH..." className="w-full min-h-[100px] p-6 border-2 border-black focus:border-dole-orange outline-none font-black text-sm uppercase transition-colors resize-none" />
              </div>
            </div>

            <div className="space-y-10 pt-16 border-t-2 border-black">
              <h3 className="text-3xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white"><CreditCard size={20} /></div>
                PHƯƠNG THỨC <span className="text-dole-orange">THANH TOÁN</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'COD', label: 'THANH TOÁN COD', desc: 'NHẬN HÀNG TRẢ TIỀN', icon: <Truck /> },
                  { id: 'Bank Transfer', label: 'CHUYỂN KHOẢN', desc: 'XỬ LÝ NHANH CHÓNG', icon: <CreditCard /> }
                ].map((m) => (
                  <label key={m.id} className={`p-8 border-4 cursor-pointer transition-all ${formData.paymentMethod === m.id ? 'border-dole-orange bg-white shadow-[10px_10px_0px_0px_rgba(255,95,0,0.1)]' : 'border-black hover:bg-zinc-50'}`}>
                    <input type="radio" name="paymentMethod" value={m.id} checked={formData.paymentMethod === m.id} onChange={handleInputChange} className="hidden" />
                    <div className="flex items-center gap-4 mb-4">
                      <div className={formData.paymentMethod === m.id ? 'text-dole-orange' : 'text-black'}>{m.icon}</div>
                      <p className="font-black text-sm tracking-widest">{m.label}</p>
                    </div>
                    <p className="text-[10px] font-black text-black/30 tracking-widest uppercase">{m.desc}</p>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'Bank Transfer' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 border-4 border-black bg-white shadow-[15px_15px_0px_0px_rgba(255,95,0,1)] space-y-8"
                >
                  <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                    <div className="w-2 h-8 bg-dole-orange" />
                    <h4 className="text-xl font-black uppercase tracking-tighter">THÔNG TIN CHUYỂN KHOẢN</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">CHỦ TÀI KHOẢN</p>
                      <p className="text-2xl font-black tracking-tighter italic uppercase">VŨ DUY LONG</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">SỐ TÀI KHOẢN</p>
                      <p className="text-3xl font-black tracking-[0.1em] text-dole-orange">81988886767</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">NGÂN HÀNG</p>
                      <p className="text-xl font-black tracking-tight uppercase">TPBANK (TIÊN PHONG)</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">NỘI DUNG</p>
                      <p className="text-xl font-black tracking-tight uppercase">THANH TOAN DON HANG</p>
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-6 border-2 border-black border-dashed">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/60 leading-relaxed text-center">
                      VUI LÒNG CHỤP LẠI MÀN HÌNH GIAO DỊCH SAU KHI CHUYỂN KHOẢN ĐỂ CHÚNG TÔI XỬ LÝ NHANH NHẤT.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="border-4 border-black p-10 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-10 border-b-2 border-black pb-6">ĐƠN HÀNG <span className="text-dole-orange">CỦA BẠN</span></h3>
                <div className="max-h-[350px] overflow-y-auto pr-4 custom-scrollbar space-y-8 mb-12">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-6 items-center">
                      <div className="w-16 h-16 border-2 border-black p-1 bg-zinc-50 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-contain" /></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black uppercase tracking-tighter text-xs truncate">{item.name}</h4>
                        <p className="text-[10px] font-black text-dole-orange uppercase tracking-widest mt-1">{[item.selectedSize, item.selectedColor].filter(Boolean).join(' // ')}</p>
                        <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">SL: {item.quantity}</p>
                      </div>
                      <div className="font-black text-lg tracking-tighter">{(item.price * item.quantity).toLocaleString()}₫</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 pt-8 border-t-2 border-black mb-12">
                  <div className="flex justify-between font-black uppercase text-[10px] tracking-widest text-black/40"><span>TẠM TÍNH:</span><span className="text-black">{getCartTotal().toLocaleString()}₫</span></div>
                  <div className="flex justify-between font-black uppercase text-[10px] tracking-widest text-black/40"><span>VẬN CHUYỂN:</span><span className="text-dole-orange">MIỄN PHÍ</span></div>
                  <div className="flex justify-between items-end pt-6 border-t-4 border-black">
                    <span className="font-black uppercase tracking-tighter text-sm italic">TỔNG CỘNG:</span>
                    <span className="text-4xl font-black text-black tracking-tighter leading-none">{getCartTotal().toLocaleString()}₫</span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full h-20 bg-black text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-dole-orange transition-all duration-500 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] active:scale-95 flex items-center justify-center gap-4">
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'XÁC NHẬN ĐẶT HÀNG →'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: white; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: black; }
      `}} />
    </div>
  );
};

export default Checkout;
