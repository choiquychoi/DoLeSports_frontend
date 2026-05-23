import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';

interface PricingTier {
  fixed: number;
  casual: number;
}

interface PricingConfig {
  pricing: {
    weekday: { morning: PricingTier; evening: PricingTier };
    weekend: { morning: PricingTier; evening: PricingTier };
  };
}

const CourtPricing = () => {
  const [config, setConfig] = useState<PricingConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await api.get('/court-config');
        setConfig(data);
      } catch (err) {
        console.error('Failed to fetch pricing:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  if (loading && !config) return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-dole-orange animate-spin" />
    </div>
  );

  const p = config?.pricing || {
    weekday: { morning: { fixed: 120000, casual: 140000 }, evening: { fixed: 160000, casual: 180000 } },
    weekend: { morning: { fixed: 140000, casual: 160000 }, evening: { fixed: 180000, casual: 200000 } }
  };

  const formatPrice = (n: number) => n.toLocaleString('vi-VN') + ' ₫';

  return (
    <section className="bg-white py-24 border-b-2 border-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
            BẢNG GIÁ <span className="text-dole-orange">DỊCH VỤ SÂN</span>
          </h2>
          <p className="font-bold text-black/40 uppercase text-[10px] tracking-[0.4em]">ĐỖ LÊ SPORT — DĨ AN</p>
        </div>

        {/* Table - Dole Elite Style */}
        <div className="border-4 border-black overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] mb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white border-b-4 border-black">
                <th className="p-4 md:p-6 font-black uppercase italic tracking-widest text-xs border-r-2 border-white/20">Thứ</th>
                <th className="p-4 md:p-6 font-black uppercase italic tracking-widest text-xs border-r-2 border-white/20">Khung giờ</th>
                <th className="p-4 md:p-6 font-black uppercase italic tracking-widest text-xs border-r-2 border-white/20 text-center">Cố định</th>
                <th className="p-4 md:p-6 font-black uppercase italic tracking-widest text-xs text-center">Vãng lai</th>
              </tr>
            </thead>
            <tbody className="font-bold uppercase text-xs tracking-tighter">
              <tr className="border-b-2 border-black/10">
                <td rowSpan={2} className="p-4 md:p-8 bg-neutral-50 border-r-2 border-black font-black text-center text-sm">T2 - T6</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 italic">05h - 16h</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 text-center text-sm font-black">{formatPrice(p.weekday.morning.fixed)}</td>
                <td className="p-4 md:p-6 text-center text-sm font-black text-dole-orange">{formatPrice(p.weekday.morning.casual)}</td>
              </tr>
              <tr className="border-b-2 border-black">
                <td className="p-4 md:p-6 border-r-2 border-black/10 italic">16h - 23h</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 text-center text-sm font-black">{formatPrice(p.weekday.evening.fixed)}</td>
                <td className="p-4 md:p-6 text-center text-sm font-black text-dole-orange">{formatPrice(p.weekday.evening.casual)}</td>
              </tr>
              <tr className="border-b-2 border-black/10">
                <td rowSpan={2} className="p-4 md:p-8 bg-neutral-50 border-r-2 border-black font-black text-center text-sm">T7 - CN</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 italic">05h - 16h</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 text-center text-sm font-black">{formatPrice(p.weekend.morning.fixed)}</td>
                <td className="p-4 md:p-6 text-center text-sm font-black text-dole-orange">{formatPrice(p.weekend.morning.casual)}</td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 border-r-2 border-black/10 italic">16h - 23h</td>
                <td className="p-4 md:p-6 border-r-2 border-black/10 text-center text-sm font-black">{formatPrice(p.weekend.evening.fixed)}</td>
                <td className="p-4 md:p-6 text-center text-sm font-black text-dole-orange">{formatPrice(p.weekend.evening.casual)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-neutral-50 p-6 border-2 border-dashed border-black/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/60 italic leading-relaxed">
                * Lưu ý: Khách đặt sân cố định vui lòng liên hệ hotline để được hỗ trợ sắp xếp lịch tốt nhất.
            </p>
            <a href="#dat-san" className="whitespace-nowrap px-8 py-3 bg-black text-white font-black uppercase italic tracking-widest text-[10px] hover:bg-dole-orange transition-all">
                Kéo xuống đặt lịch ngay ↓
            </a>
        </div>
      </div>
    </section>
  );
};

export default CourtPricing;
