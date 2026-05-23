import React, { useState } from 'react';
import api from '@/lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Phone, User, MessageSquare, CreditCard, Mail } from 'lucide-react';
import { BRAND_CONFIG } from '../lib/config';

interface SelectedSlot {
  courtId: number;
  startTime: string;
  endTime: string;
}

interface BookingCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlots: SelectedSlot[];
  selectedDate: string;
  totalPrice: number;
  onSuccess: () => void;
}

const BookingCheckout: React.FC<BookingCheckoutProps> = ({
  isOpen,
  onClose,
  selectedSlots,
  selectedDate,
  totalPrice,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsLoading(true);
    try {
      const payload = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        date: selectedDate,
        items: selectedSlots.map(slot => ({
          courtId: slot.courtId,
          startTime: slot.startTime,
          endTime: slot.endTime,
          // Giá vãng lai theo logic bảng giá mới (Vãng lai)
          price: (parseInt(slot.startTime.split(':')[0]) >= 16) ? 180000 : 140000
        })),
        totalAmount: totalPrice,
        notes: formData.notes
      };

      const { data } = await api.post(`/bookings`, payload);
      setBookingResult(data);
      setShowQR(true);
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi đặt sân.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white border-4 border-black overflow-hidden flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-dole-orange transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!showQR ? (
          <>
            {/* Left: Summary */}
            <div className="flex-1 bg-neutral-50 p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dole-orange mb-4 block">Xác nhận lịch đặt</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-10">
                THÔNG TIN <br /> <span className="text-black/20">CHI TIẾT</span>
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b-2 border-black/5 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Ngày đặt</span>
                  <span className="text-sm font-black uppercase italic">{new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })}</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block">Khung giờ đã chọn</span>
                  <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2 custom-scrollbar no-scrollbar">
                    {selectedSlots.map((slot, i) => (
                      <div key={i} className="flex justify-between items-center bg-white border-2 border-black p-3">
                        <span className="text-xs font-black uppercase">SÂN {slot.courtId}</span>
                        <span className="text-xs font-black italic">{slot.startTime} - {slot.endTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-black">Tổng cộng</span>
                    <span className="text-4xl font-black italic tracking-tighter text-dole-orange">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest">
                    * Vui lòng chuyển khoản đặt cọc 100% để giữ chỗ
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <input 
                      required
                      type="text"
                      placeholder="HỌ VÀ TÊN KHÁCH HÀNG"
                      className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 pl-10 outline-none font-black uppercase text-sm tracking-widest transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <input 
                      required
                      type="tel"
                      placeholder="SỐ ĐIỆN THOẠI LIÊN HỆ"
                      className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 pl-10 outline-none font-black uppercase text-sm tracking-widest transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <input 
                      required
                      type="email"
                      placeholder="GMAIL NHẬN LỜI CẢM ƠN"
                      className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 pl-10 outline-none font-black text-sm tracking-widest transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-0 top-4 w-5 h-5 text-black" />
                    <textarea 
                      placeholder="GHI CHÚ THÊM (NẾU CÓ)"
                      rows={3}
                      className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-4 pl-10 outline-none font-black uppercase text-sm tracking-widest transition-all resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-6 font-black uppercase italic tracking-[0.2em] text-lg hover:bg-dole-orange transition-all flex items-center justify-center gap-4 shadow-[10px_10px_0px_0px_rgba(255,95,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : "XÁC NHẬN ĐẶT SÂN"}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Payment View */
          <div className="w-full p-8 md:p-20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 border-4 border-black text-white mb-6">
                <Check className="w-12 h-12 stroke-[3]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                GỬI YÊU CẦU <br /> <span className="text-green-500">THÀNH CÔNG!</span>
              </h2>
              <div className="space-y-4 text-black/60 font-bold uppercase text-xs tracking-widest leading-relaxed">
                <p>Mã đơn hàng: <span className="text-black font-black">#{bookingResult?.orderNumber}</span></p>
                <p>Vui lòng quét mã QR bên cạnh để thanh toán cọc/chuyển khoản giữ chỗ.</p>
                <p>Nội dung chuyển khoản: <span className="text-dole-orange font-black">{bookingResult?.orderNumber}</span></p>
              </div>
              
              <button 
                onClick={() => { onSuccess(); onClose(); }}
                className="mt-8 px-10 py-4 border-4 border-black font-black uppercase italic text-sm hover:bg-black hover:text-white transition-all"
              >
                HOÀN TẤT & QUAY LẠI
              </button>
            </div>

            <div className="w-full max-w-[350px] bg-white border-4 border-black p-4 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
              <div className="aspect-square bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={`https://img.vietqr.io/image/vcb/0441000720235/compact2.png?amount=${totalPrice}&addInfo=${bookingResult?.orderNumber}&accountName=DO%20LE%20SPORT`}
                  alt="VietQR Payment"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-4 pt-4 border-t-2 border-black flex items-center justify-center gap-3">
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">QUÉT MÃ ĐỂ THANH TOÁN</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingCheckout;
